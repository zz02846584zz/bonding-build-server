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
exports.AdminIndustryCategoryService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const category_1 = require("../../entity/category");
const _ = require("lodash");
const articleCategory_1 = require("../../../news/entity/articleCategory");
const tips_category_1 = require("../../../award/entity/tips_category");
/**
 * 描述
 */
let AdminIndustryCategoryService = class AdminIndustryCategoryService extends core_1.BaseService {
    async list() {
        const data = await this.industryCategoryEntity
            .createQueryBuilder()
            .getMany();
        const fn = async (e) => {
            e.tipCount = await this.awardTipsCategoryEntity
                .createQueryBuilder()
                .where(new typeorm_1.Brackets(qb => {
                qb.where('categoryId = :id', { id: e.id });
            }))
                .getCount();
            e.articleCount = await this.newsArticleCategoryEntity
                .createQueryBuilder()
                .where(new typeorm_1.Brackets(qb => {
                qb.where('categoryId = :id', { id: e.id });
            }))
                .getCount();
            return e;
        };
        const result = await Promise.all(data.map(e => fn(e)));
        const resultWithChildCount = result.map(e => {
            if (e.parentId === null) {
                e.tipCount = data
                    .filter(child => child.parentId === e.id)
                    .reduce((a, b) => _.add(a, b.tipCount), 0);
                e.articleCount = data
                    .filter(child => child.parentId === e.id)
                    .reduce((a, b) => _.add(a, b.articleCount), 0);
            }
            return e;
        });
        return resultWithChildCount;
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(category_1.IndustryCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AdminIndustryCategoryService.prototype, "industryCategoryEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(tips_category_1.AwardTipsCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AdminIndustryCategoryService.prototype, "awardTipsCategoryEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(articleCategory_1.NewsArticleCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AdminIndustryCategoryService.prototype, "newsArticleCategoryEntity", void 0);
AdminIndustryCategoryService = __decorate([
    (0, decorator_1.Provide)()
], AdminIndustryCategoryService);
exports.AdminIndustryCategoryService = AdminIndustryCategoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9zZXJ2aWNlL2FkbWluL2NhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUErQztBQUMvQyxvREFBK0Q7QUFDL0QsNEJBQTRCO0FBQzVCLDBFQUFpRjtBQUNqRix1RUFBOEU7QUFFOUU7O0dBRUc7QUFFSCxJQUFhLDRCQUE0QixHQUF6QyxNQUFhLDRCQUE2QixTQUFRLGtCQUFXO0lBVTNELEtBQUssQ0FBQyxJQUFJO1FBQ1IsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsc0JBQXNCO2FBQzNDLGtCQUFrQixFQUFFO2FBQ3BCLE9BQU8sRUFBRSxDQUFDO1FBRWIsTUFBTSxFQUFFLEdBQUcsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFFO1lBQ25CLENBQUMsQ0FBQyxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsdUJBQXVCO2lCQUM1QyxrQkFBa0IsRUFBRTtpQkFDcEIsS0FBSyxDQUNKLElBQUksa0JBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDaEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FDSDtpQkFDQSxRQUFRLEVBQUUsQ0FBQztZQUVkLENBQUMsQ0FBQyxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMseUJBQXlCO2lCQUNsRCxrQkFBa0IsRUFBRTtpQkFDcEIsS0FBSyxDQUNKLElBQUksa0JBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDaEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FDSDtpQkFDQSxRQUFRLEVBQUUsQ0FBQztZQUVkLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO2dCQUN2QixDQUFDLENBQUMsUUFBUSxHQUFHLElBQUk7cUJBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO3FCQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxZQUFZLEdBQUcsSUFBSTtxQkFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO3FCQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7WUFDRCxPQUFPLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDO0NBQ0YsQ0FBQTtBQWxEQztJQURDLElBQUEsdUJBQWlCLEVBQUMsaUNBQXNCLENBQUM7OEJBQ2xCLG9CQUFVOzRFQUF5QjtBQUczRDtJQURDLElBQUEsdUJBQWlCLEVBQUMsdUNBQXVCLENBQUM7OEJBQ2xCLG9CQUFVOzZFQUEwQjtBQUc3RDtJQURDLElBQUEsdUJBQWlCLEVBQUMsMkNBQXlCLENBQUM7OEJBQ2xCLG9CQUFVOytFQUE0QjtBQVJ0RCw0QkFBNEI7SUFEeEMsSUFBQSxtQkFBTyxHQUFFO0dBQ0csNEJBQTRCLENBb0R4QztBQXBEWSxvRUFBNEIifQ==