<template>
	<view>
		<view style="text-align: center;font-size: 50upx; color: #00C456;">----升级会员特权----</view>
		<view style="margin-top: 100upx;">
		<view>1.可绑定企业子账号，查看子账号下单明细及订单金额</view>
		<view>2.可免费获取。。。。</view>
		</view>
		<view style=" text-align: center; width: 450upx; margin-top: 100upx;background-color: #00FFD5; border: 5upx solid #00FFD5; border-radius: 10upx; margin-left: 130upx; ">
			<text style="text-align: center;">申请提交成功，后台审核需要2-3个工作日，请耐心等待</text>
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
		
		onNavigationBarButtonTap(e) {
			uni.navigateTo({ url:'/pages/my/guanliyuan'});
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
