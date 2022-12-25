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
exports.CollectionController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const service_1 = require("../../service");
/**
 * 描述
 */
let CollectionController = class CollectionController extends core_1.BaseController {
    /**
     * 分頁
     * @param param
     */
    async getPage(query) {
        return this.ok(await this.collectionService.page(query));
    }
    /**
     * 分頁
     * @param param
     */
    async deleteItem(query) {
        return this.ok(await this.collectionService.delete(query));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", service_1.CollectionService)
], CollectionController.prototype, "collectionService", void 0);
__decorate([
    (0, decorator_1.Post)('/page', { summary: '取得收藏列表' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "getPage", null);
__decorate([
    (0, decorator_1.Post)('/delete', { summary: '刪除收藏項目' }),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollectionController.prototype, "deleteItem", null);
CollectionController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)('/app/collection')
], CollectionController);
exports.CollectionController = CollectionController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9jb2xsZWN0aW9uL2NvbnRyb2xsZXIvYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFrRTtBQUNsRSw0Q0FBbUU7QUFDbkUsMkNBQWtEO0FBRWxEOztHQUVHO0FBR0gsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxxQkFBYztJQUl0RDs7O09BR0c7SUFFSCxLQUFLLENBQUMsT0FBTyxDQUFTLEtBQUs7UUFDekIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7O09BR0c7SUFFSCxLQUFLLENBQUMsVUFBVSxDQUFTLEtBQUs7UUFDNUIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDRixDQUFBO0FBbkJDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNVLDJCQUFpQjsrREFBQztBQU9yQztJQURDLElBQUEsZ0JBQUksRUFBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDdEIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OzttREFFcEI7QUFPRDtJQURDLElBQUEsZ0JBQUksRUFBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDckIsV0FBQSxJQUFBLGdCQUFJLEdBQUUsQ0FBQTs7OztzREFFdkI7QUFwQlUsb0JBQW9CO0lBRmhDLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQyxpQkFBaUIsQ0FBQztHQUNyQixvQkFBb0IsQ0FxQmhDO0FBckJZLG9EQUFvQiJ9