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
exports.DemoQueueController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const comm_1 = require("../../queue/comm");
const getter_1 = require("../../queue/getter");
/**
 * 队列
 */
let DemoQueueController = class DemoQueueController extends core_1.BaseController {
    /**
     * 发送数据到队列
     */
    async queue() {
        this.demoCommQueue.add({ a: 2 });
        return this.ok();
    }
    async addGetter() {
        await this.demoGetterQueue.add({ a: new Date() });
        return this.ok();
    }
    /**
     * 获得队列中的数据，只有当队列类型为getter时有效
     */
    async getter() {
        var _a, _b;
        const job = await this.demoGetterQueue.getters.getJobs(['wait'], 0, 0, true);
        // 获得完将数据从队列移除
        await ((_a = job[0]) === null || _a === void 0 ? void 0 : _a.remove());
        return this.ok((_b = job[0]) === null || _b === void 0 ? void 0 : _b.data);
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", comm_1.DemoCommQueue)
], DemoQueueController.prototype, "demoCommQueue", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", getter_1.DemoGetterQueue)
], DemoQueueController.prototype, "demoGetterQueue", void 0);
__decorate([
    (0, decorator_1.Post)('/add', { summary: '发送队列数据' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoQueueController.prototype, "queue", null);
__decorate([
    (0, decorator_1.Post)('/addGetter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoQueueController.prototype, "addGetter", null);
__decorate([
    (0, decorator_1.Get)('/getter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoQueueController.prototype, "getter", null);
DemoQueueController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)()
], DemoQueueController);
exports.DemoQueueController = DemoQueueController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kZW1vL2NvbnRyb2xsZXIvYXBwL3F1ZXVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFpRTtBQUNqRSw0Q0FBbUU7QUFDbkUsMkNBQWlEO0FBQ2pELCtDQUFxRDtBQUVyRDs7R0FFRztBQUdILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEscUJBQWM7SUFTckQ7O09BRUc7SUFFSCxLQUFLLENBQUMsS0FBSztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUdELEtBQUssQ0FBQyxTQUFTO1FBQ2IsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTs7UUFDVixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDcEQsQ0FBQyxNQUFNLENBQUMsRUFDUixDQUFDLEVBQ0QsQ0FBQyxFQUNELElBQUksQ0FDTCxDQUFDO1FBQ0YsY0FBYztRQUNkLE1BQU0sQ0FBQSxNQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsMENBQUUsTUFBTSxFQUFFLENBQUEsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBQSxHQUFHLENBQUMsQ0FBQyxDQUFDLDBDQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFBO0FBcENDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNNLG9CQUFhOzBEQUFDO0FBSTdCO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNRLHdCQUFlOzREQUFDO0FBTWpDO0lBREMsSUFBQSxnQkFBSSxFQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzs7OztnREFJbkM7QUFHRDtJQURDLElBQUEsZ0JBQUksRUFBQyxZQUFZLENBQUM7Ozs7b0RBSWxCO0FBTUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxTQUFTLENBQUM7Ozs7aURBV2Q7QUF0Q1UsbUJBQW1CO0lBRi9CLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsR0FBRTtHQUNKLG1CQUFtQixDQXVDL0I7QUF2Q1ksa0RBQW1CIn0=