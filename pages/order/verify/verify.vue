<!-- 引用用户下单图， 新传图 -->
<template>
	<view>
		<view class="uni-list">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover">
								<view class="uni-triplex-row">
									<view class="uni-triplex-left">
										<text class="uni-title uni-ellipsis">订单号：12121  </text>
										<text class="uni-text">类目:标识广告<text>价格：</text><text style="color: red;">￥70</text></text>
										<text class="uni-text">下单时间: 2019-4-02 11：20：40</text>
										<text class="uni-text">施工日期：2019-4-02 11：20：40</text>
										<text class="uni-text-small uni-ellipsis">施工地址：腾讯大厦</text>
									</view>
									<view class="uni-triplex-right" style="width:120upx; center;display: flex;">
										<image src="../../../static/asd.png" mode="" style="width: 120upx; height: 120upx;"></image>
										<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">竞价</text>
										<text class="uni-h5" style="text-align: center; color: #ff0000; font-family:黑体; font-size: 25upx; margin-top: 15upx;">
											待服务
										</text>
									</view>
								</view>
							</view>
		</view>
		
		<view  class="grace-bg-white grace-common-border grace-common-mt">
			<view style="margin-left: 40upx;">施工参考图(左列是用户添加，右列是师傅完工后添加)</view>
			<view class="grace-add-file">
				<div style="display: flex; flex-direction: row; justify-content: space-around; width: 100%;">
					<div style="display: flex; flex-direction: column; ">
						<view class="garce-items" v-for="(item, index) in work_refer_images" :key="index">
							<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showWorkReferImgs"></image>
							<!-- <view class="grace-close" @tap="removeImg" :id="'grace-items-img-' + index"></view> -->
						</view>
					</div>
					<div style="display: flex; flex-direction: column;">
						<view class="garce-items" v-for="(item, index) in work_refer_images_finish" :key="index">
							<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs"></image>
							<view class="grace-close" @tap="removeImg" :id="'grace-items-img-' + index"  v-if="order.status==4"></view>
						</view>

						<view class="grace-add-btn" >
							<view class="grace-body" style="display: flex; text-align: right;">
								<graceSelectImg :maxFileNumber="9" @tap="addImg" v-if="btnImg"></graceSelectImg>
							</view>
						</view>
					</div>
				</div>
			</view>
		</view>
		<view class="grace-bg-white grace-common-border grace-common-mt">
			<view style="margin-left: 40upx;">品牌验收单</view>
			<view class="grace-add-file">
				<div style="display: flex; flex-direction: row;  justify-content: space-around; width: 100%;">
					<div style="display: flex; flex-direction: column;">
						<view class="garce-items" v-for="(item, index2) in work_verify_images" :key="index2">
							<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showWorkVerifyImgs"></image>
							<!-- <view class="grace-close" @tap="removeImg2" :id="'grace-items-img-' + index2"></view> -->
						</view>
					</div>
					<div style="display: flex; flex-direction: column;">
						<view class="garce-items" v-for="(item, index2) in work_verify_images_finish" :key="index2">
							<image :src="item" mode="widthFix" :data-imgurl="item" @tap="showImgs2"></image>
							<view class="grace-close" @tap="removeImg2" :id="'grace-items-img-' + index2" v-if="order.status==4"></view>
						</view>
						<view class="grace-add-btn">
							<view class="grace-body">
								<graceSelectImg :maxFileNumber="9" @tap="addImg2" v-if="btnImg2"></graceSelectImg>
							</view>
						</view>
					</div>
				</div>
			</view>
		</view>
		<button type="primary" @tap="onSave" style="background-color: #6cb231; margin-left: 20px;margin-right: 20px;" v-if="order.status==4">上传保存</button>
		<button type="primary" @tap="onSave" style="background-color: #6cb231; margin-left: 20px;margin-right: 20px;" v-else>确认完成</button>
	</view>
</template>
<script>
	import graceSelectImg from "../../../graceUI/components/graceSelectImg.vue"
import util from '../../../common/util.js';
var maxNum = 9;
var maxNum2 = 9;
var _self;
export default {
	data() {
		return {
			user: {},
			order: {},
			btnImg: true,
			btnImg2: true,
			//old images
			work_refer_images_ids: [],
			work_refer_images: [],
			work_verify_images_id: [],
			work_verify_images: [],

			//new update
			work_refer_images_finish: [],
			work_refer_images_finish_ids: [],

			work_verify_images_finish: [],
			work_verify_images_finish_ids: []
		};
	},
	components:{graceSelectImg},
	onLoad: function(option) {
		_self = this;


		this.user = uni.getStorageSync('user_info');

		if (option) {
			// load order
			if (!option.order_no) {
				uni.showToast({
					title: 'name_allright'
				});
			}
			this.loadOrder(option.order_no);
		}
	},
	onUnload() {
		this.work_refer_images_finish = [];
		this.work_refer_images_finish_ids = [];
	},

	onBackPress() {
		console.debug('onBackPress' + this.work_refer_images_finish_ids.join(','));
		//save in storage
		if (this.work_refer_images_finish_ids) {
			uni.setStorageSync('work_refer', this.work_refer_images_finish_ids.join(','));
		}
		if (this.work_verify_images_finish_ids) {
			uni.setStorageSync('work_verify', this.work_verify_images_finish_ids.join(','));
		}
	},
	onNavigationBarButtonTap(e) {
		console.debug('onNavigationBarButtonTap:' + JSON.stringify(e));

		//save in storage
		uni.setStorageSync('work_refer', this.work_refer_images_finish_ids.join(','));
		uni.setStorageSync('work_verify', this.work_verify_images_finish_ids.join(','));

		// and back()
		uni.navigateBack({
			delta: 1
		});
	},
	onShow() {
		_self = this;
		// #ifdef APP-PLUS
		/* 隐藏凸起图标 */
		var icon = plus.nativeObj.View.getViewById('icon');
		setTimeout(function() {
			icon.hide();
		}, 100);
		// #endif
	},
	methods: {
		onSave() {
			//save in storage
			
			this.onHandleOrder();
			// and back()
			// uni.navigateBack({
			// 	delta: 1
			// });
		},
		addImg: function() {
			var num = maxNum - _self.work_refer_images_finish.length;
			if (num < 1) {
				return false;
			}

			uni.chooseImage({
				count: num,
				sizeType: ['compressed'],
				success: function(res) {
					console.debug('sel pic:' + JSON.stringify(res.tempFilePaths));
					uni.showLoading({
						title: '上传中...'
					});

					for (var i = 0; i < res.tempFilePaths.length; i++) {
						var imagePath = res.tempFilePaths[i];

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
									_self.work_refer_images_finish_ids.push(obj.id);

									// _self.work_refer_images_finish.push(imagePath);
									_self.work_refer_images_finish.push(util.IMAGE_URI + obj.url);

									if (_self.work_refer_images_finish.length >= maxNum) {
										_self.btnImg = false;
									}

									console.debug('iamgeList:' + JSON.stringify(_self.work_refer_images_finish));
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

								if (_self.work_refer_images_finish.length == _self.work_refer_images_finish.length) {
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

		removeImg: function(e) {
			var index = e.currentTarget.id.replace('grace-items-img-', '');
			_self.work_refer_images_finish.splice(index, 1);
			_self.work_refer_images_finish_ids.splice(index, 1);
			_self.work_refer_images_finish = _self.work_refer_images_finish;
			if (_self.work_refer_images_finish.length < maxNum) {
				_self.btnImg = true;
			}
		},
		showWorkReferImgs: function(e) {
			var currentImg = e.currentTarget.dataset.imgurl;
			uni.previewImage({
				urls: this.work_refer_images,
				current: currentImg
			});
		},
		showWorkVerifyImgs: function(e) {
			var currentImg = e.currentTarget.dataset.imgurl;
			uni.previewImage({
				urls: this.work_verify_images,
				current: currentImg
			});
		},
		showImgs: function(e) {
			var currentImg = e.currentTarget.dataset.imgurl;
			uni.previewImage({
				urls: this.work_refer_images_finish,
				current: currentImg
			});
		},
		
		
		addImg2: function() {
			var num = maxNum2 - _self.work_verify_images_finish.length;
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
						var imagePath = res.tempFilePaths[i];

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
								_self.work_verify_images_finish_ids.push(obj.id);

								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								});

								// _self.work_verify_images_finish = _self.work_verify_images_finish.concat(res.tempFilePaths);
								_self.work_verify_images_finish.push(util.IMAGE_URI + obj.url);
								// _self.work_verify_images_finish.push(imagePath);

								if (_self.work_verify_images_finish.length >= maxNum2) {
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

								if (_self.work_verify_images_finish.length == _self.work_verify_images_finish_ids.length) {
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
			_self.work_verify_images_finish.splice(index, 1);
			_self.work_verify_images_finish_ids.splice(index, 1);
			_self.work_verify_images_finish = _self.work_verify_images_finish;
			if (_self.work_verify_images_finish.length < maxNum2) {
				_self.btnImg2 = true;
			}
		},
		showImgs2: function(e) {
			var currentImg2 = e.currentTarget.dataset.imgurl;
			uni.previewImage({
				urls: this.work_verify_images_finish,
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
		},

		loadOrder(order_no) {
			_self = this;
			//singin auto reg
			util.GET(
				'order/detail',
				{
					order_no: order_no
				},
				function(data) {
					console.info('handle:' + JSON.stringify(data));
					if (data.status == 1) {
						_self.order = data.content;
						var title = "完成施工";
						if(_self.order.status==5){
							title = "完成验收";
						}
						uni.setNavigationBarTitle({
											title: title
											});
						//parse work_refer
						//work_verify

						var work_refer = _self.order.work_refer;
						if (!util.isNull(work_refer)) {
							_self.work_refer_images_ids = work_refer.split(',');

							util.GET('sys/images?ids=' + work_refer, {}, function(data) {
								console.info(data);
								if (data.status == 1) {
									_self.work_refer_images = [];
									for (var i in data.content) {
										_self.work_refer_images.push(util.IMAGE_URI + data.content[i]);
									}
								} else {
								}
							});
						}

						var work_verify = _self.order.work_verify;
						if (!util.isNull(work_verify)) {
							_self.work_verify_images_ids = work_verify.split(',');
							util.GET('sys/images?ids=' + work_verify, {}, function(data) {
								console.info(JSON.stringify(data));
								if (data.status == 1) {
									_self.work_verify_images = [];
									for (var i in data.content) {
										_self.work_verify_images.push(util.IMAGE_URI + data.content[i]);
									}
								} else {
								}
							});
						}

						//finish
						var work_refer_images_finish = _self.order.work_refer_finish;
						if (!util.isNull(work_refer_images_finish)) {
							_self.work_refer_images_finish_ids = work_refer_images_finish.split(',');

							util.GET('sys/images?ids=' + work_refer_images_finish, {}, function(data) {
								console.info(data);
								if (data.status == 1) {
									_self.work_refer_images_finish = [];
									for (var i in data.content) {
										_self.work_refer_images_finish.push(util.IMAGE_URI + data.content[i]);
									}
								} else {
								}
							});
						}

						var work_verify_images_finish = _self.order.work_verify_finish;
						if (!util.isNull(work_verify_images_finish)) {
							_self.work_verify_images_finish_ids = work_verify.split(',');
							util.GET('sys/images?ids=' + work_verify_images_finish, {}, function(data) {
								console.info(JSON.stringify(data));
								if (data.status == 1) {
									_self.work_verify_images_finish = [];
									for (var i in data.content) {
										_self.work_verify_images_finish.push(util.IMAGE_URI + data.content[i]);
									}
								} else {
								}
							});
						}
					} else {
						uni.showToast({ title: data.content.message, icon: 'none' });
					}
				}
			);
		} ,
		onHandleOrder() {
			//actor
			if (this.order.status == 2) {
				//go to pay
				this.goDetailPage('home/order/pay?order_no=' + this.order.order_no);
				return;
			}
			//new status
			var newStatus = parseInt(this.order.status) + 1;
			var actor = uni.getStorageSync('actor_type');
			var handle_data = { actor: actor, order_no: this.order.order_no, status: newStatus };
			if (actor == 1 && newStatus == 4) {
				//check filled info and identity_status>0
				if (!this.orderCheck()) {
					return false;
				}
			}
			handle_data.work_refer_finish = _self.work_refer_images_finish_ids.join(',');
			handle_data.work_verify_finish = _self.work_verify_images_finish_ids.join(',');
		
			// console.info("order/handle:from data:"+JSON.stringify(handle_data));
			util.POST('order/handle', handle_data, function(data) {
				console.info('order/handle:-------response data:' + JSON.stringify(data));
				if (data.status == 1) {
					var order = data.content;
					uni.showToast({
						title: data.message,
						duration: 2000
					});
		
					if (order.status == 4 || order.status == 5) {
						setTimeout(function() {
							uni.switchTab({ url: '/pages/order/index?status=' + order.status });
						}, 2000);
					} else if (order.status == 6) {
						setTimeout(function() {
							uni.switchTab({ url: '/pages/order/index?status=' + order.status });
						}, 2000);
					} else if (order.status == 11) {
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/home/order/pay?order_no=' + order.order_no
							});
						}, 2000);
					}
				} else {
					uni.showToast({
						title: '操作失败:' + data.content,
						duration: 2000
					});
				}
			});
		},
		
	}//end methods
};
</script>
<style></style>
