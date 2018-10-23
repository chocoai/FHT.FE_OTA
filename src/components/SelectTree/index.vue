<template>
  <div class="selectTree">
    <el-input
      ref="treeInput"
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      size="small"
      @blur="treeInputBlur"
      @focus="treeInputFocus">
    </el-input>
    <div
      v-if="treeShow"
      class="treeShow">
      <el-tree
        ref="selectTreeRef"
        :data="treeData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-expanded-keys="[expandedKeys.depId]"
        :indent="8"
        :node-key="nodeKey"
        class="filter-tree"
        @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
  </div>
</template>
<script>
import { getDepartmentInfo } from '@/api/organization'
export default {
  name: 'SelectTree',
  components: {
  },
  props: {
    expandedKeys: { // 默认展开部门
      type: Object,
      default: () => {
        return {}
      }
    },
    nodeKey: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {
      parentOrg: {},
      showClick: false,
      treeShow: false,
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'depName',
        id: 'depId'
      },
      currentTreeData: ''
    }
  },
  watch: {
    filterText (val) {
      this.$refs.selectTreeRef.filter(val) // 文本框搜索
    }
  },
  created () {
    this.getTree()
  },
  mounted () {
    this.filterText = this.expandedKeys.depName
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.depName.indexOf(value) !== -1
    },
    getTree () { // 获取组织架构名称并且默认表格数据
      getDepartmentInfo.queryDepartmentApi().then(res => {
        if (res.data) {
          this.treeData = [{'depName': res.data.depName, 'depId': res.data.depId, children: res.data.children}]
        }
        this.parentOrg = {
          'depId': res.data.depId,
          'depName': res.data.depName
        }
        this.$emit('getParentDep', this.parentOrg)
      }).catch(rej => {})
    },
    treeInputBlur () {

    },
    treeInputFocus () {
      this.treeShow = true
      this.showClick = true
    },
    handleNodeClick (data) {
      this.showClick = false
      this.$set(this, 'filterText', data.depName)
      this.$emit('treeNodeClick', data)
      this.treeShow = false
    }
  }
}
</script>
<style>
.selectTree{
  position: relative;
  width:100%;
  }
.treeShow{
  position: absolute;
  top:40px;
  left:0;
  z-index:300;
  width:100%;
  background:red;
}
</style>
