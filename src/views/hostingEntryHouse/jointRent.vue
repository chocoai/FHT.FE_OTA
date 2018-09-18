<template>
  <div class="layout-container">
    <div
      ref="entryHouseContainer"
      :style="{height: mainHeight + 'px'}"
      class="entry-house-container">
      <div class="entry-house-title">
        新建分散式合租
      </div>
      <hosting-room-detail ref="hostingRoomDetail" />
    </div>
    <div class="entry-house-bottom">
      <el-button
        type="primary"
        size="small">
        保存并继续添加
      </el-button>
      <el-button size="small">确定</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'
import hostingRoomDetail from './components/hostingRoomDetail'
export default {
  components: {
    hostingRoomDetail
  },
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
    this.initRoomDetail()
  },
  methods: {
    initRoomDetail () {
      const roomDetailData = {
        areaCode: ['', '', ''],
        provinceId: null,
        cityId: null,
        regionId: null,
        zoneId: null,
        zoneName: '',
        address: '',
        regionAddressId: '',
        buildingName: '',
        unitCode: '',
        roomNo: '',
        chamberCount: null,
        boardCount: null,
        toiletCount: null,
        houseArea: null,
        houseDirection: null,
        decorationDegree: 3,
        floorName: '',
        floorAmount: null,
        contactName: '',
        contactGender: 1,
        contactMobile: null,
        facilityItemsList: [],
        houseDesc: '',
        orgId: '',
        adminUserId: null,
        accountName: '',
        tag: false,
        sourceInfo: '',
        houseRentType: 2,
        hostingRooms: [{
          roomArea: '',
          roomAttributesList: [],
          roomName: '房间A',
          name: '1',
          pictures: [],
          facilityItemsList: []
        }]
      }
      this.$refs.hostingRoomDetail.setRoomDetailData(roomDetailData)
    }
  }
}
</script>
<style lang="scss" scoped>
.entry-house-container {
  overflow-y: scroll;
  .entry-house-title {
    font-size: 18px;
    line-height: 25px;
    margin-bottom: 20px;
  }
}
.entry-house-bottom {
  width: 850px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
  text-align: right;
}
</style>
