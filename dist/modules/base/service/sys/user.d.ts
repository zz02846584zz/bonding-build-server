import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { BaseSysPermsService } from './perms';
import { BaseSysUserRoleEntity } from '../../entity/sys/user_role';
import { BaseSysDepartmentEntity } from '../../entity/sys/department';
import { CacheManager } from '@midwayjs/cache';
/**
 * 系统用户
 */
export declare class BaseSysUserService extends BaseService {
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    baseSysUserRoleEntity: Repository<BaseSysUserRoleEntity>;
    baseSysDepartmentEntity: Repository<BaseSysDepartmentEntity>;
    cacheManager: CacheManager;
    baseSysPermsService: BaseSysPermsService;
    ctx: any;
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
     * 移动部门
     * @param departmentId
     * @param userIds
     */
    move(departmentId: any, userIds: any): Promise<void>;
    /**
     * 获得个人信息
     */
    person(): Promise<BaseSysUserEntity>;
    /**
     * 更新用户角色关系
     * @param user
     */
    updateUserRole(user: any): Promise<void>;
    /**
     * 新增
     * @param param
     */
    add(param: any): Promise<any>;
    /**
     * 根据ID获得信息
     * @param id
     */
    info(id: any): Promise<BaseSysUserEntity>;
    /**
     * 修改个人信息
     * @param param
     */
    personUpdate(param: any): Promise<void>;
    /**
     * 修改
     * @param param 数据
     */
    update(param: any): Promise<void>;
    /**
     * 禁用用户
     * @param userId
     */
    forbidden(userId: any): Promise<void>;
    /**
     * 用戶列表
     * @param userId
     */
    list(): Promise<any>;
}
