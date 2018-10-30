<template>
  <div>
    <el-tabs
      v-model="editableTabsValues"
      type="card"
      editable
      @edit="handleTabsEdit">
      <el-tab-pane>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'RoomType',
  comments: {},
  data () {
    return {
      editableTabsValues: ''
    }
  },
  methods: {
    handleTabsEdit () { // 新增房型

    }
  }

}
</script>
 <style>

</style>
