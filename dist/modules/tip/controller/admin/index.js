"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipAdminController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const index_1 = require("../../entity/index");
const admin_1 = require("../../service/admin");
/**
 * 描述
 */
let TipAdminController = class TipAdminController extends core_1.BaseController {
};
TipAdminController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: index_1.TipEntity,
        service: admin_1.TipAdminService,
    })
], TipAdminController);
exports.TipAdminController = TipAdminController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy90aXAvY29udHJvbGxlci9hZG1pbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLDhDQUErQztBQUMvQywrQ0FBc0Q7QUFFdEQ7O0dBRUc7QUFPSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLHFCQUFjO0NBQUcsQ0FBQTtBQUE1QyxrQkFBa0I7SUFOOUIsSUFBQSxtQkFBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLGlCQUFTO1FBQ2pCLE9BQU8sRUFBRSx1QkFBZTtLQUN6QixDQUFDO0dBQ1csa0JBQWtCLENBQTBCO0FBQTVDLGdEQUFrQiJ9