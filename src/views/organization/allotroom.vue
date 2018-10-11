<template>
  <div class="layout-container">
    <h5 class=" allotTitle">房源分配管理</h5>
    <p class="allotaddr">给部门<span>{{ depName }}</span>分配房源</p>
    <el-form class="model-search clearfix">
      <div class="item-flex">
        <el-form-item>
          <el-select
            v-model="allotData.resource"
            size="small"
            class="item-select">
            <el-option
              value="1"
              label="集中式"></el-option>
            <el-option
              value="2"
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
      :columns="colModels">
    </GridUnit>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { houseAsyncApi } from '@/api/houseManage'
export default {
  name: 'Allotroom',
  components: {
    GridUnit
  },
  data () {
    return {
      depName: '这里是部门',
      allotData: {
        resource: '',
        region: [],
        regionAddressId: '',
        regionAddress: ''
      },
      formData: {},
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
      colModels: [ // 表格数据
        {prop: 'depName', label: '小区', width: 300},
        {prop: 'predepName', label: '房间号', width: 150},
        {prop: 'predepName', label: '户型'}
      ],
      url: houseAsyncApi.requestPath,
      method: houseAsyncApi.queryMethod,
      isMock: houseAsyncApi.isMock
    }
  },
  mounted () {
  },
  methods: {
    handleChange () {

    },
    searchParam () {
      this.formData = {}
      console.log(this.allotData.resource)
      if (this.allotData.resource === 1) { // 如果是集中式
        this.colModels = []
        this.colModels = [ // 集中式的
          {prop: 'depName', label: '公布', width: 300},
          {prop: 'predepName', label: '房间数'}
        ]
        this.$nextTick(() => {
          this.$refs.refGridUnit.searchHandler()
        })
      }
      console.log(this.colModels)
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
  .item-select{margin-right:10px;}
</style>
