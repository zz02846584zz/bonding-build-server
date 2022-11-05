import { BaseEventEntity } from '../../../base/entity/baseEvent';
/**
 * 描述
 */
export declare class UserIdentityEntity extends BaseEventEntity {
    userId: number;
    idCard: string;
    positive: string;
    negative: string;
}
