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
exports.WelcomeController = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 欢迎界面
 */
let WelcomeController = class WelcomeController {
    async welcome() {
        await this.ctx.render('welcome', {
            text: 'HELLO COOL-ADMIN 5.x 一个项目只用COOL就够了！！！',
        });
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], WelcomeController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WelcomeController.prototype, "welcome", null);
WelcomeController = __decorate([
    (0, decorator_1.Controller)('/')
], WelcomeController);
exports.WelcomeController = WelcomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJ3ZWxjb21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUE4RDtBQUc5RDs7R0FFRztBQUVILElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBS3JCLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQy9CLElBQUksRUFBRSx1Q0FBdUM7U0FDOUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUE7QUFSQztJQURDLElBQUEsa0JBQU0sR0FBRTs7OENBQ0k7QUFHYjtJQURDLElBQUEsZUFBRyxFQUFDLEdBQUcsQ0FBQzs7OztnREFLUjtBQVRVLGlCQUFpQjtJQUQ3QixJQUFBLHNCQUFVLEVBQUMsR0FBRyxDQUFDO0dBQ0gsaUJBQWlCLENBVTdCO0FBVlksOENBQWlCIn0=