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
exports.BaseSysLoginService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const svgCaptcha = require("svg-captcha");
const uuid_1 = require("uuid");
const typeorm_1 = require("typeorm");
const orm_1 = require("@midwayjs/orm");
const md5 = require("md5");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const svgToDataURL = require("mini-svg-data-uri");
const cache_1 = require("@midwayjs/cache");
const role_1 = require("./role");
const menu_1 = require("./menu");
const department_1 = require("./department");
const user_1 = require("../../entity/sys/user");
/**
 * 登錄
 */
let BaseSysLoginService = class BaseSysLoginService extends core_1.BaseService {
    /**
     * 登錄
     * @param login
     */
    async login(login) {
        const { username, captchaId, verifyCode, password } = login;
        // 校驗驗證碼
        const checkV = await this.captchaCheck(captchaId, verifyCode);
        if (checkV) {
            const user = await this.baseSysUserEntity.findOne({ username });
            // 校驗用戶
            if (user) {
                // 校驗用戶狀態及密碼
                if (user.status !== user_1.UserStatus.NORMAL) {
                    throw new core_1.CoolCommException('該帳號不被允許登入');
                }
                if (user.password !== md5(password)) {
                    throw new core_1.CoolCommException('賬戶或密碼不正確');
                }
            }
            else {
                throw new core_1.CoolCommException('賬戶或密碼不正確');
            }
            // 校驗角色
            const roleIds = await this.baseSysRoleService.getByUser(user.id);
            if (_.isEmpty(roleIds)) {
                throw new core_1.CoolCommException('該用戶未設置任何角色，無法登錄');
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
            const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, user.username === 'admin');
            await this.cacheManager.set(`admin:department:${user.id}`, departments);
            await this.cacheManager.set(`admin:perms:${user.id}`, perms);
            await this.cacheManager.set(`admin:token:${user.id}`, result.token);
            await this.cacheManager.set(`admin:token:refresh:${user.id}`, result.token);
            return result;
        }
        else {
            throw new core_1.CoolCommException('驗證碼不正確');
        }
    }
    /**
     * 驗證碼
     * @param type 圖片驗證碼類型 svg
     * @param width 寬
     * @param height 高
     */
    async captcha(type, width = 150, height = 50) {
        const svg = svgCaptcha.create({
            ignoreChars: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
            width,
            height,
        });
        const result = {
            captchaId: (0, uuid_1.v1)(),
            data: svg.data.replace(/"/g, "'"),
        };
        // 文字變白
        const rpList = [
            '#111',
            '#222',
            '#333',
            '#444',
            '#555',
            '#666',
            '#777',
            '#888',
            '#999',
        ];
        rpList.forEach(rp => {
            result.data = result.data['replaceAll'](rp, '#fff');
        });
        if (type === 'base64') {
            result.data = svgToDataURL(result.data);
        }
        // 半小時過期
        await this.cacheManager.set(`verify:img:${result.captchaId}`, svg.text.toLowerCase(), { ttl: 1800 });
        return result;
    }
    /**
     * 退出登錄
     */
    async logout() {
        const { userId } = this.ctx.admin;
        await this.cacheManager.del(`admin:department:${userId}`);
        await this.cacheManager.del(`admin:perms:${userId}`);
        await this.cacheManager.del(`admin:token:${userId}`);
        await this.cacheManager.del(`admin:token:refresh:${userId}`);
    }
    /**
     * 檢驗圖片驗證碼
     * @param captchaId 驗證碼ID
     * @param value 驗證碼
     */
    async captchaCheck(captchaId, value) {
        const rv = await this.cacheManager.get(`verify:img:${captchaId}`);
        if (!rv || !value || value.toLowerCase() !== rv) {
            return false;
        }
        else {
            this.cacheManager.del(`verify:img:${captchaId}`);
            return true;
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
        await this.cacheManager.set(`admin:passwordVersion:${user.id}`, user.passwordV);
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
    async refreshToken(token) {
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
                await this.cacheManager.set(`admin:passwordVersion:${decoded['userId']}`, decoded['passwordVersion']);
                return result;
            }
        }
        catch (err) {
            this.ctx.status = 401;
            this.ctx.body = {
                code: core_1.RESCODE.COMMFAIL,
                message: '登錄失效',
            };
            return;
        }
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cache_1.CacheManager)
], BaseSysLoginService.prototype, "cacheManager", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysLoginService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", role_1.BaseSysRoleService)
], BaseSysLoginService.prototype, "baseSysRoleService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseSysLoginService.prototype, "baseSysMenuService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", department_1.BaseSysDepartmentService)
], BaseSysLoginService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Config)('module.base'),
    __metadata("design:type", Object)
], BaseSysLoginService.prototype, "coolConfig", void 0);
BaseSysLoginService = __decorate([
    (0, decorator_1.Provide)()
], BaseSysLoginService);
exports.BaseSysLoginService = BaseSysLoginService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUM5RCw0Q0FBNEU7QUFDNUUsMENBQTBDO0FBQzFDLCtCQUFrQztBQUNsQyxxQ0FBcUM7QUFDckMsdUNBQWtEO0FBQ2xELDJCQUEyQjtBQUMzQiw0QkFBNEI7QUFDNUIsb0NBQW9DO0FBQ3BDLGtEQUFrRDtBQUVsRCwyQ0FBK0M7QUFHL0MsaUNBQTRDO0FBQzVDLGlDQUE0QztBQUM1Qyw2Q0FBd0Q7QUFDeEQsZ0RBQXNFO0FBRXRFOztHQUVHO0FBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxrQkFBVztJQXNCbEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFlO1FBQ3pCLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDNUQsUUFBUTtRQUNSLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ2hFLE9BQU87WUFDUCxJQUFJLElBQUksRUFBRTtnQkFDUixZQUFZO2dCQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxpQkFBVSxDQUFDLE1BQU0sRUFBRTtvQkFDckMsTUFBTSxJQUFJLHdCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUMxQztnQkFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNuQyxNQUFNLElBQUksd0JBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQ3pDO2FBQ0Y7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLHdCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsT0FBTztZQUNQLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN0QixNQUFNLElBQUksd0JBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUNoRDtZQUVELFVBQVU7WUFDVixNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM1RCxNQUFNLE1BQU0sR0FBRztnQkFDYixNQUFNO2dCQUNOLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7Z0JBQ3RELGFBQWE7Z0JBQ2IsWUFBWSxFQUFFLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FDcEMsSUFBSSxFQUNKLE9BQU8sRUFDUCxhQUFhLEVBQ2IsSUFBSSxDQUNMO2FBQ0YsQ0FBQztZQUVGLGVBQWU7WUFDZixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUNsRSxPQUFPLEVBQ1AsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQzFCLENBQUM7WUFDRixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDeEUsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3RCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGVBQWUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUN6Qix1QkFBdUIsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUNoQyxNQUFNLENBQUMsS0FBSyxDQUNiLENBQUM7WUFFRixPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU07WUFDTCxNQUFNLElBQUksd0JBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQVksRUFBRSxLQUFLLEdBQUcsR0FBRyxFQUFFLE1BQU0sR0FBRyxFQUFFO1FBQ2xELE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDNUIsV0FBVyxFQUFFLHNEQUFzRDtZQUNuRSxLQUFLO1lBQ0wsTUFBTTtTQUNQLENBQUMsQ0FBQztRQUNILE1BQU0sTUFBTSxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUEsU0FBSSxHQUFFO1lBQ2pCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO1NBQ2xDLENBQUM7UUFDRixPQUFPO1FBQ1AsTUFBTSxNQUFNLEdBQUc7WUFDYixNQUFNO1lBQ04sTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sTUFBTTtZQUNOLE1BQU07WUFDTixNQUFNO1lBQ04sTUFBTTtZQUNOLE1BQU07U0FDUCxDQUFDO1FBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QztRQUNELFFBQVE7UUFDUixNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUN6QixjQUFjLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFDdEIsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQ2QsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxNQUFNO1FBQ1YsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDMUQsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxlQUFlLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckQsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxlQUFlLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckQsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEtBQUs7UUFDakMsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxjQUFjLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQy9DLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUNqRCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBVTtRQUNuRCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUN6Qix5QkFBeUIsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUNsQyxJQUFJLENBQUMsU0FBUyxDQUNmLENBQUM7UUFDRixNQUFNLFNBQVMsR0FBRztZQUNoQixTQUFTLEVBQUUsS0FBSztZQUNoQixPQUFPO1lBQ1AsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNmLGVBQWUsRUFBRSxJQUFJLENBQUMsU0FBUztTQUNoQyxDQUFDO1FBQ0YsSUFBSSxTQUFTLEVBQUU7WUFDYixTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUM1QjtRQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ3JELFNBQVMsRUFBRSxNQUFNO1NBQ2xCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQWE7UUFDOUIsSUFBSTtZQUNGLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV0QixNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDNUQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDN0IsTUFBTSxNQUFNLEdBQUc7b0JBQ2IsTUFBTTtvQkFDTixLQUFLLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO3dCQUNuRCxTQUFTLEVBQUUsTUFBTTtxQkFDbEIsQ0FBQztvQkFDRixhQUFhO29CQUNiLFlBQVksRUFBRSxFQUFFO2lCQUNqQixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO29CQUNsRSxTQUFTLEVBQUUsYUFBYTtpQkFDekIsQ0FBQyxDQUFDO2dCQUNILE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ3pCLHlCQUF5QixPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFDNUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQzNCLENBQUM7Z0JBQ0YsT0FBTyxNQUFNLENBQUM7YUFDZjtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLGNBQU8sQ0FBQyxRQUFRO2dCQUN0QixPQUFPLEVBQUUsTUFBTTthQUNoQixDQUFDO1lBQ0YsT0FBTztTQUNSO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUExTkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ0ssb0JBQVk7eURBQUM7QUFHM0I7SUFEQyxJQUFBLHVCQUFpQixFQUFDLHdCQUFpQixDQUFDOzhCQUNsQixvQkFBVTs4REFBb0I7QUFHakQ7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1cseUJBQWtCOytEQUFDO0FBR3ZDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNXLHlCQUFrQjsrREFBQztBQUd2QztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDaUIscUNBQXdCO3FFQUFDO0FBR25EO0lBREMsSUFBQSxrQkFBTSxHQUFFOztnREFDSTtBQUdiO0lBREMsSUFBQSxrQkFBTSxFQUFDLGFBQWEsQ0FBQzs7dURBQ1g7QUFwQkEsbUJBQW1CO0lBRC9CLElBQUEsbUJBQU8sR0FBRTtHQUNHLG1CQUFtQixDQTROL0I7QUE1Tlksa0RBQW1CIn0=