import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleEntity, ArticleStatus } from '../../entity/article';
import { NewsArticleCommentEntity } from '../../entity/comment';
import { IndustryCategoryEntity } from '../../../industry/entity/category';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';
import { NewsArticleCategoryEntity } from '../../entity/articleCategory';
import { NewsArticleViewEntity } from '../../entity/articleView';
import { NewsArticleLikeEntity } from '../../entity/articleLike';
import { NewsArticleCommentLikeEntity } from '../../entity/commentLike';
/**
 * 描述
 */
export declare class NewsArticleAdminService extends BaseService {
    newsArticleEntity: Repository<NewsArticleEntity>;
    newsArticleCategoryEntity: Repository<NewsArticleCategoryEntity>;
    newsArticleCommentEntity: Repository<NewsArticleCommentEntity>;
    newsArticleCommentLikeEntity: Repository<NewsArticleCommentLikeEntity>;
    newsArticleViewEntity: Repository<NewsArticleViewEntity>;
    newsArticleLikeEntity: Repository<NewsArticleLikeEntity>;
    industryCategoryEntity: Repository<IndustryCategoryEntity>;
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    ctx: any;
    /**
     * 取得內容
     * @param query
     */
    info(id: any): Promise<{
        categories: any;
        title: string;
        metaTitle: string;
        metaDescription: string;
        slug: string;
        content: string;
        content_preview: string;
        excerpt: string;
        thumbnail: string;
        commentOpen: boolean;
        isTop: boolean;
        isHot: boolean;
        status: ArticleStatus;
        publishTime: Date;
        type: import("../../entity/article").ArticleType;
        videoUrl: string;
        authorId: number;
        deleteBy: number;
        deleteTime: Date;
        createBy: number;
        updateBy: number;
        id: number;
        createTime: Date;
        updateTime: Date;
    }>;
    /**
     * 分页查询
     * @param query
     */
    page(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    /**
     * 列表查询
     * @param query
     */
    list(): Promise<NewsArticleEntity[]>;
    /**
     * 新增
     * @param param
     */
    add(param: any): Promise<any>;
    /**
     * 更新分類关系
     * @param user
     */
    updateCategories(article: any): Promise<void>;
    /**
     * 新增
     * @param param
     */
    update(param: any): Promise<any>;
    getToday(): string;
    /**
     * 刪除
     * @param ids
     */
    delete(ids: any): Promise<void>;
}
