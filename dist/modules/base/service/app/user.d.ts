import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { BaseSysUserEntity, EmailVerify, UserStatus } from '../../entity/sys/user';
import { BaseSysUserRoleEntity } from '../../entity/sys/user_role';
import { BaseSysDepartmentEntity } from '../../entity/sys/department';
import { CacheManager } from '@midwayjs/cache';
import { Context } from '@midwayjs/koa';
import { ApiResetPasswordDTO } from '../../dto/app/auth';
import { Utils } from '../../../../comm/utils';
import { TipAppService } from '../../../tip/service/app';
import { BaseAppAuthService } from './auth';
import { UserIdentityEntity } from '../../../user/entity/identity';
/**
 * 系統用戶
 */
export declare class BaseApiUserService extends BaseService {
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    baseSysUserRoleEntity: Repository<BaseSysUserRoleEntity>;
    baseSysDepartmentEntity: Repository<BaseSysDepartmentEntity>;
    userIdentityEntity: Repository<UserIdentityEntity>;
    tipAppService: Repository<TipAppService>;
    baseAppAuthService: BaseAppAuthService;
    cacheManager: CacheManager;
    ctx: Context;
    utils: Utils;
    /**
     * 獲得個人信息
     */
    person(): Promise<{
        departmentId: number;
        username: string;
        email: string;
        emailVerify: EmailVerify;
        phone: string;
        password: string;
        passwordV: number;
        status: UserStatus;
        identifyVerify: import("../../entity/sys/user").IdentifyVerify;
        departmentName: string;
        roleIdList: number[];
        socketId: string;
        firstName: string;
        lastName: string;
        idCard: string;
        birthday: string;
        headImg: string;
        gender: import("../../entity/sys/user").UserGender;
        remark: string;
        intro: string;
        deleteBy: number;
        deleteTime: Date;
        createBy: number;
        updateBy: number;
        id: number;
        createTime: Date;
        updateTime: Date;
    }>;
    /**
     * 修改
     * @param param 數據
     */
    personUpdate(param: any): Promise<void>;
    /**
     * 重設密碼
     */
    resetPassword(reset: ApiResetPasswordDTO): Promise<void>;
    /**
     * 根據ID獲得信息
     * @param id
     */
    info(id: any): Promise<BaseSysUserEntity>;
    /**
     * 刪除帳戶
     */
    delete(): Promise<void>;
    /**
     * 綁定Email
     */
    emailBinding(param: any): Promise<any>;
    /**
     * 驗證Email
     */
    emailVerify({ token }: {
        token: any;
    }): Promise<void>;
    /**
     * 更換手機
     */
    changePhone({ phone, verifyCode }: {
        phone: any;
        verifyCode: any;
    }): Promise<{
        id: any;
        phone: any;
    } & BaseSysUserEntity>;
    /**
     * 登出
     */
    logout(): Promise<void>;
}
