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
exports.IndustryCategoryController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const category_1 = require("../../entity/category");
const category_2 = require("../../service/app/category");
/**
 * 描述
 */
let IndustryCategoryController = class IndustryCategoryController extends core_1.BaseController {
    async getInfo(query) {
        return this.ok(await this.industryAppCategoryService.info(query));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", category_2.IndustryAppCategoryService)
], IndustryCategoryController.prototype, "industryAppCategoryService", void 0);
__decorate([
    (0, decorator_1.Post)('/info', { summary: '內容' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IndustryCategoryController.prototype, "getInfo", null);
IndustryCategoryController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        prefix: '/app/industry-category',
        api: ['list', 'page'],
        entity: category_1.IndustryCategoryEntity,
        service: category_2.IndustryAppCategoryService,
    })
], IndustryCategoryController);
exports.IndustryCategoryController = IndustryCategoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9jb250cm9sbGVyL2FwcC9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBQW1FO0FBQ25FLG9EQUErRDtBQUMvRCx5REFBd0U7QUFFeEU7O0dBRUc7QUFRSCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEyQixTQUFRLHFCQUFjO0lBSzVELEtBQUssQ0FBQyxPQUFPLENBQVMsS0FBSztRQUN6QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNGLENBQUE7QUFOQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDbUIscUNBQTBCOzhFQUFDO0FBR3ZEO0lBREMsSUFBQSxnQkFBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNsQixXQUFBLElBQUEsZ0JBQUksR0FBRSxDQUFBOzs7O3lEQUVwQjtBQVBVLDBCQUEwQjtJQVB0QyxJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUM7UUFDZCxNQUFNLEVBQUUsd0JBQXdCO1FBQ2hDLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDckIsTUFBTSxFQUFFLGlDQUFzQjtRQUM5QixPQUFPLEVBQUUscUNBQTBCO0tBQ3BDLENBQUM7R0FDVywwQkFBMEIsQ0FRdEM7QUFSWSxnRUFBMEIifQ==