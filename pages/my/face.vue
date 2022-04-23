<template>
	<view>
		<view>
			<view class="uni-list" style=" margin-left: -10upx;">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="chooseImage">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge" style="width: 100upx;">
						头像
						<image :src="avatar" style="width: 60upx; height: 60upx;"></image>
					</view>
				</view>			
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate  uni-navigate-badge" style="width: 150upx;">
						<text style="width: 250upx;">用户名</text>
						<input
							type="text"
							name="username"
							:value="user.username"
							@input="onInputUsername"
							placeholder="请输入您的用户名称"
							style="text-align: right;"
							maxlength="12"
						/>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate  uni-navigate-badge" style="width: 290upx;">
						<text style="350upx">手机号码</text>
						<input type="text" name="mobile" :value="user.mobile" disabled="true" placeholder="请输入您的联系手机" style="text-align: right;" maxlength="12" />
					</view>
				</view>
				
				<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" v-if="actor==0">
					<picker
						mode="date"
						:value="date"
						name="birthday"
						:start="startDate"
						:end="endDate"
						@change="bindDateChange"
						style="height:50upx; width: 100%;"
					>
						<view  style="width: 100%; display:flex;flex-direction: row;justify-content: space-between; align-items: center;" >
							<view>生日</view>
							<view style="margin-right: 18upx; ">{{ user.birthday }}</view>
						</view>
					</picker>
				</view>
				<view style="height: 1px; width: 100%; background-color:#DDDDDD;"></view>
				<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge" hover-class="uni-list-cell-hover">
					<picker @change="bindGenderPickerChange" :value="index" :range="gender" style="height:50upx; width: 100%;">
						<view style="width: 100%; display:flex;flex-direction: row;justify-content: space-between; align-items: center;">
						<view>性别</view>
							<view style="margin-right: 12upx;">{{ gender[user.gender] }}</view>
						</view>
					</picker>
				</view>
					<view style="height: 1px; width: 100%; background-color:#DDDDDD;"></view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
						<view class="uni-list-cell-navigate uni-navigate-right" @click="cityPicker1">
							<view>地区</view>
							<text style="margin-right: 10px;">{{cityText1}}</text>
						</view>
					</view>
				<view style="height: 1px; width: 100%; background-color:#DDDDDD;"></view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goDetailPage('my/pwd/set_pay_pwd')">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						设置支付密码
						<text>{{ user.assigned_pay_password ? '已设置' : '未设置' }}</text>
					</view>
				</view>
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="actor==1">
							<view class="uni-list-cell-navigate uni-navigate-right" @tap="goDetailPage('my/zhuanyejineng')" >
								<view>工种选择</view>
								<text style="margin-right: 10px;"></text>
							</view>
						</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1" @onCancel="onCancel1" @onConfirm="onConfirm1"></mpvue-city-picker>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goDetailPage('my/certification_id')">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						实名认证
						<text>{{ user.identity_status ? '已认证' : '未认证' }}</text>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goDetailPage('my/certification_mail')" v-if="actor==0">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						邮箱认证
						<text>未绑定</text>
					</view>
				</view>
				
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goDetailPage('my/certification_wechat')" v-if="actor==0">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						微信绑定
						<text>{{ user.wechat_id ? '已绑定' : '未绑定' }}</text>
					</view>
				</view>
				
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goDetailPage('my/certification_alipay')" v-if="actor==0">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						支付宝绑定
						<text>{{ user.alipay_id ? '已绑定' : '未绑定' }}</text>
					</view>
				</view>
				<view style="height: 1px; width: 100%; background-color:#BBBBBB;"></view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="actor==1">
						<view class="uni-list-cell-navigate">
							<view>最近案例上传</view>	</view>
							
					</view>
					<view style="display: flex; flex-direction: row; justify-content: center;" v-if="actor==1">
					<view class="grace-body">
						<graceSelectImg :maxFileNumber="9" @change="imgsChange"></graceSelectImg>
					</view>
					<view class="grace-body" >
						<graceSelectImg :maxFileNumber="9" @change="imgsChange1"></graceSelectImg>
					</view>
					</view>
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-if="actor==1">
						<view class="uni-triplex-row" style="display: flex; flex-direction: column;">
							<view class="uni-triplex-left" style="display: flex; flex-direction: row;">
								<text style="display: flex; flex-direction: row;">案例描述</text>						
							</view>
						</view>							
					</view>	
					<view class="uni-textarea" v-if="actor==1">
						<textarea placeholder="详细案例描述" style="width: 90%; color: #000000; height: 150px;"/>
					</view>
			</view>
		</view>
		<view style="display: flex; justify-content: center; margin-top: 20upx; margin-bottom: 10upx;">
			<button type="primary" form-type="submit" style="width: 700upx;  background-color: #6cb231;" @click="onUpdateUserInfo">
				保存
			</button>
		</view>
	</view>
</template>

<script>
	import graceSelectImg from "../../graceUI/components/graceSelectImg.vue"
	//图片上传
	import mpvuePicker from '../../threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../threeComponents/mpvueCityPicker.vue';
import uniStatusBar from '@/components/uni-status-bar.vue';
import uniIcon from '@/components/uni-icon.vue';
import uniBadge from '@/components/uni-badge.vue';
import util from '@/common/util';
import uniNavBar from '@/components/uni-nav-bar.vue';

var self = null;
export default {
	components: {
		uniStatusBar,
		uniIcon,
		uniBadge,
		uniNavBar,
				mpvuePicker,
		mpvueCityPicker,
		graceSelectImg
	},
	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			themeColor: '#007AFF', //颜色
			cityText1 : "点击选择", //文本
			cityPickerValueDefault1 : [0,0,1], //默认选项
			city1 : null,
			gender: ['男', '女'],
			sel_gender_index: 0,
			index: 0,
			date: currentDate,
			birthday: '',
			index_sex: '',
			yesrs: ['1-3年', '3-5年', '5-10年', '10年以上'],
			sel_years_index: 0,
			sel_year: '',

			user: {},
			title: '用户信息',
			avatar_id: 0,
			avatar: '',
			actor: [0,1],
			pay_password: ''
		};
	},
	onLoad() {
		self = this;
	},
	onReady() {
		//check storage
		this.actor = uni.getStorageSync('actor_type');
		this.user = uni.getStorageSync('user_info');
		if (this.user) {
			this.cityText1 = this.user.service_area;
			this.sel_years_index = this.user.work_years;
			this.sel_gender_index = this.user.gender;
			this.avatar = util.IMAGE_URI + this.user.avatar;
		} else {
		}
	},
	onUnload() {
		this.imageSrc = '';
	},

	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	onBackPress() {},
	onNavigationBarButtonTap(e) {
		console.debug('onNavigationBarButtonTap:' + JSON.stringify(e));
		uni.showToast({
			title: 'test'
		});
	},
	
	methods: {
		imgsChange : function (imgs){
					console.log(imgs);
				},
				imgsChange1 : function (imgs){
							console.log(imgs);
						},
				cityPicker1 : function(){
			this.$refs.mpvueCityPicker1.show();
		},
		onConfirm1(e) {
			var cityText1  = e.label;
			var cityValue1 = e.value;
			var cityCode1  = e.cityCode;
			console.log(cityText1, cityValue1, cityCode1);
			this.cityText1 = cityText1;
			this.cityPickerValueDefault1 = cityValue1;
			this.city1 = e;
		},
		onSetPayPassword(e) {
			this.pay_password = '';
		},
		onInputUsername(e) {
			this.user.username = e.detail.value;
		},
		onInputNickname(e) {
			this.user.nickname = e.detail.value;
		},

		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		bindGenderPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.index = e.target.value;
			this.index_sex = e.target.value;
			this.user.gender = e.target.value;
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
			this.birthday = e.target.value;
			this.user.birthday = e.target.value;
		},
		bindWorkYearsChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value);
			this.sel_years_index = e.target.value;
			this.sex_time = e.target.value;
			this.user.work_years = e.target.value;
		},
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
		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		},
		onUpdateUserInfo() {
			var self = this;

			var pay_pwd = uni.getStorageSync('pay_password');

			var dataForm = {
				username: this.user.username,
				nickname: this.user.nickname,
				gender: this.sel_gender_index,
				work_years: this.sel_years_index,
				birthday: this.user.birthday,
				service_area:this.cityText1,
			};
			if (!util.isNull(pay_pwd)) {
				dataForm.pay_password = pay_pwd;
			}

			if (this.avatar_id > 0) {
				dataForm.avatar = this.avatar_id;
			}

			//update

			console.debug('data form：' + JSON.stringify(dataForm));

			util.POST('user/update', dataForm, function(data) {
				if (data.status == 1) {
					console.debug(JSON.stringify(data));

					uni.showToast({
						title: '资料更新成功',
						icon: 'success',
						duration: 1000
					});

					//update local user info
					self.loadUserDetail();
				}
			});
		},
		loadUserDetail() {
			let user_id = uni.getStorageSync('user_id');
			util.GET('user/detail', { id: user_id }, function(data) {
				if (data.status == 1) {
					uni.setStorageSync('user_info', data);
					self.user = data;
				}
			});
		},
		chooseImage: function() {
			var self = this;

			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: res => {
					uni.showLoading({});
					console.log('chooseImage success, temp path is', res.tempFilePaths[0]);
					var imageSrc = res.tempFilePaths[0];
					wx.uploadFile({
						url: util.API_URI + '/sys/upload',
						filePath: imageSrc,
						name: 'data',
						success: res => {
							console.log('uploadImage success, res is:', res);
							//res is
							// var obj = JSON.parse(res)
							// res.data is string
							// var obj = eval('(' + res.data + ')');
var obj = JSON.parse(res.data);
							console.debug('parse obj is:' + JSON.stringify(obj));

							this.imageSrc = imageSrc;

							self.avatar_id = obj.id;
							self.avatar = util.IMAGE_URI + obj.path;
							self.user.avatar = obj.path;
							// self.user.avatar = obj.path;
							console.debug('new image path:' + self.user.avatar);
							uni.showToast({
								title: '上传成功',
								icon: 'success',
								duration: 1000
							});
						},
						fail: err => {
							console.log('uploadImage fail', err);
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							});
							uni.hideLoading();
						},
						complete: () => {
							console.log('complate');
						}
					});
				},
				fail: err => {
					console.log('chooseImage fail', err);
					uni.hideLoading();
				}
			});
		}
	}
};
</script>

<style></style>
