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
exports.BaseSysPermsService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const menu_1 = require("./menu");
const role_1 = require("./role");
const department_1 = require("./department");
const cache_1 = require("@midwayjs/cache");
/**
 * 权限
 */
let BaseSysPermsService = class BaseSysPermsService extends core_1.BaseService {
    /**
     * 刷新权限
     * @param userId 用户ID
     */
    async refreshPerms(userId) {
        var _a;
        const roleIds = await this.baseSysRoleService.getByUser(userId);
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        await this.cacheManager.set(`admin:perms:${userId}`, perms);
        // 更新部门权限
        const departments = await this.baseSysDepartmentService.getByRoleIds(roleIds, ((_a = this.ctx.admin) === null || _a === void 0 ? void 0 : _a.username) === 'admin');
        await this.cacheManager.set(`admin:department:${userId}`, departments);
    }
    /**
     * 获得权限菜单
     * @param roleIds
     */
    async permmenu(roleIds) {
        const perms = await this.baseSysMenuService.getPerms(roleIds);
        const menus = await this.baseSysMenuService.getMenus(roleIds, this.ctx.admin.username === 'admin');
        return { perms, menus };
    }
    /**
     * 根据用户ID获得部门权限
     * @param userId
     * @return 部门ID数组
     */
    async departmentIds(userId) {
        const department = await this.cacheManager.get(`admin:department:${userId}`);
        if (department) {
            return department;
        }
        else {
            return [];
        }
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cache_1.CacheManager)
], BaseSysPermsService.prototype, "cacheManager", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", menu_1.BaseSysMenuService)
], BaseSysPermsService.prototype, "baseSysMenuService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", role_1.BaseSysRoleService)
], BaseSysPermsService.prototype, "baseSysRoleService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", department_1.BaseSysDepartmentService)
], BaseSysPermsService.prototype, "baseSysDepartmentService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysPermsService.prototype, "ctx", void 0);
BaseSysPermsService = __decorate([
    (0, decorator_1.Provide)()
], BaseSysPermsService);
exports.BaseSysPermsService = BaseSysPermsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybXMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2t1cm91L3RlbXBsYXRlL2JvbmRpbmctcmVuZXcvYm9uZGluZy1zZXJ2ZXIvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlcy9iYXNlL3NlcnZpY2Uvc3lzL3Blcm1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFDaEQsaUNBQTRDO0FBQzVDLGlDQUE0QztBQUM1Qyw2Q0FBd0Q7QUFFeEQsMkNBQStDO0FBRS9DOztHQUVHO0FBRUgsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxrQkFBVztJQWdCbEQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNOztRQUN2QixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsZUFBZSxNQUFNLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1RCxTQUFTO1FBQ1QsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsWUFBWSxDQUNsRSxPQUFPLEVBQ1AsQ0FBQSxNQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSywwQ0FBRSxRQUFRLE1BQUssT0FBTyxDQUNyQyxDQUFDO1FBQ0YsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsTUFBTSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBaUI7UUFDOUIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FDbEQsT0FBTyxFQUNQLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQ3BDLENBQUM7UUFDRixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFjO1FBQ2hDLE1BQU0sVUFBVSxHQUFRLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ2pELG9CQUFvQixNQUFNLEVBQUUsQ0FDN0IsQ0FBQztRQUNGLElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxVQUFVLENBQUM7U0FDbkI7YUFBTTtZQUNMLE9BQU8sRUFBRSxDQUFDO1NBQ1g7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTFEQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDSyxvQkFBWTt5REFBQztBQUczQjtJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDVyx5QkFBa0I7K0RBQUM7QUFHdkM7SUFEQyxJQUFBLGtCQUFNLEdBQUU7OEJBQ1cseUJBQWtCOytEQUFDO0FBR3ZDO0lBREMsSUFBQSxrQkFBTSxHQUFFOzhCQUNpQixxQ0FBd0I7cUVBQUM7QUFHbkQ7SUFEQyxJQUFBLGtCQUFNLEdBQUU7O2dEQUNJO0FBZEYsbUJBQW1CO0lBRC9CLElBQUEsbUJBQU8sR0FBRTtHQUNHLG1CQUFtQixDQTREL0I7QUE1RFksa0RBQW1CIn0=