import { BaseDeleteEntity } from '../../../../base/entity/baseDelete';
export declare enum UserStatus {
    NORMAL = "normal",
    SUSPEND = "suspend",
    DELETE = "delete"
}
export declare enum IdentifyVerify {
    UNVERIFIED = "unverified",
    PENDING = "pending",
    REJECT = "rejected",
    VERIFY = "verify"
}
export declare enum UserGender {
    MALE = "male",
    FEMALE = "female",
    INTERSEX = "intersex"
}
export declare enum EmailVerify {
    UNVERIFIED = "unverified",
    VERIFY = "verify",
    PENDING = "pending"
}
/**
 * 系統用戶
 */
export declare class BaseSysUserEntity extends BaseDeleteEntity {
    departmentId: number;
    username: string;
    email: string;
    emailVerify: EmailVerify;
    phone: string;
    password: string;
    passwordV: number;
    status: UserStatus;
    identifyVerify: IdentifyVerify;
    departmentName: string;
    roleIdList: number[];
    socketId: string;
    firstName: string;
    lastName: string;
    idCard: string;
    birthday: string;
    headImg: string;
    gender: UserGender;
    remark: string;
    intro: string;
}
