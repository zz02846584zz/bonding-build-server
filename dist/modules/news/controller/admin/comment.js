"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsCommentAdminController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const comment_1 = require("../../entity/comment");
const comment_2 = require("../../service/admin/comment");
/**
 * 描述
 */
let NewsCommentAdminController = class NewsCommentAdminController extends core_1.BaseController {
};
NewsCommentAdminController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: comment_1.NewsArticleCommentEntity,
        service: comment_2.NewsCommentAdminService,
    })
], NewsCommentAdminController);
exports.NewsCommentAdminController = NewsCommentAdminController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmV3cy9jb250cm9sbGVyL2FkbWluL2NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbURBQThDO0FBQzlDLDRDQUFtRTtBQUNuRSxrREFBZ0U7QUFDaEUseURBQXNFO0FBRXRFOztHQUVHO0FBT0gsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMkIsU0FBUSxxQkFBYztDQUFHLENBQUE7QUFBcEQsMEJBQTBCO0lBTnRDLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsRUFBQztRQUNkLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3hELE1BQU0sRUFBRSxrQ0FBd0I7UUFDaEMsT0FBTyxFQUFFLGlDQUF1QjtLQUNqQyxDQUFDO0dBQ1csMEJBQTBCLENBQTBCO0FBQXBELGdFQUEwQiJ9