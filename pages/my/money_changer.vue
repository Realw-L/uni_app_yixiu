<template>
	<view>
		<view style="display: flex; justify-content: space-between; flex-direction: column;">
			<view >
				<view style="display: flex;align-items: center;">
					<view class="uni-title" style="width: 210upx; margin-left: 10upx;">姓名：</view>
					<input type="text" name="company" placeholder="请输入姓名" style="border:0.5upx solid #09BB07; border-radius: 50upx; width: 500upx; "  />
				</view>
			</view>
			<view>
				<view style="display: flex;align-items: center;">
					<view class="uni-title" style="width: 210upx; margin-left: 10upx;">联系电话：</view>
					<input type="text" name="company" placeholder="请输入电话" style="border:0.5upx solid #09BB07; border-radius: 50upx; width: 500upx; " />
				</view>
			</view>
			<view >
				<view style="display: flex;align-items: center;">
					<view class="uni-title" style="width: 210upx; margin-left: 10upx;">地址：</view>
					<input type="text" name="company" placeholder="请输入详细地址" style="border:0.5upx solid #09BB07; border-radius: 50upx; width: 500upx; "  />
				</view>
			</view>
		</view>
		<view style="display: flex; justify-content: center;">
			<button  type="primary" class="grace-button"  style="background-color: #00C456; color: #FFFFFF; border-radius: 20upx; width: 700upx; margin-top: 250upx;">确认兑换</button>
		</view>		
	</view>
</template>

<script>
export default {
	data() {
		return {};
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

<style></style>
