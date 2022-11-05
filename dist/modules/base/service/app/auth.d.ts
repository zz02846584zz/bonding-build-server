import { BaseService } from '@cool-midway/core';
import { Context } from '@midwayjs/koa';
import { CacheManager } from '@midwayjs/cache';
import { Repository } from 'typeorm';
import { BaseSysUserEntity, UserStatus } from '../../entity/sys/user';
import { BaseSysUserService } from '../sys/user';
import { BaseSysRoleEntity } from '../../entity/sys/role';
import { BaseSysDepartmentEntity } from '../../entity/sys/department';
import { BaseSysRoleService } from '../sys/role';
import { BaseSysUserRoleEntity } from '../../entity/sys/user_role';
import { BaseSysMenuService } from '../sys/menu';
import { BaseSysPermsService } from '../sys/perms';
import { BaseSysDepartmentService } from '../sys/department';
import { ApiLoginDTO, ApiRegisterDTO, ApiCaptchaDTO, ApiForgotDTO } from '../../dto/app/auth';
import { BaseApiUserService } from './user';
/**
 * 登錄
 */
export declare class BaseAppAuthService extends BaseService {
    jwtConfig: any;
    cacheManager: CacheManager;
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    baseSysRoleEntity: Repository<BaseSysRoleEntity>;
    baseSysUserRoleEntity: Repository<BaseSysUserRoleEntity>;
    baseSysDepartmentEntity: Repository<BaseSysDepartmentEntity>;
    baseSysUserService: BaseSysUserService;
    baseApiUserService: BaseApiUserService;
    baseSysRoleService: BaseSysRoleService;
    baseSysPermsService: BaseSysPermsService;
    baseSysMenuService: BaseSysMenuService;
    baseSysDepartmentService: BaseSysDepartmentService;
    ctx: Context;
    coolConfig: any;
    /**
     * 登錄
     * @param login
     */
    login(login: ApiLoginDTO): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: any;
    }>;
    person(id: any): Promise<{
        departmentName: string;
        departmentId: number;
        username: string;
        email: string;
        emailVerify: import("../../entity/sys/user").EmailVerify;
        phone: string;
        password: string;
        passwordV: number;
        status: UserStatus;
        identifyVerify: import("../../entity/sys/user").IdentifyVerify;
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
     * 註冊
     * @param register
     */
    register(register: ApiRegisterDTO): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: any;
    }>;
    createRandomString(len: number): string;
    /**
     * 忘記密碼
     */
    forgot(forgot: ApiForgotDTO): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: any;
    }>;
    /**
     * 發送手機驗證碼
     * @param captcha 國際區號
     */
    captcha({ type, phone }: ApiCaptchaDTO): Promise<any>;
    /**
     * 檢驗手機驗證碼
     * @param phone 手機號
     * @param value 驗證碼
     */
    captchaCheck(areaPhone: any, smsCode: any): Promise<any>;
    /**
     * 生成token
     * @param user 用戶對象
     * @param roleIds 角色集合
     * @param expire 過期
     * @param isRefresh 是否是刷新
     */
    generateToken(user: any, roleIds: any, expire: any, isRefresh?: any): Promise<any>;
    /**
     * 刷新token
     * @param token
     */
    refreshToken({ refreshToken: token }: {
        refreshToken: any;
    }): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: string;
    }>;
}
