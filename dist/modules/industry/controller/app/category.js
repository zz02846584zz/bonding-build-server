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
exports.AdminIndustryCategoryController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const category_1 = require("../../entity/category");
const category_2 = require("../../service/app/category");
/**
 * 描述
 */
let AdminIndustryCategoryController = class AdminIndustryCategoryController extends core_1.BaseController {
    async information(query) {
        return this.ok(await this.appIndustryCategoryService.info(query));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", category_2.AppIndustryCategoryService)
], AdminIndustryCategoryController.prototype, "appIndustryCategoryService", void 0);
__decorate([
    (0, decorator_1.Post)('/info', { summary: '退出' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminIndustryCategoryController.prototype, "information", null);
AdminIndustryCategoryController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: ['list'],
        entity: category_1.IndustryCategoryEntity,
        service: category_2.AppIndustryCategoryService,
    })
], AdminIndustryCategoryController);
exports.AdminIndustryCategoryController = AdminIndustryCategoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9jb250cm9sbGVyL2FwcC9jYXRlZ29yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBQW1FO0FBQ25FLG9EQUErRDtBQUMvRCx5REFBd0U7QUFFeEU7O0dBRUc7QUFPSCxJQUFhLCtCQUErQixHQUE1QyxNQUFhLCtCQUFnQyxTQUFRLHFCQUFjO0lBS2pFLEtBQUssQ0FBQyxXQUFXLENBQVMsS0FBSztRQUM3QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNGLENBQUE7QUFOQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDbUIscUNBQTBCO21GQUFDO0FBR3ZEO0lBREMsSUFBQSxnQkFBSSxFQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNkLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7Ozs7a0VBRXhCO0FBUFUsK0JBQStCO0lBTjNDLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNiLE1BQU0sRUFBRSxpQ0FBc0I7UUFDOUIsT0FBTyxFQUFFLHFDQUEwQjtLQUNwQyxDQUFDO0dBQ1csK0JBQStCLENBUTNDO0FBUlksMEVBQStCIn0=