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
const tips_1 = require("../../../award/service/app/tips");
/**
 * 不需要登錄的後台接口
 */
let BaseAppUserController = class BaseAppUserController extends core_1.BaseController {
    /**
     * 收藏
     * @param params
     */
    // @Post('/articles', { summary: '發布項目' })
    // async myArticle(@Body() params) {
    //   return this.ok(await this.newsArticleApiService.myArticle(params));
    // }
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
    __metadata("design:type", article_1.AppNewsArticleService)
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
    __metadata("design:type", tips_1.TipAppService)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL2NvbnRyb2xsZXIvYXBwL215LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FLMkI7QUFDM0IsZ0RBQTBEO0FBQzFELGlEQUE0RDtBQUM1RCxtREFBOEQ7QUFFOUQsK0RBQTBFO0FBQzFFLHlEQUFnRTtBQUNoRSwwREFBZ0U7QUFFaEU7O0dBRUc7QUFRSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBc0J2RDs7O09BR0c7SUFDSCwwQ0FBMEM7SUFDMUMsb0NBQW9DO0lBQ3BDLHdFQUF3RTtJQUN4RSxJQUFJO0lBRUo7OztPQUdHO0lBRUgsS0FBSyxDQUFDLGtCQUFrQixDQUFTLE1BQU07UUFDckMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO2FBQU0sSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNMLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFFSCxLQUFLLENBQUMsYUFBYSxDQUFTLE1BQU07UUFDaEMsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7SUFFSCxLQUFLLENBQUMsTUFBTSxDQUFTLE1BQU07UUFDekIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0YsQ0FBQTtBQTlEQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDYywrQkFBcUI7b0VBQUM7QUFHN0M7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1UsMkJBQWlCO2dFQUFDO0FBR3JDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNXLHlCQUFrQjtpRUFBQztBQUd2QztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDWSwyQkFBbUI7a0VBQUM7QUFHekM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ00sb0JBQWE7NERBQUM7QUFHN0I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O2tEQUNJO0FBR2I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ0osY0FBTztrREFBQztBQWdCYjtJQURDLElBQUEsZ0JBQUksRUFBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDWixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7OytEQVMvQjtBQU9EO0lBREMsSUFBQSxnQkFBSSxFQUFDLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNyQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7OzBEQUUxQjtBQU9EO0lBREMsSUFBQSxnQkFBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNwQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O21EQUVuQjtBQS9EVSxxQkFBcUI7SUFQakMsSUFBQSxtQkFBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsTUFBTSxFQUFFLFNBQVM7UUFDakIsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUN2QixNQUFNLEVBQUUsd0JBQWlCO1FBQ3pCLE9BQU8sRUFBRSx5QkFBa0I7S0FDNUIsQ0FBQztHQUNXLHFCQUFxQixDQWdFakM7QUFoRVksc0RBQXFCIn0=