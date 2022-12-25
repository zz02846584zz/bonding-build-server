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
exports.AdminNewsArticleService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const article_1 = require("../../entity/article");
const articleCategory_1 = require("../../entity/articleCategory");
const articleView_1 = require("../../entity/articleView");
/**
 * 描述
 */
let AdminNewsArticleService = class AdminNewsArticleService extends core_1.BaseService {
    async page(query) {
        const { keyWord, type, status, categoryId } = query;
        const result = await this.sqlRenderPage(`
      SELECT
        a.id,
        a.authorName,
        a.thumbnail,
        a.title,
        a.type,
        a.isHot,
        a.isTop,
        a.commentOpen,
        a.status,
        a.updateTime,
        a.publishTime,
        a.createTime,

        GROUP_CONCAT(DISTINCT f.categoryId) as categories,
        COUNT(DISTINCT b.id) as viewCount,
        COUNT(DISTINCT c.id) as likeCount,
        COUNT(DISTINCT d.id) as commentCount,
        COUNT(DISTINCT e.id) as collectionCount
      FROM
        news_article a
        LEFT JOIN news_article_view b ON a.id = b.articleId
        LEFT JOIN news_article_like c ON a.id = c.articleId
        LEFT JOIN news_comment d ON a.id = d.articleId
        LEFT JOIN news_article_collection e ON a.id = e.articleId
        LEFT JOIN news_article_category f ON a.id = f.articleId
      WHERE 1=1
        ${this.setSql(categoryId, 'AND f.categoryId = (?)', categoryId)}
        ${this.setSql(status, 'AND a.status = (?)', status)}
        ${this.setSql(type, 'AND a.type = (?)', type)}
        ${this.setSql(keyWord, 'and (a.title LIKE ? or a.authorName LIKE ?)', [
            `%${keyWord}%`,
            `%${keyWord}%`,
        ])}

      GROUP BY a.id
    `, query);
        return result;
    }
    async add(params) {
        const { categories } = params;
        if (!categories)
            throw new core_1.CoolCommException('請選擇分類');
        const tip = await this.newsArticleEntity.save({
            ...params,
            createBy: this.ctx.admin.userId,
            updateBy: this.ctx.admin.userId,
        });
        await this.updateCategories(params);
        return tip;
    }
    async update(params) {
        const tip = await this.newsArticleEntity.save({
            ...params,
            updateBy: this.ctx.admin.userId,
        });
        await this.updateCategories(params);
        return tip;
    }
    async info(id) {
        const info = await this.newsArticleEntity.findOne({ id });
        if (!info.authorIntro)
            info.authorIntro = '';
        const categories = await this.nativeQuery(`
      SELECT 
        categoryId
      FROM news_article_category
      WHERE articleId = ${id}
    `);
        return {
            ...info,
            categories: categories === null || categories === void 0 ? void 0 : categories.map(e => parseInt(e.categoryId)),
        };
    }
    /**
     * 更新分類关系
     * @param user
     */
    async updateCategories(article) {
        await this.newsArticleCategoryEntity.delete({ articleId: article.id });
        if (article.categories) {
            for (const category of article.categories) {
                await this.newsArticleCategoryEntity.save({
                    articleId: article.id,
                    categoryId: category,
                });
            }
        }
    }
    /**
     * 閱讀紀錄
     * @param articleId
     */
    async viewLogs(query) {
        const { articleId } = query;
        if (!articleId)
            throw new core_1.CoolCommException('請輸入articleId');
        return await this.sqlRenderPage(`
      SELECT
        a.id,
        a.createTime,
        concat(b.firstName, ' ', b.lastName) As name
      FROM
        news_article_view a
        LEFT JOIN base_sys_user b ON a.userId = b.id
      WHERE 1=1
      ${this.setSql(articleId, 'and a.articleId = ?', [articleId])}
      GROUP BY a.id
    `, query);
    }
    /**
     * 點贊紀錄
     * @param articleId
     */
    async likeLogs(query) {
        const { articleId } = query;
        return await this.sqlRenderPage(`
      SELECT
        a.id,
        a.createTime,
        concat(b.firstName, ' ', b.lastName) As name
      FROM
        news_article_like a
        LEFT JOIN base_sys_user b ON a.userId = b.id
      WHERE 1=1
      ${this.setSql(articleId, 'and a.articleId in (?)', [articleId])}
      GROUP BY a.id
    `, query);
    }
    /**
     * 收藏紀錄
     * @param articleId
     */
    async collectionLogs(query) {
        const { articleId } = query;
        return await this.sqlRenderPage(`
      SELECT
        a.id,
        a.createTime,
        concat(b.firstName, ' ', b.lastName) As name
      FROM
        news_article_collection a
        LEFT JOIN base_sys_user b ON a.userId = b.id
      WHERE 1=1
      ${this.setSql(articleId, 'and a.articleId in (?)', [articleId])}
      GROUP BY a.id
    `, query);
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(article_1.NewsArticleEntity),
    __metadata("design:type", typeorm_1.Repository)
], AdminNewsArticleService.prototype, "newsArticleEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleCategory_1.NewsArticleCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AdminNewsArticleService.prototype, "newsArticleCategoryEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleView_1.NewsArticleViewEntity),
    __metadata("design:type", typeorm_1.Repository)
], AdminNewsArticleService.prototype, "newsArticleViewEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], AdminNewsArticleService.prototype, "ctx", void 0);
AdminNewsArticleService = __decorate([
    (0, decorator_1.Provide)()
], AdminNewsArticleService);
exports.AdminNewsArticleService = AdminNewsArticleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hZG1pbi9hcnRpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBeUQ7QUFDekQsa0VBQXlFO0FBQ3pFLDBEQUFpRTtBQUdqRTs7R0FFRztBQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsa0JBQVc7SUFhdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ3JDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBNEJJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLHdCQUF3QixFQUFFLFVBQVUsQ0FBQztVQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLENBQUM7VUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDO1VBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLDZDQUE2QyxFQUFFO1lBQ3RFLElBQUksT0FBTyxHQUFHO1lBQ2QsSUFBSSxPQUFPLEdBQUc7U0FDZixDQUFDOzs7S0FHSCxFQUNDLEtBQUssQ0FDTixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTTtRQUNkLE1BQU0sRUFBRSxVQUFVLEVBQUUs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