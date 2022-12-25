import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleCollectionEntity } from '../../news/entity/articleCollection';
import { TipAppService } from '../../award/service/app/tips';
import { AwardTipsCollectionEntity } from '../../award/entity/tips_collection';
/**
 * 描述
 */
export declare class CollectionService extends BaseService {
    newsArticleCollectionEntity: Repository<NewsArticleCollectionEntity>;
    tipCollectionEntity: Repository<AwardTipsCollectionEntity>;
    tipAppService: TipAppService;
    ctx: any;
    /**
     * 描述
     */
    page(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: any;
        };
    }>;
    my(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
}
