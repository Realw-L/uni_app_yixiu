<template>
	<view>
			<view class="grace-title grace-margin-top" style="display: flex; text-align: center; justify-content: center; font-size: 50upx;">订单已完成</view>
			<view class="grace-title grace-margin-top" style="display: flex; text-align: center; justify-content: center; font-size: 50upx;">请评价一下您的师傅吧</view>
		<view class="grace-title grace-margin-top" style="display: flex; text-align: center; justify-content: center; font-size: 50upx;">满意</view>
		<view style="width:480rpx; margin:0 auto; display: flex; justify-content: center;">
			<graceStar :starnum="currentStarNum2" :totalstars="5" activecolor="#E76B61" fontSize="60rpx" v-on:starchange="starchange"></graceStar>
		</view>
	<view class="demo">
				<view class="grace-tags-large">速度快</view>
				<view class="grace-tags-large">责任心</view>
				<view class="grace-tags-large">好沟通</view>
				<view class="grace-tags-large">专业性</view>
				<view class="grace-tags-large">态度好</view>
				<view class="grace-tags-large">做事认真</view>
			</view>
			
		<view class="uni-textarea" style="border-radius: 50upx; width: 80%; display: flex; margin-left: 50upx;">
			<textarea
				placeholder="写其他的意见及建议"
				style="width: 90%; color: #000000; height: 150px;  "
			/>
		</view>	
		<button type="primary" style="border-radius: 50upx; background-color: #00C456;  margin-top: 50upx;">保存</button>
	</view>

</template>

<script>
	import graceStar from "../../graceUI/components/graceStar.vue";
	export default {
		data() {
			return {
				currentStarNum1: 1,
				currentStarNum2: 3
			}
		},
		onLoad: function() {
			// 延迟模拟网络请求改变星标
			setTimeout(function() {
				this.currentStarNum1 = 4;
			}.bind(this), 1000);
		},
		methods: {
			starchange: function(e) {
				console.log(JSON.stringify(e));
				this.currentStarNum2 = e;
				uni.showToast({
					title: e + "星",
					icon: "none"
				})
			}
		},
		components: {
			graceStar
		}
	}
</script>

<style>
	.demoforcapsule .grace-capsule{margin:10rpx;}
	.demo view{margin:50rpx;}
	.demo text{margin:50rpx;}
</style>
