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
exports.UserIdentityController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const validate_1 = require("@midwayjs/validate");
const identity_1 = require("../../service/app/identity");
const identity_2 = require("../../dto/app/identity");
/**
 * 描述
 */
let UserIdentityController = class UserIdentityController extends core_1.BaseController {
    async identityCert(param) {
        return this.ok(await this.userIdentityService.identityCert(param));
    }
    /**
     * 身份驗證
     */
    async identifyVerify(params) {
        return this.ok(await this.userIdentityService.identifyVerify(params));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", identity_1.UserIdentityService)
], UserIdentityController.prototype, "userIdentityService", void 0);
__decorate([
    (0, decorator_1.Post)('/identity-cert', { summary: '身份驗證' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [identity_2.UserIdentityDTO]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "identityCert", null);
__decorate([
    (0, decorator_1.Post)('/identify-verify', { summary: '身份驗證' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserIdentityController.prototype, "identifyVerify", null);
UserIdentityController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)('/app/user')
], UserIdentityController);
exports.UserIdentityController = UserIdentityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy91c2VyL2NvbnRyb2xsZXIvYXBwL2lkZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBbUU7QUFDbkUsaURBQThDO0FBQzlDLHlEQUFpRTtBQUNqRSxxREFBeUQ7QUFFekQ7O0dBRUc7QUFHSCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLHFCQUFjO0lBTXhELEtBQUssQ0FBQyxZQUFZLENBQVMsS0FBc0I7UUFDL0MsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxjQUFjLENBQVMsTUFBTTtRQUNqQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUNGLENBQUE7QUFmQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDWSw4QkFBbUI7bUVBQUM7QUFJekM7SUFGQyxJQUFBLGdCQUFJLEVBQUMsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDM0MsSUFBQSxtQkFBUSxHQUFFO0lBQ1MsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7cUNBQVEsMEJBQWU7OzBEQUVoRDtBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLGtCQUFrQixFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7Ozs7NERBRTNCO0FBaEJVLHNCQUFzQjtJQUZsQyxJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUMsV0FBVyxDQUFDO0dBQ2Ysc0JBQXNCLENBaUJsQztBQWpCWSx3REFBc0IifQ==