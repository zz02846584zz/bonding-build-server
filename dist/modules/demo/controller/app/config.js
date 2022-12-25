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
exports.DemoConfigController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 配置
 */
let DemoConfigController = class DemoConfigController extends core_1.BaseController {
    async get() {
        return this.ok(this.demoConfig);
    }
};
__decorate([
    (0, decorator_1.Config)('module.demo'),
    __metadata("design:type", Object)
], DemoConfigController.prototype, "demoConfig", void 0);
__decorate([
    (0, decorator_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoConfigController.prototype, "get", null);
DemoConfigController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)()
], DemoConfigController);
exports.DemoConfigController = DemoConfigController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVtby9jb250cm9sbGVyL2FwcC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJEO0FBQzNELDRDQUFtRTtBQUVuRTs7R0FFRztBQUdILElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEscUJBQWM7SUFNdEQsS0FBSyxDQUFDLEdBQUc7UUFDUCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFBO0FBTkM7SUFEQyxJQUFBLGtCQUFNLEVBQUMsYUFBYSxDQUFDOzt3REFDWDtBQUdYO0lBREMsSUFBQSxlQUFHLEVBQUMsTUFBTSxDQUFDOzs7OytDQUdYO0FBUlUsb0JBQW9CO0lBRmhDLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsR0FBRTtHQUNKLG9CQUFvQixDQVNoQztBQVRZLG9EQUFvQiJ9