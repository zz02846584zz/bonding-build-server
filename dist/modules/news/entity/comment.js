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
exports.NewsArticleCommentEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const baseDelete_1 = require("../../../base/entity/baseDelete");
/**
 * 描述
 */
let NewsArticleCommentEntity = class NewsArticleCommentEntity extends baseDelete_1.BaseDeleteEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '文章ID', type: 'bigint' }),
    __metadata("design:type", Number)
], NewsArticleCommentEntity.prototype, "articleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '內容' }),
    __metadata("design:type", String)
], NewsArticleCommentEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: 'ip', nullable: true, length: 50 }),
    __metadata("design:type", String)
], NewsArticleCommentEntity.prototype, "ip", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: 'ip地址', nullable: true, length: 50 }),
    __metadata("design:type", String)
], NewsArticleCommentEntity.prototype, "ipAddr", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '父ID', type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], NewsArticleCommentEntity.prototype, "parentId", void 0);
NewsArticleCommentEntity = __decorate([
    (0, orm_1.EntityModel)('news_comment')
], NewsArticleCommentEntity);
exports.NewsArticleCommentEntity = NewsArticleCommentEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvZW50aXR5L2NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLHFDQUF3QztBQUN4QyxnRUFBbUU7QUFFbkU7O0dBRUc7QUFFSCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLDZCQUFnQjtDQWlCN0QsQ0FBQTtBQWZDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7OzJEQUMxQjtBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7eURBQ1Y7QUFJaEI7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7O29EQUMzQztBQUlYO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDOzt3REFDekM7QUFHZjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzBEQUMxQztBQWhCTix3QkFBd0I7SUFEcEMsSUFBQSxpQkFBVyxFQUFDLGNBQWMsQ0FBQztHQUNmLHdCQUF3QixDQWlCcEM7QUFqQlksNERBQXdCIn0=