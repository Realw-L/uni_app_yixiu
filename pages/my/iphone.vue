<template>
	<view>
		<view class="grace-form-item">
						<view class="grace-form-body" style="display: flex;flex-direction: row;border-radius: 50upx; background-color: #FFFFFF;padding: 30upx;">
						<text >手机号码</text>					
			<input type="text"  name="name" placeholder="+86"  maxlength="11"/>
						</view>		
					</view>
					<view style="display: flex; flex-direction: row; margin-top: 50upx;">
						<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;">确定</button>
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
