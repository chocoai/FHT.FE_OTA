<template>
  <div>
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
          label-width="90px"
          size="small"
          class="room-detail-container hosting-room-detail">
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
          <el-dialog
            :visible.sync="uploadPicsModelVisible"
            append-to-body
            title="上传房间照片"
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
              @emitCropperList="emitCropperList"
              @emitCropperData="emitCropperData" />
            <span slot="footer">
              <el-button
                size="small"
                type="primary"
                @click="uploadPicsModelVisible = false">关 闭</el-button>
            </span>
          </el-dialog>
          <roomType></roomType>
        </el-form>
      </div>
    </div>
    <div
      :style="{width: toolsWidth}"
      class="entry-house-bottom">
      <template v-if="editFlag">
        <el-button
          :loading="saveLoading"
          type="primary"
          size="small"
          @click="saveRoomDetailData(2)">保存</el-button>
      </template>
      <template v-else>
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
import ImageCropper from '@/components/ImageCropper/Cropper'
import roomType from './roomType'

export default {
  name: 'EstateRoomDetail',
  components: {
    mapSelect,
    areaSelect,
    SelectTree,
    ImageCropper,
    Preview,
    roomType
  },
  data () {
    return {
      saveLoading: false, // 是否加载中
      editFlag: false, // 是否是编辑
      estateRoomDetailRules: { // 表单验证
        depName: [
          { required: true, trigger: ['change'], message: '请选择归属部门' }
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
          { required: true, message: '请输入联系人电话', trigger: 'blur' }
        ],
        houseDesc: [
          { required: true, message: '请输入房源描述', trigger: 'blur' },
          { max: 150, message: '长度不能超过150个字符', trigger: 'change' }
        ],
        apartmentFloor: [
          { required: true, message: '请输入公寓楼层', trigger: 'blur' }
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
        hostingRooms: '', // 房型
        apartmentFloor: '', //  公寓楼层
        floors: [] // 编辑楼层

      },
      clearDepName: true, // 是否清空归属部门
      expendedKeys: { // 默认展开的部门
        depId: Number,
        depName: ''
      },
      toolsWidth: {
        type: String,
        default: '100%'
      },
      uploadPicsModelVisible: false, // 上传图片弹窗
      curPicListIndex: -1,
      currentPicList: [],
      cropperList: [],
      accept: 'image/png, image/jpeg, image/jpg'
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
    // 提交form表单
    saveRoomDetailData () {
      this.$refs.estateRoomDetail.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 选择图片 */
    async uploadImg (e) {
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

      console.log('e.target.files', e.target.files)
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
    },
    openPicModel (index) { // 打开上传图片列表
      this.curPicListIndex = index
      this.currentPicList = index === -1 ? this.estateRoomDetail.pictures : this.estateRoomDetail.hostingRooms[index].pictures
      this.uploadPicsModelVisible = true
    },
    // 删除图片
    emitDelete (val) {
      this.currentPicList = val || []
    },
    // 上传的图片列表
    emitCropperList (list = []) {
      this.cropperList = list
    },
    // 裁剪后图片列表
    emitCropperData (list = []) {
      list.forEach((v, i) => {
        v.type = 1
        v.imageName = v.title
        if (v.isBase64 === undefined) {
          v.isBase64 = 1
        }
      })
      this.currentPicList = [...this.currentPicList, ...list]
    },
    uploadModelClose () { // 关闭上传图片列表
      if (this.curPicListIndex === -1) {
        this.estateRoomDetail.pictures = this.currentPicList
        this.$refs.estateRoomDetail.validateField('pictures')
      } else {
        this.estateRoomDetail.hostingRooms[this.curPicListIndex].pictures = this.currentPicList
        this.$refs.estateRoomDetail.validateField('hostingRooms.' + this.curPicListIndex + '.pictures')
      }
      this.currentPicList = []
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
</style>
