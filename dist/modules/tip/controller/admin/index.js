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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3RpcC9jb250cm9sbGVyL2FkbWluL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBbUU7QUFDbkUsOENBQStDO0FBQy9DLCtDQUFzRDtBQUV0RDs7R0FFRztBQU9ILElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQW1CLFNBQVEscUJBQWM7Q0FBRyxDQUFBO0FBQTVDLGtCQUFrQjtJQU45QixJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUsaUJBQVM7UUFDakIsT0FBTyxFQUFFLHVCQUFlO0tBQ3pCLENBQUM7R0FDVyxrQkFBa0IsQ0FBMEI7QUFBNUMsZ0RBQWtCIn0=