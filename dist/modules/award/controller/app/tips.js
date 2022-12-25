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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipAppController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const tips_1 = require("../../service/app/tips");
const tips_2 = require("../../entity/tips");
/**
 * 描述
 */
let TipAppController = class TipAppController extends core_1.BaseController {
    /**
     * 小知識信息
     */
    async getInfo(param) {
        return this.ok(await this.tipAppService.getInfo(param));
    }
    /**
     * 今日小知識
     */
    async today() {
        return this.ok(await this.tipAppService.today());
    }
    /**
     * 今日小之日
     */
    async collection(params) {
        return this.ok(await this.tipAppService.collection(params));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", tips_1.TipAppService)
], TipAppController.prototype, "tipAppService", void 0);
__decorate([
    (0, decorator_1.Post)('/getInfo', { summary: '小知識信息' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TipAppController.prototype, "getInfo", null);
__decorate([
    (0, decorator_1.Post)('/today', { summary: '今日小知識' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TipAppController.prototype, "today", null);
__decorate([
    (0, decorator_1.Post)('/collection', { summary: '收藏登入賞' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TipAppController.prototype, "collection", null);
TipAppController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        prefix: '/app/tip',
        api: ['page'],
        entity: tips_2.AwardTipsEntity,
        service: tips_1.TipAppService,
    })
], TipAppController);
exports.TipAppController = TipAppController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2F3YXJkL2NvbnRyb2xsZXIvYXBwL3RpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWtFO0FBQ2xFLDRDQUFtRTtBQUNuRSxpREFBdUQ7QUFDdkQsNENBQW9EO0FBRXBEOztHQUVHO0FBUUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxxQkFBYztJQUlsRDs7T0FFRztJQUVILEtBQUssQ0FBQyxPQUFPLENBQVMsS0FBSztRQUN6QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxLQUFLO1FBQ1QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxVQUFVLENBQVMsTUFBTTtRQUM3QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRixDQUFBO0FBekJDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNNLG9CQUFhO3VEQUFDO0FBTTdCO0lBREMsSUFBQSxnQkFBSSxFQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN4QixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7OytDQUVwQjtBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7Ozs2Q0FHcEM7QUFNRDtJQURDLElBQUEsZ0JBQUksRUFBQyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDeEIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OztrREFFdkI7QUExQlUsZ0JBQWdCO0lBUDVCLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNiLE1BQU0sRUFBRSxzQkFBZTtRQUN2QixPQUFPLEVBQUUsb0JBQWE7S0FDdkIsQ0FBQztHQUNXLGdCQUFnQixDQTJCNUI7QUEzQlksNENBQWdCIn0=