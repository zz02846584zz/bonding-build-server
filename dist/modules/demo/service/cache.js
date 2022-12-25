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
exports.DemoCacheService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 缓存
 */
let DemoCacheService = class DemoCacheService {
    // 数据缓存5秒
    async get() {
        console.log('执行方法');
        return {
            a: 1,
            b: 2,
        };
    }
};
__decorate([
    (0, core_1.CoolCache)(5),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoCacheService.prototype, "get", null);
DemoCacheService = __decorate([
    (0, decorator_1.Provide)()
], DemoCacheService);
exports.DemoCacheService = DemoCacheService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kZW1vL3NlcnZpY2UvY2FjaGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDRDQUE4QztBQUU5Qzs7R0FFRztBQUVILElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQzNCLFNBQVM7SUFFVCxLQUFLLENBQUMsR0FBRztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsT0FBTztZQUNMLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFQQztJQURDLElBQUEsZ0JBQVMsRUFBQyxDQUFDLENBQUM7Ozs7MkNBT1o7QUFUVSxnQkFBZ0I7SUFENUIsSUFBQSxtQkFBTyxHQUFFO0dBQ0csZ0JBQWdCLENBVTVCO0FBVlksNENBQWdCIn0=