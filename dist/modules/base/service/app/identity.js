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
exports.UserIdentityService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const _ = require("lodash");
const user_1 = require("../../../base/entity/sys/user");
const user_identity_1 = require("../../entity/sys/user_identity");
/**
 * 描述
 */
let UserIdentityService = class UserIdentityService extends core_1.BaseService {
    /**
     * 描述
     */
    async identityCert(param) {
        const userId = this.ctx.user.userId;
        const exist = await this.userIdentityEntity.findOne({ userId });
        if (_.isEmpty(exist)) {
            await this.userIdentityEntity.save({
                userId,
                ...param,
                createBy: userId,
                updateBy: userId,
            });
        }
        else {
            await this.userIdentityEntity.save({
                id: exist.id,
                ...param,
                updateBy: userId,
            });
        }
    }
    /**
     * 身份驗證
     */
    async identityVerify(params) {
        const { idCard, positiveId, negativeId } = params;
        if (_.isEmpty(idCard) || !positiveId || !negativeId)
            throw new core_1.CoolCommException('請輸入完整參數');
        const idCardExist = await this.baseSysUserEntity.findOne({
            idCard,
            identityStatus: 23,
        });
        if (!_.isEmpty(idCardExist))
            throw new core_1.CoolCommException('該身份證已被使用，請聯絡管理員');
        const userId = this.ctx.user.userId;
        const identityExist = await this.userIdentityEntity.findOne({ userId });
        if (!_.isEmpty(identityExist)) {
            await this.userIdentityEntity.save({
                id: identityExist.id,
                userId,
                idCard,
                positiveId,
                negativeId,
                createBy: userId,
                updateBy: userId,
            });
        }
        else {
            await this.userIdentityEntity.save({
                userId,
                idCard,
                positiveId,
                negativeId,
                createBy: userId,
                updateBy: userId,
            });
        }
        await this.baseSysUserEntity.save({
            id: userId,
            idCard,
            identityStatus: 21,
        });
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(user_identity_1.BaseUserIdentityEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserIdentityService.prototype, "userIdentityEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], UserIdentityService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], UserIdentityService.prototype, "ctx", void 0);
UserIdentityService = __decorate([
    (0, decorator_1.Provide)()
], UserIdentityService);
exports.UserIdentityService = UserIdentityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL3NlcnZpY2UvYXBwL2lkZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyw0QkFBNEI7QUFDNUIsd0RBQWtFO0FBQ2xFLGtFQUF3RTtBQUN4RTs7R0FFRztBQUVILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsa0JBQVc7SUFVbEQ7O09BRUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUs7UUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztnQkFDakMsTUFBTTtnQkFDTixHQUFHLEtBQUs7Z0JBQ1IsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFFBQVEsRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDWixHQUFHLEtBQUs7Z0JBQ1IsUUFBUSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU07UUFDaEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQ2xELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLFVBQVU7WUFDakQsTUFBTSxJQUFJLHdCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUN2RCxNQUFNO1lBQ04sY0FBYyxFQUFFLEVBQUU7U0FDbkIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQ3pCLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWpELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztnQkFDakMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxFQUFFO2dCQUNwQixNQUFNO2dCQUNOLE1BQU07Z0JBQ04sVUFBVTtnQkFDVixVQUFVO2dCQUNWLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixRQUFRLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxNQUFNO2dCQUNOLE1BQU07Z0JBQ04sVUFBVTtnQkFDVixVQUFVO2dCQUNWLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixRQUFRLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUM7U0FDSjtRQUNELE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUNoQyxFQUFFLEVBQUUsTUFBTTtZQUNWLE1BQU07WUFDTixjQUFjLEVBQUUsRUFBRTtTQUNuQixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQXpFQztJQURDLElBQUEsdUJBQWlCLEVBQUMsc0NBQXNCLENBQUM7OEJBQ3RCLG9CQUFVOytEQUF5QjtBQUd2RDtJQURDLElBQUEsdUJBQWlCLEVBQUMsd0JBQWlCLENBQUM7OEJBQ2xCLG9CQUFVOzhEQUFvQjtBQUdqRDtJQURDLElBQUEsa0JBQU0sR0FBRTs7Z0RBQ0w7QUFSTyxtQkFBbUI7SUFEL0IsSUFBQSxtQkFBTyxHQUFFO0dBQ0csbUJBQW1CLENBMkUvQjtBQTNFWSxrREFBbUIifQ==