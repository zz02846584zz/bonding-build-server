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
exports.DemoAppTagController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
/**
 * 测试给URL打标签
 */
let DemoAppTagController = class DemoAppTagController extends core_1.BaseController {
    /**
     * 获得标签数据， 如可以标记忽略token的url，然后在中间件判断
     * @returns
     */
    async data() {
        return this.ok(this.tag.byKey(core_1.TagTypes.IGNORE_TOKEN));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", core_1.CoolUrlTagData)
], DemoAppTagController.prototype, "tag", void 0);
__decorate([
    (0, decorator_1.Get)('/data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemoAppTagController.prototype, "data", null);
DemoAppTagController = __decorate([
    (0, decorator_1.Provide)(),
    (0, core_1.CoolController)({
        api: [],
        entity: '',
        pageQueryOp: () => { },
    }),
    (0, core_1.CoolUrlTag)({
        key: core_1.TagTypes.IGNORE_TOKEN,
        value: ['add'],
    })
], DemoAppTagController);
exports.DemoAppTagController = DemoAppTagController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS90ZW1wbGF0ZS9ib25kaW5nLXJlbmV3L2JvbmRpbmctc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGVtby9jb250cm9sbGVyL2FwcC90YWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJEO0FBQzNELDRDQU0yQjtBQUUzQjs7R0FFRztBQVdILElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEscUJBQWM7SUFJdEQ7OztPQUdHO0lBRUgsS0FBSyxDQUFDLElBQUk7UUFDUixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGLENBQUE7QUFWQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDSixxQkFBYztpREFBQztBQU9wQjtJQURDLElBQUEsZUFBRyxFQUFDLE9BQU8sQ0FBQzs7OztnREFHWjtBQVhVLG9CQUFvQjtJQVZoQyxJQUFBLG1CQUFPLEdBQUU7SUFDVCxJQUFBLHFCQUFjLEVBQUM7UUFDZCxHQUFHLEVBQUUsRUFBRTtRQUNQLE1BQU0sRUFBRSxFQUFFO1FBQ1YsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7S0FDdEIsQ0FBQztJQUNELElBQUEsaUJBQVUsRUFBQztRQUNWLEdBQUcsRUFBRSxlQUFRLENBQUMsWUFBWTtRQUMxQixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDZixDQUFDO0dBQ1csb0JBQW9CLENBWWhDO0FBWlksb0RBQW9CIn0=