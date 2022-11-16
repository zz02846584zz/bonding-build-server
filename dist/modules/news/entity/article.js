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
    (0, typeorm_1.Column)({ comment: '作者頭像', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "authorAvatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '作者姓名' }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "authorName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '作者簡介', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "authorIntro", void 0);
NewsArticleEntity = __decorate([
    (0, orm_1.EntityModel)('news_article')
], NewsArticleEntity);
exports.NewsArticleEntity = NewsArticleEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmV3cy9lbnRpdHkvYXJ0aWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMscUNBQXdDO0FBQ3hDLGdFQUFtRTtBQUVuRSxJQUFZLGFBT1g7QUFQRCxXQUFZLGFBQWE7SUFDdkIsZ0NBQWUsQ0FBQTtJQUNmLG9DQUFtQixDQUFBO0lBQ25CLGtDQUFpQixDQUFBO0lBQ2pCLHdDQUF1QixDQUFBO0lBQ3ZCLGtDQUFpQixDQUFBO0lBQ2pCLHNDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFQVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQU94QjtBQUVELElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNyQixnQ0FBaUIsQ0FBQTtJQUNqQiw4QkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQUd0QjtBQUdELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsNkJBQWdCO0NBOER0RCxDQUFBO0FBM0RDO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUNaO0FBR2Q7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7b0RBQzVCO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OzBEQUN0QjtBQUl4QjtJQUZDLElBQUEsZUFBSyxFQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3ZCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7K0NBQ2I7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOztrREFDaEM7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQzs7MERBQ3hCO0FBR3hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0RBQzlDO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O29EQUN4QjtBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztzREFDdEI7QUFHckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7Z0RBQzdCO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7Z0RBQzdCO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7aURBQ3REO0FBR3RCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQy9CLElBQUk7c0RBQUM7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7K0NBQ3ZEO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUMzQjtBQUlqQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzt1REFDdkI7QUFJckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7O3FEQUNUO0FBSW5CO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3NEQUN4QjtBQTFEVCxpQkFBaUI7SUFEN0IsSUFBQSxpQkFBVyxFQUFDLGNBQWMsQ0FBQztHQUNmLGlCQUFpQixDQThEN0I7QUE5RFksOENBQWlCIn0=