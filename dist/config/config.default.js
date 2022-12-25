"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("@cool-midway/file");
// import * as redisStore from 'cache-manager-ioredis';
const fsStore = require("cache-manager-fs-hash");
exports.default = {
    // 修改成你自己独有的key
    keys: 'cool-admin for node',
    koa: {
        port: 8001,
    },
    // 文件上传
    upload: {
        fileSize: '200mb',
        whitelist: null,
    },
    // 模板渲染
    view: {
        mapping: {
            '.html': 'ejs',
        },
    },
    // 本地缓存
    cache: {
        store: fsStore,
        options: {
            path: 'cache',
            ttl: -1,
        },
    },
    // redis缓存
    //   cache: {
    //     store: redisStore,
    //     options: {
    //       host: '127.0.0.1',
    //       port: 6379,
    //       password: '',
    //       db: 1,
    //       ttl: null,
    //     },
    //   },
    // cool配置
    cool: {
        // redis: {
        //   host: '127.0.0.1',
        //   port: 6379,
        //   db: 0,
        // },
        // 是否自动导入数据库
        file: {
            // 上传模式 本地上传或云存储
            mode: file_1.MODETYPE.LOCAL,
            // 本地上传 文件地址前缀，当且仅当mode为LOCAL时生效
            domain: 'https://bondingtechs.com',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQTZDO0FBRTdDLHVEQUF1RDtBQUN2RCxpREFBaUQ7QUFFakQsa0JBQWU7SUFDYixlQUFlO0lBQ2YsSUFBSSxFQUFFLHFCQUFxQjtJQUMzQixHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsT0FBTztJQUNQLE1BQU0sRUFBRTtRQUNOLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsT0FBTztJQUNQLElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELE9BQU87SUFDUCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsT0FBTztRQUNkLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPO1lBQ2IsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUNSO0tBQ0Y7SUFDRCxVQUFVO0lBQ1YsYUFBYTtJQUNiLHlCQUF5QjtJQUN6QixpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLG9CQUFvQjtJQUNwQixzQkFBc0I7SUFDdEIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixTQUFTO0lBQ1QsT0FBTztJQUNQLFNBQVM7SUFDVCxJQUFJLEVBQUU7UUFDSixXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLGdCQUFnQjtRQUNoQixXQUFXO1FBQ1gsS0FBSztRQUNMLFlBQVk7UUFDWixJQUFJLEVBQUU7WUFDSixnQkFBZ0I7WUFDaEIsSUFBSSxFQUFFLGVBQVEsQ0FBQyxLQUFLO1lBQ3BCLGdDQUFnQztZQUNoQyxNQUFNLEVBQUUsMEJBQTBCO1NBQ25DO0tBQ1k7Q0FLZCxDQUFDIn0=