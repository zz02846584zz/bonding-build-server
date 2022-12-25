"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLogMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
const log_1 = require("../service/sys/log");
/**
 * 日志中间件
 */
let BaseLogMiddleware = class BaseLogMiddleware {
    resolve() {
        return async (ctx, next) => {
            const baseSysLogService = await ctx.requestContext.getAsync(log_1.BaseSysLogService);
            baseSysLogService.record(ctx, ctx.url.split('?')[0], ctx.req.method === 'GET' ? ctx.request.query : ctx.request.body, ctx.admin ? ctx.admin.userId : null);
            await next();
        };
    }
};
BaseLogMiddleware = __decorate([
    (0, decorator_1.Middleware)()
], BaseLogMiddleware);
exports.BaseLogMiddleware = BaseLogMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9taWRkbGV3YXJlL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtREFBaUQ7QUFJakQsNENBQXVEO0FBRXZEOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFDNUIsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDaEQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUN6RCx1QkFBaUIsQ0FDbEIsQ0FBQztZQUNGLGlCQUFpQixDQUFDLE1BQU0sQ0FDdEIsR0FBRyxFQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNyQixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFDL0QsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDcEMsQ0FBQztZQUNGLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDZixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWZZLGlCQUFpQjtJQUQ3QixJQUFBLHNCQUFVLEdBQUU7R0FDQSxpQkFBaUIsQ0FlN0I7QUFmWSw4Q0FBaUIifQ==