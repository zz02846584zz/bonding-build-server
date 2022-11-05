import { BaseController } from '@cool-midway/core';
import { BaseAppAuthService } from '../../service/app/auth';
import { ApiLoginDTO, ApiRegisterDTO, ApiCaptchaDTO, ApiForgotDTO } from '../../dto/app/auth';
/**
 * 商品
 */
export declare class AppAuthController extends BaseController {
    baseAppAuthService: BaseAppAuthService;
    /**
     * 登錄
     * @param login
     */
    login(login: ApiLoginDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 註冊
     * @param register
     */
    register(register: ApiRegisterDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 註冊
     * @param forgot
     */
    forgot(forgot: ApiForgotDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 獲得驗證碼
     * @param captcha
     */
    captcha(params: ApiCaptchaDTO): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
    /**
     * 刷新token
     */
    refreshToken(params: any): Promise<{
        code: import("@cool-midway/core").RESCODE;
        message: import("@cool-midway/core").RESMESSAGE;
    }>;
}
