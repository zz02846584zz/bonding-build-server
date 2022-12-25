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
exports.DemoRpcService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const goods_1 = require("../entity/goods");
const rpc_1 = require("@cool-midway/rpc");
let DemoRpcService = class DemoRpcService extends rpc_1.BaseRpcService {
    /**
     * 分布式事务
     * @param params 方法参数
     * @param rpcTransactionId 无需调用者传参， 本次事务的ID，ID会自动注入无需调用者传参
     * @param queryRunner 无需调用者传参，操作数据库，需要用queryRunner操作数据库，才能统一提交或回滚事务
     */
    // 注解启用分布式事务，参数可以指定事务类型
    async transaction(params, rpcTransactionId, queryRunner) {
        console.log('获得的参数', params);
        const data = {
            title: '商品标题',
            pic: 'https://xxx',
            price: 99.0,
            type: 1,
        };
        await queryRunner.manager.save(goods_1.DemoGoodsEntity, data);
        // 将事务id传给调用的远程服务方法
        await this.rpc.call('goods', 'demoGoodsService', 'transaction', {
            rpcTransactionId,
        });
    }
    async info(params) {
        return params;
    }
    async getUser() {
        return {
            uid: '123',
            username: 'mockedName',
            phone: '12345678901',
            email: 'xxx.xxx@xxx.com',
        };
    }
};
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], DemoRpcService.prototype, "app", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", rpc_1.CoolRpc)
], DemoRpcService.prototype, "rpc", void 0);
__decorate([
    (0, rpc_1.CoolRpcTransaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DemoRpcService.prototype, "transaction", null);
DemoRpcService = __decorate([
    (0, decorator_1.Provide)(),
    (0, rpc_1.CoolRpcService)({
        entity: goods_1.DemoGoodsEntity,
        method: ['info', 'add', 'page'],
    })
], DemoRpcService);
exports.DemoRpcService = DemoRpcService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBjLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVtby9zZXJ2aWNlL3JwYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBMkQ7QUFDM0QsMkNBQWtEO0FBRWxELDBDQUswQjtBQVExQixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFlLFNBQVEsb0JBQWM7SUFPaEQ7Ozs7O09BS0c7SUFDSCx1QkFBdUI7SUFFdkIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsZ0JBQWlCLEVBQUUsV0FBeUI7UUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0IsTUFBTSxJQUFJLEdBQUc7WUFDWCxLQUFLLEVBQUUsTUFBTTtZQUNiLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLEtBQUssRUFBRSxJQUFJO1lBQ1gsSUFBSSxFQUFFLENBQUM7U0FDUixDQUFDO1FBQ0YsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXRELG1CQUFtQjtRQUNuQixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUU7WUFDOUQsZ0JBQWdCO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU07UUFDZixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QsS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPO1lBQ0wsR0FBRyxFQUFFLEtBQUs7WUFDVixRQUFRLEVBQUUsWUFBWTtZQUN0QixLQUFLLEVBQUUsYUFBYTtZQUNwQixLQUFLLEVBQUUsaUJBQWlCO1NBQ3pCLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQXhDQztJQURDLElBQUEsZUFBRyxHQUFFOzsyQ0FDa0I7QUFHeEI7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ0osYUFBTzsyQ0FBQztBQVViO0lBREMsSUFBQSx3QkFBa0IsR0FBRTs7OztpREFlcEI7QUE3QlUsY0FBYztJQUwxQixJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLG9CQUFjLEVBQUM7UUFDZCxNQUFNLEVBQUUsdUJBQWU7UUFDdkIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7S0FDaEMsQ0FBQztHQUNXLGNBQWMsQ0EwQzFCO0FBMUNZLHdDQUFjIn0=