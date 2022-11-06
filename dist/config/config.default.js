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
            domain: 'http://webdemo-tw.com/',
        },
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnL2NvbmZpZy5kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNENBQTZDO0FBRzdDLGtCQUFlO0lBQ2IsSUFBSSxFQUFFLHFCQUFxQjtJQUMzQixHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsSUFBSTtLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sUUFBUSxFQUFFLE9BQU87S0FDbEI7SUFDRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsS0FBSztTQUNmO0tBQ0Y7SUFDRCxVQUFVLEVBQUU7UUFDVixTQUFTLEVBQUUsTUFBTTtRQUNqQixTQUFTLEVBQUUsTUFBTTtRQUNqQixTQUFTLEVBQUUsTUFBTTtLQUNsQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxlQUFRLENBQUMsS0FBSztZQUNwQixNQUFNLEVBQUUsd0JBQXdCO1NBQ2pDO0tBQ1k7Q0FDQSxDQUFDIn0=