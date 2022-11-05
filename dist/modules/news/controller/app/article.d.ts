import { BaseController } from '@cool-midway/core';
import { NewsArticleApiService } from '../../service/app/article';
import { Context } from '@midwayjs/koa';
import { ArticleDTO } from '../../dto/article';
/**
 * 描述
 */
export declare class NewsArticleController extends BaseController {
    newsArticleApiService: NewsArticleApiService;
    ctx: Context;
    /**
     * 分頁
     * @query query
     */
    getPage(query: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 列表
     */
    getList(query: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 分類
     * @param param
     */
    getArticleCategories(): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 分類
     * @param param
     */
    getArticle(param: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 點贊
     * @param param
     */
    articleLike(param: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 新增
     * @param article
     */
    articleNew(article: ArticleDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 刪除
     * @param params
     */
    articleDelete(params: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 收藏
     * @param params
     */
    articleCollection(params: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
