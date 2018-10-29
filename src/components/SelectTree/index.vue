<template>
  <div
    id="selectTree"
    class="selectTree">
    <el-input
      ref="treeInput"
      v-model="depName"
      placeholder="请选择所属部门"
      size="small"
      clearable
      @clear="clearClick">
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
        @node-click="handleNodeClick">
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
    },
    clearDepName: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    value: {
      type: String,
      default: ''
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
    },
    clearDepName (val) {
      if (this.clearDepName) {
        this.depName = ''
      }
    },
    value: {
      immediate: true,
      handler: function (val) {
        // this.depName = val
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
    },
    clearClick () {
      this.$emit('clearClick')
    }
  }
}
</script>
<style scode>
.selectTree{
  position: relative;
  width:100%;
  padding:0;
  margin:0;
  }
.treeShow{
  position: absolute;
  top:45px;
  left:0;
  z-index:300;
  width:100%;
  background:red;
  border:thin solid #ddd;
}
.treeShow:after{
  position:absolute;
  content:'';
  display:block;
  top:-5px;
  left:20px;
  width:8px;
  height:8px;
  font-size:0;
  line-height:0;
  border-width:1px 0 0 1px;
  border-style:solid;
  border-color:#ddd;
  background:#fff;
  transform:rotate(45deg)
}
</style>
