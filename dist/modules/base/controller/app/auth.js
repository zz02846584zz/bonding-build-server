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
exports.AppAuthController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const validate_1 = require("@midwayjs/validate");
const auth_1 = require("../../service/app/auth");
const user_1 = require("../../service/app/user");
/**
 * 商品
 */
let AppAuthController = class AppAuthController extends core_1.BaseController {
    /**
     * 登錄
     * @param login
     */
    async login(login) {
        return this.ok(await this.baseAppAuthService.login(login));
    }
    /**
     * 註冊
     * @param register
     */
    async register(register) {
        return this.ok(await this.baseAppAuthService.register(register));
    }
    /**
     * 註冊
     * @param forgot
     */
    async forgot(forgot) {
        return this.ok(await this.baseAppAuthService.forgot(forgot));
    }
    /**
     * 獲得驗證碼
     * @param captcha
     */
    async captcha(params) {
        return this.ok(await this.baseAppAuthService.captcha(params));
    }
    /**
     * 刷新token
     */
    async refreshToken(params) {
        return this.ok(await this.baseAppAuthService.refreshToken(params));
    }
    /**
     * 驗證Email
     */
    async emailVerify(params) {
        return this.ok(await this.baseApiUserService.emailVerify(params));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", auth_1.BaseAppAuthService)
], AppAuthController.prototype, "baseAppAuthService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_1.BaseApiUserService)
], AppAuthController.prototype, "baseApiUserService", void 0);
__decorate([
    (0, decorator_1.Post)('/login', { summary: '登錄' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "login", null);
__decorate([
    (0, decorator_1.Post)('/register', { summary: '註冊' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "register", null);
__decorate([
    (0, decorator_1.Post)('/forgot', { summary: '忘記密碼' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "forgot", null);
__decorate([
    (0, decorator_1.Post)('/captcha', { summary: '獲取驗證碼' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "captcha", null);
__decorate([
    (0, decorator_1.Post)('/refreshToken', { summary: '刷新token' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "refreshToken", null);
__decorate([
    (0, decorator_1.Post)('/email-verify', { summary: '驗證Email' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "emailVerify", null);
AppAuthController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)('/app/auth')
], AppAuthController);
exports.AppAuthController = AppAuthController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hcHAvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBQW1FO0FBQ25FLGlEQUE4QztBQUM5QyxpREFBNEQ7QUFDNUQsaURBQTREO0FBRTVEOztHQUVHO0FBR0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxxQkFBYztJQU9uRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsS0FBSyxDQUFTLEtBQUs7UUFDdkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsUUFBUSxDQUFTLFFBQVE7UUFDN0IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsTUFBTSxDQUFTLE1BQU07UUFDekIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsT0FBTyxDQUFTLE1BQU07UUFDMUIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxZQUFZLENBQVMsTUFBTTtRQUMvQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLFdBQVcsQ0FBUyxNQUFNO1FBQzlCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0YsQ0FBQTtBQTVEQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDVyx5QkFBa0I7NkRBQUM7QUFHdkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1cseUJBQWtCOzZEQUFDO0FBUXZDO0lBRkMsSUFBQSxnQkFBSSxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxJQUFBLG1CQUFRLEdBQUU7SUFDRSxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7OzhDQUVsQjtBQVFEO0lBRkMsSUFBQSxnQkFBSSxFQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNwQyxJQUFBLG1CQUFRLEdBQUU7SUFDSyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O2lEQUVyQjtBQVFEO0lBRkMsSUFBQSxnQkFBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNwQyxJQUFBLG1CQUFRLEdBQUU7SUFDRyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7OytDQUVuQjtBQVFEO0lBRkMsSUFBQSxnQkFBSSxFQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN0QyxJQUFBLG1CQUFRLEdBQUU7SUFDSSxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O2dEQUVwQjtBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUMxQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3FEQUV6QjtBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLGVBQWUsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUMzQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O29EQUV4QjtBQTdEVSxpQkFBaUI7SUFGN0IsSUFBQSxtQkFBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxFQUFDLFdBQVcsQ0FBQztHQUNmLGlCQUFpQixDQThEN0I7QUE5RFksOENBQWlCIn0=