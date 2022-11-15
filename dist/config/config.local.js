"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redisStore = require("cache-manager-ioredis");
/**
 * 本地開發 npm run dev 讀取的配置文件
 */
exports.default = {
    orm: {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'bonding',
        // 自動建表 注意：線上部署的時候不要使用，有可能導致數據丟失
        synchronize: true,
        // 打印日誌
        logging: true,
        // 字符集
        charset: 'utf8mb4',
    },
    cool: {
        // 是否自動導入數據庫
        initDB: true,
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: '',
            db: 0,
        },
    },
    cache: {
        store: redisStore,
        options: {
            host: '127.0.0.1',
            port: 6379,
            password: '',
            db: 1,
            ttl: null,
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvcHJvamVjdC9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnL2NvbmZpZy5sb2NhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLG9EQUFvRDtBQUVwRDs7R0FFRztBQUNILGtCQUFlO0lBQ2IsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSxFQUFFO1FBQ1osUUFBUSxFQUFFLFNBQVM7UUFDbkIsZ0NBQWdDO1FBQ2hDLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE9BQU87UUFDUCxPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU07UUFDTixPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELElBQUksRUFBRTtRQUNKLFlBQVk7UUFDWixNQUFNLEVBQUUsSUFBSTtRQUNaLEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLEVBQUU7WUFDWixFQUFFLEVBQUUsQ0FBQztTQUNOO0tBQ1k7SUFDZixLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsVUFBVTtRQUNqQixPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxFQUFFO1lBQ1osRUFBRSxFQUFFLENBQUM7WUFDTCxHQUFHLEVBQUUsSUFBSTtTQUNWO0tBQ0Y7Q0FDK0IsQ0FBQyJ9