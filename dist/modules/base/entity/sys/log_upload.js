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
exports.BaseSysLogUploadEntity = void 0;
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const baseEvent_1 = require("../../../../base/entity/baseEvent");
/**
 * 描述
 */
let BaseSysLogUploadEntity = class BaseSysLogUploadEntity extends baseEvent_1.BaseEventEntity {
};
__decorate([
    (0, typeorm_1.Column)({ comment: '地址' }),
    __metadata("design:type", String)
], BaseSysLogUploadEntity.prototype, "url", void 0);
BaseSysLogUploadEntity = __decorate([
    (0, orm_1.EntityModel)('base_sys_log_upload')
], BaseSysLogUploadEntity);
exports.BaseSysLogUploadEntity = BaseSysLogUploadEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nX3VwbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvdGVtcGxhdGUvYm9uZGluZy1yZW5ldy9ib25kaW5nLXNlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2UvZW50aXR5L3N5cy9sb2dfdXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHVDQUE0QztBQUM1QyxxQ0FBaUM7QUFDakMsaUVBQW9FO0FBRXBFOztHQUVHO0FBRUgsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSwyQkFBZTtDQUcxRCxDQUFBO0FBREM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7O21EQUNkO0FBRkQsc0JBQXNCO0lBRGxDLElBQUEsaUJBQVcsRUFBQyxxQkFBcUIsQ0FBQztHQUN0QixzQkFBc0IsQ0FHbEM7QUFIWSx3REFBc0IifQ==