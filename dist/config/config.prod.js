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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJjb25maWcvY29uZmlnLnByb2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxvREFBb0Q7QUFFcEQ7O0dBRUc7QUFDSCxrQkFBZTtJQUNiLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxPQUFPO1FBQ2IsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLElBQUk7UUFDVixRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFFBQVEsRUFBRSxTQUFTO1FBQ25CLE9BQU87UUFDUCxXQUFXLEVBQUUsS0FBSztRQUNsQixLQUFLO1FBQ0wsT0FBTyxFQUFFLEtBQUs7UUFDZCxNQUFNO1FBQ04sT0FBTyxFQUFFLFNBQVM7S0FDbkI7SUFDRCxJQUFJLEVBQUU7UUFDSixZQUFZO1FBQ1osTUFBTSxFQUFFLEtBQUs7UUFDYixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsV0FBVztZQUNqQixJQUFJLEVBQUUsSUFBSTtZQUNWLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsRUFBRSxFQUFFLENBQUM7U0FDTjtLQUNZO0lBQ2YsS0FBSyxFQUFFO1FBQ0wsS0FBSyxFQUFFLFVBQVU7UUFDakIsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLEVBQUUsRUFBRSxDQUFDO1lBQ0wsR0FBRyxFQUFFLElBQUk7U0FDVjtLQUNGO0NBQytCLENBQUMifQ==