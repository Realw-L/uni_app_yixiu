<template>
	<view>
		<view class="grace-margin-top grace-text-center">
			<view class="uni-header-logo" >
						<view class="uni-flex" style="margin-top: 20upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 30upx;">
							<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 30upx; margin-left: 50upx;">
								<view class="text" style=" font-size:25upx; text-align: left;">订单详情</view>
								<view class="text" style=" font-size:25upx; text-align: left;">
									<text style="color: #AAAAAA;">2020-07-13</text>
									<text style="margin-left: 50upx; color: #AAAAAA;">05：44</text>
									</view>
									<view class="text" style=" font-size:25upx; text-align: left;">订单号：1534</view>
									<view class="text" style=" font-size:25upx; text-align: left;">订单类型：店铺装修</view>
			                  <view class="text" style=" text-align: left; ">
			                  										  <text>地区：广东省深圳市</text>
			                  </view>
							 <view style=" text-align: right; margin-top: -50upx; margin-right: 50upx;">
							 <text  style="color: red;">订单已验收</text>
							 </view>
							</view>
						</view>
					</view>
		</view>
		<view class="grace-margin-top grace-text-center">
			<view class="uni-header-logo" >
						<view class="uni-flex" style="margin-top: 10upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 30upx;">
							<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 30upx;  margin-left: 50upx;">
								<view class="text" style=" font-size:25upx; text-align: left;">审核信息</view>
								<view class="text" style=" font-size:25upx; text-align: left;">
									<text style="color: #AAAAAA;">2020-07-13</text>
									<text style="margin-left: 50upx; color: #AAAAAA;">05：44</text>
									</view>
			                  <view class="text" style=" text-align: left; ">
			                  										  <text>恭喜您，您2020-07-13提交的实名认证资料已经通过了，请放心接单。</text>
			                  </view>
							</view>
						</view>
					</view>
		</view>
	</view>
	
</template>

<script>
	export default {
			data() {
				return {
					HOST: this.$util.HOST,
				}
			},
			methods: {
	
				goDetailPage(e) {
					let path = e.url ? e.url : e;
					let url = ~path.indexOf('platform') ? path : '/pages/' + path;
					uni.navigateTo({
						url: url
					});
					return false;
				},
			},
	
		}
	
</script>

<style>
</style>
