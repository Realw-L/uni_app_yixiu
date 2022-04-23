<template>
	<view class="page">
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-card">
				<view class="uni-list">
					<view class="grace-idcard-text">电工证</view>
					<view class="grace-idcard-items">
						<view class="grace-idcard-uper-btn" @tap="chooseImage(0)">
							<view class="img">
								<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" />
							</view>
							<view class="text">拍摄或选择照片</view>
						</view>
						<view class="grace-idcard-preview">
							<image :src="image1" @tap="showImgs(0)" mode="widthFix"></image>
						</view>
					</view>
					<view class="grace-idcard-text">施工证</view>
					<view class="grace-idcard-items">
						<view class="grace-idcard-uper-btn" @tap="chooseImage(1)">
							<view class="img">
								<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" />
							</view>
							<view class="text">拍摄或选择照片</view>
						</view>
						<view class="grace-idcard-preview">
							<image :src="image2" @tap="showImgs(1)" mode="widthFix"></image>
						</view>
					</view>
					<view class="grace-idcard-text">高空证</view>
					<view class="grace-idcard-items">
						<view class="grace-idcard-uper-btn" @tap="chooseImage(2)">
							<view class="img">
								<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" />
							</view>
							<view class="text">拍摄或选择照片</view>
						</view>
						<view class="grace-idcard-preview">
							<image :src="image3" @tap="showImgs(2)" mode="widthFix"></image>
						</view>
					</view>
					<view class="grace-idcard-text">电焊工证</view>
					<view class="grace-idcard-items">
						<view class="grace-idcard-uper-btn" @tap="chooseImage(3)">
							<view class="img">
								<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" />
							</view>
							<view class="text">拍摄或选择照片</view>
						</view>
						<view class="grace-idcard-preview">
							<image :src="image4" @tap="showImgs(3)" mode="widthFix"></image>
						</view>
					</view>
					<view class="grace-idcard-text">木工证</view>
					<view class="grace-idcard-items">
						<view class="grace-idcard-uper-btn" @tap="chooseImage(4)">
							<view class="img">
								<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" />
							</view>
							<view class="text">拍摄或选择照片</view>
						</view>
						<view class="grace-idcard-preview">
							<image :src="image5" @tap="showImgs(4)" mode="widthFix"></image>
						</view>
					</view>
					<view class="grace-idcard-text">油漆工证</view>
					<view class="grace-idcard-items">
						<view class="grace-idcard-uper-btn" @tap="chooseImage(5)">
							<view class="img">
								<image src="https://staticimgs.oss-cn-beijing.aliyuncs.com/camera.png" mode="widthFix" />
							</view>
							<view class="text">拍摄或选择照片</view>
						</view>
						<view class="grace-idcard-preview">
							<image :src="image6" @tap="showImgs(5)" mode="widthFix"></image>
						</view>
					</view>
				</view>

			</view>

			<view style="display: flex; justify-content: center; margin-top: 20upx; margin-bottom: 10upx;">
				<button type="primary" form-type="submit" style="width: 700upx;  background-color: #6cb231;">
					保存
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge.vue'
	import util from '@/common/util'
	var graceChecker = require('../../common/graceChecker.js')

	var self;
	export default {
		data() {
			return {
				HOST: this.$util.HOST,
				title: 'uploadFile',
				imageList: ['', '', '', '', '', ''],
				idCard1: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				idCard2: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				idCard3: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				idCard4: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				idCard5: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				idCard6: 'https://app.yidikj.com/Public/app/zhiye.jpg',


				image1: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				image2: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				image3: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				image4: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				image5: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				image6: 'https://app.yidikj.com/Public/app/zhiye.jpg',
				ids: ['', '', '', '', '', '', ],
				index: 0,
				company: '',
				company_license_no: '',
			}
		},
		onLoad() {
			self = this;
			this.loadData();
		},
		onUnload() {
			// this.imageList = '';
		},
		components: {
			uniBadge,
		},
		onBackPress() {

		},
		onNavigationBarButtonTap(e) {
			console.debug('onNavigationBarButtonTap:' + JSON.stringify(e))
			// uni.showToast({
			//   title: 'test',
			// })
			//

			var formData = {
				'company': this.company,
				'company_license_no': this.company_license_no,
				'ids': this.ids.join(','),
			}

			this.formSubmit({
				detail: {
					value: formData
				}
			})

		},
		methods: {
			onInputCompany(e) {

				this.company = e.detail.value
			},
			onInputCompanyLicenseNo(e) {

				this.company_license_no = e.detail.value
			},


					
			onSave(formdata) {
				console.info('save formdata:' + JSON.stringify(formdata));
				var self = this;
				//singin auto reg
				util.POST('user/info/skill_license', formdata, function(data) {
					console.info('handle:' + JSON.stringify(data));
					if (data.status == 1) {
			
						uni.showToast({
							title: data.content,
							icon: 'none'
						});
			
			
						setTimeout(function() {
							uni.navigateBack();
			
						}, 2000)
			
			
					} else {
						uni.showToast({
							title: data.message,
							icon: 'none'
						});
					}
				});
			},

			formSubmit: function(e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [

				  {
				    name: 'skill_license',
				    checkType: 'string',
				    checkRule: '0,118',
				    errorMsg: '请上传图片',
				  },
				]
				//进行表单检查
				var formData = e.detail.value;
				formData.skill_license = self.ids.join(',');
				console.debug('formData:' + JSON.stringify(formData))
							
				var checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
						formData.ids = this.ids.join(',');
								
				  this.onSave(formData)
				
				  // uni.showToast({title:"验证通过!", icon:"none"});
				} else {
				  uni.showToast({title: graceChecker.error, icon: 'none'})
				}
				

			},
			formReset: function(e) {
				console.log('清空数据')
				this.chosen = ''
			},

			loadData() {

				var self = this
				//singin auto reg
				util.GET(
					'user/info/get_skill_license', {},
					function(indata) {
						console.info('handle:' + JSON.stringify(indata))
						if (indata.status == 1) {
							// uni.showToast({title: data.content, icon: 'none'})
							var data = indata.content;

							
							
							if (data.skill_license) {
								self.ids = data.skill_license.split(',')
							}

							self.imageList = []
							for (var i = 0; i < data.images.length; i++) {

								self.imageList.push(util.IMAGE_URI + data.images[i]);
								switch (i) {
									case 0:
										if (data.images[i])
											self.image1 = util.IMAGE_URI + data.images[i]
										break
									case 1:
										if (data.images[i])
											self.image2 = util.IMAGE_URI + data.images[i]
										break
									case 2:
										if (data.images[i])
											self.image3 = util.IMAGE_URI + data.images[i]
										break
									case 3:
										if (data.images[i])
											self.image4 = util.IMAGE_URI + data.images[i]
										break
									case 4:
										if (data.images[i])
											self.image5 = util.IMAGE_URI + data.images[i]
										break
									case 5:
										if (data.images[i])
											self.image6 = util.IMAGE_URI + data.images[i]
										break
									case 6:
										if (data.images[i])
											self.image7 = util.IMAGE_URI + data.images[i]
										break

								}
							}
							console.debug('images:' + JSON.stringify(data.images))
							console.debug('imageList:' + JSON.stringify(self.imageList))
							console.debug('images1:' + self.image1)
							console.debug('images2:' + self.image2)
							console.debug('images3:' + self.image3)
							console.debug('images4:' + self.image4)
							console.debug('images5:' + self.image5)
							console.debug('images6:' + self.image6)
							console.debug('images7:' + self.image7)



						} else {
							uni.showToast({
								title: indata.message,
								icon: 'none'
							})
						}
					},
				)
			},


			chooseImage: function(index) {

				var self = this

				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.showLoading({})
						wx.uploadFile({
							url: util.API_URI + 'sys/upload',
							filePath: imageSrc,
							name: 'data',
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000,
								})
								// this.imageList = imageSrc

								// var obj = eval('(' + res.data + ')')
								var obj = JSON.parse(res.data);
								self.index = index
								self.imageList[index] = util.IMAGE_URI + obj.url

								switch (index) {
									case 0:
										self.image1 = util.IMAGE_URI + obj.url
										break
									case 1:
										self.image2 = util.IMAGE_URI + obj.url
										break
									case 2:
										self.image3 = util.IMAGE_URI + obj.url
										break
									case 3:
										self.image4 = util.IMAGE_URI + obj.url
										break
									case 4:
										self.image5 = util.IMAGE_URI + obj.url
										break
									case 5:
										self.image6 = util.IMAGE_URI + obj.url
										break
									case 6:
										self.image7 = util.IMAGE_URI + obj.url
										break


								}

								self.ids[index] = obj.id

								console.debug(' images:' + self.imageList)
							},
							fail: (err) => {
								console.log('uploadImage fail', err)
								uni.showModal({
									content: err.errMsg,
									showCancel: false,
								})
								uni.hideLoading()
							},
							complete: () => {
								console.log('complate')
							},
						})

					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						uni.hideLoading()
					},
				})
			},
			goDetailPage(e) {
				let path = e.url ? e.url : e
				let url = ~path.indexOf('platform') ? path : '/pages/' + path
				uni.navigateTo({
					url: url,
				})
				return false
			},

		},
	}
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
