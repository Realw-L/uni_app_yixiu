<template>
	<view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list">
					<view style="display: flex; justify-content: center;">
						<view class="uni-title">邮箱：</view>
						<input type="text" name="youxiang" placeholder="请输入邮箱" style="margin-top: 15upx;" />
						<view style="margin-top: 10upx;">
							<button class="mini-btn" type="default" size="mini" style="background-color: #007AFF; color: #FFFFFF;">发送验证码</button>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view style="display: flex; justify-content: center; margin-left: -90upx;">
						<view class="uni-title">验证码：</view>
						<input type="text" name="youxiang" placeholder="请输入验证码" style="margin-top: 15upx;" />
						<view style="margin-top: 10upx;"><button class="mini-btn" type="default" size="mini" style="background-color: #007AFF; color: #FFFFFF;">提交</button></view>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			title: '邮箱认证'
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
.cell-pd {
	padding: 22upx 30upx;
}

.list-pd {
	margin-top: 50upx;
}
</style>
