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
exports.AppDictInfoController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const info_1 = require("../../service/info");
/**
 * 字典信息
 */
let AppDictInfoController = class AppDictInfoController extends core_1.BaseController {
    async data(types = []) {
        return this.ok(await this.dictInfoService.data(types));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", info_1.DictInfoService)
], AppDictInfoController.prototype, "dictInfoService", void 0);
__decorate([
    (0, decorator_1.Post)('/data', { summary: '获得字典数据' }),
    __param(0, (0, decorator_1.Body)('types')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AppDictInfoController.prototype, "data", null);
AppDictInfoController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)(),
    (0, core_1.CoolUrlTag)({
        key: core_1.TagTypes.IGNORE_TOKEN,
        value: ['data'],
    })
], AppDictInfoController);
exports.AppDictInfoController = AppDictInfoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RpY3QvY29udHJvbGxlci9hcHAvaW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBa0U7QUFDbEUsNENBSzJCO0FBQzNCLDZDQUFxRDtBQUVyRDs7R0FFRztBQU9ILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFLdkQsS0FBSyxDQUFDLElBQUksQ0FBZ0IsUUFBa0IsRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRixDQUFBO0FBTkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1Esc0JBQWU7OERBQUM7QUFHakM7SUFEQyxJQUFBLGdCQUFJLEVBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLFdBQUEsSUFBQSxnQkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBOzs7O2lEQUV4QjtBQVBVLHFCQUFxQjtJQU5qQyxJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEdBQUU7SUFDaEIsSUFBQSxpQkFBVSxFQUFDO1FBQ1YsR0FBRyxFQUFFLGVBQVEsQ0FBQyxZQUFZO1FBQzFCLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUNoQixDQUFDO0dBQ1cscUJBQXFCLENBUWpDO0FBUlksc0RBQXFCIn0=