<template>
	<view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list">
					<view style="display: flex; justify-content: center;">
						<view class="uni-title">微信号：</view>
						<input type="text" disabled="true" :value="open_id" placeholder="" style="border:0.5px solid #378888; margin-top: 15upx;" />
					</view>
					<button class="mini-btn" type="default" size="mini" style="background-color: #007AFF; color: #FFFFFF;" @tap="onUnbind" v-if="bind_status == true">解绑</button>
					<button class="mini-btn" type="default" size="mini" style="background-color: #007AFF; color: #FFFFFF;" @tap="onBind" v-else>绑定</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
import util from '@/common/util';
var _self = null;
export default {
	data() {
		return {
			title: '微信绑定',
			bind_status: false,
			open_id: '',
			user_info: null
		};
	},
	onLoad() {
		_self = this;
		this.user_info = uni.getStorageSync('user_info');
		if (this.user_info.wechat_id && this.user_info.wechat_id.length > 0) {
			this.bind_status = true;
			this.open_id = this.user_info.wechat_id;
		}
	},
	methods: {
		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		},
		onBind() {
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log(JSON.stringify(res));
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								//{"access_token":"20_pZXhPPRdn-ntzbyey95HbQA5i98zfDO_FOQVn6x8lT7fJsLZHQ0LC2oj7eiInG_SY4sFpsu4pN9PFKX9sNmgB5_1dBDgTZpOXqfLplJEePI","expires_in":7200,"refresh_token":"20_Cg56fmzWPT741yohzRW77DjlojdTMDR1Mi1ovju7DSgziSb6yBoQ9cicFn4Ho0SYoSH0n4U9k5oi742Lve6xUpEe7vi19s1JQopDrLWsxTk","openid":"ofLhf5kxxnqb_tfup22wvPFuMa0U","scope":"snsapi_userinfo","unionid":"oLHPs56Mg4OoB0D78NZHUMAhQL-o"}
								console.log(JSON.stringify(loginRes));
								_self.open_id = loginRes.authResult.openid;
								console.debug('open_id:', _self.open_id);

								_self.bindUser();
							}
						});
					} else {
						console.log('不支持的登录类型.');
						uni.showToast({
							title: '不支持的登录类型',
							icon: 'none'
						});
					}
				}
			});
		},

		onUnbind() {
			util.POST('user/info/auth_unbind', { bind_type: 'wechat' }, function(data) {
				console.info(JSON.stringify(data));

				if (data.status == 1) {
					// uni.setStorageSync('user_info', _self.user);
					uni.showToast({
						title: '解绑成功',
						icon: 'none'
					});
					_self.open_id = '';
					_self.bind_status = false;

					//update storage
					var user_info = uni.getStorageSync('user_info');
					if (user_info) {
						user_info.wechat_id = null;
						uni.setStorageSync('user_info', user_info);
					}
				}
			}); //end post
		},
		bindUser() {
			util.POST('user/info/auth_bind', { bind_type: 'wechat', open_id: this.open_id }, function(data) {
				console.info(JSON.stringify(data));

				if (data.status == 1) {
					// uni.setStorageSync('user_info', _self.user);
					uni.showToast({
						title: '绑定成功',
						icon: 'none'
					});
					_self.bind_status = true;
				}
			}); //end post
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
