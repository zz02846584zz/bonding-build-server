import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { NewsArticleEntity } from '../../entity/article';
import { NewsArticleCategoryEntity } from '../../entity/articleCategory';
import { NewsArticleViewEntity } from '../../entity/articleView';
/**
 * 描述
 */
export declare class AdminNewsArticleService extends BaseService {
    newsArticleEntity: Repository<NewsArticleEntity>;
    newsArticleCategoryEntity: Repository<NewsArticleCategoryEntity>;
    newsArticleViewEntity: Repository<NewsArticleViewEntity>;
    ctx: any;
    page(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    add(params: any): Promise<any>;
    update(params: any): Promise<any>;
    info(id: any): Promise<{
        categories: any;
        title: string;
        metaTitle: string;
        metaDescription: string;
        slug: string;
        content: string;
        contentPreview: string;
        excerpt: string;
        thumbnail: string;
        commentOpen: boolean;
        isTop: boolean;
        isHot: boolean;
        status: number;
        publishTime: Date;
        type: number;
        videoUrl: string;
        authorAvatar: string;
        authorName: string;
        authorIntro: string;
        deleteBy: number;
        deleteTime: Date;
        createBy: number;
        updateBy: number;
        id: number;
        createTime: Date;
        updateTime: Date;
    }>;
    /**
     * 更新分類关系
     * @param user
     */
    updateCategories(article: any): Promise<void>;
    /**
     * 閱讀紀錄
     * @param articleId
     */
    viewLogs(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    /**
     * 點贊紀錄
     * @param articleId
     */
    likeLogs(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    /**
     * 收藏紀錄
     * @param articleId
     */
    collectionLogs(query: any): Promise<{
        list: any;
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
}
