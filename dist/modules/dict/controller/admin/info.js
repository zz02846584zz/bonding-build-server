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
exports.AdminDictInfoController = void 0;
const info_1 = require("./../../entity/info");
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const info_2 = require("../../service/info");
/**
 * 字典信息
 */
let AdminDictInfoController = class AdminDictInfoController extends core_1.BaseController {
    async data(types = []) {
        return this.ok(await this.dictInfoService.data(types));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", info_2.DictInfoService)
], AdminDictInfoController.prototype, "dictInfoService", void 0);
__decorate([
    (0, decorator_1.Post)('/data', { summary: '获得字典数据' }),
    __param(0, (0, decorator_1.Body)('types')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], AdminDictInfoController.prototype, "data", null);
AdminDictInfoController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: info_1.DictInfoEntity,
        service: info_2.DictInfoService,
        listQueryOp: {
            fieldEq: ['typeId'],
            keyWordLikeFields: ['name'],
            addOrderBy: {
                createTime: 'ASC',
            },
        },
    })
], AdminDictInfoController);
exports.AdminDictInfoController = AdminDictInfoController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RpY3QvY29udHJvbGxlci9hZG1pbi9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUFxRDtBQUNyRCxtREFBa0U7QUFDbEUsNENBQW1FO0FBQ25FLDZDQUFxRDtBQUVyRDs7R0FFRztBQWNILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEscUJBQWM7SUFLekQsS0FBSyxDQUFDLElBQUksQ0FBZ0IsUUFBa0IsRUFBRTtRQUM1QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRixDQUFBO0FBTkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1Esc0JBQWU7Z0VBQUM7QUFHakM7SUFEQyxJQUFBLGdCQUFJLEVBQUMsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLFdBQUEsSUFBQSxnQkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFBOzs7O21EQUV4QjtBQVBVLHVCQUF1QjtJQWJuQyxJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUscUJBQWM7UUFDdEIsT0FBTyxFQUFFLHNCQUFlO1FBQ3hCLFdBQVcsRUFBRTtZQUNYLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixpQkFBaUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUMzQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFLEtBQUs7YUFDbEI7U0FDRjtLQUNGLENBQUM7R0FDVyx1QkFBdUIsQ0FRbkM7QUFSWSwwREFBdUIifQ==