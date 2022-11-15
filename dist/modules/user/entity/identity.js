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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3VzZXIvZW50aXR5L2lkZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1QyxxQ0FBd0M7QUFDeEMsOERBQWlFO0FBRWpFOztHQUVHO0FBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSwyQkFBZTtDQWF0RCxDQUFBO0FBVkM7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7a0RBQzdCO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O2tEQUNiO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O29EQUNWO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOztvREFDVjtBQVpOLGtCQUFrQjtJQUQ5QixJQUFBLGlCQUFXLEVBQUMsd0JBQXdCLENBQUM7R0FDekIsa0JBQWtCLENBYTlCO0FBYlksZ0RBQWtCIn0=