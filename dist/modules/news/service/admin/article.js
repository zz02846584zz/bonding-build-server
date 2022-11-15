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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmV3cy9zZXJ2aWNlL2FkbWluL2FydGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFtRTtBQUNuRSx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLGtEQUF3RTtBQUN4RSxrREFBZ0U7QUFFaEUsNEJBQTRCO0FBQzVCLGdFQUEyRTtBQUMzRSx3REFBa0U7QUFDbEUsa0VBQXlFO0FBQ3pFLDBEQUFpRTtBQUNqRSwwREFBaUU7QUFDakUsMERBQXdFO0FBRXhFOztHQUVHO0FBRUgsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxrQkFBVztJQTRCdEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1gsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMxRCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQ3ZDOzs7OzBCQUlvQixFQUFFO0tBQ3ZCLENBQ0EsQ0FBQztRQUNGLE9BQU87WUFDTCxHQUFHLElBQUk7WUFDUCxVQUFVLEVBQUUsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekQsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRTFCLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFrQkosSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7O0tBRXJFLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLO1FBQ2IsS0FBSztRQUNMLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFBRSxNQUFNLElBQUksd0JBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0QsS0FBSztRQUNMLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRXRDLElBQUksTUFBTSxLQUFLLHVCQUFhLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDaEUsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDckM7YUFBTTtZQUNMLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ2hELEdBQUcsS0FBSztZQUNSLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQ2hDLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNwQixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDMUIsR0FBRyxLQUFLO2dCQUNSLEVBQUUsRUFBRSxPQUFPLENBQUMsRUFBRTthQUNmLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTztRQUM1QixNQUFNLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3RCLEtBQUssTUFBTSxRQUFRLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDekMsTUFBTSxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDO29CQUN4QyxTQUFTLEVBQUUsT0FBTyxDQUFDLEVBQUU7b0JBQ3JCLFVBQVUsRUFBRSxRQUFRO2lCQUNyQixDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztRQUNoQixNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLE1BQU0sS0FBSyx1QkFBYSxDQUFDLFNBQVMsRUFBRTtZQUN0QyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7YUFDaEM7U0FDRjthQUFNLElBQUksTUFBTSxLQUFLLHVCQUFhLENBQUMsUUFBUSxFQUFFO1lBQzVDLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBQ0QsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ2hDLEdBQUcsS0FBSztZQUNSLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQ2hDLENBQUMsQ0FBQztRQUNILElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNwQixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEQsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZTtRQUN2RSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFL0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRCxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksTUFBTSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztRQUNkLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO1lBQ3hCLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDYjthQUFNO1lBQ0wsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFDRCxLQUFLLE1BQU0sRUFBRSxJQUFJLEtBQUssRUFBRTtZQUN0QixJQUFJO2dCQUNGLE1BQU0sU0FBUyxHQUFHO29CQUNoQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQ3hELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQ3BELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQ3BELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQ3ZELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7aUJBQzVELENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4QjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBO0FBcE1DO0lBREMsSUFBQSx1QkFBaUIsRUFBQywyQkFBaUIsQ0FBQzs4QkFDbEIsb0JBQVU7a0VBQW9CO0FBR2pEO0lBREMsSUFBQSx1QkFBaUIsRUFBQywyQ0FBeUIsQ0FBQzs4QkFDbEIsb0JBQVU7MEVBQTRCO0FBR2pFO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxrQ0FBd0IsQ0FBQzs4QkFDbEIsb0JBQVU7eUVBQTJCO0FBRy9EO0lBREMsSUFBQSx1QkFBaUIsRUFBQywwQ0FBNEIsQ0FBQzs4QkFDbEIsb0JBQVU7NkVBQStCO0FBR3ZFO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxtQ0FBcUIsQ0FBQzs4QkFDbEIsb0JBQVU7c0VBQXdCO0FBR3pEO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxtQ0FBcUIsQ0FBQzs4QkFDbEIsb0JBQVU7c0VBQXdCO0FBR3pEO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxpQ0FBc0IsQ0FBQzs4QkFDbEIsb0JBQVU7dUVBQXlCO0FBRzNEO0lBREMsSUFBQSx1QkFBaUIsRUFBQyx3QkFBaUIsQ0FBQzs4QkFDbEIsb0JBQVU7a0VBQW9CO0FBR2pEO0lBREMsSUFBQSxrQkFBTSxHQUFFOztvREFDTDtBQTFCTyx1QkFBdUI7SUFEbkMsSUFBQSxtQkFBTyxHQUFFO0dBQ0csdUJBQXVCLENBc01uQztBQXRNWSwwREFBdUIifQ==