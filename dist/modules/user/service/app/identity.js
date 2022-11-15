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
const identity_1 = require("../../entity/identity");
const _ = require("lodash");
const user_1 = require("../../../base/entity/sys/user");
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
    async identifyVerify(params) {
        const { idCard, positive, negative } = params;
        if (_.isEmpty(idCard) || _.isEmpty(positive) || _.isEmpty(negative))
            throw new core_1.CoolCommException('請輸入完整參數');
        const idCardExist = await this.userIdentityEntity.findOne({ idCard });
        if (!_.isEmpty(idCardExist))
            throw new core_1.CoolCommException('該身份證已被使用，請聯絡管理員');
        const userId = this.ctx.user.userId;
        const identifyExist = await this.userIdentityEntity.findOne({ userId });
        if (!_.isEmpty(identifyExist)) {
            await this.userIdentityEntity.save({
                id: identifyExist.id,
                userId,
                idCard,
                positive,
                negative,
                createBy: userId,
                updateBy: userId,
            });
        }
        else {
            await this.userIdentityEntity.save({
                userId,
                idCard,
                positive,
                negative,
                createBy: userId,
                updateBy: userId,
            });
        }
        await this.baseSysUserEntity.save({
            id: userId,
            idCard,
            identifyVerify: user_1.IdentifyVerify.PENDING,
        });
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(identity_1.UserIdentityEntity),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3VzZXIvc2VydmljZS9hcHAvaWRlbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFtRTtBQUNuRSx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLG9EQUEyRDtBQUUzRCw0QkFBNEI7QUFDNUIsd0RBR3VDO0FBQ3ZDOztHQUVHO0FBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxrQkFBVztJQVVsRDs7T0FFRztJQUNILEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBc0I7UUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztnQkFDakMsTUFBTTtnQkFDTixHQUFHLEtBQUs7Z0JBQ1IsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFFBQVEsRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDWixHQUFHLEtBQUs7Z0JBQ1IsUUFBUSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU07UUFDaEMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxDQUFDO1FBQzlDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQ2pFLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6QyxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUN6QixNQUFNLElBQUksd0JBQWlCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVqRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEMsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM3QixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLEVBQUUsRUFBRSxhQUFhLENBQUMsRUFBRTtnQkFDcEIsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsUUFBUSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQztnQkFDakMsTUFBTTtnQkFDTixNQUFNO2dCQUNOLFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsUUFBUSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7WUFDaEMsRUFBRSxFQUFFLE1BQU07WUFDVixNQUFNO1lBQ04sY0FBYyxFQUFFLHFCQUFjLENBQUMsT0FBTztTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQXRFQztJQURDLElBQUEsdUJBQWlCLEVBQUMsNkJBQWtCLENBQUM7OEJBQ2xCLG9CQUFVOytEQUFxQjtBQUduRDtJQURDLElBQUEsdUJBQWlCLEVBQUMsd0JBQWlCLENBQUM7OEJBQ2xCLG9CQUFVOzhEQUFvQjtBQUdqRDtJQURDLElBQUEsa0JBQU0sR0FBRTs7Z0RBQ0w7QUFSTyxtQkFBbUI7SUFEL0IsSUFBQSxtQkFBTyxHQUFFO0dBQ0csbUJBQW1CLENBd0UvQjtBQXhFWSxrREFBbUIifQ==