<template>
  <div class="layout-container">
    <div class="entry-house-title">
      新建分散式整租
    </div>
    <hosting-room-detail
      ref="hostingRoomDetail"
      :editFlag="false"
      :houseRentType="1" />
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
