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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy91c2VyL3NlcnZpY2UvYXBwL2lkZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxvREFBMkQ7QUFFM0QsNEJBQTRCO0FBQzVCLHdEQUd1QztBQUN2Qzs7R0FFRztBQUVILElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEsa0JBQVc7SUFVbEQ7O09BRUc7SUFDSCxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQXNCO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLE1BQU07Z0JBQ04sR0FBRyxLQUFLO2dCQUNSLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixRQUFRLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ1osR0FBRyxLQUFLO2dCQUNSLFFBQVEsRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNO1FBQ2hDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUM5QyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNqRSxNQUFNLElBQUksd0JBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDekIsTUFBTSxJQUFJLHdCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFakQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEVBQUU7Z0JBQ3BCLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixRQUFRO2dCQUNSLFFBQVE7Z0JBQ1IsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFFBQVEsRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixRQUFRO2dCQUNSLFFBQVE7Z0JBQ1IsUUFBUSxFQUFFLE1BQU07Z0JBQ2hCLFFBQVEsRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztTQUNKO1FBQ0QsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO1lBQ2hDLEVBQUUsRUFBRSxNQUFNO1lBQ1YsTUFBTTtZQUNOLGNBQWMsRUFBRSxxQkFBYyxDQUFDLE9BQU87U0FDdkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUF0RUM7SUFEQyxJQUFBLHVCQUFpQixFQUFDLDZCQUFrQixDQUFDOzhCQUNsQixvQkFBVTsrREFBcUI7QUFHbkQ7SUFEQyxJQUFBLHVCQUFpQixFQUFDLHdCQUFpQixDQUFDOzhCQUNsQixvQkFBVTs4REFBb0I7QUFHakQ7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O2dEQUNMO0FBUk8sbUJBQW1CO0lBRC9CLElBQUEsbUJBQU8sR0FBRTtHQUNHLG1CQUFtQixDQXdFL0I7QUF4RVksa0RBQW1CIn0=