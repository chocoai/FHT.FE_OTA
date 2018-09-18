<template>
  <div>
    <div class="dialog_apply">
      <!-- <el-dialog
        :title="dialogTitle"
        :visible.sync="layer_showApply"
        @close="dialogClose"> -->
      <el-steps
        :active="active_step"
        align-center
        finish-status="success"
        style="margin-bottom: 30px;">
        <el-step
          title="填写闲鱼昵称"
          description="打开闲鱼APP，点击【我的】，用户名即为闲鱼昵称，闲鱼昵称需要进行实名认证才可同步房源（闲鱼APP-我的-头像-实名认证）"/>
        <el-step
          title="扫码授权"
          description="打开闲鱼APP进行扫码授权"/>
      </el-steps>
      <div
        v-if="active_step === 0"
        class="text-center"
        style="display: flex; justify-content: center;">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          size="small"
          status-icon
          style="width: 400px;">
          <el-form-item prop="account">
            <el-input
              v-model="temp.account"
              placeholder="请输入闲鱼昵称"
              clearable
              size="small">
              <template slot="prepend">闲鱼昵称</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-else
        class="text-center"
        style="display: flex; justify-content: center;">
        <el-card
          :body-style="{ padding: '0px' }"
          style="max-width: 500px;">
          <img
            :src="picUrl"
            style="display: block; width: 100%;">
          <div style="padding: 14px;">
            <span>请用闲鱼APP进行扫码授权</span>
          </div>
        </el-card>
      </div>
      <div
        slot="footer"
        class="dialog-footer text-center">
        <el-button
          v-if="active_step === 0"
          type="primary"
          size="small"
          @click="nextStep">下一步</el-button>
        <el-button
          v-if="active_step === 1"
          size="small"
          @click="active_step = 0">上一步</el-button>
        <el-button
          v-if="active_step === 1"
          type="primary"
          size="small"
          @click="saveApplyInfo">确认授权</el-button>
      </div>
      <!-- </el-dialog> -->
    </div>
  </div>
</template>
<script>
// import areaData from './cityData'
// import { deepClone } from '@/utils'
export default {
  name: 'Authorize',
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    layer_showApply: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active_step: 0
    }
  },
  methods: {
    dialogClose () {}
  //   // 下一步
  //   nextStep () {
  //     this.$refs['dataForm'].validate((valid) => {
  //       if (valid) {
  //         let bindParams = {
  //           platform: 'idlefish',
  //           userid: this.temp.userId,
  //           account: this.temp.account,
  //           type: this.temp.type,
  //           mobile: this.temp.mobile,
  //           brand: this.temp.name
  //         }
  //         authorizeApi.bind(ObjectMap(bindParams)).then(response => {
  //           authorizeApi.picture({
  //             platform: 'idlefish',
  //             saasId: 0
  //           }).then(response => {
  //             this.picUrl = response.data.picUrl
  //             this.active_step = 1
  //           })
  //         })
  //       }
  //     })
  //   },
  //   // 确认授权
  //   saveApplyInfo () {
  //     authorizeApi.status(ObjectMap({
  //       platform: 'idlefish',
  //       userid: this.temp.userId
  //     })).then(response => {
  //       this.layer_showApply = false
  //       this.searchParam()
  //       this.$notify({
  //         title: '成功',
  //         message: '授权成功',
  //         type: 'success',
  //         duration: 2000
  //       })
  //     })
  //   },
  //   dialogClose () {
  //     this.temp = {
  //       account: ''
  //     }
  //     this.active_step = 0
  //     if (this.$refs.dataForm) {
  //       this.$refs.dataForm.resetFields()
  //     }
  //     this.layer_showApply = false
  //   }
  }
}
</script>
