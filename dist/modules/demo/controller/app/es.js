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
exports.AppDemoEsController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const test_1 = require("../../es/test");
const es_1 = require("@cool-midway/es");
/**
 * elasticsearch
 */
let AppDemoEsController = class AppDemoEsController extends core_1.BaseController {
    async test() {
        // es 客户端实例
        this.es.client;
        // 新增与修改
        await this.testEsIndex.upsert({
            name: '你好啊你是谁',
            age: 18,
        });
        return this.ok(await this.testEsIndex.find());
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", test_1.TestEsIndex)
], AppDemoEsController.prototype, "testEsIndex", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", es_1.CoolElasticSearch)
], AppDemoEsController.prototype, "es", void 0);
__decorate([
    (0, decorator_1.Post)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppDemoEsController.prototype, "test", null);
AppDemoEsController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)()
], AppDemoEsController);
exports.AppDemoEsController = AppDemoEsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE0RDtBQUM1RCw0Q0FBbUU7QUFDbkUsd0NBQTRDO0FBQzVDLHdDQUFvRDtBQUVwRDs7R0FFRztBQUdILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEscUJBQWM7SUFRckQsS0FBSyxDQUFDLElBQUk7UUFDUixXQUFXO1FBQ1gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZixRQUFRO1FBQ1IsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUM1QixJQUFJLEVBQUUsUUFBUTtZQUNkLEdBQUcsRUFBRSxFQUFFO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRixDQUFBO0FBaEJDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNJLGtCQUFXO3dEQUFDO0FBR3pCO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNMLHNCQUFpQjsrQ0FBQztBQUd0QjtJQURDLElBQUEsZ0JBQUksRUFBQyxPQUFPLENBQUM7Ozs7K0NBVWI7QUFqQlUsbUJBQW1CO0lBRi9CLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsR0FBRTtHQUNKLG1CQUFtQixDQWtCL0I7QUFsQlksa0RBQW1CIn0=