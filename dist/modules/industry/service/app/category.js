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
exports.IndustryAppCategoryService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const category_1 = require("../../entity/category");
const _ = require("lodash");
/**
 * 描述
 */
let IndustryAppCategoryService = class IndustryAppCategoryService extends core_1.BaseService {
    /**
     * 描述
     */
    async info(query) {
        const { slug } = query;
        const info = await this.industryCategoryEntity.findOne({ slug });
        if (_.isEmpty(info))
            throw new core_1.CoolCommException('找不到該分類');
        return info;
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(category_1.IndustryCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], IndustryAppCategoryService.prototype, "industryCategoryEntity", void 0);
IndustryAppCategoryService = __decorate([
    (0, decorator_1.Provide)()
], IndustryAppCategoryService);
exports.IndustryAppCategoryService = IndustryAppCategoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9zZXJ2aWNlL2FwcC9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsb0RBQStEO0FBQy9ELDRCQUE0QjtBQUU1Qjs7R0FFRztBQUVILElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEsa0JBQVc7SUFJekQ7O09BRUc7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFBO0FBWEM7SUFEQyxJQUFBLHVCQUFpQixFQUFDLGlDQUFzQixDQUFDOzhCQUNsQixvQkFBVTswRUFBeUI7QUFGaEQsMEJBQTBCO0lBRHRDLElBQUEsbUJBQU8sR0FBRTtHQUNHLDBCQUEwQixDQWF0QztBQWJZLGdFQUEwQiJ9