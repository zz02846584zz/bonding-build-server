"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisStore = require("cache-manager-ioredis");
/**
 * 產品開發 npm run start 讀取的配置文件
 */
exports.default = {
    orm: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'bryan',
        password: 'f5_3Z~P/g3mVy2GC',
        database: 'bonding',
        // 自動建表
        synchronize: false,
        // 日誌
        logging: false,
        // 字符集
        charset: 'utf8mb4',
    },
    cool: {
        // 是否自動導入數據庫
        initDB: false,
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: '^2YbZM=;;_fVT^Z~',
            db: 0,
        },
    },
    cache: {
        store: redisStore,
        options: {
            host: '127.0.0.1',
            port: 6379,
            password: '^2YbZM=;;_fVT^Z~',
            db: 1,
            ttl: null,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnL2NvbmZpZy5wcm9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsb0RBQW9EO0FBRXBEOztHQUVHO0FBQ0gsa0JBQWU7SUFDYixHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxXQUFXO1FBQ2pCLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLE9BQU87UUFDakIsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixRQUFRLEVBQUUsU0FBUztRQUNuQixPQUFPO1FBQ1AsV0FBVyxFQUFFLEtBQUs7UUFDbEIsS0FBSztRQUNMLE9BQU8sRUFBRSxLQUFLO1FBQ2QsTUFBTTtRQUNOLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0lBQ0QsSUFBSSxFQUFFO1FBQ0osWUFBWTtRQUNaLE1BQU0sRUFBRSxLQUFLO1FBQ2IsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLEVBQUUsRUFBRSxDQUFDO1NBQ047S0FDWTtJQUNmLEtBQUssRUFBRTtRQUNMLEtBQUssRUFBRSxVQUFVO1FBQ2pCLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixFQUFFLEVBQUUsQ0FBQztZQUNMLEdBQUcsRUFBRSxJQUFJO1NBQ1Y7S0FDRjtDQUMrQixDQUFDIn0=