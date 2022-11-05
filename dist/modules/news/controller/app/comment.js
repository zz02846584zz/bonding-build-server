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
exports.NewsCommentApiController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const comment_1 = require("../../entity/comment");
const comment_2 = require("../../service/app/comment");
/**
 * 描述
 */
let NewsCommentApiController = class NewsCommentApiController extends core_1.BaseController {
    /**
     * 分頁
     * @param param
     */
    async getPage(query) {
        return this.ok(await this.newsCommentService.page(query));
    }
    /**
     * 新增
     * @param param
     */
    async create(query) {
        return this.ok(await this.newsCommentService.create(query));
    }
    /**
     * 點讚
     * @param param
     */
    async like(params) {
        return this.ok(await this.newsCommentService.like(params));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", comment_2.NewsCommentApiService)
], NewsCommentApiController.prototype, "newsCommentService", void 0);
__decorate([
    (0, decorator_1.Post)('/page', { summary: '取得留言列表' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsCommentApiController.prototype, "getPage", null);
__decorate([
    (0, decorator_1.Post)('/create', { summary: '創建留言' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsCommentApiController.prototype, "create", null);
__decorate([
    (0, decorator_1.Post)('/like', { summary: '留言點讚' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NewsCommentApiController.prototype, "like", null);
NewsCommentApiController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        prefix: '/app/news/article/comment',
        api: ['delete', 'update'],
        entity: comment_1.NewsArticleCommentEntity,
        service: comment_2.NewsCommentApiService,
    })
], NewsCommentApiController);
exports.NewsCommentApiController = NewsCommentApiController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3MvY29udHJvbGxlci9hcHAvY29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBQW1FO0FBQ25FLGtEQUFnRTtBQUNoRSx1REFBa0U7QUFFbEU7O0dBRUc7QUFRSCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLHFCQUFjO0lBSTFEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxPQUFPLENBQVMsS0FBSztRQUN6QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxNQUFNLENBQVMsS0FBSztRQUN4QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxJQUFJLENBQVMsTUFBTTtRQUN2QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGLENBQUE7QUE1QkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1csK0JBQXFCO29FQUFDO0FBTzFDO0lBREMsSUFBQSxnQkFBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUN0QixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3VEQUVwQjtBQU9EO0lBREMsSUFBQSxnQkFBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN2QixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3NEQUVuQjtBQU9EO0lBREMsSUFBQSxnQkFBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUN2QixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O29EQUVqQjtBQTdCVSx3QkFBd0I7SUFQcEMsSUFBQSxtQkFBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsTUFBTSxFQUFFLDJCQUEyQjtRQUNuQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQ3pCLE1BQU0sRUFBRSxrQ0FBd0I7UUFDaEMsT0FBTyxFQUFFLCtCQUFxQjtLQUMvQixDQUFDO0dBQ1csd0JBQXdCLENBOEJwQztBQTlCWSw0REFBd0IifQ==