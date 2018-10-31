<template>
  <div>
    <div>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange">全选</el-checkbox>
      <el-checkbox-group
        v-model="roomNum1"
        @change="handleCheckItemChange">
        <el-checkbox
          v-for="(floor, index) in roomNumArry1"
          :key="index"
          :label="floor">
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Roomcheckgroup',
  components: {},
  data () {
    return {
      isIndeterminate: false,
      checkAll: false,
      floorsRoomNum: ['1层'],
      floorsNumArry: ['1层', '2层', '3层'],
      roomNum1: [],
      roomNumArry1: ['102', '103', '104']
    }
  },
  methods: {
    // 房间全选
    handleCheckAllChange (val) { // val 为true  则是全选
      this.roomNum1 = val ? this.roomNumArry1 : []
      this.isIndeterminate = false
    },
    handleCheckItemChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.roomNumArry1.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roomNumArry1.length
    }
  }
}
</script>
<style>

</style>
