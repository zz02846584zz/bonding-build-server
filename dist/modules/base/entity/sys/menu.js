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
exports.BaseSysMenuEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 菜单
 */
let BaseSysMenuEntity = class BaseSysMenuEntity extends core_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '父菜单ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '菜单名称' }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '菜单地址', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "router", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '权限标识', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "perms", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '类型 0：目录 1：菜单 2：按钮',
        default: 0,
        type: 'tinyint',
    }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '图标', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '排序', default: 0 }),
    __metadata("design:type", Number)
], BaseSysMenuEntity.prototype, "orderNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '视图地址', nullable: true }),
    __metadata("design:type", String)
], BaseSysMenuEntity.prototype, "viewPath", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '路由缓存', default: true }),
    __metadata("design:type", Boolean)
], BaseSysMenuEntity.prototype, "keepAlive", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '是否显示', default: true }),
    __metadata("design:type", Boolean)
], BaseSysMenuEntity.prototype, "isShow", void 0);
BaseSysMenuEntity = __decorate([
    (0, orm_1.EntityModel)('base_sys_menu')
], BaseSysMenuEntity);
exports.BaseSysMenuEntity = BaseSysMenuEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy9tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBRWpDOztHQUVHO0FBRUgsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxpQkFBVTtDQXFDaEQsQ0FBQTtBQW5DQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUM1QztBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7K0NBQ2Y7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDN0I7QUFHZjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDOUI7QUFPZDtJQUxDLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsT0FBTyxFQUFFLENBQUM7UUFDVixJQUFJLEVBQUUsU0FBUztLQUNoQixDQUFDOzsrQ0FDVztBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OytDQUM3QjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7O21EQUNyQjtBQUdqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDM0I7QUFHakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0RBQ3hCO0FBTW5CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O2lEQUMzQjtBQXBDTCxpQkFBaUI7SUFEN0IsSUFBQSxpQkFBVyxFQUFDLGVBQWUsQ0FBQztHQUNoQixpQkFBaUIsQ0FxQzdCO0FBckNZLDhDQUFpQiJ9