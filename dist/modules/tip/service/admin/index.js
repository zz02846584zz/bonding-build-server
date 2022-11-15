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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3RpcC9zZXJ2aWNlL2FkbWluL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4QztBQUM5Qyw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyw4Q0FBK0M7QUFDL0MsNENBQWtEO0FBSWxEOztHQUVHO0FBRUgsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxrQkFBVztJQU85Qzs7O09BR0c7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRTFCLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7O1lBVUosSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7O0tBRXJFLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNsQixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUs7UUFDYixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sS0FBSyxDQUFDLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSx3QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2QztRQUNELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUE1REM7SUFEQyxJQUFBLHVCQUFpQixFQUFDLGlCQUFTLENBQUM7OEJBQ2xCLG9CQUFVO2tEQUFZO0FBR2pDO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxvQkFBYSxDQUFDOzhCQUNsQixvQkFBVTtzREFBZ0I7QUFMOUIsZUFBZTtJQUQzQixJQUFBLG1CQUFPLEdBQUU7R0FDRyxlQUFlLENBOEQzQjtBQTlEWSwwQ0FBZSJ9