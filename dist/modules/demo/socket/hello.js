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
exports.HelloController = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 测试
 */
let HelloController = class HelloController {
    async onConnectionMethod() {
        console.log('on client connect', this.ctx.id);
        console.log('参数', this.ctx.handshake.query);
        this.ctx.emit('data', '连接成功');
    }
    async gotMessage(data) {
        console.log('on data got', this.ctx.id, data);
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], HelloController.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.OnWSConnection)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HelloController.prototype, "onConnectionMethod", null);
__decorate([
    (0, decorator_1.OnWSMessage)('myEvent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HelloController.prototype, "gotMessage", null);
HelloController = __decorate([
    (0, decorator_1.WSController)('/')
], HelloController);
exports.HelloController = HelloController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9kZW1vL3NvY2tldC9oZWxsby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFLNkI7QUFFN0I7O0dBRUc7QUFFSCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBSzFCLEtBQUssQ0FBQyxrQkFBa0I7UUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBR0QsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJO1FBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRixDQUFBO0FBYkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OzRDQUNJO0FBR2I7SUFEQyxJQUFBLDBCQUFjLEdBQUU7Ozs7eURBS2hCO0FBR0Q7SUFEQyxJQUFBLHVCQUFXLEVBQUMsU0FBUyxDQUFDOzs7O2lEQUd0QjtBQWRVLGVBQWU7SUFEM0IsSUFBQSx3QkFBWSxFQUFDLEdBQUcsQ0FBQztHQUNMLGVBQWUsQ0FlM0I7QUFmWSwwQ0FBZSJ9