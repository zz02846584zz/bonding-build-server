import { BaseController } from '@cool-midway/core';
import { BaseSysDepartmentService } from '../../../service/sys/department';
/**
 * 部门
 */
export declare class BaseDepartmentController extends BaseController {
    baseDepartmentService: BaseSysDepartmentService;
    /**
     * 部门排序
     */
    order(params: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
