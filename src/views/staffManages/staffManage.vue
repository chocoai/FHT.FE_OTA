<template>
  <div>
    <el-form class="model-search clearfix">
      <div class="item-flex">
        <el-form-item>
          <el-select
            v-model="selectDepart"
            size="small"
            class="item-select"
            placeholder="请选择部门">
            <el-option
              value="1"
              label="全部部门"></el-option>
            <el-option
              value="1"
              label="杭州总部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="inputDepart"
            placeholder="请输入姓名/部门"
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
            style="margin-left:10px;"
            type="primary"
            size="small"
            @click="handleApply()">新增账号</el-button>
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
      <template
        slot="operateHosting"
        slot-scope="scope">
        <el-row>
          <el-button
            type="primary"
            size="mini"
            @click="assignHouse(scope.row)">房源管理</el-button>
          <el-button
            type="danger"
            size="mini"
            @click="editOrg(scope.row)">编辑</el-button>
        </el-row>
      </template>
    </GridUnit>
    <!-- 新增，编辑账号 -->
    <el-dialog
      :title="isEditAccount ? '编辑账号' : '新增账号'"
      :visible="layer_account"
      :close-on-click-modal="false"
      width="800px"
      @close="closeAccount">
      <el-form
        ref="accountForm"
        :model="accountForm"
        :rules="rules"
        size="small"
        label-position="right"
        label-width="100px">

        <el-row>
          <el-col :span="8">
            <el-form-item
              label="手机号码"
              prop="mobile">
              <el-input v-model="accountForm.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="姓名"
              prop="name">
              <el-input
                v-model="accountForm.name"
                :disabled="editAdd"
                maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="性别"
              prop="sex">
              <el-select v-model="accountForm.sex">
                <el-option
                  v-for="item in genderOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="所属部门"
              prop="depName">
              <el-select
                v-model="accountForm.depName"
                style="width: 100%">
                <!-- <el-tree
                  ref="overlayTree"
                  :data="treeData"
                  :props="defaultProps"
                  :highlight-current="true"
                  :expand-on-click-node="false"
                  :default-expanded-keys="[nowOrgObj.id]"
                  node-key="id"
                  @node-click="overlayNodeClick">
                </el-tree> -->
                <el-option
                  style="display:none"
                  value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form></el-dialog>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { validateMobile } from '@/utils/validate'
import { houseAsyncApi } from '@/api/houseManage'
// import { deepClone } from '@/utils'
export default {
  name: 'StaffManage',
  components: {
    GridUnit
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      selectDepart: '',
      inputDepart: '',
      isEditAccount: false,
      layer_account: false,
      accountForm: {
        mobile: '',
        name: '',
        sex: 1,
        depId: '',
        depName: '',
        role: '',
        imei: '',
        type: 1,
        gmtHire: '',
        idNo: ''
      },
      rules: {
        depName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        mobile: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      },
      editAdd: true,
      genderOpts: [
        {
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }
      ],
      formData: {}, // 传到表格接口的参数
      colModels: [ // 表格数据
        {prop: 'depName', label: '姓名', width: 300},
        {prop: 'predepName', label: '职位', width: 150},
        {prop: 'predepName', label: '部门'},
        {
          prop: 'operate',
          label: '操作',
          slotName: 'operateHosting'
        }
      ],
      url: houseAsyncApi.requestPath,
      method: houseAsyncApi.queryMethod,
      isMock: houseAsyncApi.isMock
    }
  },
  methods: {
    searchParam () {}, // 查询
    closeAccount () {
      this.layer_account = false
    },
    handleApply () { // 新增账号
      this.editAdd = false
      this.layer_account = true
      this.isEditAccount = false
      this.isTry = false
      // this.accountForm = deepClone(this.defaultAccount)
      // this.accountForm.depId = this.nowOrgObj.id
      // this.accountForm.depName = this.nowOrgObj.depName
      // this.$nextTick(() => {
      //   this.$refs.overlayTree.setCurrentKey(this.nowOrgObj.id)
      // })
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.item-flex {
    display: flex;

  }
  .item-select{margin-right:10px;}
</style>
