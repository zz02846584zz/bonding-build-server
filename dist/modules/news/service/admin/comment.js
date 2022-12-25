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
exports.NewsArticleCommentAdminService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const comment_1 = require("../../entity/comment");
/**
 * 描述
 */
let NewsArticleCommentAdminService = class NewsArticleCommentAdminService extends core_1.BaseService {
    async add(param) {
        const userId = this.ctx.admin.userId;
        return await this.newsArticleCommentEntity.save({
            ...param,
            createBy: userId,
            updateBy: userId,
        });
    }
    async update(param) {
        const { isDelete } = param;
        const userId = this.ctx.admin.userId;
        if (isDelete) {
            param.deleteTime = new Date();
            param.deleteBy = this.ctx.admin.userId;
        }
        else {
            param.deleteTime = null;
            param.deleteBy = null;
        }
        return await this.newsArticleCommentEntity.save({
            ...param,
            updateBy: userId,
        });
    }
    async page(query) {
        const { articleId } = query;
        return this.sqlRenderPage(`
      SELECT
        a.id,
        a.content,
        a.createTime,
        a.updateTime,
        a.deleteTime,
        a.parentId,

        COUNT(b.id) as likeCount,
        CONCAT(c.firstName, c.lastName) as author

      FROM
        news_comment a
        LEFT JOIN news_comment_like b ON a.id = b.commentId
        LEFT JOIN base_sys_user c ON a.authorId = c.id
      WHERE 1=1
      ${this.setSql(articleId, 'and a.articleId = ?', [articleId])}
      GROUP BY a.id
    `, query);
    }
    async list(query) {
        const { articleId, parent } = query;
        return this.nativeQuery(`
      SELECT
        a.id,
        a.content
      FROM
        news_comment a
      WHERE 1=1
        ${this.setSql(articleId, 'and a.articleId = ?', [articleId])}
        ${this.setSql(parent, 'and a.parentId IS NULL', [])}
    `);
    }
    async info(id) {
        return this.newsArticleCommentEntity.findOne({ id }, { withDeleted: true });
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(comment_1.NewsArticleCommentEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleCommentAdminService.prototype, "newsArticleCommentEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], NewsArticleCommentAdminService.prototype, "ctx", void 0);
NewsArticleCommentAdminService = __decorate([
    (0, decorator_1.Provide)()
], NewsArticleCommentAdminService);
exports.NewsArticleCommentAdminService = NewsArticleCommentAdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hZG1pbi9jb21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBZ0U7QUFFaEU7O0dBRUc7QUFFSCxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUErQixTQUFRLGtCQUFXO0lBTzdELEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSztRQUNiLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNyQyxPQUFPLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQztZQUM5QyxHQUFHLEtBQUs7WUFDUixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTTtTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksUUFBUSxFQUFFO1lBQ1osS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzlCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBQ3hDO2FBQU07WUFDTCxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN4QixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUNELE9BQU8sTUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDO1lBQzlDLEdBQUcsS0FBSztZQUNSLFFBQVEsRUFBRSxNQUFNO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUJFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7O0tBRTdELEVBQ0MsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDcEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7O1VBT2xCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLHFCQUFxQixFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7VUFDMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLEVBQUUsRUFBRSxDQUFDO0tBQ3RELENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDWCxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7Q0FDRixDQUFBO0FBMUVDO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxrQ0FBd0IsQ0FBQzs4QkFDbEIsb0JBQVU7Z0ZBQTJCO0FBRy9EO0lBREMsSUFBQSxrQkFBTSxHQUFFOzsyREFDTDtBQUxPLDhCQUE4QjtJQUQxQyxJQUFBLG1CQUFPLEdBQUU7R0FDRyw4QkFBOEIsQ0E0RTFDO0FBNUVZLHdFQUE4QiJ9