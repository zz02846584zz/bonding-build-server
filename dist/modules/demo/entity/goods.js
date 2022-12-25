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
exports.DemoGoodsEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
/**
 * 商品
 */
let DemoGoodsEntity = class DemoGoodsEntity extends core_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '标题' }),
    __metadata("design:type", String)
], DemoGoodsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '图片' }),
    __metadata("design:type", String)
], DemoGoodsEntity.prototype, "pic", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '价格', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], DemoGoodsEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '分类 0-衣服 1-鞋子 2-裤子', type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], DemoGoodsEntity.prototype, "type", void 0);
DemoGoodsEntity = __decorate([
    (0, orm_1.EntityModel)('demo_goods')
], DemoGoodsEntity);
exports.DemoGoodsEntity = DemoGoodsEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kZW1vL2VudGl0eS9nb29kcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBNEM7QUFDNUMsNENBQStDO0FBQy9DLHFDQUFpQztBQUVqQzs7R0FFRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsaUJBQVU7Q0FZOUMsQ0FBQTtBQVZDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs4Q0FDWjtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs0Q0FDZDtBQUdaO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDOzs4Q0FDckQ7QUFHZDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7NkNBQ3pEO0FBWEYsZUFBZTtJQUQzQixJQUFBLGlCQUFXLEVBQUMsWUFBWSxDQUFDO0dBQ2IsZUFBZSxDQVkzQjtBQVpZLDBDQUFlIn0=