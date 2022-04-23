<template>
	<view>
	<view class="uni-header-logo" >
				<view class="uni-flex" style=" display: flex; justify-content: center; background-color: #00C456;">
					<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
						<image :src="avatar"  style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
					</view>
					<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 50upx;">
						<view class="text" style="color: #FFFFFF; font-size:25upx; text-align: left;">用户名</view>
	                  <view class="text" style="font-size: 30upx; text-align: left; color: #FFFFFF;">余额：￥100</view>
					   <view style=" text-align: right; margin-top: -50upx; margin-right: 50upx;"> 
					   <button type="default" class="grace-button" size="mini" style="background-color:#00BFFF; color: #FFFFFF;">提现</button>
					   </view>
					</view>
				</view>
			</view>
			<view style="display: flex; flex-direction: row; margin-top: 5upx; justify-content: space-between;">
				<view style="margin-left: 50upx;">
				<select>
				  <option value="时间">请选择时间</option>
				  <option >1990</option>
				  <option >1991</option>
				  <option >1992</option>
				</select>
				</view>
				<view>
				<select>
				  <option value="时间">请选择状态</option>
				  <option >充值</option>
				  <option >提现</option>
				  <option >订单明细</option>
				</select>
				</view>
				<view style="margin-right: 50upx;">
					余额：140元
				</view>
			</view>
			
			<view class="uni-header-logo" >
						<view class="uni-flex" style="margin-top: 5upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 20upx;">
							<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
								<image :src="avatar"  style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
							</view>
							<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 60upx;">
								<view class="text" style=" font-size:25upx; text-align: left;">微信充值</view>
			                  <view class="text" style=" text-align: left; ">
			                  										  <text>时间：2020-7-13</text>
			                  										   <text style="margin-left: 20upx;">12:11</text>
			                  </view>
							  <view style=" text-align: right; margin-top: -90upx; margin-right: 50upx;">
							  <text style="font-size: 50upx; ">+80</text>
							  </view>
							</view>
						</view>
					</view>
					<view class="uni-header-logo" >
								<view class="uni-flex" style="margin-top: 5upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 20upx;">
									<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
										<image :src="avatar"  style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
									</view>
									<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 60upx; border-radius: 50upx; ">
										<view class="text" style=" font-size:25upx; text-align: left;">微信充值</view>
					                  <view class="text" style=" text-align: left; ">
										  <text>时间：2020-7-13</text>
										   <text style="margin-left: 20upx;">12:11</text>
									  </view>
									   <view style=" text-align: right; margin-top: -90upx; margin-right: 50upx;"> 
									   <text style="font-size: 50upx; ">+80</text>
									   </view>
									</view>
								</view>
							</view>
					<view class="uni-header-logo" >
								<view class="uni-flex" style="margin-top:5upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 20upx;">
									<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
										<image :src="avatar"  style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
									</view>
									<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 60upx;">
										<view class="text" style=" font-size:25upx; text-align: left;">微信充值</view>
					                  <view class="text" style=" text-align: left; ">
					                  										  <text>时间：2020-7-13</text>
					                  										   <text style="margin-left: 20upx;">12:11</text>
					                  </view>
									 <view style=" text-align: right; margin-top: -90upx; margin-right: 50upx;">
									 <text style="font-size: 50upx; ">+80</text>
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
</script>

<style>
</style>
