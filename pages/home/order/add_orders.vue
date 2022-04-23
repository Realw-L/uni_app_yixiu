<template>
	<view style="color: #AAAAAA;">
		<view><text>服务说明:</text></view>
		<view><text>1、专业围挡搭建，店铺拆除、店铺复尺、店铺维修、广告招牌、安转等服务。</text></view>
		<view><text>2、以上服务不包括搬运费、垃圾清运、运输费等。</text></view>
		<view><text>3、为了保障您的合法权益和服务质量，避免不必要的损失，请您且勿与师傅私下交易（我们无法对私下交易提供安全和质量保障），感谢支持。</text></view>
		<view><text>4、总费用=人工费+材料费（用户提供材料的则不加材料费）+交通费</text></view>
		<view><text>5、维修后同一部位故障报修1个月。</text></view>
		<view><text>6、动物破坏、电源问题、进水、人为因素、外观、私自找师傅维修部提供售后保障。</text></view>
		<view><text>7、如您有任何疑问，可随时致电客服：400-806-2355 我们将第一时间为你服务。</text></view>
		<view>
			<view style="margin-top: 20upx;"><text>服务流程：</text></view>

			<view style="display: flex; justify-content: space-between;">
				<view style="display: flex; flex-direction: column;">
					<image src="../../../static/60x60.png" mode="" style="width: 250upx; height: 250upx;"></image>
					<text>在线下单</text>
				</view>
				<view style="display: flex; flex-direction: column;">
					<image src="../../../static/60x60.png" mode="" style="width: 250upx; height: 250upx;"></image>
					<text>勘察报价</text>
				</view>
			</view>
			<view style="display: flex; justify-content: space-between;">
				<view style="display: flex; flex-direction: column;">
					<image src="../../../static/60x60.png" mode="" style="width: 250upx; height: 250upx;"></image>
					<text>在线下单</text>
				</view>
				<view style="display: flex; flex-direction: column;">
					<image src="../../../static/60x60.png" mode="" style="width: 250upx; height: 250upx;"></image>
					<text>勘察报价</text>
				</view>
			</view>
		</view>
		<view><text>服务说明:</text></view>
		<view><text>1、您下单成功后。十分钟内会有周围的师傅为您报价，确定服务时间。</text></view>
		<view><text>2、订单完成后，请上传现场施工图及验收单（在完成的订单里上传）</text></view>
		<view><text>3、如您有任何疑问。可随时致电客服：400-806-2355 我们将第一时间为您服务。</text></view>
		<view style="display: flex; flex-direction: column;">
			<view style="display: flex;justify-content: center;"><text>我们的承诺:</text></view>
			<view style="display: flex; justify-content: space-between;">
				<view style="border: 1upx solid #AAAAAA; width: 150upx; height: 150upx; border-radius: 50%;"><text style="color: #000000;">省时</text></view>
				<view style="border: 1upx solid #AAAAAA; width: 150upx; height: 150upx; border-radius: 50%;"><text style="color: #000000;">省力</text></view>
				<view style="border: 1upx solid #AAAAAA; width: 150upx; height: 150upx; border-radius: 50%;"><text style="color: #000000;">省心</text></view>
				<view style="border: 1upx solid #AAAAAA; width: 150upx; height: 150upx; border-radius: 50%;"><text style="color: #000000;">有保障</text></view>
			</view>
		</view>
		<view style="display: flex; flex-direction: row; margin-top: 50upx;">
			<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;" @tap="goDetailPage('home/order/add_order')">知道了</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	components: {},
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

<style></style>
