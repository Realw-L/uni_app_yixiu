<template>
	<view>
		<view class="grace-form-item  " style="display: flex;flex-direction: column;">
						<view class="grace-form-body" style="display: flex;flex-direction:column;border-radius: 20upx; background-color: #FFFFFF;padding: 50upx;">				
			<view class="grace-border-b">
				<input type="text"  name="name" placeholder="账号/手机号码"  maxlength="11"/>
			</view>
			<view style="display: flex;flex-direction: row; justify-content: space-between;margin-top: 15upx;">
				<input type="text"  name="name" placeholder="验证码"  maxlength="11"/>
				<text style="color: red;">获取验证码</text>
			</view>
						</view>			
					</view>
					<view style="display: flex; flex-direction: row; margin-top: 50upx;">
						<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;">绑定</button>
					</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		};
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
