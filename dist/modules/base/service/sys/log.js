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
exports.BaseSysLogService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const _ = require("lodash");
const log_1 = require("../../entity/sys/log");
const moment = require("moment");
const utils_1 = require("../../../../comm/utils");
const conf_1 = require("./conf");
/**
 * 描述
 */
let BaseSysLogService = class BaseSysLogService extends core_1.BaseService {
    /**
     * 记录
     * @param url URL地址
     * @param params 参数
     * @param userId 用户ID
     */
    async record(context, url, params, userId) {
        const ip = await this.utils.getReqIP(context);
        const sysLog = new log_1.BaseSysLogEntity();
        sysLog.userId = userId;
        sysLog.ip = typeof ip === 'string' ? ip : ip.join(',');
        const ipAddrArr = [];
        for (const e of sysLog.ip.split(','))
            ipAddrArr.push(await this.utils.getIpAddr(context, e));
        sysLog.ipAddr = ipAddrArr.join(',');
        if (sysLog.ipAddr == '本机地址') {
            sysLog.ipAddr = '本機地址';
        }
        sysLog.action = url;
        if (!_.isEmpty(params)) {
            sysLog.params = JSON.stringify(params);
        }
        await this.baseSysLogEntity.insert(sysLog);
    }
    /**
     * 日志
     * @param isAll 是否清除全部
     */
    async clear(isAll) {
        if (isAll) {
            await this.baseSysLogEntity.clear();
            return;
        }
        const keepDay = await this.baseSysConfService.getValue('logKeep');
        if (keepDay) {
            const beforeDate = `${moment()
                .add(-keepDay, 'days')
                .format('YYYY-MM-DD')} 00:00:00`;
            await this.baseSysLogEntity
                .createQueryBuilder()
                .delete()
                .where('createTime < :createTime', { createTime: beforeDate })
                .execute();
        }
        else {
            await this.baseSysLogEntity.clear();
        }
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysLogService.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], BaseSysLogService.prototype, "utils", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(log_1.BaseSysLogEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysLogService.prototype, "baseSysLogEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", conf_1.BaseSysConfService)
], BaseSysLogService.prototype, "baseSysConfService", void 0);
BaseSysLogService = __decorate([
    (0, decorator_1.Provide)()
], BaseSysLogService);
exports.BaseSysLogService = BaseSysLogService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvcHJvamVjdC9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL2xvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQWdEO0FBQ2hELHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsNEJBQTRCO0FBQzVCLDhDQUF3RDtBQUN4RCxpQ0FBaUM7QUFDakMsa0RBQStDO0FBQy9DLGlDQUE0QztBQUc1Qzs7R0FFRztBQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsa0JBQVc7SUFhaEQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQWdCLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNO1FBQ2hELE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxzQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkQsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEtBQUssTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ2xDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN4QjtRQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QztRQUNELE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFNO1FBQ2hCLElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEMsT0FBTztTQUNSO1FBQ0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksT0FBTyxFQUFFO1lBQ1gsTUFBTSxVQUFVLEdBQUcsR0FBRyxNQUFNLEVBQUU7aUJBQzNCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7aUJBQ3JCLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDO1lBQ25DLE1BQU0sSUFBSSxDQUFDLGdCQUFnQjtpQkFDeEIsa0JBQWtCLEVBQUU7aUJBQ3BCLE1BQU0sRUFBRTtpQkFDUixLQUFLLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUM7aUJBQzdELE9BQU8sRUFBRSxDQUFDO1NBQ2Q7YUFBTTtZQUNMLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUEzREM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OzhDQUNMO0FBR0o7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ0YsYUFBSztnREFBQztBQUdiO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxzQkFBZ0IsQ0FBQzs4QkFDbEIsb0JBQVU7MkRBQW1CO0FBRy9DO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNXLHlCQUFrQjs2REFBQztBQVg1QixpQkFBaUI7SUFEN0IsSUFBQSxtQkFBTyxHQUFFO0dBQ0csaUJBQWlCLENBNkQ3QjtBQTdEWSw4Q0FBaUIifQ==