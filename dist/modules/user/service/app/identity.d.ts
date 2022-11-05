import { BaseService } from '@cool-midway/core';
import { Repository } from 'typeorm';
import { UserIdentityEntity } from '../../entity/identity';
import { UserIdentityDTO } from '../../dto/app/identity';
import { BaseSysUserEntity } from '../../../base/entity/sys/user';
/**
 * 描述
 */
export declare class UserIdentityService extends BaseService {
    userIdentityEntity: Repository<UserIdentityEntity>;
    baseSysUserEntity: Repository<BaseSysUserEntity>;
    ctx: any;
    /**
     * 描述
     */
    identityCert(param: UserIdentityDTO): Promise<void>;
    /**
     * 身份驗證
     */
    identifyVerify(params: any): Promise<void>;
}
