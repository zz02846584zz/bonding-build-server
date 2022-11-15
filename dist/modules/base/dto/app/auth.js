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
exports.ApiResetPasswordDTO = exports.ApiForgotDTO = exports.ApiCaptchaDTO = exports.ApiRegisterDTO = exports.ApiLoginDTO = void 0;
const validate_1 = require("@midwayjs/validate");
const user_1 = require("../../entity/sys/user");
/**
 * 登錄參數校驗
 */
class ApiLoginDTO {
}
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()),
    __metadata("design:type", String)
], ApiLoginDTO.prototype, "area", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiLoginDTO.prototype, "phone", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiLoginDTO.prototype, "password", void 0);
exports.ApiLoginDTO = ApiLoginDTO;
class ApiRegisterDTO {
}
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "firstName", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "lastName", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "gender", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "phone", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "password", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().length(8).required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "passwordConfirm", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().length(6).required()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "verifyCode", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "birthday", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string()),
    __metadata("design:type", String)
], ApiRegisterDTO.prototype, "username", void 0);
exports.ApiRegisterDTO = ApiRegisterDTO;
class ApiCaptchaDTO {
}
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiCaptchaDTO.prototype, "type", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiCaptchaDTO.prototype, "phone", void 0);
exports.ApiCaptchaDTO = ApiCaptchaDTO;
class ApiForgotDTO {
}
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "phone", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "verifyCode", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "password", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiForgotDTO.prototype, "passwordConfirm", void 0);
exports.ApiForgotDTO = ApiForgotDTO;
class ApiResetPasswordDTO {
}
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiResetPasswordDTO.prototype, "oldPassword", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiResetPasswordDTO.prototype, "newPassword", void 0);
__decorate([
    (0, validate_1.Rule)(validate_1.RuleType.string().required()),
    __metadata("design:type", String)
], ApiResetPasswordDTO.prototype, "newPasswordConfirm", void 0);
exports.ApiResetPasswordDTO = ApiResetPasswordDTO;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9kdG8vYXBwL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW9EO0FBQ3BELGdEQUFtRDtBQUNuRDs7R0FFRztBQUNILE1BQWEsV0FBVztDQWV2QjtBQVpDO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7eUNBQ1g7QUFJYjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzBDQUNyQjtBQUlkO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7NkNBQ2xCO0FBWG5CLGtDQWVDO0FBRUQsTUFBYSxjQUFjO0NBK0MxQjtBQTVDQztJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O2lEQUNqQjtBQUlsQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O2dEQUNsQjtBQVFqQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzhDQUNoQjtBQVFuQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzZDQUNyQjtBQVFkO0lBTEMsSUFBQSxlQUFJLEVBQ0gsbUJBQVEsQ0FBQyxNQUFNLEVBQUU7U0FDZCxLQUFLLENBQUMsd0NBQXdDLENBQUM7U0FDL0MsUUFBUSxFQUFFLENBQ2Q7O2dEQUNnQjtBQUlqQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDOzt1REFDckI7QUFJeEI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7a0RBQzFCO0FBSW5CO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Z0RBQ1A7QUFHakI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDOztnREFDUDtBQTlDbkIsd0NBK0NDO0FBRUQsTUFBYSxhQUFhO0NBWXpCO0FBVEM7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzsyQ0FDdEI7QUFRYjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzRDQUNyQjtBQVhoQixzQ0FZQztBQUVELE1BQWEsWUFBWTtDQW9CeEI7QUFiQztJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzJDQUNyQjtBQUlkO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Z0RBQ2hCO0FBSW5CO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7OENBQ2xCO0FBSWpCO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7cURBQ1g7QUFuQjFCLG9DQW9CQztBQUVELE1BQWEsbUJBQW1CO0NBWS9CO0FBVEM7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzt3REFDZjtBQUlwQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3dEQUNmO0FBSXBCO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7K0RBQ1I7QUFYN0Isa0RBWUMifQ==