<template>
  <div>
    <div class="layout_pageHeader">
      <div
        class="entry-house-title">
        新建集中式录入
      </div>
    </div>
    <div class="layout-container">
      <div
        v-loading="saveLoading"
        class="entry-house-container">
        <el-form
          ref="estateRoomDetail"
          :model="estateRoomDetail"
          :rules="estateRoomDetailRules"
          label-width="90px"
          size="small"
          class="room-detail-container hosting-room-detail">
          <el-form-item
            label="归属部门"
            class="item-input"
            prop="depName" >
            <SelectTree
              :expanded-keys = "expendedKeys"
              :clear-dep-name = "clearDepName"
              :value = "estateRoomDetail.depName"
              node-key = "depId"
              @treeNodeClick = "clickTreeNode"
              @getParentDep = "getParentDep"
              @clearClick="clearClick"
            ></SelectTree>
          </el-form-item>
          <el-form-item
            label="所在地区"
            prop="areaCode"
            class="item-input"
          >
            <area-select
              ref="areaSelect"
              v-model="estateRoomDetail.areaCode"
              :level="1"
              @input="searchZoneList(false)" />
          </el-form-item>
          <el-form-item
            label="具体位置"
            prop="address"
            class="item-input">
            <map-select
              :area-code="estateRoomDetail.areaCode"
              :value="estateRoomDetail.address"
              @addressChange="addressChange" />
          </el-form-item>
          <el-form-item
            label="品牌公寓"
            prop="brandRoom"
            class="item-input">
            <el-input
              v-model="estateRoomDetail.brandRoom"
              placeholder="请输入品牌公寓名称"/>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div
      :style="{width: toolsWidth}"
      class="entry-house-bottom">
      <template v-if="editFlag">
        <el-button
          :loading="saveLoading"
          type="primary"
          size="small"
          @click="saveRoomDetailData(2)">保存</el-button>
      </template>
      <template v-else>
        <el-button
          :loading="saveLoading"
          type="primary"
          size="small"
          @click="saveRoomDetailData(1)">保存并继续添加</el-button>
        <el-button
          :loading="saveLoading"
          size="small"
          @click="saveRoomDetailData(2)">确定</el-button>
      </template>
      <el-button
        :loading="saveLoading"
        size="small"
        @click="saveRoomDetailData(3)">取消</el-button>
    </div>
  </div>
</template>
<script>
import { deepClone } from '@/utils'
import areaSelect from '@/components/AreaSelect'
import mapSelect from '@/components/MapSelect'
import SelectTree from '@/components/SelectTree/'
import { estateZoneListByAreaIdApi } from '@/api/houseManage'

export default {
  name: 'EstateRoomDetail',
  components: {
    mapSelect,
    areaSelect,
    SelectTree
  },
  data () {
    return {
      saveLoading: false, // 是否加载中
      editFlag: false, // 是否是编辑
      estateRoomDetailRules: { // 表单验证
        depName: [
          { required: true, trigger: ['change'], message: '请选择归属部门' }
        ],
        address: [
          { required: true, message: '请输入公寓/小区', trigger: 'change' }
        ],
        brandRoom: [
          { required: true, message: '请输入品牌公寓名称', trigger: 'blur' }
        ],
        areaCode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value[0]) {
                callback(new Error('请选择所在地区'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      },
      estateRoomDetail: { // form 数据
        depId: '',
        depName: '',
        address: '',
        areaCode: [],
        brandRoom: '' // 品牌公寓
      },
      clearDepName: true, // 是否清空归属部门
      expendedKeys: { // 默认展开的部门
        depId: Number,
        depName: ''
      },
      toolsWidth: {
        type: String,
        default: '100%'
      }
    }
  },
  methods: {
    // 点击树节点
    clickTreeNode (data) {
      // this.estateRoomDetail.depName = data.depName
      this.$set(this.estateRoomDetail, 'depName', data.depName)
      console.log('2', this.estateRoomDetail.depName)
    },
    // 获取树结构顶级元素
    getParentDep (data) {
      this.expendedKeys = deepClone(data)
    },
    //  清除织架构
    clearClick () {
      this.$set(this.estateRoomDetail, 'depName', '')
    },
    searchZoneList (flag) { // 搜索板块列表
      [this.estateRoomDetail.provinceId, this.estateRoomDetail.cityId, this.estateRoomDetail.regionId] = this.estateRoomDetail.areaCode
      if (!flag) {
        this.estateRoomDetail.address = ''
        this.estateRoomDetail.zoneId = ''
      }
      if (this.estateRoomDetail.areaCode[2] !== undefined) {
        estateZoneListByAreaIdApi({
          regionId: this.estateRoomDetail.regionId
        }).then((res) => {
          this.zoneList = res.data.list
        })
      } else {
        this.zoneList = []
      }
    },
    addressChange (val) { // 选择具体位置
      console.log(this.estateRoomDetail)
      this.estateRoomDetail = Object.assign(this.estateRoomDetail, val)
      this.$refs['estateRoomDetail'].validateField('address')
      this.searchZoneList(true)
    },
    // 提交表达式
    saveRoomDetailData () {
      this.$refs.estateRoomDetail.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
  .entry-house-title {
    font-size: 18px;
    line-height: 25px;
    padding-bottom: 20px;
    background:#fff
  }
 .entry-house-bottom {
    padding: 10px 0;
    box-shadow:0 -1px 4px rgba(0, 0, 0, .08);
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 200;
  }
  .item-input{
    width:25%
  }
</style>
