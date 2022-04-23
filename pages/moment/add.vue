<template>
	<view class="page">
		<view class="feedback-title"><text>发布动态</text></view>
		<view class="feedback-body"><textarea placeholder="请填写您最新动态..." v-model="sendDate.content" class="feedback-textare" maxlength="140" /></view>
		<view class="feedback-title"><text>图片(选填,提供截图,总大小10M以下)</text></view>
		<view class="feedback-body feedback-uploader">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">点击预览图片</view>
					<view class="uni-uploader-info">{{ imageList.length }}/8</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image, index) in imageList" :key="index">
							<view class="uni-uploader__file" style="position: relative;">
								<image class="uni-uploader__img" :src="image" @tap="previewImage"></image>
								<view class="close-view" @click="close(index)">x</view>
							</view>
						</block>
						<view class="uni-uploader__input-box" v-show="imageList.length < 6"><view class="uni-uploader__input" @tap="chooseImg"></view></view>
					</view>
				</view>
			</view>
		</view>
		<button type="primary" class="feedback-submit" @tap="send">发布</button>
	</view>
</template>

<script>
import util from '@/common/util.js';
let _self = null;

export default {
	data() {
		return {
			stars: [1, 2, 3, 4, 5],
			imageList: [],
			sendDate: {
				score: 0,
				content: '',
				images: ''
			},
			ids: []
		};
	},
	onShow() {
		// /* 隐藏凸起图标 */
		// var icon = plus.nativeObj.View.getViewById("icon");
		// setTimeout(function() {
		// 	icon.hide();
		// }, 100);
	},
	onLoad() {
		_self = this;

		let deviceInfo = {
			appid: 'com.ffhapp.yixiou',
			imei: '', //设备标识
			p: 'a', //平台类型，i表示iOS平台，a表示Android平台。
			md: '', //设备型号
			app_version: '',
			plus_version: '', //基座版本号
			os: '',
			net: ''
		};

		// #ifdef APP-PLUS

		deviceInfo = {
			appid: plus.runtime.appid,
			imei: plus.device.imei, //设备标识
			p: plus.os.name === 'Android' ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os: plus.os.version,
			net: '' + plus.networkinfo.getCurrentType()
		};
		// #endif

		this.sendDate = Object.assign(deviceInfo, this.sendDate);
	},
	onNavigationBarButtonTap(e) {
		this.addMoment();
	},
	methods: {
		addMoment() {
			var reqData = {
				content: _self.sendDate.content,
				images: _self.ids.join(','),
				location: uni.getStorageSync('local_gps')
			};

			util.POST('moment/add', reqData, function(data) {
				console.info('handle:' + JSON.stringify(data));
				if (data.status == 1) {
					uni.showToast({
						title: '发布成功',
						icon: 'none'
					});

					uni.navigateBack({
						delta: 1
					});
				} else {
					uni.showToast({
						title: data.content,
						icon: 'none'
					});
				}
			});
		},

		showFiguredelete(index) {
			var that = this;

			//console.log(index)

			console.log(that.staffinfoForm.showFigure[index]);

			that.staffinfoForm.showFigure.splice(index, 1);
		},
		close(e) {
			this.imageList.splice(e, 1);
		},
		chooseImg() {
			// #ifdef MP-WEIXIN
			this.chooseImageForMiniapp();
			// #endif

			// #ifndef MP-WEIXIN

			//选择图片
			uni.chooseImage({
				sourceType: ['camera', 'album'],
				sizeType: ['compressed'],
				count: 8 - this.imageList.length,
				// count: 1,
				success: res => {
					// this.imageList = this.imageList.concat(res.tempFilePaths);
					console.log(JSON.stringify(res));

					var images = [];
					for (var i = 0; i < res.tempFilePaths.length; i++) {
						images.push({ name: 'file' + i, uri: res.tempFilePaths[i] });
					}
					console.log(JSON.stringify(images));
					uni.uploadFile({
						url: util.API_URI + 'sys/uploads',
						files: images,
						filePath:res.tempFilePaths[0],
						
						// filePath:'': imageSrc,
						name: 'file',
						success: res => {
							console.log('uploadImage success, res is:' + JSON.stringify(res));
							uni.showToast({
								title: '上传成功',
								icon: 'success',
								duration: 1000
							});
							// this.imageList = imageSrc

							// var objs = eval('(' + res.data + ')');
							var objs = JSON.parse(res.data);
							console.log('objs:' + JSON.stringify(objs));
							for (var i = 0; i < objs.count; i++) {
								var obj = objs[i + ''];

								_self.imageList.push(util.IMAGE_URI + obj.url);

								_self.ids.push(obj.id);
							}
							console.debug(' images:' + JSON.stringify(_self.imageList));
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
				}
			});

			// #endif
		},
		chooseImageForMiniapp: function() {
			//只能单张上传
			//选择图片
			uni.chooseImage({
				sourceType: ['camera', 'album'],
				sizeType: ['compressed'],
				count: 8 - this.imageList.length,
				// count: 1,
				success: res => {
					// this.imageList = this.imageList.concat(res.tempFilePaths);
					console.log(JSON.stringify(res));

					for (var i = 0; i < res.tempFilePaths.length; i++) {
						
						wx.uploadFile({
							url: util.API_URI + 'sys/upload',
							// files: images,
							filePath: res.tempFilePaths[i],
							name: 'file',
							success: res => {
								console.log('uploadImage success, res is:' + JSON.stringify(res));
								// uni.showToast({
								// 	title: '上传成功',
								// 	icon: 'success',
								// 	duration: 1000
								// });
								// this.imageList = imageSrc

								// var objs = eval('(' + res.data + ')');
								var obj = JSON.parse(res.data);
								
								if (obj.success == 1) {
									_self.imageList.push(util.IMAGE_URI + obj.url);
									_self.ids.push(obj.id);
								}
								console.debug(' images:' + JSON.stringify(_self.imageList));
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
						}); //end upload
					}
				}
			});
		},
		chooseStar(e) {
			//点击评星
			this.sendDate.score = e;
		},
		previewImage() {
			//预览图片
			uni.previewImage({
				urls: this.imageList
			});
		},
		send() {
			//发送反馈

			_self.addMoment();
			return;

			console.log(JSON.stringify(this.sendDate));
			let imgs = this.imageList.map(value => {
				return {
					name: 'uni-app.feedback',
					uri: value
				};
			});
			uni.uploadFile({
				url: 'https://service.dcloud.net.cn/feedback',
				files: imgs,
				formData: this.sendDate,
				success: res => {
					if (res.statusCode === 200) {
						uni.showToast({
							title: '发布成功!'
						});
						this.imageList = [];
						this.sendDate = {
							score: 0,
							content: '',
							images: ''
						};
					}
				},
				fail: res => {
					console.log(res);
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
page {
	background-color: #efeff4;
}

.input-view {
	font-size: 28upx;
}
.close-view {
	text-align: center;
	line-height: 14px;
	height: 16px;
	width: 16px;
	border-radius: 50%;
	background: #ff5053;
	color: #ffffff;
	position: absolute;
	top: -6px;
	right: -4px;
	font-size: 12px;
}
</style>
