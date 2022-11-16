import { BaseDeleteEntity } from '../../../base/entity/baseDelete';
export declare enum ArticleStatus {
    DRAFT = "draft",
    PENDING = "pending",
    REJECT = "reject",
    PUBLISHED = "published",
    DELETE = "delete",
    SCHEDULE = "schedule"
}
export declare enum ArticleType {
    NORMAL = "normal",
    VIDEO = "video"
}
export declare class NewsArticleEntity extends BaseDeleteEntity {
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
    type: ArticleType;
    videoUrl: string;
    authorAvatar: string;
    authorName: string;
    authorIntro: string;
    categories: number[];
}
