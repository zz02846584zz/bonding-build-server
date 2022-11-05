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
const auth_2 = require("../../dto/app/auth");
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
        console.log(params);
        return this.ok(await this.baseAppAuthService.refreshToken(params));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", auth_1.BaseAppAuthService)
], AppAuthController.prototype, "baseAppAuthService", void 0);
__decorate([
    (0, decorator_1.Post)('/login', { summary: '登錄' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_2.ApiLoginDTO]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "login", null);
__decorate([
    (0, decorator_1.Post)('/register', { summary: '註冊' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_2.ApiRegisterDTO]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "register", null);
__decorate([
    (0, decorator_1.Post)('/forgot', { summary: '忘記密碼' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_2.ApiForgotDTO]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "forgot", null);
__decorate([
    (0, decorator_1.Post)('/captcha', { summary: '獲取驗證碼' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_2.ApiCaptchaDTO]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "captcha", null);
__decorate([
    (0, decorator_1.Post)('/refreshToken', { summary: '刷新token' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppAuthController.prototype, "refreshToken", null);
AppAuthController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)('/app/auth')
], AppAuthController);
exports.AppAuthController = AppAuthController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hcHAvYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBQW1FO0FBQ25FLGlEQUE4QztBQUM5QyxpREFBNEQ7QUFFNUQsNkNBSzRCO0FBRTVCOztHQUVHO0FBR0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxxQkFBYztJQUluRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsS0FBSyxDQUFTLEtBQWtCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7OztPQUdHO0lBR0gsS0FBSyxDQUFDLFFBQVEsQ0FBUyxRQUF3QjtRQUM3QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7T0FHRztJQUdILEtBQUssQ0FBQyxNQUFNLENBQVMsTUFBb0I7UUFDdkMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsT0FBTyxDQUFTLE1BQXFCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsWUFBWSxDQUFTLE1BQU07UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNGLENBQUE7QUFsREM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1cseUJBQWtCOzZEQUFDO0FBUXZDO0lBRkMsSUFBQSxnQkFBSSxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxJQUFBLG1CQUFRLEdBQUU7SUFDRSxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBUSxrQkFBVzs7OENBRXJDO0FBUUQ7SUFGQyxJQUFBLGdCQUFJLEVBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3BDLElBQUEsbUJBQVEsR0FBRTtJQUNLLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFXLHFCQUFjOztpREFFOUM7QUFRRDtJQUZDLElBQUEsZ0JBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDcEMsSUFBQSxtQkFBUSxHQUFFO0lBQ0csV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7cUNBQVMsbUJBQVk7OytDQUV4QztBQVFEO0lBRkMsSUFBQSxnQkFBSSxFQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN0QyxJQUFBLG1CQUFRLEdBQUU7SUFDSSxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBUyxvQkFBYTs7Z0RBRTFDO0FBTUQ7SUFEQyxJQUFBLGdCQUFJLEVBQUMsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQzFCLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7Ozs7cURBR3pCO0FBbkRVLGlCQUFpQjtJQUY3QixJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUMsV0FBVyxDQUFDO0dBQ2YsaUJBQWlCLENBb0Q3QjtBQXBEWSw4Q0FBaUIifQ==