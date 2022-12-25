"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminIndustryCategoryController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const category_1 = require("../../entity/category");
const articleCategory_1 = require("../../../news/entity/articleCategory");
const tips_category_1 = require("../../../award/entity/tips_category");
const category_2 = require("../../service/admin/category");
/**
 * 描述
 */
let AdminIndustryCategoryController = class AdminIndustryCategoryController extends core_1.BaseController {
};
AdminIndustryCategoryController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: category_1.IndustryCategoryEntity,
        service: category_2.AdminIndustryCategoryService,
        pageQueryOp: {
            select: ['a.*', 'count(b.id) as tipCount', 'count(c.id) as articleCount'],
            keyWordLikeFields: ['name', 'slug'],
            join: [
                {
                    entity: tips_category_1.AwardTipsCategoryEntity,
                    alias: 'b',
                    condition: 'a.id = b.categoryId',
                    type: 'leftJoin',
                },
                {
                    entity: articleCategory_1.NewsArticleCategoryEntity,
                    alias: 'c',
                    condition: 'a.id = c.categoryId',
                    type: 'leftJoin',
                },
            ],
            extend: async (find) => {
                find.groupBy('a.id');
            },
        },
    })
], AdminIndustryCategoryController);
exports.AdminIndustryCategoryController = AdminIndustryCategoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9pbmR1c3RyeS9jb250cm9sbGVyL2FkbWluL2NhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBbUU7QUFDbkUsb0RBQStEO0FBRS9ELDBFQUFpRjtBQUNqRix1RUFBOEU7QUFDOUUsMkRBQTRFO0FBRTVFOztHQUVHO0FBNEJILElBQWEsK0JBQStCLEdBQTVDLE1BQWEsK0JBQWdDLFNBQVEscUJBQWM7Q0FBSSxDQUFBO0FBQTFELCtCQUErQjtJQTNCM0MsSUFBQSxtQkFBTyxHQUFFO0lBQ1QsSUFBQSxxQkFBYyxFQUFDO1FBQ2QsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDeEQsTUFBTSxFQUFFLGlDQUFzQjtRQUM5QixPQUFPLEVBQUUsdUNBQTRCO1FBQ3JDLFdBQVcsRUFBRTtZQUNYLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSx5QkFBeUIsRUFBRSw2QkFBNkIsQ0FBQztZQUN6RSxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDbkMsSUFBSSxFQUFFO2dCQUNKO29CQUNFLE1BQU0sRUFBRSx1Q0FBdUI7b0JBQy9CLEtBQUssRUFBRSxHQUFHO29CQUNWLFNBQVMsRUFBRSxxQkFBcUI7b0JBQ2hDLElBQUksRUFBRSxVQUFVO2lCQUNqQjtnQkFDRDtvQkFDRSxNQUFNLEVBQUUsMkNBQXlCO29CQUNqQyxLQUFLLEVBQUUsR0FBRztvQkFDVixTQUFTLEVBQUUscUJBQXFCO29CQUNoQyxJQUFJLEVBQUUsVUFBVTtpQkFDakI7YUFDRjtZQUNELE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBZ0QsRUFBRSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7U0FDRjtLQUNGLENBQUM7R0FDVywrQkFBK0IsQ0FBMkI7QUFBMUQsMEVBQStCIn0=