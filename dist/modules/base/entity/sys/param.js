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
exports.BaseSysParamEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 参数配置
 */
let BaseSysParamEntity = class BaseSysParamEntity extends core_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '键位' }),
    __metadata("design:type", String)
], BaseSysParamEntity.prototype, "keyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '名称' }),
    __metadata("design:type", String)
], BaseSysParamEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '数据', type: 'text' }),
    __metadata("design:type", String)
], BaseSysParamEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '数据类型 0:字符串 1：数组 2：键值对',
        default: 0,
        type: 'tinyint',
    }),
    __metadata("design:type", Number)
], BaseSysParamEntity.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '备注', nullable: true }),
    __metadata("design:type", String)
], BaseSysParamEntity.prototype, "remark", void 0);
BaseSysParamEntity = __decorate([
    (0, orm_1.EntityModel)('base_sys_param')
], BaseSysParamEntity);
exports.BaseSysParamEntity = BaseSysParamEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL2VudGl0eS9zeXMvcGFyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBd0M7QUFFeEM7O0dBRUc7QUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLGlCQUFVO0NBb0JqRCxDQUFBO0FBakJDO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUNWO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDYjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O2dEQUMzQjtBQU9iO0lBTEMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxPQUFPLEVBQUUsQ0FBQztRQUNWLElBQUksRUFBRSxTQUFTO0tBQ2hCLENBQUM7O29EQUNlO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUMzQjtBQW5CSixrQkFBa0I7SUFEOUIsSUFBQSxpQkFBVyxFQUFDLGdCQUFnQixDQUFDO0dBQ2pCLGtCQUFrQixDQW9COUI7QUFwQlksZ0RBQWtCIn0=