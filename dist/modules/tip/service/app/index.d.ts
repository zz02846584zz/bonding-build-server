import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { TipEntity } from '../../entity/index';
import { TipViewEntity } from '../../entity/view';
import { Context } from 'koa';
import { TipCollectionEntity } from '../../entity/collection';
/**
 * 描述
 */
export declare class TipAppService extends BaseService {
    tipEntity: Repository<TipEntity>;
    tipViewEntity: Repository<TipViewEntity>;
    tipCollectionEntity: Repository<TipCollectionEntity>;
    ctx: Context;
    /**
     * 根据ID获得信息
     * @param id
     */
    getInfo({ id }: {
        id: any;
    }): Promise<any>;
    /**
     * 取得小知識分頁
     *
     */
    page({ page, size }: {
        page?: number;
        size?: number;
    }): Promise<{
        list: any;
        pagination: {
            /**
             * 根据ID获得信息
             * @param id
             */
            page: number;
            size: number;
            total: number;
        };
    }>;
    /**
     * 取得今日小知識
     *
     */
    today(): Promise<TipEntity>;
    todayFormat(): Promise<string>;
    collection({ id }: {
        id: any;
    }): Promise<{
        id: any;
        status: any;
    }>;
    viewHistory(params: any): Promise<{
        list: any;
        pagination: {
            /**
             * 根据ID获得信息
             * @param id
             */
            page: number;
            size: number;
            total: number;
        };
    }>;
}
