<template>
			<view slot="gBody" class="grace-body">
				<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center" style="display: flex;flex-direction: column;">
					<view><image src="../../static/10s.png" mode="" style="width: 100%; height: 400upx;"></image></view>
					<view>龙岗区李朗国际珠宝园（案例1）</view>
					<view style="color: #AAAAAA;">广东省/深圳市</view>
				</view>
				<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center" style="display: flex;flex-direction: column;">
					<view><image src="../../static/10s.png" mode="" style="width: 100%; height: 400upx; "></image></view>
					<view>龙岗区李朗国际珠宝园（案例2）</view>
					<view style="color: #AAAAAA;">广东省/深圳市</view>
				</view>
			</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		components: {
		},
		methods: {
		goDetailPage(page) {
			// console.info(e);
			//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
			uni.navigateTo({
				// url: url
				url: page
			});
		},
		}
	};
</script>

<style>
	page{background:#F8F8F8;}
	.grace-idcard-main{margin:25rpx;}
	.grace-idcard-desc{background-color:#FFFFFF; color:#666666; line-height:56rpx; font-size:26rpx; padding:20rpx; border-radius:10rpx;}
	.grace-idcard-text{line-height:1.8em; margin-top:30rpx; color:#666666;}
	.grace-idcard-items{background-color:#FFFFFF; padding:50rpx; border-radius:10rpx; margin-top:15rpx;}
	.grace-idcard-items-image{width:398rpx;}
</style>
