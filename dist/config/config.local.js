"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 本地开发 npm run dev 读取的配置文件
 */
exports.default = {
    orm: {
        type: 'mysql',
        host: '192.168.64.3',
        port: 3306,
        username: 'bryan',
        password: 'monokuro8669',
        database: 'bonding_renew',
        // 自动建表 注意：线上部署的时候不要使用，有可能导致数据丢失
        synchronize: true,
        // 打印日志
        logging: false,
        // 字符集
        charset: 'utf8mb4',
    },
    cool: {
        // 是否自动导入数据库
        initDB: true,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImNvbmZpZy9jb25maWcubG9jYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQTs7R0FFRztBQUNILGtCQUFlO0lBQ2IsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsY0FBYztRQUNwQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLGdDQUFnQztRQUNoQyxXQUFXLEVBQUUsSUFBSTtRQUNqQixPQUFPO1FBQ1AsT0FBTyxFQUFFLEtBQUs7UUFDZCxNQUFNO1FBQ04sT0FBTyxFQUFFLFNBQVM7S0FDbkI7SUFDRCxJQUFJLEVBQUU7UUFDSixZQUFZO1FBQ1osTUFBTSxFQUFFLElBQUk7S0FDQztDQUNBLENBQUMifQ==