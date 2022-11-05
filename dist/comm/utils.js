"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const decorator_1 = require("@midwayjs/decorator");
const ipdb = require("ipip-ipdb");
const _ = require("lodash");
/**
 * 幫助類
 */
let Utils = class Utils {
    /**
     * 獲得請求IP
     */
    async getReqIP(ctx) {
        const req = ctx.req;
        return (req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress.replace('::ffff:', ''));
    }
    /**
     * 根據IP獲得請求地址
     * @param ip 為空時則為當前請求的IP地址
     */
    async getIpAddr(ctx, ip) {
        try {
            if (!ip) {
                ip = await this.getReqIP(ctx);
            }
            const bst = new ipdb.BaseStation(`${this.baseDir}/comm/ipipfree.ipdb`);
            const result = bst.findInfo(ip, 'CN');
            const addArr = [];
            if (result) {
                addArr.push(result.countryName);
                addArr.push(result.regionName);
                addArr.push(result.cityName);
                return _.uniq(addArr).join('');
            }
        }
        catch (err) {
            console.log(err);
            return '無法獲取地址信息';
        }
    }
    /**
     * 去除對象的空值屬性
     * @param obj
     */
    async removeEmptyP(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] === null || obj[key] === '' || obj[key] === 'undefined') {
                delete obj[key];
            }
        });
    }
    /**
     * 線程阻塞毫秒數
     * @param ms
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * 隨機字串長度
     * @param len
     */
    randomString(len) {
        let maxLen = 8, min = Math.pow(16, Math.min(len, maxLen) - 1), max = Math.pow(16, Math.min(len, maxLen)) - 1, n = Math.floor(Math.random() * (max - min + 1)) + min, r = n.toString(16);
        while (r.length < len) {
            r = r + this.randomString(len - maxLen);
        }
        return r;
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], Utils.prototype, "baseDir", void 0);
Utils = __decorate([
    (0, decorator_1.Provide)()
], Utils);
exports.Utils = Utils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3Byb2plY3QvYm9uZGluZy9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsiY29tbS91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFFdEQsa0NBQWtDO0FBQ2xDLDRCQUE0QjtBQUU1Qjs7R0FFRztBQUVILElBQWEsS0FBSyxHQUFsQixNQUFhLEtBQUs7SUFJaEI7O09BRUc7SUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQVk7UUFDekIsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixPQUFPLENBQ0wsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUM5QixHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUNoRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBWSxFQUFFLEVBQXNCO1FBQ2xELElBQUk7WUFDRixJQUFJLENBQUMsRUFBRSxFQUFFO2dCQUNQLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0I7WUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTyxVQUFVLENBQUM7U0FDbkI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdCLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLEVBQUU7Z0JBQ3BFLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLEVBQUU7UUFDTixPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFZLENBQUMsR0FBVztRQUN0QixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQ1osR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUM3QyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQzdDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQ3JELENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDckIsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztTQUN6QztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztDQUNGLENBQUE7QUF4RUM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O3NDQUNEO0FBRkcsS0FBSztJQURqQixJQUFBLG1CQUFPLEdBQUU7R0FDRyxLQUFLLENBMEVqQjtBQTFFWSxzQkFBSyJ9