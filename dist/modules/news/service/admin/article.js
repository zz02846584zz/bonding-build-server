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
exports.NewsArticleAdminService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const article_1 = require("../../entity/article");
const comment_1 = require("../../entity/comment");
const _ = require("lodash");
const category_1 = require("../../../industry/entity/category");
const user_1 = require("../../../base/entity/sys/user");
const articleCategory_1 = require("../../entity/articleCategory");
const articleView_1 = require("../../entity/articleView");
const articleLike_1 = require("../../entity/articleLike");
const commentLike_1 = require("../../entity/commentLike");
/**
 * 描述
 */
let NewsArticleAdminService = class NewsArticleAdminService extends core_1.BaseService {
    /**
     * 取得內容
     * @param query
     */
    async info(id) {
        const info = await this.newsArticleEntity.findOne({ id });
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
     * 分页查询
     * @param query
     */
    async page(query) {
        const { keyWord } = query;
        const sql = `
      SELECT
          a.*,
          CONCAT(b.firstName, b.lastName) AS author,
          GROUP_CONCAT(DISTINCT d.name) AS categories,
          COUNT(distinct e.id) AS commentCount,
          COUNT(distinct f.id) AS viewCount,
          COUNT(distinct g.id) AS likeCount

      FROM
          news_article a
          LEFT JOIN base_sys_user b ON a.authorId = b.id
          LEFT JOIN news_article_category c ON c.articleId = a.id
          LEFT JOIN industry_category d ON d.id = c.categoryId
          LEFT JOIN news_comment e ON e.articleId = a.id
          LEFT JOIN news_article_view f ON f.articleId = a.id
          LEFT JOIN news_article_like g ON g.articleId = a.id
      WHERE 1 = 1
          ${this.setSql(keyWord, 'and (a.title LIKE ?)', [`%${keyWord}%`])}
      GROUP BY a.id
    `;
        const data = await this.sqlRenderPage(sql, query);
        return data;
    }
    /**
     * 列表查询
     * @param query
     */
    async list() {
        return await this.newsArticleEntity.createQueryBuilder('article').getMany();
    }
    /**
     * 新增
     * @param param
     */
    async add(param) {
        // 排除
        const exists = await this.newsArticleEntity.findOne({ slug: param.slug });
        if (!_.isEmpty(exists))
            throw new core_1.CoolCommException('該代稱已被使用');
        // 插入
        const { status, publishTime } = param;
        if (status === article_1.ArticleStatus.PUBLISHED && _.isEmpty(publishTime)) {
            param.publishTime = this.getToday();
        }
        else {
            param.publishTime = null;
        }
        const article = await this.newsArticleEntity.save({
            ...param,
            createBy: this.ctx.admin.userId,
            updateBy: this.ctx.admin.userId,
        });
        if (param.categories) {
            await this.updateCategories({
                ...param,
                id: article.id,
            });
        }
        return param.id;
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
     * 新增
     * @param param
     */
    async update(param) {
        const { status, publishTime } = param;
        if (status === article_1.ArticleStatus.PUBLISHED) {
            if (!publishTime) {
                param.publishTime = new Date();
            }
        }
        else if (status !== article_1.ArticleStatus.SCHEDULE) {
            param.publishTime = null;
        }
        await this.newsArticleEntity.save({
            ...param,
            updateBy: this.ctx.admin.userId,
        });
        if (param.categories) {
            await this.updateCategories(param);
        }
        return param.id;
    }
    getToday() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        const hhmmss = today.toTimeString().split(' ')[0];
        return `${yyyy}-${mm}-${dd} ${hhmmss}`;
    }
    /**
     * 刪除
     * @param ids
     */
    async delete(ids) {
        let idArr;
        if (ids instanceof Array) {
            idArr = ids;
        }
        else {
            idArr = ids.split(',');
        }
        for (const id of idArr) {
            try {
                const deleteArr = [
                    this.newsArticleEntity.delete({ id }),
                    this.newsArticleCategoryEntity.delete({ articleId: id }),
                    this.newsArticleViewEntity.delete({ articleId: id }),
                    this.newsArticleLikeEntity.delete({ articleId: id }),
                    this.newsArticleCommentEntity.delete({ articleId: id }),
                    this.newsArticleCommentLikeEntity.delete({ articleId: id }),
                ];
                Promise.all(deleteArr);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(article_1.NewsArticleEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleCategory_1.NewsArticleCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleCategoryEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(comment_1.NewsArticleCommentEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleCommentEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(commentLike_1.NewsArticleCommentLikeEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleCommentLikeEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleView_1.NewsArticleViewEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleViewEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleLike_1.NewsArticleLikeEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "newsArticleLikeEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(category_1.IndustryCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "industryCategoryEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleAdminService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], NewsArticleAdminService.prototype, "ctx", void 0);
NewsArticleAdminService = __decorate([
    (0, decorator_1.Provide)()
], NewsArticleAdminService);
exports.NewsArticleAdminService = NewsArticleAdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hZG1pbi9hcnRpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBd0U7QUFDeEUsa0RBQWdFO0FBRWhFLDRCQUE0QjtBQUM1QixnRUFBMkU7QUFDM0Usd0RBQWtFO0FBQ2xFLGtFQUF5RTtBQUN6RSwwREFBaUU7QUFDakUsMERBQWlFO0FBQ2pFLDBEQUF3RTtBQUV4RTs7R0FFRztBQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsa0JBQVc7SUE0QnREOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNYLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUN2Qzs7OzswQkFJb0IsRUFBRTtLQUN2QixDQUNBLENBQUM7UUFDRixPQUFPO1lBQ0wsR0FBRyxJQUFJO1lBQ1AsVUFBVSxFQUFFLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pELENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUUxQixNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBa0JKLElBQUksQ0FBQyxN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