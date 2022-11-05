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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL2NvbnRyb2xsZXIvYXBwL215LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FLMkI7QUFDM0IsZ0RBQTBEO0FBQzFELGlEQUE0RDtBQUM1RCxtREFBOEQ7QUFFOUQsK0RBQTBFO0FBQzFFLHlEQUFnRTtBQUNoRSxrREFBeUQ7QUFFekQ7O0dBRUc7QUFRSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLHFCQUFjO0lBc0J2RDs7O09BR0c7SUFFSCxLQUFLLENBQUMsU0FBUyxDQUFTLE1BQU07UUFDNUIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7O09BR0c7SUFFSCxLQUFLLENBQUMsa0JBQWtCLENBQVMsTUFBTTtRQUNyQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdEU7YUFBTSxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM5RDthQUFNO1lBQ0wsTUFBTSxJQUFJLHdCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxhQUFhLENBQVMsTUFBTTtRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVEOzs7T0FHRztJQUVILEtBQUssQ0FBQyxNQUFNLENBQVMsTUFBTTtRQUN6QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7Q0FDRixDQUFBO0FBOURDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNjLCtCQUFxQjtvRUFBQztBQUc3QztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDVSwyQkFBaUI7Z0VBQUM7QUFHckM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1cseUJBQWtCO2lFQUFDO0FBR3ZDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDJCQUFtQjtrRUFBQztBQUd6QztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDTSxtQkFBYTs0REFBQztBQUc3QjtJQURDLElBQUEsa0JBQU0sR0FBRTs7a0RBQ0k7QUFHYjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDSixjQUFPO2tEQUFDO0FBT2I7SUFEQyxJQUFBLGdCQUFJLEVBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7Ozs7c0RBRXRCO0FBT0Q7SUFEQyxJQUFBLGdCQUFJLEVBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ1osV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OzsrREFTL0I7QUFPRDtJQURDLElBQUEsZ0JBQUksRUFBQyxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDckIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OzswREFFMUI7QUFPRDtJQURDLElBQUEsZ0JBQUksRUFBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDcEIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OzttREFFbkI7QUEvRFUscUJBQXFCO0lBUGpDLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7UUFDdkIsTUFBTSxFQUFFLHdCQUFpQjtRQUN6QixPQUFPLEVBQUUseUJBQWtCO0tBQzVCLENBQUM7R0FDVyxxQkFBcUIsQ0FnRWpDO0FBaEVZLHNEQUFxQiJ9