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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseOpenController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const login_1 = require("../../dto/admin/login");
const login_2 = require("../../service/sys/login");
const param_1 = require("../../service/sys/param");
const validate_1 = require("@midwayjs/validate");
/**
 * 不需要登录的后台接口
 */
let BaseOpenController = class BaseOpenController extends core_1.BaseController {
    /**
     * 实体信息与路径
     * @returns
     */
    async getEps() {
        return this.ok(this.eps.admin);
    }
    /**
     * 根据配置参数key获得网页内容(富文本)
     */
    async htmlByKey(key) {
        this.ctx.body = await this.baseSysParamService.htmlByKey(key);
    }
    /**
     * 登录
     * @param login
     */
    async login(login) {
        return this.ok(await this.baseSysLoginService.login(login));
    }
    /**
     * 获得验证码
     */
    async captcha(type, width, height) {
        return this.ok(await this.baseSysLoginService.captcha(type, width, height));
    }
    /**
     * 刷新token
     */
    async refreshToken(refreshToken) {
        return this.ok(await this.baseSysLoginService.refreshToken(refreshToken));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", login_2.BaseSysLoginService)
], BaseOpenController.prototype, "baseSysLoginService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", param_1.BaseSysParamService)
], BaseOpenController.prototype, "baseSysParamService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseOpenController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", core_1.CoolEps)
], BaseOpenController.prototype, "eps", void 0);
__decorate([
    (0, decorator_1.Get)('/eps', { summary: '实体信息与路径' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "getEps", null);
__decorate([
    (0, decorator_1.Get)('/html', { summary: '获得网页内容的参数值' }),
    __param(0, (0, decorator_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "htmlByKey", null);
__decorate([
    (0, decorator_1.Post)('/login', { summary: '登录' }),
    (0, validate_1.Validate)(),
    __param(0, (0, decorator_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "login", null);
__decorate([
    (0, decorator_1.Get)('/captcha', { summary: '验证码' }),
    __param(0, (0, decorator_1.Query)('type')),
    __param(1, (0, decorator_1.Query)('width')),
    __param(2, (0, decorator_1.Query)('height')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "captcha", null);
__decorate([
    (0, decorator_1.Get)('/refreshToken', { summary: '刷新token' }),
    __param(0, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BaseOpenController.prototype, "refreshToken", null);
BaseOpenController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)()
], BaseOpenController);
exports.BaseOpenController = BaseOpenController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Blbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9jb250cm9sbGVyL2FkbWluL29wZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbURBQThFO0FBQzlFLDRDQUE0RTtBQUM1RSxpREFBaUQ7QUFDakQsbURBQThEO0FBQzlELG1EQUE4RDtBQUU5RCxpREFBOEM7QUFFOUM7O0dBRUc7QUFHSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLHFCQUFjO0lBYXBEOzs7T0FHRztJQUVJLEtBQUssQ0FBQyxNQUFNO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUVILEtBQUssQ0FBQyxTQUFTLENBQWUsR0FBVztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUdILEtBQUssQ0FBQyxLQUFLLENBQVMsS0FBZTtRQUNqQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLE9BQU8sQ0FDSSxJQUFZLEVBQ1gsS0FBYSxFQUNaLE1BQWM7UUFFL0IsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVEOztPQUVHO0lBRUgsS0FBSyxDQUFDLFlBQVksQ0FBVSxZQUFvQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUNGLENBQUE7QUF6REM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1ksMkJBQW1COytEQUFDO0FBR3pDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNZLDJCQUFtQjsrREFBQztBQUd6QztJQURDLElBQUEsa0JBQU0sR0FBRTs7K0NBQ0k7QUFHYjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDSixjQUFPOytDQUFDO0FBT2I7SUFEQyxJQUFBLGVBQUcsRUFBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7Ozs7Z0RBR25DO0FBTUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUM7SUFDdkIsV0FBQSxJQUFBLGlCQUFLLEVBQUMsS0FBSyxDQUFDLENBQUE7Ozs7bURBRTVCO0FBUUQ7SUFGQyxJQUFBLGdCQUFJLEVBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2pDLElBQUEsbUJBQVEsR0FBRTtJQUNFLFdBQUEsSUFBQSxnQkFBSSxHQUFFLENBQUE7O3FDQUFRLGdCQUFROzsrQ0FFbEM7QUFNRDtJQURDLElBQUEsZUFBRyxFQUFDLFVBQVUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUVqQyxXQUFBLElBQUEsaUJBQUssRUFBQyxNQUFNLENBQUMsQ0FBQTtJQUNiLFdBQUEsSUFBQSxpQkFBSyxFQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2QsV0FBQSxJQUFBLGlCQUFLLEVBQUMsUUFBUSxDQUFDLENBQUE7Ozs7aURBR2pCO0FBTUQ7SUFEQyxJQUFBLGVBQUcsRUFBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDekIsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7OztzREFFMUI7QUExRFUsa0JBQWtCO0lBRjlCLElBQUEsbUJBQU8sR0FBRTtJQUNULElBQUEscUJBQWMsR0FBRTtHQUNKLGtCQUFrQixDQTJEOUI7QUEzRFksZ0RBQWtCIn0=