<template>
	<view class="page">

		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-card">
				<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate">
							公司名称：
							<input name="company" :value="company" @input="onInputCompany" confirm-type="search" class="input" type="text"
							 placeholder="请输入公司名称" maxlength="25" style="width: 500upx;" />
						</view>
					</view>
					<view class="uni-list-cell" hover-class="uni-list-cell-hover">
						<view class="uni-list-cell-navigate">
							公司统一信用编码：
							<input name="company_license_no" :value="company_license_no" @input="onInputCompanyLicenseNo" confirm-type="search"
							 class="input" type="text" placeholder="请输入公司统一信用编码" maxlength="18" style="width: 400upx;" />
						</view>
					</view>

					<view  hover-class="uni-list-cell-hover" style="display: flex; flex-direction: column;">
						<view class="uni-list-cell-navigate">
							法人身份证上传
						</view>
						<view style="display: flex; flex-direction: row; margin-left: 15upx;">
							<view style="width: 350upx; height: upx;">
								<view>
									<block v-if="image1">
										<view class="grace-add-file" >
											<view class="garce-items " style="height:350upx;width: 350upx; justify-content: center;flex-direction: row; align-items: center;">
												<image :src="image1" @tap="showImgs"></image>
												<view class="grace-close" @tap="removeImg(1)" id="'grace-items-img-1'"></view>
											</view>
										</view>
									</block>
									<block v-else>
										<view style="display: flex; flex-direction: column; border: #a2a2a2 1px solid;">
											<view class="uni-hello-addfile" @tap="chooseImage(0)" style="line-height: 230upx;">
												<image src="../../static/top.png" mode="" style="width:200upx; height: 100upx; padding-top: 10upx;" ></image>
											</view>
											<view>
											<text style="display: flex; justify-content: center; margin-top: -155upx;">正面照片</text>
											<text style="display: flex; justify-content: center;">（文字清晰，四角可见）</text>
											</view>
										</view>
									</block>
								</view>
							</view>
							<view style="width: 350upx; height: upx; padding-left: 20upx;" >
								<view >
									<block v-if="image2">
										<view class="grace-add-file" style="width: 350upx; height: 200upx;">
											<view class="garce-items" style="width: 350upx; height: 350upx;">
												<image :src="image2" @tap="showImgs"></image>
												<view class="grace-close" @tap="removeImg(2)" id="'grace-items-img-2'"></view>
											</view>
										</view>
									</block>
									<block v-else>
										<view style="display: flex; flex-direction: column;  border: #a2a2a2 1px solid;">
											<view class="uni-hello-addfile" @tap="chooseImage(1)" style="line-height: 230upx;">
												<image src="../../static/buttom.png" mode="" style="width:200upx; height:100upx; padding-top: 10upx;"></image>
											</view>
											<view>
											<text style="display: flex; justify-content: center; margin-top: -155upx;">反面照片</text>
											<text style="display: flex; justify-content: center;">（文字清晰，四角可见）</text>
										</view>
										</view>
									</block>
								</view>
							</view>
						</view>
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="display: flex; flex-direction: column; height: 100upx;">
						<view style="display: flex; flex-direction: row; margin-top: -20upx;">
							<view class="uni-list-cell-navigate">
								<image src="../../static/111.png" mode="" style="width: 30upx; height: 30upx; margin-top: 10upx; margin-left: -150upx;"></image>
								<text style="padding-left: 10upx; color: #a2a2a2;">格式为JPG/PNG/GIF,大小不得超过3M</text>
							</view>
						</view>
					</view>
					</view>
					<view style="display: flex; flex-direction: row; width: 500upx; height: 300upx; ">
						<view style="width:280upx; height:upx; margin-left: 1upx;">
							<view>
								<block v-if="image3">
									<view class="grace-add-file" style="width: 200upx; height: 200upx; ">
										<view class="garce-items " style="height:200upx;width:200upx; justify-content: center;flex-direction: row; align-items: center;">
											<image :src="image3" @tap="showImgs" style="width: 200upx; height: 200upx;"></image>
											<view class="grace-close" @tap="removeImg(3)" id="'grace-items-img-1'" ></view>
										</view>
									</view>
								</block>
								<block v-else>
									<view style="display: flex; flex-direction: column; border: #a2a2a2 1px solid; margin-left: 20upx; ">
										<view class="uni-hello-addfile" @tap="chooseImage(2)" style="font-size: 30upx; padding:0px; margin: 0px; line-height: 140upx;">
											<image src="../../static/yy.png" mode="" style="width: 220upx; height: 100upx; padding-top: 50upx;"></image>
										</view>
										<view><text style="display: flex; justify-content: center; margin-top: -45upx; font-size: 20upx;">营业执照</text>
										<text style="display: flex; justify-content: center; font-size: 10upx;">（文字清晰，四角可见）</text></view>
									</view>
								</block>
							</view>
						</view>
						<view style="width: 280upx; height: upx;">
							<view>
								<block v-if="image4">
									<view class="grace-add-file" style="width: 200upx; height: 200upx;">
										<view class="garce-items" style="height:200upx;width:200upx; justify-content: center;flex-direction: row; align-items: center;">
											<image :src="image4" @tap="showImgs" style="width: 200upx; height: 200upx;"></image>
											<view class="grace-close" @tap="removeImg(4)" id="'grace-items-img-1'"></view>
										</view>
									</view>
								</block>
								<block v-else>
									<view style="display: flex; flex-direction: column; border: #a2a2a2 1px solid; margin-left: 23upx;">
										<view class="uni-hello-addfile" @tap="chooseImage(3)" style="font-size: 30upx; padding:0px; margin: 0px; line-height: 140upx;">
											<image src="../../static/zz.png" mode="" style="width: 220upx; height: 100upx; padding-top: 50upx;"></image>
										</view>
										<view>
										<text style="display: flex; justify-content: center; margin-top: -45upx; font-size: 20upx;">资质证书</text>
										<text style="display: flex; justify-content: center;font-size: 10upx;">（文字清晰,四角可见）</text></view>
									</view>
								</block>
							</view>
						</view>
						<view style="width: 280upx; height: 150upx;">
							<view>
								<block v-if="image5">
									<view class="grace-add-file" style="width: 200upx; height: 200upx;">
										<view class="garce-items" style="height:200upx;width:200upx; justify-content: center;flex-direction: row; align-items: center;">
											<image :src="image5" @tap="showImgs" style="width: 200upx; height: 200upx; "></image>
											<view class="grace-close" @tap="removeImg(5)" id="'grace-items-img-1'"></view>
										</view>
									</view>
								</block>
								<block v-else>
									<view style="display: flex; flex-direction: column; border: #a2a2a2 1px solid; margin-left: 23upx;">
										<view class="uni-hello-addfile" @tap="chooseImage(4)" style="font-size: 30upx; padding:0px; margin: 0px; line-height: 140upx;">
											<image src="../../static/a.png" mode="" style="width: 220upx; height: 100upx; padding-top: 50upx;"></image>
										</view>
										<view>
										<text style="display: flex; justify-content: center; margin-top: -45upx; font-size: 20upx;">安全生产许可证</text>
										<text style="display: flex; justify-content: center; font-size: 10upx;">（文字清晰，四角可见）</text></view>
									</view>
								</block>
							</view>
						</view>
					</view>
						<view class="uni-list-cell"  style="display: flex; flex-direction: column; width: 100%; ">
						<view style="display: flex; flex-direction: row;">
							<view style=" margin-left: -50upx;">
								<image src="../../static/111.png" mode="" style="width: 30upx; height: 30upx; margin-top: -70upx; margin-left: -150upx;"></image>
								<text style="padding-left: 10upx; color: #a2a2a2;">格式为JPG/PNG/GIF,大小不得超过3M</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import uniBadge from '@/components/uni-badge.vue'
	import util from '@/common/util'
	var graceChecker = require('../../common/graceChecker.js')

	var _self = null;
	export default {
		data() {
			return {
				title: 'uploadFile',
				imageList: ['', '', '', '', ''],
				image1: '',
				image2: '',
				image3: '',
				image4: '',
				image5: '',
				ids: ['', '', '', '', ''],
				index: 0,
				company: '',
				company_license_no: '',
			}
		},
		onLoad() {
			_self = this;
			this.loadData()
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
				} else if (ind == 4) {
					_self.image4 = '';
					_self.ids[3] = '';
				} else if (ind == 5) {
					_self.image5 = '';
					_self.ids[4] = '';
				}


			},
			showImgs: function(index) {

				uni.previewImage({
					current:index,
					urls: this.imageList,

				})
			},
			onInputCompany(e) {

				this.company = e.detail.value
			},
			onInputCompanyLicenseNo(e) {

				this.company_license_no = e.detail.value
			},


			onSave(formdata) {

				console.info('save formdata:' + JSON.stringify(formdata))
				var self = this
				//singin auto reg
				util.POST(
					'user/companyLicense',
					formdata,
					function(data) {
						console.info('handle:' + JSON.stringify(data))
						if (data.status == 1) {
							uni.showToast({
								title: data.content,
								icon: 'none'
							})

						} else {
							uni.showToast({
								title: data.message,
								icon: 'none'
							})
						}
					},
				)
			},

			formSubmit: function(e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				var rule = [{
						name: 'company',
						checkType: 'string',
						checkRule: '2,60',
						errorMsg: '公司名应为2-60个字符',
					},
					{
						name: 'company_license_no',
						checkType: 'string',
						checkRule: '10,18',
						errorMsg: '公司统一社会信用编码为18个字符',
					},
				]
				//进行表单检查
				var formData = e.detail.value
				console.debug('formData:' + JSON.stringify(formData))
				var checkRes = graceChecker.check(formData, rule)
				if (checkRes) {
					this.onSave(formData)

					// uni.showToast({title:"验证通过!", icon:"none"});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					})
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
					'user/getCompanyLicense', {},
					function(indata) {
						console.info('handle:' + JSON.stringify(indata))
						if (indata.status == 1) {
							// uni.showToast({title: data.content, icon: 'none'})
							var data = indata.content;

							self.company = data.company
							self.company_license_no = data.company_license_no;
							if (data.ids) {
								self.ids = data.ids.split(',')
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
								}
							}
							console.debug('images:' + JSON.stringify(data.images))
							console.debug('imageList:' + JSON.stringify(self.imageList))
							console.debug('images1:' + self.image1)
							console.debug('images2:' + self.image2)
							console.debug('images3:' + self.image3)
							console.debug('images4:' + self.image4)
							console.debug('images5:' + self.image5)


						} else {
							uni.showToast({
								title: data.message,
								icon: 'none'
							})
						}
					},
				)
			},

			chooseImage: function(index) {

				var self = this
				uni.showLoading({})
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]

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
</style>
