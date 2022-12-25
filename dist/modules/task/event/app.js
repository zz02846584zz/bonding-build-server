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
exports.AppEvent = void 0;
const info_1 = require("./../service/info");
const core_1 = require("@cool-midway/core");
const decorator_1 = require("@midwayjs/decorator");
/**
 * 应用事件
 */
let AppEvent = class AppEvent {
    async onServerReady() {
        this.taskInfoService.initTask();
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", info_1.TaskInfoService)
], AppEvent.prototype, "taskInfoService", void 0);
__decorate([
    (0, core_1.Event)('onServerReady'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppEvent.prototype, "onServerReady", null);
AppEvent = __decorate([
    (0, core_1.CoolEvent)()
], AppEvent);
exports.AppEvent = AppEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdGFzay9ldmVudC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsNENBQW9EO0FBQ3BELDRDQUFxRDtBQUNyRCxtREFBNkM7QUFFN0M7O0dBRUc7QUFFSCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBS25CLEtBQUssQ0FBQyxhQUFhO1FBQ2pCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEMsQ0FBQztDQUNGLENBQUE7QUFOQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDUSxzQkFBZTtpREFBQztBQUdqQztJQURDLElBQUEsWUFBSyxFQUFDLGVBQWUsQ0FBQzs7Ozs2Q0FHdEI7QUFQVSxRQUFRO0lBRHBCLElBQUEsZ0JBQVMsR0FBRTtHQUNDLFFBQVEsQ0FRcEI7QUFSWSw0QkFBUSJ9