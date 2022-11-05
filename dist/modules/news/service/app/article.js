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
        a.authorId,
        a.type,
        IF(${userEmpty}=true, a.excerpt, a.content) AS content,
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
        const author = await this.baseSysUserEntity.findOne({
            where: { id: info.authorId },
            select: ['firstName', 'lastName', 'email', 'intro'],
        });
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
        delete info.authorId;
        if (client) {
            this.articleView({ id: info.id });
        }
        return { ...info, categories, author, ...other };
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
            a.status,
            a.commentOpen,
            a.publishTime,
            (CASE WHEN LENGTH(a.excerpt) > 0 THEN a.excerpt ELSE LEFT(REGEXP_REPLACE(a.content, '<[^>]+>', ''), 80) END) AS excerpt,

            CONCAT(c.firstName, c.lastName) As author,
            GROUP_CONCAT(DISTINCT d.name) As categories,
            SUM(e.count) AS views,
            COUNT(DISTINCT(f.id)) as likes,
            COUNT(DISTINCT(g.id)) as collections
        FROM
            news_article a
            LEFT JOIN news_article_category b ON a.id = b.articleId
            LEFT JOIN base_sys_user c ON a.authorId = c.id
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

          CONCAT(d.firstName, d.lastName) AS author,
          GROUP_CONCAT(DISTINCT c.name) AS categories,
          COUNT(DISTINCT(e.id)) as views,
          COUNT(DISTINCT(f.id)) as likes,
          COUNT(DISTINCT(g.id)) as collections
        FROM
          news_article a
          LEFT JOIN news_article_category b ON a.id = b.articleId
          LEFT JOIN industry_category c ON b.categoryId = c.id
          LEFT JOIN base_sys_user d ON d.id = a.authorId
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
    async myArticle(query) {
        const userId = this.ctx.user.userId;
        const { keyWord, order = 'publishTime', sort = 'desc', category } = query;
        const sql = `
        SELECT
            a.id,
            a.slug,
            a.title,
            a.thumbnail,
            a.status,
            a.commentOpen,
            a.publishTime,
            (CASE WHEN LENGTH(a.excerpt) > 0 THEN a.excerpt ELSE LEFT(REGEXP_REPLACE(a.content, '<[^>]+>', ''), 80) END) AS excerpt,

            CONCAT(c.firstName, c.lastName) As author,
            GROUP_CONCAT(DISTINCT d.name) As categories,
            COUNT(DISTINCT(e.id)) as views,
            COUNT(DISTINCT(f.id)) as likes,
            COUNT(DISTINCT(g.id)) as collections
        FROM
            news_article a
            LEFT JOIN news_article_category b ON a.id = b.articleId
            LEFT JOIN base_sys_user c ON a.authorId = c.id
            LEFT JOIN industry_category d ON b.categoryId = d.id
            LEFT JOIN news_article_view e ON a.id = e.articleId
            LEFT JOIN news_article_like f ON a.id = f.articleId
            LEFT JOIN news_article_collection g ON a.id = g.articleId
        WHERE a.status = '${article_1.ArticleStatus.PUBLISHED}'
            AND a.authorId = ${userId}
            ${this.setSql(category, 'AND d.slug = (?)', category)}
            ${this.setSql(keyWord, 'AND (a.title LIKE ?)', [`%${keyWord}%`])}
        GROUP BY a.id
        `;
        const result = await this.sqlRenderPage(sql, _.assign(query, {
            order,
            sort,
        }));
        return result;
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

            CONCAT(d.firstName, d.lastName) As author,
            GROUP_CONCAT(DISTINCT e.name) As categories,
            COUNT(DISTINCT(f.id)) as likes,
            COUNT(DISTINCT(g.id)) as collections,
            COUNT(DISTINCT(h.id)) as views
        FROM
            news_article_view a
            LEFT JOIN news_article b ON a.articleId = b.id
            LEFT JOIN news_article_category c ON b.id = c.articleId
            LEFT JOIN base_sys_user d ON b.authorId = d.id
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hcHAvYXJ0aWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBSTJCO0FBQzNCLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsa0RBQXdFO0FBRXhFLDRCQUE0QjtBQUM1QixrREFBZ0U7QUFDaEUsMERBQWlFO0FBQ2pFLDBEQUFpRTtBQUNqRSwyQ0FBK0M7QUFDL0Msd0RBQWtFO0FBQ2xFLGtFQUF5RTtBQUN6RSxzRUFBNkU7QUFFN0U7O0dBRUc7QUFFSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGtCQUFXO0lBNEJwRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQVk7UUFDcEIsT0FBTyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsNENBQTRDO1FBQzVDLDBCQUEwQjtRQUMxQixjQUFjO1FBQ2QscUJBQXFCO1FBQ3JCLGdCQUFnQjtRQUNoQixlQUFlO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFPO1FBQ3RCLElBQUksQ0FBQyxFQUFFO1lBQUUsSUFBSSw0QkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJO1lBQ0YsK0JBQStCO1lBQy9CLDBCQUEwQjtZQUMxQixrQkFBa0I7WUFDbEIsK0JBQStCO1lBQy9CLGdCQUFnQjtTQUNqQjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUs7UUFDcEIsTUFBTSxFQUFFLElBQUks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