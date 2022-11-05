import { Context } from '@midwayjs/koa';
/**
 * 幫助類
 */
export declare class Utils {
    baseDir: any;
    /**
     * 獲得請求IP
     */
    getReqIP(ctx: Context): Promise<string | string[]>;
    /**
     * 根據IP獲得請求地址
     * @param ip 為空時則為當前請求的IP地址
     */
    getIpAddr(ctx: Context, ip?: string | string[]): Promise<any>;
    /**
     * 去除對象的空值屬性
     * @param obj
     */
    removeEmptyP(obj: any): Promise<void>;
    /**
     * 線程阻塞毫秒數
     * @param ms
     */
    sleep(ms: any): Promise<unknown>;
    /**
     * 隨機字串長度
     * @param len
     */
    randomString(len: number): string;
}
