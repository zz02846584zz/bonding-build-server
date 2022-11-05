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
exports.BaseSysRoleService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const role_1 = require("../../entity/sys/role");
const user_role_1 = require("../../entity/sys/user_role");
const _ = require("lodash");
const role_menu_1 = require("../../entity/sys/role_menu");
const role_department_1 = require("../../entity/sys/role_department");
const perms_1 = require("./perms");
const typeorm_2 = require("typeorm");
/**
 * 角色
 */
let BaseSysRoleService = class BaseSysRoleService extends core_1.BaseService {
    /**
     * 根据用户ID获得所有用户角色
     * @param userId
     */
    async getByUser(userId) {
        const userRole = await this.baseSysUserRoleEntity.find({ userId });
        if (!_.isEmpty(userRole)) {
            return userRole.map(e => {
                return e.roleId;
            });
        }
        return [];
    }
    /**
     *
     * @param param
     */
    async modifyAfter(param) {
        if (param.id) {
            this.updatePerms(param.id, param.menuIdList, param.departmentIdList);
        }
    }
    /**
     * 更新权限
     * @param roleId
     * @param menuIdList
     * @param departmentIds
     */
    async updatePerms(roleId, menuIdList, departmentIds = []) {
        // 更新菜单权限
        await this.baseSysRoleMenuEntity.delete({ roleId });
        for (const e of menuIdList) {
            await this.baseSysRoleMenuEntity.save({ roleId, menuId: e });
        }
        // 更新部门权限
        await this.baseSysRoleDepartmentEntity.delete({ roleId });
        for (const departmentId of departmentIds) {
            await this.baseSysRoleDepartmentEntity.save({ roleId, departmentId });
        }
        // 刷新权限
        const userRoles = await this.baseSysUserRoleEntity.find({ roleId });
        for (const userRole of userRoles) {
            await this.baseSysPermsService.refreshPerms(userRole.userId);
        }
    }
    /**
     * 角色信息
     * @param id
     */
    async info(id) {
        const info = await this.baseSysRoleEntity.findOne({ id });
        if (info) {
            const menus = await this.baseSysRoleMenuEntity.find(id !== 1 ? { roleId: id } : {});
            const menuIdList = menus.map(e => {
                return parseInt(e.menuId + '');
            });
            const departments = await this.baseSysRoleDepartmentEntity.find(id !== 1 ? { roleId: id } : {});
            const departmentIdList = departments.map(e => {
                return parseInt(e.departmentId + '');
            });
            return {
                ...info,
                menuIdList,
                departmentIdList,
            };
        }
        return {};
    }
    async list() {
        return this.baseSysRoleEntity
            .createQueryBuilder()
            .where(new typeorm_2.Brackets(qb => {
            qb.where('id !=:id', { id: 1 }); // 超级管理员的角色不展示
            // 如果不是超管，只能看到自己新建的或者自己有的角色
            if (this.ctx.admin.username !== 'admin') {
                qb.andWhere('(userId=:userId or id in (:roleId))', {
                    userId: this.ctx.admin.userId,
                    roleId: this.ctx.admin.roleIds,
                });
            }
        }))
            .getMany();
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(role_1.BaseSysRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysRoleService.prototype, "baseSysRoleEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysRoleService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(role_menu_1.BaseSysRoleMenuEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysRoleService.prototype, "baseSysRoleMenuEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(role_department_1.BaseSysRoleDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysRoleService.prototype, "baseSysRoleDepartmentEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysRoleService.prototype, "baseSysPermsService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysRoleService.prototype, "ctx", void 0);
BaseSysRoleService = __decorate([
    (0, decorator_1.Provide)()
], BaseSysRoleService);
exports.BaseSysRoleService = BaseSysRoleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL2Jhc2Uvc2VydmljZS9zeXMvcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFDdEQsNENBQWdEO0FBQ2hELHVDQUFrRDtBQUNsRCxxQ0FBcUM7QUFDckMsZ0RBQTBEO0FBQzFELDBEQUFtRTtBQUNuRSw0QkFBNEI7QUFDNUIsMERBQW1FO0FBQ25FLHNFQUErRTtBQUMvRSxtQ0FBOEM7QUFDOUMscUNBQW1DO0FBRW5DOztHQUVHO0FBRUgsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxrQkFBVztJQW1CakQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFjO1FBQzVCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDeEIsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN0QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSztRQUNyQixJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxXQUFXLENBQUMs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