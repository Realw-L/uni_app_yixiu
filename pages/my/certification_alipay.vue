<template>
	<view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list">
						<view style="display: flex; justify-content: center;">
						<view class="uni-title">支付宝帐号：</view>
						<input type="text" disabled="true" name="youxiang" placeholder="" style="border:0.5px solid #378888; margin-top: 15upx;" >
						</view>
						<button class="mini-btn" type="default" size="mini" style="background-color: #007AFF; color: #FFFFFF;" @tap="onUnbind" v-if="bind_status==true">解绑</button>
						<button class="mini-btn" type="default" size="mini" style="background-color: #007AFF; color: #FFFFFF;" @tap="onBind" v-else>绑定</button>
				</view>
				
			</form>
		</view>
	</view>
</template>
<script>
	import util from '@/common/util'
	// import test from '@/common/test.js'
	
	var _self = null;
	export default {
		data() {
			return {
				title: '支付宝绑定',
				bind_status: false,
				open_id:'',
			}
		},
		onLoad() {
			_self = this;
			
		},
		methods: {
			
				goDetailPage(e) {
					let path = e.url ? e.url : e;
					let url = ~path.indexOf('platform') ? path : '/pages/' + path ;
					uni.navigateTo({
						url: url
					});
					return false;
				},
				onBind(){
					//use customer
					 plus.plugintest.PluginTestFunction("Html5","Plus","AsyncFunction","MultiArgument!", function( result ) {alert( result[0]  + "_" + result[1]  + "_" + result[2]  + "_" + result[3] );},function(result){alert(result)});
					 

					
					return
					
					
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							console.log(JSON.stringify(res));
							if (~res.provider.indexOf('alipay')) {
								
								uni.login({
									provider: 'alipay',
									success: function(loginRes) {
										console.log(JSON.stringify(loginRes));
										_self.open_id = loginRes.open_id;
										
										_self.bindUser();
									}
								});
							}else{
								console.log('不支持的登录类型.');
								uni.showToast({
									title:'不支持的登录类型',
									icon:'none'
								});
							}
						}
					});
				},
				onUnbind(){
					
					util.POST('user/info/auth_unbind', { bind_type: 'alipay'}, function(data) {
						console.info(JSON.stringify(data));
					
						if (data.status == 1) {
							
							// uni.setStorageSync('user_info', _self.user);
							uni.showToast({
								title:'解绑成功',
								icon:'none'
							});
							_self.bind_status = false;
							_self.open_id = '';
							//update storage
							var user_info = uni.getStorageSync('user_info');
							if(user_info){
								user_info.alipay_id = null;
								uni.setStorageSync('user_info', user_info);
							}
							
						}
					}); //end post
				},
				bindUser(){
					
					util.POST('user/info/auth_bind', { bind_type: 'alipay', open_id: this.open_id }, function(data) {
						console.info(JSON.stringify(data));
					
						if (data.status == 1) {
							
							// uni.setStorageSync('user_info', _self.user);
							uni.showToast({
								title:'绑定成功',
								icon:'none'
							});
							_self.bind_status = true;
						}
					}); //end post
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
