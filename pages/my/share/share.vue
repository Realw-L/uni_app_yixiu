<template>
	<view >
	<view style="display: flex; justify-content: center; margin-top: 50upx; color: #09BB07;">
		<text style="font-size: 35upx;">服务项目</text> 
	</view>
				<view class="grace-grids grace-margin-top" style="display: flex;justify-content: space-between;">
					<view class="grace-grids-items">
						<image class="grace-grids-icon-img" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
						<text class="grace-grids-text">店铺装修</text>
					</view>
					<view class="grace-grids-items">
						<image class="grace-grids-icon-img" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png" mode="widthFix"></image>
						<text class="grace-grids-text">店铺维修</text>
					</view>
					<view class="grace-grids-items">
						<image class="grace-grids-icon-img" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
						<text class="grace-grids-text">店铺撤场</text>
					</view>
				</view>
				<view class="grace-grids grace-margin-top" style="display: flex;justify-content: space-between;">
					<view class="grace-grids-items">
						<image class="grace-grids-icon-img" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
						<text class="grace-grids-text">基础安装</text>
					</view>
					<view class="grace-grids-items">
						<image class="grace-grids-icon-img" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/2.png" mode="widthFix"></image>
						<text class="grace-grids-text">店铺复尺</text>
					</view>
					<view class="grace-grids-items">
						<image class="grace-grids-icon-img" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
						<text class="grace-grids-text">广告插画安装</text>
					</view>
				</view>
				<view style="display: flex; justify-content: center; margin-top: 50upx; color: #09BB07;">
					<text style="font-size: 35upx;">平台介绍</text> 
				</view>
		<view style="display: flex;justify-content: center;">
			<text>实打实的就爱上了的课件撒离开大家阿斯利康的就阿拉山口大家拉克斯基的卢卡斯记得啦是可见的啦可是建档立卡是角动量喀什觉得拉萨看得见卢卡斯大家拉萨看得见啦可是建档立卡</text> 
	</view>
	<view style="display: flex; flex-direction: row; justify-content: center;">
	<image src="../../../static/111111.png" mode="" style="width: 200upx; height:200upx;"></image>
		<image src="../../../static/1111.png" mode="" style="width:200upx; height:200upx;"></image>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				bottomData: [{
						text: '微信',
						icon: '/static/index/weixin.png',
						name: 'wx'
					},
					{
						text: '朋友圈',
						icon: '/static/index/pengyouquan.png',
						name: 'copy'
					},
					{
						text: 'QQ',
						icon: '/static/index/qq.png',
						name: 'qq'
					},
					{
						text: '复制',
						icon: '/static/index/copy.png',
						name: 'copy'
					}
				],
			}
		},
		props: ["sharedataTemp"],
		onNavigationBarButtonTap(e) {
			uni.navigateTo({ url:'sharedataTemp'});
		},
		methods: {
			btnShare(ind) {
				console.log(ind);
				var strProvider = "",
					strScene = "",
					mytype = '';
				switch (ind) {
					case 0:
						strProvider = "weixin"
						strScene = "WXSceneSession"
						mytype = 0
						break;
					case 1:
						strProvider = "weixin"
						strScene = "WXSenceTimeline"
						mytype = 0
						break;
					case 2:
						strProvider = "qq"
						mytype = 1
						break;
					case 3:
						uni.setClipboardData({
							data: this.sharedataTemp.strShareUrl,
							complete() {
								uni.showToast({
									title: "已复制到剪贴板"
								})
							}
						})
						break;
				}
				if (strProvider != "") { //点击了0-3序号的这4个按钮
					uni.share({
						provider: strProvider,
						scene: strScene,
						type: mytype,
						href: this.sharedataTemp.strShareUrl,
						title: this.sharedataTemp.strShareTitle,
						summary: this.sharedataTemp.strShareSummary,
						imageUrl: this.sharedataTemp.strShareImageUrl,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
				}
			}
		}
	}
	</script>
</script>

<style lang="scss">
	/* 底部分享 */
	.sharebtn {
		.uni-share {
			width: 690rpx;
			margin: 30rpx;
			border-radius: 30rpx;
			/* #ifndef APP-NVUE */
			display: flex;
			flex-direction: column;
			/* #endif */
			background-color: #fff;
			.uni-share-content {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: center;
				overflow-x: scroll;
				padding: 15px 50rpx;
				.uni-share-content-box {
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					flex-direction: column;
					align-items: center;
					// width: 25%;
					// justify-content: space-between;
					margin-right: 60rpx;
					&:nth-last-child(1) {
						margin-right: 0;
					}
					.uni-share-content-image {
						/* #ifndef APP-NVUE */
						display: flex;
						/* #endif */
						flex-direction: row;
						justify-content: center;
						align-items: center;
						width: 90rpx;
						height: 90rpx;
						overflow: hidden;
						border-radius: 10rpx;
						.content-image {
							width: 90rpx;
							height: 90rpx;
						}
					}
					&:nth-last-child(1){
						.uni-share-content-image .content-image {
							width: 50rpx!important;
							height: 50rpx!important;
						}
					}
					.uni-share-content-text {
						font-size: 26rpx;
						color: #333;
						padding-top: 5px;
						padding-bottom: 10px;
					}
				}
			}
		}
	}
</style>
