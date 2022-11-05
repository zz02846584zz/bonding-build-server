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
exports.BaseLogSchedule = void 0;
const decorator_1 = require("@midwayjs/decorator");
const log_1 = require("../service/sys/log");
/**
 * 日志定时任务
 */
let BaseLogSchedule = class BaseLogSchedule {
    // 定时执行的具体任务
    async exec() {
        this.logger.info('清除日志定时任务开始执行');
        const startTime = Date.now();
        await this.baseSysLogService.clear();
        this.logger.info(`清除日志定时任务结束，耗时:${Date.now() - startTime}ms`);
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", log_1.BaseSysLogService)
], BaseLogSchedule.prototype, "baseSysLogService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseLogSchedule.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.TaskLocal)(decorator_1.FORMAT.CRONTAB.EVERY_DAY),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseLogSchedule.prototype, "exec", null);
BaseLogSchedule = __decorate([
    (0, decorator_1.Provide)()
], BaseLogSchedule);
exports.BaseLogSchedule = BaseLogSchedule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9zY2hlZHVsZS9sb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBTTZCO0FBQzdCLDRDQUF1RDtBQUd2RDs7R0FFRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFPMUIsWUFBWTtJQUVaLEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0YsQ0FBQTtBQWJDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNVLHVCQUFpQjswREFBQztBQUdyQztJQURDLElBQUEsa0JBQU0sR0FBRTs7K0NBQ087QUFJaEI7SUFEQyxJQUFBLHFCQUFTLEVBQUMsa0JBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOzs7OzJDQU1uQztBQWRVLGVBQWU7SUFEM0IsSUFBQSxtQkFBTyxHQUFFO0dBQ0csZUFBZSxDQWUzQjtBQWZZLDBDQUFlIn0=