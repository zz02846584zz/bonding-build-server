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
exports.BaseAppAuthMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const cache_1 = require("@midwayjs/cache");
/**
 * 權限校驗
 */
let BaseAppAuthMiddleware = class BaseAppAuthMiddleware {
    resolve() {
        return async (ctx, next) => {
            let statusCode = 200;
            let { url } = ctx;
            url = url.replace(this.prefix, '');
            const token = ctx.get('Authorization');
            const appUrl = '/app/';
            // 需驗證的路徑
            const authList = ['user', 'collection', 'tip', 'my'];
            const module = url.replace(appUrl, '').split('/')[0];
            const moduleAuth = _.some(authList, x => x === module);
            try {
                ctx.user = jwt.verify(token, this.jwtConfig.jwt.secret);
            }
            catch (err) { }
            // 路由地址為 app前綴的 權限校驗
            if (_.startsWith(url, appUrl)) {
                if (ctx.user) {
                    // 不需要登錄 無需權限校驗
                    if (new RegExp(`^${appUrl}?.*/auth/`).test(url)) {
                        await next();
                        return;
                    }
                    await next();
                    return;
                    // 如果傳的token是refreshToken則校驗失敗
                    if (ctx.user.isRefresh) {
                        ctx.status = 401;
                        ctx.body = {
                            code: 1005,
                            message: '登錄失效',
                        };
                        return;
                    }
                    // 判斷密碼版本是否正確
                    const passwordV = await this.cacheManager.get(`user:passwordVersion:${ctx.user.userId}`);
                    if (passwordV != ctx.user.passwordVersion) {
                        ctx.status = 401;
                        ctx.body = {
                            code: 1005,
                            message: '登錄失效',
                        };
                        return;
                    }
                    const rToken = await this.cacheManager.get(`user:token:${ctx.user.userId}`);
                    if (!rToken) {
                        ctx.status = 401;
                        ctx.body = {
                            code: 1005,
                            message: '登錄失效或無權限訪問',
                        };
                        return;
                    }
                    if (rToken !== token && this.jwtConfig.sso) {
                        statusCode = 401;
                    }
                    else {
                        // 角色權限校驗 - 待處理
                        // let perms: string[] = await this.cacheManager.get(
                        //   `user:perms:${ctx.user.userId}`
                        // );
                        // if (!_.isEmpty(perms)) {
                        //   perms = perms.map(e => {
                        //     return e.replace(/:/g, '/');
                        //   });
                        //   return perms;
                        //   if (!perms.includes(url.split('?')[0].replace('/api/', ''))) {
                        //     statusCode = 403;
                        //   }
                        // } else {
                        //   statusCode = 403;
                        // }
                    }
                }
                else if (moduleAuth) {
                    // 需要驗證且未登入
                    ctx.status = 401;
                    ctx.body = {
                        code: 1005,
                        message: '登錄失效或無權限訪問',
                    };
                    return;
                }
                if (statusCode > 200) {
                    ctx.status = statusCode;
                    ctx.body = {
                        code: 1005,
                        message: '登錄失效或無權限訪問',
                    };
                    return;
                }
            }
            await next();
        };
    }
};
__decorate([
    (0, decorator_1.Config)('koa.globalPrefix'),
    __metadata("design:type", Object)
], BaseAppAuthMiddleware.prototype, "prefix", void 0);
__decorate([
    (0, decorator_1.Config)('module.base'),
    __metadata("design:type", Object)
], BaseAppAuthMiddleware.prototype, "jwtConfig", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cache_1.CacheManager)
], BaseAppAuthMiddleware.prototype, "cacheManager", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], BaseAppAuthMiddleware.prototype, "app", void 0);
BaseAppAuthMiddleware = __decorate([
    (0, decorator_1.Middleware)()
], BaseAppAuthMiddleware);
exports.BaseAppAuthMiddleware = BaseAppAuthMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWF1dGguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL21pZGRsZXdhcmUvYXBwLWF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNFO0FBQ3RFLDRCQUE0QjtBQUM1QixvQ0FBb0M7QUFHcEMsMkNBQStDO0FBRS9DOztHQUVHO0FBRUgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFlaEMsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDaEQsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDbEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUN2QixTQUFTO1lBQ1QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUM7WUFDdkQsSUFBSTtnQkFDRixHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcs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