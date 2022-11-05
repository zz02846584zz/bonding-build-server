import { BaseController } from '@cool-midway/core';
import { IndustryAppCategoryService } from '../../service/app/category';
/**
 * 描述
 */
export declare class IndustryCategoryController extends BaseController {
    industryAppCategoryService: IndustryAppCategoryService;
    getInfo(query: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
