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
exports.NewsArticleApiService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const article_1 = require("../../entity/article");
const _ = require("lodash");
const comment_1 = require("../../entity/comment");
const articleLike_1 = require("../../entity/articleLike");
const articleView_1 = require("../../entity/articleView");
const cache_1 = require("@midwayjs/cache");
const user_1 = require("../../../base/entity/sys/user");
const articleCategory_1 = require("../../entity/articleCategory");
const articleCollection_1 = require("../../entity/articleCollection");
/**
 * 描述
 */
let NewsArticleApiService = class NewsArticleApiService extends core_1.BaseService {
    /**
     * 新增
     * @param article
     */
    async add(article) {
        return await this.newsArticleEntity.save(article);
        // const info = await this.newsArticleEntity
        //   .createQueryBuilder()
        //   .insert()
        //   .values(article)
        //   .execute();
        // return info;
    }
    /**
     * 刪除
     * @param id
     */
    async delete({ id }) {
        if (!id)
            new core_1.CoolValidateException('ID為必要的參數');
        try {
            // await this.newsArticleEntity
            //   .createQueryBuilder()
            //   .softDelete()
            //   .where('id = :id', { id })
            //   .execute();
        }
        catch (e) {
            return e;
        }
    }
    /**
     * 取得內容
     * @param query
     */
    async getArticle(query) {
        const { slug, client } = query;
        if (_.isEmpty(slug))
            throw new core_1.CoolCommException('請輸入代稱');
        const user = this.ctx.user;
        const userEmpty = _.isEmpty(user);
        const sql = `
      SELECT
        a.id,
        a.title,
        a.slug,
        a.thumbnail,
        a.commentOpen,
        a.publishTime,
        a.metaTitle,
        a.metaDescription,
        a.authorAvatar,
        a.authorName,
        a.authorIntro,
        a.type,
        IF(${userEmpty}=true, a.content_preview, a.content) AS content,
        IF(${userEmpty}=true, TRUE, FALSE) AS isPreview,

        SUM(b.count) AS views,
        COUNT(DISTINCT c.id) AS likes,
        COUNT(DISTINCT d.id) AS collections

      FROM
        news_article a
        LEFT JOIN news_article_view b ON a.id = b.articleId
        LEFT JOIN news_article_like c ON a.id = c.articleId
        LEFT JOIN news_article_collection d ON a.id = d.articleId

      WHERE a.status = '${article_1.ArticleStatus.PUBLISHED}' AND a.slug = '${slug}'
      GROUP BY a.id
      LIMIT 1
    `;
        const [info] = await this.nativeQuery(sql);
        info.isPreview = Boolean(info.isPreview);
        // 判斷文章是否存在
        if (_.isEmpty(info))
            throw new core_1.CoolValidateException('文章不存在');
        const categories = await this.nativeQuery(`
      SELECT
        b.name,
        b.slug,
        b.parentId
      FROM
        news_article_category a
        LEFT JOIN industry_category b ON a.categoryId = b.id
      WHERE a.articleId = ${info.id}
      GROUP BY a.id
    `);
        const other = {
            isLike: false,
            isCollection: false,
        };
        if (!_.isEmpty(user)) {
            other.isLike = !_.isEmpty(await this.newsArticleLikeEntity.findOne({
                articleId: info.id,
                userId: user.userId,
            }));
            other.isCollection = !_.isEmpty(await this.newsArticleCollectionEntity.findOne({
                articleId: info.id,
                userId: user.userId,
            }));
        }
        if (client) {
            this.articleView({ id: info.id });
        }
        return { ...info, categories, ...other };
    }
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { keyWord, order = 'publishTime', sort = 'desc', isHot, isTop, category, type, } = query;
        const sql = `
        SELECT
            a.id,
            a.slug,
            a.title,
            a.thumbnail,
            a.commentOpen,
            a.publishTime,
            a.authorName as author,
            (CASE WHEN LENGTH(a.excerpt) > 0 THEN a.excerpt ELSE LEFT(REGEXP_REPLACE(a.content_preview, '<[^>]+>', ''), 80) END) AS excerpt,

            GROUP_CONCAT(DISTINCT d.name) As categories,
            COUNT(DISTINCT(e.id)) as views,
            COUNT(DISTINCT(f.id)) as likes,
            COUNT(DISTINCT(g.id)) as collections
        FROM
            news_article a
            LEFT JOIN news_article_category b ON a.id = b.articleId
            LEFT JOIN industry_category d ON b.categoryId = d.id
            LEFT JOIN news_article_view e ON a.id = e.articleId
            LEFT JOIN news_article_like f ON a.id = f.articleId
            LEFT JOIN news_article_collection g ON a.id = g.articleId
        WHERE a.status = '${article_1.ArticleStatus.PUBLISHED}'
            ${this.setSql(category, 'AND d.slug = (?)', category)}
            ${this.setSql(type, 'AND a.type = (?)', type)}
            ${this.setSql(isHot, 'AND a.isHot = ?', isHot)}
            ${this.setSql(isTop, 'AND a.isTop = ?', isTop)}
            ${this.setSql(keyWord, 'AND (a.title LIKE ?)', [`%${keyWord}%`])}
        GROUP BY a.id
        `;
        const result = await this.sqlRenderPage(sql, _.assign(query, {
            order,
            sort,
        }));
        return result;
    }
    /**
     * 列表查询
     * @param query
     */
    async list(query) {
        const { keyWord, order = 'publishTime', sort = 'desc', isHot, isTop, size, category, type, } = query;
        const result = await this.nativeQuery(`
        SELECT
          a.id,
          a.title,
          a.excerpt,
          a.thumbnail,
          a.slug,
          a.type,
          a.publishTime,
          (CASE WHEN LENGTH(a.excerpt) > 0 THEN a.excerpt ELSE LEFT(REGEXP_REPLACE(a.content, '<[^>]+>', ''), 80) END) AS excerpt,

          a.authorName,
          GROUP_CONCAT(DISTINCT c.name) AS categories,
          COUNT(DISTINCT(e.id)) as views,
          COUNT(DISTINCT(f.id)) as likes,
          COUNT(DISTINCT(g.id)) as collections
        FROM
          news_article a
          LEFT JOIN news_article_category b ON a.id = b.articleId
          LEFT JOIN industry_category c ON b.id = c.categoryId
          LEFT JOIN news_article_view e ON a.id = e.articleId
          LEFT JOIN news_article_like f ON a.id = f.articleId
          LEFT JOIN news_article_collection g ON a.id = g.articleId
        where 1=1
          ${this.setSql(category, 'and c.slug = (?)', category)}
          ${this.setSql(isTop, 'and a.isTop = (?)', isTop)}
          ${this.setSql(type, 'and a.type = (?)', type)}
          ${this.setSql(isHot, 'and a.isHot = (?)', isHot)}
          ${this.setSql(keyWord, 'and (a.title LIKE ?)', [`%${keyWord}%`])}
        GROUP BY a.id
        ${order ? `ORDER BY ${order} ${sort}` : ''}
        ${this.setSql(size, 'LIMIT ?', size)}
      `);
        return result;
    }
    /**
     * 取得分類
     * @param query
     */
    async getCategories() {
        const result = await this.nativeQuery(`
      SELECT
        a.id,
        a.name,
        a.slug,
        a.icon,
        a.parentId,
        IF(b.id, true, false) as news
      FROM
        industry_category a
        LEFT JOIN news_article_category b ON a.id = b.categoryId
      WHERE 1=1
      GROUP BY a.id
    `);
        return result;
    }
    /**
     * 關聯評論
     * @param ids
     */
    async getCommentByArticle(article) {
        return await this.newsArticleCommentEntity.find({ articleId: article.id });
    }
    /**
     * 按讚
     * @param param
     */
    async articleLike(param) {
        const user = this.ctx.user;
        if (_.isEmpty(user))
            throw new core_1.CoolCommException('請登入帳號');
        const { id } = param;
        if (!id)
            throw new core_1.CoolValidateException('請輸入完整的參數');
        const likeExist = await this.newsArticleLikeEntity.findOne({
            articleId: id,
            userId: this.ctx.user.userId,
        });
        const action = _.isEmpty(likeExist) ? 'save' : 'delete';
        await this.newsArticleLikeEntity[action]({
            articleId: id,
            userId: user.userId,
        });
        return { id, status: _.isEmpty(likeExist) };
    }
    /**
     * 觀看
     * @param param
     */
    async articleView({ id }) {
        const user = this.ctx.user;
        if (_.isEmpty(user))
            return;
        const viewExist = await this.newsArticleViewEntity.findOne({
            articleId: id,
            userId: (user === null || user === void 0 ? void 0 : user.userId) || 0,
        });
        if (_.isEmpty(viewExist)) {
            await this.newsArticleViewEntity.save({
                articleId: id,
                userId: (user === null || user === void 0 ? void 0 : user.userId) || 0,
                count: 1,
            });
        }
        else {
            if (_.isEmpty(user)) {
                await this.newsArticleViewEntity.save({
                    id: viewExist.id,
                    articleId: id,
                    userId: 0,
                    count: +viewExist.count + 1,
                });
            }
        }
    }
    async collection({ id }) {
        const user = this.ctx.user;
        if (_.isEmpty(user))
            throw new core_1.CoolCommException('請登入帳號');
        if (!id)
            throw new core_1.CoolCommException('請輸入ID');
        const articleExist = await this.newsArticleEntity.findOne({ id });
        if (_.isEmpty(articleExist))
            throw new core_1.CoolCommException('找不到該文章');
        const collectionExist = await this.newsArticleCollectionEntity.findOne({
            articleId: id,
            userId: user.userId,
        });
        const action = _.isEmpty(collectionExist) ? 'save' : 'delete';
        await this.newsArticleCollectionEntity[action]({
            articleId: id,
            userId: user.userId,
        });
        return { id, status: _.isEmpty(collectionExist) };
    }
    async viewHistory(query) {
        const userId = this.ctx.user.userId;
        const { keyWord, order = 'publishTime', sort = 'desc', category } = query;
        const sql = `
        SELECT
            b.id,
            b.slug,
            b.title,
            b.thumbnail,
            b.status,
            b.commentOpen,
            b.publishTime,

            b.authorName,
            GROUP_CONCAT(DISTINCT e.name) As categories,
            COUNT(DISTINCT(f.id)) as likes,
            COUNT(DISTINCT(g.id)) as collections,
            COUNT(DISTINCT(h.id)) as views
        FROM
            news_article_view a
            LEFT JOIN news_article b ON a.articleId = b.id
            LEFT JOIN news_article_category c ON b.id = c.articleId
            LEFT JOIN industry_category e ON c.categoryId = e.id
            LEFT JOIN news_article_like f ON b.id = f.articleId
            LEFT JOIN news_article_collection g ON b.id = g.articleId
            LEFT JOIN news_article_view h ON b.id = h.articleId

        WHERE b.status = '${article_1.ArticleStatus.PUBLISHED}'
            AND a.userId = ${userId}
            ${this.setSql(category, 'AND e.slug = (?)', category)}
            ${this.setSql(keyWord, 'AND (b.title LIKE ?)', [`%${keyWord}%`])}
        GROUP BY a.id
        `;
        const result = await this.sqlRenderPage(sql, _.assign(query, {
            order,
            sort,
        }));
        return result;
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(article_1.NewsArticleEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleCategory_1.NewsArticleCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleCategoryEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(comment_1.NewsArticleCommentEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleCommentEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleLike_1.NewsArticleLikeEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleLikeEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleView_1.NewsArticleViewEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleViewEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleCollection_1.NewsArticleCollectionEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsArticleApiService.prototype, "newsArticleCollectionEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], NewsArticleApiService.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cache_1.CacheManager)
], NewsArticleApiService.prototype, "cacheManager", void 0);
NewsArticleApiService = __decorate([
    (0, decorator_1.Provide)()
], NewsArticleApiService);
exports.NewsArticleApiService = NewsArticleApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmV3cy9zZXJ2aWNlL2FwcC9hcnRpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FJMkI7QUFDM0IsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBd0U7QUFFeEUsNEJBQTRCO0FBQzVCLGtEQUFnRTtBQUNoRSwwREFBaUU7QUFDakUsMERBQWlFO0FBQ2pFLDJDQUErQztBQUMvQyx3REFBa0U7QUFDbEUsa0VBQXlFO0FBQ3pFLHNFQUE2RTtBQUU3RTs7R0FFRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsa0JBQVc7SUE0QnBEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBWTtRQUNwQixPQUFPLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCw0Q0FBNEM7UUFDNUMsMEJBQTBCO1FBQzFCLGNBQWM7UUFDZCxxQkFBcUI7UUFDckIsZ0JBQWdCO1FBQ2hCLGVBQWU7SUFDakIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQU87UUFDdEIsSUFBSSxDQUFDLEVBQUU7WUFBRSxJQUFJLDRCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9DLElBQUk7WUFDRiwrQkFBK0I7WUFDL0IsMEJBQTBCO1lBQzFCLGtCQUFrQjtZQUNsQiwrQkFBK0I7WUFDL0IsZ0JBQWdCO1NBQ2pCO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsQ0FBQztTQUNWO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSztRQUNwQixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQzNCLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEMsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7Ozs7O2FBY0gsU0FBUzthQUNULFNBQVM7Ozs7Ozs7Ozs7OzswQkFZSSx1QkFBYSxDQUFDLFNBQVMsbUJBQW1CLElBQUk7OztLQUduRSxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekMsV0FBVztRQUNYLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFBRSxNQUFNLElBQUksNEJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7Ozs0QkFRbEIsSUFBSSxDQUFDLEVBQUU7O0tBRTlCLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxHQUFHO1lBQ1osTUFBTSxFQUFFLEtBQUs7WUFDYixZQUFZLEVBQUUsS0FBSztTQUNwQixDQUFDO1FBRUYsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQ3ZCLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztnQkFDdkMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDcEIsQ0FBQyxDQUNILENBQUM7WUFDRixLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDN0IsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQUMsT0FBTyxDQUFDO2dCQUM3QyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUNwQixDQUFDLENBQ0gsQ0FBQztTQUNIO1FBRUQsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsT0FBTyxFQUFFLEdBQUcsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQ0osT0FBTyxFQUNQLEtBQUssR0FBRyxhQUFhLEVBQ3JCLElBQUksR0FBRyxNQUFNLEVBQ2IsS0FBSyxFQUNMLEtBQUssRUFDTCxRQUFRLEVBQ1IsSUFBSSxHQUNMLEdBQUcsS0FBSyxDQUFDO1FBQ1YsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBc0JZLHVCQUFhLENBQUMsU0FBUztjQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLENBQUM7Y0FDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDO2NBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEtBQUssQ0FBQztjQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLENBQUM7Y0FDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7O1NBRW5FLENBQUM7UUFFTixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ3JDLEdBQUcsRUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNkLEtBQUs7WUFDTCxJQUFJO1NBQ0wsQ0FBQyxDQUNILENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFVO1FBQ25CLE1BQU0sRUFDSixPQUFPLEVBQ1AsS0FBSyxHQUFHLGFBQWEsRUFDckIsSUFBSSxHQUFHLE1BQU0sRUFDYixLQUFLLEVBQ0wsS0FBSyxFQUNMLElBQUksRUFDSixRQUFRLEVBQ1IsSUFBSSxHQUNMLEdBQUcsS0FBSyxDQUFDO1FBQ1YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUF3QjlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQztZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQzs7VUFFaEUsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtVQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDO09BQ3JDLENBQUMsQ0FBQztRQUVMLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsYUFBYTtRQUNqQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7Ozs7Ozs7S0FhckMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPO1FBQy9CLE9BQU8sTUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUs7UUFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxJQUFJLDRCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXJELE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQztZQUN6RCxTQUFTLEVBQUUsRUFBRTtZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNO1NBQzdCLENBQUMsQ0FBQztRQUVILE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3hELE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztRQUNILE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUUzQixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsT0FBTztRQUU1QixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUM7WUFDekQsU0FBUyxFQUFFLEVBQUU7WUFDYixNQUFNLEVBQUUsQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSxLQUFJLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQztnQkFDcEMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sS0FBSSxDQUFDO2dCQUN6QixLQUFLLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQztvQkFDcEMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFO29CQUNoQixTQUFTLEVBQUUsRUFBRTtvQkFDYixNQUFNLEVBQUUsQ0FBQztvQkFDVCxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUM7aUJBQzVCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRSxNQUFNLGVBQWUsR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUM7WUFDckUsU0FBUyxFQUFFLEVBQUU7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDOUQsTUFBTSxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsU0FBUyxFQUFFLEVBQUU7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUs7UUFDckIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFHLGFBQWEsRUFBRSxJQUFJLEdBQUcsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUMxRSxNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQXdCWSx1QkFBYSxDQUFDLFNBQVM7NkJBQ3RCLE1BQU07Y0FDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxDQUFDO2NBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDOztTQUVuRSxDQUFDO1FBRU4sTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNyQyxHQUFHLEVBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxLQUFLO1lBQ0wsSUFBSTtTQUNMLENBQUMsQ0FDSCxDQUFDO1FBRUYsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUE7QUFoWkM7SUFEQyxJQUFBLHVCQUFpQixFQUFDLDJCQUFpQixDQUFDOzhCQUNsQixvQkFBVTtnRUFBb0I7QUFHakQ7SUFEQyxJQUFBLHVCQUFpQixFQUFDLDJDQUF5QixDQUFDOzhCQUNsQixvQkFBVTt3RUFBNEI7QUFHakU7SUFEQyxJQUFBLHVCQUFpQixFQUFDLGtDQUF3QixDQUFDOzhCQUNsQixvQkFBVTt1RUFBMkI7QUFHL0Q7SUFEQyxJQUFBLHVCQUFpQixFQUFDLG1DQUFxQixDQUFDOzhCQUNsQixvQkFBVTtvRUFBd0I7QUFHekQ7SUFEQyxJQUFBLHVCQUFpQixFQUFDLG1DQUFxQixDQUFDOzhCQUNsQixvQkFBVTtvRUFBd0I7QUFHekQ7SUFEQyxJQUFBLHVCQUFpQixFQUFDLHdCQUFpQixDQUFDOzhCQUNsQixvQkFBVTtnRUFBb0I7QUFHakQ7SUFEQyxJQUFBLHVCQUFpQixFQUFDLCtDQUEyQixDQUFDOzhCQUNsQixvQkFBVTswRUFBOEI7QUFHckU7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O2tEQUNMO0FBR0o7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ0ssb0JBQVk7MkRBQUM7QUExQmhCLHFCQUFxQjtJQURqQyxJQUFBLG1CQUFPLEdBQUU7R0FDRyxxQkFBcUIsQ0FrWmpDO0FBbFpZLHNEQUFxQiJ9