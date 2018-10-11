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
        width="250px"
        class="asideBox">
        <div class="currentOr">当前架构</div>
        <el-tree
          ref="trees"
          :data="treeData"
          :props="defaultProps"
          :default-expanded-keys="[nowOrgObj.id]"
          :highlight-current="true"
          :expand-on-click-node="false"
          :indent="8"
          node-key="id"
          @node-click="handleNodeClick">
        </el-tree>
      </el-aside>
      <el-main>
        <div class="search-area">
          <el-input
            v-model="formData.depName"
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
            @click.native="searchParam('clear')">清空</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            class="filter-item"
            @click.native="addOrg">添加部门</el-button>
        </div>
        <GridUnit
          ref="refGridUnit"
          :form-options="formData"
          :data-method="method"
          :url="url"
          :is-mock="isMock"
          :auto-load="false"
          :columns="colModels">
          <template
            slot="operateHosting"
            slot-scope="scope">
            <el-row>
              <el-button
                type="primary"
                size="mini"
                @click="assignHouse(scope.row)">分配房源</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="editOrg(scope.row)">编辑</el-button>
            </el-row>
          </template>
        </GridUnit>
      </el-main>
    </el-container>
    <!-- 添加部门弹窗 -->
    <div class="editDep">
      <el-dialog
        :close-on-click-model="false"
        :visible.sync="layer_addOrg"
        :title="isEditOrg ? '编辑部门' : '添加部门'"
        width="500px"
        @close="layerClose">
        <el-form
          ref="orgForm"
          :model="orgForm"
          :rules="rules"
          label-position="left"
          label-width="80px"
          size="small">
          <div v-if="!editChangeOrg">
            <el-form-item
              label="部门名称"
              prop="depName"
              class="item-select">
              <el-input
                v-model="orgForm.depName"
                placeholder="请输入部门名称"
                max-length="20">
              </el-input>
            </el-form-item>
            <el-form-item
              label="上级部门"
              prop="superiorName">
              <el-select
                v-model="orgForm.superiorName"
                placeholder="请选择上级部门">
                <el-option
                  v-for="item in preDepNames"
                  :value="item.value"
                  :label="item.label"
                  :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="所在区域"
              prop="depNameArea">
              <el-select
                v-model="orgForm.depNameArea"
                placeholder="请选择所在区域">
                <el-option
                  v-for="item in depNameAreas"
                  :value="item.value"
                  :label="item.label"
                  :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item>
            <p v-if="editChangeOrg">确认更换上级部门吗？上级部门变动后，当前部门旗下的所有部门都会被迁移，包括旗下的人员</p>
            <el-button
              type="primary"
              @click="submitOrg">确定</el-button>
            <el-button @click="layer_addOrg = false">取消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>
    <!-- 确定编辑部门弹窗 -->
    <!-- <div>
      <el-dialog
        :close-on-click-model="false"
        :visible.sync="editChangeOrg"
        title="更换部门"
        width="400px"
        @close="changeOrgClose">
        <p>确认更换上级部门吗？上级部门变动后，当前部门旗下的所有部门都会被迁移，包括旗下的人员</p>
      </el-dialog>
    </div> -->
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
// import { validateMobile, validateisCard } from '@/utils/validate'
import { deepClone } from '@/utils'
import { houseAsyncApi } from '@/api/houseManage'
import { queryDepartmentApi, createDepartmentApi } from '@/api/organization'

export default {
  name: 'FrameWork',
  components: {
    GridUnit
  },
  data () {
    return {
      treeData: [{
        depName: '杭州来去自如房产管理有限公司',
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
      nowOrgObj: { // 默认展开选中
        depName: '',
        id: '1'
      },
      parentOrg: {
        depName: '',
        id: ''
      },
      formData: { // 表格数据
        depName: '',
        depId: '',
        type: null,
        isDelete: 0
      },
      orgForm: {
        depName: '',
        superiorName: '',
        depNameArea: ''
      },
      // superiorName: '', // 添加部门上级部门
      // depNameArea: '', // 添加部门所在区域
      rules: { // 添加部门验证
        depName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        superiorName: [
          { required: true, message: '请选择上级部门', trigger: 'change' }
        ],
        depNameArea: [
          { required: true, message: '请选择所在区域', trigger: 'change' }
        ]
      },
      preDepNames: [{
        value: '西湖总部',
        label: '西湖总部'
      }
      ],
      depNameAreas: [{
        value: '西湖区',
        label: '西湖区'
      }],
      layer_addOrg: false, // 添加部门弹窗
      isEditOrg: false, // 为true 编辑  false  增加部门
      editChangeOrg: false, // 确定更换上一部门
      colModels: [ // 表格数据
        {prop: 'depName', label: '部门名称', width: 300},
        {prop: 'predepName', label: '上级部门', width: 150},
        {prop: 'createTime', label: '创建时间', width: 150},
        {prop: 'number', label: '管理房源数量', width: 150},
        {
          prop: 'operate',
          label: '操作',
          slotName: 'operateHosting'
        }
      ],
      url: houseAsyncApi.requestPath,
      method: houseAsyncApi.queryMethod,
      isMock: houseAsyncApi.isMock,
      searchParams: {

      }
    }
  },
  created () {
    this.getTree()
  },
  methods: {
    getTree (id, fn) { // 获取组织架构名称并且默认表格数据
      queryDepartmentApi().then(res => {
        if (res.data && res.data instanceof Array) {
          this.treeData = res.data
          let nowId = id || this.treeData[0].id
          this.getFirstNode(nowId)
          // if (fn) {
          //   this.$nextTick(() => {
          //     fn()
          //   })
          // }
        }
      }).catch(rej => {})
    },
    getFirstNode (id) {
      this.$nextTick(() => { // 设置tree的默认选中节点 0是node-key设置的参数对应的值
        this.$refs.trees.setCurrentKey(id)
        const obj = this.$refs.trees.getNode(id) // 根据 data 或者 key 拿到 Tree 组件中的 node
        this.nowOrgObj = deepClone(obj.data)
        this.parentOrg = obj.parent.data instanceof Array ? deepClone(obj.parent.data[0]) : deepClone(obj.parent.data)
        this.formData.depId = this.nowOrgObj.id
        this.$nextTick(() => {
          this.searchParam()
        })
      })
    },
    searchParam (type) { // 查询
      if (type === 'clear') {
        this.formData.depName = ''
      }
      this.$refs.refGridUnit.searchHandler()
    },
    handleNodeClick (node, data) { // 点击tree节点函数

    },
    addOrg () { // 添加部门
      this.isEditOrg = false
      this.layer_addOrg = true
      this.orgForm.superiorName = this.nowOrgObj.depName // 上级部门
    },
    editOrg () { // 编辑部门
      this.isEditOrg = true
      this.orgForm.superiorName = this.parentOrg.depName
      this.editParentId = this.parentOrg.id
      this.orgForm.depName = this.nowOrgObj.depName
      this.layer_addOrg = true
    },
    layerClose () { // 部门弹框关闭
      this.$refs['orgForm'].resetFields()
      this.orgForm.depName = ''
    },
    assignHouse () { // 分配房源

    },
    editAccount () { // 编辑账号

    },
    submitOrg () { // 确定添加部门 或者编辑部门
      this.$refs['orgForm'].validate((valid) => {
        if (valid) {
          let param = deepClone(this.orgForm)
          if (this.isEditOrg) { // 编辑部门
            // if(){  //如果上一级部门发生了变化
            this.editChangeOrg = true
            // }
            console.log(111111)
          } else { // 新增部门
            param.parentId = this.nowOrgObj.id
          }
          createDepartmentApi(param).then((res) => {

          })
        }
      })
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
    border-bottom: thin solid #ddd;
    font-size: 14px;
    margin: 10px;
    line-height: 40px;
    color: #606266
  }
  .search-area {
    margin-bottom: 10px;
  }
</style>
<style>
 .model-table {
    border: 1px solid #e6ebf5;
    border-bottom:none
  }
</style>
