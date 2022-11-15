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
exports.NewsArticleController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const article_1 = require("../../service/app/article");
const article_2 = require("../../dto/article");
const validate_1 = require("@midwayjs/validate");
/**
 * 描述
 */
let NewsArticleController = class NewsArticleController extends core_1.BaseController {
    /**
     * 分頁
     * @query query
     */
    async getPage(query) {
        return this.ok(await this.newsArticleApiService.page(query));
    }
    /**
     * 列表
     */
    async getList(query) {
        return this.ok(await this.newsArticleApiService.list(query));
    }
    /**
     * 分類
     * @param param
     */
    async getArticleCategories() {
        return this.ok(await this.newsArticleApiService.getCategories());
    }
    /**
     * 分類
     * @param param
     */
    async getArticle(param) {
        return this.ok(await this.newsArticleApiService.getArticle(param));
    }
    /**
     * 點贊
     * @param param
     */
    async articleLike(param) {
        return this.ok(await this.newsArticleApiService.articleLike(param));
    }
    /**
     * 新增
     * @param article
     */
    async articleNew(article) {
        return this.ok(await this.newsArticleApiService.add(article));
    }
    /**
     * 刪除
     * @param params
     */
    async articleDelete(params) {
        return this.ok(await this.newsArticleApiService.delete(params));
    }
    /**
     * 收藏
     * @param params
     */
    async articleCollection(params) {
        return this.ok(await this.newsArticleApiService.collection(params));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", article_1.NewsArticleApiService)
], NewsArticleController.prototype, "newsArticleApiService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], NewsArticleController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Post)('/page', { summary: '分頁' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "getPage", null);
__decorate([
    (0, decorator_1.Post)('/list', { summary: '列表' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "getList", null);
__decorate([
    (0, decorator_1.Post)('/categories', { summary: '取得留言' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "getArticleCategories", null);
__decorate([
    (0, decorator_1.Post)('/info', { summary: '文章內容' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "getArticle", null);
__decorate([
    (0, decorator_1.Post)('/like', { summary: '點贊' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "articleLike", null);
__decorate([
    (0, decorator_1.Post)('/create', { summary: '新增' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_2.ArticleDTO]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "articleNew", null);
__decorate([
    (0, decorator_1.Post)('/delete', { summary: '刪除' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "articleDelete", null);
__decorate([
    (0, decorator_1.Post)('/collection', { summary: '收藏' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsArticleController.prototype, "articleCollection", null);
NewsArticleController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)('/app/news/article')
], NewsArticleController);
exports.NewsArticleController = NewsArticleController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmV3cy9jb250cm9sbGVyL2FwcC9hcnRpY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBbUU7QUFDbkUsdURBQWtFO0FBRWxFLCtDQUErQztBQUMvQyxpREFBOEM7QUFFOUM7O0dBRUc7QUFHSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBT3ZEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxPQUFPLENBQVMsS0FBSztRQUN6QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE9BQU8sQ0FBUyxLQUFLO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLG9CQUFvQjtRQUN4QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLFVBQVUsQ0FBUyxLQUFLO1FBQzVCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLFdBQVcsQ0FBUyxLQUFLO1FB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