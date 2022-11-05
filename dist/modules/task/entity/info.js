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
exports.TaskInfoEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 任務信息
 */
let TaskInfoEntity = class TaskInfoEntity extends core_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '任務ID', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '任務配置', nullable: true, length: 1000 }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "repeatConf", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '名稱' }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'cron', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "cron", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '最大執行次數 不傳為無限次', nullable: true }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "limit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        comment: '每間隔多少毫秒執行一次 如果cron設置了 這項設置就無效',
        nullable: true,
    }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "every", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '備註', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "remark", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '狀態 0:停止 1：運行', default: 1, type: 'tinyint' }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '開始時間', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '結束時間', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '數據', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '執行的service實例ID', nullable: true }),
    __metadata("design:type", String)
], TaskInfoEntity.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '狀態 0:系統 1：用戶', default: 0, type: 'tinyint' }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '下一次執行時間', nullable: true }),
    __metadata("design:type", Date)
], TaskInfoEntity.prototype, "nextRunTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '狀態 0:cron 1：時間間隔', default: 0, type: 'tinyint' }),
    __metadata("design:type", Number)
], TaskInfoEntity.prototype, "taskType", void 0);
TaskInfoEntity = __decorate([
    (0, orm_1.EntityModel)('task_info')
], TaskInfoEntity);
exports.TaskInfoEntity = TaskInfoEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3Rhc2svZW50aXR5L2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLDRDQUErQztBQUMvQyxxQ0FBaUM7QUFFakM7O0dBRUc7QUFFSCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsaUJBQVU7Q0FnRDdDLENBQUE7QUE5Q0M7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NkNBQzlCO0FBR2Q7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOztrREFDdkM7QUFHbkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzRDQUNiO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQy9CO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NkNBQ3ZDO0FBTWQ7SUFKQyxJQUFBLGdCQUFNLEVBQUM7UUFDTixPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQzs7NkNBQ1k7QUFHZDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDM0I7QUFHZjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OzhDQUNsRDtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ2pDLElBQUk7aURBQUM7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDbkMsSUFBSTsrQ0FBQztBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzRDQUM3QjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQ3RDO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7NENBQ3BEO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDbEMsSUFBSTttREFBQztBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7Z0RBQ3BEO0FBL0NOLGNBQWM7SUFEMUIsSUFBQSxpQkFBVyxFQUFDLFdBQVcsQ0FBQztHQUNaLGNBQWMsQ0FnRDFCO0FBaERZLHdDQUFjIn0=