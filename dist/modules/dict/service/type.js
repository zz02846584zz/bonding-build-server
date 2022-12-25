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
exports.DictTypeService = void 0;
const info_1 = require("./../entity/info");
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
/**
 * 描述
 */
let DictTypeService = class DictTypeService extends core_1.BaseService {
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        super.delete(ids);
        await this.dictInfoEntity.delete({
            typeId: (0, typeorm_1.In)(ids),
        });
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(info_1.DictInfoEntity),
    __metadata("design:type", typeorm_1.Repository)
], DictTypeService.prototype, "dictInfoEntity", void 0);
DictTypeService = __decorate([
    (0, decorator_1.Provide)()
], DictTypeService);
exports.DictTypeService = DictTypeService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RpY3Qvc2VydmljZS90eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFrRDtBQUNsRCxtREFBOEM7QUFDOUMsNENBQWdEO0FBQ2hELHVDQUFrRDtBQUNsRCxxQ0FBeUM7QUFFekM7O0dBRUc7QUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLGtCQUFXO0lBSTlDOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztRQUNkLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUMvQixNQUFNLEVBQUUsSUFBQSxZQUFFLEVBQUMsR0FBRyxDQUFDO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBWkM7SUFEQyxJQUFBLHVCQUFpQixFQUFDLHFCQUFjLENBQUM7OEJBQ2xCLG9CQUFVO3VEQUFpQjtBQUZoQyxlQUFlO0lBRDNCLElBQUEsbUJBQU8sR0FBRTtHQUNHLGVBQWUsQ0FjM0I7QUFkWSwwQ0FBZSJ9