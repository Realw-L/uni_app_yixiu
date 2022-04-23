<template>
	<view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list">
						<view style="display: flex; justify-content: center;">
						<view class="uni-title">公司名称：</view>
					<input type="text" placeholder="请输入公司名称" maxlength="18" style=" font-size: 35upx; padding: 15upx; background-color:#FFFFFF;"/>
						</view>
				</view>
				<view class="uni-list">
						<view style="display: flex; justify-content: center;">
						<view class="uni-title">公司统一信用编码：</view>
					<input type="text" placeholder="请输入统一信用编码" maxlength="18" style=" font-size: 35upx; padding: 15upx; background-color:#FFFFFF;"/>
						</view>
				</view>
				<view class="uni-list list-pd" style="width: 500upx; height: 900upx;margin-left: 15%; ">
					<view class="uni-list-cell cell-pd">
						<view class="uni-uploader">
							<view class="uni-uploader-body" style="display:flex; justify-content: center;">
								<view class="uni-uploader__files">
									<block v-for="(image,index) in imageList" :key="index">
										<view class="uni-uploader__file">
											<image class= "uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
										</view>
									</block>									
									<view class="uni-uploader__input-box">
										<view class="uni-uploader__input" @tap="chooseImage"></view>	
									</view>									
								</view>
							</view>
							<view class="uni-uploader-head" style="display:flex; justify-content: center;">
								<view class="uni-uploader-title"><text>点击添加营业执照</text></view>
							</view>
						</view>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				title: '实名认证',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 1,
				count: [1,]
			}
		},
		onUnload() {
			this.imageList = [],
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍照', '相册', '拍照或相册'],
				this.sizeTypeIndex = 2,
				this.sizeType = ['压缩', '原图', '压缩或原图'],
				this.countIndex = 1;
		},
		methods: {
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = e.target.value
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = e.target.value
			},
			countChange: function(e) {
				this.countIndex = e.target.value;
			},
			chooseImage: async function() {
					if (this.imageList.length === 1) {
						let isContinue = await this.isFullImg();
						console.log("是否继续?", isContinue);
						if (!isContinue) {
							return;
						}
					}
					uni.chooseImage({
						sourceType: sourceType[this.sourceTypeIndex],
						sizeType: sizeType[this.sizeTypeIndex],
						count: this.imageList.length + this.count[this.countIndex] > 1 ? 1 - this.imageList.length : this.count[this.countIndex],
						success: (res) => {
							if(this.imageList){
								
							
							this.imageList = this.imageList.concat(res.tempFilePaths);
							}
						}
					})
				},
				isFullImg: function() {
					return new Promise((res) => {
						uni.showModal({
							content: "已经有9张图片了,是否清空现有图片？",
							success: (e) => {
								if (e.confirm) {
									this.imageList = [];
									res(true);
								} else {
									res(false)
								}
							},
							fail: () => {
								res(false)
							}
						})
					})
				},
				previewImage: function(e) {
					var current = e.target.dataset.src
					uni.previewImage({
						current: current,
						urls: this.imageList
					})
				},
				goDetailPage(e) {
					let path = e.url ? e.url : e;
					let url = ~path.indexOf('platform') ? path : '/pages/' + path ;
					uni.navigateTo({
						url: url
					});
					return false;
				},
		},
		
	}
</script>

<style>
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}
</style>
