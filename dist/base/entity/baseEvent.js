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
exports.BaseEventEntity = void 0;
const core_1 = require("@cool-midway/core");
const typeorm_1 = require("typeorm");
class BaseEventEntity extends core_1.BaseEntity {
}
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '建立用戶ID', type: 'bigint' }),
    __metadata("design:type", Number)
], BaseEventEntity.prototype, "createBy", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ comment: '更新用戶ID', type: 'bigint' }),
    __metadata("design:type", Number)
], BaseEventEntity.prototype, "updateBy", void 0);
exports.BaseEventEntity = BaseEventEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZUV2ZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9rdXJvdS9wcm9qZWN0L2JvbmRpbmcvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbImJhc2UvZW50aXR5L2Jhc2VFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBK0M7QUFDL0MscUNBQXdDO0FBRXhDLE1BQWEsZUFBZ0IsU0FBUSxpQkFBVTtDQVE5QztBQUxDO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7aURBQzdCO0FBSWpCO0lBRkMsSUFBQSxlQUFLLEdBQUU7SUFDUCxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7aURBQzdCO0FBUG5CLDBDQVFDIn0=