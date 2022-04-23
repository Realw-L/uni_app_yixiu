<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class=" uni-common-pb" style="background-color: #ffffff;">
				<view class=" uni-common-pb" style="padding: 0;">
					<image :src="HOST + '/Public/app/10s.png'" mode=" widthFix" style="width: 100%; height:390upx ; margin-top: -50upx;"></image>
				</view>
				<view
					class="uni-padding-wrap uni-common-pb uni-card"
					style="width: 80%; margin-left: 20px; margin-top: -50px;  border:5px;  border-radius:10px; box-shadow: 1px 1px 10px #888888;"
				>
					<view class="uni-header-logo"><text style="font-size: 25px;">智能报价</text></view>
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="border:1px solid #a1a1a1; border-radius:10px;  background-color: #ffffff;">
						<view class="uni-list-cell-navigate" style="margin-left: 40upx;">基装报价</view>
						<view>
							<image :src="dImg" style="width: 35px; height: 100px; margin-left: -20px;" mode="widthFix" v-for="dImg in totalsImage"></image>
							<!-- <image src="../../../static/b8.png" style="width: 35px; height: 100px; margin-left: -20px;" mode="widthFix"></image> -->
						</view>
						<view style="margin-right: 30px; font-size: 25px;  font-family:300-CAI978.ttf;">元</view>
					</view>
					<view
						class="uni-list-cell"
						hover-class="uni-list-cell-hover"
						style="border:1px solid #a1a1a1; border-radius:10px;  background-color: #FFFFFF; margin-top: 10upx;"
					>
						<view class="uni-list-cell-navigate" style="margin-left: 40upx;">道具费用</view>
						<view>
							<image :src="dImg" style="width: 35px; height: 100px; margin-left: -20px;" mode="widthFix" v-for="dImg in totalsImage"></image>
							<!-- <image src="../../../static/b8.png" style="width: 35px; height: 100px; margin-left: -20px;" mode="widthFix"></image> -->
						</view>
						<view style="margin-right: 30px; font-size: 25px;  font-family:300-CAI978.ttf;">元</view>
					</view>
					<view
						class="uni-list-cell"
						hover-class="uni-list-cell-hover"
						style="border:1px solid #a1a1a1; border-radius:10px; margin-top: 15upx; display: flex; flex-direction: row;"
					>
						<image src="../../../static/sd.jpg" mode="" style="width: 90upx; height: 40upx; margin-left: 2upx; "></image>
						<text style="width: 500upx;  padding: 26upx; margin-left: -2upx;">店铺总面积</text>
						<view style="text-align: right; margin-right: 25upx;"><input name="area" type="number" @input="KeyInput" placeholder="请输入面积" maxlength="5" /></view>
						<view style="margin-right: 25upx;"><text>m²</text></view>
					</view>
					<view
						class="uni-list-cell"
						hover-class="uni-list-cell-hover"
						style="border:1px solid #a1a1a1; border-radius:10px; margin-top: 15upx;"
						@tap="goDetailPage('home/bid/grid')"
					>
						<image src="../../../static/index.jpg" mode="" style="width: 40upx; height: 40upx; "></image>
						<view class="uni-list-cell-navigate" style=" margin-left: 1upx; width: 150upx;">
							店铺类型
							<text>{{ selCategoryString }}</text>
						</view>
						<view><uni-icon type="arrowdown" size="15" style="margin-right: 25upx;"></uni-icon></view>
					</view>

					<view class="uni-card">
						<view class="uni-list">
							<view class="uni-list-cell uni-collapse" style="border:1px solid #a1a1a1; border-radius:10px;">
								<view
									class=" uni-active uni-list-cell-navigate uni-navigate-bottom"
									hover-class="uni-list-cell-hover"
									@click="showMulLinkageTwoPicker"
									style="display: flex;flex-direction: row;justify-content: flex-start;  background-color: #ffffff;"
								>
									<image src="../../../static/111111.png" mode="" style="width: 35upx; height: 45upx; margin-left: -20upx;"></image>
									<text style=" margin-left: 27upx;">{{ city == '' ? '所在城市' : city }}</text>
									<view class="" style="padding-right:10px ;"></view>
								</view>
							</view>
						</view>
					</view>
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="border:1px solid #a1a1a1; border-radius:10px;">
						<image src="../../../static/iPhone.jpg" mode="" style="width: 40upx; height: 40upx; margin-left: 5upx; "></image>
						<text style="width: 500upx; margin-left: 5upx;  padding: 26upx; ">联系方式</text>
						<input name="mobile" type="text" placeholder="请输入您的手机号码" @input="KeyInputMobile" maxlength="11" style="margin-left: -200upx;" />
					</view>
					<button type="primary" form-type="submit" style="background-color: #09BB07; margin-top: 10px;">免费申请</button>
				</view>

				<view class="uni-header-logo" style=" margin-top: -25px; "><text style="color: #B2B2B2; font-size: 12px;">※异修承诺：您的私人信息，不泄露给任何第三方</text></view>
				<view class="uni-padding-wrap uni-common-pb" style="width: 90%; background-color: #ffffff;">
					<view class="uni-header-logo"><text style="font-size: 25px;">为什么要了解报价</text></view>
					<view class="uni-card" style="margin-top: -20px;  border-radius:10px; box-shadow: 0px 0px 2px 1px #BBBBBB;">
						<view class=" uni-common-pb">
							<view class="uni-header-logo"><text style="font-size: 20px;">合理分配预算</text></view>
							<view class="uni-header-logo" style="margin-top: -40px;"><text style="font-size: 15px;">提前了解报价，严防装修超预算</text></view>
							<view class="uni-flex" style="display: flex; justify-content: center;">
								<image :src="HOST + '/Public/app/jizhuang1.png'" mode="" style=" margin-left: 2px; height: 150px;"></image>
							</view>
						</view>
						<view class=" uni-common-pb">
							<view class="uni-header-logo"><text style="font-size: 20px;">谈判心里有数</text></view>
							<view class="uni-header-logo" style="margin-top: -40px;"><text style="font-size: 15px;">手持详实装修报价单，安心和装修公司谈判</text></view>
							<view class="uni-flex" style="display: flex; justify-content: center;">
								<image :src="HOST + '/Public/app/jizhuang2.png'" mode="" style=" margin-left: 5px; height: 150px;"></image>
							</view>
						</view>
					</view>
				</view>
				<view>
					<view class="uni-padding-wrap uni-common-pb" style="width: 90%; background-color: #ffffff;">
						<view class="uni-header-logo"><text style="font-size: 25px;">为什么要了解报价</text></view>
						<view class="uni-card" style="margin-top: -20px;  border-radius:10px; box-shadow: 0px 0px 2px 1px #BBBBBB;">
							<view class=" uni-common-pb">
								<view class="uni-header-logo"><text style="font-size: 20px;">报价误差小</text></view>
								<view class="uni-header-logo" style="margin-top: -40px;"><text style="font-size: 15px;">提前了解报价，严防装修超预算</text></view>
								<view class="uni-flex" style="display: flex; justify-content: center;">
									<image :src="HOST + '/Public/app/jizhuang3.png'" mode="" style="margin-left: 2px;  height: 150px;"></image>
								</view>
							</view>
							<view class=" uni-common-pb">
								<view class="uni-header-logo"><text style="font-size: 20px;">明细超清晰</text></view>
								<view class="uni-header-logo" style="margin-top: -40px;"><text style="font-size: 15px;">全空间造价拆解详尽，300个项目详细列表</text></view>
								<view style="display: flex; justify-content: center;">
									<image :src="HOST + '/Public/app/jizhuang4.png'" mode="" style="margin-left: 2px;  height: 150px;"></image>
								</view>
							</view>
						</view>

						<button type="primary" form-type="submit" style="background-color: #09BB07; margin-top: 20px;">免费获取报价明细</button>
					</view>
				</view>
			</view>
			<mpvue-picker
				:themeColor="themeColor"
				ref="mpvuePicker"
				:mode="mode"
				:deepLength="deepLength"
				:pickerValueDefault="pickerValueDefault"
				@onConfirm="onConfirm"
				@onCancel="onCancel"
				:pickerValueArray="pickerValueArray"
			></mpvue-picker>
			<mpvue-city-picker
				:themeColor="themeColor"
				ref="mpvueCityPicker"
				:pickerValueDefault="cityPickerValueDefault"
				@onCancel="onCityCancel"
				@onConfirm="onCityConfirm"
				@change="onCityConfirm"
			></mpvue-city-picker>
			<uni-popup :show="showPopupMiddle" :type="popType" v-on:hidePopup="onShopType">
				<view class="uni-common-mt uni-helllo-text uni-center">
					<text style="display: flex;justify-content: center; font-size: 30upx;">选择您的店铺类型</text>

					<view class="uni-grid-9 uni-common-mt db" style="background: none;border: 0; display: flex;justify-content: center; margin-right: -90upx;">
						<view class="grace-select-tips" style="display: flex; flex-direction: row;" name="shop_services">
							<radio-group class="grace-boxes" @change="graceSelectChange" name="shop_type" style="width:570upx; margin-left:-30upx; margin-top: -30upx;">
								<label v-for="(item, index) in services" :key="index" :class="[item.checked ? 'grace-checked' : '']">
									<radio :value="item.value" :checked="item.checked"></radio>
									<view style="font-size: 20upx; width: 50px; ">{{ item.name }}</view>
								</label>
							</radio-group>
						</view>
						<button type="warn" style="background-color: #09BB07; width: 30%; height: 70%; margin-top: 10upx; margin-left: 215upx;" @tap="onShopType">确定</button>
					</view>
				</view>
			</uni-popup>
		</form>
	</view>
</template>

<script>
var graceChecker = require('../../../common/graceChecker.js');
// https://github.com/zhetengbiji/mpvue-picker
import mpvuePicker from '../../../threeComponents/mpvueCityPicker.vue';
// https://github.com/zhetengbiji/mpvue-citypicker
import mpvueCityPicker from '../../../threeComponents/mpvuePicker.vue';
import cityData from '../../../common/city.data.js';
import uniIcon from '@/components/uni-icon.vue';
import uniPopup from '@/components/uni-popup.vue';
import uniNavBar from '@/components/uni-nav-bar.vue';

import util from '../../../common/util.js';

var self;
export default {
	components: {
		mpvuePicker,
		mpvueCityPicker,
		uniIcon,
		uniPopup,
		uniNavBar
	},
	data() {
		return {
			HOST: this.$util.HOST,
			digiters: [
				this.$util.HOST + '/Public/app/b0.png',
				this.$util.HOST + '/Public/app/b1.png',
				this.$util.HOST + '/Public/app/b2.png',
				this.$util.HOST + '/Public/app/b3.png',
				this.$util.HOST + '/Public/app/b4.png',
				this.$util.HOST + '/Public/app/b5.png',
				this.$util.HOST + '/Public/app/b6.png',
				this.$util.HOST + '/Public/app/b7.png',
				this.$util.HOST + '/Public/app/b8.png',
				this.$util.HOST + '/Public/app/b9.png'
			],
			themeColor: 'red',
			pickerValueArray: [0],
			mode: '',
			deepLength: 2,
			pickerValueDefault: [0, 0, 0],
			cityPickerValueDefault: [0, 0, 0],
			mulLinkageTwoPicker: cityData,
			cityName: '',
			pickerText: '',

			// modal
			popType: 'middle',
			showPopupMiddle: false,
			service_id: 0,
			totalsImage: [this.$util.HOST + '/Public/app/b0.png'],
			total: 0,
			city: '',
			selCategory: [],
			selCategoryString: '',
			mobile: '',
			area: 0,
			height: 0,
			shop_services: '',
			services: [
				{ name: '服装', value: '0', checked: true },
				{ name: '鞋帽', value: '1', checked: false },
				{ name: '手表', value: '2', checked: false },
				{ name: '珠宝', value: '3', checked: false },
				{ name: '餐饮', value: '4', checked: false },
				{ name: '眼镜', value: '5', checked: false },
				{ name: '化妆品', value: '6', checked: false },
				{ name: '奢侈品', value: '7', checked: false },
				{ name: '其他', value: '8', checked: false }
			]
		};
	},
	onLoad: function(option) {
		self = this
		if (option) {
			this.service_id = option.id;
		}
		this.HOST = this.$util.HOST;
	},
	onShow() {
		uni.$on('pick_shop_type', function(options){
			console.log('pick_shop_type:', options)
			
			self.selCategoryString = options.value.join(',')
			self.selCategory = options.index;
		})
	},
	onUnload() {
		uni.$off('pick_shop_type')
	},
	methods: {
		calcKM: function(dist) {
			if (!dist) return '';

			var d = parseFloat(dist);
			if (d > 1000) {
				d = d / 1000;
				return Math.round(d).toString() + 'km';
			}

			var val = Math.round(d).toString() + 'm';
			console.info('calcKM:', val);
			return val;
		},
		graceSelectChange: function(e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.services.length; i++) {
				if (checkVal.indexOf(this.services[i].value + '') != -1) {
					this.services[i].checked = true;
				} else {
					this.services[i].checked = false;
				}
			}
			this.services = this.services;
			this.selCategory = e.detail.value;
			console.debug(this.selCategory);

			this.selCategoryString = this.services[this.selCategory].name;
		},
		KeyInputMobile: function(e) {
			this.mobile = e.detail.value;
		},

		KeyInput: function(e) {
			this.area = e.detail.value;
		},
		onShopTypeChange: function(e) {},
		transTotalToImages(total) {
			var d = 0;
			var totalsImageTmp = [];
			var strnum = total + '';
			console.debug('strnum:' + strnum);
			for (var i = 0; i < strnum.length; i++) {
				var c = strnum[i];
				d = parseInt(c);
				// if (d) {
				totalsImageTmp.push(this.digiters[d]);
				console.debug('total item:' + d);
				// }
			}

			return totalsImageTmp;
		},
		onCalc() {
			var self = this;
			util.POST(
				'order/calc',
				{
					service_id: self.service_id,
					selCategory: self.selCategory,
					mobile: self.mobile,
					city: self.city,
					area: self.area
				},
				function(data) {
					if (data) {
						self.totalsImage = self.transTotalToImages(data.price);
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 300
						});
						self.noTitlemodalTap();
					}
				}
			);
		},

		onShopType() {
			this.showPopupMiddle = !this.showPopupMiddle;
		},
		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		},

		//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
		//--
		onCancel(e) {
			console.log(e);
		},
		onCityCancel(e) {
			console.log(e);
		},
		// 二级联动选择
		showMulLinkageTwoPicker() {
			this.pickerValueArray = this.mulLinkageTwoPicker;
			this.mode = 'multiLinkageSelector';
			this.deepLength = 2;
			this.pickerValueDefault = [0, 0, 0];
			this.$refs.mpvuePicker.show();
		},

		onConfirm(e) {
			this.pickerText = JSON.stringify(e);
			console.debug(this.pickerText);
			this.city = e.label;
		},
		onCityConfirm(e) {
			console.log('city seled:' + JSON.stringify(e));
			this.cityName = JSON.stringify(e);
			this.city = this.cityName;
		},
		noTitlemodalTap() {
			uni.showToast({
				title: '申请成功'
			});
			//
			//       uni.showModal({
			//         title: '异修APP通知',
			//         // content: '您的申请已受理，稍等片刻，将会有相关工作人员联系您！',
			// 				content: '申请成功',
			//         showCancel: false,
			//         confirmText: '确定',
			//       })
		},
		modalTap: function(e) {
			uni.showToast({
				title: '申请成功'
			});
			//
			//       uni.showModal({
			//         title: '异修APP通知',
			//         content: '您的申请已受理，稍等片刻，将会有相关工作人员联系您！',
			//         showCancel: false,
			//         confirmText: '确定',
			//       })
		},

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
				{
					name: 'area',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '面积不能为空'
				},
				{
					name: 'shop_type',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '店铺类型不能为空'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug('formData:' + JSON.stringify(formData));
			if (this.password != this.re_password) {
				uni.showToast({ title: '两次密码不一致!', icon: 'none' });
				return;
			}
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.onCalc();
				// uni.showToast({title:"验证通过!", icon:"none"});
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		}
	}
};
</script>

<style>
.page {
	height: auto;
	min-height: 100%;
}

.uni-card {
	box-shadow: none;
}

.uni-list:after {
	height: 0;
}

.uni-list:before {
	height: 0;
}

.wh {
	width: 85px;
	height: 50px;
}

.bd {
	background-color: #000000;
}

.db {
	background: none;
	border: none;
}

.ackt {
	width: 800 upx;
	height: 700 upx;
}
</style>
