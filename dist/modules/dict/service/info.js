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
exports.DictInfoService = void 0;
const type_1 = require("./../entity/type");
const info_1 = require("./../entity/info");
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const _ = require("lodash");
/**
 * 字典信息
 */
let DictInfoService = class DictInfoService extends core_1.BaseService {
    /**
     * 獲得字典數據
     * @param types
     */
    async data(types) {
        const result = {};
        const find = await this.dictTypeEntity.createQueryBuilder();
        if (!_.isEmpty(types)) {
            find.where('`key` in(:key)', { key: types });
        }
        const typeData = await find.getMany();
        if (_.isEmpty(typeData)) {
            return {};
        }
        const data = await this.dictInfoEntity
            .createQueryBuilder('a')
            .select(['a.id', 'a.name', 'a.typeId', 'a.parentId', 'a.type'])
            .where('typeId in(:typeIds)', {
            typeIds: typeData.map(e => {
                return e.id;
            }),
        })
            .orderBy('orderNum', 'ASC')
            .addOrderBy('a.createTime', 'ASC')
            .getMany();
        for (const item of typeData) {
            result[item.key] = _.filter(data, { typeId: item.id });
        }
        return result;
    }
    /**
     * 獲得字典值
     * @param infoId
     * @returns
     */
    async value(infoId) {
        const info = await this.dictInfoEntity.findOne({ id: infoId });
        return info === null || info === void 0 ? void 0 : info.name;
    }
    /**
     * 獲得字典值
     * @param infoId
     * @returns
     */
    async values(infoIds) {
        const infos = await this.dictInfoEntity.find({ id: (0, typeorm_1.In)(infoIds) });
        return infos.map(e => {
            return e.name;
        });
    }
    /**
     * 修改之後
     * @param data
     * @param type
     */
    async modifyAfter(data, type) {
        if (type === 'delete') {
            for (const id of data) {
                await this.delChildDict(id);
            }
        }
    }
    /**
     * 刪除子字典
     * @param id
     */
    async delChildDict(id) {
        const delDict = await this.dictInfoEntity.find({ parentId: id });
        if (_.isEmpty(delDict)) {
            return;
        }
        const delDictIds = delDict.map(e => {
            return e.id;
        });
        await this.dictInfoEntity.delete(delDictIds);
        for (const dictId of delDictIds) {
            await this.delChildDict(dictId);
        }
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(info_1.DictInfoEntity),
    __metadata("design:type", typeorm_1.Repository)
], DictInfoService.prototype, "dictInfoEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(type_1.DictTypeEntity),
    __metadata("design:type", typeorm_1.Repository)
], DictInfoService.prototype, "dictTypeEntity", void 0);
DictInfoService = __decorate([
    (0, decorator_1.Provide)()
], DictInfoService);
exports.DictInfoService = DictInfoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2RpY3Qvc2VydmljZS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJDQUFrRDtBQUNsRCwyQ0FBa0Q7QUFDbEQsbURBQThDO0FBQzlDLDRDQUFnRDtBQUNoRCx1Q0FBa0Q7QUFDbEQscUNBQXlDO0FBQ3pDLDRCQUE0QjtBQUU1Qjs7R0FFRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsa0JBQVc7SUFPOUM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFlO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNsQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1RCxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDOUM7UUFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdkIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWM7YUFDbkMsa0JBQWtCLENBQUMsR0FBRyxDQUFDO2FBQ3ZCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM5RCxLQUFLLENBQUMscUJBQXFCLEVBQUU7WUFDNUIsT0FBTyxFQUFF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