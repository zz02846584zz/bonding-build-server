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
exports.AwardTipsEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const baseEvent_1 = require("../../../base/entity/baseEvent");
let AwardTipsEntity = class AwardTipsEntity extends baseEvent_1.BaseEventEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '標題' }),
    __metadata("design:type", String)
], AwardTipsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '內容', type: 'mediumtext' }),
    __metadata("design:type", String)
], AwardTipsEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '發布日期', nullable: true }),
    __metadata("design:type", String)
], AwardTipsEntity.prototype, "publishDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '狀態', type: 'tinyint' }),
    __metadata("design:type", Number)
], AwardTipsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '觀看次數', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AwardTipsEntity.prototype, "views", void 0);
AwardTipsEntity = __decorate([
    (0, orm_1.EntityModel)('award_tips')
], AwardTipsEntity);
exports.AwardTipsEntity = AwardTipsEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2F3YXJkL2VudGl0eS90aXBzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1QyxxQ0FBaUM7QUFDakMsOERBQWlFO0FBR2pFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsMkJBQWU7Q0FlbkQsQ0FBQTtBQWJDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDWjtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7O2dEQUM5QjtBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzhCQUMvQixNQUFNO29EQUFDO0FBR3BCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OytDQUM1QjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7OENBQ3ZDO0FBZEgsZUFBZTtJQUQzQixJQUFBLGlCQUFXLEVBQUMsWUFBWSxDQUFDO0dBQ2IsZUFBZSxDQWUzQjtBQWZZLDBDQUFlIn0=