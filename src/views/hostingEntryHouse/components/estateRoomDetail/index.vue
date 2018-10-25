<template>
  <div>
    <div class="layout-container">
      <div
        v-loading="saveLoading"
        class="entry-house-container">
        <el-form
          v-if="JSON.stringify(hostingRoomDetail) !== '{}'"
          ref="hostingRoomDetail"
          :model="hostingRoomDetail"
          :rules="hostingRoomDetailRules"
          label-width="90px"
          size="small"
          class="room-detail-container hosting-room-detail">
          <el-form-item
            label="归属部门"
            style="width: 50%"
            prop="depId">
            <el-select
              v-model="hostingRoomDetail.depName"
              :disabled="editFlag"
              clearable
              placeholder="请选择归属部门"
              class="room-detail-select">
              <el-tree
                ref="overlayTree"
                :data="treeData"
                :props="defaultProps"
                :highlight-current="true"
                :expand-on-click-node="false"
                :default-expanded-keys="[parentOrg.depId]"
                node-key="depId"
                @node-click="editNodeclick"
              >
              </el-tree>
              <el-option
                style="display:none"
                value=""></el-option>
            </el-select>
          </el-form-item>
      </el-form></div>
</div></div></template>
<script>
import areaSelect from '@/components/AreaSelect'
import mapSelect from '@/components/MapSelect'
export default {
  name: '',
  components: {
    mapSelect,
    areaSelect
  }
}
</script>
<style>

</style>
