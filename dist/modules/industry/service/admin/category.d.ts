import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { IndustryCategoryEntity } from '../../entity/category';
/**
 * 描述
 */
export declare class IndustryCategoryService extends BaseService {
    industryCategoryEntity: Repository<IndustryCategoryEntity>;
    /**
     * 分页查询
     * @param query
     */
    page(query: any): Promise<{
        list: IndustryCategoryEntity[];
        pagination: {
            page: number;
            size: number;
            total: number;
        };
    }>;
    /**
     * 分页查询
     * @param query
     */
    list(): Promise<any>;
}
