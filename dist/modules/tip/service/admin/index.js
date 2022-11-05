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
exports.TipAdminService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const index_1 = require("../../entity/index");
const view_1 = require("../../entity/view");
/**
 * 描述
 */
let TipAdminService = class TipAdminService extends core_1.BaseService {
    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { keyWord } = query;
        const sql = `
      SELECT
          a.*,
          GROUP_CONCAT(distinct c.name) AS categories

      FROM
          tip a
          LEFT JOIN tip_category b ON a.id = b.tipId
          LEFT JOIN industry_category c ON c.id = b.categoryId
      WHERE 1 = 1
          ${this.setSql(keyWord, 'and (a.title LIKE ?)', [`%${keyWord}%`])}
      GROUP BY a.id
    `;
        const data = await this.sqlRenderPage(sql, query);
        return data;
    }
    /**
     * 根据ID获得信息
     * @param id
     */
    async info(id) {
        const info = await this.tipEntity.findOne({ id });
        return info;
    }
    /**
     * 新增
     * @param param
     */
    async add(param) {
        await this.tipEntity.save(param);
        return param.id;
    }
    /**
     * 修改
     * @param param 数据
     */
    async update(param) {
        const tipInfo = await this.tipEntity.findOne({ id: param.id });
        if (!tipInfo) {
            throw new core_1.CoolCommException('小知識不存在');
        }
        await this.tipEntity.save(param);
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(index_1.TipEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipAdminService.prototype, "tipEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(view_1.TipViewEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipAdminService.prototype, "tipViewEntity", void 0);
TipAdminService = __decorate([
    (0, decorator_1.Provide)()
], TipAdminService);
exports.TipAdminService = TipAdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy90aXAvc2VydmljZS9hZG1pbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsOENBQStDO0FBQy9DLDRDQUFrRDtBQUlsRDs7R0FFRztBQUVILElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsa0JBQVc7SUFPOUM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLO1FBQ2QsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUUxQixNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7OztZQVVKLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDOztLQUVyRSxDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVsRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLO1FBQ2IsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxPQUFPLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSztRQUNoQixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixNQUFNLElBQUksd0JBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7UUFDRCxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7Q0FDRixDQUFBO0FBNURDO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxpQkFBUyxDQUFDOzhCQUNsQixvQkFBVTtrREFBWTtBQUdqQztJQURDLElBQUEsdUJBQWlCLEVBQUMsb0JBQWEsQ0FBQzs4QkFDbEIsb0JBQVU7c0RBQWdCO0FBTDlCLGVBQWU7SUFEM0IsSUFBQSxtQkFBTyxHQUFFO0dBQ0csZUFBZSxDQThEM0I7QUE5RFksMENBQWUifQ==