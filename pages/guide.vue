<template>
	<view class="content">
		<swiper class="swiper" 
		:indicator-dots="indicatorDots" 
		:indicator-color="baise" 
		:indicator-active-color="lanse"
		:autoplay="autoplay" 
		:duration="duration">
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image :src="HOST+'/Public/app/bg-01.jpg'"></image></view>
					<view class="jump-over" @tap="launchFlag()">跳过</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="HOST+'/Public/app/bg-02.jpg'"></image></view>
					<view class="jump-over" @tap="launchFlag()">跳过</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="HOST+'/Public/app/bg-03.jpg'"></image></view>
					<view class="jump-over" @tap="launchFlag()">跳过</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<view class="swiper-item-img"><image src="HOST+'/Public/app/bg-04.jpg'"></image></view>
					<view class="experience-now" @tap="launchFlag()">立即体验</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				HOST: this.$util.HOST,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: false,
				duration: 500,
				baise:'rgba(255, 255, 255, .3)',
				lanse: '#918984'
			}
		},
		methods: {
			launchFlag: function(){
			  uni.setStorageSync('launchFlag',1);
			
// 			 uni.switchTab({
// 				url: '/pages/home/index',
// 				
// 			 });
			 uni.redirectTo({url: '/pages/my/login/login'
			});

				
			}
		}
	}
</script>
<style>
	page,
	.content{
		width: 100%;
		height: 100%;
		background-size: 100% auto ;
		padding: 0;
	}
	.swiper{
		width: 100%;
		height: 100%;
	}
	.swiper-item {
		display: block;
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
	}
	.swiper-item-img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
	.swiper-item-img image{
		width: 100%;
		height: 100%;
	}
	.swiper-item-text {
		padding-top: 40upx;
		width: 430upx;
		height: 130upx;
		margin: 0 auto;
	}
	.swiper-item-text image{
		width: 100%;
		height: 100%;
	}
	.swiper-text{
		width: 100%;
		position: absolute;
		bottom: 80upx;
	}
	.swiper-text view{
		width: 100%;
		text-align: center;
		color: #FFF;
	}
	.swiper-text-cn{
		font-size: 40upx;
	}
	.swiper-text-us{
		font-size: 28upx;
	}
	.jump-over{
		position: absolute;
		height: 60upx;
		line-height: 60upx;
		padding: 0 40upx;
		border-radius: 30upx;
		font-size: 32upx;
		right: 45upx;
		top: 125upx;
		color: #ffffff;
		background: #93bf6b;
		z-index: 999;
	}
	.experience-now{
		position: absolute;
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		padding:5upx 40upx;
		border-radius: 35upx;
		font-size: 32upx;
		left: 50%;
		margin-left: -140upx;
		bottom: 80upx;
		color: #ffffff;
		background: #93bf6b;
		z-index: 9999;
	}
</style>
