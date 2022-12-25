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
exports.DemoMiddleware = void 0;
const core_1 = require("@cool-midway/core");
const decorator_1 = require("@midwayjs/decorator");
let DemoMiddleware = class DemoMiddleware {
    resolve() {
        return async (ctx, next) => {
            const urls = this.tag.byKey(core_1.TagTypes.IGNORE_TOKEN);
            console.log('忽略token的URL数组', urls);
            // 控制器前执行的逻辑
            const startTime = Date.now();
            // 执行下一个 Web 中间件，最后执行到控制器
            // 这里可以拿到下一个中间件或者控制器的返回值
            const result = await next();
            // 控制器之后执行的逻辑
            console.log(Date.now() - startTime);
            // 返回给上一个中间件的结果
            return result;
        };
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", core_1.CoolUrlTagData)
], DemoMiddleware.prototype, "tag", void 0);
DemoMiddleware = __decorate([
    (0, decorator_1.Middleware)()
], DemoMiddleware);
exports.DemoMiddleware = DemoMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RlbW8vbWlkZGxld2FyZS9kZW1vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUE2RDtBQUU3RCxtREFBeUQ7QUFJekQsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUl6QixPQUFPO1FBQ0wsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQWtCLEVBQUUsRUFBRTtZQUNoRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbkMsWUFBWTtZQUNaLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3Qix5QkFBeUI7WUFDekIsd0JBQXdCO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDNUIsYUFBYTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLGVBQWU7WUFDZixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQW5CQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDSixxQkFBYzsyQ0FBQztBQUZULGNBQWM7SUFEMUIsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsY0FBYyxDQXFCMUI7QUFyQlksd0NBQWMifQ==