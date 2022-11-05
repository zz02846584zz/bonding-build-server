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
        console.log(type);
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
        const areaPhone = `+886${phone.substring(1)}`;
        const client = require('twilio')(credentials_1.twilio.accountSid, credentials_1.twilio.authToken);
        const result = client.verify
            .services(credentials_1.twilio.serviceSid)
            .verifications.create({ to: areaPhone, channel: 'sms' })
            .then(e => {
            return true;
        })
            .catch(() => false);
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
            const valid = await client.verify
                .services(credentials_1.twilio.serviceSid)
                .verificationChecks.create({ to: areaPhone, code: smsCode })
                .then(verification_check => {
                return verification_check.valid;
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2Uvc2VydmljZS9hcHAvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEQ7QUFDOUQsNENBSzJCO0FBQzNCLHVDQUFrRDtBQUVsRCwyQ0FBK0M7QUFDL0MscUNBQXFDO0FBRXJDLDJCQUEyQjtBQUMzQiw0QkFBNEI7QUFDNUIsb0NBQW9DO0FBRXBDLGdEQUFzRTtBQUN0RSxzQ0FBaUQ7QUFDakQsZ0RBQTBEO0FBQzFELDREQUFzRTtBQUN0RSxzQ0FBaUQ7QUFDakQsMERBQW1FO0FBQ25FLHNDQUFpRDtBQUNqRCx3Q0FBbUQ7QUFDbkQsa0RBQTZEO0FBUTdELGdFQUF3RDtBQUN4RCxpQ0FBNEM7QUFFNUM7O0dBRUc7QUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLGtCQUFXO0lBMkNqRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQWtCO1FBQzVCLGFBQWE7UUFDYixNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDaEQsS0FBSyxFQUFFO2dCQUNMLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxpQkFBVSxDQUFDLE1BQU0sRUFBRTtnQkFDcEMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLGlCQUFVLENBQUMsT0FBTyxFQUFFO2FBQ3RDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsT0FBTztRQUNQLElBQUksSUFBSSxFQUFFO1lBQ1IsWUFBWTtZQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxpQkFBVSxDQUFDLE9BQU8sRUFBRTtnQkFDdEMsTUFBTSxJQUFJLDRCQUFxQixDQUFDLFNB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