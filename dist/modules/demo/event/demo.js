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
exports.DemoEvent = void 0;
const core_1 = require("@cool-midway/core");
/**
 * 接收事件
 */
let DemoEvent = class DemoEvent {
    /**
     * 根据事件名接收事件
     * @param msg
     * @param a
     */
    async updatdemoeUser(msg, a) {
        console.log('收到消息', msg, a);
    }
};
__decorate([
    (0, core_1.Event)('demo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DemoEvent.prototype, "updatdemoeUser", null);
DemoEvent = __decorate([
    (0, core_1.CoolEvent)()
], DemoEvent);
exports.DemoEvent = DemoEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVtby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RlbW8vZXZlbnQvZGVtby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBcUQ7QUFFckQ7O0dBRUc7QUFFSCxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBQ3BCOzs7O09BSUc7SUFFSCxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0YsQ0FBQTtBQUhDO0lBREMsSUFBQSxZQUFLLEVBQUMsTUFBTSxDQUFDOzs7OytDQUdiO0FBVFUsU0FBUztJQURyQixJQUFBLGdCQUFTLEdBQUU7R0FDQyxTQUFTLENBVXJCO0FBVlksOEJBQVMifQ==