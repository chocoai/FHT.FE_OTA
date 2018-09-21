<template>
  <div>
    <div class="layout_pageHeader">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClickTab">
        <el-tab-pane
          v-for="(item,index) in tabMapOptions"
          :label="item"
          :key="index"
          :name="item"/>
      </el-tabs>
      <el-form class="model-search clearfix">
        <div class="item-flex">
          <el-form-item>
            <el-cascader
              :options="options"
              v-model="selectedOpthons"
              placeholder="请选择城市区域"
              size="small"
              level="1"
              class="item-select"
              filterable
              clearable
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchParams.regionAddressId"
              size="small"
              filterable
              placeholder="请选择小区"
              clearable
              class="item-select"
            >
              <el-option
                v-for="(areaName,item) in selectedArea"
                :value="areaName.regionAddressId"
                :key="item"
                :label="areaName.name"/>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="searchParams.roomNo"
              size="small"
              placeholder="请输入房间号"
              class="item-select"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              icon="el-icon-search"
              @click="searchParam">查询</el-button>
            <el-button
              size="small"
              icon="el-icon-remove-outline"
              style="margin-left:10px"
              @click="searchParam('clear')">清空</el-button>
          </el-form-item>
        </div>
        <div class="item-flex">
          <el-form-item>
            <el-select
              v-model="searchParams.roomStatus"
              size="small"
              placeholder="请选择出租状态"
              class="item-select"
              clearable
            >
              <el-option
                value="9"
                label="已出租"/>
              <el-option
                value="2"
                label="未出租"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchParams.mailinStatus"
              size="small"
              placeholder="麦邻发布状态"
              class="item-select"
              clearable
            >
              <el-option
                value="0"
                label="麦邻未发布"/>
              <el-option
                value="1"
                label="麦邻已发布"/>
              <el-option
                value="2"
                label="麦邻发布失败"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchParams.idlefishStatus"
              size="small"
              placeholder="闲鱼发布状态"
              class="item-select"
              clearable
            >
              <el-option
                value="0"
                label="闲鱼未发布"/>
              <el-option
                value="1"
                label="闲鱼已发布"/>
              <el-option
                value="2"
                label="闲鱼发布失败"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="success"
              icon="iconfont icon-publish_on"
              @click="syncItems('on')">发布</el-button>
            <el-button
              size="small"
              type="danger"
              icon="iconfont icon-publish_off"
              style="margin-left:10px"
              @click="syncItems('off')">下架</el-button>
          </el-form-item>
        </div>
        <el-dialog
          :visible.sync="dialogVisible"
          :title="&quot;选择&quot;+dialogTitle+&quot;平台&quot;"
          class="select-dialog"
          width="450px">
          <div class="select-platform-container clearfix">
            <div>
              <input
                id="mlRent"
                v-model="publishSelect.mailin"
                type="checkbox"
              >
              <label for="mlRent">
                <div
                  :class="{changeBackground:publishSelect.mailin}"
                  class="ml-selectName">麦邻租房</div>
                <div class="ml-selectStatus">
                  <i
                    v-show="publishSelect.mailin"
                    class="el-icon-check"/>
                </div>
              </label>
            </div>
            <div>
              <input
                id="idleFishRent"
                v-model="publishSelect.idlefish"
                type="checkbox" >
              <label for="idleFishRent">
                <div
                  :class="{changeBackground:publishSelect.idlefish}"
                  class="ml-selectName">闲鱼租房</div>
                <div class="ml-selectStatus">
                  <i
                    v-show="publishSelect.idlefish"
                    class="el-icon-check"/>
                </div>
              </label>
            </div>
          </div>
          <span
            slot="footer"
            class="dialog-footer">
            <el-button
              type="primary"
              size="small"
              @click="gotoHouseAsync">{{ dialogTitle === "下架"?"确定":"发布" }}</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>
    <div class="layout-container">
      <GridUnit
        ref="refGridUnit"
        :form-options="searchParams"
        :data-method="method"
        :url="url"
        :columns="colModels"
        :show-selection="true"
        :is-mock="isMock"
        list-field="data.houseList"
        @selection-change="handleSelectionChange"
      >
        <template
          slot="slot_idlefishStatus"
          slot-scope="scope">
          <el-popover
            v-if="scope.row.idlefishStatus === 5"
            trigger="hover"
            placement="top">
            <p>发布失败原因: {{ scope.row.idlefishfailMessage }}</p>
            <div slot="reference">
              <el-tag :type="(scope.row.idlefishStatus) | renderStatusType">
                {{ (scope.row.idlefishStatus) | renderStatusValue }}
              </el-tag>
            </div>
          </el-popover>
          <el-tag
            v-else
            :type="(scope.row.idlefishStatus) | renderStatusType">
            {{ scope.row.idlefishStatus | renderStatusValue }}
          </el-tag>
        </template>
        <template
          slot="slot_mailinStatus"
          slot-scope="scope">
          <el-popover
            v-if="scope.row.mailinStatus === 5"
            trigger="hover"
            placement="top">
            <p>发布失败原因: {{ scope.row.mailinfailMessage }}</p>
            <div slot="reference">
              <el-tag :type="(scope.row.mailinStatus) | renderStatusType">
                {{ (scope.row.mailinStatus) | renderStatusValue }}
              </el-tag>
            </div>
          </el-popover>
          <el-tag
            v-else
            :type="( scope.row.mailinStatus) | renderStatusType">
            {{ scope.row.mailinStatus | renderStatusValue }}
          </el-tag>
        </template>
        <template
          slot="roomStatusHosting"
          slot-scope="scope">
          <el-switch
            v-model="scope.row.roomStatus"
            :active-value="9"
            :inactive-value="2"
            :active-text="roomStatusText(scope.row.roomStatus)"
            class="roomSelectStatus"
            @change="changeRoomStatus(scope.row)"/>
        </template>
        <template
          slot="operateHosting"
          slot-scope="scope">
          <el-row>
            <el-button
              type="primary"
              size="mini"
              @click="openRoomDetail(scope.row)">编辑房间</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="deleteRoom(scope.row)">删除</el-button>
          </el-row>
        </template>

      </GridUnit>
      <div class="editHouse">
        <el-dialog
          :visible.sync="roomDetailModelVisible"
          title="编辑房间"
          width="60%"
          top="0">
          <hosting-room-detail
            ref="hostingRoomDetail"
            :house-rent-type="activeName === '分散式整租' ? 1 : 2"
            :edit-flag="true"
            @closeDialog="closeRoomDetailDialog" />
        </el-dialog>
      </div>
      <el-dialog
        :visible.sync="authorizeShow"
        title="闲鱼授权">
      <authorize @closeAuthorize ="closeAuthorizeDialog"/></el-dialog>
      <el-dialog
        :visible.sync="goAuthorizeShow"
        title="授权提示"
        width="350px"
      >
        <div class="goAuthorize">
          <p>您需要完成闲鱼授权才能进行发布操作</p>
          <el-button
            type="primary"
            size="mini"
            @click="goAuthorize()">现在就去</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="certificationShow"
        title="完成实名认证方可发布房源"
        width="450px"
      >
        <div>
          <el-form
            ref="certificationFrom"
            :model="certificationFrom"
            :rules="rules"
            label-width="80px"
            status-icon
          >
            <el-form-item
              label="姓名"
              prop="userName">
              <el-input
                v-model="certificationFrom.userName"
                class="user-input"
                size="small"/>
            </el-form-item>
            <el-form-item
              label="身份证"
              prop="userId">
              <el-input
                v-model="certificationFrom.userId"
                class="user-input"/>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="user-button"
                @click="goCertification()">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { deepClone } from '@/utils'
import GridUnit from '@/components/GridUnit/grid'
import areaSelect from '@/components/AreaSelect'
import authorize from '@/views/houseManage/components/authorize'
import hostingRoomDetail from '@/views/hostingEntryHouse/components/hostingRoomDetail'
import { houseAsyncApi, changeRoomStatusApi, estateDeleteEstateApi, publishHouseApi, unPublishHouseApi, queryCityAreaPlotApi, hostingHouseInfoApi, certificationFromApi } from '@/api/houseManage'
export default {
  name: 'HouseSync',
  components: {
    GridUnit,
    areaSelect,
    authorize,
    hostingRoomDetail
  },
  filters: {
    // 麦邻 闲鱼发布状态
    renderStatusType (status) {
      const statusMap = {
        '1': 'info',
        '2': 'success',
        '5': 'danger',
        '9': 'primary'

      }
      return statusMap[status] || 'info'
    },
    renderStatusValue (status) {
      const statusStrData = ['', '未发布', '已发布']
      statusStrData[5] = '发布失败'
      statusStrData[9] = '发布中'
      return statusStrData[status] || '未知'
    }
  },

  data () {
    var validateUserID = (rule, value, callback) => {
      var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
      if (!value) {
        callback(new Error('请填写身份证号码'))
      } else if (!reg.test(value)) {
        callback(new Error('请填写正确的18位身份证号'))
      } else {
        callback()
      }
    }
    return {
      certificationFrom: {
        userName: '',
        userId: ''
      },
      rzErrorTips: '',
      selectedOpthons: [],
      options: [],
      residential: [], // 小区
      selectedArea: [],
      activeName: '分散式整租',
      houseAreaName: '整套面积',
      tabMapOptions: ['分散式整租', '分散式合租'],
      selectedItems: [],
      filterManagerList: [],
      authorizeShow: false,
      dialogTitle: '',
      roomStatusArry: [],
      goAuthorizeShow: false,
      certificationShow: false,
      authorizeStatus: false, // 判断是否授权的参数
      userAuthentication: false, // 判断实名认证的参数
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userId: [
          { required: true, validator: validateUserID, trigger: 'blur' }
        ]
      },
      colModels: [
        {slot: 'selection', width: 30},
        {prop: 'subdistrictName', label: '公寓/小区', width: 150},
        {prop: 'roomNo', label: '房间号', width: 150},
        {prop: 'chamberCount',
          label: '户型',
          width: 150,
          render (row) {
            return (row.chamberCount || 0) + '室' + (row.boardCount || 0) + '厅' + (row.toiletCount || 0) + '卫'
          }
        },
        {prop: 'roomArea',
          label: '整套面积',
          width: 150,
          render (row) {
            return (row.roomArea || 0) + 'm²'
          }
        },
        {prop: 'rentPrice',
          label: '推广价格',
          width: 150,
          render (row) {
            return (row.rentPrice || 0) + '元'
          }
        },
        {
          prop: 'mailinStatus',
          label: '麦邻租房',
          width: 150,
          type: 'status',
          slotName: 'slot_mailinStatus'
        },
        { prop: 'idlefishStatus',
          label: '闲鱼租房',
          width: 150,
          type: 'status',
          slotName: 'slot_idlefishStatus'
        },
        {
          prop: 'roomStatus',
          label: '出租状态',
          slotName: 'roomStatusHosting',
          width: 150,
          type: 'status',
          fixed: 'right'
        },
        {
          prop: 'operate',
          label: '操作',
          slotName: 'operateHosting',
          width: 200,
          fixed: 'right'
        }
      ],
      publishSelect: {
        mailin: true,
        idlefish: true
      },
      dialogVisible: false,
      searchParams: {
        pageNo: 1,
        pageSize: 20,
        houseRentType: 1, // 1,整租 2,合租
        cityId: '',
        regionId: '',
        roomStatus: '',
        regionAddressId: '',
        roomNo: '',
        mailinStatus: '',
        idlefishStatus: ''
      },
      url: houseAsyncApi.requestPath,
      method: houseAsyncApi.queryMethod,
      isMock: houseAsyncApi.isMock,
      roomDetailModelVisible: false
    }
  },
  watch: {

  },
  mounted () {
    this.authorizeStatus = this.$store.getters.idlefished // 判断是否授权的参数
    this.userAuthentication = this.$store.getters.authed // 判断实名认证的参数
    this.getCityName()
  },
  methods: {
    // 查询数据
    searchParam (type) {
      console.log('selectedOpthons', this.selectedOpthons)
      if (type === 'clear') {
        this.searchParams = {
          pageNo: 1,
          pageSize: 20,
          houseRentType: 1, // 1-整租，2-合租
          cityId: '',
          regionId: '',
          roomStatus: '', // 2-未出租，9-已出租
          regionAddressId: '',
          roomNo: '',
          mailinStatus: '', // 1-未发布，2-已发布，5：发布失败 ，9：处理中
          idlefishStatus: ''
        }
        this.selectedOpthons = []
        this.selectedArea = []
      }
      console.log('查询数据', this.searchParams)
      this.searchParams.houseRentType = this.activeName === '分散式整租' ? 1 : 2
      this.colModels[4].label = this.activeName === '分散式整租' ? '整套面积' : '单间面积'
      // 解决watch执行顺序
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    closeAuthorizeDialog (status) {
      this.authorizeShow = false
    },
    closeRoomDetailDialog () {
      this.roomDetailModelVisible = false
    },
    // 城市区域
    getCityName () {
      var params = {
        'resource': this.searchParams.houseRentType
      }
      var cityData = []
      queryCityAreaPlotApi(params).then(res => {
        this.residential = res.data.subdistrictList
        cityData = res.data.cityList
        if (cityData.length > 0) {
          cityData.forEach((backData, index) => {
            cityData[index].value = backData.cityId
            cityData[index].label = backData.cityName

            if (cityData[index].regionList.length > 0) {
              cityData[index].regionList.forEach((cityArea, item) => {
                cityArea.value = cityArea.areaId
                cityArea.label = cityArea.areaName
              })
            }
          })
          this.options = deepClone(JSON.parse(JSON.stringify(cityData).replace(/regionList/g, 'children')))
        }
      })
    },
    handleChange (value) {
      this.selectedArea = []
      this.searchParams.regionAddressId = ''
      this.searchParams.cityId = value[0]
      this.searchParams.regionId = value[1]
      this.residential.filter((cityName, index) => {
        if (cityName.cityId === value[0] && cityName.areaId === value[1]) {
          this.selectedArea.push(cityName)
        }
      })
      console.log('selectedArea', this.selectedArea)
    },
    roomStatusText (status) {
      if (status === 2) {
        return '未出租'
      } else if (status === 9) {
        return '已出租'
      }
    },
    // 改变出租状态
    changeRoomStatus (scope) {
      console.log(scope)
      var params =
      {
        'roomCode': scope.roomCode,
        'roomStatus': scope.roomStatus,
        'resource': this.searchParams.houseRentType
      }
      changeRoomStatusApi(params).then(response => {
        this.searchParam('clear')
      })
    },
    // 删除房间
    deleteRoom (row) {
      const h = this.$createElement
      this.$msgbox({
        title: '确认消息',
        message: h('p', null, [
          h('span', null, '确定删除房间吗？ '),
          h('span', { style: 'color: red' })
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        estateDeleteEstateApi({
          'fangyuanCode': row.fangyuanCode
        }).then((res) => {
          console.log(res)
          if (res.code === '0') {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.searchParam('clear')
          }
        }).catch(err => { console.log(err) })
      })
    },
    // tabs切换
    handleClickTab (tab) {
      this.searchParam('clear')
    },
    // 选择列表
    handleSelectionChange (list) {
      this.selectedItems = list
      console.log('selectedItems', this.selectedItems)
    },
    // 发布 或者 下架房源  弹窗显示
    syncItems (type = 'on') {
      // 验证是否认证
      if (!this.userAuthentication && type === 'on') {
        this.certificationShow = true
        return false
      }
      console.log('type', type)
      const typeConfig = {
        'on': {
          title: '发布'
        },
        'off': {
          title: '下架'
        }
      }
      if (this.selectedItems.length === 0) {
        this.$message.error(`请选择需要${typeConfig[type].title}的房源`)
        return false
      }
      if (type === 'on') {
        const unfilterItem = this.selectedItems.filter(item => item.idlefishStatus === 2 && item.mailinStatus === 2)
        if (unfilterItem.length !== 0) {
          this.$message.error(`已${typeConfig[type].title}的房源不能再${typeConfig[type].title}`)
          return false
        }
      }
      if (type === 'off') {
        const unfilterItem = this.selectedItems.filter(item => ((item.idlefishStatus === 1 || item.idlefishStatus === 5) && (item.mailinStatus === 1 || item.mailinStatus === 5)))
        if (unfilterItem.length !== 0) {
          this.$message.error(`已${typeConfig[type].title}的房源不能再${typeConfig[type].title}`)
          return false
        }
      }
      this.dialogVisible = true
      this.dialogTitle = typeConfig[type].title
      if (type === 'off') {
        this.publishSelect.mailin = false
      } else {
        this.publishSelect.mailin = true
      }
      this.publishSelect.idlefish = false
    },
    goAuthorize () {
      this.authorizeShow = true
      this.goAuthorizeShow = false
    },
    // 发布 下架
    gotoHouseAsync () {
      const roomCodes = this.selectedItems.map(item => item.roomCode)
      const platform = []
      for (var i in this.publishSelect) {
        if (this.publishSelect[i]) {
          platform.push(i)
        }
      }
      let params = {
        platform: platform,
        roomCodes: roomCodes
        // platform: ['mailin'],
        // roomCodes: ['200708852']
      }
      console.log('发布的数据', params)
      if (this.dialogTitle === '发布') {
        for (let i = 0; i < params.platform.length; i++) {
          if (params.platform[i] === 'idlefish' && !this.authorizeStatus) {
            this.dialogVisible = false
            this.goAuthorizeShow = true
            return false
          }
        }
        publishHouseApi(params).then(response => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.dialogVisible = false
          this.searchParam()
        })
      }
      if (this.dialogTitle === '下架') {
        unPublishHouseApi(params).then(response => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
          this.dialogVisible = false
          this.searchParam()
        })
      }
    },
    goCertification () {
      this.$refs.certificationFrom.validate(valid => {
        if (valid) {
          const params = {
            name: this.certificationFrom.userName,
            idcard: this.certificationFrom.userId
          }
          certificationFromApi(params).then(response => {
            this.certificationShow = false
            this.$notify({
              title: '成功',
              message: '实名认证成功',
              type: 'success',
              duration: 2000
            })
            this.userAuthentication = true
            this.$store.dispatch('GetInfo').then(res => {
              // 认证成功之后 的回调函数
            })
          })
        }
      })
    },
    // 添加修改房间信息
    openRoomDetail (params) {
      hostingHouseInfoApi({
        fangyuanCode: params.fangyuanCode
      }).then((res) => {
        this.roomDetailModelVisible = true
        this.$nextTick(() => {
          this.$refs.hostingRoomDetail.setRoomDetailData(res.data)
        })
      }).catch(err => console.log(err))
    },
    // 闲鱼授权
    handleSetting () {
      this.authorizeShow = true
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
.app-container{margin-top:10px;}
  .model-search{
    margin-bottom: 20px;
  }
  .item-select {
    width: 140px;
    margin-right:10px;
  }
  .user-input{width:300px;}
  .item-flex{
    display: flex;
    height:46px;
  }
  .select-dialog {
  .dialog-footer {
  .tips {
    position: absolute;
    bottom: 15px;
    left: 15px;
    font-size: 14px;
    color: #999;
  }
  }
  }
  .select-platform-container {
    display:flex;
    justify-content: space-between;
    .left {
      margin-left: 30px;
    }

    .right {
      margin-right: 30px;
    }

    input[type="checkbox"] {
      display: none;
    }

    label {
      display: block;
      width: 120px;
      height: 30px;
      margin-bottom: 15px;
    }
  }
  .ml-selectStatus {
    width: 40px;
    height: 30px;
    margin-top: -30px;
    font-size: 25px;
    color: #ffa500;
    float: right;
    border: 0.5px solid #e4e7ed;
    text-align: center;
    line-height: 30px;
  }
  .ml-selectName {
    background-color: #ebeef5;
    width: 80px;
    height: 30px;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
  }
  .changeBackground {
    background-color: #ffa500;
    color: #ffffff;
  }
.goAuthorize{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  padding-bottom:20px;
}
.user-button{
  display: block;
  margin-left: 95px;
  }
.errorTip{
  margin: 10px;
  color: red;
  font-style: 12px;
  padding-left: 80px;
}
</style>
<style>
.editHouse .el-dialog{
     margin: 0;
     position: fixed;
     top: 0;
     left: auto;
     right: 0;
     height: 100%;
  }
.roomSelectStatus .el-switch__label *{font-size:12px;color:#909399}
.roomSelectStatus  .el-switch__label.is-active span{color:#409DFF}
</style>
