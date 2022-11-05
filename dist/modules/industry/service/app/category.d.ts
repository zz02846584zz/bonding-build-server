import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { IndustryCategoryEntity } from '../../entity/category';
/**
 * 描述
 */
export declare class IndustryAppCategoryService extends BaseService {
    industryCategoryEntity: Repository<IndustryCategoryEntity>;
    /**
     * 描述
     */
    info(query: any): Promise<IndustryCategoryEntity>;
}
