(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-ac53"],{"/umX":function(e,t,a){"use strict";t.__esModule=!0;var i=function(e){return e&&e.__esModule?e:{default:e}}(a("9dlP"));t.default=function(e,t,a){return t in e?(0,i.default)(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}},"4cpu":function(e,t,a){"use strict";var i=a("LGhb"),o=a.n(i),l=a("unDg"),r=a.n(l),s=a("Q2cO"),n=a.n(s),c=a("/umX"),u=a.n(c),d=a("6ZY3"),h=a.n(d),m=a("+NHb"),f={height:[String,Number],maxHeight:[String,Number],stripe:{type:Boolean,default:!0},border:Boolean,size:{type:String,default:"small"},fit:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},highlightCurrentRow:{type:Boolean,default:!0},currentRowKey:[String,Number],rowClassName:[String,Function],rowStyle:[String,Function],rowKey:[String,Function],emptyText:String,defaultExpandAll:Boolean,expandRowKeys:Array,defaultSort:Object,tooltipEffect:String,showSummary:Boolean,sumText:String,summaryMethod:Function,cellClassName:[String,Function],url:{type:String},method:{type:String,default:"post",validator:function(e){return-1!==["get","post","put","delete"].indexOf(e.toLowerCase())}},dataMethod:{type:String},isMock:{type:Boolean,default:!1},headers:{type:Object,default:function(){return{}}},showRowIndex:{type:Boolean,default:!0},showSelection:{type:Boolean,default:!1},showExpand:{type:Boolean,default:!1},listField:{type:String,default:"data.content"},totalField:{type:String,default:"data.totalElements"},params:{type:Object,default:function(){return{}}},formOptions:{type:Object,default:function(){return{}}},autoLoad:{type:Boolean,default:!0},type:{type:String,default:"remote",validator:function(e){var t=-1!==["remote","local"].indexOf(e);return t||(this.$message.error("不支持'"+e+"', 请设置remote或local（local我是不支持的，不要问我为什么，有需要找我来呀）."),!1)}},data:{type:Array},dataHandler:{type:Function},columns:{type:Array,required:!0,columnKey:String,label:{type:String,required:!0},prop:{type:String,required:!0},width:{type:[Number,String],default:"auto"},minWidth:{type:Number,default:100},fixed:[Boolean,String],renderHeader:Function,sortable:[Boolean,String],sortMethod:Function,resizable:Boolean,formatter:Function,showOverflowTooltip:{type:Boolean,default:!0},align:{type:String,default:"left"},headerAlign:String,className:{type:String,default:""},labelClassName:{type:String,default:""},selectable:Function,reserveSelection:Boolean,filters:Array,filterPlacement:String,filterMultiple:{type:Boolean,default:!0},filterMethod:Function,filteredValue:Array,filter:{type:String},render:{type:Function},slotName:{type:String}},expandColums:{type:Array,default:function(){return[]}},showPagination:{type:Boolean,default:!0},pagenationBg:{type:Boolean,default:!0},pageSizes:{type:Array,default:function(){return[20,30,50]}},paginationLayout:{type:String,default:"total, sizes, prev, pager, next, jumper"},pageNoKey:{type:String,default:"pageNo"},pageSizeKey:{type:String,default:"pageSize"}},p=a("HB48"),g=a("7Qib"),v={name:"FhtTablePagination",components:{},props:f,data:function(){return{Vue:m.default,pagination:{pageNo:1,pageSize:this.pageSizes?this.pageSizes[0]:20},total:0,loading:!1,tableData:[],searchParams:{}}},computed:{},watch:{formOptions:{handler:function(e){this.searchParams=h()(e,this.params)},deep:!0},params:{handler:function(e){this.searchParams=h()(e,this.params)},deep:!0}},mounted:function(){var e=this;this.$refs.gridUnit.$on("expand-change",function(t,a){return e.emitEventHandler("expand-change",t,a)});var t=this.type,a=this.autoLoad,i=this.formOptions,o=this.params,l=this.data;"remote"===t&&a?(this.searchParams=i?h()(i,o):o,this.fetchHandler()):"local"===t&&Array.isArray(l)?(this.tableData=l,this.total=l.length):this.$message.error("请联系柏林Grid组件使用姿势")},methods:{previewImage:function(e){if(!e)return!1;var t={src:e},a=new Image;a.src=e,a.onload=function(){t.w=a.width||800,t.h=a.height||600,m.default.$preview.open(0,[t])}},handleSizeChange:function(e){this.pagination.pageSize=e,this.fetchHandler()},handleCurrentChange:function(e){this.pagination.pageNo=e,this.fetchHandler()},searchHandler:function(e){this.pagination.pageNo=1,e&&"clear"===e.type&&(this.searchParams=e.data),this.fetchHandler()},fetchHandler:function(){var e=this;this.loading=!0;var t,a=void 0,i=this.url,o=this.dataMethod,l=this.isMock,r=this.listField,s=this.pageNoKey,c=this.pageSizeKey,d=this.totalField,m=this.showPagination,f=this.pagination;(a=Object(g.a)(Object(g.c)(this.searchParams)),m)&&(a=h()(a,(t={},u()(t,s,f.pageNo),u()(t,c,f.pageSize),t)));if(!p.a)return this.$message.error("请联系柏林如何在Grid组件中使用axios请求"),this.loading=!1,!1;Object(p.a)(i,{method:o,params:a},{isMock:l}).then(function(t){var a=t;if(!t||t instanceof Array||(r&&-1!==r.indexOf(".")?r.split(".").forEach(function(e){a=a[e]}):a=t[r]),!(a&&a instanceof Array))return e.$message.error(r+"必须是Array哦. 后端童鞋注意下"),e.loading=!1,!1;e.dataHandler?e.tableData=a.map(e.dataHandler):e.tableData=a;var i=t;"[object Array]"===Object.prototype.toString.call(t)?i=t.length:"object"===(void 0===t?"undefined":n()(t))?d&&-1!==d.indexOf(".")?d.split(".").forEach(function(e){i=i[e]}):i=t[d]:i=0,e.total=i,e.loading=!1}).catch(function(t){console.log(t),e.loading=!1})},emitEventHandler:function(e){this.$emit.apply(this,[e].concat(r()(o()(arguments).slice(1))))}}},b=(a("Tv7z"),a("ZrdR")),y=Object(b.a)(v,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"model-table-pagenation"},[a("div",{staticClass:"model-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading.lock",value:e.loading,expression:"loading",modifiers:{lock:!0}}],ref:"gridUnit",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:e.border,stripe:e.stripe,height:e.height,"max-height":e.maxHeight,fit:e.fit,size:e.size,"show-header":e.showHeader,"highlight-current-row":e.highlightCurrentRow,"current-row-key":e.currentRowKey,"row-class-name":e.rowClassName,"row-style":e.rowStyle,"row-ket":e.rowKey,"empty-text":e.emptyText,"default-expand-all":e.defaultExpandAll,"expand-row-keys":e.expandRowKeys,"default-sort":e.defaultSort,"tooltip-effect":e.tooltipEffect,"show-summary":e.showSummary,"sum-text":e.sumText,"summary-method":e.summaryMethod,"cell-class-name":e.cellClassName},on:{select:function(t,a){return e.emitEventHandler("select",t,a)},"select-all":function(t){return e.emitEventHandler("select-all",t)},"selection-change":function(t){return e.emitEventHandler("selection-change",t)},"cell-mouse-enter":function(t,a,i,o){return e.emitEventHandler("cell-mouse-enter",t,a,i,o)},"cell-mouse-leave":function(t,a,i,o){return e.emitEventHandler("cell-mouse-leave",t,a,i,o)},"cell-click":function(t,a,i,o){return e.emitEventHandler("cell-click",t,a,i,o)},"cell-dblclick":function(t,a,i,o){return e.emitEventHandler("cell-dblclick",t,a,i,o)},"row-click":function(t,a,i){return e.emitEventHandler("row-click",t,a,i)},"row-dblclick":function(t,a){return e.emitEventHandler("row-dblclick",t,a)},"row-contextmenu":function(t,a){return e.emitEventHandler("row-contextmenu",t,a)},"header-click":function(t,a){return e.emitEventHandler("header-click",t,a)},"sort-change":function(t){return e.emitEventHandler("sort-change",t)},"filter-change":function(t){return e.emitEventHandler("filter-change",t)},"current-change":function(t,a){return e.emitEventHandler("current-change",t,a)},"header-dragend":function(t,a,i,o){return e.emitEventHandler("header-dragend",t,a,i,o)},"expand-change":function(t,a){return e.emitEventHandler("expand-change",t,a)}}},[e.showRowIndex?a("el-table-column",{attrs:{type:"index",width:"40",align:"center"}}):e._e(),e._v(" "),e.showExpand?a("el-table-column",{attrs:{type:"expand",width:"40"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._t("expandTable"),e._v(" "),e._t("expandForm")]}}])}):e._e(),e._v(" "),e.showSelection?a("el-table-column",{attrs:{type:"selection",width:"40"}}):e._e(),e._v(" "),e._l(e.columns,function(t,i){return a("el-table-column",{key:i,attrs:{"column-key":t.columnKey,prop:t.prop,label:t.label,width:t.minWidth?"-":t.width||"auto","min-width":t.minWidth||t.width||100,fixed:t.fixed,"render-header":t.renderHeader,sortable:t.sortable,"sort-method":t.method,resizable:t.resizable,formatter:t.formatter,"show-overflow-tooltip":t.showOverflowTooltip||!0,align:t.align||"left","header-align":t.headerAlign||t.align,"class-name":t.className,"label-class-name":t.labelClassName,selectable:t.selectable,"reserve-selection":t.reserveSelection,filters:t.filters,"filter-placement":t.filterPlacement,"filter-multiple":t.filterMultiple,"filter-method":t.filterMethod,"filtered-value":t.filteredValue},scopedSlots:e._u([{key:"default",fn:function(i){return[t.filter?a("span",["parseTime"===t.filter&&i.row[t.prop]&&""!=i.row[t.prop]?a("i",{staticClass:"el-icon-time"}):e._e(),e._v("\n            "+e._s(e.Vue.filter(t.filter)(i.row[t.prop]))+"\n          ")]):"img"===t.type?a("div",{staticStyle:{display:"flex"}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:i.row[t.prop],expression:"scope.row[column.prop]"}],staticClass:"image preview-img image-center",attrs:{width:"40",height:"40"},on:{click:function(a){e.previewImage(i.row[t.prop])}}})]):"link"===t.type?a("a",{staticStyle:{color:"#409eff"},attrs:{href:i.row[t.prop],target:"_blank"}},[e._v("\n            "+e._s(i.row[t.prop])+"\n          ")]):"status"===t.type&&t.unitFilters?a("el-tag",{attrs:{type:t.unitFilters.renderStatusType(i.row[t.prop])}},[e._v("\n            "+e._s(t.unitFilters.renderStatusValue(i.row[t.prop]))+"\n          ")]):t.slotName?a("span",[e._t(t.slotName,null,{row:i.row,$index:i.$index})],2):a("span",[e._v("\n            "+e._s(t.render?t.render(i.row):i.row[t.prop])+"\n          ")])]}}])})})],2)],1),e._v(" "),e.showPagination?a("div",{staticClass:"model-pagenation"},[a("el-pagination",{attrs:{background:e.pagenationBg,"current-page":e.pagination.pageNo,"page-sizes":e.pageSizes,"page-size":e.pagination.pageSize,layout:e.paginationLayout,total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1):e._e()])},[],!1,null,"c89e08b0",null);y.options.__file="grid.vue";t.a=y.exports},"6Bsw":function(e,t,a){},"9dlP":function(e,t,a){e.exports={default:a("I1YO"),__esModule:!0}},HeIs:function(e,t,a){},Hyf4:function(e,t,a){"use strict";var i=a("HeIs");a.n(i).a},I1YO:function(e,t,a){a("NKWc");var i=a("fz6b").Object;e.exports=function(e,t,a){return i.defineProperty(e,t,a)}},NKWc:function(e,t,a){var i=a("yFux");i(i.S+i.F*!a("RqZd"),"Object",{defineProperty:a("anRQ").f})},Oeis:function(e,t,a){"use strict";var i=a("6Bsw");a.n(i).a},Tv7z:function(e,t,a){"use strict";var i=a("ts9B");a.n(i).a},hZK0:function(e,t,a){"use strict";a.r(t);var i=a("omC7"),o=a.n(i),l=a("7Qib"),r=a("4cpu"),s=a("qS2N"),n=a("pXij"),c=a("5O4t"),u=a("n6Nk"),d={name:"HouseSync",components:{GridUnit:r.a,areaSelect:s.a,authorize:n.default,hostingRoomDetail:c.default},filters:{renderStatusType:function(e){return{1:"info",2:"success",5:"danger",9:"primary"}[e]||"info"},renderStatusValue:function(e){var t=["","未发布","已发布"];return t[5]="发布失败",t[9]="发布中",t[e]||"未知"}},data:function(){return{certificationFrom:{userName:"",userId:""},rzErrorTips:"",selectedOpthons:[],options:[],residential:[],selectedArea:[],activeName:"分散式整租",houseAreaName:"整套面积",tabMapOptions:["分散式整租","分散式合租"],selectedItems:[],filterManagerList:[],authorizeShow:!1,dialogTitle:"",roomStatusArry:[],goAuthorizeShow:!1,certificationShow:!1,authorizeStatus:!1,userAuthentication:!1,rules:{userName:[{required:!0,message:"请输入姓名",trigger:"blur"}],userId:[{required:!0,validator:function(e,t,a){t?/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(t)?a():a(new Error("请填写正确的18位身份证号")):a(new Error("请填写身份证号码"))},trigger:"blur"}]},colModels:[{slot:"selection",width:30},{prop:"subdistrictName",label:"公寓/小区",width:150},{prop:"roomNo",label:"房间号",width:150},{prop:"chamberCount",label:"户型",width:150,render:function(e){return(e.chamberCount||0)+"室"+(e.boardCount||0)+"厅"+(e.toiletCount||0)+"卫"}},{prop:"roomArea",label:"整套面积",width:150,render:function(e){return(e.roomArea||0)+"m²"}},{prop:"rentPrice",label:"推广价格",width:150,render:function(e){return(e.rentPrice||0)+"元"}},{prop:"mailinStatus",label:"麦邻租房",width:150,type:"status",slotName:"slot_mailinStatus"},{prop:"idlefishStatus",label:"闲鱼租房",width:150,type:"status",slotName:"slot_idlefishStatus"},{prop:"roomStatus",label:"出租状态",slotName:"roomStatusHosting",width:150,type:"status",fixed:"right"},{prop:"operate",label:"操作",slotName:"operateHosting",width:200,fixed:"right"}],publishSelect:{mlzf:!0,idlefish:!0},dialogVisible:!1,searchParams:{pageNo:1,pageSize:20,houseRentType:1,cityId:"",regionId:"",roomStatus:"",regionAddressId:"",roomNo:"",mailinStatus:"",idlefishStatus:""},url:u.n.requestPath,method:u.n.queryMethod,isMock:u.n.isMock,roomDetailModelVisible:!1}},watch:{},mounted:function(){this.authorizeStatus=this.$store.getters.idlefished,this.userAuthentication=this.$store.getters.authed,this.getCityName()},methods:{searchParam:function(e){var t=this;console.log("selectedOpthons",this.selectedOpthons),"clear"===e&&(this.searchParams={pageNo:1,pageSize:20,houseRentType:1,cityId:"",regionId:"",roomStatus:"",regionAddressId:"",roomNo:"",mailinStatus:"",idlefishStatus:""},this.selectedOpthons=[],this.selectedArea=[]),console.log("查询数据",this.searchParams),this.searchParams.houseRentType="分散式整租"===this.activeName?1:2,this.colModels[4].label="分散式整租"===this.activeName?"整套面积":"单间面积",this.$nextTick(function(){t.$refs.refGridUnit.searchHandler()})},closeAuthorizeDialog:function(e){this.authorizeShow=!1},closeRoomDetailDialog:function(){this.roomDetailModelVisible=!1},getCityName:function(){var e=this,t={resource:this.searchParams.houseRentType},a=[];Object(u.p)(t).then(function(t){e.residential=t.data.subdistrictList,(a=t.data.cityList).length>0&&(a.forEach(function(e,t){a[t].value=e.cityId,a[t].label=e.cityName,a[t].regionList.length>0&&a[t].regionList.forEach(function(e,t){e.value=e.areaId,e.label=e.areaName})}),e.options=Object(l.c)(JSON.parse(o()(a).replace(/regionList/g,"children"))))})},handleChange:function(e){var t=this;this.selectedArea=[],this.searchParams.regionAddressId="",this.searchParams.cityId=e[0],this.searchParams.regionId=e[1],this.residential.filter(function(a,i){a.cityId===e[0]&&a.areaId===e[1]&&t.selectedArea.push(a)}),console.log("selectedArea",this.selectedArea)},roomStatusText:function(e){return 2===e?"未出租":9===e?"已出租":void 0},changeRoomStatus:function(e){var t=this;console.log(e);var a={roomCode:e.roomCode,roomStatus:e.roomStatus,resource:this.searchParams.houseRentType};Object(u.e)(a).then(function(e){t.searchParam("clear")})},deleteRoom:function(e){var t=this,a=this.$createElement;this.$msgbox({title:"确认消息",message:a("p",null,[a("span",null,"确定删除房间吗？ "),a("span",{style:"color: red"})]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(a){Object(u.h)({fangyuanCode:e.fangyuanCode}).then(function(e){console.log(e),"0"===e.code&&(t.$message({message:e.message,type:"success"}),t.searchParam("clear"))}).catch(function(e){console.log(e)})})},handleClickTab:function(e){this.searchParam("clear")},handleSelectionChange:function(e){this.selectedItems=e,console.log("selectedItems",this.selectedItems)},syncItems:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"on";if(!this.userAuthentication&&"on"===e)return this.certificationShow=!0,!1;console.log("type",e);var t={on:{title:"发布"},off:{title:"下架"}};if(0===this.selectedItems.length)return this.$message.error("请选择需要"+t[e].title+"的房源"),!1;if("on"===e&&0!==this.selectedItems.filter(function(e){return 2===e.idlefishStatus&&2===e.mailinStatus}).length)return this.$message.error("已"+t[e].title+"的房源不能再"+t[e].title),!1;if("off"===e&&0!==this.selectedItems.filter(function(e){return!(1!==e.idlefishStatus&&5!==e.idlefishStatus||1!==e.mailinStatus&&5!==e.mailinStatus)}).length)return this.$message.error("已"+t[e].title+"的房源不能再"+t[e].title),!1;this.dialogVisible=!0,this.dialogTitle=t[e].title,this.publishSelect.mlzf="off"!==e,this.publishSelect.idlefish=!1},goAuthorize:function(){this.authorizeShow=!0,this.goAuthorizeShow=!1},gotoHouseAsync:function(){var e=this,t=this.selectedItems.map(function(e){return e.roomCode}),a=[];for(var i in this.publishSelect)this.publishSelect[i]&&a.push(i);var o={platforms:a,roomCodeList:t};if(console.log("发布的数据",o),"发布"===this.dialogTitle){for(var l=0;l<o.platforms.length;l++)if("idlefish"===o.platforms[l]&&!this.authorizeStatus)return this.dialogVisible=!1,this.goAuthorizeShow=!0,!1;Object(u.o)(o).then(function(t){e.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3}),e.dialogVisible=!1,e.searchParam()})}"下架"===this.dialogTitle&&Object(u.q)(o).then(function(t){e.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3}),e.dialogVisible=!1,e.searchParam()})},goCertification:function(){var e=this;this.$refs.certificationFrom.validate(function(t){if(t){var a={name:e.certificationFrom.userName,idcard:e.certificationFrom.userId};Object(u.d)(a).then(function(t){e.certificationShow=!1,e.$notify({title:"成功",message:"实名认证成功",type:"success",duration:2e3}),e.userAuthentication=!0,e.$store.dispatch("GetInfo").then(function(e){})})}})},openRoomDetail:function(e){var t=this;Object(u.l)({fangyuanCode:e.fangyuanCode}).then(function(e){t.roomDetailModelVisible=!0,t.$nextTick(function(){t.$refs.hostingRoomDetail.setRoomDetailData(e.data)})})},handleSetting:function(){this.authorizeShow=!0}}},h=(a("Hyf4"),a("Oeis"),a("ZrdR")),m=Object(h.a)(d,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"layout_pageHeader"},[a("el-tabs",{on:{"tab-click":e.handleClickTab},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},e._l(e.tabMapOptions,function(e,t){return a("el-tab-pane",{key:t,attrs:{label:e,name:e}})})),e._v(" "),a("el-form",{staticClass:"model-search clearfix"},[a("div",{staticClass:"item-flex"},[a("el-form-item",[a("el-cascader",{staticClass:"item-select",attrs:{options:e.options,placeholder:"请选择城市区域",size:"small",level:"1",filterable:"",clearable:""},on:{change:e.handleChange},model:{value:e.selectedOpthons,callback:function(t){e.selectedOpthons=t},expression:"selectedOpthons"}})],1),e._v(" "),a("el-form-item",[a("el-select",{staticClass:"item-select",attrs:{size:"small",filterable:"",placeholder:"请选择小区",clearable:""},model:{value:e.searchParams.regionAddressId,callback:function(t){e.$set(e.searchParams,"regionAddressId",t)},expression:"searchParams.regionAddressId"}},e._l(e.selectedArea,function(e,t){return a("el-option",{key:t,attrs:{value:e.regionAddressId,label:e.name}})}))],1),e._v(" "),a("el-form-item",[a("el-input",{staticClass:"item-select",attrs:{size:"small",placeholder:"请输入房间号",clearable:""},model:{value:e.searchParams.roomNo,callback:function(t){e.$set(e.searchParams,"roomNo",t)},expression:"searchParams.roomNo"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-search"},on:{click:e.searchParam}},[e._v("查询")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",icon:"el-icon-remove-outline"},on:{click:function(t){e.searchParam("clear")}}},[e._v("清空")])],1)],1),e._v(" "),a("div",{staticClass:"item-flex"},[a("el-form-item",[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"请选择出租状态",clearable:""},model:{value:e.searchParams.roomStatus,callback:function(t){e.$set(e.searchParams,"roomStatus",t)},expression:"searchParams.roomStatus"}},[a("el-option",{attrs:{value:"9",label:"已出租"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"未出租"}})],1)],1),e._v(" "),a("el-form-item",[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"麦邻发布状态",clearable:""},model:{value:e.searchParams.mailinStatus,callback:function(t){e.$set(e.searchParams,"mailinStatus",t)},expression:"searchParams.mailinStatus"}},[a("el-option",{attrs:{value:"0",label:"麦邻未发布"}}),e._v(" "),a("el-option",{attrs:{value:"1",label:"麦邻已发布"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"麦邻发布失败"}})],1)],1),e._v(" "),a("el-form-item",[a("el-select",{staticClass:"item-select",attrs:{size:"small",placeholder:"闲鱼发布状态",clearable:""},model:{value:e.searchParams.idlefishStatus,callback:function(t){e.$set(e.searchParams,"idlefishStatus",t)},expression:"searchParams.idlefishStatus"}},[a("el-option",{attrs:{value:"0",label:"闲鱼未发布"}}),e._v(" "),a("el-option",{attrs:{value:"1",label:"闲鱼已发布"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"闲鱼发布失败"}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{size:"small",type:"success",icon:"iconfont icon-publish_on"},on:{click:function(t){e.syncItems("on")}}},[e._v("发布")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{size:"small",type:"danger",icon:"iconfont icon-publish_off"},on:{click:function(t){e.syncItems("off")}}},[e._v("下架")])],1)],1),e._v(" "),a("el-dialog",{staticClass:"select-dialog",attrs:{visible:e.dialogVisible,title:"选择"+e.dialogTitle+"平台",width:"450px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("div",{staticClass:"select-platform-container clearfix"},[a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.publishSelect.mlzf,expression:"publishSelect.mlzf"}],attrs:{id:"mlRent",type:"checkbox"},domProps:{checked:Array.isArray(e.publishSelect.mlzf)?e._i(e.publishSelect.mlzf,null)>-1:e.publishSelect.mlzf},on:{change:function(t){var a=e.publishSelect.mlzf,i=t.target,o=!!i.checked;if(Array.isArray(a)){var l=e._i(a,null);i.checked?l<0&&e.$set(e.publishSelect,"mlzf",a.concat([null])):l>-1&&e.$set(e.publishSelect,"mlzf",a.slice(0,l).concat(a.slice(l+1)))}else e.$set(e.publishSelect,"mlzf",o)}}}),e._v(" "),a("label",{attrs:{for:"mlRent"}},[a("div",{staticClass:"ml-selectName",class:{changeBackground:e.publishSelect.mlzf}},[e._v("麦邻租房")]),e._v(" "),a("div",{staticClass:"ml-selectStatus"},[a("i",{directives:[{name:"show",rawName:"v-show",value:e.publishSelect.mlzf,expression:"publishSelect.mlzf"}],staticClass:"el-icon-check"})])])]),e._v(" "),a("div",[a("input",{directives:[{name:"model",rawName:"v-model",value:e.publishSelect.idlefish,expression:"publishSelect.idlefish"}],attrs:{id:"idleFishRent",type:"checkbox"},domProps:{checked:Array.isArray(e.publishSelect.idlefish)?e._i(e.publishSelect.idlefish,null)>-1:e.publishSelect.idlefish},on:{change:function(t){var a=e.publishSelect.idlefish,i=t.target,o=!!i.checked;if(Array.isArray(a)){var l=e._i(a,null);i.checked?l<0&&e.$set(e.publishSelect,"idlefish",a.concat([null])):l>-1&&e.$set(e.publishSelect,"idlefish",a.slice(0,l).concat(a.slice(l+1)))}else e.$set(e.publishSelect,"idlefish",o)}}}),e._v(" "),a("label",{attrs:{for:"idleFishRent"}},[a("div",{staticClass:"ml-selectName",class:{changeBackground:e.publishSelect.idlefish}},[e._v("闲鱼租房")]),e._v(" "),a("div",{staticClass:"ml-selectStatus"},[a("i",{directives:[{name:"show",rawName:"v-show",value:e.publishSelect.idlefish,expression:"publishSelect.idlefish"}],staticClass:"el-icon-check"})])])])]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.gotoHouseAsync}},[e._v(e._s("下架"===e.dialogTitle?"确定":"发布"))])],1)])],1)],1),e._v(" "),a("div",{staticClass:"layout-container"},[a("GridUnit",{ref:"refGridUnit",attrs:{"form-options":e.searchParams,"data-method":e.method,url:e.url,columns:e.colModels,"show-selection":!0,"is-mock":e.isMock,"list-field":"data.houseList"},on:{"selection-change":e.handleSelectionChange},scopedSlots:e._u([{key:"slot_idlefishStatus",fn:function(t){return[5===t.row.idlefishStatus?a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v("发布失败原因: "+e._s(t.row.idlefishfailMessage))]),e._v(" "),a("div",{attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{type:e._f("renderStatusType")(t.row.idlefishStatus)}},[e._v("\n              "+e._s(e._f("renderStatusValue")(t.row.idlefishStatus))+"\n            ")])],1)]):a("el-tag",{attrs:{type:e._f("renderStatusType")(t.row.idlefishStatus)}},[e._v("\n          "+e._s(e._f("renderStatusValue")(t.row.idlefishStatus))+"\n        ")])]}},{key:"slot_mailinStatus",fn:function(t){return[5===t.row.mailinStatus?a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v("发布失败原因: "+e._s(t.row.mailinfailMessage))]),e._v(" "),a("div",{attrs:{slot:"reference"},slot:"reference"},[a("el-tag",{attrs:{type:e._f("renderStatusType")(t.row.mailinStatus)}},[e._v("\n              "+e._s(e._f("renderStatusValue")(t.row.mailinStatus))+"\n            ")])],1)]):a("el-tag",{attrs:{type:e._f("renderStatusType")(t.row.mailinStatus)}},[e._v("\n          "+e._s(e._f("renderStatusValue")(t.row.mailinStatus))+"\n        ")])]}},{key:"roomStatusHosting",fn:function(t){return[a("el-switch",{staticClass:"roomSelectStatus",attrs:{"active-value":9,"inactive-value":2,"active-text":e.roomStatusText(t.row.roomStatus)},on:{change:function(a){e.changeRoomStatus(t.row)}},model:{value:t.row.roomStatus,callback:function(a){e.$set(t.row,"roomStatus",a)},expression:"scope.row.roomStatus"}})]}},{key:"operateHosting",fn:function(t){return[a("el-row",[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.openRoomDetail(t.row)}}},[e._v("编辑房间")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.deleteRoom(t.row)}}},[e._v("删除")])],1)]}}])}),e._v(" "),a("div",{staticClass:"editHouse"},[a("el-dialog",{attrs:{visible:e.roomDetailModelVisible,title:"编辑房间",width:"60%",top:"0"},on:{"update:visible":function(t){e.roomDetailModelVisible=t}}},[a("hosting-room-detail",{ref:"hostingRoomDetail",attrs:{"house-rent-type":"分散式整租"===e.activeName?1:2,"edit-flag":!0},on:{closeDialog:e.closeRoomDetailDialog}})],1)],1),e._v(" "),a("el-dialog",{attrs:{visible:e.authorizeShow,title:"闲鱼授权"},on:{"update:visible":function(t){e.authorizeShow=t}}},[a("authorize",{on:{closeAuthorize:e.closeAuthorizeDialog}})],1),e._v(" "),a("el-dialog",{attrs:{visible:e.goAuthorizeShow,title:"授权提示",width:"350px"},on:{"update:visible":function(t){e.goAuthorizeShow=t}}},[a("div",{staticClass:"goAuthorize"},[a("p",[e._v("您需要完成闲鱼授权才能进行发布操作")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){e.goAuthorize()}}},[e._v("现在就去")])],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.certificationShow,title:"完成实名认证方可发布房源",width:"450px"},on:{"update:visible":function(t){e.certificationShow=t}}},[a("div",[a("el-form",{ref:"certificationFrom",attrs:{model:e.certificationFrom,rules:e.rules,"label-width":"80px","status-icon":""}},[a("el-form-item",{attrs:{label:"姓名",prop:"userName"}},[a("el-input",{staticClass:"user-input",attrs:{size:"small"},model:{value:e.certificationFrom.userName,callback:function(t){e.$set(e.certificationFrom,"userName",t)},expression:"certificationFrom.userName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"身份证",prop:"userId"}},[a("el-input",{staticClass:"user-input",model:{value:e.certificationFrom.userId,callback:function(t){e.$set(e.certificationFrom,"userId",t)},expression:"certificationFrom.userId"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"user-button",attrs:{type:"primary"},on:{click:function(t){e.goCertification()}}},[e._v("确认")])],1)],1)],1)])],1)])},[],!1,null,"60b3edc0",null);m.options.__file="houseSync.vue";t.default=m.exports},ts9B:function(e,t,a){}}]);