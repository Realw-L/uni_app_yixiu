<template>
	<view slot="gBody" class="grace-body">
		<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center" style="display: flex;flex-direction: column; text-align: center;">
			<view><image src="../../static/1212.png" mode="" style="width: 100upx; height: 100upx;"></image></view>
			<view>姓名：张**</view>
			<view style="width:250rpx; margin:0 auto;"><graceStar :starnum="currentStarNum1" :cantap="false"></graceStar></view>
		</view>
		<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center" style="display: flex;flex-direction: column; color: #AAAAAA;">
			<view class="grace-list-items  grace-border-b">
				<text class="  grace-green"></text>
				<view class="grace-list-body ">
					<view class="grace-list-title"><text class="grace-list-title-text">已竣工的项目</text></view>
				</view>
				<text>100</text>
			</view>
			<view class="grace-list-items  grace-border-b">
				<text class="  grace-green"></text>
				<view class="grace-list-body ">
					<view class="grace-list-title"><text class="grace-list-title-text">施工中的项目</text></view>
				</view>
				<text>100</text>
			</view>
			<view class="grace-list-items  grace-border-b">
				<text class="  grace-green"></text>
				<view class="grace-list-body ">
					<view class="grace-list-title"><text class="grace-list-title-text">我的地址</text></view>
				</view>
				<text>广东省深圳市龙岗区</text>
			</view>
		</view>
		<view>优秀案例</view>
		<view style="display: flex; flex-direction: row; justify-content: space-between;">
			<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center" style="display: flex;flex-direction:column; margin-left: -10upx;">
				<view style="display: flex; text-align: center;"><image src="../../static/10s.png" mode="" style="width: 100%; height:150upx;"></image></view>
				<view>龙岗区李朗国际珠宝园</view>
				<view style="color: #AAAAAA;">广东省/深圳市</view>
			</view>
			<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center" style="display: flex;flex-direction: column; margin-left: 10upx;">
				<view style="display: flex; text-align: center;"><image src="../../static/10s.png" mode="" style="width: 100%; height:150upx;"></image></view>
				<view>龙岗区李朗国际珠宝园</view>
				<view style="color: #AAAAAA;">广东省/深圳市</view>
			</view>
		</view>
		<view style="display: flex; flex-direction: row; margin-top: 50upx;">
			<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;" @tap="goDetailPage('user_order')">联系管家</button>
		</view>
	</view>
</template>

<script>
import gracePage from '@/graceUI/components/gracePage.vue';
import graceStar from '@/graceUI/components/graceStar.vue';
export default {
	data() {
		return {
			currentStarNum1: 5
		};
	},
	onLoad: function() {
		// 延迟模拟网络请求改变星标
		setTimeout(
			function() {
				this.currentStarNum1 = 4;
			}.bind(this),
			1000
		);
	},
	components: {
		gracePage,
		graceStar
	},
	methods: {
		starchange: function(e) {
			console.log(JSON.stringify(e));
			this.currentStarNum2 = e;
			uni.showToast({
				title: e + '星',
				icon: 'none'
			});
		},
		goDetailPage(page) {
			// console.info(e);
			//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
			uni.navigateTo({
				// url: url
				url: page
			});
		}
	}
};
</script>

<style>
page {
	background: #f8f8f8;
}
.grace-idcard-main {
	margin: 25rpx;
}
.grace-idcard-desc {
	background-color: #ffffff;
	color: #666666;
	line-height: 56rpx;
	font-size: 26rpx;
	padding: 20rpx;
	border-radius: 10rpx;
}
.grace-idcard-text {
	line-height: 1.8em;
	margin-top: 30rpx;
	color: #666666;
}
.grace-idcard-items {
	background-color: #ffffff;
	padding: 50rpx;
	border-radius: 10rpx;
	margin-top: 15rpx;
}
.grace-idcard-items-image {
	width: 398rpx;
}
</style>
