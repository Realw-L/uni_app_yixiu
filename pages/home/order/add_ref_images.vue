<template>
	<view>
		<view class="grace-bg-white grace-common-border grace-common-mt">
			<view style="margin-left: 40upx;">施工参考图</view>
			<view class="grace-add-file">
				<view class="garce-items" v-for="(item, index) in imageList" :key="index">
					<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs"></image>
					<view class="grace-close" @tap="removeImg" :id="'grace-items-img-'+index"></view>
				</view>
				<view class="grace-add-btn" @tap="addImg" v-if="btnImg">
					<view>+</view>
					<view>添加施工图</view>
				</view>
			</view>
		</view>
		<view  class="grace-bg-white grace-common-border grace-common-mt">
			<view style="margin-left: 40upx;">品牌验收单</view>
			<view class="grace-add-file">
				<view class="garce-items" v-for="(item, index2) in imageVerifyList" :key="index2">
					<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs2"></image>
					<view class="grace-close" @tap="removeImg2" :id="'grace-items-img-'+index2"></view>
				</view>
				<view class="grace-add-btn" @tap="addImg2" v-if="btnImg2">
					<view>+</view>
					<view>添加验收单</view>
				</view>
			</view>
		</view>
		<button type="primary" @tap="onSave" style="background-color: #6cb231; margin-left: 20px;margin-right: 20px;">保存</button>
	</view>

</template>
<script>
	import util from '../../../common/util.js'
	var maxNum = 9,
		_self;
	var maxNum2 = 9,
		_self;
	export default {
		data() {
			return {
				btnImg: true,
				btnImg2: true,
				imageList: [],
				imageIDList: [],
				imageVerifyList: [],
				imageVerifyIDList: [],
			};
		},
		onLoad: function(option) {
			_self = this;

			if (option) {
				var self = this;

				if (!util.isNull(option.work_refer)) {
					this.imageIDList = option.work_refer.split(',');

					util.GET('sys/images?ids=' + option.work_refer, {}, function(data) {
						console.info(data);
						if (data.status == 1) {
							_self.imageList = [];
							for (var i in data.content) {
								_self.imageList.push(util.IMAGE_URI + data.content[i]);
							}
						} else {}
					});
				}

				if (!util.isNull(option.work_verify)) {
					this.imageVerifyIDList = option.work_verify.split(',');
					util.GET('sys/images?ids=' + option.work_verify, {}, function(data) {
						console.info(JSON.stringify(data));
						if (data.status == 1) {
							_self.imageVerifyList = [];
							for (var i in data.content) {
								_self.imageVerifyList.push(util.IMAGE_URI + data.content[i]);
							}
						} else {}
					});
				}
			}
		},
		onUnload() {
			this.imageList = [];
			this.imageIDList = [];
		},

		onBackPress() {
			console.debug('onBackPress' + this.imageIDList.join(','));
			//save in storage
			if (this.imageIDList) {
				uni.setStorageSync('work_refer', this.imageIDList.join(','));
			}
			if (this.imageVerifyIDList) {
				uni.setStorageSync('work_verify', this.imageVerifyIDList.join(','));
			}
		},
		onNavigationBarButtonTap(e) {
			console.debug('onNavigationBarButtonTap:' + JSON.stringify(e));

			//save in storage
			uni.setStorageSync('work_refer', this.imageIDList.join(','));
			uni.setStorageSync('work_verify', this.imageVerifyIDList.join(','));

			// and back()
			uni.navigateBack({
				delta: 1
			});
		},
		methods: {
			onSave(){
				//save in storage
				uni.setStorageSync('work_refer', this.imageIDList.join(','));
				uni.setStorageSync('work_verify', this.imageVerifyIDList.join(','));
				
				// and back()
				uni.navigateBack({
					delta: 1
				});
			},
			addImg: function() {
				var num = maxNum - _self.imageList.length;
				if (num < 1) {
					return false;
				}

				uni.chooseImage({
					count: num,
					sizeType: ['compressed'],
					success: function(res) {

						console.debug('sel pic:' + JSON.stringify(res.tempFilePaths))
						uni.showLoading({
							title: '上传中...'
						});

						for (var i = 0; i < res.tempFilePaths.length; i++) {
							var imagePath = res.tempFilePaths[i]


							wx.uploadFile({
								url: util.API_URI + '/sys/upload',
								filePath: imagePath,
								name: 'data',
								success: res => {
									console.log('uploadImage success, res is:' + JSON.stringify(res));
									//res is
									// var obj = JSON.parse(res)
									// res.data is string
									// var obj = eval('(' + res.data + ')');
									var obj = JSON.parse(res.data);
									console.debug('parse obj is:' + JSON.stringify(obj));
									if (obj.success == 1) {
										_self.imageIDList.push(obj.id);

										// _self.imageList.push(imagePath);
										_self.imageList.push(util.IMAGE_URI + obj.url);

										if (_self.imageList.length >= maxNum) {
											_self.btnImg = false;
										}

										console.debug('iamgeList:' + JSON.stringify(_self.imageList))
										uni.showToast({
											title: '上传成功',
											icon: 'none',
											duration: 1000
										});
									} else {
										uni.showToast({
											title: obj.message,
											icon: 'none',
											duration: 1000
										});
									}

									uni.hideLoading();
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
									//check  use count

									if (_self.imageList.length == _self.imageList.length) {
										console.debug('all complate');
									}
									uni.hideLoading();
								}
							});
							//end upload
						} //end for
					}//end choose
				});
			},

			removeImg: function(e) {
				var index = e.currentTarget.id.replace('grace-items-img-', '');
				_self.imageList.splice(index, 1);
				_self.imageIDList.splice(index, 1);
				_self.imageList = _self.imageList;
				if (_self.imageList.length < maxNum) {
					_self.btnImg = true;
				}
			},
			showImgs: function(e) {
				var currentImg = e.currentTarget.dataset.imgurl;
				uni.previewImage({
					urls: this.imageList,
					current: currentImg
				});
			},

			addImg2: function() {
				var num = maxNum2 - _self.imageVerifyList.length;
				if (num < 1) {
					return false;
				}

				uni.chooseImage({
					count: num,
					sizeType: ['compressed'],
					success: function(res) {
						uni.showLoading({
							title: '上传中...'
						});

						for (var i = 0; i < res.tempFilePaths.length; i++) {
							var imagePath = res.tempFilePaths[i]


							uni.uploadFile({
								url: util.API_URI + '/sys/upload',
								filePath: imagePath,
								name: 'data',
								success: res => {
									console.log('uploadImage success, res is:', res);
									//res is
									// var obj = JSON.parse(res)
									// res.data is string
									// var obj = eval('(' + res.data + ')');
									var obj = JSON.parse(res.data);
									console.debug('parse obj is:', obj);
									_self.imageVerifyIDList.push(obj.id);

									uni.showToast({
										title: '上传成功',
										icon: 'success',
										duration: 1000
									});

									// _self.imageVerifyList = _self.imageVerifyList.concat(res.tempFilePaths);
									_self.imageVerifyList.push(util.IMAGE_URI + obj.url);
									// _self.imageVerifyList.push(imagePath);

									if (_self.imageVerifyList.length >= maxNum2) {
										_self.btnImg2 = false;
									}
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
									//check  use count

									if (_self.imageVerifyList.length == _self.imageVerifyIDList.length) {
										console.debug('all complate');
									}
									uni.hideLoading();
								}
							});
							//end upload
						} //end for
					}
				});
			},

			removeImg2: function(e) {
				var index = e.currentTarget.id.replace('grace-items-img-', '');
				_self.imageVerifyList.splice(index, 1);
				_self.imageVerifyIDList.splice(index, 1);
				_self.imageVerifyList = _self.imageVerifyList;
				if (_self.imageVerifyList.length < maxNum2) {
					_self.btnImg2 = true;
				}
			},
			showImgs2: function(e) {
				var currentImg2 = e.currentTarget.dataset.imgurl;
				uni.previewImage({
					urls: this.imageVerifyList,
					current: currentImg2
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
</style>
