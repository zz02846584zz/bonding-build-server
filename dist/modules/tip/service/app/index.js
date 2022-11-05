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
exports.TipAppService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const index_1 = require("../../entity/index");
const view_1 = require("../../entity/view");
const _ = require("lodash");
const collection_1 = require("../../entity/collection");
/**
 * 描述
 */
let TipAppService = class TipAppService extends core_1.BaseService {
    /**
     * 根据ID获得信息
     * @param id
     */
    async getInfo({ id }) {
        const userId = this.ctx.user.userId;
        const [info] = await this.nativeQuery(`
      SELECT
        a.id,
        a.title,
        a.content,
        a.publishDate
      FROM tip a
      WHERE a.id = ${id}
    `);
        const isCollection = await this.tipCollectionEntity.findOne({
            tipId: id,
            userId,
        });
        return { ...info, isCollection };
    }
    /**
     * 取得小知識分頁
     *
     */
    async page({ page = 1, size = 10 }) {
        const query = { page, size };
        const sql = `
        SELECT
            a.id,
            a.title,
            a.publishDate,
            count(b.id) as views,
            GROUP_CONCAT(distinct d.name) AS categories

        FROM
            tip a
            LEFT JOIN tip_view b on a.id = b.tipId
            LEFT JOIN tip_category c on a.id = c.tipId
            LEFT JOIN industry_category d on d.id = c.categoryId
        WHERE b.userId = ${this.ctx.user.userId} AND a.status = '${index_1.TipStatus.PUBLISHED}'
        GROUP BY a.id
    `;
        const result = await this.sqlRenderPage(sql, _.assign(query, {
            order: 'publishDate',
        }));
        return result;
    }
    /**
     * 取得今日小知識
     *
     */
    async today() {
        const info = await this.tipEntity.findOne({
            publishDate: await this.todayFormat(),
            status: index_1.TipStatus.PUBLISHED,
        });
        if (_.isEmpty(info))
            throw new core_1.CoolCommException('今日無小知識');
        const exist = await this.tipViewEntity.findOne({
            userId: this.ctx.user.userId,
            tipId: info.id,
        });
        if (_.isEmpty(exist)) {
            await this.tipViewEntity.save({
                userId: this.ctx.user.userId,
                tipId: info.id,
            });
        }
        delete info.createTime;
        delete info.updateTime;
        delete info.status;
        return info;
    }
    async todayFormat() {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = String(today.getMonth() + 1); // Months start at 0!
        let dd = String(today.getDate());
        if (+dd < 10)
            dd = '0' + dd;
        if (+mm < 10)
            mm = '0' + mm;
        return yyyy + '-' + mm + '-' + dd;
    }
    async collection({ id }) {
        const user = this.ctx.user;
        if (!id)
            throw new core_1.CoolCommException('請輸入ID');
        const articleExist = await this.tipEntity.findOne({ id });
        if (_.isEmpty(articleExist))
            throw new core_1.CoolCommException('找不到該文章');
        const collectionExist = await this.tipCollectionEntity.findOne({
            tipId: id,
            userId: user.userId,
        });
        const action = _.isEmpty(collectionExist) ? 'save' : 'delete';
        await this.tipCollectionEntity[action]({
            tipId: id,
            userId: user.userId,
        });
        return { id, status: _.isEmpty(collectionExist) };
    }
    async viewHistory(params) {
        const userId = this.ctx.user.userId;
        const { keyWord, order = 'publishDate', sort = 'desc', category } = params;
        const sql = `
        SELECT
            z.id,
            z.title,
            z.publishDate,
            GROUP_CONCAT(distinct d.name) AS categories

        FROM
            tip_view a
            LEFT JOIN tip z on a.tipId = z.id
            LEFT JOIN tip_collection b on z.id = b.tipId
            LEFT JOIN tip_category c on z.id = c.tipId
            LEFT JOIN industry_category d on z.id = c.categoryId
        WHERE a.userId = ${userId}
            AND z.status = '${index_1.TipStatus.PUBLISHED}'
            ${this.setSql(category, 'AND d.slug = (?)', category)}
            ${this.setSql(keyWord, 'AND (z.title LIKE ?)', [`%${keyWord}%`])}
        GROUP BY a.id
      `;
        const result = await this.sqlRenderPage(sql, _.assign(params, {
            order,
            sort,
        }));
        console.log(result);
        return result;
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(index_1.TipEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipAppService.prototype, "tipEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(view_1.TipViewEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipAppService.prototype, "tipViewEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(collection_1.TipCollectionEntity),
    __metadata("design:type", typeorm_1.Repository)
], TipAppService.prototype, "tipCollectionEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], TipAppService.prototype, "ctx", void 0);
TipAppService = __decorate([
    (0, decorator_1.Provide)()
], TipAppService);
exports.TipAppService = TipAppService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy90aXAvc2VydmljZS9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFtRTtBQUNuRSx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLDhDQUEwRDtBQUMxRCw0Q0FBa0Q7QUFHbEQsNEJBQTRCO0FBQzVCLHdEQUE4RDtBQUU5RDs7R0FFRztBQUVILElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxrQkFBVztJQWE1Qzs7O09BR0c7SUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDOzs7Ozs7O3FCQU9yQixFQUFFO0tBQ2xCLENBQUMsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztZQUMxRCxLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU07U0FDUCxDQUFDLENBQUM7UUFDSCxPQUFPLEVBQUUsR0FBRyxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUU7UUFDdkMsTUFBTSxLQUFLLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDN0IsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7Ozs7MkJBYVcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxvQkFB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