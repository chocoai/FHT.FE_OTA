<template>
  <div>
    <div class="layout_pageHeader">
      <h5 class="allotTitle">房源分配管理</h5>
      <div class="orgDataRoom">
        <p
          v-if="!distributeHouse"
          class="allotaddr">给部门&nbsp;<span>{{ orgData.depName }}&nbsp;</span>分配房源</p>
        <p
          v-if="distributeHouse"
          class="allotaddr">给账号&nbsp;<span>{{ orgData.name }}&nbsp;|&nbsp;{{ orgData.mobile }}&nbsp;|&nbsp;{{ orgData.depName }}&nbsp;</span>分配房源</p>
        <el-checkbox
          v-if="distributeHouse"
          v-model="allRoom"
          :true-label="1"
          :false-label="0">
          部门旗下所有房源
        </el-checkbox>
      </div>
      <el-form class="model-search clearfix">
        <div class="item-flex">
          <el-form-item>
            <el-select
              v-model="formData.resource"
              size="small"
              class="item-select">
              <el-option
                :value="1"
                label="集中式"></el-option>
              <el-option
                :value="2"
                label="分散式"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formData.regionId"
              size="small"
              filterable
              clearable
              placeholder="请选择区域"
              class="item-select"
              @change="handleChange">
              <el-option
                v-for="item in areaPotions"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formData.subdistrictId"
              clearable
              filterable
              size="small"
              class="item-select"
              placeholder="请选择公寓小区">
              <el-option
                v-for="item in subdistrictNames"
                :key="item.regionAddressId"
                :label="item.name"
                :value="item.regionAddressId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formData.subdistrictName"
              clearable
              placeholder="请输入公寓/小区"
              size="small"
              level="1"
              class="item-select"
              filterable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin-left:10px;"
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="searchParam">查询</el-button>
            <el-button
              size="small"
              icon="el-icon-remove-outline"
              style="margin-left:10px"
              @click="searchParam('clear')"
            >清空</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="layout-container">
      <GridUnit
        ref="refGridUnit"
        :form-options="formData"
        :data-method="method"
        :url="url"
        :is-mock="isMock"
        :columns="colModels"
        :show-selection="true"
        :selection-key="`fangyuanCode`"
        total-field="data.record"
        list-field="data.houseList">
      </GridUnit>
      <div
        :class="{hideSidebar:!sidebar.opened}"
        class="btnpos">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-arrow-left"
          @click="backPre">返回</el-button>
        <el-button
          type="primary"
          size="small"
          @click="submitOrgRoom">确定分配</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { queryDistributeToDepListApi, distributeHouseToDepApi, queryDistributeToUserListApi } from '@/api/organization'
import { distributeHouseToUserApi } from '@/api/staffManage'
import { queryCityAreaPlotApi } from '@/api/houseManage'
import { deepClone } from '@/utils'

export default {
  name: 'Allotroom',
  components: {
    GridUnit
  },
  data () {
    return {
      allRoom: '',
      orgData: [],
      formData: {
        userId: '',
        depId: '',
        resource: 2, // 1，集中式  2,分散式
        pageNo: '1',
        pageSize: '20',
        regionId: '',
        subdistrictId: '', // 小区名称
        subdistrictName: '' // 小区名称（模糊查询）
      },
      selectFangyuanCodes: [],
      areaPotions: [], // 城市区域
      subdistrictNames: [],
      nowAreaName: [],
      colModels: [],
      distributeHouse: false, // true员工分配房源  false部门分配房源
      colModelsFs: [ // 分散式
        {prop: 'subdistrictName', label: '公寓/小区', width: 300},
        {prop: 'roomNo', label: '房间号', width: 150},
        {prop: 'chamberCount',
          label: '户型',
          render (row) {
            return (row.chamberCount || 0) + '室' + (row.boardCount || 0) + '厅' + (row.toiletCount || 0) + '卫'
          }
        }
      ],
      colModelsJz: [// 集中式
        {prop: 'subdistrictName', label: '公寓/小区', width: 300},
        {prop: 'roomCount', label: '房间数'}
      ],
      url: queryDistributeToDepListApi.requestPath,
      method: queryDistributeToDepListApi.queryMethod,
      isMock: queryDistributeToDepListApi.isMock
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  created () {
    this.orgData = deepClone(this.$route.query) || []
    this.colModels = deepClone(this.colModelsFs)
    this.formData.depId = this.orgData.depId
    this.formData.userId = this.orgData.id

    if (this.orgData.role) {
      this.distributeHouse = true
      this.url = queryDistributeToUserListApi.requestPath
    } else {
      this.url = queryDistributeToDepListApi.requestPath
    }
    if (this.orgData.hasAllRoomAuth === 1) { // 如果是所有房源  表格为空
      if (this.orgData.role === 2) {
        this.allRoom = 1
      }
    }
  },
  mounted () {
    this.getAreaName()
  },
  methods: {
    getAreaName () { // 获取市的区域
      let areaResource = this.formData.resource === 1 ? 3 : 4 // 查询城市中 3为集中式  4 为分散式
      let param = {
        'resource': areaResource
      }
      if (this.distributeHouse) {
        param.userId = this.orgData.id
      }
      queryCityAreaPlotApi(param).then((res) => {
        this.nowAreaName = deepClone(res.data.subdistrictList)
        for (let i = 0; i < res.data.cityList.length; i++) {
          if (res.data.cityList[i].cityId === this.orgData.cityId * 1) {
            this.areaPotions = deepClone(res.data.cityList[i].regionList)
          }
        }
      })
    },
    handleChange (areaId) {
      this.nowAreaName.filter((item) => {
        if (item.areaId === areaId && item.cityId === this.orgData.cityId * 1) {
          this.subdistrictNames.push({
            'name': item.name,
            'regionAddressId': item.regionAddressId
          })
        }
      })
    },
    searchParam (type) {
      if (this.formData.resource === 1) { // 如果是集中式
        this.colModels = deepClone(this.colModelsJz)
      } else {
        this.colModels = deepClone(this.colModelsFs)
      }
      if (type === 'clear') {
        this.formData = {
          userId: this.orgData.id,
          depId: '',
          resource: this.formData.resource, // 1，集中式  2,分散式
          pageNo: '1',
          pageSize: '20',
          regionId: '',
          subdistrictId: '', // 小区名称
          subdistrictName: '' // 小区名称（模糊查询）
        }
      }
      this.formData.depId = this.orgData.depId
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },

    submitOrgRoom () { // 确定分配的房源
      this.getMultipleSelectionAll()// 获取房源fangyuanCodes
      let param = {
        'fangyuanCodes': deepClone(this.selectFangyuanCodes)
      }
      if (!this.selectFangyuanCodes.length) {
        this.$message({
          message: '请选择要分配的房源',
          type: 'warning'
        })
        return false
      }
      if (this.distributeHouse) {
        param.userId = this.orgData.id
        distributeHouseToUserApi(param).then((response) => {
          if (response.code * 1 === 0) {
            this.$message({
              message: '员工房源分配成功',
              type: 'success'
            })
            this.searchParam()
            this.selectFangyuanCodes = []
          } else {
            this.$message({
              message: response.message,
              type: 'success'
            })
          }
        })
      } else {
        param.depId = this.orgData.depId
        distributeHouseToDepApi(param).then((response) => {
          if (response.code * 1 === 0) {
            this.$message({
              message: '部门房源分配成功',
              type: 'success'
            })
            this.searchParam()
            this.selectFangyuanCodes = []
          } else {
            this.$message({
              message: response.message,
              type: 'success'
            })
          }
        })
      }
    },
    getMultipleSelectionAll () { // 获取已选择数据
      const multipleSelectionAll = this.$refs.refGridUnit.multipleSelectionAll
      multipleSelectionAll.forEach((item) => {
        this.selectFangyuanCodes.push(item.fangyuanCode)
      })
    },
    backPre () {
      if (this.distributeHouse) {
        this.$router.push({name: '人员管理'})
      } else {
        this.$router.push({name: '组织架构'})
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .allotTitle {
    font-size: 18px;
    padding-bottom: 20px;
    margin-top:10px;
    font-weight: normal;
    border-bottom: 1px solid #e6ebf5
  }
  .allotaddr {
    line-height:3px;
    font-size:14px;
    span{
      color:red;
      font-style: normal;
    }
  }
  .item-flex {
    display: flex;
  }
 .item-select {
    margin-right:10px;
  }
  .btnpos {
    padding: 10px 0;
    box-shadow:0 -1px 4px rgba(0, 0, 0, .08);
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    left: 100px;
    background: #fff;
    z-index: 200;
    &.hideSidebar {
      left: 50px;
    }
  }
  .orgDataRoom {
    display: flex;
    justify-content: space-between
  }
</style>
