<template>
	<view>
		<view style="text-align: center;font-size: 50upx; color: #00C456;">----升级会员特权----</view>
		<view style="margin-top: 100upx;">
		<view>1.可绑定企业子账号，查看子账号下单明细及订单金额</view>
		<view>2.可免费获取。。。。</view>
		</view>
		<view style="display: flex; flex-direction: row; margin-top: 100upx;">
			<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;" @tap="goDetailPage('my/new_user')">提交申请</button>
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
		goDetailPage(e) {
		    let path = e.url ? e.url : e;
		    let url = ~path.indexOf('platform') ? path : '/pages/' + path;
		    uni.navigateTo({
		        url: url
		    });
		    return false;
		}
		}
	};
</script>

<style>
	
</style>
