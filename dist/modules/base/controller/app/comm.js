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
exports.BaseAppCommController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const file_1 = require("@cool-midway/file");
/**
 * 不需要登录的后台接口
 */
let BaseAppCommController = class BaseAppCommController extends core_1.BaseController {
    /**
     * 实体信息与路径
     * @returns
     */
    async getEps() {
        return this.ok(this.eps);
    }
    /**
     * 文件上传
     */
    async upload() {
        return this.ok(await this.coolFile.upload(this.ctx));
    }
    urlToFile(url, filename, mimeType) {
        return fetch(url)
            .then(res => {
            return res.arrayBuffer();
        })
            .then(buf => {
            return new File([buf], filename, { type: mimeType });
        });
    }
    /**
     * 文件上传模式，本地或者云存储
     */
    async uploadMode() {
        return this.ok(await this.coolFile.getMode());
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", file_1.CoolFile)
], BaseAppCommController.prototype, "coolFile", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseAppCommController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", core_1.CoolEps)
], BaseAppCommController.prototype, "eps", void 0);
__decorate([
    (0, decorator_1.Get)('/eps', { summary: '实体信息与路径' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "getEps", null);
__decorate([
    (0, decorator_1.Post)('/upload', { summary: '文件上传' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "upload", null);
__decorate([
    (0, decorator_1.Get)('/uploadMode', { summary: '文件上传模式' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseAppCommController.prototype, "uploadMode", null);
BaseAppCommController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)('/app/comm')
], BaseAppCommController);
exports.BaseAppCommController = BaseAppCommController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvY29udHJvbGxlci9hcHAvY29tbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBaUU7QUFDakUsNENBQTRFO0FBRTVFLDRDQUE2QztBQUU3Qzs7R0FFRztBQUdILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEscUJBQWM7SUFVdkQ7OztPQUdHO0lBRUksS0FBSyxDQUFDLE1BQU07UUFDakIsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFFSCxLQUFLLENBQUMsTUFBTTtRQUNWLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxTQUFTLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxRQUFRO1FBQy9CLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNkLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNWLE9BQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNWLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxVQUFVO1FBQ2QsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRixDQUFBO0FBMUNDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNDLGVBQVE7dURBQUM7QUFHbkI7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O2tEQUNJO0FBR2I7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ0osY0FBTztrREFBQztBQU9iO0lBREMsSUFBQSxlQUFHLEVBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDOzs7O21EQUduQztBQU1EO0lBREMsSUFBQSxnQkFBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQzs7OzttREFHcEM7QUFnQkQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7Ozs7dURBR3pDO0FBM0NVLHFCQUFxQjtJQUZqQyxJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUMsV0FBVyxDQUFDO0dBQ2YscUJBQXFCLENBNENqQztBQTVDWSxzREFBcUIifQ==