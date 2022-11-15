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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3RpcC9zZXJ2aWNlL2FwcC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQW1FO0FBQ25FLHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsOENBQTBEO0FBQzFELDRDQUFrRDtBQUdsRCw0QkFBNEI7QUFDNUIsd0RBQThEO0FBRTlEOztHQUVHO0FBRUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLGtCQUFXO0lBYTVDOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7cUJBT3JCLEVBQUU7S0FDbEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDO1lBQzFELEtBQUssRUFBRSxFQUFFO1lBQ1QsTUFBTTtTQUNQLENBQUMsQ0FBQztRQUNILE9BQU8sRUFBRSxHQUFHLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRTtRQUN2QyxNQUFNLEtBQUssR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUM3QixNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7OzsyQkFhVyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxN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