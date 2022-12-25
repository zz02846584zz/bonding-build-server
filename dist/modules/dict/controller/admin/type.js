"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminDictTypeController = void 0;
const type_1 = require("./../../entity/type");
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const type_2 = require("../../service/type");
/**
 * 字典类型
 */
let AdminDictTypeController = class AdminDictTypeController extends core_1.BaseController {
};
AdminDictTypeController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: ['add', 'delete', 'update', 'info', 'list', 'page'],
        entity: type_1.DictTypeEntity,
        service: type_2.DictTypeService,
        listQueryOp: {
            keyWordLikeFields: ['name'],
        },
    })
], AdminDictTypeController);
exports.AdminDictTypeController = AdminDictTypeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RpY3QvY29udHJvbGxlci9hZG1pbi90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDhDQUFxRDtBQUNyRCxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLDZDQUFxRDtBQUVyRDs7R0FFRztBQVVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEscUJBQWM7Q0FBRyxDQUFBO0FBQWpELHVCQUF1QjtJQVRuQyxJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUN4RCxNQUFNLEVBQUUscUJBQWM7UUFDdEIsT0FBTyxFQUFFLHNCQUFlO1FBQ3hCLFdBQVcsRUFBRTtZQUNYLGlCQUFpQixFQUFFLENBQUMsTUFBTSxDQUFDO1NBQzVCO0tBQ0YsQ0FBQztHQUNXLHVCQUF1QixDQUEwQjtBQUFqRCwwREFBdUIifQ==