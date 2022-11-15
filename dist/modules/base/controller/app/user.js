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
exports.BaseAppUserController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const user_1 = require("../../entity/sys/user");
const user_2 = require("../../service/app/user");
const param_1 = require("../../service/sys/param");
const validate_1 = require("@midwayjs/validate");
const auth_1 = require("../../dto/app/auth");
/**
 * 不需要登錄的後台接口
 */
let BaseAppUserController = class BaseAppUserController extends core_1.BaseController {
    /**
     * 取得個人資料
     */
    async person() {
        return this.ok(await this.baseApiUserService.person());
    }
    /**
     * 修改個人資料
     */
    async personUpdate(params) {
        return this.ok(await this.baseApiUserService.personUpdate(params));
    }
    /**
     * 重設密碼
     */
    async resetPassword(params) {
        return this.ok(await this.baseApiUserService.resetPassword(params));
    }
    /**
     * 綁定Email
     */
    async changePhone(params) {
        return this.ok(await this.baseApiUserService.changePhone(params));
    }
    /**
     * 綁定Email
     */
    async emailBinding(params) {
        return this.ok(await this.baseApiUserService.emailBinding(params));
    }
    /**
     * 驗證Email
     */
    async emailVerify(params) {
        return this.ok(await this.baseApiUserService.emailVerify(params));
    }
    /**
     * 退出
     */
    async logout() {
        await this.baseApiUserService.logout();
        return this.ok();
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_2.BaseApiUserService)
], BaseAppUserController.prototype, "baseApiUserService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", param_1.BaseSysParamService)
], BaseAppUserController.prototype, "baseSysParamService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseAppUserController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", core_1.CoolEps)
], BaseAppUserController.prototype, "eps", void 0);
__decorate([
    (0, decorator_1.Post)('/person', { summary: '個人資料' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "person", null);
__decorate([
    (0, decorator_1.Post)('/personUpdate', { summary: '個人資料' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "personUpdate", null);
__decorate([
    (0, decorator_1.Post)('/reset-password', { summary: '重設密碼' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.ApiResetPasswordDTO]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "resetPassword", null);
__decorate([
    (0, decorator_1.Post)('/change-phone', { summary: '修改電話' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "changePhone", null);
__decorate([
    (0, decorator_1.Post)('/email-binding', { summary: '綁定Email' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "emailBinding", null);
__decorate([
    (0, decorator_1.Post)('/email-verify', { summary: '驗證Email' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "emailVerify", null);
__decorate([
    (0, decorator_1.Post)('/logout', { summary: '退出' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "logout", null);
BaseAppUserController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        prefix: '/app/user',
        api: ['delete', 'info'],
        entity: user_1.BaseSysUserEntity,
        service: user_2.BaseApiUserService,
    })
], BaseAppUserController);
exports.BaseAppUserController = BaseAppUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FwcC91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBNEU7QUFDNUUsZ0RBQTBEO0FBQzFELGlEQUE0RDtBQUM1RCxtREFBOEQ7QUFFOUQsaURBQThDO0FBQzlDLDZDQUF5RDtBQUV6RDs7R0FFRztBQVFILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFhdkQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNWLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxZQUFZLENBQVMsTUFBTTtRQUMvQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOztPQUVHO0lBR0gsS0FBSyxDQUFDLGFBQWEsQ0FBUyxNQUEyQjtRQUNyRCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLFdBQVcsQ0FBUyxNQUFNO1FBQzlCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsWUFBWSxDQUFTLE1BQU07UUFDL0IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxXQUFXLENBQVMsTUFBTTtRQUM5QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE1BQU07UUFDVixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBQ0YsQ0FBQTtBQXBFQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDVyx5QkFBa0I7aUVBQUM7QUFHdkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1ksMkJBQW1CO2tFQUFDO0FBR3pDO0lBREMsSUFBQSxrQkFBTSxHQUFFOztrREFDSTtBQUdiO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNKLGNBQU87a0RBQUM7QUFNYjtJQURDLElBQUEsZ0JBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7Ozs7bURBR3BDO0FBTUQ7SUFEQyxJQUFBLGdCQUFJLEVBQUMsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3ZCLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7Ozs7eURBRXpCO0FBT0Q7SUFGQyxJQUFBLGdCQUFJLEVBQUMsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDNUMsSUFBQSxtQkFBUSxHQUFFO0lBQ1UsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7cUNBQVMsMEJBQW1COzswREFFdEQ7QUFNRDtJQURDLElBQUEsZ0JBQUksRUFBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDeEIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7Ozt3REFFeEI7QUFNRDtJQURDLElBQUEsZ0JBQUksRUFBQyxnQkFBZ0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUMzQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3lEQUV6QjtBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUMzQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3dEQUV4QjtBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OzttREFJbEM7QUFyRVUscUJBQXFCO0lBUGpDLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLE1BQU0sRUFBRSxXQUFXO1FBQ25CLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7UUFDdkIsTUFBTSxFQUFFLHdCQUFpQjtRQUN6QixPQUFPLEVBQUUseUJBQWtCO0tBQzVCLENBQUM7R0FDVyxxQkFBcUIsQ0FzRWpDO0FBdEVZLHNEQUFxQiJ9