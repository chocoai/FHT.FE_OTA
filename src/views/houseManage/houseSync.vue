<template>
  <div class="app-container">
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
              placeholder="请选择城市"
              class="item-select"
            />
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
                label="已出租"/>
              <el-option
                :value="0"
                label="未出租"/>
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
              v-model="searchParams.mlpublishStatus"
              size="small"
              placeholder="请选择麦邻租房"
              class="item-select"
            >
              <el-option
                :value="1"
                label="已发布"/>
              <el-option
                :value="0"
                label="未发布"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="searchParams.xypublishStatus"
              size="small"
              placeholder="请选择咸鱼租房"
              class="item-select"
            >
              <el-option
                :value="1"
                label="已发布"/>
              <el-option
                :value="0"
                label="未发布"/>
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
          :before-close="handleClose"
          title="选择发布平台"
          class="select-dialog"
          width="450px">

          <div class="select-platform-container clearfix">
            <div>
              <input
                id="mlRent"
                v-model="publishSelect.mlzf"
                type="checkbox" >
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
            <span
              v-show="dialogTitle === '发布'"
              class="tips">温馨提示：飞虎队房源需填写照片提供者</span>
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
        :columns="colModels">
        <template
          slot="operateHosting"
          slot-scope="scope">
          <el-row>
            <el-button
              type="success"
              size="mini"
            >已出租</el-button>
            <!--<el-button type="info" round>信息按钮</el-button>-->
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
    </el-tabs>
    <el-dialog
      :title="isEditFlag ? '编辑房间' : '添加房源'"
      :visible.sync="roomDetailModelVisible"
      :before-close="checkEditStatus"
      width="1000px">
      <!--<hosting-room-detail ref="hostingRoomDetail"/>-->
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
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import areaSelect from '@/components/AreaSelect'
import { houseAsyncApi } from '@/api/houseManage'
// import hostingRoomDetail from './components/hostingRoomDetail'
export default {
  name: 'HouseSync',
  components: {
    GridUnit,
    areaSelect
    // hostingRoomDetail
  },
  data () {
    return {
      activeName: '分散式整租',
      tabMapOptions: ['分散式整租', '分散式合租', '集中式整栋'],
      colModels: [
        {slot: 'selection'},
        {prop: 'organizationName', label: '组织名称'},
        {prop: 'address', label: '房源位置', width: 200},
        {prop: 'roomName', label: '公寓/小区-房间', width: 200},
        {prop: 'houseType', label: '房源类型', width: 150},
        {prop: 'roomCode', label: '房源编码', width: 100},
        {prop: 'rent', label: '房价(元/月)', width: 100, align: 'right'},
        {prop: 'name', label: '姓名', width: 100},
        {prop: 'mobile', label: '手机号', width: 150},
        {prop: 'userType', label: '用户类型', width: 100},
        {
          prop: 'operate',
          label: '设置',
          slotName: 'operateHosting',
          width: '260',
          fixed: 'right'
        }
      ],
      publishSelect: {
        mlzf: true,
        idlefish: true
      },
      dialogVisible: false,
      dialogTitle: '',
      searchParams: {
        houseRentType: 1,
        houseStatus: 0,
        houseType: '',
        mlpublishStatus: '',
        xypublishStatus: '',
        keywords: '',
        cityArea: [],
        roomCode: ''
      },
      url: houseAsyncApi.defaultOptions.requestUrl, // 请求接口
      method: houseAsyncApi.defaultOptions.method,
      isEditFlag: true,
      roomDetailModelVisible: false
    }
  },
  methods: {
    // tabs切换
    handleClickTab (tab) {
      this.searchParam('clear')
    },
    // 表格数据
    // 查询
    searchParam (type) {
      if (type === 'clear') {
        this.searchParams = {
          houseStatus: '',
          houseType: '',
          publishStatus: '',
          organizationName: '',
          keywords: '',
          mobileOrName: '',
          cityId: '',
          cityArea: [],
          roomCode: ''
        }
      }
      this.searchParams.houseRentType = this.activeName === '分散式整租' ? 1 : (this.activeName === '分散式租合租' ? 2 : 0)
      console.log(' this.searchParams', this.searchParams)
      // 解决watch执行顺序
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    syncItems (type = 'on') {
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
      this.publishSelect.mlzf = false
      this.publishSelect.idlefish = false
    },
    gotoHouseAsync () {

    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
  .model-search{margin-bottom:20px;}
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
