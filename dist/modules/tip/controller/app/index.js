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
const app_1 = require("../../service/app");
const entity_1 = require("../../entity");
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
    __metadata("design:type", app_1.TipAppService)
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
        entity: entity_1.TipEntity,
        service: app_1.TipAppService,
    })
], TipAppController);
exports.TipAppController = TipAppController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy90aXAvY29udHJvbGxlci9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWtFO0FBQ2xFLDRDQUFtRTtBQUNuRSwyQ0FBa0Q7QUFDbEQseUNBQXlDO0FBRXpDOztHQUVHO0FBUUgsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxxQkFBYztJQUlsRDs7T0FFRztJQUVILEtBQUssQ0FBQyxPQUFPLENBQVMsS0FBSztRQUN6QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxLQUFLO1FBQ1QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxVQUFVLENBQVMsTUFBTTtRQUM3QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRixDQUFBO0FBekJDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNNLG1CQUFhO3VEQUFDO0FBTTdCO0lBREMsSUFBQSxnQkFBSSxFQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN4QixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7OytDQUVwQjtBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzs7Ozs2Q0FHcEM7QUFNRDtJQURDLElBQUEsZ0JBQUksRUFBQyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDeEIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OztrREFFdkI7QUExQlUsZ0JBQWdCO0lBUDVCLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNiLE1BQU0sRUFBRSxrQkFBUztRQUNqQixPQUFPLEVBQUUsbUJBQWE7S0FDdkIsQ0FBQztHQUNXLGdCQUFnQixDQTJCNUI7QUEzQlksNENBQWdCIn0=