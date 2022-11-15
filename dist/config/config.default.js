"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("@cool-midway/file");
exports.default = {
    keys: 'cool-admin for node',
    koa: {
        port: 8001,
    },
    upload: {
        fileSize: '200mb',
    },
    view: {
        mapping: {
            '.html': 'ejs',
        },
    },
    bodyParser: {
        formLimit: '30mb',
        jsonLimit: '30mb',
        textLimit: '30mb',
    },
    cool: {
        file: {
            mode: file_1.MODETYPE.LOCAL,
            domain: 'http://webdemo-tw.com',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9wcm9qZWN0L3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJjb25maWcvY29uZmlnLmRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw0Q0FBNkM7QUFHN0Msa0JBQWU7SUFDYixJQUFJLEVBQUUscUJBQXFCO0lBQzNCLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxJQUFJO0tBQ1g7SUFDRCxNQUFNLEVBQUU7UUFDTixRQUFRLEVBQUUsT0FBTztLQUNsQjtJQUNELElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRTtZQUNQLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELFVBQVUsRUFBRTtRQUNWLFNBQVMsRUFBRSxNQUFNO1FBQ2pCLFNBQVMsRUFBRSxNQUFNO1FBQ2pCLFNBQVMsRUFBRSxNQUFNO0tBQ2xCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLGVBQVEsQ0FBQyxLQUFLO1lBQ3BCLE1BQU0sRUFBRSx1QkFBdUI7U0FDaEM7S0FDWTtDQUNBLENBQUMifQ==