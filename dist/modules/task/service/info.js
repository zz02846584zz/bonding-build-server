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
exports.TaskInfoService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const info_1 = require("../entity/info");
const log_1 = require("../entity/log");
const _ = require("lodash");
const utils_1 = require("../../../comm/utils");
const task_1 = require("../queue/task");
/**
 * 任务
 */
let TaskInfoService = class TaskInfoService extends core_1.BaseService {
    /**
     * 停止任务
     * @param id
     */
    async stop(id) {
        const task = await this.taskInfoEntity.findOne({ id });
        if (task) {
            const result = await this.taskInfoQueue.getRepeatableJobs();
            const job = _.find(result, { id: task.id + '' });
            if (job) {
                await this.taskInfoQueue.removeRepeatableByKey(job.key);
            }
            task.status = 0;
            await this.taskInfoEntity.update(task.id, task);
            await this.updateNextRunTime(task.id);
        }
    }
    /**
     * 开始任务
     * @param id
     * @param type
     */
    async start(id, type) {
        const task = await this.taskInfoEntity.findOne({ id });
        task.status = 1;
        if (type) {
            task.type = type;
        }
        await this.addOrUpdate(task);
    }
    /**
     * 手动执行一次
     * @param id
     */
    async once(id) {
        const task = await this.taskInfoEntity.findOne({ id });
        if (task) {
            await this.taskInfoQueue.add({
                ...task,
                isOnce: true,
            }, {
                jobId: task.id.toString(),
                removeOnComplete: true,
                removeOnFail: true,
            });
        }
    }
    /**
     * 检查任务是否存在
     * @param jobId
     */
    async exist(jobId) {
        const result = await this.taskInfoQueue.getRepeatableJobs();
        const ids = result.map(e => {
            return e.id;
        });
        return ids.includes(jobId.toString());
    }
    /**
     * 新增或修改
     * @param params
     */
    async addOrUpdate(params) {
        let repeatConf;
        await this.getOrmManager().transaction(async (transactionalEntityManager) => {
            if (params.taskType === 0) {
                params.limit = null;
                params.every = null;
            }
            else {
                params.cron = null;
            }
            await transactionalEntityManager.save(info_1.TaskInfoEntity, params);
            if (params.status === 1) {
                const exist = await this.exist(params.id);
                if (exist) {
                    this.stop(params.id);
                }
                const { every, limit, startDate, endDate, cron } = params;
                const repeat = {
                    every,
                    limit,
                    jobId: params.id,
                    startDate,
                    endDate,
                    cron,
                };
                await this.utils.removeEmptyP(repeat);
                const result = await this.taskInfoQueue.add(params, {
                    jobId: params.id,
                    removeOnComplete: true,
                    removeOnFail: true,
                    repeat,
                });
                if (!result) {
                    throw new Error('任务添加失败，请检查任务配置');
                }
                // await transactionalEntityManager.update(TaskInfoEntity, params.id, {
                //   jobId: opts.jobId,
                // });
                repeatConf = result.opts;
            }
        });
        if (params.status === 1) {
            this.utils.sleep(1000);
            await this.updateNextRunTime(params.id);
            await this.nativeQuery('update task_info a set a.repeatConf = ? where a.id = ?', [JSON.stringify(repeatConf.repeat), params.id]);
        }
    }
    /**
     * 删除
     * @param ids
     */
    async delete(ids) {
        let idArr;
        if (ids instanceof Array) {
            idArr = ids;
        }
        else {
            idArr = ids.split(',');
        }
        for (const id of idArr) {
            const task = await this.taskInfoEntity.findOne({ id });
            const exist = await this.exist(task.id);
            if (exist) {
                this.stop(task.id);
            }
            await this.taskInfoEntity.delete({ id });
            await this.taskLogEntity.delete({ taskId: id });
        }
    }
    /**
     * 任务日志
     * @param query
     */
    async log(query) {
        const { id, status } = query;
        return await this.sqlRenderPage(`
      SELECT
          a.*,
          b.NAME AS taskName
      FROM
      task_log a
      JOIN task_info b ON a.taskId = b.id
      where 1=1
      ${this.setSql(id, 'and a.taskId = ?', [id])}
      ${this.setSql(status, 'and a.status = ?', [status])}
      `, query);
    }
    /**
     * 保存任务记录，成功任务每个任务保留最新20条日志，失败日志不会删除
     * @param task
     * @param status
     * @param detail
     */
    async record(task, status, detail) {
        await this.taskLogEntity.save({
            taskId: task.id,
            status,
            detail: detail || '',
        });
        await this.nativeQuery(`DELETE a
      FROM
      task_log a,
          ( SELECT id FROM task_log where taskId = ? AND status = 1 ORDER BY id DESC LIMIT ?, 1 ) b
      WHERE
      a.taskId = ? AND
      a.status = 1 AND
      a.id < b.id`, [task.id, 19, task.id]); // 日志保留最新的20条
    }
    /**
     * 初始化任务
     */
    async initTask() {
        const runningTasks = await this.taskInfoEntity.find({ status: 1 });
        if (!_.isEmpty(runningTasks)) {
            for (const task of runningTasks) {
                const job = await this.exist(task.id); // 任务已存在就不添加
                if (!job) {
                    this.logger.info(`init task ${task.name}`);
                    await this.addOrUpdate(task);
                }
            }
        }
    }
    /**
     * 任务ID
     * @param jobId
     */
    async getNextRunTime(jobId) {
        let nextRunTime;
        const result = await this.taskInfoQueue.getRepeatableJobs();
        const task = _.find(result, { id: jobId + '' });
        if (task) {
            nextRunTime = new Date(task.next);
        }
        return nextRunTime;
    }
    /**
     * 更新下次执行时间
     * @param jobId
     */
    async updateNextRunTime(jobId) {
        await this.nativeQuery('update task_info a set a.nextRunTime = ? where a.id = ?', [await this.getNextRunTime(jobId), jobId]);
    }
    /**
     * 详情
     * @param id
     * @returns
     */
    async info(id) {
        const info = await this.taskInfoEntity.findOne({ id });
        return {
            ...info,
            repeatCount: info.limit,
        };
    }
    /**
     * 刷新任务状态
     */
    async updateStatus(jobId) {
        const result = await this.taskInfoQueue.getRepeatableJobs();
        const job = _.find(result, { id: jobId + '' });
        // @ts-ignore
        const task = await this.taskInfoEntity.findOne({ id: job.id });
        const nextTime = await this.getNextRunTime(task.id);
        if (task) {
            if (task.nextRunTime.getTime() == nextTime.getTime()) {
                task.status = 0;
                task.nextRunTime = nextTime;
                this.taskInfoQueue.removeRepeatableByKey(job.key);
            }
            else {
                task.nextRunTime = nextTime;
            }
            await this.taskInfoEntity.update(task.id, task);
        }
    }
    /**
     * 调用service
     * @param serviceStr
     */
    async invokeService(serviceStr) {
        if (serviceStr) {
            const arr = serviceStr.split('.');
            const service = await this.app.getApplicationContext().getAsync(arr[0]);
            for (const child of arr) {
                if (child.includes('(')) {
                    const lastArr = child.split('(');
                    const param = lastArr[1].replace(')', '');
                    if (!param) {
                        return service[lastArr[0]]();
                    }
                    else {
                        return service[lastArr[0]](JSON.parse(param));
                    }
                }
            }
        }
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(info_1.TaskInfoEntity),
    __metadata("design:type", typeorm_1.Repository)
], TaskInfoService.prototype, "taskInfoEntity", void 0);
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], TaskInfoService.prototype, "logger", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(log_1.TaskLogEntity),
    __metadata("design:type", typeorm_1.Repository)
], TaskInfoService.prototype, "taskLogEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", task_1.TaskInfoQueue)
], TaskInfoService.prototype, "taskInfoQueue", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], TaskInfoService.prototype, "app", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], TaskInfoService.prototype, "utils", void 0);
TaskInfoService = __decorate([
    (0, decorator_1.Provide)(),
    (0, decorator_1.Scope)(decorator_1.ScopeEnum.Request, { allowDowngrade: true })
], TaskInfoService);
exports.TaskInfoService = TaskInfoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3NlcnZlci9zcmMvIiwic291cmNlcyI6WyJtb2R1bGVzL3Rhc2svc2VydmljZS9pbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUM3Qiw0Q0FBZ0Q7QUFDaEQsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyx5Q0FBZ0Q7QUFDaEQsdUNBQThDO0FBRTlDLDRCQUE0QjtBQUM1QiwrQ0FBNEM7QUFDNUMsd0NBQThDO0FBRzlDOztHQUVHO0FBR0gsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxrQkFBVztJQW1COUM7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1gsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsSUFBSSxJQUFJLEVBQUU7WUFDUixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM1RCxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDakQsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN6RDtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNoRCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFB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