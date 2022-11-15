"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAppAuthService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const cache_1 = require("@midwayjs/cache");
const typeorm_1 = require("typeorm");
const md5 = require("md5");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const user_1 = require("../../entity/sys/user");
const user_2 = require("../sys/user");
const role_1 = require("../../entity/sys/role");
const department_1 = require("../../entity/sys/department");
const role_2 = require("../sys/role");
const user_role_1 = require("../../entity/sys/user_role");
const menu_1 = require("../sys/menu");
const perms_1 = require("../sys/perms");
const department_2 = require("../sys/department");
const credentials_1 = require("../../../../config/credentials");
const user_3 = require("./user");
/**
 * 登錄
 */
let BaseAppAuthService = class BaseAppAuthService extends core_1.BaseService {
    /**
     * 登錄
     * @param login
     */
    async login(login) {
        // rememberMe
        const { phone, password } = login;
        const user = await this.baseSysUserEntity.findOne({
            where: [
                { phone, status: user_1.UserStatus.NORMAL },
                { phone, status: user_1.UserStatus.SUSPEND },
            ],
        });
        // 校驗用戶
        if (user) {
            // 校驗用戶狀態及密碼
            if (user.status === user_1.UserStatus.SUSPEND) {
                throw new core_1.CoolValidateException('該帳號已被禁用');
            }
            if (user.password !== md5(password)) {
                throw new core_1.CoolValidateException('手機或密碼不正確');
            }
        }
        else {
            throw new core_1.CoolCommException('該手機號碼尚未註冊');
        }
        // 校驗角色
        const roleIds = await this.baseSysRoleService.getByUser(user.id);
        if (_.isEmpty(roleIds)) {
            throw new core_1.CoolCommException('該用戶未分配任何角色，無法登錄');
        }
        // 生成token
        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        const result = {
            expire,
            token: await this.generateToken(user, roleIds, expire),
            refreshExpire,
            refreshToken: await this.generateToken(user, roleIds, refreshExpire, true),
        };
        // 將用戶相關信息保存到緩存
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, false);
        // return perms;
        await this.cacheManager.set(`user:department:${user.id}`, departments);
        await this.cacheManager.set(`user:perms:${user.id}`, perms);
        await this.cacheManager.set(`user:token:${user.id}`, result.token);
        await this.cacheManager.set(`user:token:refresh:${user.id}`, result.token);
        return result;
    }
    async person(id) {
        const info = await this.baseSysUserEntity.findOne({
            id: id,
        });
        if (_.isEmpty(info))
            throw new core_1.CoolCommException('未找到該用戶，請聯絡管理員');
        [
            'id',
            'username',
            'password',
            'passwordV',
            'createTime',
            'createBy',
            'updateTime',
            'updateBy',
            'deleteTime',
            'deleteBy',
            'status',
            'verify',
        ].forEach(e => delete info[e]);
        const { name: departmentName } = await this.baseSysDepartmentEntity.findOne({
            id: info === null || info === void 0 ? void 0 : info.departmentId,
        });
        delete info['departmentId'];
        return { ...info, departmentName };
    }
    /**
     * 註冊
     * @param register
     */
    async register(register) {
        const { phone, verifyCode, password, passwordConfirm } = register;
        if (this.ctx.user)
            throw new core_1.CoolCommException('請登出');
        const roleLabel = 'member';
        const departmentId = 16;
        // 驗證密碼長度
        const passwordLimit = 8;
        if (password.length < passwordLimit)
            throw new core_1.CoolCommException(`密碼長度最少需${passwordLimit}個字元`);
        // 校驗密碼
        if (!_.isEqual(password, passwordConfirm))
            throw new core_1.CoolValidateException('請確認輸入的密碼相同');
        // 校驗用戶
        const exists = await this.baseSysUserEntity.findOne({
            where: [
                { phone, status: user_1.UserStatus.NORMAL },
                { phone, status: user_1.UserStatus.SUSPEND },
            ],
        });
        if (!_.isEmpty(exists))
            throw new core_1.CoolCommException('該手機號碼已被使用');
        // 校驗驗證碼
        register.username = this.createRandomString(16);
        await this.captchaCheck(`+886${register.phone}`, verifyCode);
        // 生成md5密碼
        register.password = md5(register.password);
        // 寫入資料庫
        // 儲存用戶資料
        const user = await this.baseSysUserEntity.save({
            ...register,
            departmentId,
            createBy: 1,
            updateBy: 1,
        });
        await this.baseSysUserEntity.save({
            id: user.id,
            createBy: user.id,
            updateBy: user.id,
        });
        const roleMember = await this.baseSysRoleEntity.findOne({
            label: roleLabel,
        });
        const roleIds = [roleMember.id];
        // 儲存用戶角色
        await this.baseSysUserRoleEntity.save({
            userId: user.id,
            roleId: roleMember.id,
        });
        await this.baseSysPermsService.refreshPerms(user.id);
        // 生成token提供前端登入
        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        const result = {
            expire,
            token: await this.generateToken(user, roleIds, expire),
            refreshExpire,
            refreshToken: await this.generateToken(user, roleIds, refreshExpire, true),
        };
        // 將用戶相關信息保存到緩存
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, false);
        await this.cacheManager.set(`user:department:${user.id}`, departments);
        await this.cacheManager.set(`user:perms:${user.id}`, perms);
        await this.cacheManager.set(`user:token:${user.id}`, result.token);
        await this.cacheManager.set(`user:token:refresh:${user.id}`, result.token);
        return result;
    }
    createRandomString(len) {
        let maxLen = 8, min = Math.pow(16, Math.min(len, maxLen) - 1), max = Math.pow(16, Math.min(len, maxLen)) - 1, n = Math.floor(Math.random() * (max - min + 1)) + min, r = n.toString(16);
        while (r.length < len) {
            r = r + this.createRandomString(len - maxLen);
        }
        return r;
    }
    /**
     * 忘記密碼
     */
    async forgot(forgot) {
        const { phone, verifyCode, password, passwordConfirm } = forgot;
        // 驗證密碼長度
        const passwordLimit = 8;
        if (password.length < passwordLimit)
            throw new core_1.CoolCommException(`密碼長度最少需${passwordLimit}個字元`);
        // 校驗密碼
        if (!_.isEqual(password, passwordConfirm))
            throw new core_1.CoolValidateException('請確認輸入的密碼相同');
        // 校驗用戶
        const user = await this.baseSysUserEntity.findOne({
            where: [
                { phone, status: user_1.UserStatus.NORMAL },
                { phone, status: user_1.UserStatus.SUSPEND },
            ],
        });
        if (_.isEmpty(user))
            throw new core_1.CoolCommException('該號碼尚未註冊');
        // 校驗驗證碼
        const areaPhone = '886' + forgot.phone.substring(1);
        await this.captchaCheck(`+${areaPhone}`, verifyCode);
        // 寫入資料庫
        forgot.password = md5(forgot.password);
        // console.log(user);
        const passwordV = user.passwordV + 1;
        await this.baseSysUserEntity.save({ ...forgot, id: user.id, passwordV });
        // 生成token
        const { expire, refreshExpire } = this.coolConfig.jwt.token;
        const roleIds = await this.baseSysRoleService.getByUser(user.id);
        const result = {
            expire,
            token: await this.generateToken(user, roleIds, expire),
            refreshExpire,
            refreshToken: await this.generateToken(user, roleIds, refreshExpire, true),
        };
        // 將用戶相關信息保存到緩存
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, false);
        // return perms;
        await this.cacheManager.set(`user:department:${user.id}`, departments);
        await this.cacheManager.set(`user:perms:${user.id}`, perms);
        await this.cacheManager.set(`user:token:${user.id}`, result.token);
        await this.cacheManager.set(`user:token:refresh:${user.id}`, result.token);
        return result;
    }
    /**
     * 發送手機驗證碼
     * @param captcha 國際區號
     */
    async captcha({ type, phone }) {
        var _a;
        // 驗證用戶手機號碼是否變更
        const userId = (_a = this.ctx.user) === null || _a === void 0 ? void 0 : _a.userId;
        const user = await this.baseSysUserEntity.findOne({ id: userId });
        if (type === 'change' && !_.isEmpty(user) && user.phone === phone)
            throw new core_1.CoolCommException('與目前的號碼相同');
        // 驗證手機號碼是否已被使用
        const phoneExist = await this.baseSysUserEntity.findOne({ phone });
        if (type === 'register' && !_.isEmpty(phoneExist))
            throw new core_1.CoolCommException('該手機已被使用');
        // 發送驗證碼
        const areaPhone = `+886${phone}`;
        const client = require('twilio')(credentials_1.twilio.accountSid, credentials_1.twilio.authToken);
        const result = client.verify.v2
            .services(credentials_1.twilio.verifySid)
            .verifications.create({ to: areaPhone, channel: 'sms' })
            .then(e => {
            return true;
        })
            .catch(e => {
            throw new core_1.CoolCommException('無法送出驗證信，請聯絡管理員');
        });
        return result;
    }
    /**
     * 檢驗手機驗證碼
     * @param phone 手機號
     * @param value 驗證碼
     */
    async captchaCheck(areaPhone, smsCode) {
        const client = require('twilio')(credentials_1.twilio.accountSid, credentials_1.twilio.authToken);
        try {
            const valid = await client.verify.v2
                .services(credentials_1.twilio.verifySid)
                .verificationChecks.create({ to: areaPhone, code: smsCode })
                .then(verification_check => {
                return verification_check.valid;
            })
                .catch(() => false);
            return valid;
        }
        catch (e) {
            throw new core_1.CoolCommException('驗證碼不正確，請重新發送');
        }
    }
    /**
     * 生成token
     * @param user 用戶對象
     * @param roleIds 角色集合
     * @param expire 過期
     * @param isRefresh 是否是刷新
     */
    async generateToken(user, roleIds, expire, isRefresh) {
        await this.cacheManager.set(`user:passwordVersion:${user.id}`, user.passwordV);
        const tokenInfo = {
            isRefresh: false,
            roleIds,
            username: user.username,
            userId: user.id,
            passwordVersion: user.passwordV,
        };
        if (isRefresh) {
            tokenInfo.isRefresh = true;
        }
        return jwt.sign(tokenInfo, this.coolConfig.jwt.secret, {
            expiresIn: expire,
        });
    }
    /**
     * 刷新token
     * @param token
     */
    async refreshToken({ refreshToken: token }) {
        console.log('refreshToken:' + token);
        try {
            const decoded = jwt.verify(token, this.coolConfig.jwt.secret);
            if (decoded && decoded['isRefresh']) {
                delete decoded['exp'];
                delete decoded['iat'];
                const { expire, refreshExpire } = this.coolConfig.jwt.token;
                decoded['isRefresh'] = false;
                const result = {
                    expire,
                    token: jwt.sign(decoded, this.coolConfig.jwt.secret, {
                        expiresIn: expire,
                    }),
                    refreshExpire,
                    refreshToken: '',
                };
                decoded['isRefresh'] = true;
                result.refreshToken = jwt.sign(decoded, this.coolConfig.jwt.secret, {
                    expiresIn: refreshExpire,
                });
                await this.cacheManager.set(`user:passwordVersion:${decoded['userId']}`, decoded['passwordVersion']);
                return result;
            }
        }
        catch (err) {
            this.ctx.status = 401;
            this.ctx.body = {
                code: core_1.RESCODE.COMMFAIL,
                message: '自動登出，請重新登入',
            };
            return;
        }
    }
};
__decorate([
    (0, decorator_1.Config)('module.base'),
    __metadata("design:type", Object)
], BaseAppAuthService.prototype, "jwtConfig", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cache_1.CacheManager)
], BaseAppAuthService.prototype, "cacheManager", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseAppAuthService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(role_1.BaseSysRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseAppAuthService.prototype, "baseSysRoleEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseAppAuthService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseAppAuthService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_2.BaseSysUserService)
], BaseAppAuthService.prototype, "baseSysUserService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_3.BaseApiUserService)
], BaseAppAuthService.prototype, "baseApiUserService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", role_2.BaseSysRoleService)
], BaseAppAuthService.prototype, "baseSysRoleService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseAppAuthService.prototype, "baseSysPermsService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseAppAuthService.prototype, "baseSysMenuService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", department_2.BaseSysDepartmentService)
], BaseAppAuthService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseAppAuthService.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Config)('module.base'),
    __metadata("design:type", Object)
], BaseAppAuthService.prototype, "coolConfig", void 0);
BaseAppAuthService = __decorate([
    (0, decorator_1.Provide)()
], BaseAppAuthService);
exports.BaseAppAuthService = BaseAppAuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9zZXJ2aWNlL2FwcC9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUM5RCw0Q0FLMkI7QUFDM0IsdUNBQWtEO0FBRWxELDJDQUErQztBQUMvQyxxQ0FBcUM7QUFFckMsMkJBQTJCO0FBQzNCLDRCQUE0QjtBQUM1QixvQ0FBb0M7QUFFcEMsZ0RBQXNFO0FBQ3RFLHNDQUFpRDtBQUNqRCxnREFBMEQ7QUFDMUQsNERBQXNFO0FBQ3RFLHNDQUFpRDtBQUNqRCwwREFBbUU7QUFDbkUsc0NBQWlEO0FBQ2pELHdDQUFtRDtBQUNuRCxrREFBNkQ7QUFRN0QsZ0VBQXdEO0FBQ3hELGlDQUE0QztBQUU1Qzs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsa0JBQVc7SUEyQ2pEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBa0I7UUFDNUIsYUFBYTtRQUNiLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUNoRCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNwQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQVUsQ0FBQyxPQUFPLEVBQUU7YUFDdEM7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPO1FBQ1AsSUFBSSxJQUFJLEVBQUU7WUFDUixZQUFZO1lBQ1osSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGlCQUFVLENBQUMsT0FBTyxFQUFFO2dCQUN0QyxNQUFNLElBQUksNEJBQXFC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