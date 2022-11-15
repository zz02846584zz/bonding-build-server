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
exports.BaseSysDepartmentService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const department_1 = require("../../entity/sys/department");
const _ = require("lodash");
const role_department_1 = require("../../entity/sys/role_department");
const perms_1 = require("./perms");
/**
 * 描述
 */
let BaseSysDepartmentService = class BaseSysDepartmentService extends core_1.BaseService {
    /**
     * 获得部门菜单
     */
    async list() {
        // 部门权限
        const permsDepartmentArr = await this.baseSysPermsService.departmentIds(this.ctx.admin.userId);
        // 过滤部门权限
        const find = this.baseSysDepartmentEntity.createQueryBuilder();
        if (this.ctx.admin.username !== 'admin')
            find.andWhere('id in (:ids)', {
                ids: !_.isEmpty(permsDepartmentArr) ? permsDepartmentArr : [null],
            });
        find.addOrderBy('orderNum', 'ASC');
        const departments = await find.getMany();
        if (!_.isEmpty(departments)) {
            departments.forEach(e => {
                const parentMenu = departments.filter(m => {
                    e.parentId = parseInt(e.parentId + '');
                    if (e.parentId == m.id) {
                        return m.name;
                    }
                });
                if (!_.isEmpty(parentMenu)) {
                    e.parentName = parentMenu[0].name;
                }
            });
        }
        return departments;
    }
    /**
     * 根据多个ID获得部门权限信息
     * @param {[]} roleIds 数组
     * @param isAdmin 是否超管
     */
    async getByRoleIds(roleIds, isAdmin) {
        if (!_.isEmpty(roleIds)) {
            if (isAdmin) {
                const result = await this.baseSysDepartmentEntity.find();
                return result.map(e => {
                    return e.id;
                });
            }
            const result = await this.baseSysRoleDepartmentEntity
                .createQueryBuilder()
                .where('roleId in (:roleIds)', { roleIds })
                .getMany();
            if (!_.isEmpty(result)) {
                return _.uniq(result.map(e => {
                    return e.departmentId;
                }));
            }
        }
        return [];
    }
    /**
     * 部门排序
     * @param params
     */
    async order(params) {
        for (const e of params) {
            await this.baseSysDepartmentEntity.update(e.id, e);
        }
    }
    /**
     * 删除
     */
    async delete(ids) {
        const { deleteUser } = this.ctx.request.body;
        await this.baseSysDepartmentEntity.delete(ids);
        if (deleteUser) {
            await this.nativeQuery('delete from base_sys_user where departmentId in (?)', [ids]);
        }
        else {
            const topDepartment = await this.baseSysDepartmentEntity
                .createQueryBuilder()
                .where('parentId is null')
                .getOne();
            if (topDepartment) {
                await this.nativeQuery('update base_sys_user a set a.departmentId = ? where a.departmentId in (?)', [topDepartment.id, ids]);
            }
        }
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysDepartmentService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(role_department_1.BaseSysRoleDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseSysDepartmentService.prototype, "baseSysRoleDepartmentEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", perms_1.BaseSysPermsService)
], BaseSysDepartmentService.prototype, "baseSysPermsService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseSysDepartmentService.prototype, "ctx", void 0);
BaseSysDepartmentService = __decorate([
    (0, decorator_1.Provide)()
], BaseSysDepartmentService);
exports.BaseSysDepartmentService = BaseSysDepartmentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwYXJ0bWVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9zZXJ2aWNlL3N5cy9kZXBhcnRtZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyw0REFBc0U7QUFDdEUsNEJBQTRCO0FBQzVCLHNFQUErRTtBQUMvRSxtQ0FBOEM7QUFFOUM7O0dBRUc7QUFFSCxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLGtCQUFXO0lBYXZEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLElBQUk7UUFDUixPQUFPO1FBQ1AsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQ3JFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDdEIsQ0FBQztRQUVGLFNBQVM7UUFDVCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMvRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsS0FBSyxPQUFPO1lBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFO2dCQUM1QixHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzthQUNsRSxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuQyxNQUFNLFdBQVcsR0FBOEIsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFcEUsSUFBSSxDQUFDLENB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