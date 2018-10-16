/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:22:52
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-09-28 16:21:25
 */

<template>
  <div class="login-container">
    <section class="login_logo">
      <img src="../../assets/login_fill.png" />
    </section>
    <section class="login_container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        label-position="left"
        label-width="0px"
        class="card-box login-form">
        <h3 class="title">欢迎登录小麦快租</h3>
        <el-form-item
          class="login_item"
          prop="mobile">
          <el-input
            v-model="loginForm.mobile"
            name="mobile"
            type="text"
            autocomplete="off"
            clearable
            placeholder="请输入账号">
            <i
              slot="prefix"
              class="iconfont icon-user-fill" />
          </el-input>
        </el-form-item>
        <el-form-item
          class="login_item"
          prop="password">
          <el-input
            v-model="loginForm.password"
            name="password"
            type="password"
            clearable
            autocomplete="off"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin">
            <i
              slot="prefix"
              class="iconfont icon-lock-fill-open" />
          </el-input>
        </el-form-item>
        <el-form-item class="login_handle">
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;"
            class="btn_login"
            @click.native.prevent="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </section>
    <el-dialog
      :visible.sync="modifyPassLayer"
      :before-close="handleClose"
      title="修改初始密码"
      width="30%">
      <el-form
        ref="modifyPassForm"
        :model="modifyPassData"
        :rules="modifyPassRules"
        label-width="80px">
        <el-form-item label="手机">
          <el-input
            v-model="modifyPassData.account"
            :disabled="true">
          </el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="verifyCode">
          <el-row> <el-input
            v-model="modifyPassData.verifyCode"
            style="width:50%"
            placeholder="请输入的验证码"></el-input>
            <el-button
              v-show="sendAuthCode"
              ref="sendVerifyRef"
              type="primary"
              @click="sendVerifyCode">发送验证码</el-button>
            <el-button
              v-show="!sendAuthCode"
              ref="sendVerifyRef"
              type="primary"
              @click="sendVerifyCode">{{ auth_time }}后重新发送</el-button></el-row>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="modifyPassword">
          <el-input
            v-model="modifyPassData.modifyPassword"
            type="password"
            placeholder=" 请输入6-12位密码"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="sureModifyPass">确 定</el-button>
        <el-button
          @click="modifyPassLayer = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { loginApi, sendVerifyCodeApi } from '@/api/user'

export default {
  name: 'Login',
  data () {
    const validateAccount = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const modifyValidatePass = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        callback(new Error('请输入密码'))
      }
      setTimeout(() => {
        if (value.length < 6 || value.lenght > 12) {
          callback(new Error('请输入6-12位密码'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      loginForm: {
        mobile: '',
        password: ''
      },
      loginRules: {
        mobile: [
          { required: true, trigger: 'blur', validator: validateAccount }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      modifyPassRules: {
        modifyPassword: [
          { required: true, trigger: 'blur', validator: modifyValidatePass }
        ],
        verifyCode: [
          { required: true, trigger: 'blur', message: '请输入验证码' }
        ]
      },
      loading: false,
      modifyPassLayer: false,
      modifyPassData: {
        'account': '',
        'modifyPassword': '',
        'verifyCode': '', // 验证码
        'mobile': ''
      },
      sendAuthCode: true, /* 布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((res) => {
            this.loading = false
            this.modifyPassData.account = this.loginForm.mobile
            if (res.data.firstLogin) {
              this.modifyPassLayer = true
            } else {
              this.$router.push({ path: '/' })
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    handleClose () {
      this.modifyPassLayer = false
    },
    sureModifyPass () { // 确认提交修改密码
      let param = {
        'account': this.modifyPassData.account,
        'password': this.modifyPassData.modifyPassword,
        'verifyCode': this.modifyPassData.verifyCode
      }
      console.log('param', param)
      this.$refs.modifyPassForm.validate(valid => {
        if (valid) {
          loginApi.modifyPassword(param).then(() => {
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
            this.$router.push({ path: '/' })
          })
        }
      })
    },
    getAuthCode: function () { // 倒计时
      this.sendAuthCode = false
      this.auth_time = 6
      var auth_timetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(auth_timetimer)
        }
      }, 1000)
    },
    sendVerifyCode () { // 发送验证码
      if (!this.sendAuthCode) {
        this.$message({
          message: '请' + this.auth_time + '秒后再发',
          type: 'warning'
        })
        return false
      }
      this.getAuthCode()
      sendVerifyCodeApi({
        'mobile': this.modifyPassData.account
      }).then((res) => {
        this.$message({
          message: '验证码发送成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style lang="scss">
@import "src/styles/mixin.scss";

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color:rgba(14, 14, 14, 1);
  background-image: url(../../assets/bg_login.png);
  background-size: cover;
  background-position: center center;
  // input:-webkit-autofill {
  //   box-shadow: 0 0 0px 1000px rgb(255, 255, 255) inset !important;
  //   -webkit-box-shadow: 0 0 0px 1000px rgb(255, 255, 255) inset !important;
  //   -webkit-text-fill-color: #fff !important;
  // }
  .login-form input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 8px 40px;
    &.el-input__inner {
      padding-left: 40px;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      transition-delay: 999999s;
      transition: color 999999s ease-out, background-color 999999s ease-out;
      -webkit-transition-delay: 999999s;
      -webkit-transition: color 999999s ease-out, background-color 999999s ease-out;
    }
  }
  .login-form {
    width: 450px;
    padding: 50px;
    background: rgba(255, 255, 255, 0.83);
    border-radius: 12px;
    font-size: 16px;
    color: #333;
    .login_item {
      border-bottom: 1px solid #CFCFCF;
      margin-bottom: 30px;
      .el-input {
        display: inline-block;
        height: 100%;
        width: 100%;
        font-size: 16px;
      }
      .el-form-item__error {
        padding-top: 10px;
      }
    }
    .login_handle {
      margin-bottom: 0;
      padding-top: 20px;
      .btn_login {
        height: 50px;
        font-size: 18px;
        background: #4680FF;
        border-radius: 8px;
        border-color: #4680ff;
      }
    }
    .title {
      font-size: 28px;
      color: #333;
      text-align: center;
      font-weight: normal;
    }
    .iconfont {
      width: 25px;
      font-size: 22px;
      color: #999;
    }
  }
  .login_logo {
    position: absolute;
    top: 50px;
    left: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
