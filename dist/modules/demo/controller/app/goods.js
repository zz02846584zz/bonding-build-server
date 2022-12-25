"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoolGoodsController = void 0;
const goods_1 = require("../../entity/goods");
const core_1 = require("@cool-midway/core");
const goods_2 = require("../../service/goods");
/**
 * 测试
 */
let CoolGoodsController = class CoolGoodsController extends core_1.BaseController {
};
CoolGoodsController = __decorate([
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'page', 'list'],
        entity: goods_1.DemoGoodsEntity,
        service: goods_2.DemoGoodsService,
    })
], CoolGoodsController);
exports.CoolGoodsController = CoolGoodsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL2dvb2RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDhDQUFxRDtBQUNyRCw0Q0FBbUU7QUFDbkUsK0NBQXVEO0FBRXZEOztHQUVHO0FBTUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxxQkFBYztDQUFHLENBQUE7QUFBN0MsbUJBQW1CO0lBTC9CLElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSx1QkFBZTtRQUN2QixPQUFPLEVBQUUsd0JBQWdCO0tBQzFCLENBQUM7R0FDVyxtQkFBbUIsQ0FBMEI7QUFBN0Msa0RBQW1CIn0=