<script>

	
	export default {
		onLaunch: function () {
			console.log('App Launch');
			if(process.env.NODE_ENV === 'development'){ //run
			    console.log('开发环境')
			}else{ //release
			    console.log('生产环境')
			}
			
			//#ifdef APP-PLUS
			/* 5+环境锁定屏幕方向 */
			plus.screen.lockOrientation('portrait-primary'); //锁定
			/* 5+环境升级提示 */
			var server = "https://uniapp.dcloud.io/update"; //检查更新地址
			var req = { //升级检测数据
				"appid": plus.runtime.appid,
				"version": plus.runtime.version,
				"imei": plus.device.imei
			};
			uni.request({
				url: server,
				data: req,
				success: (res) => {
					console.log("success"+ JSON.stringify(res));
					if (res.statusCode == 200 && res.data.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
						uni.showModal({ //提醒用户更新
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
							success: (res) => {
								if (res.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						})
					}
				}
			}) //end req
			
// 			//location
// 			uni.getLocation({
// 				type: 'wgs84',
// 				success: function(res) {
// 					console.debug('getLocation：' + JSON.stringify(res))
// 					console.log('当前位置的经度：' + res.longitude)
// 					console.log('当前位置的纬度：' + res.latitude)
// 			
// 					
// 					
// 					//save local gps
// 					uni.setStorageSync('local_gps', res.longitude+','+res.latitude)
// 					uni.setStorageSync('local_gps_longitude', res.longitude)
// 					uni.setStorageSync('local_gps_latitude', res.latitude)
// 					
// 					// _self.GetLocalCity(res.longitude+","+res.latitude ,"")
// 				},
// 			});
			
			
			//push 
			uni.getProvider({
				service: 'push',
				success: function (res) {
					console.log(res.provider)

					// 个推的名称为 igexin
					if (~res.provider.indexOf('igexin')) {
						uni.subscribePush({
							provider: 'igexin',
							success: function (res) {
								console.log('push subscribe success:' + JSON.stringify(res));
								
								uni.setStorageSync('push_info', res)
							}
						});
					} //end if
					
					uni.onPush({
						provider: 'igexin',
						success: function () {
							console.log('监听透传成功');
						},
						callback: function (data) {
							
							
							console.log("接收到透传数据：" + JSON.stringify(data));
						}
					});
					0
				}
			});

			//#endif
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>
<style>
	@import "./graceUI/graceUI.css";
	@import "./graceUI/graceIcons.css";
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/uni.css";
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color:#F4F5F6;
		height: 100%;
		font-size:28upx;
		line-height: 1.8;
	}
	.uni-header-logo{
		padding:30upx;
		text-align:center;
		margin-top:10upx;
	}
	.uni-header-logo image{
		width: 140upx;
		height: 140upx;
	}
	
	.uni-hello-addfile{
		text-align:center; 
		line-height:300upx;
		background:#FFF;
		padding:50upx;
		margin-top:10px;
		font-size:38upx;
		color:#808080;
	}

</style>