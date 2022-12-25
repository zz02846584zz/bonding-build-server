"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const demo_1 = require("./middleware/demo");
/**
 * 模块配置
 */
exports.default = () => {
    return {
        // 模块名称
        name: 'xxx',
        // 模块描述
        description: 'xxx',
        // 中间件，只对本模块有效
        middlewares: [demo_1.DemoMiddleware],
        // 中间件，全局有效
        globalMiddlewares: [],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
        // 其他配置
        a: 1,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVtby9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBbUQ7QUFFbkQ7O0dBRUc7QUFDSCxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTztRQUNMLE9BQU87UUFDUCxJQUFJLEVBQUUsS0FBSztRQUNYLE9BQU87UUFDUCxXQUFXLEVBQUUsS0FBSztRQUNsQixjQUFjO1FBQ2QsV0FBVyxFQUFFLENBQUMscUJBQWMsQ0FBQztRQUM3QixXQUFXO1FBQ1gsaUJBQWlCLEVBQUUsRUFBRTtRQUNyQix1QkFBdUI7UUFDdkIsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPO1FBQ1AsQ0FBQyxFQUFFLENBQUM7S0FDVyxDQUFDO0FBQ3BCLENBQUMsQ0FBQyJ9