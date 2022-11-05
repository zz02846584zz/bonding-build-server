import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleCollectionEntity } from '../../news/entity/articleCollection';
import { TipCollectionEntity } from '../../tip/entity/collection';
import { TipAppService } from '../../tip/service/app';
/**
 * 描述
 */
export declare class CollectionService extends BaseService {
    newsArticleCollectionEntity: Repository<NewsArticleCollectionEntity>;
    tipCollectionEntity: Repository<TipCollectionEntity>;
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
