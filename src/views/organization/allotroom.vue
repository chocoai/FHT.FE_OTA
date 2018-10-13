<template>
  <div class="layout-container">
    <h5 class=" allotTitle">房源分配管理</h5>
    <p class="allotaddr">给部门&nbsp;<span>{{ orgData.depName }}&nbsp;</span>分配房源</p>
    <el-form class="model-search clearfix">
      <div class="item-flex">
        <el-form-item>
          <el-select
            v-model="allotData.resource"
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
          <el-cascader
            v-model="allotData.region"
            :options="options"
            placeholder="请选择区域"
            size="small"
            level="1"
            class="item-select"
            filterable
            clearable
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="allotData.regionAddress"
            size="small"
            class="item-select"
            placeholder="请选择公寓小区">
            <el-option
              value="1"
              label="美元小区"></el-option>
            <el-option
              value="1"
              label="西湖小区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="allotData.regionAddressId"
            placeholder="请输入公寓/小区"
            size="small"
            level="1"
            class="item-select"
            filterable
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-left:10px;"
            type="primary"
            size="small"
            @click="searchParam">查询</el-button>
          <el-button
            size="small"
            icon="el-icon-remove-outline"
            style="margin-left:10px"
          >清空</el-button>
        </el-form-item>
      </div>
    </el-form>
    <GridUnit
      ref="refGridUnit"
      :form-options="formData"
      :data-method="method"
      :url="url"
      :is-mock="isMock"
      :auto-load="false"
      :columns="colModels"
      :show-selection="true"
      list-field="hostList">
    </GridUnit>
    <div class="btnpos">
      <el-row
        type="flex"
        justify="end">
        <el-button
          type="primary"
          size="small"
          @click="submitList">确定</el-button>
        <el-button
          size="small"
          @click="layer_addOrg = false">取消</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { queryDistributeToDepListApi } from '@/api/organization'
import { deepClone } from '@/utils'

export default {
  name: 'Allotroom',
  components: {
    GridUnit
  },
  data () {
    return {
      orgData: [],
      depName: '这里是部门',
      allotData: {
        resource: '',
        region: [],
        regionAddressId: '',
        regionAddress: ''
      },
      formData: {
        depId: '',
        resource: '2', // 1，集中式  2,分散式
        pageNo: '1',
        pageSize: '20',
        regionId: '',
        subdistrictId: '', // 小区名称
        subdistrictName: '' // 小区名称（模糊查询）
      },
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则'
          }]
        }
      ],
      colModels: [],
      colModelsFs: [ // 分散式
        {prop: 'subdistrictName', label: '小区', width: 300},
        {prop: 'roomNo', label: '房间号', width: 150},
        {prop: 'chamberCount',
          label: '户型',
          render (row) {
            return (row.chamberCount || 0) + '室' + (row.boardCount || 0) + '厅' + (row.toiletCount || 0) + '卫'
          }
        }
      ],
      colModelsJz: [// 集中式
        {prop: 'depName', label: '公寓', width: 300},
        {prop: 'roomCount', label: '房间数'}
      ],
      url: queryDistributeToDepListApi.requestPath,
      method: queryDistributeToDepListApi.queryMethod,
      isMock: queryDistributeToDepListApi.isMock
    }
  },
  mounted () {
    this.orgData = deepClone(this.$route.query) || []
    this.colModels = deepClone(this.colModelsFs)
    this.formData.depId = this.orgData.depId

    console.log('queryData', this.orgData)
  },
  methods: {
    handleChange () {

    },
    searchParam () {
      // this.formData = []
      this.formData.resource = this.allotData.resource
      if (this.allotData.resource === 1) { // 如果是集中式
        this.colModels = deepClone(this.colModelsJz)
      } else {
        this.colModels = deepClone(this.colModelsFs)
      }
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    },
    submitList () { // 确定分配的房源

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .allotTitle {
    font-size: 14px;
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
  .item-select{
    margin-right: 10px;
    }
  .btnpos {
    margin-top:20px;
  }
</style>
