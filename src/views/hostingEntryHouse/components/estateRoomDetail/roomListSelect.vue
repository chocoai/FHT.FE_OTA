<template>
  <div>
    <el-row
      v-for="(val, key, index) in roomList"
      :key="index">
      <el-col :span="4">
        <el-checkbox
          :label="key"
          v-model="checkedFloor[key]"
          @change="handleCheckFloorChange(key)"></el-checkbox>
      </el-col>
      <el-col
        :span="19"
        :offset="1">
        <el-checkbox-group
          v-model="checkedObj[key]"
          class="room-list-group">
          <el-checkbox
            v-for="v in val"
            :key="v.roomCode"
            :label="v.roomCode"
            class="room-list-checkbox"
            @change="handleRoomChange(key)">
            {{ v.roomNo }}
          </el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <div
      slot="footer"
      style="margin:20px;"
      class="dialog-footer">
      <el-button
        size="small"
        type="primary"
        @click="sureRoomNum">确定</el-button>
    </div>
</div></template>
<script>
export default {
  name: 'Roomcheckgroup',
  components: {},
  data () {
    return {
      visible: true,
      isIndeterminate: false,
      checkedList: {},
      allRoomList: {},
      checkedFloor: {},
      checkedObj: {},
      roomList: { // 需要从接口获取的
        '1层': [
          {
            'roomCode': '1111',
            'roomNo': '101'
          },
          {
            'roomCode': '2222',
            'roomNo': '102'
          }
        ],
        '2层': [
          {
            'roomCode': '3333',
            'roomNo': '201'
          },
          {
            'roomCode': '4444',
            'roomNo': '202'
          }
        ]
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler: function (val) {
        if (Array.isArray(this.roomList)) {
          if (!val) {
            this.roomListForm.checkedRoomList = []
          }
        } else {
          if (val) {
            const allRoomList = {}
            const checkedObj = {}
            const checkedFloor = {}
            Object.keys(this.roomList).forEach((key, index) => {
              checkedFloor[key] = false
              allRoomList[key] = {}
              allRoomList[key].allRoom = this.roomList[key].map(v => v.roomCode)
              // allRoomList[key].activeRoom = allRoomList[key].allRoom.filter((n) => !this.checkedList.includes(n))
              // allRoomList[key].isDisabled = allRoomList[key].allRoom.filter((n) => !allRoomList[key].activeRoom.includes(n))
              checkedObj[key] = allRoomList[key].isDisabled
            })

            this.$set(this, 'allRoomList', allRoomList)
            this.$set(this, 'checkedObj', checkedObj)
            this.$set(this, 'checkedFloor', checkedFloor)
          }
          Object.keys(this.checkedObj).forEach((key, index) => {
            this.handleRoomChange(key)
          })
        }
      }
    }
  },
  methods: {
    handleCheckFloorChange (key) {
      this.visible = true
      console.log(this.checkedFloor[key], this.allRoomList[key])
      this.$set(this.checkedObj, key, this.checkedFloor[key] ? this.allRoomList[key].allRoom : this.allRoomList[key].isDisabled)
      console.log(this.checkedObj[key].length)
      this.checkAll = Object.keys(this.checkedFloor).length === Object.keys(this.checkedFloor).filter(v => this.checkedFloor[v] === true).length
    },
    handleRoomChange (key) {
      // const checkedCount = this.checkedObj[key].length
      // this.checkedFloor[key] = checkedCount === this.allRoomList[key].allRoom.length
      // this.checkAll = Object.keys(this.checkedFloor).length === Object.keys(this.checkedFloor).filter(v => this.checkedFloor[v] === true).length
    },
    handleCheckAllChange (val) {
      // Object.keys(this.checkedObj).forEach((key, index) => {
      //   this.checkedFloor[key] = !!val
      //   this.$set(this.checkedObj, key, val ? this.allRoomList[key].allRoom : this.allRoomList[key].isDisabled)
      // })
    },
    returnCheckedList () {
      // let saveRoomList = []
      // if (Array.isArray(this.roomList)) {
      //   saveRoomList = this.roomListForm.checkedRoomList
      // } else {
      //   Object.keys(this.checkedObj).forEach((key, index) => {
      //     saveRoomList = saveRoomList.concat(this.checkedObj[key])
      //   })
      // }
      // return saveRoomList
    },
    sureRoomNum () {

    }
  }
}
</script>
<style>

</style>
