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
exports.CollectionService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const articleCollection_1 = require("../../news/entity/articleCollection");
const collection_1 = require("../../tip/entity/collection");
const _ = require("lodash");
const article_1 = require("../../news/entity/article");
const app_1 = require("../../tip/service/app");
/**
 * 描述
 */
let CollectionService = class CollectionService extends core_1.BaseService {
    /**
     * 描述
     */
    async page(query) {
        const { type, order = 'createTime', sort = 'desc' } = query;
        if (_.isEmpty(type))
            throw new core_1.CoolCommException('未輸入類型');
        // const fn = {
        //   news: async () => {
        const sql = `
      SELECT
        a.id,
        b.title
      FROM
        news_article_collection a
        LEFT JOIN news_article b ON a.articleId = b.id
      WHERE a.userId = ${this.ctx.user.userId}
    `;
        return await this.renderPage(sql, _.assign(query, {
            order,
            sort,
        }));
        //   },
        //   tip: async () => {
        //     const sql = `
        //       SELECT
        //         a.id,
        //         b.title
        //       FROM
        //         tip_collection a
        //         LEFT JOIN tip b ON a.tipId = b.id
        //       WHERE a.userId = ${this.ctx.user.userId}
        //     `;
        //     return await this.renderPage(
        //       sql,
        //       _.assign(query, {
        //         order,
        //         sort,
        //       })
        //     );
        //   },
        // };
        // return await fn[type];
    }
    async my(query) {
        const userId = this.ctx.user.userId;
        const { type, keyWord, order = 'publishTime', sort = 'desc', category, } = query;
        if (type === 'article') {
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
            news_article_collection parent
            LEFT JOIN news_article a ON parent.articleId = a.id
            LEFT JOIN news_article_category b ON a.id = b.articleId
            LEFT JOIN base_sys_user c ON a.authorId = c.id
            LEFT JOIN industry_category d ON b.categoryId = d.id
            LEFT JOIN news_article_view e ON a.id = e.articleId
            LEFT JOIN news_article_like f ON a.id = f.articleId
            LEFT JOIN news_article_collection g ON a.id = g.articleId
        WHERE a.status = '${article_1.ArticleStatus.PUBLISHED}'
            AND parent.userId = ${userId}
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
        else if (type === 'tip') {
            const sql = `
        SELECT
            a.id,
            a.title,
            a.publishDate,
            GROUP_CONCAT(distinct d.name) AS categories

        FROM
            tip a
            LEFT JOIN tip_collection b on a.id = b.tipId
            LEFT JOIN tip_category c on a.id = c.tipId
            LEFT JOIN industry_category d on d.id = c.categoryId
        WHERE b.userId = ${userId}
        GROUP BY a.id
      `;
            const result = await this.sqlRenderPage(sql, _.assign(query, {
                order: 'publishDate',
                sort,
            }));
            return result;
        }
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(articleCollection_1.NewsArticleCollectionEntity),
    __metadata("design:type", typeorm_1.Repository)
], CollectionService.prototype, "newsArticleCollectionEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(collection_1.TipCollectionEntity),
    __metadata("design:type", typeorm_1.Repository)
], CollectionService.prototype, "tipCollectionEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", app_1.TipAppService)
], CollectionService.prototype, "tipAppService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], CollectionService.prototype, "ctx", void 0);
CollectionService = __decorate([
    (0, decorator_1.Provide)()
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb2xsZWN0aW9uL3NlcnZpY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFtRTtBQUNuRSx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLDJFQUFrRjtBQUNsRiw0REFBa0U7QUFDbEUsNEJBQTRCO0FBQzVCLHVEQUEwRDtBQUMxRCwrQ0FBc0Q7QUFFdEQ7O0dBRUc7QUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLGtCQUFXO0lBYWhEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEdBQUcsWUFBWSxFQUFFLElBQUksR0FBRyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDNUQsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxRCxlQUFlO1FBQ2Ysd0JBQXdCO1FBQ3hCLE1BQU0sR0FBRyxHQUFHOzs7Ozs7O3lCQU9TLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07S0FDeEMsQ0FBQztRQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsVUFBVSxDQUMxQixHQUFHLEVBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxLQUFLO1lBQ0wsSUFBSTtTQUNMLENBQUMsQ0FDSCxDQUFDO1FBQ0YsT0FBTztRQUNQLHVCQUF1QjtRQUN2QixvQkFBb0I7UUFDcEIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLDJCQUEyQjtRQUMzQiw0Q0FBNEM7UUFDNUMsaURBQWlEO1FBQ2pELFNBQVM7UUFDVCxvQ0FBb0M7UUFDcEMsYUFBYTtRQUNiLDBCQUEwQjtRQUMxQixpQkFBaUI7UUFDakIsZ0JBQWdCO1FBQ2hCLFdBQVc7UUFDWCxTQUFTO1FBQ1QsT0FBTztRQUNQLEtBQUs7UUFFTCx5QkFBeUI7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSztRQUNaLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxNQUFNLEVBQ0osSUFBSSxFQUNKLE9BQU8sRUFDUCxLQUFLLEdBQUcsYUFBYSxFQUNyQixJQUFJLEdBQUcsTUFBTSxFQUNiLFFBQVEsR0FDVCxHQUFHLEtBQUssQ0FBQztRQUVWLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkF5QlUsdUJBQWEsQ0FBQyxTQUFTO2tDQUNqQixNQUFNO2NBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsQ0FBQztjQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQzs7U0FFbkUsQ0FBQztZQUVKLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FDckMsR0FBRyxFQUNILENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNkLEtBQUs7Z0JBQ0wsSUFBSTthQUNMLENBQUMsQ0FDSCxDQUFDO1lBRUYsT0FBTyxNQUFNLENBQUM7U0FDZjthQUFNLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtZQUN6QixNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7OzJCQVlTLE1BQU07O09BRTFCLENBQUM7WUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ3JDLEdBQUcsRUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDZCxLQUFLLEVBQUUsYUFBYTtnQkFDcEIsSUFBSTthQUNMLENBQUMsQ0FDSCxDQUFDO1lBRUYsT0FBTyxNQUFNLENBQUM7U0FDZjtJQUNILENBQUM7Q0FDRixDQUFBO0FBNUlDO0lBREMsSUFBQSx1QkFBaUIsRUFBQywrQ0FBMkIsQ0FBQzs4QkFDbEIsb0JBQVU7c0VBQThCO0FBR3JFO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxnQ0FBbUIsQ0FBQzs4QkFDbEIsb0JBQVU7OERBQXNCO0FBR3JEO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNNLG1CQUFhO3dEQUFDO0FBRzdCO0lBREMsSUFBQSxrQkFBTSxHQUFFOzs4Q0FDTDtBQVhPLGlCQUFpQjtJQUQ3QixJQUFBLG1CQUFPLEdBQUU7R0FDRyxpQkFBaUIsQ0E4STdCO0FBOUlZLDhDQUFpQiJ9