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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1QyxxQ0FBd0M7QUFDeEMsbUVBQXNFO0FBRXRFLEtBQUs7QUFDTCxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDcEIsK0JBQWlCLENBQUE7SUFDakIsaUNBQW1CLENBQUE7SUFDbkIsK0JBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCO0FBRUQsSUFBWSxjQUtYO0FBTEQsV0FBWSxjQUFjO0lBQ3hCLDJDQUF5QixDQUFBO0lBQ3pCLHFDQUFtQixDQUFBO0lBQ25CLHFDQUFtQixDQUFBO0lBQ25CLG1DQUFpQixDQUFBO0FBQ25CLENBQUMsRUFMVyxjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQUt6QjtBQUVELElBQVksVUFJWDtBQUpELFdBQVksVUFBVTtJQUNwQiwyQkFBYSxDQUFBO0lBQ2IsK0JBQWlCLENBQUE7SUFDakIsbUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCO0FBRUQsSUFBWSxXQUlYO0FBSkQsV0FBWSxXQUFXO0lBQ3JCLHdDQUF5QixDQUFBO0lBQ3pCLGdDQUFpQixDQUFBO0lBQ2pCLGtDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUl0QjtBQUVEOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSw2QkFBZ0I7Q0FpRnRELENBQUE7QUE5RUM7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFN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