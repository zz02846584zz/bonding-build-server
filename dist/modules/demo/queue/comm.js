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
exports.DemoCommQueue = void 0;
const task_1 = require("@cool-midway/task");
const decorator_1 = require("@midwayjs/decorator");
/**
 * 普通队列
 */
let DemoCommQueue = class DemoCommQueue extends task_1.BaseCoolQueue {
    async data(job, done) {
        // 这边可以执行定时任务具体的业务或队列的业务
        console.log('数据', job.data);
        // 抛出错误 可以让队列重试，默认重试5次
        //throw new Error('错误');
        done();
    }
};
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], DemoCommQueue.prototype, "app", void 0);
DemoCommQueue = __decorate([
    (0, task_1.CoolQueue)()
], DemoCommQueue);
exports.DemoCommQueue = DemoCommQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RlbW8vcXVldWUvY29tbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBNkQ7QUFFN0QsbURBQTBDO0FBRTFDOztHQUVHO0FBRUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLG9CQUFhO0lBSTlDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBUSxFQUFFLElBQVM7UUFDNUIsd0JBQXdCO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixzQkFBc0I7UUFDdEIsd0JBQXdCO1FBQ3hCLElBQUksRUFBRSxDQUFDO0lBQ1QsQ0FBQztDQUNGLENBQUE7QUFUQztJQURDLElBQUEsZUFBRyxHQUFFOzswQ0FDa0I7QUFGYixhQUFhO0lBRHpCLElBQUEsZ0JBQVMsR0FBRTtHQUNDLGFBQWEsQ0FXekI7QUFYWSxzQ0FBYSJ9