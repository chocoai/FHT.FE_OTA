<template>
  <div>
    <el-form class="model-search clearfix">
      <div class="item-flex">
        <el-form-item>
          <el-select
            v-model="selectDepName"
            filterable
            clearable
            size="small"
            class="item-select"
            placeholder="请选择部门">
            <el-tree
              ref="overlayTree"
              :data="treeData"
              :props="defaultProps"
              :highlight-current="true"
              :expand-on-click-node="false"
              :default-expanded-keys="[parentOrg.depId]"
              node-key="depId"
              @node-click="editNodeclick"
            >
            </el-tree>
            <el-option
              style="display:none"
              value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formData.keyword"
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
            size="small"
            icon="el-icon-remove-outline"
            style="margin-left:10px"
            @click="searchParam('clear')"
          >清空</el-button>
          <el-button
            style="margin-left:10px;"
            type="primary"
            size="small"
            @click="handleApply()">新增账号</el-button>
        </el-form-item>
      </div>
    </el-form>
    <GridUnit
      ref="refGridUnit"
      :form-options="formData"
      :data-method="method"
      :url="url"
      :is-mock="isMock"
      :columns="colModels"
      list-field="data">
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
      @close="cancelAddAccount">

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
              <el-input
                v-model="accountForm.mobile"
                filterable
                clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="姓名"
              prop="name">
              <el-input
                v-model="accountForm.name"
                :disabled="editAdd"
                filterable
                clearable
                maxlength="10"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="性别"
              prop="gender">
              <el-select
                v-model="accountForm.gender"
                filterable
                clearable>
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
              prop="depId">
              <el-select
                v-model="addAcountDepName"
                style="width: 100%">
                <el-tree
                  ref="overlayTree"
                  :data="treeData"
                  :props="defaultProps"
                  :highlight-current="true"
                  :expand-on-click-node="false"
                  :default-expanded-keys="[parentOrg.depId]"
                  node-key="depId"
                  @node-click="accountNodeclick"
                >
                </el-tree>
                <el-option
                  style="display:none"
                  value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="房源管理"
              prop="role">
              <el-select
                v-model="orgRoomRole"
                :disabled= "roleChecked===1?true:false"
                style="width: 100%"
                filterable
                clearable>
                <el-option
                  value="3"
                  label="部门旗下所有房源"></el-option>
                <el-option
                  value="2"
                  label="部门旗下部分房源"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item
            label="部门负责人"
            prop="orgRole">
            <el-checkbox
              v-model="roleChecked"
              :true-label="1"
              @change="roleClick"></el-checkbox>
          </el-form-item>
        </el-row>
      </el-form>
      <div
        slot="footer"
        style="margin-top:-30px;"
        class="dialog-footer">
        <el-button
          type="primary"
          @click="submitAccount">确定</el-button>
        <el-button @click="cancelAddAccount">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import { validateMobile } from '@/utils/validate'
import { getDepartmentInfo } from '@/api/organization'
import { staffManageInfo } from '@/api/staffManage'
import { deepClone } from '@/utils'
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
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'depName',
        id: 'depId'
      },
      addDeName: '',
      roleChecked: '',
      selectDepName: '',
      inputDepart: '',
      isEditAccount: false,
      layer_account: false,
      orgRoomRole: '', // 房源管理
      addAcountDepName: '', // 新增账户所属部门
      accountForm: {
        mobile: '',
        name: '',
        gender: 1,
        depId: '',
        role: ''
      },
      rules: {
        depId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        mobile: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        role: [
          { required: true, message: '请选择房源管理', trigger: 'blur' }
        ]
      },
      editAdd: true,
      nowOrgObj: {
        depId: '',
        depName: ''
      },
      genderOpts: [
        {
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }
      ],
      parentOrg: {
        depId: '',
        depName: ''
      },
      formData: {
        depId: '',
        keyword: ''
      }, // 传到表格接口的参数
      colModels: [ // 表格数据
        {prop: 'name', label: '姓名', width: 300},
        {prop: 'role', label: '职位', width: 150},
        {prop: 'depName', label: '部门'},
        {
          prop: 'operate',
          label: '操作',
          slotName: 'operateHosting'
        }
      ],
      url: getDepartmentInfo.requestPath,
      method: getDepartmentInfo.staffInfoMethod,
      isMock: getDepartmentInfo.isMock
    }
  },
  created () {
    this.getTree()
  },
  methods: {
    searchParam (type) {
      if (type === 'clear') {
        this.formData = {
          depId: '',
          keyword: ''
        }
        this.selectDepName = ''
      }
      console.log('this.formData', this.formData)
      this.$nextTick(() => {
        this.$refs.refGridUnit.searchHandler()
      })
    }, // 查询
    getTree () { // 获取组织架构名称并且默认表格数据
      getDepartmentInfo.queryDepartmentApi().then(res => {
        if (res.data) {
          // this.$refs.trees.setCurrentKey(id)
          this.parentOrg.depId = res.data.depId // 顶级部门
          this.parentOrg.depName = res.data.depName
          this.treeData = [{'depName': res.data.depName, 'depId': res.data.depId, children: res.data.children}]
          console.log('tree', this.parentOrg.depId)
        }
      }).catch(rej => {})
    },
    editNodeclick (data) {
      console.log(data)
      this.formData.depId = data.depId
      this.selectDepName = data.depName
      this.accountForm.depName = data.depName
    },
    accountNodeclick (data) {
      this.addAcountDepName = data.depName
      this.accountForm.depId = data.depId
    },
    handleApply () { // 新增账号
      this.editAdd = false
      this.layer_account = true
      this.isEditAccount = false
      this.isTry = false
      this.accountForm.depId = this.parentOrg.depId
      this.addAcountDepName = this.parentOrg.depName
      // this.$nextTick(() => {
      //   this.$refs.overlayTree.setCurrentKey(this.nowOrgObj.id)
      // })
    },
    submitAccount () {
      if (this.roleChecked) {
        this.accountForm.role = this.roleChecked
      } else {
        this.accountForm.role = this.orgRoomRole
      }
      console.log(this.accountForm.role)
      let param = deepClone(this.accountForm)
      console.log('新增账户的参数', param)
      this.$refs['accountForm'].validate((valid) => {
        if (valid) {
          staffManageInfo.addAccountAPi(param).then((res) => {
            this.$message({
              message: '新增账户成功',
              type: 'success'
            })
          })
        }
      })
    },
    cancelAddAccount () {
      this.layer_account = false
      this.$refs['accountForm'].clearValidate()
    },
    assignHouse (data) { // 房源管理
      this.$router.push({path: '/organization/allotroom', query: data})
    },
    roleClick (data) {
      this.accountForm.role = this.roleChecked
      console.log(this.roleChecked)
    },

    editOrg () {

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
