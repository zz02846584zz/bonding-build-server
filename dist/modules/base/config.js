"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_auth_1 = require("./middleware/admin-auth");
const app_auth_1 = require("./middleware/app-auth");
const log_1 = require("./middleware/log");
/**
 * 模块的配置
 */
exports.default = () => {
    return {
        // 模块名称
        name: '权限管理',
        // 模块描述
        description: '基础的权限管理功能，包括登录，权限校验',
        // 中间件
        globalMiddlewares: [
            admin_auth_1.BaseAdminAuthMiddleware,
            app_auth_1.BaseAppAuthMiddleware,
            log_1.BaseLogMiddleware,
        ],
        // jwt 生成解密token的
        jwt: {
            // 单点登录
            sso: false,
            // 注意： 最好重新修改，防止破解
            secret: 'kY8P8akBqkWrXPQC',
            // token
            token: {
                // 24小时过期，需要用刷新token
                expire: 24 * 3600,
                // 15天内，如果没操作过就需要重新登录
                refreshExpire: 24 * 3600 * 15,
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3REFBa0U7QUFDbEUsb0RBQThEO0FBQzlELDBDQUFxRDtBQUdyRDs7R0FFRztBQUNILGtCQUFlLEdBQUcsRUFBRTtJQUNsQixPQUFPO1FBQ0wsT0FBTztRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTztRQUNQLFdBQVcsRUFBRSxxQkFBcUI7UUFDbEMsTUFBTTtRQUNOLGlCQUFpQixFQUFFO1lBQ2pCLG9DQUF1QjtZQUN2QixnQ0FBcUI7WUFDckIsdUJBQWlCO1NBQ2xCO1FBQ0QsaUJBQWlCO1FBQ2pCLEdBQUcsRUFBRTtZQUNILE9BQU87WUFDUCxHQUFHLEVBQUUsS0FBSztZQUNWLGtCQUFrQjtZQUNsQixNQUFNLEVBQUUsa0JBQWtCO1lBQzFCLFFBQVE7WUFDUixLQUFLLEVBQUU7Z0JBQ0wsb0JBQW9CO2dCQUNwQixNQUFNLEVBQUUsRUFBRSxHQUFHLElBQUk7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsYUFBYSxFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRTthQUM5QjtTQUNGO0tBQ2MsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==