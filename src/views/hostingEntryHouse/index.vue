<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="新建分散式整租">
        <div
          ref="entryHouseContainer"
          :style="{height: mainHeight + 'px'}"
          class="entry-house-container">
          123132131212
        </div>
        <div class="entry-house-bottom">
          <el-button
            type="primary"
            size="small">保存并继续添加</el-button>
          <el-button size="small">确定</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { debounce } from '@/utils'
export default {
  data () {
    return {
      mainHeight: 500
    }
  },
  mounted () {
    let changeMainHeight = debounce(() => {
      this.mainHeight = Math.max(document.body.clientHeight - 200, 250)
    }, 100)
    changeMainHeight()
    window.addEventListener('resize', changeMainHeight)
  }
}
</script>
<style lang="scss" scoped>
  .entry-house-container {
    overflow-y: scroll;
  }
  .entry-house-bottom {
    text-align: right;
  }
</style>
