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
exports.AwardTipsCategoryEntity = void 0;
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
let AwardTipsCategoryEntity = class AwardTipsCategoryEntity extends core_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '小知識ID', type: 'bigint' }),
    __metadata("design:type", Number)
], AwardTipsCategoryEntity.prototype, "tipId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '分類ID', type: 'bigint' }),
    __metadata("design:type", Number)
], AwardTipsCategoryEntity.prototype, "categoryId", void 0);
AwardTipsCategoryEntity = __decorate([
    (0, orm_1.EntityModel)('award_tips_category')
], AwardTipsCategoryEntity);
exports.AwardTipsCategoryEntity = AwardTipsCategoryEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwc19jYXRlZ29yeS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2F3YXJkL2VudGl0eS90aXBzX2NhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUErQztBQUMvQyx1Q0FBNEM7QUFDNUMscUNBQWlDO0FBR2pDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsaUJBQVU7Q0FNdEQsQ0FBQTtBQUpDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7O3NEQUMvQjtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7OzJEQUN6QjtBQUxSLHVCQUF1QjtJQURuQyxJQUFBLGlCQUFXLEVBQUMscUJBQXFCLENBQUM7R0FDdEIsdUJBQXVCLENBTW5DO0FBTlksMERBQXVCIn0=