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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3RpcC9lbnRpdHkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakMsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLDRCQUFlLENBQUE7SUFDZixvQ0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFHRCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFVLFNBQVEsaUJBQVU7Q0FpQnhDLENBQUE7QUFmQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7d0NBQ1o7QUFHZDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOzswQ0FDOUI7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OENBQ3hCO0FBUXBCO0lBTkMsSUFBQSxnQkFBTSxFQUFDO1FBQ04sT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLFNBQVMsQ0FBQyxLQUFLO0tBQ3pCLENBQUM7O3lDQUNnQjtBQWhCUCxTQUFTO0lBRHJCLElBQUEsaUJBQVcsRUFBQyxLQUFLLENBQUM7R0FDTixTQUFTLENBaUJyQjtBQWpCWSw4QkFBUyJ9