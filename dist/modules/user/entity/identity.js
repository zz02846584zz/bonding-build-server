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
exports.UserIdentityEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const baseEvent_1 = require("../../../base/entity/baseEvent");
/**
 * 描述
 */
let UserIdentityEntity = class UserIdentityEntity extends baseEvent_1.BaseEventEntity {
};
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '用戶ID', type: 'bigint' }),
    __metadata("design:type", Number)
], UserIdentityEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '身分證號' }),
    __metadata("design:type", String)
], UserIdentityEntity.prototype, "idCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '正面照' }),
    __metadata("design:type", String)
], UserIdentityEntity.prototype, "positive", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '背面照' }),
    __metadata("design:type", String)
], UserIdentityEntity.prototype, "negative", void 0);
UserIdentityEntity = __decorate([
    (0, orm_1.EntityModel)('base_sys_user_identity')
], UserIdentityEntity);
exports.UserIdentityEntity = UserIdentityEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy91c2VyL2VudGl0eS9pZGVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMscUNBQXdDO0FBQ3hDLDhEQUFpRTtBQUVqRTs7R0FFRztBQUVILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEsMkJBQWU7Q0FhdEQsQ0FBQTtBQVZDO0lBRkMsSUFBQSxlQUFLLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7O2tEQUM3QjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztrREFDYjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOztvREFDVjtBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7b0RBQ1Y7QUFaTixrQkFBa0I7SUFEOUIsSUFBQSxpQkFBVyxFQUFDLHdCQUF3QixDQUFDO0dBQ3pCLGtCQUFrQixDQWE5QjtBQWJZLGdEQUFrQiJ9