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
</div></template>
<script>
export default {
  name: 'Roomcheckgroup',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: () => {
      }
    },
    roomList: {
      type: [Object, Array],
      default: () => {
      }
    },
    checkedList: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultCheckObj: {
      type: [Object, Array],
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      isIndeterminate: false,
      allRoomList: {},
      checkedFloor: { },
      checkedObj: {}
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
            console.log('checkedList', this.checkedList)
            const allRoomList = {}
            const checkedObj = {}
            const checkedFloor = {}
            Object.keys(this.roomList).forEach((key, index) => {
              checkedFloor[key] = false
              allRoomList[key] = {}
              allRoomList[key].allRoom = this.roomList[key].map(v => v.roomCode) // 获取房间code
              allRoomList[key].activeRoom = allRoomList[key].allRoom.filter((n) => !this.checkedList.includes(n))
              allRoomList[key].isDisabled = allRoomList[key].allRoom.filter((n) => !allRoomList[key].activeRoom.includes(n))
              checkedObj[key] = allRoomList[key].isDisabled
            })
            this.$set(this, 'allRoomList', allRoomList)
            this.$set(this, 'checkedObj', checkedObj)
            this.$set(this, 'checkedFloor', checkedFloor)
            console.log('allRoomList', this.allRoomList)
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
      this.$set(this.checkedObj, key, this.checkedFloor[key] ? this.allRoomList[key].allRoom : this.allRoomList[key].isDisabled)
      console.log('选中的', this.checkedObj)
    },
    handleRoomChange (key) {
      const checkedCount = this.checkedObj[key].length
      this.checkedFloor[key] = checkedCount === this.allRoomList[key].allRoom.length
    },
    returnCheckedList () { // 返回选中的码
      let saveRoomList = []
      if (Array.isArray(this.roomList)) {
        saveRoomList = this.roomListForm.checkedRoomList
      } else {
        Object.keys(this.checkedObj).forEach((key, index) => {
          saveRoomList = saveRoomList.concat(this.checkedObj[key])
        })
      }
      return { 'saveRoomList': saveRoomList, 'checkedObj': this.checkedObj }
    }
  }
}
</script>
<style>

</style>
