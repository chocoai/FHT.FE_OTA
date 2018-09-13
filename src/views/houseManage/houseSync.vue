<template>
  <div class="app-container">
    <el-tabs>
      <el-tab-pane
        v-for="(item,index) in tabMapOptions"
        :label="item"
        :key="index"
        :name="item"/>
      <el-form class="model-search clearfix">
        <el-form-item>
          <area-select
            placeholder="请选择城市"
            class="item-select"/>
        </el-form-item>
      </el-form>
      <GridUnit
        ref="refGridUnit"
        :columns="colModels"/>
    </el-tabs>
  </div>
</template>
<script>
import GridUnit from '@/components/GridUnit/grid'
import areaSelect from '@/components/AreaSelect/AreaSelect'

export default {
  name: 'HouseSync',
  components: {
    GridUnit,
    areaSelect
  },
  data () {
    return {
      tabMapOptions: ['分散式合租', '分散式整租', '集中式整栋'],
      colModels: [
        {slot: 'selection'},
        {prop: 'organizationName', label: '组织名称'},
        {prop: 'address', label: '房源位置', width: 200},
        {prop: 'roomName', label: '公寓/小区-房间', width: 200},
        {prop: 'houseType', label: '房源类型', width: 150},
        {prop: 'roomCode', label: '房源编码', width: 100},
        {prop: 'rent', label: '房价(元/月)', width: 100, align: 'right'},
        {prop: 'name', label: '姓名', width: 100},
        {prop: 'mobile', label: '手机号', width: 150},
        {prop: 'userType', label: '用户类型', width: 100}]
    }
  }
}
</script>

<style scoped>

</style>
