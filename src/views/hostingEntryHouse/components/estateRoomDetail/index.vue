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
            label="归属部门">

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
import areaSelect from '@/components/AreaSelect'
import mapSelect from '@/components/MapSelect'
import SelectTree from '@/components/SelectTree/'
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
          { required: true, trigger: ['change', 'blur'], message: '请选择归属部门' }
        ]
      },
      estateRoomDetail: { // form 数据
        depId: '',
        depName: ''
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
    getParentDep () {

    },
    clearClick () {
      this.$set(this.estateRoomDetail, 'depName', '')
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
.entry-house-container{
  width: 25%
}
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

</style>
