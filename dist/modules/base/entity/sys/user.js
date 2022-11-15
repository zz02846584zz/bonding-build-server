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
exports.BaseSysUserEntity = exports.EmailVerify = exports.UserGender = exports.IdentifyVerify = exports.UserStatus = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const baseDelete_1 = require("../../../../base/entity/baseDelete");
// 列舉
var UserStatus;
(function (UserStatus) {
    UserStatus["NORMAL"] = "normal";
    UserStatus["SUSPEND"] = "suspend";
    UserStatus["DELETE"] = "delete";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var IdentifyVerify;
(function (IdentifyVerify) {
    IdentifyVerify["UNVERIFIED"] = "unverified";
    IdentifyVerify["PENDING"] = "pending";
    IdentifyVerify["REJECT"] = "rejected";
    IdentifyVerify["VERIFY"] = "verify";
})(IdentifyVerify = exports.IdentifyVerify || (exports.IdentifyVerify = {}));
var UserGender;
(function (UserGender) {
    UserGender["MALE"] = "male";
    UserGender["FEMALE"] = "female";
    UserGender["INTERSEX"] = "intersex";
})(UserGender = exports.UserGender || (exports.UserGender = {}));
var EmailVerify;
(function (EmailVerify) {
    EmailVerify["UNVERIFIED"] = "unverified";
    EmailVerify["VERIFY"] = "verify";
    EmailVerify["PENDING"] = "pending";
})(EmailVerify = exports.EmailVerify || (exports.EmailVerify = {}));
/**
 * 系統用戶
 */
let BaseSysUserEntity = class BaseSysUserEntity extends baseDelete_1.BaseDeleteEntity {
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '部門ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '用戶名', length: 100 }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'Email', nullable: true, unique: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EmailVerify,
        default: EmailVerify.UNVERIFIED,
    }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "emailVerify", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '電話(帶區碼)', length: 20, nullable: true, unique: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '密碼' }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '密碼版本, 作用是改完密碼, 讓原來的token失效',
        default: 1,
    }),
    __metadata("design:type", Number)
], BaseSysUserEntity.prototype, "passwordV", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.NORMAL,
    }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: IdentifyVerify,
        default: IdentifyVerify.UNVERIFIED,
    }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "identifyVerify", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'socketId', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "socketId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '姓' }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '名' }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '身分證', nullable: true, unique: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "idCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '生日', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '頭像', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "headImg", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: UserGender,
    }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '備注', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '簡介', nullable: true }),
    __metadata("design:type", String)
], BaseSysUserEntity.prototype, "intro", void 0);
BaseSysUserEntity = __decorate([
    (0, orm_1.EntityModel)('base_sys_user')
], BaseSysUserEntity);
exports.BaseSysUserEntity = BaseSysUserEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9lbnRpdHkvc3lzL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLHFDQUF3QztBQUN4QyxtRUFBc0U7QUFFdEUsS0FBSztBQUNMLElBQVksVUFJWDtBQUpELFdBQVksVUFBVTtJQUNwQiwrQkFBaUIsQ0FBQTtJQUNqQixpQ0FBbUIsQ0FBQTtJQUNuQiwrQkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFFRCxJQUFZLGNBS1g7QUFMRCxXQUFZLGNBQWM7SUFDeEIsMkNBQXlCLENBQUE7SUFDekIscUNBQW1CLENBQUE7SUFDbkIscUNBQW1CLENBQUE7SUFDbkIsbUNBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUxXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBS3pCO0FBRUQsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ3BCLDJCQUFhLENBQUE7SUFDYiwrQkFBaUIsQ0FBQTtJQUNqQixtQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckI7QUFFRCxJQUFZLFdBSVg7QUFKRCxXQUFZLFdBQVc7SUFDckIsd0NBQXlCLENBQUE7SUFDekIsZ0NBQWlCLENBQUE7SUFDakIsa0NBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUpXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBSXRCO0FBRUQ7O0dBRUc7QUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLDZCQUFnQjtDQWlGdEQsQ0FBQTtBQTlFQztJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxF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