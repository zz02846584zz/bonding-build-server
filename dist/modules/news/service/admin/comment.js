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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmV3cy9zZXJ2aWNlL2FkbWluL2NvbW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQXNEO0FBQ3RELDRDQUFtRTtBQUNuRSx1Q0FBa0Q7QUFDbEQscUNBQXFDO0FBQ3JDLGtEQUFnRTtBQUNoRSxrREFBK0M7QUFDL0MsMERBQXdFO0FBRXhFOztHQUVHO0FBRUgsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBd0IsU0FBUSxrQkFBVztJQWF0RCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDWCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyx3QkFBd0I7YUFDL0Msa0JBQWtCLENBQUMsU0FBUyxDQUFDO2FBQzdCLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3JCLFNBQVMsQ0FDUjs7Ozs7WUFLSSxFQUNKLFVBQVUsQ0FDWDthQUNBLFdBQVcsRUFBRTthQUNiLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUM7YUFDM0IsU0FBUyxFQUFFLENBQUM7UUFDZixPQUFPLE1BQU0sQ0FBQztRQUNkLGdCQUFnQjtRQUNoQix5REFBeUQ7UUFDekQsS0FBSztRQUVMLDhDQUE4QztRQUM5QyxvQkFBb0I7SUFDdEIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNkLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFFNUIsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBeUJZLFNBQVM7O0tBRWhDLENBQUM7UUFFRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSztRQUNkLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVM7WUFBRSxNQUFNLElBQUksd0JBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFcEQsTUFBTSxHQUFHLEdBQUc7Ozs7Ozs0QkFNWSxTQUFTOztLQUVoQyxDQUFDO1FBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUs7UUFDYixJQUFJLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxFQUFFLEdBQUcsT0FBTyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEQsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDM0IsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQztZQUN2RCxHQUFHLEtBQUs7WUFDUixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUMvQixFQUFFO1lBQ0YsTUFBTTtTQUNQLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1FBQ2hCLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNsQixLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDOUIsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDeEM7YUFBTTtZQUNMLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsRUFBRSxHQUFHLE9BQU8sRUFBRSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVuQyxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUM7WUFDdkQsR0FBRyxLQUFLO1lBQ1IsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDL0IsRUFBRTtZQUNGLE1BQU07U0FDUCxDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztRQUNkLElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO1lBQ3hCLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDYjthQUFNO1lBQ0wsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEI7UUFDRCxLQUFLLE1BQU0sRUFBRSxJQUFJLEtBQUssRUFBRTtZQUN0QixJQUFJO2dCQUNGLE1BQU0sU0FBUyxHQUFHO29CQUNoQixJQUFJLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7b0JBQzVDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7aUJBQzVELENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN4QjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDcEI7U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBO0FBNUpDO0lBREMsSUFBQSx1QkFBaUIsRUFBQyxrQ0FBd0IsQ0FBQzs4QkFDbEIsb0JBQVU7eUVBQTJCO0FBRy9EO0lBREMsSUFBQSx1QkFBaUIsRUFBQywwQ0FBNEIsQ0FBQzs4QkFDbEIsb0JBQVU7NkVBQStCO0FBR3ZFO0lBREMsSUFBQSxrQkFBTSxHQUFFOztvREFDTDtBQUdKO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNGLGFBQUs7c0RBQUM7QUFYRix1QkFBdUI7SUFEbkMsSUFBQSxtQkFBTyxHQUFFO0dBQ0csdUJBQXVCLENBOEpuQztBQTlKWSwwREFBdUIifQ==