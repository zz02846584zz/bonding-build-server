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
exports.TaskMiddleware = void 0;
const core_1 = require("@cool-midway/core");
const decorator_1 = require("@midwayjs/decorator");
const task_1 = require("../queue/task");
/**
 * 任务中间件
 */
let TaskMiddleware = class TaskMiddleware {
    resolve() {
        return async (ctx, next) => {
            const urls = ctx.url.split('/');
            if (['add', 'update', 'once', 'stop', 'start'].includes(urls[urls.length - 1])) {
                if (!this.taskInfoQueue.metaQueue) {
                    throw new core_1.CoolCommException('task插件未启用或redis配置错误或redis版本过低(>=6.x)');
                }
            }
            await next();
        };
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", task_1.TaskInfoQueue)
], TaskMiddleware.prototype, "taskInfoQueue", void 0);
TaskMiddleware = __decorate([
    (0, decorator_1.Middleware)()
], TaskMiddleware);
exports.TaskMiddleware = TaskMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3Rhc2svbWlkZGxld2FyZS90YXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDRDQUFzRDtBQUN0RCxtREFBeUQ7QUFHekQsd0NBQThDO0FBRTlDOztHQUVHO0FBRUgsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUd6QixPQUFPO1FBQ0wsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQWtCLEVBQUUsRUFBRTtZQUNoRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQyxJQUNFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQ3RCLEVBQ0Q7Z0JBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO29CQUNqQyxNQUFNLElBQUksd0JBQWlCLENBQ3pCLHNDQUFzQyxDQUN2QyxDQUFDO2lCQUNIO2FBQ0Y7WUFDRCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFsQkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ00sb0JBQWE7cURBQUM7QUFGbEIsY0FBYztJQUQxQixJQUFBLHNCQUFVLEdBQUU7R0FDQSxjQUFjLENBb0IxQjtBQXBCWSx3Q0FBYyJ9