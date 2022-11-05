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
exports.NewsCommentAdminService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const comment_1 = require("../../entity/comment");
const utils_1 = require("../../../../comm/utils");
const commentLike_1 = require("../../entity/commentLike");
/**
 * 描述
 */
let NewsCommentAdminService = class NewsCommentAdminService extends core_1.BaseService {
    async info(id) {
        const result = await this.newsArticleCommentEntity
            .createQueryBuilder('comment')
            .select(['comment.*'])
            .addSelect(`
        CASE
            WHEN comment.deleteTime IS NOT NULL
               THEN 1
               ELSE 0
        END`, 'isDelete')
            .withDeleted()
            .where(`comment.id = ${id}`)
            .getRawOne();
        return result;
        // const sql = `
        //   SELECT * FROM news_comment WHERE id = ${id} limit 1;
        // `;
        // const result = await this.nativeQuery(sql);
        // return result[0];
    }
    async page(query) {
        const { articleId } = query;
        const sql = `
      SELECT
        a.id,
        a.content,
        a.ip,
        a.ipAddr,
        a.parentId,
        a.createBy,
        a.createTime,
        a.updateBy,
        a.updateTime,
        a.deleteBy,
        a.deleteTime,
        count(cl.id) as likeCount,
        CONCAT(u.firstName, ' ', u.lastName) as author,

        CASE
            WHEN a.deleteTime IS NOT NULL
               THEN 1
               ELSE 0
        END as isDelete
      FROM
        news_comment a
        LEFT JOIN news_comment_like cl ON cl.commentId = a.id
        LEFT JOIN base_sys_user u ON u.id = a.createBy
      WHERE a.articleId = ${articleId} AND a.id IS NOT NULL
      GROUP BY a.id
    `;
        const data = await this.sqlRenderPage(sql, query);
        return data;
    }
    async list(param) {
        const { articleId } = param;
        if (!articleId)
            throw new core_1.CoolCommException('操作失敗');
        const sql = `
        SELECT
            a.id,
            a.content
        FROM
            news_comment a
        WHERE a.articleId=${articleId}
        GROUP BY a.id
    `;
        const result = await this.nativeQuery(sql);
        return result;
    }
    async add(param) {
        let ip = await this.utils.getReqIP(this.ctx);
        ip = typeof ip === 'string' ? ip : ip.join(',');
        const ipAddrArr = [];
        for (const e of ip.split(','))
            ipAddrArr.push(await this.utils.getIpAddr(this.ctx, e));
        const ipAddr = ipAddrArr.join(',');
        const comment = await this.newsArticleCommentEntity.save({
            ...param,
            updateBy: this.ctx.admin.userId,
            ip,
            ipAddr,
        });
        return comment.id;
    }
    async update(param) {
        if (param.isDelete) {
            param.deleteTime = new Date();
            param.deleteBy = this.ctx.admin.userId;
        }
        else {
            param.deleteTime = null;
            param.deleteBy = null;
        }
        let ip = await this.utils.getReqIP(this.ctx);
        ip = typeof ip === 'string' ? ip : ip.join(',');
        const ipAddrArr = [];
        for (const e of ip.split(','))
            ipAddrArr.push(await this.utils.getIpAddr(this.ctx, e));
        const ipAddr = ipAddrArr.join(',');
        const comment = await this.newsArticleCommentEntity.save({
            ...param,
            updateBy: this.ctx.admin.userId,
            ip,
            ipAddr,
        });
        return comment.id;
    }
    /**
     * 刪除
     * @param ids
     */
    async delete(ids) {
        let idArr;
        if (ids instanceof Array) {
            idArr = ids;
        }
        else {
            idArr = ids.split(',');
        }
        for (const id of idArr) {
            try {
                const deleteArr = [
                    this.newsArticleCommentEntity.delete({ id }),
                    this.newsArticleCommentLikeEntity.delete({ commentId: id }),
                ];
                Promise.all(deleteArr);
            }
            catch (err) {
                console.error(err);
            }
        }
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(comment_1.NewsArticleCommentEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsCommentAdminService.prototype, "newsArticleCommentEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(commentLike_1.NewsArticleCommentLikeEntity),
    __metadata("design:type", typeorm_1.Repository)
], NewsCommentAdminService.prototype, "newsArticleCommentLikeEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], NewsCommentAdminService.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], NewsCommentAdminService.prototype, "utils", void 0);
NewsCommentAdminService = __decorate([
    (0, decorator_1.Provide)()
], NewsCommentAdminService);
exports.NewsCommentAdminService = NewsCommentAdminService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL25ld3Mvc2VydmljZS9hZG1pbi9jb21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxrREFBZ0U7QUFDaEUsa0RBQStDO0FBQy9DLDBEQUF3RTtBQUV4RTs7R0FFRztBQUVILElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsa0JBQVc7SUFhdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1gsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsd0JBQXdCO2FBQy9DLGtCQUFrQixDQUFDLFNBQVMsQ0FBQzthQUM3QixNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNyQixTQUFTLENBQ1I7Ozs7O1lBS0ksRUFDSixVQUFVLENBQ1g7YUFDQSxXQUFXLEVBQUU7YUFDYixLQUFLLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO2FBQzNCLFNBQVMsRUFBRSxDQUFDO1FBQ2YsT0FBTyxNQUFNLENBQUM7UUFDZCxnQkFBZ0I7UUFDaEIseURBQXlEO1FBQ3pELEtBQUs7UUFFTCw4Q0FBOEM7UUFDOUMsb0JBQW9CO0lBQ3RCLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDZCxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRTVCLE1BQU0sR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQXlCWSxTQUFTOztLQUVoQyxDQUFDO1FBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVsRCxPQUFPLElBQUksQ0FBQztJQUNk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