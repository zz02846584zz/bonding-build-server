import { BaseEntity } from '@cool-midway/core';
/**
 * 部门
 */
export declare class BaseSysDepartmentEntity extends BaseEntity {
    name: string;
    parentId: number;
    orderNum: number;
    parentName: string;
}
