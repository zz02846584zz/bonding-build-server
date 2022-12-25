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
exports.NewsArticleEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const baseDelete_1 = require("../../../base/entity/baseDelete");
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
], NewsArticleEntity.prototype, "contentPreview", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '摘錄', nullable: true }),
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
    (0, typeorm_1.Column)({ comment: '狀態', type: 'tinyint' }),
    __metadata("design:type", Number)
], NewsArticleEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '發布時間', nullable: true }),
    __metadata("design:type", Date)
], NewsArticleEntity.prototype, "publishTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '類型', type: 'tinyint' }),
    __metadata("design:type", Number)
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
    (0, typeorm_1.Column)({ comment: '作者簡介', type: 'mediumtext', nullable: true }),
    __metadata("design:type", String)
], NewsArticleEntity.prototype, "authorIntro", void 0);
NewsArticleEntity = __decorate([
    (0, orm_1.EntityModel)('news_article')
], NewsArticleEntity);
exports.NewsArticleEntity = NewsArticleEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvZW50aXR5L2FydGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsdUNBQTRDO0FBQzVDLHFDQUF3QztBQUN4QyxnRUFBbUU7QUFHbkUsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSw2QkFBZ0I7Q0E4RHRELENBQUE7QUEzREM7SUFGQyxJQUFBLGVBQUssR0FBRTtJQUNQLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7Z0RBQ1o7QUFHZDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztvREFDNUI7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MERBQ3RCO0FBSXhCO0lBRkMsSUFBQSxlQUFLLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDdkIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzsrQ0FDYjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7O2tEQUNoQztBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOzt5REFDekI7QUFHdkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0RBQzFCO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O29EQUN4QjtBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztzREFDdEI7QUFHckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7Z0RBQzdCO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzs7Z0RBQzdCO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7aURBQzVCO0FBR2Y7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDL0IsSUFBSTtzREFBQztBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzsrQ0FDOUI7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzttREFDM0I7QUFJakI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7dURBQ3ZCO0FBSXJCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDOztxREFDVDtBQUluQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3NEQUM1QztBQTFEVCxpQkFBaUI7SUFEN0IsSUFBQSxpQkFBVyxFQUFDLGNBQWMsQ0FBQztHQUNmLGlCQUFpQixDQThEN0I7QUE5RFksOENBQWlCIn0=