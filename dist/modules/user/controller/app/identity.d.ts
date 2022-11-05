import { BaseController } from '@cool-midway/core';
import { UserIdentityService } from '../../service/app/identity';
import { UserIdentityDTO } from '../../dto/app/identity';
/**
 * 描述
 */
export declare class UserIdentityController extends BaseController {
    userIdentityService: UserIdentityService;
    identityCert(param: UserIdentityDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 身份驗證
     */
    identifyVerify(params: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
