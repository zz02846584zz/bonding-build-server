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
exports.DemoPayController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const pay_1 = require("@cool-midway/pay");
const xml2js_1 = require("xml2js");
/**
 * 支付示例
 */
let DemoPayController = class DemoPayController extends core_1.BaseController {
    /**
     * 微信扫码支付
     */
    async wx() {
        const orderNum = await this.wxPay.createOrderNum();
        const data = await this.wxPay.getInstance().unifiedOrder({
            out_trade_no: orderNum,
            body: '测试微信支付',
            total_fee: 1,
            trade_type: 'NATIVE',
            product_id: 'test001',
        });
        return this.ok(data);
    }
    /**
     * 微信支付通知回调
     */
    async wxNotify() {
        let data = '';
        this.ctx.req.setEncoding('utf8');
        this.ctx.req.on('data', chunk => {
            data += chunk;
        });
        const results = await new Promise((resolve, reject) => {
            this.ctx.req.on('end', () => {
                (0, xml2js_1.parseString)(data, { explicitArray: false }, async (err, json) => {
                    if (err) {
                        return reject('success');
                    }
                    const checkSign = await this.wxPay.signVerify(json.xml);
                    if (checkSign && json.xml.result_code === 'SUCCESS') {
                        // 处理业务逻辑
                        console.log('微信支付成功', json.xml);
                        return resolve(true);
                    }
                    return resolve(false);
                });
            });
        });
        if (results) {
            this.ctx.body =
                '<xml><return_msg>OK</return_msg><return_code>SUCCESS</return_code></xml>';
        }
    }
    /**
     * 支付宝app支付
     * @returns
     */
    async alipay() {
        const orderNum = await this.aliPay.createOrderNum();
        // app支付
        const params = await this.aliPay.getInstance().appPay({
            subject: '测试商品',
            body: '测试商品描述',
            outTradeId: orderNum,
            timeout: '10m',
            amount: '10.00',
            goodsType: '0',
        });
        return this.ok(params);
    }
    /**
     * 支付宝支付回调
     */
    async aliNotify(body) {
        const { trade_status, out_trade_no } = body;
        const check = await this.aliPay.signVerify(body);
        if (check && trade_status === 'TRADE_SUCCESS') {
            // 处理逻辑
            console.log('支付宝支付成功', out_trade_no);
        }
        this.ctx.body = 'success';
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", pay_1.CoolWxPay)
], DemoPayController.prototype, "wxPay", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", pay_1.CoolAliPay)
], DemoPayController.prototype, "aliPay", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], DemoPayController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], DemoPayController.prototype, "app", void 0);
__decorate([
    (0, decorator_1.Post)('/wx'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "wx", null);
__decorate([
    (0, decorator_1.Post)('/wxNotify'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "wxNotify", null);
__decorate([
    (0, decorator_1.Post)('/alipay'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "alipay", null);
__decorate([
    (0, decorator_1.Post)('/aliNotify'),
    __param(0, (0, decorator_1.Body)(decorator_1.ALL)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemoPayController.prototype, "aliNotify", null);
DemoPayController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)()
], DemoPayController);
exports.DemoPayController = DemoPayController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVtby9jb250cm9sbGVyL2FwcC9wYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTRFO0FBQzVFLDRDQUFtRTtBQUNuRSwwQ0FBeUQ7QUFDekQsbUNBQXFDO0FBSXJDOztHQUVHO0FBR0gsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxxQkFBYztJQWVuRDs7T0FFRztJQUVILEtBQUssQ0FBQyxFQUFFO1FBQ04sTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25ELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkQsWUFBWSxFQUFFLFFBQVE7WUFDdEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxTQUFTLEVBQUUsQ0FBQztZQUNaLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLFVBQVUsRUFBRSxTQUFTO1NBQ3RCLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsUUFBUTtRQUNaLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQzlCLElBQUksSUFBSSxLQUFLLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE9BQU8sR0FBRyxNQUFNLElB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