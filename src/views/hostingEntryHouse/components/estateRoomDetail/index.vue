<template>
  <div class="estate">
    <div class="layout_pageHeader">
      <div
        class="entry-house-title">
        新建集中式录入
      </div>
    </div>
    <div class="layout-container">
      <div
        v-loading="saveLoading"
        class="entry-house-container">
        <el-form
          ref="estateRoomDetail"
          :model="estateRoomDetail"
          :rules="estateRoomDetailRules"
          label-width="95px"
          size="small"
          class="room-detail-container hosting-room-detail">
          <div v-show="!addHouseType">
            <el-form-item
              label="归属部门"
              class="item-input"
              prop="depName" >
              <SelectTree
                :expanded-keys = "expendedKeys"
                :clear-dep-name = "clearDepName"
                :value = "estateRoomDetail.depName"
                node-key = "depId"
                @treeNodeClick = "clickTreeNode"
                @getParentDep = "getParentDep"
                @clearClick="clearClick"
              ></SelectTree>
            </el-form-item>
            <el-form-item
              label="所在地区"
              prop="areaCode"
              class="item-input"
            >
              <area-select
                ref="areaSelect"
                v-model="estateRoomDetail.areaCode"
                :level="1"
                @input="searchZoneList(false)" />
            </el-form-item>
            <el-form-item
              label="具体位置"
              prop="address"
              class="item-input">
              <map-select
                :area-code="estateRoomDetail.areaCode"
                :value="estateRoomDetail.address"
                @addressChange="addressChange" />
            </el-form-item>
            <el-form-item
              label="品牌公寓"
              prop="brandRoom"
              class="item-input">
              <el-input
                v-model="estateRoomDetail.brandRoom"
                placeholder="请输入品牌公寓名称"/>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  prop="contactName"
                  label="看房电话">
                  <el-input
                    v-model="estateRoomDetail.contactName"
                    placeholder="联系人" />
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item label-width="0">
                  <el-select v-model="estateRoomDetail.contactGender">
                    <el-option
                      :value="1"
                      label="先生" />
                    <el-option
                      :value="2"
                      label="女士" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop="contactMobile"
                  label-width="0">
                  <el-input
                    v-model="estateRoomDetail.contactMobile"
                    type="number"
                    placeholder="联系电话" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item
              label="公寓照片"
              prop="pictures">
              <el-badge
                v-if="estateRoomDetail.pictures.length"
                :value="estateRoomDetail.pictures.length">
                <el-button
                  type="primary"
                  size="mini"
                  @click="openPicModel(-1)">上传照片</el-button>
              </el-badge>
              <el-button
                v-else
                type="primary"
                size="mini"
                @click="openPicModel(-1)">上传照片</el-button>
            </el-form-item>
            <el-form-item
              label="公寓楼层"
              prop="apartmentFloor">
              <el-input
                v-model="estateRoomDetail.apartmentFloor"
                style="width:200px"
                type="number"
                placeholder="请输入内容">
                <template slot="prepend">共</template>
                <template slot="append">层</template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="编辑楼层"
              prop="apartmentFloor">
              <el-select
                v-model="estateRoomDetail.floors"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择楼层">
                <el-option
                  v-for="item in floorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="每层房间数"
              prop="floorRoomNum">
              <el-input
                v-model="estateRoomDetail.floorRoomNum"
                style="width:200px"
                type="number"
                placeholder="请输入内容">
                <template slot="append">间</template>
              </el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label="公寓简介"
                  prop="houseDesc">
                  <el-input
                    v-model="estateRoomDetail.houseDesc"
                    :rows="5"
                    type="textarea"
                    placeholder="请描述一下房源的交通、装饰、周边设施场所等等…" />
                  <span class="estate-iontro-length-tips">{{ estateRoomDetail.houseDesc.length }}/150</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 上传图片弹窗 -->
          <el-dialog
            :visible.sync="uploadPicsModelVisible"
            append-to-body
            title="上传公寓照片"
            custom-class="upload-pics-model"
            width="600px"
            @close="uploadModelClose">
            <div class="previewItems">
              <Preview
                :pic-list="currentPicList"
                :delete-icon="true"
                :disabled="false"
                @emitDelete="emitDelete" />
              <label
                class="el-upload el-upload--picture-card uploadImage"
                for="uploadImages">
                <i class="el-icon-plus" />
                <input
                  id="uploadImages"
                  :accept="accept"
                  type="file"
                  multiple
                  @change="uploadImg($event)">
              </label>
            </div>
            <p class="upload-pics-info">温馨提示： </p>
            <p class="upload-pics-info">1.请勿上传虚假、模糊、与房源信息无关、含有其他公司水印的照片； </p>
            <p class="upload-pics-info">2.房间照片最佳组合：卧室2~6张、公共区域1~4张、厨房1~3张、卫生间1-4张； </p>
            <p class="upload-pics-info">3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。</p>
            <!-- 图片裁剪 -->
            <ImageCropper
              :cropper-list="cropperList"
              @emitCropperData="emitCropperData" />
            <span slot="footer">
              <el-button
                size="small"
                type="primary"
                @click="uploadPicsModelVisible = false">关 闭</el-button>
            </span>
          </el-dialog>

        </el-form>
        <!-- 房型 start-->
        <el-form
          ref="roomTypeTabsForm"
          :model="addHostingRooms"
          :rules="roomDetailRules"
          label-width="95px"
          size="small"
          class="room-detail-container hosting-room-detail">
          <el-tabs
            v-if="addHouseType"
            v-model="editableTabsValue"
            type="card"
            editable
            @edit="handleTabsEdit">
            <el-tab-pane
              v-for="(item, index) in addHostingRooms.hostingRooms"
              :key="index"
              :label="item.roomName"
              :name="item.name">
              <el-row :gutter="0">
                <el-col
                  :span="10"
                  class="inline-item-label">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.houseType'"
                    :rules="roomDetailRules.houseType"
                    label="房间类型">
                    <el-input
                      v-model="addHostingRooms.hostingRooms[index].houseType"
                      placeholder="请输入房源类型"
                      clearable/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.houserArea'"
                    :rules="roomDetailRules.houserArea"
                    label="房间面积"
                    class="room-item-count">
                    <el-input
                      v-model="addHostingRooms.hostingRooms[index].houserArea"
                      placeholder="请输入房间面积"
                      min="0"
                      clearable
                      type="number"/>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="4"
                  class="inline-item-label">
                  &nbsp;m
                  <sup>2</sup>
                </el-col>
              </el-row>
              <el-row
                :gutter="10">
                <el-col
                  :span="3">
                  <el-form-item
                    :rules="roomDetailRules.chamberCount"
                    :show-message="false"
                    label="户型"/>
                </el-col>
                <el-col :span="3">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.chamberCount'"
                    :rules="roomDetailRules.chamberCount"
                    style="margin-left:-8px;"
                    label=""
                    label-width="0"
                    class="room-item-count">
                    <el-select
                      v-model="addHostingRooms.hostingRooms[index].chamberCount"
                      placeholder="">
                      <el-option
                        v-for="(item, index) in 10"
                        :key="item"
                        :value="index" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="1"
                  class="inline-item-label">
                  室
                </el-col>
                <el-col :span="3">
                  <el-form-item
                    label=""
                    label-width="0"
                    prop="boardCount"
                    class="room-item-count">
                    <el-select
                      v-model="addHostingRooms.hostingRooms[index].boardCount"
                      placeholder="">
                      <el-option
                        v-for="(item, index) in 10"
                        :key="item"
                        :value="index" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="1"
                  class="inline-item-label">
                  厅
                </el-col>
                <el-col :span="3">
                  <el-form-item
                    label=""
                    label-width="0"
                    prop="toiletCount"
                    class="room-item-count">
                    <el-select
                      v-model="addHostingRooms.hostingRooms[index].toiletCount"
                      placeholder="">
                      <el-option
                        v-for="(item, index) in 10"
                        :key="item"
                        :value="index" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="1"
                  class="inline-item-label">
                  卫
                </el-col>
                <el-col :span="4">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.roomDirection'"
                    :rules="roomDetailRules.roomDirection"
                    label-width="0"
                    class="room-item-count">
                    <el-select
                      v-model="addHostingRooms.hostingRooms[index].roomDirection"
                      class="room-detail-select"
                      placeholder="朝向">
                      <el-option
                        v-for="item in roomDirectionList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row
                :gutter="10">
                <el-col
                  :span="3">
                  <el-form-item
                    :rules="roomDetailRules.payOfPayment"
                    :show-message="false"
                    label="付款方式"
                    prop="payOfPayment" />
                </el-col>
                <el-col :span="7">
                  <el-col
                    :span="2"
                    style="margin-left:-10px;"
                    class="inline-item-label">
                    付
                  </el-col>
                  <el-col :span="10">
                    <el-form-item
                      :prop="'hostingRooms.' + index + '.payOfPayment'"
                      :rules="roomDetailRules.payOfPayment"
                      label=""
                      label-width="0"
                      class="room-item-count">
                      <el-select v-model="addHostingRooms.hostingRooms[index].payOfPayment">
                        <el-option
                          v-for="item in payList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col
                    :span="3"
                    class="inline-item-label">
                    押
                  </el-col>
                  <el-col :span="10">
                    <el-form-item
                      :prop="'hostingRooms.' + index + '.depositOfPayment'"
                      :rules="roomDetailRules.depositOfPayment"
                      label=""
                      label-width="0"
                      class="room-item-count">
                      <el-select
                        v-model="addHostingRooms.hostingRooms[index].depositOfPayment"
                        @change="handleDepositChange(addHostingRooms.hostingRooms[index])">
                        <el-option
                          v-for="item in depositList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <!-- <el-col :span="5">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.rent'"
                    :rules="roomDetailRules.rent"
                    label-width="50px"
                    label="租金">
                    <el-input
                      v-model="addHostingRooms.hostingRooms[index].rent"
                      style="width:110px"
                      placeholder="请输入租金"
                      type="number"
                      clearable
                      @change="handleRentChange(addHostingRooms.hostingRooms[index])" />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="2"
                  style="text-align: left"
                  class="inline-item-label">
                  &nbsp; &nbsp;元/月
                </el-col>
                <el-col :span="5">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.deposit'"
                    :rules="roomDetailRules.deposit"
                    label-width="50px"
                    label="押金">
                    <el-input
                      v-model="addHostingRooms.hostingRooms[index].deposit"
                      :disabled="addHostingRooms.hostingRooms[index].depositOfPayment !== 13"
                      type="number" />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="1"
                  class="inline-item-label">
                  &nbsp; 元
                </el-col> -->
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.rent'"
                    :rules="roomDetailRules.rent"
                    label="租金">
                    <el-input
                      v-model="addHostingRooms.hostingRooms[index].rent"
                      style="width:100%"
                      placeholder="请输入租金"
                      type="number"
                      clearable
                      @change="handleRentChange(addHostingRooms.hostingRooms[index])" />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="2"
                  style="text-align: left"
                  class="inline-item-label">
                  &nbsp; &nbsp;元/月
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.deposit'"
                    :rules="roomDetailRules.deposit"
                    label="押金">
                    <el-input
                      v-model="addHostingRooms.hostingRooms[index].deposit"
                      :disabled="addHostingRooms.hostingRooms[index].depositOfPayment !== 13"
                      type="number" />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="1"
                  class="inline-item-label">
                  &nbsp; 元
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="15">
                  <el-form-item
                    label="房间设施"
                    style="width:100%">
                    <el-select
                      v-model="addHostingRooms.hostingRooms[index].facilityItemsList"
                      class="room-detail-select"
                      style="width:82%"
                      multiple
                      placeholder="请选择">
                      <el-option-group
                        v-for="group in facilityGroup"
                        :key="group.label"
                        :label="group.label">
                        <el-option
                          v-for="item in group.facilitys"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value" />
                      </el-option-group>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="7">
                  <el-form-item
                    :prop="'hostingRooms.' + index + '.pictures'"
                    :rules="roomDetailRules.pictures"
                    label="房间照片">
                    <template v-if="addHostingRooms.hostingRooms[index].pictures.length > 0">
                      <el-badge :value="addHostingRooms.hostingRooms[index].pictures.length">
                        <el-button
                          type="primary"
                          size="mini"
                          @click="openPicModel(index)">上传照片</el-button>
                      </el-badge>
                    </template>
                    <template v-else>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="openPicModel(index)">上传照片</el-button>
                    </template>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item
                  label="房号配置">
                  <el-button
                    type="primary"
                    size="small"
                    @click="selectRoomNum">
                    房间号配置
                  </el-button>
                </el-form-item>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <!-- 房型 end-->
      </div>
      <!-- 房间号配置 start-->
      <el-dialog
        :visible.sync="rooListSelectLayer"
        title="请选择要配置的房间">
        <room-list-select></room-list-select>
      </el-dialog>
      <!-- 房间号配置 end-->
    </div>
    <div
      v-if="!addHouseType"
      :style="{width: toolsWidth}"
      class="entry-house-bottom">
      <el-button
        v-if="!addHouseType"
        type="primary"
        size="small"
        @click="addEstateRoomNext()">下一步</el-button>
    </div>
    <div
      v-if="addHouseType"
      :style="{width: toolsWidth}"
      class="entry-house-bottom">
      <template>
        <el-button
          type="primary"
          size="small"
          @click="addEstateRoomPrev()">上一步</el-button>
        <el-button
          :loading="saveLoading"
          type="primary"
          size="small"
          @click="saveRoomDetailData(1)">保存并继续添加</el-button>
        <el-button
          :loading="saveLoading"
          size="small"
          @click="saveRoomDetailData(2)">确定</el-button>
      </template>
      <el-button
        :loading="saveLoading"
        size="small"
        @click="saveRoomDetailData(3)">取消</el-button>
    </div>
  </div>
</template>
<script>
import { deepClone } from '@/utils'
import Preview from '@/components/Preview/Preview'
import areaSelect from '@/components/AreaSelect'
import mapSelect from '@/components/MapSelect'
import SelectTree from '@/components/SelectTree/'
import { estateZoneListByAreaIdApi } from '@/api/houseManage'
import { validateMobile } from '@/utils/validate'
import ImageCropper from '@/components/ImageCropper/Cropper'
import roomListSelect from './roomListSelect'
import roomType from './roomType'

export default {
  name: 'EstateRoomDetail',
  components: {
    mapSelect,
    areaSelect,
    SelectTree,
    ImageCropper,
    Preview,
    roomType,
    validateMobile,
    roomListSelect
  },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    const validateDepName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择归属部门'))
      } else {
        callback()
      }
    }
    return {
      rooListSelectLayer: true, // 配置房间号
      saveLoading: false, // 是否加载中
      editFlag: false, // 是否是编辑
      addHouseType: false, // 展示添加房型
      estateRoomDetailRules: { // 表单验证
        depName: [
          { required: true, trigger: ['change'], validator: validateDepName }
        ],
        address: [
          { required: true, message: '请输入公寓/小区', trigger: 'change' }
        ],
        brandRoom: [
          { required: true, message: '请输入品牌公寓', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        houseDesc: [
          { required: true, message: '请输入房源描述', trigger: 'blur' },
          { max: 150, message: '长度不能超过150个字符', trigger: 'change' }
        ],
        apartmentFloor: [
          { required: true, message: '请输入公寓楼层', trigger: 'change' }
        ],
        floorRoomNum: [
          { required: true, message: '请输入每层房间数', trigger: 'blur' }
        ],
        areaCode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value[0]) {
                callback(new Error('请选择所在地区'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        pictures: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value.length) {
                callback(new Error('请上传房间照片'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      // 房型验证
      roomDetailRules: {
        houseType: [
          { required: true, message: '请输入房源类型', trigger: 'blur' }
        ],
        houserArea: [
          { required: true, message: '请输入房源面积', trigger: 'blur' }
        ],
        chamberCount: [
          { required: true, message: '请输入室', trigger: 'blur' }
        ],
        // boardCount: [
        //   { required: true, message: '请输入厅', trigger: 'blur' }
        // ],
        // toiletCount: [
        //   { required: true, message: '请输入卫', trigger: 'blur' }
        // ],
        roomDirection: [
          { required: true, message: '请选择房屋朝向', trigger: 'change' }
        ],
        payOfPayment: [
          { required: true, message: '请选择付款方式', trigger: 'change' }
        ],
        depositOfPayment: [
          { required: true, message: '请选择押金方式', trigger: 'change' }
        ],
        rent: [
          { required: true, message: '请输入租金', trigger: 'blur' }
        ],
        deposit: [
          { required: true, message: '请输入押金', trigger: 'blur' }
        ],
        pictures: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value.length) {
                callback(new Error('请上传房间照片'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      floorOptions: [ // 楼层编辑
        {
          value: 1,
          label: '1层'
        },
        {
          value: 2,
          label: '2层'
        }
      ],
      estateRoomDetail: { // form 数据
        depId: '',
        depName: '',
        address: '',
        areaCode: [],
        brandRoom: '', // 品牌公寓
        contactName: '', // 联系人
        contactGender: 1, // 联系人性别
        contactMobile: '', // 联系人电话
        houseDesc: '', // 公寓简介
        pictures: [], // 公寓照片
        apartmentFloor: '', //  公寓楼层
        floors: [], // 编辑楼层
        floorRoomNum: '' // 每层房间数
      },
      addHostingRooms: {
        hostingRooms: [
          {
            houseType: '夏威夷',
            houserArea: '20', // 面积
            roomName: '房型',
            roomDirection: '', // 朝向
            chamberCount: '1',
            boardCount: '0',
            toiletCount: '0',
            name: '1',
            rent: '',
            deposit: '',
            payOfPayment: '', // 付款
            depositOfPayment: '', // 押金
            facilityItemsList: [],
            pictures: []
          }
        ]
      },
      allRoomByFangyuanCode: [], // 房间号
      activeRoomName: '1',
      tabIndex: 1,
      editableTabsValue: '1', // 当前展示tabs
      clearDepName: true, // 是否清空归属部门
      expendedKeys: { // 默认展开的部门
        depId: Number,
        depName: ''
      },
      toolsWidth: {
        type: String,
        default: '100%'
      },
      roomDirectionList: [
        {
          label: '朝南',
          value: 1
        },
        {
          label: '朝北',
          value: 2
        },
        {
          label: '朝东',
          value: 3
        },
        {
          label: '朝西',
          value: 4
        },
        {
          label: '东南',
          value: 5
        },
        {
          label: '西南',
          value: 6
        },
        {
          label: '东北',
          value: 7
        },
        {
          label: '西北',
          value: 8
        }
      ],
      facilityGroup: [ // 房间设施
        {
          label: '家电',
          facilitys: [{
            value: '2',
            label: '洗衣机'
          }, {
            value: '3',
            label: '空调'
          }, {
            value: '4',
            label: '冰箱'
          }, {
            value: '5',
            label: '电视'
          }]
        },
        {
          label: '家具',
          facilitys: [{
            value: '1',
            label: '床'
          }, {
            value: '7',
            label: '沙发'
          }, {
            value: '8',
            label: '茶几'
          }, {
            value: '10',
            label: '餐桌'
          }]
        },
        {
          label: '其他',
          facilitys: [{
            value: '6',
            label: '宽带'
          }]
        }
      ],
      roomCheckbox: false,
      uploadPicsModelVisible: false, // 上传图片弹窗
      curPicListIndex: -1,
      currentPicList: [],
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg'
    }
  },
  computed: {
    payList () {
      let list = []
      for (let i = 0; i < 13; i++) {
        list.push({
          value: i,
          label: i + ''
        })
      }
      return list
    },
    depositList () {
      let list = this.payList.slice(0)
      list.push({
        value: 13,
        label: '自定义'
      })
      return list
    }
  },
  methods: {
    // 点击树节点
    clickTreeNode (data) {
      // this.estateRoomDetail.depName = data.depName
      this.$set(this.estateRoomDetail, 'depName', data.depName)
      console.log('2', this.estateRoomDetail.depName)
    },
    // 获取树结构顶级元素
    getParentDep (data) {
      this.expendedKeys = deepClone(data)
      console.log('asdas', this.estateRoomDetail.deName)
    },
    //  清除织架构
    clearClick () {
      this.$set(this.estateRoomDetail, 'depName', '')
    },
    searchZoneList (flag) { // 搜索板块列表
      [this.estateRoomDetail.provinceId, this.estateRoomDetail.cityId, this.estateRoomDetail.regionId] = this.estateRoomDetail.areaCode
      if (!flag) {
        this.estateRoomDetail.address = ''
        this.estateRoomDetail.zoneId = ''
      }
      if (this.estateRoomDetail.areaCode[2] !== undefined) {
        estateZoneListByAreaIdApi({
          regionId: this.estateRoomDetail.regionId
        }).then((res) => {
          this.zoneList = res.data.list
        })
      } else {
        this.zoneList = []
      }
    },
    addressChange (val) { // 选择具体位置
      console.log(this.estateRoomDetail)
      this.estateRoomDetail = Object.assign(this.estateRoomDetail, val)
      this.$refs['estateRoomDetail'].validateField('address')
      this.searchZoneList(true)
    },
    // tab-pane
    handleTabsEdit (targetName, action) {
      if (action === 'add') {
        if (this.addHostingRooms.hostingRooms.length > 25) {
          return
        }
        let curIndex = this.addHostingRooms.hostingRooms.length
        let newTabName = ++this.tabIndex + ''
        this.addHostingRooms.hostingRooms.push({
          houseType: '',
          houserArea: '', // 面积
          roomName: '房型' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[curIndex],
          roomDirection: '', // 朝向
          chamberCount: '1',
          boardCount: '0',
          toiletCount: '0',
          rent: '',
          deposit: '',
          name: newTabName,
          payOfPayment: '', // 付款
          depositOfPayment: '', // 押金
          facilityItemsList: [],
          pictures: []
        })
        this.editableTabsValue = newTabName
      }
      if (action === 'remove') {
        let tabs = this.addHostingRooms.hostingRooms
        console.log(this.addHostingRooms.hostingRooms)
        let activeName = this.editableTabsValue
        if (activeName === targetName) { // 如果当前显示的 === 点击要删除的
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.addHostingRooms.hostingRooms = tabs.filter(tab => tab.name !== targetName)
        this.addHostingRooms.hostingRooms.forEach((item, index) => {
          item.roomName = '房间' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[index]
        })
        this.$nextTick(() => {
          this.activeRoomName = activeName
        })
      }
    },
    // 计算押金，保留2位精度
    handleDepositChange (target) {
      if (target.depositOfPayment !== 13) {
        if (target.rent === '') {
          target.deposit = ''
          return
        }
        target.deposit = target.rent * target.depositOfPayment
        target.deposit = target.deposit === 0 ? 0 : target.deposit.toFixed(2)
        console.log(target)
        if (target.roomName) {
          const index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(target.roomName.replace('房间', ''))
          this.$refs.roomTypeTabsForm.validateField('hostingRooms.' + index + '.deposit')
        } else {
          this.$refs.roomTypeTabsForm.validateField('deposit')
        }
      }
    },
    selectRoomNum () { // 选择房间号
      this.roomCheckbox = true
    },
    // 计算租金，保留2位精度
    handleRentChange (target) {
      if (target.rent > 0) {
        target.rent = Math.min(100000, target.rent).toString()
        let list = target.rent.split('.')
        if (!list[1]) {
          target.rent = target.rent + '.00'
        } else {
          target.rent = Number(target.rent).toFixed(2)
        }
      } else {
        target.rent = 0
      }
      if (target.rent !== '' && target.depositOfPayment !== '' && target.depositOfPayment !== 13) {
        target.deposit = target.rent * target.depositOfPayment
        target.deposit = target.deposit === 0 ? 0 : target.deposit.toFixed(2)
      } else {
        target.deposit = ''
      }
      if (target.depositOfPayment !== '') {
        if (target.roomName) {
          const index = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(target.roomName.replace('房型', ''))
          this.$refs.roomTypeTabsForm.validateField('hostingRooms.' + index + '.deposit')
        } else {
          this.$refs.roomTypeTabsForm.validateField('deposit')
        }
      }
    },
    /* 选择图片 */
    async uploadImg (e) { // 点击input
      if (!e.target.value) {
        return false
      }
      const uploadList = []
      const readFileAsync = file => new Promise(resolve => {
        let reader = new FileReader()
        reader.onerror = function (e) {
          console.log('读取异常....')
        }
        reader.onload = e => {
          const img = (typeof e.target.result === 'object')
            // 把Array Buffer转化为blob 如果是base64不需要
            ? window.URL.createObjectURL(new Blob([e.target.result]))
            : e.target.result
          let imageName = ''
          let type = 1
          if (!file.name) {
            imageName = ''
          } else {
            imageName = file.name.split('.')[0].length <= 30
              ? file.name.split('.')[0]
              : file.name.split('.')[0].substr(0, 30)
          }
          resolve({
            img,
            imageName,
            type
          })
        }
        // 转化为base64
        reader.readAsDataURL(file)
      })
      const files = e.target.files
      let picList = this.currentPicList
      if (picList.length + files.length > 15) {
        this.$message.error(`您已上传${picList.length}张图片，最多还能上传${15 - picList.length}张图片`)
        e.target.value = null
        return false
      }
      for (let i = 0; i < files.length; i++) {
        if (!this.accept.includes(files[i].type)) {
          this.$message.error(`请上传${this.accept.replace(/image\//gi, '')}的图片`)
          e.target.value = null
          return false
        }
        uploadList.push(await readFileAsync(files[i]))
      }
      console.log('e.target.files', e.target.files)

      this.cropperList = uploadList.map((item, kindex) => {
        return {
          img: item.img,
          imageName: item.imageName,
          type: item.type
        }
      })
      e.target.value = null
    },
    openPicModel (index) { // 打开上传图片列表
      this.curPicListIndex = index
      this.currentPicList = index === -1 ? this.estateRoomDetail.pictures : this.addHostingRooms.hostingRooms[index].pictures
      this.uploadPicsModelVisible = true
    },
    // 删除图片
    emitDelete (val) {
      this.currentPicList = val || []
    },
    // 裁剪后图片列表
    emitCropperData (list = []) {
      console.log('list1', list)
      list.forEach((v, i) => {
        v.type = 1
        v.imageName = v.title
        if (v.isBase64 === undefined) {
          v.isBase64 = 1
        }
      })
      console.log('list2', list)
      this.currentPicList = [...this.currentPicList, ...list]
    },
    uploadModelClose () { // 关闭上传图片列表
      if (this.curPicListIndex === -1) { // 公寓的照片
        this.estateRoomDetail.pictures = this.currentPicList
        this.$refs.estateRoomDetail.validateField('pictures')
      } else {
        this.addHostingRooms.hostingRooms[this.curPicListIndex].pictures = this.currentPicList
        this.$refs.roomTypeTabsForm.validateField('hostingRooms.' + this.curPicListIndex + '.pictures')
      }
      console.log('cc', this.estateRoomDetail.pictures)
      this.currentPicList = []
    },
    // 下一步
    addEstateRoomNext () {
      this.addHouseType = true
      this.$refs.estateRoomDetail.validate((valid) => {
        if (valid) {
          console.log(this.estateRoomDetail)
        }
      })
    },
    // 上一步
    addEstateRoomPrev () {
      this.$refs.estateRoomDetail.clearValidate()
      this.addHouseType = false
    },
    // 提交form表单
    saveRoomDetailData () {
      console.log('上传的参数', this.addHostingRooms)
      this.$refs.roomTypeTabsForm.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
  .entry-house-title {
    font-size: 18px;
    line-height: 25px;
    padding-bottom: 20px;
    background:#fff
  }
 .entry-house-bottom {
    padding: 10px 0;
    box-shadow:0 -1px 4px rgba(0, 0, 0, .08);
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: 200;
  }
  .item-input{
    width:50%
  }
  .room-detail-container {
  max-width: 800px;
  min-width: 660px;
  overflow: hidden;
  margin-bottom: 15px;
  .estate-iontro-length-tips {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }
  }
  .previewItems {
  margin-bottom: 10px;
  .el-upload--picture-card.uploadImage {
    width: 122px;
    height: 92px;
    line-height: 98px;
  }
}
.sub-room-info-list {
    margin-bottom: 18px;
    box-shadow: 0 0;
    .el-tabs__item {
      .el-icon-delete {
        margin-left: 5px;
        color: red;
      }
    }
  }

</style>
<style>
.estate .el-tabs__new-tab{
  width:80px;
  height:auto;
  border:none;
  font-size:14px;
  margin:0;padding:0;
}
.estate .el-tabs__new-tab .el-icon-plus:before{
      display:block;
      content:'+添加房型';
      width:77px;
      font-size:14px;
      background:#4674FF;
      color:#fff;
      padding:10px 5px;
      border-radius:3px;
      margin-bottom:5px

  }
</style>
