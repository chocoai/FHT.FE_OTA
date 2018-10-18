<template>
  <div class="selectTree">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
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
        :default-expanded-keys="[nowOrgObj.depId]"
        node-key="depId"
        class="filter-tree"
        default-expand-all
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
    nowOrgObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      showClick: false,
      treeShow: false,
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'depName',
        id: 'depId'
      }
    }
  },

  watch: {
    filterText (val) {
      this.$refs.selectTreeRef.filter(val)
    }
  },
  created () {
    this.getTree()
  },
  mounted () {
    this.$nextTick(() => {
      console.log(this.$refs.selectTreeRef)
      console.log('asdfasf', this.nowOrgObj)
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
      }).catch(rej => {})
    },
    treeInputBlur () {
      // if (this.showClick) {
      //   this.treeShow = false
      // }
    },
    treeInputFocus () {
      this.treeShow = true
      this.showClick = true
    },
    handleNodeClick (data) {
      this.showClick = false
      this.filterText = data.depName
      this.$emit('nodeClick', data)
      console.log('子组件数据', data)
      this.treeShow = false
    }
  }
}
</script>
<style>
.selectTree{
  position: relative;
  width:50%;
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
