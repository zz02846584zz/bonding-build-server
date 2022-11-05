import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleCommentEntity } from '../../entity/comment';
import { Utils } from '../../../../comm/utils';
import { NewsArticleCommentLikeEntity } from '../../entity/commentLike';
/**
 * 描述
 */
export declare class NewsCommentAdminService extends BaseService {
    newsArticleCommentEntity: Repository<NewsArticleCommentEntity>;
    newsArticleCommentLikeEntity: Repository<NewsArticleCommentLikeEntity>;
    ctx: any;
    utils: Utils;
    info(id: any): Promise<any>;
    page(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    list(param: any): Promise<any>;
    add(param: any): Promise<any>;
    update(param: any): Promise<any>;
    /**
     * 刪除
     * @param ids
     */
    delete(ids: any): Promise<void>;
}
