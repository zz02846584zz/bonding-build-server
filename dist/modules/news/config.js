"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_auth_1 = require("./middleware/content-auth");
/**
 * 模块配置
 */
exports.default = () => {
    return {
        // 模块名称
        name: 'news',
        // 模块描述
        description: 'news',
        // 中间件，只对本模块有效
        middlewares: [content_auth_1.NewsContentMiddleware],
        // 中间件，全局有效
        globalMiddlewares: [],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmV3cy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0REFBa0U7QUFFbEU7O0dBRUc7QUFDSCxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTztRQUNMLE9BQU87UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU87UUFDUCxXQUFXLEVBQUUsTUFBTTtRQUNuQixjQUFjO1FBQ2QsV0FBVyxFQUFFLENBQUMsb0NBQXFCLENBQUM7UUFDcEMsV0FBVztRQUNYLGlCQUFpQixFQUFFLEVBQUU7UUFDckIsdUJBQXVCO1FBQ3ZCLEtBQUssRUFBRSxDQUFDO0tBQ08sQ0FBQztBQUNwQixDQUFDLENBQUMifQ==