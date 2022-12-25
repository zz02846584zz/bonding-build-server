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
exports.AdminAwardTipsService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const tips_1 = require("../../entity/tips");
const tips_category_1 = require("../../entity/tips_category");
/**
 * 描述
 */
let AdminAwardTipsService = class AdminAwardTipsService extends core_1.BaseService {
    async add(param) {
        const { categories } = param;
        if (!categories)
            throw new core_1.CoolCommException('請選擇分類');
        const tip = await this.awardTipsEntity.save({
            ...param,
            createBy: this.ctx.admin.userId,
            updateBy: this.ctx.admin.userId,
        });
        await this.updateCategories({
            ...param,
            id: tip.id,
        });
        return tip;
    }
    async update(param) {
        const tip = await this.awardTipsEntity.save({
            ...param,
            updateBy: this.ctx.admin.userId,
        });
        await this.updateCategories({
            categories: param.categories,
            id: tip.id,
        });
        return tip;
    }
    async info(id) {
        const info = await this.awardTipsEntity.findOne({ id });
        const categories = await this.nativeQuery(`
      SELECT 
        categoryId
      FROM award_tips_category
      WHERE tipId = ${id}
    `);
        return {
            ...info,
            categories: categories === null || categories === void 0 ? void 0 : categories.map(e => parseInt(e.categoryId)),
        };
    }
    /**
     * 更新分類关系
     * @param user
     */
    async updateCategories(tip) {
        await this.awardTipsCategoryEntity.delete({ tipId: tip.id });
        if (tip.categories) {
            for (const category of tip.categories) {
                await this.awardTipsCategoryEntity.save({
                    tipId: tip.id,
                    categoryId: category,
                });
            }
        }
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(tips_1.AwardTipsEntity),
    __metadata("design:type", typeorm_1.Repository)
], AdminAwardTipsService.prototype, "awardTipsEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(tips_category_1.AwardTipsCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AdminAwardTipsService.prototype, "awardTipsCategoryEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], AdminAwardTipsService.prototype, "ctx", void 0);
AdminAwardTipsService = __decorate([
    (0, decorator_1.Provide)()
], AdminAwardTipsService);
exports.AdminAwardTipsService = AdminAwardTipsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2F3YXJkL3NlcnZpY2UvYWRtaW4vdGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsNENBQW9EO0FBQ3BELDhEQUFxRTtBQUVyRTs7R0FFRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsa0JBQVc7SUFVcEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLO1FBQ2IsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVTtZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0RCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQzFDLEdBQUcsS0FBSztZQUNSLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQy9CLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQ2hDLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzFCLEdBQUcsS0FBSztZQUNSLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtTQUNYLENBQUMsQ0FBQztRQUVILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztRQUNoQixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQzFDLEdBQUcsS0FBSztZQUNSLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQ2hDLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzFCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtZQUM1QixFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUU7U0FDWCxDQUFDLENBQUM7UUFFSCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDWCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQ3ZDOzs7O3NCQUlnQixFQUFFO0tBQ25CLENBQ0EsQ0FBQztRQUNGLE9BQU87WUFDTCxHQUFHLElBQUk7WUFDUCxVQUFVLEVBQUUsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekQsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRztRQUN4QixNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ2xCLEtBQUssTUFBTSxRQUFRLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDckMsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDO29CQUN0QyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ2IsVUFBVSxFQUFFLFFBQVE7aUJBQ3JCLENBQUMsQ0FBQzthQUNKO1NBQ0Y7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXZFQztJQURDLElBQUEsdUJBQWlCLEVBQUMsc0JBQWUsQ0FBQzs4QkFDbEIsb0JBQVU7OERBQWtCO0FBRzdDO0lBREMsSUFBQSx1QkFBaUIsRUFBQyx1Q0FBdUIsQ0FBQzs4QkFDbEIsb0JBQVU7c0VBQTBCO0FBRzdEO0lBREMsSUFBQSxrQkFBTSxHQUFFOztrREFDTDtBQVJPLHFCQUFxQjtJQURqQyxJQUFBLG1CQUFPLEdBQUU7R0FDRyxxQkFBcUIsQ0F5RWpDO0FBekVZLHNEQUFxQiJ9