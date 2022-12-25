"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAwardTipsController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const tips_1 = require("../../entity/tips");
const tips_user_1 = require("../../entity/tips_user");
const tips_category_1 = require("../../entity/tips_category");
const tips_collection_1 = require("../../entity/tips_collection");
const category_1 = require("../../../industry/entity/category");
const tips_2 = require("../../service/admin/tips");
/**
 * 描述
 */
let AdminAwardTipsController = class AdminAwardTipsController extends core_1.BaseController {
};
AdminAwardTipsController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: tips_1.AwardTipsEntity,
        service: tips_2.AdminAwardTipsService,
        pageQueryOp: {
            keyWordLikeFields: ['title'],
            fieldEq: ['status'],
            select: [
                'a.*',
                'count(b.id) as receives',
                'count(c.id) as collections',
                'GROUP_CONCAT(DISTINCT e.name) as categories',
            ],
            join: [
                {
                    entity: tips_user_1.AwardTipsUserEntity,
                    alias: 'b',
                    condition: 'a.id = b.tipId',
                    type: 'leftJoin',
                },
                {
                    entity: tips_collection_1.AwardTipsCollectionEntity,
                    alias: 'c',
                    condition: 'a.id = c.tipId',
                    type: 'leftJoin',
                },
                {
                    entity: tips_category_1.AwardTipsCategoryEntity,
                    alias: 'd',
                    condition: 'a.id = d.tipId',
                    type: 'leftJoin',
                },
                {
                    entity: category_1.IndustryCategoryEntity,
                    alias: 'e',
                    condition: 'd.categoryId = e.id',
                    type: 'leftJoin',
                },
            ],
            extend: async (find) => {
                find.groupBy('a.id');
            },
        },
    })
], AdminAwardTipsController);
exports.AdminAwardTipsController = AdminAwardTipsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlwcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2F3YXJkL2NvbnRyb2xsZXIvYWRtaW4vdGlwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLDRDQUFvRDtBQUNwRCxzREFBNkQ7QUFFN0QsOERBQXFFO0FBQ3JFLGtFQUF5RTtBQUN6RSxnRUFBMkU7QUFDM0UsbURBQWlFO0FBRWpFOztHQUVHO0FBOENILElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEscUJBQWM7Q0FBSSxDQUFBO0FBQW5ELHdCQUF3QjtJQTdDcEMsSUFBQSxtQkFBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLHNCQUFlO1FBQ3ZCLE9BQU8sRUFBRSw0QkFBcUI7UUFDOUIsV0FBVyxFQUFFO1lBQ1gsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDNUIsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ25CLE1BQU0sRUFBRTtnQkFDTixLQUFLO2dCQUNMLHlCQUF5QjtnQkFDekIsNEJBQTRCO2dCQUM1Qiw2Q0FBNkM7YUFDOUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0o7b0JBQ0UsTUFBTSxFQUFFLCtCQUFtQjtvQkFDM0IsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsU0FBUyxFQUFFLGdCQUFnQjtvQkFDM0IsSUFBSSxFQUFFLFVBQVU7aUJBQ2pCO2dCQUNEO29CQUNFLE1BQU0sRUFBRSwyQ0FBeUI7b0JBQ2pDLEtBQUssRUFBRSxHQUFHO29CQUNWLFNBQVMsRUFBRSxnQkFBZ0I7b0JBQzNCLElBQUksRUFBRSxVQUFVO2lCQUNqQjtnQkFDRDtvQkFDRSxNQUFNLEVBQUUsdUNBQXVCO29CQUMvQixLQUFLLEVBQUUsR0FBRztvQkFDVixTQUFTLEVBQUUsZ0JBQWdCO29CQUMzQixJQUFJLEVBQUUsVUFBVTtpQkFDakI7Z0JBQ0Q7b0JBQ0UsTUFBTSxFQUFFLGlDQUFzQjtvQkFDOUIsS0FBSyxFQUFFLEdBQUc7b0JBQ1YsU0FBUyxFQUFFLHFCQUFxQjtvQkFDaEMsSUFBSSxFQUFFLFVBQVU7aUJBQ2pCO2FBQ0Y7WUFDRCxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQXlDLEVBQUUsRUFBRTtnQkFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QixDQUFDO1NBQ0Y7S0FDRixDQUFDO0dBQ1csd0JBQXdCLENBQTJCO0FBQW5ELDREQUF3QiJ9