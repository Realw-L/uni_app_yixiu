<template>
		<view>
		<view class="uni-header-logo" v-bind:style="{'margin-top':'0upx',height:'200upx', 'background-image':'url('+HOST+'/Public/app/back.jpg)'}">
			<view class="uni-flex" style="margin-top: 50upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 50upx;">
				<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
					<image  src="../../static/img/5.png" @tap="goDetailPage('my/face')" style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
				</view>
				<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 50upx;">
					<view class="text" style=" color: #000000; font-size:25upx; text-align: left;">用户名:师傅</view>
					<view class="text" style="  color: #000000; font-size:25upx; text-align: left;">积分:650分</view>
				</view>
				<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-left: 5upx; padding-left: 5upx; margin-top: 50upx;">
					<img src="../../static/img/5.png" alt="">
				</view>
			</view>
		</view>
		<view class="uni-flex uni-column" style="margin-top: 50upx; ">
			<view style="margin-left: 50upx; font-weight: 1000;">积分兑换商品</view>
			<view style="display: flex; justify-content: space-between; flex-direction:row;">
				<view style="display: flex; flex-direction: column;">
					<img src="../../static/img/gj.png"   alt="" style="width: 350upx; height: 350upx;">
					<view style="display: flex; justify-content: space-between;">
						<text>积分：1650分</text>
						<button class="mini-btn" type="default" size="mini" style="background-color: #00C456; color: #FFFFFF; border-radius: 50upx;" @tap="goDetailPage('my/money_changer')">兑换</button>
					</view>
				</view>
				<view style="display: flex; flex-direction: column;">
					<img src="../../static/img/gj.png"  alt="" style="width: 350upx; height: 350upx;">
					<view style="display: flex; justify-content: space-between;">
						<text>积分：1650分</text>
						<button class="mini-btn" type="default" size="mini" style="background-color: #00C456; color: #FFFFFF; border-radius: 50upx;" @tap="goDetailPage('my/money_changer')">兑换</button>
					</view>
				</view>
			</view>
			<view style="display: flex; justify-content: space-between; flex-direction:row;">
				<view style="display: flex; flex-direction: column;">
					<img src="../../static/img/gj.png" alt="" style="width: 350upx; height: 350upx;">
					<view style="display: flex; justify-content: space-between;">
						<text>积分：1650分</text>
						<button class="mini-btn" type="default" size="mini" style="background-color: #00C456; color: #FFFFFF; border-radius: 50upx;" @tap="goDetailPage('my/money_changer')">兑换</button>
					</view>
				</view>
				<view style="display: flex; flex-direction: column;">
					<img src="../../static/img/gj.png" alt="" style="width: 350upx; height: 350upx;">
					<view style="display: flex; justify-content: space-between;">
						<text>积分：1650分</text>
						<button class="mini-btn" type="default" size="mini" style="background-color: #00C456; color: #FFFFFF; border-radius: 50upx;" @tap="goDetailPage('my/money_changer')">兑换</button>
					</view>
				</view>
			</view>
		</view>
		</view>
</template>
<script>
	import util from '@/common/util.js';
	
	
	var _self = null;
	export default {
		data() {
			return {
			HOST: this.$util.HOST,
			};
		},

		methods:{
			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '/pages/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			},
		}
	}
</script>
<style>
.grace-list .items .title{height:auto; overflow:hidden; padding:10px 30px 10px 0;}
.grace-list .title text{float:none; margin-left:12px;}
.grace-address-list-name{font-weight:700; line-height:1.8em;}
.grace-address-list-info{line-height:1.8em; color:#999999;}
.grace-list .items .arrow-right{font-family:"grace-iconfont" !important; font-size:36rpx; font-style:normal; height:56px; line-height:56px; text-align:center; width:30px; position:absolute; z-index:1; right:8px; top:0px;}
.grace-list .items .arrow-right:before{content:"\e69e"; color:#B2B2B2;}
</style>