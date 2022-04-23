<template>
	<view class="uni-common-pb">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-list-cell uni-card">
				<view class="uni-list-cell-navigate uni-navigate-right" @tap="onPickOrderCategory">
					<view>
						<text style="color: red;">*</text>
						分类:
					</view>
					<text style="color: #BBBBBB;  font-size: 30upx;">{{ selCategory }}</text>
				</view>
			</view>

			<view class="uni-list-cell " hover-class="uni-list-cell-hover" style="display: flex; justify-content: space-between;">
				<view class="uni-list-cell-navigate uni-flex" style="flex-direction:row; flex-wrap: nowrap;">
					<view style="color: #000000;white-spacen:nowrap;width: 180upx; ">
						<text style="color: red;">*</text>
						主要联系人:
					</view>
					<input
						type="text"
						name="contact"
						v-model="contact"
						@input="onInputContact"
						placeholder="姓名"
						style="width: 180upx; font-size: 15px;color: #000000;"
						maxlength="5"
					/>
				</view>
				<view class="uni-flex ">
					<view class="" style="color: #000; white-spacen:nowrap; width: 130upx;flex-wrap: nowrap;">电话:</view>
					<input
						type="text"
						name="mobile"
						maxlength="11"
						placeholder="+86"
						v-model="mobile"
						@input="onInputMobile"
						style=" font-size: 15px; margin-left: 10upx; text-align: left;  color: #000000;"
					/>
				</view>
			</view>

			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<view>
						<text style="color: red;">*</text>
						地址
					</view>
					<!-- <picker
						mode="multiSelector"
						@columnchange="bindMultiPickerColumnChangecity"
						@change="bindMultiPickerChangecity"
						:value="multiIndexcity"
						:range="multiArraycity"
						range-key="label"
					>
						<view class="uni-input" >{{ categorycity_val }}</view>
					</picker>-->
					<view class="uni-input" @click="goPickerAddress" style="text-align: right;">{{ categorycity_val }}</view>
				</view>
			</view>
			<uni-popup :show="show" :type="type" :custom="true" :mask-click="false" @change="change2">
				<!-- <view class=""><graceSelectImg :maxFileNumber="9" @change="imgsChange1"></graceSelectImg></view> -->
				<view class="grace-body" style="min-height: 400upx;">
					<view class="grace-space-between">
						<text class="grace-title">管理图片</text>
						<text class="grace-icons icon-back" @click="cancel('tip')"></text>
					</view>

					<!-- <graceSelectImg :maxFileNumber="9" @change="imgsChange" :items="images_popup"></graceSelectImg> -->
					<!-- 图片选择  -->
				<!-- 	<view class="grace-title grace-margin-top">
						<text class="grace-title-text grace-black">请选择图片</text>
						<text class="grace-text-small grace-gray grace-icons icon-remove" @tap="clearAllImgs">清空图片</text>
					</view> -->
					<view style="margin-top:5rpx;">
						<graceSelectImgAndUpload
							:maxFileNumber="9"
							ref="selectimgandupload"
							@removeImg="removeImg"
							@uploaded="imgLoaded"
							@change="imgsChange"
							@uploaderror="uploaderror"
							:uploadServerUrl="upload_uri"
						></graceSelectImgAndUpload>
					</view>

					<view class="grace-space-between">
						<button class="button " size="mini" type="primary" @click="onSaveImage">保存</button>
						
						<button class="button " size="mini" type="primary" @tap="clearAllImgs">清空图片</button>
						<button class="button" size="mini" type="primary" @click="cancel('tip')">取消 </button>
					</view>
					<text style="color: red; width: 100%; text-align: center;">{{subtxt}}</text>
				</view>
			</uni-popup>
			<view class="uni-list-cell " hover-class="uni-list-cell-hover" style="font-size: 15px;  height: 50px; ">
				<view style=" display: flex; flex-direction: row; align-items: center;">
					<text style="width: 350upx; margin-top: 20upx; margin-left: 30upx;">
						<text style="color: red;">*</text>
						详细地址：
					</text>
					<input
						name="address_detail"
						type="text"
						v-model="address_detail"
						placeholder="如街道,商场,楼层等"
						maxlength="25"
						style="width:98%; font-size: 25upx; padding-top: 20upx; margin-left: -50upx; color: #000000;"
					/>
				</view>
			</view>
			<view class="uni-list-cell cell-pd">
				<view class="uni-uploader">
					
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate ">
							<view style="display: flex; flex-direction: row;">
								<text>施工参考图</text>
								<text style="color: #BBBBBB; margin-top: 6upx; font-size: 10px;">（故障图、施工图、验收单、等）</text>
							</view>
						</view>
					</view>

					<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="display: flex;  flex-direction: column; justify-content:center; align-items: center;">
						<view class="grace-space-between">
							<view style="width: 300upx;">
								<view class="grace-title">施工图</view>
								<view>
									<view class="box-images grace-box-shadow">
										
									<image :src="imageList[0] &&imageList[0].length>0 ? imageList[0][0] : '../../../static/shili.png'" 
															class="grace-img-card-img" mode="aspectFill"
															 @click="togglePopup('center','tip', 0)"  v-if="imageList[0] &&imageList[0].length>0 "  ></image>
									<button class="button box-images" type="button" @click="togglePopup('center','tip', 0)" v-else >+</button>
									</view>
								</view>
							</view>
							<view style="width: 300upx;">
								<view class="grace-title ">安装位置图</view>
								<view>
									<view class="box-images grace-box-shadow">
										<image :src="imageList[1] &&imageList[1].length>0 ? imageList[1][0] : '../../../static/shili.png'"
																class="grace-img-card-img" mode="aspectFill"
																 @click="togglePopup('center','tip', 1)"  v-if="imageList[1] &&imageList[1].length>0 "  ></image>
										<button class="button box-images" type="button" @click="togglePopup('center','tip', 1)" v-else>+</button>
									</view>
								</view>
							</view>
						</view>
						<view class="grace-space-between">
							<view style="width: 300upx;">
								<view class="grace-title ">验收单</view>
								<view>
									<view class="box-images grace-box-shadow">
										<image :src="imageList[2] &&imageList[2].length>0 ? imageList[2][0] : '../../../static/shili.png'"
																class="grace-img-card-img" mode="aspectFill"
																 @click="togglePopup('center','tip', 2)"  v-if="imageList[2] &&imageList[2].length>0 "  ></image>
										<button class="button box-images" type="button" @click="togglePopup('center','tip', 2)" v-else>+</button>
									</view>
								</view>
							</view>
							<view style="width: 300upx;">
								<view class="grace-title ">安装视频</view>
								<view>
									<view class="box-images grace-box-shadow">
										<image :src="imageList[3] &&imageList[3].length>0 ? imageList[3][0] : '../../../static/shili.png'"
																class="grace-img-card-img" mode="aspectFill"
																 @click="togglePopup('center','tip', 3)"  v-if="imageList[3] &&imageList[3].length>0 "  ></image>
										<button class="button box-images" type="button" @click="togglePopup('center','tip', 3)" v-else>+</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="uni-list-cell uni-card" hover-class="uni-list-cell-hover" style="display: flex; flex-direction: row;">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<view>
						<text style="color: red; ">*</text>
						施工时间
					</view>
					<graceDateTime @confirm="confirm2" :value="demo2Val" :isSecond="false" :isTime="false">
						<text class="demo grace-border-radius">
							{{ demo2Val }}
							<text class="grace-icons icon-date icon-left-margin"></text>
						</text>
					</graceDateTime>
				</view>
			</view>

			<view class="uni-list-cell uni-card" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate ">
					<view style="width: 350upx;">
						<text style="color: red; ">*</text>
						下单模式
					</view>
					<radio-group name="type" @change="onOrderTypeChange">
						<radio value="0" :checked="orderType == 0">竞价模式</radio>
						<radio value="1" :checked="orderType == 1">托管模式</radio>
					</radio-group>
				</view>
			</view>
			<view class="uni-list-cell uni-card" hover-class="uni-list-cell-hover">
				<view style="margin-left: 5upx;  width: 80upx; display: flex; flex-direction: column; justify-content: center; align-items: center;">
					<text style="color: red; ">*</text>
					<text>施</text>
					<text>工</text>
					<text>内</text>
					<text>容</text>
				</view>
				<view class="uni-textarea"><textarea @input="onInputComment" placeholder="请输入详细的施工内容" @focus="onFocus" style="width: 90%;  height: 150px;" /></view>
			</view>
			<view>
				<button type="primary" form-type="submit" :disabled="disable_order" style="margin-top: 20px; margin-left: 20px;margin-right: 20px; background-color: #6cb231;">
					提交订单
				</button>
			</view>
			<view style="display: flex;  justify-content: center;">
				<view style="justify-content: center;">
					<checkbox-group style="display:flex; flex-direction: row; justify-content: center;">
						<label>
							<checkbox value="cb" checked="true" />
							同意
						</label>
						<view @tap="onProtocol">异修服务协议</view>
					</checkbox-group>
				</view>
			</view>
		</form>
		<view class="page">
			<view class="uni-padding-wrap">
				<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="hidePopup" style="width: 800upx;">
					<view class="uni-common-mt uni-helllo-text uni-center">
						<text style="color: #343434;">可授权，如有疑问请联系客服</text>
						<view style=" width: 230upx; height: 80upx; margin-left: 50upx; ">
							<button type="primary" style="background-color:#6cb231; border-radius: 40upx; margin-top: 70upx; font-size: 20upx;" @click="onCallCustomerService">
								联系客服
							</button>
						</view>
					</view>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
//上传图片
import graceSelectImg from '@/graceUI/components/graceSelectImg.vue';

// https://github.com/zhetengbiji/mpvue-picker
import uniPopup from '@/components/uni-popup.vue';
// import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
// https://github.com/zhetengbiji/mpvue-citypicker

// 城市控件
import provinceData from '../../../threeComponents/city-data/province.js';
import cityData from '../../../threeComponents/city-data/city.js';
import areaData from '../../../threeComponents/city-data/area.js';

import uniIcon from '@/components/uni-icon.vue';
import util from '../../../common/util.js';
import xyDialog from '@/components/sen-pickerview/sen-pickerview.vue';
import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';

import graceDateTime from '@/graceUI/components/graceDateTime.vue';
import graceSelectImgAndUpload from '@/graceUI/components/graceSelectImgAndUpload.vue';

var graceChecker = require('../../../common/graceChecker.js');
var formatLocation = util.formatLocation;
var _self = null;
var self;
function getDate(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}
export default {
	components: {
		uniIcon,
		xyDialog,
		MxDatePicker,
		uniPopup,
		graceSelectImg,
		graceDateTime,
		graceSelectImgAndUpload
	},

	data() {
		const currentDate = this.getDate({
			format: true
		});

		return {
			upload_uri: this.$util.API_URI+'/sys/grace_upload',
			subtxt:'',
			selectedimgs: [],
			imageList:[[],[],[],[]], 
			imageListIds:[[],[],[],[]],
			currentImageIndex:0, // working/position/verify/video
			
			selCategory: '请选择分类',
			images_popup: [],
			demo2Val: '请选择具体日期',
			show: false,
			type: '',
			list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			content: '顶部弹 popup',
			disable_order: false,
			graceSelectTips: [
				{ name: '店铺装修', value: '0', checked: true },
				{ name: '店铺维修', value: '1', checked: false },
				{ name: '围挡搭建', value: '2', checked: false },
				{ name: '展柜拆装', value: '3', checked: false },
				{ name: '店铺复尺', value: '4', checked: false },
				{ name: '广告画转换', value: '5', checked: false }
			],
			hasLocation: false,
			location: {},
			locationAddress: '',
			longitude: '',
			latitude: '',
			checked: true,

			
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 1,
			count: [1],
			service_id: 0,

			dateFrom: this.getDate('start'),
			dateTo: this.getDate('end'),

			shopName: '',
			contact: '',
			mobile: '',
			email: '',
			address_detail: '',
			comment: '',
			condition: '',
			work_refer: '',
			work_verify: '',
			morenzhi: '请选择',

			orderType: 0,
			user: null,

			popType: 'middle',
			title: 'popup',
			showPopupMiddle: false,
			msg: '',
			cityText2: '点击选择',
			//记录全部信息用于表单提交
			city1: null,
			Categories: {},
			date: getDate({
				format: true
			}),
			themeColor: 'red',
			multiIndexcity: [0, 0, 0],
			categorycity_val: '地址薄',
			multiArraycity: [provinceData, cityData[0], areaData[0][0]]
		};
	},
	onLoad(option) {
		_self = this;
		self = this;

		this.user = uni.getStorageSync('user_info');
		if (uni.getStorageSync('actor_type') == 1) {
			// master can not order
			uni.showToast({
				title: '师傅模式下不能下单，请去用户中心切换到用户模式。',
				icon: 'none'
			});
			setTimeout(function() {
				uni.switchTab({
					url: '/pages/my/index'
				});
			}, 1500);

			return;
		}

		if (option) {
			this.service_id = option.service_id;
			this.work_refer = option.work_refer;
			this.work_verify = option.work_verify;
		}
	},
	onShow() {
		_self = this;
		console.debug('onShow');

		this.locationAddress = uni.getStorageSync('locationAddress');
		this.location = uni.getStorageSync('location');

		uni.$once('pick_category', function(option) {
			console.log(' pick_category:', option);
			console.log(' pick_category ids:', option);
			_self.selCategory = option.value.join('/');
		});

		uni.$once('pick_address', function(option) {
			console.log(' pick_address:', option);
			_self.categorycity_val = option.city;
			_self.address_detail = option.address;

			_self.mobile = option.contact_mobile;
			_self.contact = option.contact;
		});
	},
	onUnload() {
		uni.$off('pick_category');
		uni.$off('pick_address');
		console.log('onUnload,  $off');
	},
	onHide() {
		console.log('onHide');
	},

	onReady() {
		var login_status = uni.getStorageSync('login_status');
		console.debug('login_status:' + login_status);
		if (login_status != 1) {
			uni.navigateTo({
				url: '/pages/my/login/login'
			});
			return;
		}
		//check status
		//company_status
		// identity_status
		//filled_info

		var user = uni.getStorageSync('user_info');
		if (user) {
			// 			if(!user.filled_info){
			// 				uni.showToast({
			// 					title:'请先完善用户信息再下单。'
			// 				})
			// 				 uni.navigateTo({
			// 				  url: '/pages/my/face',
			// 				})
			//
			// 				return
			// 			}
			// 				if(!user.identity_status){
			// 				uni.showToast({
			// 					title:'请先完成实名认证后再下单。'
			// 				})
			//
			// 				 uni.navigateTo({
			// 				  url: '/pages/my/certification_id',
			// 				})
			//
			//
			//
			// 				return
			// }
		}
	},
	onUnload() {
		(this.imageList = []),
			(this.sourceTypeIndex = 2),
			(this.sourceType = ['拍照', '相册', '拍照或相册']),
			(this.sizeTypeIndex = 2),
			(this.sizeType = ['压缩', '原图', '压缩或原图']),
			(this.countIndex = 1);
	},

	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	methods: {
	
		//upload images
		onSaveImage: function(){
			this.submit()
		},
		// 选择图片时引起的数据变化
		imgsChange: function(imgs) {
			console.log(imgs)
			this.selectedimgs = imgs;
			this.subtxt = '';
		},
		// 提交动态
		submit: function() {
			if (this.selectedimgs.length < 1) {
				uni.showToast({ title: '请选择图片', icon: 'none' });
				return;
			}
			this.subtxt = '图片上传中';
			this.$refs.selectimgandupload.upload();
		},
		imgLoaded: function(res) {
			this.subtxt = '数据提交中';
			console.log('imgLoaded',res);
			var imgs = []
			var imgIds = []
			for( var indx in res){
				if(this.$util.isNull( res[indx].result))
				{
					imgs.push( res[indx].url)
				}else{
					
					imgs.push( this.$util.IMAGE_URI + res[indx].result.result.url)
					imgIds.push(res[indx].result.result.id)
				}
				
			}
			console.log('imgs:', imgs)
			console.log('imgs ids:', this.imageListIds)
			this.imageListIds[this.currentImageIndex] = imgIds
			this.imageList[this.currentImageIndex] = imgs
			this.$refs.selectimgandupload.setItems(imgs)
			//console.log(this.textareaVal);
			// 提交数据 图片信息保存在 res 内[ 数组形式 ]
			// 内容保存在 textareaVal
			//连接 api 提交即可
			//提交成功页面跳转
			// this.selectedimgs = imgs
			this.subtxt = '图片上传成功';
			
			//close pop
			this.cancel('tip')
		},
		uploaderror: function() {
			console.log('上传过程遇到错误');
		},
		// 清空图片
		clearAllImgs: function() {
			this.selectedimgs = [];
			this.$refs.selectimgandupload.clearAllImgs();
		},
		removeImg: function(e) {
			console.log('被删除的图片信息');
			console.log(e);
		},

	//end upload images
		confirm2: function(res) {
			this.demo2Val = res[0] + '-' + res[1] + '-' + res[2];
		},
		onPickOrderCategory: function() {
			uni.navigateTo({
				url: 'order_category'
			});
		},


		togglePopup(type, open, imageIdx) {
			switch (type) {
				case 'center':
					this.content = '居中弹出 popup';
					break;
			}
			this.type = type;
			if (open === 'tip') {
				this.show = true;
			} else {
				this.$refs[open].open();
			}
			
			this.currentImageIndex = imageIdx
			//siwtch 
			this.$refs.selectimgandupload.setItems(this.imageList[imageIdx])
			
			
			
		},
		cancel(type) {
			if (type === 'tip') {
				this.show = false;
				return;
			}
			this.$refs[type].close();
		},
		change(e) {
			console.log(e.show);
		},

		cancel1(type) {
			if (type === 'tip') {
				this.show = false;
				return;
			}
			this.$refs[type].close();
		},
		change1(e) {
			console.log(e.show);
		},

		cancel2(type) {
			if (type === 'tip') {
				this.show = false;
				return;
			}
			this.$refs[type].close();
		},
		change2(e) {
			console.log(e.show);
		},

		cancel3(type) {
			if (type === 'tip') {
				this.show = false;
				return;
			}
			this.$refs[type].close();
		},
		change3(e) {
			console.log(e.show);
		},

		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.target.value);
			this.index = e.target.value;
		},
		bindMultiPickerColumnChange: function(e) {
			console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value);
			this.multiIndex[e.detail.column] = e.detail.value;

			//self.multiArray[0] = self.Categories;
			var second = self.Categories[self.multiIndex[0]];
			self.multiArray[1] = second.children;
			self.multiArray[2] = self.multiArray[1][self.multiIndex[1]].children;

			this.$forceUpdate();
		},
		bindMultiPickerColumnChangecity: function(e) {
			console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value);
			this.multiIndexcity[e.detail.column] = e.detail.value;

			//self.multiArray[0] = self.Categories;
			var selpro = provinceData[self.multiIndexcity[0]];
			self.multiArraycity[1] = cityData[self.multiIndexcity[0]];
			self.multiArraycity[2] = areaData[self.multiIndexcity[0]][self.multiIndexcity[1]];

			this.$forceUpdate();
		},
		bindMultiPickerChangecity: function(e) {
			console.log('值为：' + e.detail.value);
			this.multiIndexcity = e.detail.value;
			self.categorycity_val = provinceData[self.multiIndexcity[0]].label;
			self.categorycity_val += '/' + cityData[this.multiIndexcity[0]][self.multiIndexcity[1]].label;
			if (self.multiArraycity[2]) {
				self.categorycity_val += '/' + self.multiArraycity[2][this.multiIndexcity[2]].label;
			}
		},

		bindDateChange: function(e) {
			this.date = e.target.value;
		},

		onProtocol() {
			var url = util.H5_URL + 'sys/service';
			util.goH5(url);
		},

		// qa:https://lbs.amap.com/api/webservice/guide/api/search
		GetLocalCity(city_center, key) {
			// 在天安门周围1千米内对关键字“肯德基”进行检索
			var uri = 'https://restapi.amap.com/v3/place/around?key=f4ef5eba538efbe9a6f7147c601f8f2e&location=' + city_center + '&keywords=' + key;
			if (key == '') {
				uri =
					'https://restapi.amap.com/v3/place/around?key=f4ef5eba538efbe9a6f7147c601f8f2e&location=' +
					city_center +
					'&types=190000|180000|170000|140000|120000|060000|050000&keywords=' +
					key;
			}

			uni.request({
				url: uri,
				methods: 'get',
				success: ret => {
					console.log('get local city:' + JSON.stringify(ret));
					let pois = ret.data.pois;
					if (pois.length > 0) {
						if (_self.local_city == '') {
							//remove 市
							var city = pois[0].cityname;
							var endPos = city.lastIndexOf('市');
							if (endPos > 0) {
								city = city.substring(0, endPos);
							}
							_self.city = city;
							_self.local_city = city;
							uni.setStorageSync('local_city', city);
							console.info('local_city:' + city);
						}
					}
					console.debug(JSON.stringify(ret.data));
				},
				fail: res => {
					console.error('GetLocalCity err :' + JSON.stringify(ret.data));
				}
			});
		},
		onCallCustomerService: function() {
			uni.makePhoneCall({
				phoneNumber: '4008062355' //customer service
			});
		},
		//统一的关闭popup方法
		hidePopup: function() {
			this.showPopupMiddle = false;
			this.showPopupTop = false;
			this.showPopupBottom = false;
		},
		//展示居中 popup
		showMiddlePopup: function() {
			this.hidePopup();
			this.popType = 'middle';
			this.showPopupMiddle = true;
		},

		onOrderTypeChange: function(evt) {
			console.debug(evt.detail.value); //detail or target
			this.orderType = evt.detail.value;
			if (this.orderType == 1) {
				//this.showMiddlePopup();
			}
		},

		quedingbutton(guolai) {
			console.log(guolai);
			this.morenzhi = guolai;
		},
		goPickerAddress() {
			//this.goDetailPage('home/order/picker_address');

			uni.navigateTo({
				url: 'address'
			});
		},

		onFocus() {},
		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'mobile',
					checkType: 'phoneno',
					checkRule: '',
					errorMsg: '请输入正确的手机号码'
				},
				//         {
				//           name: 'shop_name',
				//           checkType: 'string',
				//           checkRule: '3,30',
				//           errorMsg: '店铺应为3-30个字符',
				//         },
				{
					name: 'contact',
					checkType: 'string',
					checkRule: '1,5',
					errorMsg: '联系人应为1-5个字符'
				},
				// 				{
				// 					name: 'email',
				// 					checkType: 'string',
				// 					checkRule: '',
				// 					errorMsg: '请输入正确邮箱格式'
				// 				},

				{
					name: 'address_detail',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '详情地址不能为空'
				},
				{
					name: 'type',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '订单类型不能为空'
				}
				// {
				// 	name: 'start_time',
				// 	checkType: 'notnull',
				// 	checkRule: '',
				// 	errorMsg: '开始时间不能为空'
				// },
				// {
				// 	name: 'end_time',
				// 	checkType: 'notnull',
				// 	checkRule: '',
				// 	errorMsg: '结束时间不能为空'
				// }
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug('formData:' , formData);
			if (formData.type == 0) {
				if (formData.price <= 0.0) {
					uni.showToast({ title: '一口价订单类型必须输入价格!', icon: 'none' });
					return;
				}
			}
				
			this.work_refer = this.imageListIds[0].join(',');
			
			
			this.work_pos = this.imageListIds[1].join(',');
			this.work_verify = this.imageListIds[2].join(',');
			
			
			if (!this.work_refer || this.work_refer.length <= 0) {
				uni.showToast({ title: '请上传现场施工参考图!', icon: 'none' });
				return;
			}

			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				//check mail
				console.debug(formData.email);
				if (formData.email && formData.email.length > 0) {
					//var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
					var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
					if (!mailReg.test(formData.email)) {
						uni.showToast({ title: '邮箱格式错误!!', icon: 'none' });
						return;
					}
				}

				// var today = new Date();
				// today.setFullYear(today.getYear(), today.getMonth(), today.getDay());
				// if (to < from) {
				// 	uni.showToast({
				// 		title: '结束日期不能小于开始日期！'
				// 	});
				// 	return;
				// }
				// if (to < today.getTime()) {
				// 	uni.showToast({
				// 		title: '结束日期不能小于今天日期！'
				// 	});
				// 	return;
				// }

				this.onOrder(formData);
				// uni.showToast({title:"验证通过!", icon:"none"});
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		},

		onConditionChange: function(e) {
			console.log('checkbox发生change事件，携带value值为：' + e.detail.value);
			this.condition = e.detail.value;
		},

		onInputComment(e) {
			this.comment = e.detail.value;
		},

		onInputAddressDetail(e) {
			this.address_detail = e.detail.value;
		},

		onInputMobile(e) {
			this.mobile = e.detail.value;
		},
		onInputContact(e) {
			this.contact = e.detail.value;
		},
		chooseLocation: function() {
			var self = this;

			// 			uni.openLocation({
			//             latitude: 30.4,
			//             longitude: 104.04,
			// 						name:'成都',
			// 						address:'中心区',
			//             success: function () {
			//                 console.log('success');
			//             }
			//         });

			uni.chooseLocation({
				longitude: 104.04, //无效
				latitude: 30.4,
				success: res => {
					console.debug('shoose location:' + JSON.stringify(res));
					self.longitude = res.longitude;
					self.latitude = res.latitude;
					(self.hasLocation = true), (self.location = formatLocation(res.longitude, res.latitude)), (self.locationAddress = res.address);
				}
			});
		},
		clear: function() {
			this.hasLocation = false;
		},
		changeIndicatorDots: function(e) {},
		// 单列

		getDate(type) {
			const date = new Date();

			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;

			day = day > 9 ? day : '0' + day;

			return `${year}-${month}-${day}`;
		},

		sourceTypeChange: function(e) {
			this.sourceTypeIndex = e.target.value;
		},
		sizeTypeChange: function(e) {
			this.sizeTypeIndex = e.target.value;
		},
		countChange: function(e) {
			this.countIndex = e.target.value;
		},

		onOrder(formData) {
			//check order_monthly_close
			// if (this.user.order_monthly_close != 1 && formData.type == 1) {
			// 	//fixme:show info

			// 	return;
			// }
			//check data

			this.disable_order = true;
			var orderObj = new Object();
			//build order object
			orderObj.service_type=1; //nonstandard
			orderObj.service_id = this.service_id;
			// orderObj.address_id=1; // auto crated

			orderObj.area = 1;

			orderObj.coupon_id = 0;
			orderObj.comment = this.comment;
			orderObj.staff_id = 0;
			orderObj.shop_name = this.shopName;
			// orderObj.address = this.locationAddress;  //change to
			orderObj.address = this.categorycity_val;
			orderObj.address_detail = formData.address_detail;

			orderObj.contact = this.contact;
			orderObj.mobile = this.mobile;
			orderObj.email = this.email;
			// orderObj.order_condition = this.condition.join(',')
			orderObj.order_condition = this.condition;
			var loc = uni.getStorageSync('location');
			var locArr = loc.split(',');
			orderObj.longitude = locArr[0];
			orderObj.latitude = locArr[1];
			// send params, user local storage

			// formData.address = this.locationAddress;
			formData.service_type=1; //nonstandard
			formData.address = this.categorycity_val;
			formData.service_id = this.service_id;
			formData.longitude = locArr[0];
			formData.latitude = locArr[1];
			formData.city = uni.getStorageSync('city');
			formData.work_refer = this.work_refer;
			formData.work_verify = this.work_verify;

			console.debug('order obj:' + JSON.stringify(orderObj));
			console.debug('order form data:' + JSON.stringify(formData));

			var self = this;
			util.POST(
				'order/add',
				formData,
				function(data) {
					self.disable_order = false;
					if (data && data.order_no) {
						uni.showModal({
							title: '下单成功通知',
							content: '您已成功下单，订单编号:' + data.order_no,
							showCancel: false,
							confirmText: '确定'
						});

						//clear refer
						uni.setStorageSync('work_refer', '');
						uni.setStorageSync('work_verify', '');
						uni.setStorageSync('location', '');
						uni.setStorageSync('locationAddress', '');
						uni.setStorageSync('picked_city', '');

						setTimeout(function() {
							if (formData.type == 0) {
								//一口价才需要支付

								uni.navigateTo({
									url: '/pages/home/order/pay?order_no=' + data.order_no
								});
							} else {
								uni.navigateTo({
									url: '/pages/my/order_index?status=1'
								});
							}
						}, 1500);
					} else {
						uni.showModal({
							title: '下单失败',
							content: '下单失败，请注意检查填写内容是否规范。',
							showCancel: false,
							confirmText: '确定'
						});
					}
				} //end fun
			);
			this.disable_order = false;
			//go to next page
		},

		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		},
		onImagesPicker(e) {
			this.goDetailPage('home/order/add_ref_images?work_refer=' + this.work_refer + '&work_verify=' + this.work_verify);
			// this.goDetailPage('my/open');
		}
	}, //end methods

	onBackPress() {},
	onUnload() {}
};

var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
</script>

<style>
.checkbox {
	width: 120px;
}
.box-images {
	width: 200upx;
	height: 200upx;
	border: #aaaaaa;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
