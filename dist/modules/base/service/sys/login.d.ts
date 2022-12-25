import { BaseService } from '@cool-midway/core';
import { LoginDTO } from '../../dto/login';
import { BaseSysUserEntity } from '../../entity/sys/user';
import { Repository } from 'typeorm';
import { BaseSysRoleService } from './role';
import { BaseSysMenuService } from './menu';
import { BaseSysDepartmentService } from './department';
import { Context } from '@midwayjs/koa';
import { CacheManager } from '@midwayjs/cache';
/**
 * 登录
 */
export declare class BaseSysLoginService extends BaseService {
    cacheManager: CacheManager;
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    baseSysRoleService: BaseSysRoleService;
    baseSysMenuService: BaseSysMenuService;
    baseSysDepartmentService: BaseSysDepartmentService;
    ctx: Context;
    coolConfig: any;
    /**
     * 登录
     * @param login
     */
    login(login: LoginDTO): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: any;
    }>;
    /**
     * 验证码
     * @param type 图片验证码类型 svg
     * @param width 宽
     * @param height 高
     */
    captcha(type: string, width?: number, height?: number): Promise<{
        captchaId: any;
        data: string;
    }>;
    /**
     * 退出登录
     */
    logout(): Promise<void>;
    /**
     * 检验图片验证码
     * @param captchaId 验证码ID
     * @param value 验证码
     */
    captchaCheck(captchaId: any, value: any): Promise<boolean>;
    /**
     * 生成token
     * @param user 用户对象
     * @param roleIds 角色集合
     * @param expire 过期
     * @param isRefresh 是否是刷新
     */
    generateToken(user: any, roleIds: any, expire: any, isRefresh?: any): Promise<any>;
    /**
     * 刷新token
     * @param token
     */
    refreshToken(token: string): Promise<{
        expire: any;
        token: any;
        refreshExpire: any;
        refreshToken: string;
    }>;
}
