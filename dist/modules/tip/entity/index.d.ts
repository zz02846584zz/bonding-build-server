import { BaseEntity } from '@cool-midway/core';
export declare enum TipStatus {
    DRAFT = "draft",
    PUBLISHED = "published"
}
export declare class TipEntity extends BaseEntity {
    title: string;
    content: string;
    publishDate: string;
    status: TipStatus;
}
