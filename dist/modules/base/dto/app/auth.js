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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZHRvL2FwcC9hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFvRDtBQUNwRCxnREFBbUQ7QUFDbkQ7O0dBRUc7QUFDSCxNQUFhLFdBQVc7Q0FldkI7QUFaQztJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7O3lDQUNYO0FBSWI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzswQ0FDckI7QUFJZDtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzZDQUNsQjtBQVhuQixrQ0FlQztBQUVELE1BQWEsY0FBYztDQStDMUI7QUE1Q0M7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztpREFDakI7QUFJbEI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOztnREFDbEI7QUFRakI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs4Q0FDaEI7QUFRbkI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs2Q0FDckI7QUFRZDtJQUxDLElBQUEsZUFBSSxFQUNILG1CQUFRLENBQUMsTUFBTSxFQUFFO1NBQ2QsS0FBSyxDQUFDLHdDQUF3QyxDQUFDO1NBQy9DLFFBQVEsRUFBRSxDQUNkOztnREFDZ0I7QUFJakI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7dURBQ3JCO0FBSXhCO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7O2tEQUMxQjtBQUluQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7O2dEQUNQO0FBR2pCO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7Z0RBQ1A7QUE5Q25CLHdDQStDQztBQUVELE1BQWEsYUFBYTtDQVl6QjtBQVRDO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7MkNBQ3RCO0FBUWI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs0Q0FDckI7QUFYaEIsc0NBWUM7QUFFRCxNQUFhLFlBQVk7Q0FvQnhCO0FBYkM7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzsyQ0FDckI7QUFJZDtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O2dEQUNoQjtBQUluQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OzhDQUNsQjtBQUlqQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7O3FEQUNYO0FBbkIxQixvQ0FvQkM7QUFFRCxNQUFhLG1CQUFtQjtDQVkvQjtBQVRDO0lBREMsSUFBQSxlQUFJLEVBQUMsbUJBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7d0RBQ2Y7QUFJcEI7SUFEQyxJQUFBLGVBQUksRUFBQyxtQkFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDOzt3REFDZjtBQUlwQjtJQURDLElBQUEsZUFBSSxFQUFDLG1CQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7OytEQUNSO0FBWDdCLGtEQVlDIn0=