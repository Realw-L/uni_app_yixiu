<template>
	<view>
		<view class="uni-common-mt">
			<view style="display: flex; justify-content: center; margin-top: -50upx;">
				<image src="../../static/back.jpg" mode="" style="width: 800upx;height: 300upx;"></image>
			</view>
			<view style="display: flex; justify-content: center; margin-top: -180upx;">
<image src="../../static/huiyuanka.png" mode="" style="width: 550upx;height: 250upx;"></image>
			</view>
			<view style="text-align: center; display: flex; flex-direction: column; margin-top: 50upx;">
				<button class="mini-btn" type="default" size="mini"  style="background-color: #6eae3d; height: 70upx; padding-top: 10upx;color: #ffffff; font-family: 微软雅黑; "  @click="showSinglePicker">
					立即购买</button>
				<text style="font-size: 50upx; font-family: 微软雅黑; color:#6eae3d;">888会员</text>
				<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
				 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
				<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
				 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
			</view>
				<view  style="display: flex; justify-content: center;">
			<view style=" display: flex; flex-direction: column; margin-top: 50upx; ">		
          <text style="font-size: 25upx; font-family: 微软雅黑; ">1.优先独享可服务城市订单；</text>
		  <text style="font-size: 25upx; font-family: 微软雅黑; ">2.使用平台提供的师傅资源；</text>
		  <text style="font-size: 25upx; font-family: 微软雅黑; ">3.接超过500元的订单；</text>
		  <text style="font-size: 25upx; font-family: 微软雅黑; ">4.师傅名片有相应标签及优推；</text>
		  <text style="font-size: 25upx; font-family: 微软雅黑; ">5.会员邀请好友入驻会员可返现金，邀请一个好友入驻成为<br>会员可返300元，邀请会员人数超过3人，会费全额退回</text>				 
		</view>
			</view>
			<view  style="display: flex; justify-content: center;">
				<view style=" display: flex; flex-direction: column; margin-top: 150upx; ">		
			  <text style="font-size: 25upx; font-family: 微软雅黑; color: #6db131; ">点击立即查看《会员权益条款》</text>				 
			</view>
				</view>
		</view>
	</view>
</template>
<script>
	// https://github.com/zhetengbiji/mpvue-picker
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	
	
	export default {
		components: {
			mpvuePicker,
			mpvueCityPicker
		},
		
		data() {
			return {
				title : "会员",
				pickerSingleArray: [{
						label: '购买会员',
						value: 1
					},
					{
						label: '支付宝',
						value: 2
					},
					{
						label: '账户余额：100.00',
						value: 3
					}
				],
				mulLinkageTwoPicker: cityData,
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[]
			};
		},
		methods: {
onCancel(e) {
				console.log(e)
			},
showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},


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
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}
</style>
