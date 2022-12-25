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
exports.BaseUserIdentityEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const baseEvent_1 = require("../../../../base/entity/baseEvent");
/**
 * 描述
 */
let BaseUserIdentityEntity = class BaseUserIdentityEntity extends baseEvent_1.BaseEventEntity {
};
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '用戶ID' }),
    __metadata("design:type", Number)
], BaseUserIdentityEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '正面照ID' }),
    __metadata("design:type", Number)
], BaseUserIdentityEntity.prototype, "positiveId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '背面照ID' }),
    __metadata("design:type", Number)
], BaseUserIdentityEntity.prototype, "negativeId", void 0);
BaseUserIdentityEntity = __decorate([
    (0, orm_1.EntityModel)('base_sys_user_identity')
], BaseUserIdentityEntity);
exports.BaseUserIdentityEntity = BaseUserIdentityEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pZGVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy91c2VyX2lkZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1QyxxQ0FBd0M7QUFDeEMsaUVBQW9FO0FBRXBFOztHQUVHO0FBRUgsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSwyQkFBZTtDQVUxRCxDQUFBO0FBUEM7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O3NEQUNiO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7OzBEQUNWO0FBR25CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDOzswREFDVjtBQVRSLHNCQUFzQjtJQURsQyxJQUFBLGlCQUFXLEVBQUMsd0JBQXdCLENBQUM7R0FDekIsc0JBQXNCLENBVWxDO0FBVlksd0RBQXNCIn0=