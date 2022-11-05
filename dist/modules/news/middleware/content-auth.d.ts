import { NextFunction, Context } from '@midwayjs/koa';
import { IMiddleware } from '@midwayjs/core';
/**
 * 描述
 */
export declare class NewsContentMiddleware implements IMiddleware<Context, NextFunction> {
    resolve(): (ctx: Context, next: NextFunction) => Promise<void>;
}
