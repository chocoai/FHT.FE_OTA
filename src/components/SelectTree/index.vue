<template>
  <div
    id="selectTree"
    class="selectTree"
  >
    <el-input
      ref="treeInput"
      v-model="depName"
      placeholder="输入关键字进行过滤"
      size="small"
      clearable>
    </el-input>
    <div
      v-if="treeShow"
      ref="selectTreeRefShow"
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
      treeShow: false,
      depName: '',
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
    depName (val) {
      if (this.treeShow && this.depName !== '') {
        this.$refs.selectTreeRef.filter(val) // 文本框搜索
      }
    }
  },
  created () {
    this.getTree()
  },
  mounted () {
    let that = this
    if (this.expandedKeys.depName !== '') { this.depName = this.expandedKeys.depName }
    // 组织架构点击其他地方 tree消失  点击相应对象  tree 出现
    let selectTreeID = document.getElementById('selectTree')
    document.addEventListener('click', function (e) {
      if (!selectTreeID.contains(e.target)) {
        that.$set(that, 'treeShow', false)
      } else {
        that.$set(that, 'treeShow', true)
      }
    })
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
    handleNodeClick (data) {
      this.$set(this, 'depName', data.depName)
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
