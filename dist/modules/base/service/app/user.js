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
exports.BaseApiUserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const core_1 = require("@cool-midway/core");
const orm_1 = require("@midwayjs/orm");
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/sys/user");
const _ = require("lodash");
const user_role_1 = require("../../entity/sys/user_role");
const md5 = require("md5");
const department_1 = require("../../entity/sys/department");
const cache_1 = require("@midwayjs/cache");
const credentials_1 = require("../../../../config/credentials");
const utils_1 = require("../../../../comm/utils");
const auth_1 = require("./auth");
const identity_1 = require("../../../user/entity/identity");
/**
 * 系統用戶
 */
let BaseApiUserService = class BaseApiUserService extends core_1.BaseService {
    /**
     * 獲得個人信息
     */
    async person() {
        var _a;
        // return this.ctx.user;
        // get 緩存
        const info = await this.baseSysUserEntity.findOne({
            id: (_a = this.ctx.user) === null || _a === void 0 ? void 0 : _a.userId,
        });
        if (_.isEmpty(info))
            throw new core_1.CoolCommException('未找到該用戶，請聯絡管理員');
        [
            'id',
            'username',
            'password',
            'passwordV',
            'createTime',
            'createBy',
            'updateTime',
            'updateBy',
            'deleteTime',
            'deleteBy',
            'status',
            'departmentId',
            'socketId',
            'remark',
        ].forEach(e => delete info[e]);
        // const { name: departmentName } = await this.baseSysDepartmentEntity.findOne(
        //   {
        //     id: info?.departmentId,
        //   }
        // );
        // delete info['departmentId'];
        return { ...info };
    }
    /**
     * 修改
     * @param param 數據
     */
    async personUpdate(param) {
        if (_.isEmpty(param))
            throw new core_1.CoolCommException('未輸入資料');
        const userId = this.ctx.user.userId;
        const user = await this.baseSysUserEntity.findOne({ id: userId });
        if (_.isEmpty(user))
            throw new core_1.CoolCommException('用户不存在');
        const { firstName, lastName, intro, birthday, gender } = param;
        await this.baseSysUserEntity.save({
            firstName,
            lastName,
            intro,
            birthday,
            gender,
            id: userId,
        });
    }
    /**
     * 重設密碼
     */
    async resetPassword(reset) {
        const { oldPassword, newPassword, newPasswordConfirm } = reset;
        const userInfo = await this.baseSysUserEntity.findOne({
            id: this.ctx.user.userId,
        });
        const passwordLimit = 8;
        if (newPassword.length < passwordLimit)
            throw new core_1.CoolCommException(`密碼長度最少需${passwordLimit}個字元`);
        if (_.isEmpty(userInfo)) {
            throw new core_1.CoolCommException('用户不存在');
        }
        if (!_.isEqual(md5(oldPassword), userInfo.password)) {
            throw new core_1.CoolCommException('密碼輸入錯誤');
        }
        if (!_.isEqual(newPassword, newPasswordConfirm)) {
            throw new core_1.CoolCommException('兩次密碼輸入不一致');
        }
        if (_.isEqual(md5(newPassword), userInfo.password)) {
            throw new core_1.CoolCommException('與目前的密碼相同');
        }
        await this.baseSysUserEntity.save({
            id: this.ctx.user.userId,
            password: md5(reset.newPassword),
            passwordV: userInfo.passwordV + 1,
        });
    }
    /**
     * 根據ID獲得信息
     * @param id
     */
    async info(id) {
        const info = await this.baseSysUserEntity.findOne({ id });
        if (_.isEmpty(info))
            throw new core_1.CoolCommException('找不到這個人');
        // const userRoles = await this.nativeQuery(
        //   'select a.roleId from base_sys_user_role a where a.userId = ?',
        //   [id]
        // );
        // const department = await this.baseSysDepartmentEntity.findOne({
        //   id: info.departmentId,
        // });
        // if (info) {
        //   delete info.password;
        //   if (userRoles) {
        //     info.roleIdList = userRoles.map(e => {
        //       return parseInt(e.roleId);
        //     });
        //   }
        // }
        // delete info.password;
        // if (department) {
        //   info.departmentName = department.name;
        // }
        return info;
    }
    /**
     * 刪除帳戶
     */
    async delete() {
        const userId = this.ctx.user.userId;
        const user = await this.baseSysUserEntity.findOne({ id: userId });
        if (user) {
            await this.baseSysUserEntity.save({
                id: userId,
                deleteBy: this.ctx.user.userId,
                deleteTime: new Date(),
                status: user_1.UserStatus.DELETE,
            });
            await this.cacheManager.del(`user:department:${userId}`);
            await this.cacheManager.del(`user:perms:${userId}`);
            await this.cacheManager.del(`user:token:${userId}`);
            await this.cacheManager.del(`user:token:refresh:${userId}`);
        }
        else {
            throw new core_1.CoolCommException('用戶不存在');
        }
    }
    /**
     * 綁定Email
     */
    async emailBinding(param) {
        const { email } = param;
        const nodemailer = require('nodemailer');
        const baseUrl = 'https://bondingtechs.com/my/account/email-verify?token=';
        const token = this.utils.randomString(50);
        const confirmUrl = baseUrl + token;
        const emailIsUsed = await this.baseSysUserEntity.findOne({
            email,
            emailVerify: user_1.EmailVerify.VERIFY,
        });
        if (!_.isEmpty(emailIsUsed))
            throw new core_1.CoolCommException('該Email已被使用');
        const userInfo = await this.baseSysUserEntity.findOne({
            id: this.ctx.user.userId,
        });
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: credentials_1.googleMail.user,
                pass: credentials_1.googleMail.pass,
            },
        });
        let mailOptions = {
            from: 'zz02846584zz@gmail.com',
            to: email,
            subject: 'Bonding 鍵結科技 - 帳號綁定驗證',
            //純文字
            // text: 'Hello world2', // plaintext body
            //嵌入 html 的內文
            html: `<div class="">
      <div class="aHl"></div>
      <div id=":1pq" tabindex="-1"></div>
      <div
        id=":1v4"
        class="ii gt"
        jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."
      >
        <div id=":1tl" class="a3s aiL">
          <u></u>
    
          <div
            style="
              font-family: 'Helvetica Neue', Helvetica, 'PingFang TC',
                'Microsoft JhengHei', 'PMingLiU', sans-serif;
              line-height: inherit;
              margin: 0;
              padding: 0;
            "
            bgcolor="#fafafa"
          >
            <table
              style="
                border-collapse: collapse;
                table-layout: fixed;
                border-spacing: 0;
                vertical-align: top;
                min-width: 320px;
                width: 100%;
                line-height: inherit;
                margin: 0 auto;
              "
              cellpadding="0"
              cellspacing="0"
              bgcolor="#fafafa"
            >
              <tbody style="line-height: inherit">
                <tr
                  style="
                    vertical-align: top;
                    border-collapse: collapse;
                    line-height: inherit;
                  "
                >
                  <td
                    style="
                      word-break: break-word;
                      border-collapse: collapse !important;
                      line-height: inherit;
                    "
                    valign="top"
                  >
                    <div
                      style="background-color: transparent; line-height: inherit"
                    >
                      <div
                        style="
                          min-width: 320px;
                          max-width: 540px;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: transparent;
                          line-height: inherit;
                          margin: 0 auto;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            background-color: transparent;
                            line-height: inherit;
                          "
                        >
                          <div
                            style="
                              min-width: 320px;
                              max-width: 540px;
                              display: table-cell;
                              vertical-align: top;
                              line-height: inherit;
                            "
                          >
                            <div
                              style="
                                background-color: transparent;
                                width: 100% !important;
                                line-height: inherit;
                              "
                            >
                              <div
                                style="
                                  line-height: inherit;
                                  padding: 36px 0px 20px;
                                  border: 0px solid transparent;
                                "
                              >
                                <div
                                  align="center"
                                  style="
                                    padding-right: 0px;
                                    padding-left: 0px;
                                    line-height: inherit;
                                  "
                                >
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style="background-color: transparent; line-height: inherit"
                    >
                      <div
                        style="
                          min-width: 320px;
                          max-width: 540px;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: #ffffff;
                          border-bottom-width: 2px;
                          border-bottom-color: #efefef;
                          border-bottom-style: solid;
                          line-height: inherit;
                          margin: 0 auto;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            background-color: #ffffff;
                            line-height: inherit;
                          "
                        >
                          <div
                            style="
                              min-width: 320px;
                              max-width: 540px;
                              display: table-cell;
                              vertical-align: top;
                              line-height: inherit;
                            "
                          >
                            <div
                              style="
                                background-color: transparent;
                                width: 100% !important;
                                line-height: inherit;
                              "
                            >
                              <div
                                style="
                                  line-height: inherit;
                                  padding: 5px 0px;
                                  border: 1px solid #efefef;
                                "
                              >
                                <div
                                  style="
                                    color: #333;
                                    line-height: 120%;
                                    padding: 30px;
                                  "
                                >
                                  <div
                                    style="font-size: 14px; line-height: 1.42857143"
                                    align="left"
                                  >
                                    <h1
                                      style="
                                        line-height: 1.1;
                                        font-weight: 500;
                                        font-size: 24px;
                                        margin-top: 0;
                                      "
                                    >
                                      你好 ${userInfo.firstName} ${userInfo.lastName}!
                                    </h1>
                                    <p style="line-height: 1.5">
                                    您可以通過下面的鏈接按鈕 <span class="il">確認</span> 您的帳戶電子郵件。
                                    </p>
                                    <div
                                      style="
                                        line-height: inherit;
                                        margin: 30px auto 14px;
                                      "
                                      align="center"
                                    >
                                      <a
                                        href="${confirmUrl}"
                                        style="
                                          display: inline-block;
                                          color: #fff;
                                          background-color: #13ab67;
                                          border-radius: 3px;
                                          text-align: center;
                                          text-decoration: none;
                                          font-size: 16px;
                                          line-height: inherit;
                                          padding: 14px 30px;
                                        "
                                        target="_blank"
                                        ><span class="il">確認</span> Email</a
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style="background-color: transparent; line-height: inherit"
                    >
                      <div
                        style="
                          min-width: 320px;
                          max-width: 540px;
                          word-wrap: break-word;
                          word-break: break-word;
                          background-color: transparent;
                          line-height: inherit;
                          margin: 0 auto;
                        "
                      >
                        <div
                          style="
                            border-collapse: collapse;
                            display: table;
                            width: 100%;
                            background-color: transparent;
                            line-height: inherit;
                          "
                        >
                          <div
                            style="
                              min-width: 320px;
                              max-width: 540px;
                              display: table-cell;
                              vertical-align: top;
                              line-height: inherit;
                            "
                          >
                            <div
                              style="
                                background-color: transparent;
                                width: 100% !important;
                                line-height: inherit;
                              "
                            >
                              <div
                                style="
                                  line-height: inherit;
                                  padding: 5px 0px;
                                  border: 0px solid transparent;
                                "
                              >
                                <div
                                  style="
                                    font-size: 12px;
                                    color: #aaa;
                                    line-height: inherit;
                                    padding: 10px;
                                  "
                                  align="center"
                                >
                                  您收到這封電子郵件是因為您已在 鍵結科技 申請綁定Email
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="yj6qo"></div>
          <div class="adL"></div>
        </div>
      </div>
      <div id=":1pu" class="ii gt" style="display: none">
        <div id=":1pv" class="a3s aiL"></div>
      </div>
      <div class="hi"></div>
    </div>`,
        };
        return transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
                await this.baseSysUserEntity.save({
                    id: this.ctx.user.userId,
                    emailVerify: user_1.EmailVerify.PENDING,
                    email: email,
                });
                await this.cacheManager.set(`user:emailToken:${token}`, this.ctx.user.userId);
                return confirmUrl;
            }
        });
    }
    /**
     * 驗證Email
     */
    async emailVerify({ token }) {
        const userId = await this.cacheManager.get(`user:emailToken:${token}`);
        if (!userId)
            throw new core_1.CoolCommException('驗證失敗，請重新填寫Email');
        await this.baseSysUserEntity.save({
            id: userId,
            emailVerify: user_1.EmailVerify.VERIFY,
        });
    }
    /**
     * 更換手機
     */
    async changePhone({ phone, verifyCode }) {
        // 驗證
        const phoneWithArea = '886' + phone.substring(1);
        await this.baseAppAuthService.captchaCheck(`+${phoneWithArea}`, verifyCode);
        // 更新電話
        const userId = this.ctx.user.userId;
        const result = await this.baseSysUserEntity.save({ id: userId, phone });
        return result;
    }
    /**
     * 登出
     */
    async logout() {
        const user = this.ctx.user;
        if (!user)
            throw new core_1.CoolCommException('用戶未登入');
        const userId = user.userId;
        await this.cacheManager.del(`user:department:${userId}`);
        await this.cacheManager.del(`user:perms:${userId}`);
        await this.cacheManager.del(`user:token:${userId}`);
        await this.cacheManager.del(`user:token:refresh:${userId}`);
    }
};
__decorate([
    (0, orm_1.InjectEntityModel)(user_1.BaseSysUserEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "baseSysUserEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(user_role_1.BaseSysUserRoleEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "baseSysUserRoleEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(department_1.BaseSysDepartmentEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "baseSysDepartmentEntity", void 0);
__decorate([
    (0, orm_1.InjectEntityModel)(identity_1.UserIdentityEntity),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "userIdentityEntity", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", typeorm_1.Repository)
], BaseApiUserService.prototype, "tipAppService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", auth_1.BaseAppAuthService)
], BaseApiUserService.prototype, "baseAppAuthService", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", cache_1.CacheManager)
], BaseApiUserService.prototype, "cacheManager", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", Object)
], BaseApiUserService.prototype, "ctx", void 0);
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", utils_1.Utils)
], BaseApiUserService.prototype, "utils", void 0);
BaseApiUserService = __decorate([
    (0, decorator_1.Provide)()
], BaseApiUserService);
exports.BaseApiUserService = BaseApiUserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMva3Vyb3UvcHJvamVjdC9ib25kaW5nL3Byb2plY3Qvc2VydmVyL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvYmFzZS9zZXJ2aWNlL2FwcC91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCw0Q0FBbUU7QUFDbkUsdUNBQWtEO0FBQ2xELHFDQUFxQztBQUNyQyxnREFJK0I7QUFDL0IsNEJBQTRCO0FBQzVCLDBEQUFtRTtBQUNuRSwyQkFBMkI7QUFDM0IsNERBQXNFO0FBQ3RFLDJDQUErQztBQUkvQyxnRUFBNEQ7QUFDNUQsa0RBQStDO0FBRS9DLGlDQUE0QztBQUM1Qyw0REFBbUU7QUFFbkU7O0dBRUc7QUFFSCxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLGtCQUFXO0lBNEJqRDs7T0FFRztJQUNILEtBQUssQ0FBQyxNQUFNOztRQUNWLHdCQUF3QjtRQUN4QixTQUFTO1FBQ1QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ2hELEVBQUUsRUFBRSxNQUFBLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSwwQ0FBRSxNQUFNO1NBQzFCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDakIsTUFBTSxJQUFJLHdCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRS9DO1lBQ0UsSUFBSTtZQUNKLFVBQVU7WUFDVixVQUFVO1lBQ1YsV0FBVztZQUNYLFlBQVk7WUFDWixVQUFVO1lBQ1YsWUFBWTtZQUNaLFVBQVU7WUFDVixZQUFZO1lBQ1osVUFBVTtZQUNWLFFBQVE7WUFDUixjQUFjO1lBQ2QsVUFBVTtZQUNWLFFBQVE7U0FDVCxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFD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