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
exports.DemoRpcController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const rpc_1 = require("@cool-midway/rpc");
const rpc_2 = require("../../service/rpc");
/**
 * 微服务
 */
let DemoRpcController = class DemoRpcController extends core_1.BaseController {
    async call() {
        return this.ok(await this.rpc.call('goods', 'demoGoodsService', 'test', { a: 1 }));
    }
    async event() {
        this.rpc.broadcastEvent('test', { a: 1 });
        return this.ok();
    }
    async transaction() {
        await this.demoRpcService.transaction({ a: 1 });
        return this.ok();
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", rpc_1.CoolRpc)
], DemoRpcController.prototype, "rpc", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", rpc_2.DemoRpcService)
], DemoRpcController.prototype, "demoRpcService", void 0);
__decorate([
    (0, decorator_1.Post)('/call', { summary: '远程调用' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoRpcController.prototype, "call", null);
__decorate([
    (0, decorator_1.Post)('/event', { summary: '集群事件' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoRpcController.prototype, "event", null);
__decorate([
    (0, decorator_1.Post)('/transaction', { summary: '分布式事务' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoRpcController.prototype, "transaction", null);
DemoRpcController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)()
], DemoRpcController);
exports.DemoRpcController = DemoRpcController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVtby9jb250cm9sbGVyL2FwcC9ycGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTREO0FBQzVELDRDQUFtRTtBQUNuRSwwQ0FBMkM7QUFDM0MsMkNBQW1EO0FBRW5EOztHQUVHO0FBR0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxxQkFBYztJQVFuRCxLQUFLLENBQUMsSUFBSTtRQUNSLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FDWixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FDbkUsQ0FBQztJQUNKLENBQUM7SUFHRCxLQUFLLENBQUMsS0FBSztRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFHRCxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBQ0YsQ0FBQTtBQXZCQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDSixhQUFPOzhDQUFDO0FBR2I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ08sb0JBQWM7eURBQUM7QUFHL0I7SUFEQyxJQUFBLGdCQUFJLEVBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs7OzZDQUtsQztBQUdEO0lBREMsSUFBQSxnQkFBSSxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7Ozs4Q0FJbkM7QUFHRDtJQURDLElBQUEsZ0JBQUksRUFBQyxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7Ozs7b0RBSTFDO0FBeEJVLGlCQUFpQjtJQUY3QixJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEdBQUU7R0FDSixpQkFBaUIsQ0F5QjdCO0FBekJZLDhDQUFpQiJ9