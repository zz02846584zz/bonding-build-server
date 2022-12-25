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
exports.BaseSysConfEntity = void 0;
const typeorm_1 = require("typeorm");
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
/**
 * 系统配置
 */
let BaseSysConfEntity = class BaseSysConfEntity extends core_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '配置键' }),
    __metadata("design:type", String)
], BaseSysConfEntity.prototype, "cKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '配置值' }),
    __metadata("design:type", String)
], BaseSysConfEntity.prototype, "cValue", void 0);
BaseSysConfEntity = __decorate([
    (0, orm_1.EntityModel)('base_sys_conf')
], BaseSysConfEntity);
exports.BaseSysConfEntity = BaseSysConfEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy9jb25mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF3QztBQUN4Qyx1Q0FBNEM7QUFDNUMsNENBQStDO0FBRS9DOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxpQkFBVTtDQU9oRCxDQUFBO0FBSkM7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7OytDQUNkO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O2lEQUNaO0FBTkosaUJBQWlCO0lBRDdCLElBQUEsaUJBQVcsRUFBQyxlQUFlLENBQUM7R0FDaEIsaUJBQWlCLENBTzdCO0FBUFksOENBQWlCIn0=