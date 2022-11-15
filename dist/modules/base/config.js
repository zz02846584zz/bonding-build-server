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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvcHJvamVjdC9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdEQUFrRTtBQUNsRSxvREFBOEQ7QUFDOUQsMENBQXFEO0FBR3JEOztHQUVHO0FBQ0gsa0JBQWUsR0FBRyxFQUFFO0lBQ2xCLE9BQU87UUFDTCxPQUFPO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixPQUFPO1FBQ1AsV0FBVyxFQUFFLHFCQUFxQjtRQUNsQyxNQUFNO1FBQ04saUJBQWlCLEVBQUU7WUFDakIsb0NBQXVCO1lBQ3ZCLGdDQUFxQjtZQUNyQix1QkFBaUI7U0FDbEI7UUFDRCxpQkFBaUI7UUFDakIsR0FBRyxFQUFFO1lBQ0gsT0FBTztZQUNQLEdBQUcsRUFBRSxLQUFLO1lBQ1Ysa0JBQWtCO1lBQ2xCLE1BQU0sRUFBRSxrQkFBa0I7WUFDMUIsUUFBUTtZQUNSLEtBQUssRUFBRTtnQkFDTCxvQkFBb0I7Z0JBQ3BCLE1BQU0sRUFBRSxFQUFFLEdBQUcsSUFBSTtnQkFDakIscUJBQXFCO2dCQUNyQixhQUFhLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFO2FBQzlCO1NBQ0Y7S0FDYyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyJ9