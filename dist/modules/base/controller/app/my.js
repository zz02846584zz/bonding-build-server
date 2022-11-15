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
exports.BaseAppUserController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const user_1 = require("../../entity/sys/user");
const user_2 = require("../../service/app/user");
const param_1 = require("../../service/sys/param");
const article_1 = require("../../../news/service/app/article");
const service_1 = require("../../../collection/service");
const app_1 = require("../../../tip/service/app");
/**
 * 不需要登錄的後台接口
 */
let BaseAppUserController = class BaseAppUserController extends core_1.BaseController {
    /**
     * 收藏
     * @param params
     */
    async myArticle(params) {
        return this.ok(await this.newsArticleApiService.myArticle(params));
    }
    /**
     * 瀏覽紀錄
     * @param params
     */
    async articleViewHistory(params) {
        const { type } = params;
        if (type === 'article') {
            return this.ok(await this.newsArticleApiService.viewHistory(params));
        }
        else if (type === 'tip') {
            return this.ok(await this.tipAppService.viewHistory(params));
        }
        else {
            throw new core_1.CoolCommException('不允許的參數內容');
        }
    }
    /**
     * 收藏
     * @param params
     */
    async myCollections(params) {
        return this.ok(await this.collectionService.my(params));
    }
    /**
     * 小知識
     * @param params
     */
    async myTips(params) {
        return this.ok(await this.tipAppService.page(params));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", article_1.NewsArticleApiService)
], BaseAppUserController.prototype, "newsArticleApiService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", service_1.CollectionService)
], BaseAppUserController.prototype, "collectionService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", user_2.BaseApiUserService)
], BaseAppUserController.prototype, "baseApiUserService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", param_1.BaseSysParamService)
], BaseAppUserController.prototype, "baseSysParamService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", app_1.TipAppService)
], BaseAppUserController.prototype, "tipAppService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseAppUserController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", core_1.CoolEps)
], BaseAppUserController.prototype, "eps", void 0);
__decorate([
    (0, decorator_1.Post)('/articles', { summary: '發布項目' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "myArticle", null);
__decorate([
    (0, decorator_1.Post)('/history', { summary: '瀏覽紀錄' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "articleViewHistory", null);
__decorate([
    (0, decorator_1.Post)('/collections', { summary: '收藏項目' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "myCollections", null);
__decorate([
    (0, decorator_1.Post)('/tips', { summary: '小知識' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BaseAppUserController.prototype, "myTips", null);
BaseAppUserController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        prefix: '/app/my',
        api: ['delete', 'info'],
        entity: user_1.BaseSysUserEntity,
        service: user_2.BaseApiUserService,
    })
], BaseAppUserController);
exports.BaseAppUserController = BaseAppUserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hcHAvbXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQWtFO0FBQ2xFLDRDQUsyQjtBQUMzQixnREFBMEQ7QUFDMUQsaURBQTREO0FBQzVELG1EQUE4RDtBQUU5RCwrREFBMEU7QUFDMUUseURBQWdFO0FBQ2hFLGtEQUF5RDtBQUV6RDs7R0FFRztBQVFILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFzQnZEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxTQUFTLENBQVMsTUFBTTtRQUM1QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxrQkFBa0IsQ0FBUyxNQUFNO1FBQ3JDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN0RTthQUFNLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzlEO2FBQU07WUFDTCxNQUFNLElBQUksd0JBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLGFBQWEsQ0FBUyxNQUFNO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLE1BQU0sQ0FBUyxNQUFNO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGLENBQUE7QUE5REM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ2MsK0JBQXFCO29FQUFDO0FBRzdDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNVLDJCQUFpQjtnRUFBQztBQUdyQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDVyx5QkFBa0I7aUVBQUM7QUFHdkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1ksMkJBQW1CO2tFQUFDO0FBR3pDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNNLG1CQUFhOzREQUFDO0FBRzdCO0lBREMsSUFBQSxrQkFBTSxHQUFFOztrREFDSTtBQUdiO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNKLGNBQU87a0RBQUM7QUFPYjtJQURDLElBQUEsZ0JBQUksRUFBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDdEIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OztzREFFdEI7QUFPRDtJQURDLElBQUEsZ0JBQUksRUFBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDWixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7OytEQVMvQjtBQU9EO0lBREMsSUFBQSxnQkFBSSxFQUFDLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNyQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7OzBEQUUxQjtBQU9EO0lBREMsSUFBQSxnQkFBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNwQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O21EQUVuQjtBQS9EVSxxQkFBcUI7SUFQakMsSUFBQSxtQkFBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsTUFBTSxFQUFFLFNBQVM7UUFDakIsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUN2QixNQUFNLEVBQUUsd0JBQWlCO1FBQ3pCLE9BQU8sRUFBRSx5QkFBa0I7S0FDNUIsQ0FBQztHQUNXLHFCQUFxQixDQWdFakM7QUFoRVksc0RBQXFCIn0=