import { UserGender } from '../../entity/sys/user';
/**
 * 登錄參數校驗
 */
export declare class ApiLoginDTO {
    area: string;
    phone: string;
    password: string;
}
export declare class ApiRegisterDTO {
    firstName: string;
    lastName: string;
    gender: UserGender;
    phone: string;
    password: string;
    passwordConfirm: string;
    verifyCode: string;
    birthday: string;
    username: string;
}
export declare class ApiCaptchaDTO {
    type: string;
    phone: string;
}
export declare class ApiForgotDTO {
    phone: string;
    verifyCode: string;
    password: string;
    passwordConfirm: string;
}
export declare class ApiResetPasswordDTO {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
}
