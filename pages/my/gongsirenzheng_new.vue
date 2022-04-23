<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
		<view class="grace-idcard-main">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view style="width: 100%; display:flex;flex-direction: row;justify-content: space-between; align-items: center;">
					<view>公司名称：</view>
					<input
						name="company"
						:value="company"
						@input="onInputCompany"
						confirm-type="search"
						class="input"
						type="text"
						placeholder="请输入公司名称"
						maxlength="25"
						style="width: 500upx;"
					/>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view style="width: 100%; display:flex;flex-direction: row;justify-content: space-between; align-items: center;">
					<view>公司统一信用编码：</view>
					<input
						name="company_license_no"
						:value="company_license_no"
						@input="onInputCompanyLicenseNo"
						confirm-type="search"
						class="input"
						type="text"
						placeholder="请输入公司统一信用编码"
						maxlength="18"
						style="width: 400upx;"
					/>
				</view>
			</view>
			<view class="uni-list-cell-navigate">法人身份证上传</view>
			<view class="grace-idcard-text">身份证照片 ( 正面 )</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="chooseImage(0)">
					<view class="img"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview"><image :src="image1" @tap="showImgs(0)" mode="widthFix"></image></view>
			</view>
			<view class="grace-idcard-text">身份证照片 ( 背面 )</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="chooseImage(1)">
					<view class="img"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview"><image :src="image2" @tap="showImgs(1)" mode="widthFix" /></view>
			</view>

			<view class="grace-idcard-text">营业执照</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="chooseImage(2)">
					<view class="img"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview"><image :src="image3" @tap="showImgs(2)" mode="widthFix" /></view>
			</view>

			<view class="grace-idcard-text">资质证书</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="chooseImage(3)">
					<view class="img"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview"><image :src="image4" @tap="showImgs(3)" mode="widthFix" /></view>
			</view>

			<view class="grace-idcard-text">安全生产许可证</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="chooseImage(4)">
					<view class="img"><image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" /></view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview"><image :src="image5" @tap="showImgs(4)" mode="widthFix" /></view>
			</view>
			<view style="margin-top:38upx;"><button type="primary" form-type="submit" style="background-color: #6bd131;">上传</button></view>
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
	components: {
		uniBadge
	},
	data() {
		return {
			HOST: this.$util.HOST,
			idCard1: '{{HOST}}/Public/app/idcard1.png',
			idCard2: '{{HOST}}/Public/app/idcard2.png',
			idCard3: '{{HOST}}/Public/app/yy.png',
			idCard4: '{{HOST}}/Public/app/zz.png',
			idCard5: '{{HOST}}/Public/app/a.png',

			imageList: ['', '', '', '', ''],
			image1: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/idcard1.png',
			image2: 'https://staticimgs.oss-cn-beijing.aliyuncs.com/idcard2.png',
			image3: '{{HOST}}/Public/app/yy.png',
			image4: '{{HOST}}/Public/app/zz.png',
			image5: '{{HOST}}/Public/app/a.png',
			ids: ['', '', '', '', ''],
			index: 0,
			company: '',
			company_license_no: ''
		};
	},
	onLoad: function() {
		_self = this;
		this.loadData();
	},
	onNavigationBarButtonTap(e) {
		console.debug('onNavigationBarButtonTap:' + JSON.stringify(e));
		// uni.showToast({
		//   title: 'test',
		// })
		//

		var formData = {
			company: this.company,
			company_license_no: this.company_license_no,
			ids: this.ids.join(',')
		};

		this.formSubmit({
			detail: {
				value: formData
			}
		});
	},
	methods: {
		onInputCompany(e) {
			this.company = e.detail.value;
		},
		onInputCompanyLicenseNo(e) {
			this.company_license_no = e.detail.value;
		},

		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'company',
					checkType: 'string',
					checkRule: '2,60',
					errorMsg: '公司名应为2-60个字符'
				},
				{
					name: 'company_license_no',
					checkType: 'string',
					checkRule: '10,18',
					errorMsg: '公司统一社会信用编码为18个字符'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug('formData:' + JSON.stringify(formData));
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.onSave(formData);

				// uni.showToast({title:"验证通过!", icon:"none"});
			} else {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		},

		onSave(formdata) {
			console.info('save formdata:' + JSON.stringify(formdata));
			var self = this;
			//singin auto reg
			util.POST('user/companyLicense', formdata, function(data) {
				console.info('handle:' + JSON.stringify(data));
				if (data.status == 1) {
					
					uni.showToast({
						title: data.content,
						icon: 'none'
					});
					
					
					setTimeout(function(){
							uni.navigateBack();
						
					},2000)
					
					
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					});
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

							// var obj = eval('(' + res.data + ')');
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
								case 3:
									self.image4 = util.IMAGE_URI + obj.url;
									break;
								case 4:
									self.image5 = util.IMAGE_URI + obj.url;
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
		},

		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'company',
					checkType: 'string',
					checkRule: '2,60',
					errorMsg: '公司名应为2-60个字符'
				},
				{
					name: 'company_license_no',
					checkType: 'string',
					checkRule: '10,18',
					errorMsg: '公司统一社会信用编码为18个字符'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug('formData:' + JSON.stringify(formData));
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.onSave(formData);

				// uni.showToast({title:"验证通过!", icon:"none"});
			} else {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		},

		loadData() {
			var self = this;
			//singin auto reg
			util.GET('user/getCompanyLicense', {}, function(indata) {
				console.info('handle:' + JSON.stringify(indata));
				if (indata.status == 1) {
					// uni.showToast({title: data.content, icon: 'none'})
					var data = indata.content;

					self.company = data.company;
					self.company_license_no = data.company_license_no;
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
							case 3:
								if (data.images[i]) self.image4 = util.IMAGE_URI + data.images[i];
								break;

							case 4:
								if (data.images[i]) self.image5 = util.IMAGE_URI + data.images[i];
								break;
						}
					}
					console.debug('images:' + JSON.stringify(data.images));
					console.debug('imageList:' + JSON.stringify(self.imageList));
					console.debug('images1:' + self.image1);
					console.debug('images2:' + self.image2);
					console.debug('images3:' + self.image3);
					console.debug('images4:' + self.image4);
					console.debug('images5:' + self.image5);
				} else {
					uni.showToast({
						title: data.message,
						icon: 'none'
					});
				}
			});
		},

		showImgs: function(index) {
			uni.previewImage({
				current: index,
				urls: this.imageList
			});
		},

		selectImg1: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					_self.idCard1 = res.tempFilePaths[0];
				}
			});
		},
		selectImg2: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					_self.idCard2 = res.tempFilePaths[0];
				}
			});
		},
		selectImg3: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					_self.idCard3 = res.tempFilePaths[0];
				}
			});
		},
		selectImg4: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					_self.idCard4 = res.tempFilePaths[0];
				}
			});
		},
		selectImg5: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					_self.idCard5 = res.tempFilePaths[0];
				}
			});
		},
		previewImg1: function() {
			uni.previewImage({
				urls: [_self.idCard1]
			});
		},
		previewImg2: function() {
			uni.previewImage({
				urls: [_self.idCard2]
			});
		},
		previewImg3: function() {
			uni.previewImage({
				urls: [_self.idCard3]
			});
		},
		previewImg4: function() {
			uni.previewImage({
				urls: [_self.idCard4]
			});
		},
		previewImg5: function() {
			uni.previewImage({
				urls: [_self.idCard5]
			});
		},
		uploadCards: function() {
			if (this.idCard1 == 'https://staticimgs.oss-cn-beijing.aliyuncs.com/idcard1.png' || this.idCard2 == 'https://staticimgs.oss-cn-beijing.aliyuncs.com/idcard2.png') {
				uni.showToast({ title: '请选择身份证照片', icon: 'none' });
				return;
			}
			// 因底层限制一次上传一个
			uni.showLoading({ title: '上传中' });
			// 上传正面
			var uploadTask1 = uni.uploadFile({
				url: 'https://unidemo.dcloud.net.cn/upload',
				filePath: _self.idCard1,
				fileType: 'image',
				name: 'data',
				success: function(uploadFileRes) {
					// 上传成功后返回服务器端保存的路径
					console.log(uploadFileRes.data);
					// 上传背面
					var uploadTask2 = uni.uploadFile({
						url: 'https://unidemo.dcloud.net.cn/upload',
						filePath: _self.idCard2,
						fileType: 'image',
						name: 'data',
						success: function(uploadFileRes) {
							// 上传成功后返回服务器端保存的路径
							console.log(uploadFileRes.data);
							// 至此2张照片上传完毕
							uni.hideLoading();
						}
					});
				}
			});
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
