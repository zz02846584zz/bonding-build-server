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
exports.TipEntity = exports.TipStatus = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
var TipStatus;
(function (TipStatus) {
    TipStatus["DRAFT"] = "draft";
    TipStatus["PUBLISHED"] = "published";
})(TipStatus = exports.TipStatus || (exports.TipStatus = {}));
let TipEntity = class TipEntity extends core_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '標題' }),
    __metadata("design:type", String)
], TipEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '內容', type: 'mediumtext' }),
    __metadata("design:type", String)
], TipEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '發布日期', nullable: true }),
    __metadata("design:type", String)
], TipEntity.prototype, "publishDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '狀態',
        type: 'enum',
        enum: TipStatus,
        default: TipStatus.DRAFT,
    }),
    __metadata("design:type", String)
], TipEntity.prototype, "status", void 0);
TipEntity = __decorate([
    (0, orm_1.EntityModel)('tip')
], TipEntity);
exports.TipEntity = TipEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy90aXAvZW50aXR5L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1Qyw0Q0FBK0M7QUFDL0MscUNBQWlDO0FBRWpDLElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNuQiw0QkFBZSxDQUFBO0lBQ2Ysb0NBQXVCLENBQUE7QUFDekIsQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCO0FBR0QsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBVSxTQUFRLGlCQUFVO0NBaUJ4QyxDQUFBO0FBZkM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O3dDQUNaO0FBR2Q7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQzs7MENBQzlCO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUN4QjtBQVFwQjtJQU5DLElBQUEsZ0JBQU0sRUFBQztRQUNOLE9BQU8sRUFBRSxJQUFJO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxTQUFTLENBQUMsS0FBSztLQUN6QixDQUFDOzt5Q0FDZ0I7QUFoQlAsU0FBUztJQURyQixJQUFBLGlCQUFXLEVBQUMsS0FBSyxDQUFDO0dBQ04sU0FBUyxDQWlCckI7QUFqQlksOEJBQVMifQ==