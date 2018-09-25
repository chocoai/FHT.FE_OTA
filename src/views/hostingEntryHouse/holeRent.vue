<template>
  <div>
    <div class="layout_pageHeader">
      <div class="entry-house-title">
        新建分散式整租
      </div>
    </div>
    <div class="layout-container">
      <hosting-room-detail
        ref="hostingRoomDetail"
        :edit-flag="false"
        :house-rent-type="1" />
    </div>
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
  padding-bottom: 20px;
}
</style>
