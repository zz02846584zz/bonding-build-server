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
exports.BaseSysParamService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const param_1 = require("../../entity/sys/param");
const cache_1 = require("@midwayjs/cache");
/**
 * 参数配置
 */
let BaseSysParamService = class BaseSysParamService extends core_1.BaseService {
    /**
     * 根据key获得对应的参数
     * @param key
     */
    async dataByKey(key) {
        let result = await this.cacheManager.get(`param:${key}`);
        if (!result) {
            result = await this.baseSysParamEntity.findOne({ keyName: key });
        }
        if (result) {
            if (typeof result == 'string') {
                result = JSON.parse(result);
            }
            if (result.dataType !== 0) {
                return JSON.parse(result.data);
            }
            else {
                return result.data;
            }
        }
        return;
    }
    /**
     * 根据key获得对应的网页数据
     * @param key
     */
    async htmlByKey(key) {
        let html = '<html><body>@content</body></html>';
        let result = await this.cacheManager.get(`param:${key}`);
        if (result) {
            result = JSON.parse(result);
            html = html.replace('@content', result.data);
        }
        else {
            html = html.replace('@content', 'key notfound');
        }
        return html;
    }
    /**
     * 重新初始化缓存
     */
    async modifyAfter() {
        const params = await this.baseSysParamEntity.find();
        for (const param of params) {
            await this.cacheManager.set(`param:${param.keyName}`, JSON.stringify(param));
        }
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(param_1.BaseSysParamEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysParamService.prototype, "baseSysParamEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cache_1.CacheManager)
], BaseSysParamService.prototype, "cacheManager", void 0);
BaseSysParamService = __decorate([
    (0, decorator_1.Provide)()
], BaseSysParamService);
exports.BaseSysParamService = BaseSysParamService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL3BhcmFtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBNEQ7QUFDNUQsMkNBQStDO0FBRS9DOztHQUVHO0FBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxrQkFBVztJQU9sRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUc7UUFDakIsSUFBSSxNQUFNLEdBQVEsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLEVBQUU7Z0JBQzdCLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDTCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDcEI7U0FDRjtRQUNELE9BQU87SUFDVCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHO1FBQ2pCLElBQUksSUFBSSxHQUFHLG9DQUFvQyxDQUFDO1FBQ2hELElBQUksTUFBTSxHQUFRLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzlELElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0wsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsV0FBVztRQUNmLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3BELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ3pCLFNBQVMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUN0QixDQUFDO1NBQ0g7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQXZEQztJQURDLElBQUEsdUJBQWlCLEVBQUMsMEJBQWtCLENBQUM7OEJBQ2xCLG9CQUFVOytEQUFxQjtBQUduRDtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDSyxvQkFBWTt5REFBQztBQUxoQixtQkFBbUI7SUFEL0IsSUFBQSxtQkFBTyxHQUFFO0dBQ0csbUJBQW1CLENBeUQvQjtBQXpEWSxrREFBbUIifQ==