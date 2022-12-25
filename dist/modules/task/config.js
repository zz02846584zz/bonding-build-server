"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("./middleware/task");
/**
 * 模块配置
 */
exports.default = () => {
    return {
        // 模块名称
        name: '任务调度',
        // 模块描述
        description: '任务调度模块，支持分布式任务，由redis整个集群的任务',
        // 中间件
        middlewares: [task_1.TaskMiddleware],
        // 模块加载顺序，默认为0，值越大越优先加载
        order: 0,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvdGFzay9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBbUQ7QUFFbkQ7O0dBRUc7QUFDSCxrQkFBZSxHQUFHLEVBQUU7SUFDbEIsT0FBTztRQUNMLE9BQU87UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU87UUFDUCxXQUFXLEVBQUUsOEJBQThCO1FBQzNDLE1BQU07UUFDTixXQUFXLEVBQUUsQ0FBQyxxQkFBYyxDQUFDO1FBQzdCLHVCQUF1QjtRQUN2QixLQUFLLEVBQUUsQ0FBQztLQUNPLENBQUM7QUFDcEIsQ0FBQyxDQUFDIn0=