/**
 * 文章參數校驗
 */
export declare class ArticleDTO {
    title: string;
    slug: string;
    content: string;
    summary: string;
    thumbnail: string;
    commentOpen: boolean;
    categoryIds: number;
    status: string;
    publishTime: string;
}
