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
exports.BaseAdminAuthMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const _ = require("lodash");
const core_1 = require("@cool-midway/core");
const jwt = require("jsonwebtoken");
const cache_1 = require("@midwayjs/cache");
/**
 * 權限校驗
 */
let BaseAdminAuthMiddleware = class BaseAdminAuthMiddleware {
    resolve() {
        return async (ctx, next) => {
            let statusCode = 200;
            let { url } = ctx;
            url = url.replace(this.prefix, '');
            const token = ctx.get('Authorization');
            const adminUrl = '/admin/';
            // 路由地址為 admin前綴的 需要權限校驗
            if (_.startsWith(url, adminUrl)) {
                try {
                    ctx.admin = jwt.verify(token, this.jwtConfig.jwt.secret);
                }
                catch (err) { }
                // 不需要登錄 無需權限校驗
                if (new RegExp(`^${adminUrl}?.*/open/`).test(url)) {
                    await next();
                    return;
                }
                if (ctx.admin) {
                    // 超管擁有所有權限
                    if (ctx.admin.username == 'admin' && !ctx.admin.isRefresh) {
                        await next();
                        return;
                    }
                    // 要登錄每個人都有權限的接口
                    if (new RegExp(`^${adminUrl}?.*/comm/`).test(url)) {
                        await next();
                        return;
                    }
                    // 如果傳的token是refreshToken則校驗失敗
                    if (ctx.admin.isRefresh) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登錄失效',
                        };
                        return;
                    }
                    // 判斷密碼版本是否正確
                    const passwordV = await this.cacheManager.get(`admin:passwordVersion:${ctx.admin.userId}`);
                    if (passwordV != ctx.admin.passwordVersion) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登錄失效',
                        };
                        return;
                    }
                    const rToken = await this.cacheManager.get(`admin:token:${ctx.admin.userId}`);
                    if (!rToken) {
                        ctx.status = 401;
                        ctx.body = {
                            code: core_1.RESCODE.COMMFAIL,
                            message: '登錄失效或無權限訪問',
                        };
                        return;
                    }
                    if (rToken !== token && this.jwtConfig.sso) {
                        statusCode = 401;
                    }
                    else {
                        let perms = await this.cacheManager.get(`admin:perms:${ctx.admin.userId}`);
                        if (!_.isEmpty(perms)) {
                            perms = perms.map(e => {
                                return e.replace(/:/g, '/');
                            });
                            if (!perms.includes(url.split('?')[0].replace('/admin/', ''))) {
                                statusCode = 403;
                            }
                        }
                        else {
                            statusCode = 403;
                        }
                    }
                }
                else {
                    statusCode = 401;
                }
                if (statusCode > 200) {
                    ctx.status = statusCode;
                    ctx.body = {
                        code: core_1.RESCODE.COMMFAIL,
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
], BaseAdminAuthMiddleware.prototype, "prefix", void 0);
__decorate([
    (0, decorator_1.Config)('module.base'),
    __metadata("design:type", Object)
], BaseAdminAuthMiddleware.prototype, "jwtConfig", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cache_1.CacheManager)
], BaseAdminAuthMiddleware.prototype, "cacheManager", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], BaseAdminAuthMiddleware.prototype, "app", void 0);
BaseAdminAuthMiddleware = __decorate([
    (0, decorator_1.Middleware)()
], BaseAdminAuthMiddleware);
exports.BaseAdminAuthMiddleware = BaseAdminAuthMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvbWlkZGxld2FyZS9hZG1pbi1hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRTtBQUN0RSw0QkFBNEI7QUFDNUIsNENBQTRDO0FBQzVDLG9DQUFvQztBQUdwQywyQ0FBK0M7QUFFL0M7O0dBRUc7QUFFSCxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF1QjtJQWVsQyxPQUFPO1FBQ0wsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQWtCLEVBQUUsRUFBRTtZQUNoRCxJQUFJLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDckIsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUNsQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQzNCLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFO2dCQUMvQixJQUFJO29CQUNGLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzFEO2dCQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUU7Z0JBQ2hCLGVBQWU7Z0JBQ2YsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLFFBQVEsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNqRCxNQUFNLElBQUksRUFB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