<template>
	<view> 
		<view class="uni-padding-wrap">
			<!-- 评论区 start -->
			<view class="uni-comment">
					<view class="uni-header-logo" style="background-color: #09BB07;">	
							<view class="uni-flex uni-row">
								<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
									<image src="../../static/templateIndex.png"  @tap="goDetailPage('my/face')"></image>
								</view>
								<view class="uni-flex uni-column" style="justify-content: space-between; margin-top: 40upx;">
									<view class="text" style="height: 70upx;text-align: left;padding-top: 10upx;">
										gerexxx
									</view>
										<view class="text" style="flex: 1;">13798945xxx</view>
								</view>
							</view>			
						</view>	
				<view class="uni-comment-list" >	
					<view class="uni-comment-face">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>网友</text>
						</view>
						<view class="uni-comment-date">
						</view>
						<view class="uni-comment-content">很酷的HBuilderX和uni-app，开发一次既能生成小程序，又能生成App</view>
						<view class="uni-grid-9" style="width:600upx;">
							<view class="uni-grid-9-item " hover-class="uni-grid-9-item-hover" style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item" ></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover no-border-right" style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item" ></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" style=" height: 200upx; width: 200upx; ">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" style="height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover no-border-right" style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
						</view>	
						<view class="uni-comment-date" style="justify-content: flex-end;">
														<view class="uni-comment-replay-btn">5回复</view>	
														<view class="uni-comment-replay-btn">5回复</view>	
						</view>
					</view>
				</view>
				<view class="uni-comment-list">
					<view class="uni-comment-face">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>今生缘</text>
						</view>
						<view class="uni-comment-content">好牛逼的感觉，是不是小程序、App、移动端都互通了？</view>
						<view class="uni-comment-date">						
						</view>
						<view class="uni-comment-date" style="justify-content: flex-end;">
														<view class="uni-comment-replay-btn">5回复</view>	
														<view class="uni-comment-replay-btn">5回复</view>	
						</view>
					</view>
					
				</view>
				<view class="uni-comment-list" >
					<view class="uni-comment-face">
						<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body" >
						<view class="uni-comment-top" >
							<text >小猫咪</text>
						</view>
						<view class="uni-comment-content">支持国产，支持DCloud!</view>
						<view class="uni-grid-9" style="width:600upx;">
							<view class="uni-grid-9-item " hover-class="uni-grid-9-item-hover"  style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover no-border-right"  style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover"  style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover"  style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover no-border-right"  style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
							<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover"  style=" height: 200upx; width: 200upx;">
								<image src="../../static/60x60.png" class="uni-grid-9-text image-item"></image>
							</view>
						</view>
						<view class="uni-comment-date" style="justify-content: flex-end;">
														<view class="uni-comment-replay-btn">5回复</view>	
														<view class="uni-comment-replay-btn">5回复</view>	
						</view>
					</view>
				</view>
			</view>
			<!-- 评论区 end -->
		</view>
	</view>
</template>

<script>
import util from '@/common/util.js'

	export default {
		data() {
			return {
				title: '我的圈子',
			}
		},
		methods: {
			
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
	.image-item {
		width: 95%;
		height: 95%;
	}
</style>
