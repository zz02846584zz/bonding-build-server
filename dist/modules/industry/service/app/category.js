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
exports.AppIndustryCategoryService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const category_1 = require("../../entity/category");
const category_2 = require("../admin/category");
/**
 * 描述
 */
let AppIndustryCategoryService = class AppIndustryCategoryService extends core_1.BaseService {
    async list() {
        return await this.adminIndustryCategoryService.list();
    }
    async info(query) {
        const { slug } = query;
        return await this.industryCategoryEntity.findOne({ slug });
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(category_1.IndustryCategoryEntity),
    __metadata("design:type", typeorm_1.Repository)
], AppIndustryCategoryService.prototype, "industryCategoryEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", category_2.AdminIndustryCategoryService)
], AppIndustryCategoryService.prototype, "adminIndustryCategoryService", void 0);
AppIndustryCategoryService = __decorate([
    (0, decorator_1.Provide)()
], AppIndustryCategoryService);
exports.AppIndustryCategoryService = AppIndustryCategoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9zZXJ2aWNlL2FwcC9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQWdEO0FBQ2hELHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsb0RBQStEO0FBQy9ELGdEQUFpRTtBQUVqRTs7R0FFRztBQUVILElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTJCLFNBQVEsa0JBQVc7SUFPekQsS0FBSyxDQUFDLElBQUk7UUFDUixPQUFPLE1BQU0sSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0YsQ0FBQTtBQWJDO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxpQ0FBc0IsQ0FBQzs4QkFDbEIsb0JBQVU7MEVBQXlCO0FBRzNEO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNxQix1Q0FBNEI7Z0ZBQUM7QUFMaEQsMEJBQTBCO0lBRHRDLElBQUEsbUJBQU8sR0FBRTtHQUNHLDBCQUEwQixDQWV0QztBQWZZLGdFQUEwQiJ9