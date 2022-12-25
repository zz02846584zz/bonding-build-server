import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { BaseSysPermsService } from './perms';
import { BaseSysUserRoleEntity } from '../../entity/sys/user_role';
import { BaseSysDepartmentEntity } from '../../entity/sys/department';
import { CacheManager } from '@midwayjs/cache';
import { BaseUserIdentityEntity } from '../../entity/sys/user_identity';
import { BaseSysLogUploadEntity } from '../../entity/sys/log_upload';
/**
 * 系統用戶
 */
export declare class BaseSysUserService extends BaseService {
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    baseSysUserRoleEntity: Repository<BaseSysUserRoleEntity>;
    baseSysDepartmentEntity: Repository<BaseSysDepartmentEntity>;
    baseUserIdentityEntity: Repository<BaseUserIdentityEntity>;
    baseSysLogUploadEntity: Repository<BaseSysLogUploadEntity>;
    cacheManager: CacheManager;
    baseSysPermsService: BaseSysPermsService;
    ctx: any;
    /**
     * 分頁查詢
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
     * 移動部門
     * @param departmentId
     * @param userIds
     */
    move(departmentId: any, userIds: any): Promise<void>;
    /**
     * 獲得個人信息
     */
    person(): Promise<BaseSysUserEntity>;
    /**
     * 更新用戶角色關係
     * @param user
     */
    updateUserRole(user: any): Promise<void>;
    /**
     * 新增
     * @param param
     */
    add(param: any): Promise<any>;
    /**
     * 根據ID獲得信息
     * @param id
     */
    info(id: any): Promise<BaseSysUserEntity>;
    /**
     * 修改個人信息
     * @param param
     */
    personUpdate(param: any): Promise<void>;
    /**
     * 修改
     * @param param 數據
     */
    update(param: any): Promise<void>;
    /**
     * 禁用用戶
     * @param userId
     */
    forbidden(userId: any): Promise<void>;
    getIdentity(userId: number): Promise<{
        positive: string;
        negative: string;
    }>;
}
