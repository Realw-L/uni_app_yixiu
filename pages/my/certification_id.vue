<template>
	<view class="page">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-card">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate">
							姓名：
							<input
								name="name"
								:value="name"
								@input="onInputCompany"
								confirm-type="search"
								class="input"
								type="text"
								placeholder="请输入个人姓名"
								maxlength="25"
								style="width: 500upx;"
							/>
						</view>
					</view>
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate">
							身份证号：
							<input
								name="identity_no"
								:value="identity_no"
								@input="onInputCompanyLicenseNo"
								confirm-type="search"
								class="input"
								type="text"
								placeholder="请输入身份证号码"
								maxlength="18"
								style="width: 500upx;"
							/>
						</view>
					</view>
					<view class="grace-idcard-text">身份证上传</view>
					<view class="grace-idcard-items">
						<view class="grace-idcard-uper-btn" @tap="chooseImage(0)">
							<view class="img"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" :src="image1" @tap="showImgs(0)"  mode="widthFix" /></view>
							<view class="text">正面照片</view>
							<view class="text" style="color: #AAAAAA;">文字清晰，四角齐全</view>
						</view>
						<view class="grace-idcard-uper-btn" @tap="chooseImage(1)">
							<view class="img"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" :src="image2" @tap="showImgs(1)"  mode="widthFix" /></view>
							<view class="text">背面照片</view>
							<view class="text" style="color: #AAAAAA;">文字清晰，四角齐全</view>
						</view>
					</view>
						<view class="grace-idcard-uper-btn" @tap="chooseImage(2)">
							<view class="img"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" :src="image3" @tap="showImgs(2)" mode="widthFix" /></view>
							<view class="text">手持身份证照片</view>
							<view class="text" style="color: #AAAAAA;">文字清晰，四角齐全</view>
						</view>
					<view style="display: flex; flex-direction: row; margin-top: 20upx;">
						<image src="../../static/111.png" mode="" style="width: 50upx; height: 50upx;"></image>
						<text style="color: #AAAAAA;">格式为JPG/PNG/GIF，大小不得超过3M</text>
					</view>
				</view>
			</view>
			<view style="display: flex; justify-content: center; margin-top: 20upx; margin-bottom: 10upx;">
				<button type="primary" form-type="submit" style="width: 700upx;  background-color: #6cb231;">保存</button>
			</view>
		</form>
	</view>
</template>

<script>
import uniBadge from '@/components/uni-badge.vue';
import util from '@/common/util';
var graceChecker = require('../../common/graceChecker.js');
var _self;
export default {
	data() {
		return {
			HOST: this.$util.HOST,
			title: 'uploadFile',
			imageList: ['', '', ''],
			image1: '',
			image2: '',
			image3: '',
			idCard1: '{{HOST}}/Public/app/idcard1.png',
			idCard2: '{{HOST}}/Public/app/idcard2.png',
			idCard3: '{{HOST}}/Public/app/sc.jpg',
			image1: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
			image2: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
			image3: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png',
			ids: ['', '', ''],
			index: 0,
			name: '',
			identity_no: ''
		};
	},
	onLoad() {
		_self = this;
		this.loadData();
	},
	onUnload() {
		// this.imageList = '';
	},
	components: {
		uniBadge
	},
	onBackPress() {},
	onNavigationBarButtonTap(e) {
		console.debug('onNavigationBarButtonTap:' + JSON.stringify(e));
		// uni.showToast({
		//   title: 'test',
		// })
		//

		var formData = {
			name: this.name,
			identity_no: this.identity_no,
			ids: this.ids.join(',')
		};

		this.formSubmit({ detail: { value: formData } });
	},
	methods: {
		removeImg: function(ind) {
			// _self.imageList[ind] = '';
			if (ind == 1) {
				_self.image1 = '';
				_self.ids[0] = '';
			} else if (ind == 2) {
				_self.image2 = '';
				_self.ids[1] = '';
			} else if (ind == 3) {
				_self.image3 = '';
				_self.ids[2] = '';
			}
		},
		showImgs: function(e) {
			uni.previewImage({
				urls: this.imageList
			});
		},
		onInputCompany(e) {
			this.name = e.detail.value;
		},
		onInputCompanyLicenseNo(e) {
			this.identity_no = e.detail.value;
		},

		onSave(formdata) {
			console.info('save formdata:' + JSON.stringify(formdata));
			var self = this;
			//singin auto reg
			util.POST(
				// 'user/companyLicense',
				'user/identitys',
				formdata,
				function(data) {
					console.info('handle:' + JSON.stringify(data));
					if (data.status == 1) {
						uni.showToast({ title: data.content, icon: 'none' });
					} else {
						uni.showToast({ title: data.message, icon: 'none' });
					}
				}
			);
		},

		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'name',
					checkType: 'string',
					checkRule: '2,5',
					errorMsg: '姓名应为2-5个字符'
				},
				{
					name: 'identity_no',
					checkType: 'string',
					checkRule: '17,18',
					errorMsg: '身份证应为18个字符'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug('formData:' + JSON.stringify(formData));

			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				formData.ids = this.ids.join(',');

				this.onSave(formData);

				// uni.showToast({title:"验证通过!", icon:"none"});
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		},

		loadData() {
			var self = this;
			//singin auto reg
			util.GET('user/getIdentity', {}, function(indata) {
				console.info('handle:' + JSON.stringify(indata));
				if (indata.status == 1) {
					// uni.showToast({title: data.content, icon: 'none'})
					var data = indata.content;

					self.name = data.name;
					self.identity_no = data.identity_no;
					if (data.ids) {
						self.ids = data.ids.split(',');
					}

					self.imageList = [];
					for (var i = 0; i < data.images.length; i++) {
						self.imageList.push(util.IMAGE_URI + data.images[i]);
						switch (i) {
							case 0:
								if (data.images[i]) self.image1 = util.IMAGE_URI + data.images[i];

								break;
							case 1:
								if (data.images[i]) self.image2 = util.IMAGE_URI + data.images[i];
								break;
							case 2:
								if (data.images[i]) self.image3 = util.IMAGE_URI + data.images[i];
								break;
						}
					}
					console.debug('images:' + JSON.stringify(data.images));
					console.debug('imageList:' + JSON.stringify(self.imageList));
					console.debug('images1:' + self.image1);
					console.debug('images2:' + self.image2);
					console.debug('images3:' + self.image3);
				} else {
					uni.showToast({ title: data.message, icon: 'none' });
				}
			});
		},

		chooseImage: function(index) {
			var self = this;
			uni.showLoading({});
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album'],
				success: res => {
					console.log('chooseImage success, temp path is', res.tempFilePaths[0]);
					var imageSrc = res.tempFilePaths[0];

					wx.uploadFile({
						url: util.API_URI + 'sys/upload',
						filePath: imageSrc,
						name: 'data',
						success: res => {
							console.log('uploadImage success, res is:', res);
							uni.showToast({
								title: '上传成功',
								icon: 'success',
								duration: 1000
							});
							// this.imageList = imageSrc

							// var obj = eval('(' + res.data + ')')
							var obj = JSON.parse(res.data);
							self.index = index;
							self.imageList[index] = util.IMAGE_URI + obj.url;

							switch (index) {
								case 0:
									self.image1 = util.IMAGE_URI + obj.url;
									break;
								case 1:
									self.image2 = util.IMAGE_URI + obj.url;
									break;
								case 2:
									self.image3 = util.IMAGE_URI + obj.url;
									break;
							}

							self.ids[index] = obj.id;

							console.debug(' images:' + self.imageList);
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
		},

		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		}
	}
};
</script>

<style>
view {
	font-size: 28upx;
}
.grace-idcard-main {
	margin: 20upx 30upx;
}
.grace-idcard-desc {
	line-height: 2em;
	background: #ffffff;
	padding: 20upx;
	border-radius: 10upx;
}
.grace-idcard-text {
	line-height: 2em;
	margin-top: 30upx;
}
.grace-idcard-items {
	background: #ffffff;
	padding: 30upx 0;
	display: flex;
	margin: 30upx 0;
	border-radius: 10upx;
	align-items: flex-start;
}
.grace-idcard-uper-btn {
	width: 276upx;
	margin: 0 60upx;
	background: #f1f1f1;
	padding-bottom: 10upx;
	border-radius: 10upx;
	text-align: center;
}
.grace-idcard-uper-btn .img {
	width: 100upx;
	height: 100upx;
	margin: 0 auto;
	margin-top: 30upx;
}
.grace-idcard-uper-btn .img image {
	width: 100upx;
	height: 100upx;
}
.grace-idcard-uper-btn .text {
	width: 100%;
	margin-top: 10upx;
	text-align: center;
	line-height: 2em;
}
.grace-idcard-preview {
	width: 50%;
	margin: 0 30upx;
}
.grace-idcard-preview image {
	width: 100%;
}
</style>
