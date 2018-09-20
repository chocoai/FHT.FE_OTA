<template>
  <div class="layout-container">
    <div class="entry-house-title">
      新建分散式合租
    </div>
    <hosting-room-detail
      ref="hostingRoomDetail"
      :editFlag="false"
      :houseRentType="2" />
    <!-- <div class="entry-house-bottom">
      <el-button
        type="primary"
        size="small">
        保存并继续添加
      </el-button>
      <el-button size="small">确定</el-button>
      <el-button size="small">取消</el-button>
    </div> -->
  </div>
</template>

<script>
import hostingRoomDetail from './components/hostingRoomDetail'
export default {
  components: {
    hostingRoomDetail
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$refs.hostingRoomDetail.setRoomDetailData()
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.entry-house-title {
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 20px;
}
</style>
