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

            b.authorName as author,
            GROUP_CONCAT(DISTINCT d.name) As categories,
            COUNT(DISTINCT(e.id)) as views,
            COUNT(DISTINCT(f.id)) as likes,
            COUNT(DISTINCT(g.id)) as collections
        FROM
            news_article_collection parent
            LEFT JOIN news_article a ON parent.articleId = a.id
            LEFT JOIN news_article_category b ON a.id = b.articleId
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2NvbGxlY3Rpb24vc2VydmljZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsMkVBQWtGO0FBQ2xGLDREQUFrRTtBQUNsRSw0QkFBNEI7QUFDNUIsdURBQTBEO0FBQzFELCtDQUFzRDtBQUV0RDs7R0FFRztBQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsa0JBQVc7SUFhaEQ7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRyxZQUFZLEVBQUUsSUFBSSxHQUFHLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUM1RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFELGVBQWU7UUFDZix3QkFBd0I7UUFDeEIsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7eUJBT1MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTTtLQUN4QyxDQUFDO1FBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQzFCLEdBQUcsRUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNkLEtBQUs7WUFDTCxJQUFJO1NBQ0wsQ0FBQyxDQUNILENBQUM7UUFDRixPQUFPO1FBQ1AsdUJBQXVCO1FBQ3ZCLG9CQUFvQjtRQUNwQixlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLGtCQUFrQjtRQUNsQixhQUFhO1FBQ2IsMkJBQTJCO1FBQzNCLDRDQUE0QztRQUM1QyxpREFBaUQ7UUFDakQsU0FBUztRQUNULG9DQUFvQztRQUNwQyxhQUFhO1FBQ2IsMEJBQTBCO1FBQzFCLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsV0FBVztRQUNYLFNBQVM7UUFDVCxPQUFPO1FBQ1AsS0FBSztRQUVMLHlCQUF5QjtJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLO1FBQ1osTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLE1BQU0sRUFDSixJQUFJLEVBQ0osT0FBTyxFQUNQLEtBQUssR0FBRyxhQUFhLEVBQ3JCLElBQUksR0FBRyxNQUFNLEVBQ2IsUUFBUSxHQUNULEdBQUcsS0FBSyxDQUFDO1FBRVYsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBd0JVLHVCQUFhLENBQUMsU0FBUztrQ0FDakIsTUFBTTtjQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxRQUFRLENBQUM7Y0FDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7O1NBRW5FLENBQUM7WUFFSixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQ3JDLEdBQUcsRUFDSCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDZCxLQUFLO2dCQUNMLElBQUk7YUFDTCxDQUFDLENBQ0gsQ0FBQztZQUVGLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDekIsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7OzsyQkFZUyxNQUFNOztPQUUxQixDQUFDO1lBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNyQyxHQUFHLEVBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLElBQUk7YUFDTCxDQUFDLENBQ0gsQ0FBQztZQUVGLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTNJQztJQURDLElBQUEsdUJBQWlCLEVBQUMsK0NBQTJCLENBQUM7OEJBQ2xCLG9CQUFVO3NFQUE4QjtBQUdyRTtJQURDLElBQUEsdUJBQWlCLEVBQUMsZ0NBQW1CLENBQUM7OEJBQ2xCLG9CQUFVOzhEQUFzQjtBQUdyRDtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDTSxtQkFBYTt3REFBQztBQUc3QjtJQURDLElBQUEsa0JBQU0sR0FBRTs7OENBQ0w7QUFYTyxpQkFBaUI7SUFEN0IsSUFBQSxtQkFBTyxHQUFFO0dBQ0csaUJBQWlCLENBNkk3QjtBQTdJWSw4Q0FBaUIifQ==