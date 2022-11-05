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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hcHAvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBQTRFO0FBQzVFLGdEQUEwRDtBQUMxRCxpREFBNEQ7QUFDNUQsbURBQThEO0FBRTlELGlEQUE4QztBQUM5Qyw2Q0FBeUQ7QUFFekQ7O0dBRUc7QUFRSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBYXZEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE1BQU07UUFDVixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsWUFBWSxDQUFTLE1BQU07UUFDL0IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7T0FFRztJQUdILEtBQUssQ0FBQyxhQUFhLENBQVMsTUFBMkI7UUFDckQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxXQUFXLENBQVMsTUFBTTtRQUM5QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLFlBQVksQ0FBUyxNQUFNO1FBQy9CLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsV0FBVyxDQUFTLE1BQU07UUFDOUIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxNQUFNO1FBQ1YsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkMsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNGLENBQUE7QUFwRUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1cseUJBQWtCO2lFQUFDO0FBR3ZDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDJCQUFtQjtrRUFBQztBQUd6QztJQURDLElBQUEsa0JBQU0sR0FBRTs7a0RBQ0k7QUFHYjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDSixjQUFPO2tEQUFDO0FBTWI7SUFEQyxJQUFBLGdCQUFJLEVBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOzs7O21EQUdwQztBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN2QixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3lEQUV6QjtBQU9EO0lBRkMsSUFBQSxnQkFBSSxFQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQzVDLElBQUEsbUJBQVEsR0FBRTtJQUNVLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFTLDBCQUFtQjs7MERBRXREO0FBTUQ7SUFEQyxJQUFBLGdCQUFJLEVBQUMsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7Ozs7d0RBRXhCO0FBTUQ7SUFEQyxJQUFBLGdCQUFJLEVBQUMsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDM0IsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7Ozt5REFFekI7QUFNRDtJQURDLElBQUEsZ0JBQUksRUFBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDM0IsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7Ozt3REFFeEI7QUFNRDtJQURDLElBQUEsZ0JBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7Ozs7bURBSWxDO0FBckVVLHFCQUFxQjtJQVBqQyxJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUM7UUFDZCxNQUFNLEVBQUUsV0FBVztRQUNuQixHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sRUFBRSx3QkFBaUI7UUFDekIsT0FBTyxFQUFFLHlCQUFrQjtLQUM1QixDQUFDO0dBQ1cscUJBQXFCLENBc0VqQztBQXRFWSxzREFBcUIifQ==