"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsContentMiddleware = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 描述
 */
let NewsContentMiddleware = class NewsContentMiddleware {
    resolve() {
        return async (ctx, next) => {
            // 未登入隱藏文章內容
            await next();
        };
    }
};
NewsContentMiddleware = __decorate([
    (0, decorator_1.Middleware)()
], NewsContentMiddleware);
exports.NewsContentMiddleware = NewsContentMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1hdXRoLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvcHJvamVjdC9zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9uZXdzL21pZGRsZXdhcmUvY29udGVudC1hdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUFpRDtBQUlqRDs7R0FFRztBQUVILElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBR2hDLE9BQU87UUFDTCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQ2hELFlBQVk7WUFDWixNQUFNLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUFUWSxxQkFBcUI7SUFEakMsSUFBQSxzQkFBVSxHQUFFO0dBQ0EscUJBQXFCLENBU2pDO0FBVFksc0RBQXFCIn0=