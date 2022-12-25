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
const _ = require("lodash");
const tips_1 = require("../../award/service/app/tips");
const tips_collection_1 = require("../../award/entity/tips_collection");
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

            a.authorName as author,
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
        WHERE a.status = 9
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
            award_tips a
            LEFT JOIN award_tips_collection b on a.id = b.tipId
            LEFT JOIN award_tips_category c on a.id = c.tipId
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
    (0, orm_1.InjectEntityModel)(tips_collection_1.AwardTipsCollectionEntity),
    __metadata("design:type", typeorm_1.Repository)
], CollectionService.prototype, "tipCollectionEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", tips_1.TipAppService)
], CollectionService.prototype, "tipAppService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], CollectionService.prototype, "ctx", void 0);
CollectionService = __decorate([
    (0, decorator_1.Provide)()
], CollectionService);
exports.CollectionService = CollectionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb2xsZWN0aW9uL3NlcnZpY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFtRTtBQUNuRSx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLDJFQUFrRjtBQUNsRiw0QkFBNEI7QUFDNUIsdURBQTZEO0FBQzdELHdFQUErRTtBQUUvRTs7R0FFRztBQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsa0JBQVc7SUFhaEQ7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRyxZQUFZLEVBQUUsSUFBSSxHQUFHLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUM1RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUUsTUFBTSxJQUFJLHdCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFELE1BQU0sR0FBRyxHQUFHOzs7Ozs7O3lCQU9TLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU07S0FDeEMsQ0FBQztRQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsVUFBVSxDQUMxQixHQUFHLEVBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxLQUFLO1lBQ0wsSUFBSTtTQUNMLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSztRQUNaLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxNQUFNLEVBQ0osSUFBSSxFQUNKLE9BQU8sRUFDUCxLQUFLLEdBQUcsYUFBYSxFQUNyQixJQUFJLEdBQUcsTUFBTSxFQUNiLFFBQVEsR0FDVCxHQUFHLEtBQUssQ0FBQztRQUVWLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN0QixNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0F5QmdCLE1BQU07Y0FDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxDQUFDO2NBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDOztTQUVuRSxDQUFDO1lBRUosTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUNyQyxHQUFHLEVBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsS0FBSztnQkFDTCxJQUFJO2FBQ0wsQ0FBQyxDQUNILENBQUM7WUFFRixPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQ3pCLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7MkJBWVMsTUFBTTs7T0FFMUIsQ0FBQztZQUVGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FDckMsR0FBRyxFQUNILENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNkLEtBQUssRUFBRSxhQUFhO2dCQUNwQixJQUFJO2FBQ0wsQ0FBQyxDQUNILENBQUM7WUFFRixPQUFPLE1BQU0sQ0FBQztTQUNmO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFuSEM7SUFEQyxJQUFBLHVCQUFpQixFQUFDLCtDQUEyQixDQUFDOzhCQUNsQixvQkFBVTtzRUFBOEI7QUFHckU7SUFEQyxJQUFBLHVCQUFpQixFQUFDLDJDQUF5QixDQUFDOzhCQUN4QixvQkFBVTs4REFBNEI7QUFHM0Q7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ00sb0JBQWE7d0RBQUM7QUFHN0I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OzhDQUNMO0FBWE8saUJBQWlCO0lBRDdCLElBQUEsbUJBQU8sR0FBRTtHQUNHLGlCQUFpQixDQXFIN0I7QUFySFksOENBQWlCIn0=