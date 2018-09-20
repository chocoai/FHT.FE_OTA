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
            <area-select
              v-model="searchParams.cityArea"
              :filterable="true"
              :show-all-levels="false"
              :level="0"
              placeholder="请选择城市"
              class="item-select"/>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchParams.keywords"
              size="small"
              placeholder="请选择小区"
              class="item-select"
            >
              <el-option
                :value="1"
                label="孔雀蓝"/>
              <el-option
                :value="0"
                label="等等等"/>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="searchParams.roomCode"
              size="small"
              placeholder="请输入房间号"
              class="item-select"
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
              v-model="searchParams.houseStatus"
              size="small"
              placeholder="请选择出租状态"
              class="item-select"
            >
              <el-option
                :value="1"
                label="已出租"/>
              <el-option
                :value="0"
                label="未出租"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchParams.publishStatus"
              size="small"
              placeholder="麦邻发布状态"
              class="item-select"
            >
              <el-option
                :value="1"
                label="麦邻已发布"/>
              <el-option
                :value="0"
                label="麦邻未发布"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchParams.idlefishStatus"
              size="small"
              placeholder="咸鱼发布状态"
              class="item-select"
            >
              <el-option
                :value="1"
                label="咸鱼已发布"/>
              <el-option
                :value="0"
                label="咸鱼未发布"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="success"
              icon="el-icon-upload"
              @click="syncItems('on')">发布</el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-remove"
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
                v-model="publishSelect.mlzf"
                type="checkbox"
              >
              <label for="mlRent">
                <div
                  :class="{changeBackground:publishSelect.mlzf}"
                  class="ml-selectName">麦邻租房</div>
                <div class="ml-selectStatus">
                  <i
                    v-show="publishSelect.mlzf"
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
        @select="handleSelectChange"
        @selection-change="handleSelectionChange"
      >
        <template
          slot="slot_idlefishStatus"
          slot-scope="scope">
          <el-popover
            v-if="scope.row.idlefishStatus === 2 "
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
            v-if="scope.row.mailinStatus === 2"
            trigger="hover"
            placement="top">
            <p>发布失败原因: {{ scope.row.mailinfailMessage }}</p>
            <div slot="reference">
              <el-tag :type="(scope.row.mailinStatus||scope.row.idlefishStatus) | renderStatusType">
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
        <template
          slot="houseHuxing"
          slot-scope="scope">
          {{ scope.row.chamberCount }}室{{ scope.row.boardCount }}厅{{ scope.row.toiletCount }}卫
        </template>
      </GridUnit>
      <div class="editHouse">
        <el-dialog
          :visible.sync="roomDetailModelVisible"
          :before-close="checkEditStatus"
          title="编辑房间"
          width="60%"
          top="0">
          <hosting-room-detail ref="hostingRoomDetail" :houseRentType="activeName === '分散式整租' ? 1 : 2" />
        </el-dialog>
      </div>
      <el-dialog
        :visible.sync="authorizeShow"
        title="闲鱼授权"
      ><authorize/></el-dialog>
    </div>
  </div>

</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import areaSelect from '@/components/AreaSelect'
import authorize from '@/components/Authorize'
import hostingRoomDetail from '@/views/hostingEntryHouse/components/hostingRoomDetail'
import { houseAsyncApi, changeRoomStatusApi, estateDeleteEstateApi, publishHouseApi, unPublishHouseApi } from '@/api/houseManage'
// import hostingRoomDetail from './components/hostingRoomDetail'
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
        '1': 'success',
        '2': 'danger',
        '0': 'info'
      }
      return statusMap[status] || 'info'
    },
    renderStatusValue (status) {
      const statusStrData = ['未发布', '已发布', '发布失败']
      return statusStrData[status] || '未知'
    }
  },

  data () {
    return {
      activeName: '分散式整租',
      houseAreaName: '整套面积',
      tabMapOptions: ['分散式整租', '分散式合租'],
      selectedItems: [],
      filterManagerList: [],
      authorizeShow: false,
      dialogTitle: '闲鱼授权',
      roomStatusArry: [],
      colModels: [
        {slot: 'selection', width: 30},
        {prop: 'subdistrictName', label: '公寓/小区', width: 300},
        {prop: 'roomNo', label: '房间号', width: 100},
        {prop: 'chamberCount', slotName: 'houseHuxing', label: '户型', width: 200},
        {prop: 'roomArea', label: '整套面积', width: 80},
        {prop: 'rentPrice', label: '推广价格', width: 80},
        {
          prop: 'mailinStatus',
          label: '麦邻租房',
          width: 100,
          type: 'status',
          slotName: 'slot_mailinStatus'
        },
        { prop: 'idlefishStatus',
          label: '闲鱼租房',
          width: 100,
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
        mlzf: true,
        idlefish: true
      },
      dialogVisible: false,
      searchParams: {
        houseRentType: 2, // 整租还是合租
        houseStatus: 0, // 出租状态
        publishStatus: '', // 麦邻发布
        idlefishStatus: '', // 闲鱼发布
        keywords: '', // 公寓小区
        cityArea: [], // 城市
        roomCode: '' // 房间号
      },
      url: houseAsyncApi.requestPath,
      method: houseAsyncApi.queryMethod,
      isMock: houseAsyncApi.isMock,
      roomDetailModelVisible: false
    }
  },
  watch: {
    // 'searchParams.cityArea': function (val) {
    //   if (val && val[1]) {
    //     this.searchParams.cityId = val[1]
    //   } else {
    //     this.searchParams.cityId = ''
    //   }
    // }
  },
  methods: {
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
    // 查询数据
    searchParam (type) {
      if (type === 'clear') {
        this.searchParams = {
          houseRentType: '', // 整租还是合租
          houseStatus: '', // 出租状态
          publishStatus: '', // 麦邻发布
          idlefishStatus: '', // 咸鱼发布
          keywords: '', // 公寓小区
          cityArea: [], // 城市
          roomCode: '' // 房间号
        }
      }
      this.searchParams.houseRentType = this.activeName === '分散式整租' ? 2 : 1
      this.colModels[4].label = this.activeName === '分散式整租' ? '整套面积' : '单间面积'
      // console.log('this.searchParams', this.searchParams)
      // 解决watch执行顺序
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    // 选择列表
    handleSelectionChange (list) {
      this.selectedItems = list
      console.log(this.selectedItems)
    },
    // 发布 或者 下架房源  弹窗显示
    syncItems (type = 'on') {
      console.log('type', type)
      const typeConfig = {
        'on': {
          title: '发布'
        },
        'off': {
          title: '下架'
        }
      }
      console.log(type)
      if (this.selectedItems.length === 0) {
        this.$message.error(`请选择需要${typeConfig[type].title}的房源`)
        return false
      }
      if (type === 'on') {
        const unfilterItem = this.selectedItems.filter(item => item.idlefishStatus === 1 && item.mailinStatus === 1)
        if (unfilterItem.length !== 0) {
          this.$message.error(`已${typeConfig[type].title}的房源不能再${typeConfig[type].title}`)
          return false
        }
      }
      if (type === 'off') {
        const unfilterItem = this.selectedItems.filter(item => item.idlefishStatus === 0 && item.mailinStatus === 0)
        if (unfilterItem.length !== 0) {
          this.$message.error(`已${typeConfig[type].title}的房源不能再${typeConfig[type].title}`)
          return false
        }
      }
      this.dialogVisible = true
      this.dialogTitle = typeConfig[type].title
      if (type === 'off') {
        this.publishSelect.mlzf = false
      } else {
        this.publishSelect.mlzf = true
      }
      this.publishSelect.idlefish = false
    },
    handleSelectChange () {},
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
        platforms: platform,
        roomCodeList: roomCodes
      }
      console.log(params)
      if (this.dialogTitle === '发布') {
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
    // 添加修改房间信息
    openRoomDetail (params) {
      this.roomDetailModelVisible = true
    },
    // 检查是否修改房源信息
    checkEditStatus (done) {
      const differentFlag = this.$refs.hostingRoomDetail.checkEditFlag()
      if (differentFlag) {
        this.$confirm('您还有数据未保存, 确认关闭吗？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      } else {
        done()
      }
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
</style>
