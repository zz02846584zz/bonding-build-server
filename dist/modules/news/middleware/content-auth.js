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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1hdXRoLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvbmV3cy9taWRkbGV3YXJlL2NvbnRlbnQtYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtREFBaUQ7QUFJakQ7O0dBRUc7QUFFSCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQUdoQyxPQUFPO1FBQ0wsT0FBTyxLQUFLLEVBQUUsR0FBWSxFQUFFLElBQWtCLEVBQUUsRUFBRTtZQUNoRCxZQUFZO1lBQ1osTUFBTSxJQUFJLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBVFkscUJBQXFCO0lBRGpDLElBQUEsc0JBQVUsR0FBRTtHQUNBLHFCQUFxQixDQVNqQztBQVRZLHNEQUFxQiJ9