import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { TipEntity } from '../../entity/index';
import { TipViewEntity } from '../../entity/view';
/**
 * 描述
 */
export declare class TipAdminService extends BaseService {
    tipEntity: Repository<TipEntity>;
    tipViewEntity: Repository<TipViewEntity>;
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
     * 根据ID获得信息
     * @param id
     */
    info(id: any): Promise<TipEntity>;
    /**
     * 新增
     * @param param
     */
    add(param: any): Promise<any>;
    /**
     * 修改
     * @param param 数据
     */
    update(param: any): Promise<void>;
}
