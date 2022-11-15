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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FwcC9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBbUU7QUFDbkUsaURBQThDO0FBQzlDLGlEQUE0RDtBQUU1RCw2Q0FLNEI7QUFFNUI7O0dBRUc7QUFHSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLHFCQUFjO0lBSW5EOzs7T0FHRztJQUdILEtBQUssQ0FBQyxLQUFLLENBQVMsS0FBa0I7UUFDcEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRDs7O09BR0c7SUFHSCxLQUFLLENBQUMsUUFBUSxDQUFTLFFBQXdCO1FBQzdDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBR0gsS0FBSyxDQUFDLE1BQU0sQ0FBUyxNQUFvQjtRQUN2QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRztJQUdILEtBQUssQ0FBQyxPQUFPLENBQVMsTUFBcUI7UUFDekMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxZQUFZLENBQVMsTUFBTTtRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0YsQ0FBQTtBQWxEQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDVyx5QkFBa0I7NkRBQUM7QUFRdkM7SUFGQyxJQUFBLGdCQUFJLEVBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2pDLElBQUEsbUJBQVEsR0FBRTtJQUNFLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFRLGtCQUFXOzs4Q0FFckM7QUFRRDtJQUZDLElBQUEsZ0JBQUksRUFBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDcEMsSUFBQSxtQkFBUSxHQUFFO0lBQ0ssV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7cUNBQVcscUJBQWM7O2lEQUU5QztBQVFEO0lBRkMsSUFBQSxnQkFBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNwQyxJQUFBLG1CQUFRLEdBQUU7SUFDRyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBUyxtQkFBWTs7K0NBRXhDO0FBUUQ7SUFGQyxJQUFBLGdCQUFJLEVBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLElBQUEsbUJBQVEsR0FBRTtJQUNJLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFTLG9CQUFhOztnREFFMUM7QUFNRDtJQURDLElBQUEsZ0JBQUksRUFBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDMUIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OztxREFHekI7QUFuRFUsaUJBQWlCO0lBRjdCLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQyxXQUFXLENBQUM7R0FDZixpQkFBaUIsQ0FvRDdCO0FBcERZLDhDQUFpQiJ9