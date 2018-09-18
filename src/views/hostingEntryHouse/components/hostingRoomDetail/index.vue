<template>
  <el-form v-if="JSON.stringify(hostingRoomDetail) !== '{}'" ref="hostingRoomDetail" :model="hostingRoomDetail" :rules="hostingRoomDetailRules" label-width="90px" size="small" class="room-detail-container hosting-room-detail">
    <el-form-item label="所在地区" prop="areaCode" style="width: 50%">
      <area-select ref="areaSelect" v-model="hostingRoomDetail.areaCode" :level="1" @input="searchZoneList(false)" />
    </el-form-item>
    <el-form-item :prop="zoneList.length ? 'zoneId' : ''" label="所属板块" style="width: 50%">
      <el-select v-model="hostingRoomDetail.zoneId" :placeholder="zoneList.length ? '请选择' : '无'" class="room-detail-select">
        <el-option v-for="item in zoneList" :key="item.zoneId" :label="item.zoneName" :value="item.zoneId" />
      </el-select>
    </el-form-item>
    <el-form-item label="公寓/小区" prop="address" style="width: 50%">
      <map-select :area-code="hostingRoomDetail.areaCode" :value="hostingRoomDetail.address" @addressChange="addressChange" />
    </el-form-item>
    <el-form-item label="楼幢" prop="buildingName" style="width: 50%">
      <el-input v-model="hostingRoomDetail.buildingName" />
    </el-form-item>
    <el-form-item label="单元" style="width: 25%">
      <el-input v-model="hostingRoomDetail.unitCode" />
    </el-form-item>
    <el-form-item label="室" prop="roomNo" style="width: 25%">
      <el-input v-model="hostingRoomDetail.roomNo" />
    </el-form-item>
    <el-form-item :show-message="false" label="户型" class="room-count" prop="chamberCount">
      <el-row :gutter="10">
        <el-col :span="2">
          <el-form-item label="" prop="chamberCount" class="room-item-count">
            <el-input v-model="hostingRoomDetail.chamberCount" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="1" class="inline-item-label">
          室
        </el-col>
        <el-col :span="2">
          <el-form-item label="" prop="boardCount" class="room-item-count">
            <el-input v-model="hostingRoomDetail.boardCount" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="1" class="inline-item-label">
          厅
        </el-col>
        <el-col :span="2">
          <el-form-item label="" prop="toiletCount" class="room-item-count">
            <el-input v-model="hostingRoomDetail.toiletCount" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="1" class="inline-item-label">
          卫
        </el-col>
        <el-col :span="2">
          <el-form-item label="" prop="houseArea" class="room-item-count">
            <el-input v-model="hostingRoomDetail.houseArea" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="1" class="inline-item-label">
          m
          <sup>2</sup>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0" prop="houseDirection" class="room-item-count">
            <el-select v-model="hostingRoomDetail.houseDirection" class="room-detail-select" placeholder="朝向">
              <el-option v-for="item in roomDirectionList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label-width="0" prop="decorationDegree" class="room-item-count">
            <el-select v-model="hostingRoomDetail.decorationDegree" class="room-detail-select" placeholder="装修程度">
              <el-option v-for="item in decorationDegreeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="看房电话" prop="contactName">
          <el-input v-model="hostingRoomDetail.contactName" placeholder="联系人" />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label-width="0">
          <el-select v-model="hostingRoomDetail.contactGender">
            <el-option :value="1" label="先生" />
            <el-option :value="2" label="女士" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="0" prop="contactMobile">
          <el-input v-model="hostingRoomDetail.contactMobile" placeholder="联系电话" />
        </el-form-item>
      </el-col>
    </el-row>
    <div style="width: 50%" class="room-detail-floor-container">
      <el-form-item label="层高" prop="floorName">
        <el-input v-model="hostingRoomDetail.floorName" type="number" class="room-detail-floor-input">
          <template slot="prepend">所在层</template>
        </el-input>
      </el-form-item>
      <el-form-item label-width="0" prop="floorAmount">
        <el-input v-model="hostingRoomDetail.floorAmount" type="number" class="room-detail-floor-input">
          <template slot="prepend">总楼层</template>
        </el-input>
      </el-form-item>
    </div>
    <div v-if="hostingRoomDetail.houseRentType === 1">
      <el-form-item label="房间照片">
        <el-badge :value="hostingRoomDetail.pictures.length">
          <el-button type="primary" size="mini" @click="openPicModel(-1)">上传照片</el-button>
        </el-badge>
      </el-form-item>
      <el-form-item label="付款方式" prop="chamberCount" class="room-count">
        <el-row :gutter="10">
          <el-col :span="1" class="inline-item-label">
            付
          </el-col>
          <el-col :span="4">
            <el-form-item label="" label-width="0" prop="payOfPayment" class="room-item-count">
              <el-select v-model="hostingRoomDetail.payOfPayment">
                <el-option
                  v-for="item in payList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1" class="inline-item-label">
            押
          </el-col>
          <el-col :span="4">
            <el-form-item label="" label-width="0" prop="depositOfPayment" class="room-item-count">
              <el-select v-model="hostingRoomDetail.depositOfPayment" @change="handleDepositChange">
                <el-option
                  v-for="item in depositList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="租金" prop="rent">
            <el-input v-model="hostingRoomDetail.rent" />
          </el-form-item>
        </el-col>
        <el-col :span="1" style="text-align: left" class="inline-item-label">
          元/月
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="押金" prop="deposit">
            <el-input v-model="hostingRoomDetail.deposit" :disabled="hostingRoomDetail.depositOfPayment !== 13" />
          </el-form-item>
        </el-col>
        <el-col :span="1" style="text-align: left" class="inline-item-label">
          元
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="20">
      <el-col :span="13">
        <el-form-item :label="hostingRoomDetail.houseRentType === 1 ? '公区设施' : '房间设施'">
          <el-select v-model="hostingRoomDetail.facilityItemsList" class="room-detail-select" multiple placeholder="请选择">
            <el-option-group v-for="group in facilityGroup" :key="group.label" :label="group.label">
              <el-option v-for="item in group.facilitys" :key="item.value" :label="item.label" :value="item.value" />
            </el-option-group>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- <el-form-item
      label="房间配置">
      <el-checkbox-group v-model="hostingRoomDetail.facilityItems">
        <el-checkbox
          v-for="item in facilityItemsList"
          :key="item.value"
          :label="item.label" />
      </el-checkbox-group>
    </el-form-item> -->
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="房间描述" prop="houseDesc">
          <el-input v-model="hostingRoomDetail.houseDesc" :rows="5" type="textarea" placeholder="请描述一下房源的交通、装饰、周边设施场所等等…" />
          <span class="estate-iontro-length-tips">{{ hostingRoomDetail.houseDesc.length }}/150</span>
        </el-form-item>
      </el-col>
    </el-row>

    <template v-if="hostingRoomDetail.houseRentType === 2">
      <el-tabs v-model="activeRoomName" :addable="hostingRoomDetail.hostingRooms.length < 26" class="sub-room-info-list" type="border-card" @edit="handleTabsEdit">
        <el-tab-pane v-for="(item, index) in hostingRoomDetail.hostingRooms" :key="item.roomName" :name="item.name">
          <span slot="label">{{ item.roomName }}
            <i v-show="index === hostingRoomDetail.hostingRooms.length - 1 && index > 0" class="el-icon-delete" @click="deleteCurRoom(item, index)" />
          </span>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item label="房间名称">
                <el-input v-model="hostingRoomDetail.hostingRooms[index].roomArea" placeholder="如主卧/侧卧" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="0" class="room-count">
                <el-row>
                  <el-col :span="19">
                    <el-form-item :prop="'hostingRooms.' + index + '.roomArea'" :rules="hostingRoomDetailRules.roomDetail.roomArea" label="房间面积" class="room-item-count">
                      <el-input v-model="hostingRoomDetail.hostingRooms[index].roomArea" type="number" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" class="inline-item-label">
                    m
                    <sup>2</sup>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item :prop="'hostingRooms.' + index + '.roomDirection'" :rules="hostingRoomDetailRules.roomDetail.roomDirection" label-width="0">
                <el-select v-model="hostingRoomDetail.hostingRooms[index].roomDirection" class="room-detail-select" placeholder="房间朝向">
                  <el-option v-for="item in roomDirectionList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="房间照片">
                <el-badge :value="hostingRoomDetail.hostingRooms[index].pictures ? hostingRoomDetail.hostingRooms[index].pictures.length : 0">
                  <el-button type="primary" size="mini" @click="openPicModel(index)">上传照片</el-button>
                </el-badge>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label-width="0" prop="">
                <el-checkbox-group v-model="hostingRoomDetail.hostingRooms[index].roomAttributesList">
                  <el-checkbox label="1" class="room-attributes">独立卫生间</el-checkbox>
                  <el-checkbox label="2" class="room-attributes">独立阳台</el-checkbox>
                  <el-checkbox label="3" class="room-attributes">独立厨房</el-checkbox>
                  <el-checkbox label="4" class="room-attributes">飘窗</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="13">
              <el-form-item label="房间设施">
                <el-select v-model="hostingRoomDetail.hostingRooms[index].facilityItemsList" class="room-detail-select" multiple placeholder="请选择">
                  <el-option-group v-for="group in roomFacilityGroup" :key="group.label" :label="group.label">
                    <el-option v-for="item in group.facilitys" :key="item.value" :label="item.label" :value="item.value" />
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="付款方式" prop="chamberCount" class="room-count">
            <el-row :gutter="10">
              <el-col :span="1" class="inline-item-label">
                付
              </el-col>
              <el-col :span="4">
                <el-form-item label="" label-width="0" :prop="'hostingRooms.' + index + '.payOfPayment'" :rules="hostingRoomDetailRules.roomDetail.payOfPayment" class="room-item-count">
                  <el-select v-model="hostingRoomDetail.hostingRooms[index].payOfPayment">
                    <el-option v-for="(item, index) in 13" :key="item" :value="index" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="1" class="inline-item-label">
                押
              </el-col>
              <el-col :span="4">
                <el-form-item label="" label-width="0" :prop="'hostingRooms.' + index + '.depositOfPayment'" :rules="hostingRoomDetailRules.roomDetail.depositOfPayment" class="room-item-count">
                  <el-select v-model="hostingRoomDetail.hostingRooms[index].depositOfPayment" style="width: 100%">
                    <el-option :value="1231231" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="租金" :prop="'hostingRooms.' + index + '.rent'" :rules="hostingRoomDetailRules.roomDetail.rent">
                <el-input v-model="hostingRoomDetail.hostingRooms[index].rent" />
              </el-form-item>
            </el-col>
            <el-col :span="1" style="text-align: left" class="inline-item-label">
              元/月
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="押金" :prop="'hostingRooms.' + index + '.deposit'" :rules="hostingRoomDetailRules.roomDetail.deposit">
                <el-input v-model="hostingRoomDetail.hostingRooms[index].deposit" />
              </el-form-item>
            </el-col>
            <el-col :span="1" style="text-align: left" class="inline-item-label">
              元
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </template>

    <!-- 上传图片模态框 -->
    <el-dialog :visible.sync="uploadPicsModelVisible" :append-to-body="true" title="上传房间照片" custom-class="upload-pics-model" width="600px" @close="uploadModelClose">
      <div class="previewItems">
        <Preview :pic-list="currentPicList" :delete-icon="`delete`" :disabled="``" @emitDelete="emitDelete" />
        <label class="el-upload el-upload--picture-card uploadImage" for="uploadImages">
          <i class="el-icon-plus" />
          <input id="uploadImages" :accept="accept" type="file" multiple @change="uploadImg($event)">
        </label>
      </div>
      <p class="upload-pics-info">温馨提示： </p>
      <p class="upload-pics-info">1.请勿上传虚假、模糊、与房源信息无关、含有其他公司水印的照片； </p>
      <p class="upload-pics-info">2.房间照片最佳组合：卧室2~6张、公共区域1~4张、厨房1~3张、卫生间1-4张； </p>
      <p class="upload-pics-info">3.目前最多支持15张，支持JPG/JPEG/PNG，可以拖动图片进行排序，支持批量上传。</p>
      <!-- 图片裁剪 -->
      <ImageCropper :cropper-list="cropperList" @emitCropperList="emitCropperList" @emitCropperData="emitCropperData" />
      <span slot="footer">
        <el-button size="small" type="primary" @click="uploadPicsModelVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
import areaSelect from '@/components/AreaSelect'
import mapSelect from '@/components/MapSelect'
import { estateOrgListApi, estateZoneListByAreaIdApi, deleteRoomApi } from '@/api/houseManage'
import Preview from '@/components/Preview/Preview'
import ImageCropper from '@/components/ImageCropper/Cropper'
import { deepClone } from '@/utils'
export default {
  components: {
    areaSelect,
    Preview,
    ImageCropper,
    mapSelect
  },
  data() {
    return {
      hostingRoomDetail: {},
      tempFormData: {},
      hostingRoomDetailRules: {
        areaCode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value[0] === '') {
                callback(new Error('请选择所在地区'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        zoneId: [
          { required: true, message: '请选择所属板块', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入公寓/小区', trigger: 'change' }
        ],
        buildingName: [
          { required: true, message: '请输入楼幢名', trigger: 'blur' }
        ],
        roomNo: [
          { required: true, message: '请输入房间号', trigger: 'blur' }
        ],
        chamberCount: [
          { required: true, message: '请输入室', trigger: 'blur' }
        ],
        boardCount: [
          { required: true, message: '请输入厅', trigger: 'blur' }
        ],
        toiletCount: [
          { required: true, message: '请输入卫', trigger: 'blur' }
        ],
        houseArea: [
          { required: true, message: '请输入面积', trigger: 'blur' }
        ],
        houseDirection: [
          { required: true, message: '请选择房屋朝向', trigger: 'change' }
        ],
        decorationDegree: [
          { required: true, message: '请选择装修程度', trigger: 'change' }
        ],
        floorName: [
          { required: true, message: '请输入房源所在层', trigger: 'blur' }
        ],
        floorAmount: [
          { required: true, message: '请输入总楼层数', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, message: '请输入联系人电话', trigger: 'blur' }
        ],
        houseDesc: [
          { max: 150, message: '长度不能超过150个字符', trigger: 'change' }
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
        roomDetail: {
          roomArea: [
            { required: true, message: '请输入房间面积', trigger: 'blur' }
          ],
          roomDirection: [
            { required: true, message: '请选择房间朝向', trigger: 'change' }
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
          ]
        }
      },
      zoneList: [],
      orgList: [],
      loading: false,
      decorationDegreeList: [
        {
          label: '毛坯',
          value: 1
        },
        {
          label: '简装',
          value: 2
        },
        {
          label: '精装修',
          value: 3
        },
        {
          label: '豪华装',
          value: 4
        }
      ],
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
      uploadPicsModelVisible: false,
      facilityGroup: [
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
      activeRoomName: '1',
      tabIndex: 1,
      cityManagerList: [],
      filterManagerList: [],
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg',
      curPicListIndex: -1,
      currentPicList: []
    }
  },
  computed: {
    roomFacilityGroup() {
      let facilityList = this.facilityGroup.slice(0)
      facilityList.splice(1, 1, {
        label: '家具',
        facilitys: [{
          value: '1',
          label: '床'
        }, {
          value: '9',
          label: '书桌'
        }, {
          value: '12',
          label: '衣柜'
        }]
      })
      return facilityList
    },
    payList() {
      let list = []
      for (let i = 0; i < 13; i++) {
        list.push({
          value: i,
          label: i + ''
        })
      }
      return list
    },
    depositList() {
      let list = this.payList.slice(0)
      list.push({
        value: 13,
        label: '自定义'
      })
      return list
    }
  },
  methods: {
    searchZoneList(flag) { // 搜索板块列表
      [this.hostingRoomDetail.provinceId, this.hostingRoomDetail.cityId, this.hostingRoomDetail.regionId] = this.hostingRoomDetail.areaCode
      if (!flag) {
        this.hostingRoomDetail.address = ''
        this.hostingRoomDetail.zoneId = ''
      }
      if (this.hostingRoomDetail.areaCode[2] !== undefined) {
        estateZoneListByAreaIdApi({
          regionId: this.hostingRoomDetail.regionId
        }).then((res) => {
          this.zoneList = res.data.list
        })
      } else {
        this.zoneList = []
      }
    },
    addressChange(val) {
      this.hostingRoomDetail = Object.assign(this.hostingRoomDetail, val)
      this.$refs['hostingRoomDetail'].validateField('address')
      this.searchZoneList(true)
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        if (this.hostingRoomDetail.hostingRooms.length > 25) {
          return
        }
        let curIndex = this.hostingRoomDetail.hostingRooms.length
        let newTabName = ++this.tabIndex + ''
        this.hostingRoomDetail.hostingRooms.push({
          roomName: '房间' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[curIndex],
          name: newTabName,
          roomArea: '',
          roomAttributesList: [],
          pictures: []
        })
        this.activeRoomName = newTabName
      }
      if (action === 'remove') {
        let tabs = this.hostingRoomDetail.hostingRooms
        let activeName = this.activeRoomName
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index - 1] || tabs[index + 1]
              if (nextTab) {
                activeName = nextTab.name
              }
            }
          })
        }
        this.hostingRoomDetail.hostingRooms = tabs.filter(tab => tab.name !== targetName)
        this.hostingRoomDetail.hostingRooms.forEach((item, index) => {
          item.roomName = '房间' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[index]
        })
        this.$nextTick(() => {
          this.activeRoomName = activeName
        })
      }
    },
    searchOrgListByKeywords(query) { // 搜索组织列表
      if (query !== '') {
        this.loading = true
        estateOrgListApi({
          orgName: query
        }).then((res) => {
          this.loading = false
          if (res.code === '0') {
            this.orgList = res.data.list
          }
        })
      } else {
        this.orgList = []
      }
    },
    setOrg(item) {
      this.hostingRoomDetail.accountName = item ? item.accountName : ''
      this.hostingRoomDetail.adminUserId = item ? item.adminUserId : ''
    },
    handleDepositChange(val) {
      if (val !== 13) {
        this.hostingRoomDetail.depositOfPayment = this.hostingRoomDetail.payOfPayment ? val * this.hostingRoomDetail.payOfPayment : ''
      }
    },
    setRoomDetailData(val) {
      if (val.houseRentType === 2) {
        this.tabIndex = val.hostingRooms.length
        this.activeRoomName = '1'
      }
      if (val.isEditFlag) {
        val.zoneId = val.zoneId === 0 ? '' : val.zoneId
        this.orgList = [
          {
            orgId: val.orgId,
            orgName: val.orgName
          }
        ]
        if (val.houseRentType === 1 && val.pictures) {
          val.pictures.forEach((item) => {
            item.title = item.imageName
            item.key = Math.random().toFixed(5)
            item.isBase64 = 0
          })
        } else {
          val.hostingRooms.forEach((item) => {
            if (item.pictures) {
              item.pictures.forEach((n) => {
                n.title = n.imageName
                n.key = Math.random().toFixed(5)
                n.isBase64 = 0
              })
            }
          })
        }
      } else {
        this.orgList = []
        this.zoneList = []
      }
      val.tag = !!val.tag
      if (val.sourceInfo) {
        this.filterManagerList = [
          {
            id: val.sourceInfo.split(',')[0],
            name: val.sourceInfo.split(',')[1]
          }
        ]
        val.sourceInfo = val.sourceInfo.split(',')[0]
      }

      this.$nextTick(() => {
        this.$set(this, 'hostingRoomDetail', val)
        this.$set(this, 'tempFormData', deepClone(val))
        if (val.isEditFlag && val.zoneId) {
          this.searchZoneList(true)
        }
        this.$nextTick(() => {
          this.$refs.hostingRoomDetail.clearValidate()
        })
      })
    },
    checkEditFlag() {
      let differentFlag = false
      Object.keys(this.tempFormData).forEach((key) => {
        if (JSON.stringify(this.tempFormData[key]) !== JSON.stringify(this.hostingRoomDetail[key])) {
          if (key === 'pictures') {
            differentFlag = this.checkDiff(this.tempFormData[key], this.hostingRoomDetail[key])
          } else if (key === 'hostingRooms') {
            this.tempFormData['hostingRooms'].forEach((v, i) => {
              Object.keys(v).forEach((k) => {
                if (JSON.stringify(v[k]) !== JSON.stringify(this.hostingRoomDetail['hostingRooms'][i][k])) {
                  if (k === 'pictures') {
                    differentFlag = this.checkDiff(v[k], this.hostingRoomDetail['hostingRooms'][i]['pictures'])
                  } else {
                    differentFlag = true
                  }
                }
              })
            })
          } else {
            differentFlag = true
          }
        }
      })
      return differentFlag
    },
    checkDiff(a, b) {
      let diffCount = 0
      if (a.length !== b.length) {
        return true
      }
      a.forEach((item, index) => {
        if (item.imageName !== b[index].imageName) {
          diffCount++
        }
      })
      return diffCount > 0
    },
    returnRoomDetailData() { // 返回房间详情数据
      let roomDetailData = false
      this.$refs.hostingRoomDetail.validate((status) => {
        if (status) {
          roomDetailData = deepClone(this.hostingRoomDetail)
          roomDetailData.facilityItems = roomDetailData.facilityItemsList.join(',')
          roomDetailData.tag = roomDetailData.tag ? 1 : 0

          const sourceInfo = roomDetailData.tag ? this.filterManagerList.filter((item) => item.id === roomDetailData.sourceInfo) : ''
          roomDetailData.sourceInfo = sourceInfo.length ? (sourceInfo[0].id + ',' + sourceInfo[0].name) : ''
          if (roomDetailData.houseRentType === 2) {
            roomDetailData.hostingRooms.forEach((item, index) => {
              item.facilityItems = item.facilityItemsList.join(',')
              item.roomAttributes = item.roomAttributesList.join(',')
            })
          }
        } else {
          if (this.hostingRoomDetail.houseRentType === 2) {
            for (let index = 0; index < this.hostingRoomDetail.hostingRooms.length; index++) {
              this.$refs.hostingRoomDetail.validateField('hostingRooms.' + index + '.roomArea', (msg) => {
                if (msg) {
                  this.activeRoomName = this.hostingRoomDetail.hostingRooms[index].name
                  return false
                }
              })
              this.$refs.hostingRoomDetail.validateField('hostingRooms.' + index + '.roomDirection', (msg) => {
                if (msg) {
                  this.activeRoomName = this.hostingRoomDetail.hostingRooms[index].name
                  return false
                }
              })
            }
          }
          this.$message.error('您还有必填信息未填写完全，请全部填写好后再保存')
          return false
        }
      })
      return roomDetailData
    },
    openPicModel(index) { // 打开上传图片列表
      this.curPicListIndex = index
      this.currentPicList = index === -1 ? this.hostingRoomDetail.pictures : this.hostingRoomDetail.hostingRooms[index].pictures
      this.uploadPicsModelVisible = true
    },
    uploadModelClose() { // 关闭上传图片列表
      this.curPicListIndex === -1 ? (this.hostingRoomDetail.pictures = this.currentPicList) : (this.hostingRoomDetail.hostingRooms[this.curPicListIndex].pictures = this.currentPicList)
      this.currentPicList = []
    },
    deleteCurRoom(curRoom, index) {
      if (curRoom.needCheck) {
        deleteRoomApi({
          roomCodeList: [curRoom.roomCode]
        }).then((res) => {
          this.handleTabsEdit(curRoom.name, 'remove')
        }).catch((err) => { console.log(err) })
      } else {
        this.handleTabsEdit(curRoom.name, 'remove')
      }
    },
    // 删除图片
    emitDelete(val) {
      this.currentPicList = val || []
    },
    // 上传的图片列表
    emitCropperList(list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData(list = []) {
      list.forEach((v, i) => {
        v.type = 1
        v.imageName = v.title
        v.image = v.src
        v.key = v.key || Math.random().toFixed(5)
        if (v.isBase64 === undefined) {
          v.isBase64 = 1
        }
      })
      this.currentPicList = [...this.currentPicList, ...list]
    },
    /* 选择图片 */
    async uploadImg(e) {
      if (!e.target.value) {
        console.log('取消上传...')
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
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
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

      this.cropperList = uploadList.map((item, kindex) => {
        return {
          img: item.img,
          imageName: item.imageName,
          type: item.type
        }
      })
      e.target.value = null
    }
  }
}
</script>

<style lang="scss" scoped>
.room-detail-container {
  width: 850px;
  .estate-iontro-length-tips {
    position: absolute;
    bottom: 0px;
    right: 10px;
  }
  .room-attributes {
    & + .room-attributes {
      margin-left: 20px;
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
}
.upload-pics-model {
  .previewItems {
    margin-bottom: 10px;
    .el-upload--picture-card.uploadImage {
      width: 122px;
      height: 92px;
      line-height: 98px;
    }
  }
  .upload-pics-info {
    margin: 0 0 5px;
  }
}
</style>
