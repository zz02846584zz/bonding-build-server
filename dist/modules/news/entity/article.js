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
exports.NewsArticleEntity = exports.ArticleType = exports.ArticleStatus = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const baseDelete_1 = require("../../../base/entity/baseDelete");
var ArticleStatus;
(function (ArticleStatus) {
    ArticleStatus["DRAFT"] = "draft";
    ArticleStatus["PENDING"] = "pending";
    ArticleStatus["REJECT"] = "reject";
    ArticleStatus["PUBLISHED"] = "published";
    ArticleStatus["DELETE"] = "delete";
    ArticleStatus["SCHEDULE"] = "schedule";
})(ArticleStatus = exports.ArticleStatus || (exports.ArticleStatus = {}));
var ArticleType;
(function (ArticleType) {
    ArticleType["NORMAL"] = "normal";
    ArticleType["VIDEO"] = "video";
})(ArticleType = exports.ArticleType || (exports.ArticleType = {}));
let NewsArticleEntity = class NewsArticleEntity extends baseDelete_1.BaseDeleteEntity {
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '標題' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'meta標題', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "metaTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'meta描述', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "metaDescription", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ comment: '代稱' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '完整文章', type: 'mediumtext' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '預覽內容', type: 'mediumtext' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "content_preview", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '摘錄', type: 'mediumtext', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "excerpt", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '縮圖', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '開啟評論', default: true }),
    __metadata("design:type", Boolean)
], NewsArticleEntity.prototype, "commentOpen", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '置頂新聞', default: false }),
    __metadata("design:type", Boolean)
], NewsArticleEntity.prototype, "isTop", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '熱門新聞', default: false }),
    __metadata("design:type", Boolean)
], NewsArticleEntity.prototype, "isHot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ArticleStatus, default: ArticleStatus.DRAFT }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '發布時間', nullable: true }),
    __metadata("design:type", Date)
], NewsArticleEntity.prototype, "publishTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ArticleType, default: ArticleType.NORMAL }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '影片網址', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '作者ID', nullable: true }),
    __metadata("design:type", Number)
], NewsArticleEntity.prototype, "authorId", void 0);
NewsArticleEntity = __decorate([
    (0, orm_1.EntityModel)('news_article')
], NewsArticleEntity);
exports.NewsArticleEntity = NewsArticleEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvZW50aXR5L2FydGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLHFDQUF3QztBQUN4QyxnRUFBbUU7QUFFbkUsSUFBWSxhQU9YO0FBUEQsV0FBWSxhQUFhO0lBQ3ZCLGdDQUFlLENBQUE7SUFDZixvQ0FBbUIsQ0FBQTtJQUNuQixrQ0FBaUIsQ0FBQTtJQUNqQix3Q0FBdUIsQ0FBQTtJQUN2QixrQ0FBaUIsQ0FBQTtJQUNqQixzQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBUFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFPeEI7QUFFRCxJQUFZLFdBR1g7QUFIRCxXQUFZLFdBQVc7SUFDckIsZ0NBQWlCLENBQUE7SUFDakIsOEJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFHdEI7QUFHRCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLDZCQUFnQjtDQXNEdEQsQ0FBQTtBQW5EQztJQUZDLElBQUEsZUFBSyxHQUFFO0lBQ1AsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDWjtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O29EQUM1QjtBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzswREFDdEI7QUFJeEI7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OytDQUNiO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQzs7a0RBQ2hDO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7OzBEQUN4QjtBQUd4QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2tEQUM5QztBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztvREFDeEI7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7c0RBQ3RCO0FBR3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O2dEQUM3QjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O2dEQUM3QjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7O2lEQUN0RDtBQUd0QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzhCQUMvQixJQUFJO3NEQUFDO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7OytDQUN2RDtBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDM0I7QUFJakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7bURBQzNCO0FBbEROLGlCQUFpQjtJQUQ3QixJQUFBLGlCQUFXLEVBQUMsY0FBYyxDQUFDO0dBQ2YsaUJBQWlCLENBc0Q3QjtBQXREWSw4Q0FBaUIifQ==