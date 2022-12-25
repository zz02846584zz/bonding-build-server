"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./middleware/log");
const app_auth_1 = require("./middleware/app-auth");
const admin_auth_1 = require("./middleware/admin-auth");
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
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 10,
        // jwt 生成解密token的
        jwt: {
            // 单点登录
            sso: false,
            // 注意： 最好重新修改，防止破解
            secret: 'FOAPOFALOEQIPNNLQ',
            // token
            token: {
                // 2小时过期，需要用刷新token
                expire: 2 * 3600,
                // 15天内，如果没操作过就需要重新登录
                refreshExpire: 24 * 3600 * 15,
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBcUQ7QUFFckQsb0RBQThEO0FBQzlELHdEQUFrRTtBQUVsRTs7R0FFRztBQUNILGtCQUFlLEdBQUcsRUFBRTtJQUNsQixPQUFPO1FBQ0wsT0FBTztRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTztRQUNQLFdBQVcsRUFBRSxxQkFBcUI7UUFDbEMsTUFBTTtRQUNOLGlCQUFpQixFQUFFO1lBQ2pCLG9DQUF1QjtZQUN2QixnQ0FBcUI7WUFDckIsdUJBQWlCO1NBQ2xCO1FBQ0QsdUJBQXVCO1FBQ3ZCLEtBQUssRUFBRSxFQUFFO1FBQ1QsaUJBQWlCO1FBQ2pCLEdBQUcsRUFBRTtZQUNILE9BQU87WUFDUCxHQUFHLEVBQUUsS0FBSztZQUNWLGtCQUFrQjtZQUNsQixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLFFBQVE7WUFDUixLQUFLLEVBQUU7Z0JBQ0wsbUJBQW1CO2dCQUNuQixNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUk7Z0JBQ2hCLHFCQUFxQjtnQkFDckIsYUFBYSxFQUFFLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRTthQUM5QjtTQUNGO0tBQ2MsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==