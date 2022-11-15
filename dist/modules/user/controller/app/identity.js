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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3VzZXIvY29udHJvbGxlci9hcHAvaWRlbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWtFO0FBQ2xFLDRDQUFtRTtBQUNuRSxpREFBOEM7QUFDOUMseURBQWlFO0FBQ2pFLHFEQUF5RDtBQUV6RDs7R0FFRztBQUdILElBQWEsc0JBQXNCLEdBQW5DLE1BQWEsc0JBQXVCLFNBQVEscUJBQWM7SUFNeEQsS0FBSyxDQUFDLFlBQVksQ0FBUyxLQUFzQjtRQUMvQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLGNBQWMsQ0FBUyxNQUFNO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0NBQ0YsQ0FBQTtBQWZDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDhCQUFtQjttRUFBQztBQUl6QztJQUZDLElBQUEsZ0JBQUksRUFBQyxnQkFBZ0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUMzQyxJQUFBLG1CQUFRLEdBQUU7SUFDUyxXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOztxQ0FBUSwwQkFBZTs7MERBRWhEO0FBTUQ7SUFEQyxJQUFBLGdCQUFJLEVBQUMsa0JBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDeEIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7Ozs0REFFM0I7QUFoQlUsc0JBQXNCO0lBRmxDLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQyxXQUFXLENBQUM7R0FDZixzQkFBc0IsQ0FpQmxDO0FBakJZLHdEQUFzQiJ9