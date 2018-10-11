/*
 * @Author: dengdongming
 * @Date: 2018-10-10 17:04:57
 * @Last Modified by:dengdongming
 * @Last Modified time: 2018-10-10 17:04:57
 */
<template>
  <div class=" con-f">
    <el-container>
      <el-aside
        width="240px"
        class="asideBox">
        <div class="currentOr">当前架构</div>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick">
        </el-tree>
      </el-aside>
      <el-main>
        <div>
          <el-input
            v-model="depName"
            placeholder="请输入部门名称"
            size="small"
            class="item-select"></el-input>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            class="filter-item"
            @click.native="searchParam">查询</el-button>
          <el-button
            plain
            size="small"
            icon="el-icon-remove-outline"
            @click.native="clearForm">清空</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            class="filter-item"
            @click.native="addDep">添加部门</el-button>
        </div>
        <GridUnit
          ref="refGridUnit"
          :form-options="searchParams"
          :data-method="method"
          :url="url"
          :is-mock="isMock" >
          <template
            slot="operateHosting"
            slot-scope="scope">
            <el-row>
              <el-button
                type="primary"
                size="mini"
                @click="allotRoom(scope.row)">分配房源</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="editRoom(scope.row)">编辑</el-button>
            </el-row>
          </template>
        </GridUnit>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
// import { validateMobile, validateisCard } from '@/utils/validate'
// import { deepClone } from '@/utils'
import { houseAsyncApi } from '@/api/houseManage'

export default {
  name: 'FrameWork',
  components: {
    GridUnit
  },
  data () {
    return {
      treeData: [{
        depName: '复恒科技总部',
        id: 1,
        child: [{
          depName: '上海分部',
          id: 2
        }]
      }],
      defaultProps: {
        children: 'child',
        label: 'depName'
      },
      depName: '', // 部门名称,
      colModels: [ // 表格数据
        {prop: 'depName', label: '部门名称', width: 250},
        {prop: 'predepName', label: '上级部门', width: 150},
        {prop: 'createTime', label: '创建时间', width: 100},
        {prop: 'number', label: '管理房源数量', width: 100},
        {
          prop: 'operate',
          label: '操作',
          slotName: 'operateHosting',
          width: 200
        }
      ],
      url: houseAsyncApi.requestPath,
      method: houseAsyncApi.queryMethod,
      isMock: houseAsyncApi.isMock,
      searchParams: {

      }
    }
  },
  methods: {
    clearForm () { // 清空

    },
    searchParam () { // 查询
      this.$refs.refGridUnit.searchHandler()
    },
    handleNodeClick (node, data) { // 点击tree节点函数
      // this.nowOrgObj = deepClone(data.data)
      // this.formData.depId = this.nowOrgObj.id
      // this.$nextTick(() => {
      //   this.searchParam()
      // })
    },
    addDep () { // 添加部门

    },
    allotRoom () { // 分配房源

    },
    editRoom () { // 编辑

    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .con-f {background:#fff;margin:-10px;}
  .asideBox {
      border: 1px solid #ddd;
      height: auto;
      margin:20px 0 20px 20px;
    }
  .item-select {
      width: 250px;
      margin-right:10px;
    }
  .currentOr {
    border-bottom:thin solid #ddd;
    font-size:14px;
    margin:10px;
    line-height:40px;
    color:#606266

  }
</style>
