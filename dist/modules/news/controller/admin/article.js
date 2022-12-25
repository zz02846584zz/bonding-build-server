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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNewsArticleController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const article_1 = require("../../entity/article");
const articleCategory_1 = require("../../entity/articleCategory");
const category_1 = require("../../../industry/entity/category");
const comment_1 = require("../../entity/comment");
const articleView_1 = require("../../entity/articleView");
const articleLike_1 = require("../../entity/articleLike");
const articleCollection_1 = require("../../entity/articleCollection");
const article_2 = require("../../service/admin/article");
/**
 * 描述
 */
let AdminNewsArticleController = class AdminNewsArticleController extends core_1.BaseController {
    /**
     * 瀏覽閱讀紀錄
     */
    async views(query) {
        return this.ok(await this.adminNewsArticleService.viewLogs(query));
    }
    /**
     * 瀏覽閱讀紀錄
     */
    async likes(query) {
        return this.ok(await this.adminNewsArticleService.likeLogs(query));
    }
    /**
     * 瀏覽閱讀紀錄
     */
    async collections(query) {
        return this.ok(await this.adminNewsArticleService.collectionLogs(query));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", article_2.AdminNewsArticleService)
], AdminNewsArticleController.prototype, "adminNewsArticleService", void 0);
__decorate([
    (0, decorator_1.Post)('/views', { summary: '閱讀紀錄' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminNewsArticleController.prototype, "views", null);
__decorate([
    (0, decorator_1.Post)('/likes', { summary: '閱讀紀錄' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminNewsArticleController.prototype, "likes", null);
__decorate([
    (0, decorator_1.Post)('/collections', { summary: '閱讀紀錄' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminNewsArticleController.prototype, "collections", null);
AdminNewsArticleController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: article_1.NewsArticleEntity,
        service: article_2.AdminNewsArticleService,
        pageQueryOp: {
            select: [
                'a.id',
                'a.authorName',
                'a.thumbnail',
                'a.title',
                'a.type',
                'a.isHot',
                'a.isTop',
                'a.commentOpen',
                'a.status',
                'a.updateTime',
                'a.publishTime',
                'a.createTime',
                'GROUP_CONCAT(DISTINCT c.id) as categories',
                'count(d.id) as commentCount',
                'count(e.id) as viewCount',
                'count(f.id) as likeCount',
                'count(g.id) as collectionCount',
            ],
            keyWordLikeFields: ['title', 'authorName'],
            fieldEq: [
                { column: 'a.type', requestParam: 'type' },
                { column: 'a.status', requestParam: 'status' },
                { column: 'b.categoryId', requestParam: 'categoryId' },
                { column: 'c.parentId', requestParam: 'categoryParentId' },
            ],
            join: [
                {
                    entity: articleCategory_1.NewsArticleCategoryEntity,
                    alias: 'b',
                    condition: 'a.id = b.articleId',
                    type: 'leftJoin',
                },
                {
                    entity: category_1.IndustryCategoryEntity,
                    alias: 'c',
                    condition: 'b.categoryId = c.id',
                    type: 'leftJoin',
                },
                {
                    entity: comment_1.NewsArticleCommentEntity,
                    alias: 'd',
                    condition: 'a.id = d.articleId',
                    type: 'leftJoin',
                },
                {
                    entity: articleView_1.NewsArticleViewEntity,
                    alias: 'e',
                    condition: 'a.id = e.articleId',
                    type: 'leftJoin',
                },
                {
                    entity: articleLike_1.NewsArticleLikeEntity,
                    alias: 'f',
                    condition: 'a.id = f.articleId',
                    type: 'leftJoin',
                },
                {
                    entity: articleCollection_1.NewsArticleCollectionEntity,
                    alias: 'g',
                    condition: 'a.id = g.articleId',
                    type: 'leftJoin',
                },
            ],
            extend: async (find) => {
                find.groupBy('a.id');
            },
        },
    })
], AdminNewsArticleController);
exports.AdminNewsArticleController = AdminNewsArticleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvY29udHJvbGxlci9hZG1pbi9hcnRpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBbUU7QUFDbkUsa0RBQXlEO0FBQ3pELGtFQUF5RTtBQUV6RSxnRUFBMkU7QUFDM0Usa0RBQWdFO0FBQ2hFLDBEQUFpRTtBQUNqRSwwREFBaUU7QUFDakUsc0VBQTZFO0FBQzdFLHlEQUFzRTtBQUV0RTs7R0FFRztBQTRFSCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEyQixTQUFRLHFCQUFjO0lBSTVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLEtBQUssQ0FBUyxLQUFLO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSyxDQUFTLEtBQUs7UUFDdkIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxXQUFXLENBQVMsS0FBSztRQUM3QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztDQUNGLENBQUE7QUF6QkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ2dCLGlDQUF1QjsyRUFBQztBQU1qRDtJQURDLElBQUEsZ0JBQUksRUFBQyxRQUFRLEVBQUUs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