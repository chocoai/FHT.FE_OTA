<template>
  <div class="app-container">
    <el-button
      size="small"
      @click="handleSetting()">申请开通</el-button>
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="handleClickTab">
      <el-tab-pane
        v-for="(item,index) in tabMapOptions"
        :label="item"
        :key="index"
        :name="item"/>
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
          title="选择发布平台"
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
              @click="gotoHouseAsync">{{ dialogTitle === "撤销"?"确定":"发布" }}</el-button>
          </span>
        </el-dialog>
      </el-form>
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
          {{ scope.row.roomStatus }}
          <el-row>
            <el-switch
              v-model="scope.row.roomStatus"
              active-text="已出租"/>
          </el-row>
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
    </el-tabs>
    <el-dialog
      :title="isEditFlag ? '编辑房间' : '添加房源'"
      :visible.sync="roomDetailModelVisible"
      :before-close="checkEditStatus"
      width="1000px">
      <!--<hosting-room-detail ref="hostingRoomDetail"/>-->
      <el-table-column
        slot="selection"
        type="selection"/>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          v-if="!isEditFlag"
          size="small"
          type="primary"
          @click="saveRoomDetailData('add')">保存并继续添加</el-button>
        <el-button
          size="small"
          type="primary"
          @click="saveRoomDetailData('close')">{{ isEditFlag ? '保 存' : '保存并关闭' }}</el-button>
        <el-button
          size="small"
          @click="saveRoomDetailData('clear')">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="authorizeShow"
      title="闲鱼授权"
    ><authorize/></el-dialog>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import areaSelect from '@/components/AreaSelect'
import authorize from '@/components/Authorize'
import { houseAsyncApi } from '@/api/houseManage'
// import hostingRoomDetail from './components/hostingRoomDetail'
export default {
  name: 'HouseSync',
  components: {
    GridUnit,
    areaSelect,
    authorize
    // hostingRoomDetail
  },
  filters: {
    // 麦邻 咸鱼发布状态
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
      value3: true,
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
          // slotName: 'roomStatusHosting',
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
        houseRentType: 1, // 整租还是合租
        houseStatus: 0, // 出租状态
        publishStatus: '', // 麦邻发布
        idlefishStatus: '', // 咸鱼发布
        keywords: '', // 公寓小区
        cityArea: [], // 城市
        roomCode: '' // 房间号
      },
      url: houseAsyncApi.requestPath,
      method: houseAsyncApi.queryMethod,
      isMock: houseAsyncApi.isMock,
      isEditFlag: true,
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

      this.searchParams.houseRentType = this.activeName === '分散式整租' ? 1 : 0
      this.colModels[4].label = this.activeName === '分散式整租' ? '整套面积' : '单间面积'
      console.log('this.searchParams', this.searchParams)
      // 解决watch执行顺序
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    // 选择列表
    handleSelectionChange (list) {
      this.selectedItems = list
    },
    syncItems (type = 'on') {
      console.log('type', type)
      const typeConfig = {
        'on': {
          title: '发布'
        },
        'off': {
          title: '撤销'
        }
      }
      if (this.selectedItems.length === 0) {
        this.$message.error(`请选择需要${typeConfig[type].title}的房源`)
        return false
      }
      const pendingRomms = this.selectedItems.filter(item => item.idlefishStatus === '发布中')
      if (pendingRomms.length > 0) {
        this.$message.error(`发布中的房源不能进行${typeConfig[type].title}`)
        return false
      }
      const unfilterItem = this.selectedItems.filter(item => item.idlefishStatus === type || item.publishStatus === type)
      if (unfilterItem.length !== 0) {
        this.$message.error(`已${typeConfig[type].title}的房源不能再${typeConfig[type].title}`)
        return false
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

    gotoHouseAsync () {
      // 发布房源
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
      if (this.dialogTitle === '发布') {
        const manage = this.filterManagerList.filter(item => item.id === this.sourceInfo)
        if (manage.length) {
          params = Object.assign(params, {
            picProviderId: this.sourceInfo,
            picProviderName: manage[0].name
          })
        }
      }
      console.log(params)
      // publishHouseApi(params, this.dialogTitle === '发布' ? 1 : 2).then(response => {
      //   this.$notify({
      //     title: '成功',
      //     message: '操作成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   this.dialogVisible = false
      //   this.searchParam()
      // })
    },
    // 添加修改房间信息
    openRoomDetail (params) {

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
    handleSetting () {
      this.authorizeShow = true
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
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
