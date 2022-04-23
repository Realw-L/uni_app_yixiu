<template>
	<view>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<!-- #ifdef MP-WEIXIN -->
					<view style="display: flex;justify-content: center; margin-top: 100upx; flex-direction: column;">
						<image src="../../../static/200.png" mode="" style="width: 200upx; height: 200upx;"></image>

						<!-- 如果只是展示用户头像昵称，可以使用 <open-data /> 组件 -->
						<view
							style=" margin-top: 50upx;display: flex;flex-direction: column; justify-content: center;align-items: center;width: 200px;height: 200px; align-self: center;"
						>
							<open-data type="userAvatarUrl"></open-data>
							<open-data type="userNickName"></open-data>
						</view>
					</view>

					<!-- 需要使用 button 来授权登录 -->
					<button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="!mobile">授权手机</button>
					<button wx:if="canIUse&&mobile" type="primary" open-type="getUserInfo" withCredentials="true" @getuserinfo="onMinProgramLogin">授权登录</button>
					<!-- <view wx:else>请升级微信版本</view> -->

					<!-- #endif -->

					<!-- #ifndef MP-WEIXIN -->
					<view style="display: flex;justify-content: center;"><image src="../../../static/200.png" mode="" style="width: 200upx; height: 200upx;"></image></view>
					<view class="uni-list">
						<view class="uni-list-cell" style="">
							<image src="../../../static/x.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input class="uni-input" name="mobile" :value="mobile" type="text" @input="onInputMobile" placeholder="请输入您的手机号码" maxlength="11" />
							<image src="../../../static/y.png" mode="" style="width: 50upx; height: 50upx;" @tap="onClearMobile"></image>
						</view>
					</view>
					<view class="uni-list" style="margin-top: 50upx;">
						<view class="uni-list-cell">
							<image src="../../../static/o.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input class="uni-input" name="password" type="password" placeholder="请输入密码" @input="onInputPassword" />
						</view>
					</view>

					<!-- #endif -->

					<view class="uni-btn-v uni-common-mt" style="margin-top: 100upx;">
						<!-- #ifndef MP-WEIXIN -->
						<button class="btn-submit" formType="submit" type="primary" style="background-color: #09BB07; border-radius: 50upx;">{{ button_title }}</button>
						<!-- <button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">用户信息</button> -->
						<!-- #endif -->

						<!-- #ifndef MP-WEIXIN -->
						<view style="display: flex;  justify-content: center;">
							<button style="color: #a2a2a2; font-size: 25upx; height: 60upx;" @tap="goDetailPage('/pages/my/reg/reg')">立即注册</button>
							<button style="color: #a2a2a2; margin-left: 300upx; font-size: 25upx; height: 60upx;" @tap="goDetailPage('/pages/my/pwd/forget_password')">
								忘记密码
							</button>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</form>

			<!-- #ifndef MP-WEIXIN -->
			<view class="grace-title" style="margin-top:30px; display: flex; justify-content: center;"><view class="grace-h5 grace-blod grace-center" style="color:#20A33A">第三方登录</view></view>
			<view class="grace-login-three" style="margin-top:8px; display: flex; justify-content: center; margin-left: 80upx;">
				<view class="grace-login-three-items grace-icons icon-weixin" style="color: #20A33A; width: 150upx; height: 150upx; font-size: 70upx;" @tap="onLoginWechat"></view>
				<view class="grace-login-three-items grace-icons icon-qq" style="color: #20A33A;  width: 150upx; height: 150upx; font-size: 70upx;" @tap="onLoginAlipay"></view>

				<!-- <view class="grace-iconfont icon-weibo" style="color: #20A33A;" @tap="loginWithWeibo"></view> -->
			</view>

			<!-- 	<view @tap="closeBanner" style="margin-top: -70upx;">
				<view class="uni-banner" v-if="bannerShow" style="margin-top:-90upx;">
					<view style="justify-content:flex-end; ,">
						<view style="justify-content:flex-end; text-align:right; padding:20upx; margin-right: -70upx;  "><text class="uni-icon uni-icon-close"></text></view>
					</view>
					<view><image src="../../../static/tanchuang.png" style="width:750upx; height: 1200upx;  margin-left: -100upx;" mode="widthFix" @tap="toast1Tap"></image></view>
				</view>
				<view class="uni-mask" v-if="bannerShow"></view>
				
			</view> -->
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
import util from '../../../common/util.js';
//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
var graceChecker = require('../../../common/graceChecker.js');
var _self = null;
export default {
	data() {
		return {
			title: '表单验证',
			mobile: '',
			password: '',
			bannerShow: true,
			amapPlugin: null,
			key: '',
			addressName: 'dc7308aaa968352dd30c4d19b45d27f5',
			weather: {
				hasData: false,
				data: []
			},
			allAddress: '',
			open_id: '',
			unionid: '',
			button_title: '登录',
			login_type: '',
			canIUse: uni.canIUse('button.open-type.getUserInfo'),
			mobile: ''
		};
	},
	onLoad(option) {
		_self = this;
		console.debug('option:' + JSON.stringify(option));
		if (option) {
			this.mobile = option.mobile;
		}
		//coupon_got:  0 未领取  1 拒绝领取 2 有领取意向  3 已成功。
		var got = uni.getStorageSync('coupon_got');
		// this.bannerShow = got < 1; //alway canncel 

		// this.amapPlugin = new amap.AMapWX({
		// 	key: this.key
		// });

		// #ifdef MP-WEIXIN
		//微信小程序登录
		// 查看是否授权
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						success: function(res) {
							console.log(res.userInfo);
						}
					});
				}
			}
		});
		// #endif
	},
	onBackPress() {
		if (this.bannerShow) {
			this.bannerShow = false;
			return true;
		}
	},
	onShow() {
		// #ifdef APP-PLUS

		/* 隐藏凸起图标 */
		var icon = plus.nativeObj.View.getViewById('icon');
		setTimeout(function() {
			icon.hide();
		}, 100);
		// #endif
	},
	methods: {
		getPhoneNumber: function(e) {
			console.debug(e);

			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log('getProvider:' + JSON.stringify(res));
					console.log(res.provider);

					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log(JSON.stringify(loginRes));
								util.GET('user/public/wxmin_code2session', { code: loginRes.code }, function(data) {
									console.info(JSON.stringify(data));

									if (data.status == 1) {
										_self.open_id = data.openid;
										_self.unionid = data.unionid;
										uni.setStorageSync('open_id', data.openid);
										uni.setStorageSync('unionid', data.unionid);
										uni.setStorageSync('session_key', data.session_key);

										// encryptedData
										var session_key = uni.getStorageSync('session_key');
										_self.wxmin_get_bizdata(e.detail.encryptedData, e.detail.iv, session_key);
									}
								}); //end get
							}
						}); //end login
					}
				}
			}); //end provider
		},
		wxmin_get_bizdata: function(encrypted_data, iv, session_key) {
			util.POST('user/public/decode_bizdata_wxmini', 
			{ encrypted_data: encrypted_data, iv: iv, session_key: session_key },
			 function(data) {
				console.info(JSON.stringify(data));

				if (data.status == 1) {
					//phoneNumber
					var obj = JSON.parse(data.content);
					if (obj) {
						_self.mobile = obj.phoneNumber;
					}
				}
			}); //end get
		},
		wxmin_code2session: function(code) {
			util.GET('user/public/wxmin_code2session', { code: code }, function(data) {
				console.info(JSON.stringify(data));

				if (data.status == 1) {
					_self.open_id = data.openid;
					_self.unionid = data.unionid;
					uni.setStorageSync('open_id', data.openid);
					uni.setStorageSync('unionid', data.unionid);
					uni.setStorageSync('session_key', data.session_key);
				}
			}); //end get
		},
		requestAuthLogin: function() {
			//再登录
			util.POST('user/public/auth_login', 
			{ bind_type: 'wechat_min', open_id: _self.open_id, unionid: _self.unionid }, 
			function(data) {
				console.info(JSON.stringify(data));

				if (data.status == 1) {
					util.pushBind();
					// uni.setStorageSync('user_info', _self.user);
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					});

					uni.setStorageSync('login_status', 1);
					uni.setStorageSync('user_id', data.id);
					uni.setStorageSync('actor_type', 0); // default is user
					uni.setStorageSync('token', data.token);
					uni.setStorageSync('user_info', data);

					//
					if (!data.mobile) {
						_self.synUserInfo(); //update
					} else {
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/home/index'
							});
						}, 1000);
					}
				} else if (data.status == 2) {
					//
					// _self.button_title = '绑定';

					_self.synUserInfo(); //update
				}
			}); //end post
		},
		onMinProgramLogin: function(e) {
			console.debug(e);
			uni.setStorageSync('wxmin_userinfo', e.detail.userinfo);
			
			uni.getSetting({
				success(res) {
					console.log('getSetting:' + JSON.stringify(res));

					if (!res.authSetting['scope.userInfo']) {
						wx.authorize({
							scope: 'scope.userInfo',
							success() {
								// 用户已经同意小程序使用功能，后续调用 不会弹窗询问
								console.log('用户已经同意小程序使用功能，后续调用 不会弹窗询问');
							}
						});
					}
				}
			});

			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log('getProvider:' + JSON.stringify(res));
					console.log(res.provider);

					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log(JSON.stringify(loginRes));
								_self.wxmin_code2session(loginRes.code);


								

								_self.requestAuthLogin();
								
							}
						}); //end login
					}
				}
			}); //end provider
		},
		// onGotUserInfo: function(res) {
		// 	console.log(res);
		// },

		synUserInfo: function() {
			/*avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/Zg5dRmTVAuPsGZmib5huYWoz95n5iaIa01IslDNwzTBxLTDA29JD7biamncVklC2gRMkzrda1pT23eXiboqEH6TL0Q/132"
				city:"Shenzhen"
				country:"China"
				gender:1
				language:"zh_CN"
				nickName:"huamoran"
				province:"Guangdong"
			*/

			var info = uni.getStorageSync('wxmin_userinfo');
			var dataForm = {
				username: _self.mobile,
				mobile: _self.mobile,
				user_mobile: _self.mobile,
				
				nickname: info.nickName,
				gender: info.gender
			};

			//update

			console.debug('data form：' + JSON.stringify(dataForm));

			util.POST('user/syn_update', dataForm, function(data) {
				if (data.status == 1) {
					console.debug(JSON.stringify(data));

					// 		uni.showToast({
					// 			title: '资料更新成功',
					// 			icon: 'success',
					// 			duration: 1000
					// 		});
					//

					setTimeout(function() {
						uni.switchTab({
							url: '/pages/home/index'
						});
					}, 1000);
				}
			});
		},
		onLoginWechat() {
			this.login_type = 'wechat';
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					//openid
					//{"access_token":"20_pZXhPPRdn-ntzbyey95HbQA5i98zfDO_FOQVn6x8lT7fJsLZHQ0LC2oj7eiInG_SY4sFpsu4pN9PFKX9sNmgB5_1dBDgTZpOXqfLplJEePI","expires_in":7200,"refresh_token":"20_Cg56fmzWPT741yohzRW77DjlojdTMDR1Mi1ovju7DSgziSb6yBoQ9cicFn4Ho0SYoSH0n4U9k5oi742Lve6xUpEe7vi19s1JQopDrLWsxTk","openid":"ofLhf5kxxnqb_tfup22wvPFuMa0U","scope":"snsapi_userinfo","unionid":"oLHPs56Mg4OoB0D78NZHUMAhQL-o"}
					console.log(JSON.stringify(loginRes.authResult));
					_self.open_id = loginRes.authResult.openid;

					util.POST('user/public/auth_login', { bind_type: 'wechat', open_id: _self.open_id }, function(data) {
						console.info(JSON.stringify(data));

						if (data.status == 1) {
							util.pushBind();
							// uni.setStorageSync('user_info', _self.user);
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							});

							uni.setStorageSync('login_status', 1);
							uni.setStorageSync('user_id', data.id);
							uni.setStorageSync('actor_type', 0); // default is user
							uni.setStorageSync('token', data.token);
							uni.setStorageSync('user_info', data);

							setTimeout(function() {
								uni.switchTab({
									url: '/pages/home/index'
								});
							}, 1000);
						} else if (data.status == 2) {
							//
							_self.button_title = '绑定';
						}
					}); //end post
				}
			});
		},
		onLoginAlipay() {
			this.login_type = 'alipay';
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

								util.POST('user/public/auth_login', { bind_type: 'alipay', open_id: _self.open_id }, function(data) {
									console.info(JSON.stringify(data));

									if (data.status == 1) {
										util.pushBind();
										// uni.setStorageSync('user_info', _self.user);
										uni.showToast({
											title: '登录成功',
											icon: 'none'
										});

										uni.setStorageSync('user_info', data);
										setTimeout(function() {
											uni.switchTab({
												url: '/pages/home/index'
											});
										}, 1000);
									} else {
										uni.showToast({
											title: data.message,
											icon: 'none'
										});
									}
								}); //end post
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

		toast1Tap: function() {
			uni.showToast({
				title: '领取成功，请进行注册！',
				image: '../../static/222.png'
			});

			//coupon_got:  0 未领取  1 拒绝领取 2 有领取意向  3 已成功。
			uni.setStorageSync('coupon_got', 2);

			uni.navigateTo({
				url: '/pages/my/reg/reg'
			});
		},

		closeBanner: function() {
			this.bannerShow = false;
		},
		showBanner: function() {
			this.bannerShow = true;
		},
		goDetailPage(page) {
			// console.info(e);
			//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
			uni.navigateTo({
				// url: url
				url: page
			});
		},
		onInputMobile(e) {
			this.mobile = e.detail.value;
		},
		onInputPassword(e) {
			this.password = e.detail.value;
		},
		onClearMobile(e) {
			console.log(e);
			this.mobile = '';
		},

		onSignin(username, password) {
			var self = this;
			var reqData = { mobile: username, password: password };
			if (_self.button_title == '绑定') {
				reqData.open_id = this.open_id;
				reqData.bind_type = self.login_type;
			}

			util.POST('user/signin', reqData, function(data) {
				console.info(JSON.stringify(data));
				if (data.status == 1) {
					self.user = data;
					self.user.avatar = self.user.avatar;

					uni.setStorageSync('login_status', 1);
					uni.setStorageSync('user_id', self.user.id);

					uni.setStorageSync('actor_type', 0); // default is user

					uni.setStorageSync('token', data.token);
					uni.setStorageSync('user_info', self.user);

					//coupon_got:  0 未领取  1 拒绝领取 2 有领取意向  3 已成功。
					var got = uni.getStorageSync('coupon_got');
					if (got == 2) {
						// 暂时取消发放
						//self.onGetCoupons();
					}

					// if (self.user.jpush_id == '') {
					util.pushBind(); //ervery time need, maybe change the device.
					// }

					// 			uni.navigateBack({
					// 			            delta: 1,
					// 			          })
					uni.switchTab({
						url: '/pages/home/index'
					});
				} else {
					uni.showToast({
						title: data.message,
					})
				}
			});
		},

		onGetCoupons() {
			var self = this;
			//singin auto reg
			util.POST(
				'coupon/getCoupon',
				{
					coupon: 1,
					group: 1
				},
				function(data) {
					console.info('handle:' + JSON.stringify(data));
					if (data.status == 1) {
						//coupon_got:  0 未领取  1 拒绝领取 2 有领取意向  3 已成功。
						uni.setStorageSync('coupon_got', 3);

						//syn coupon
						uni.setStorageSync('user_id', self.user.id);

						uni.navigateTo({
							url: '/pages/my/coupon'
						});
					} else {
						// uni.showToast({ title: data.message, icon: 'none' });
					}
				},
				function(data) {
					uni.setStorageSync('coupon_got', 3);
					return false; //continue
				}
			);
		},
		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{ name: 'password', checkType: 'string', checkRule: '6,12', errorMsg: '密码应为6-12个字符' },
				//{name:"mobile", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
				{ name: 'mobile', checkType: 'string', checkRule: '11,14', errorMsg: '手机号为11位数' }
			];
			//进行表单检查
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				// uni.showToast({title:"验证通过!", icon:"none"});
				this.onSignin(this.mobile, this.password);
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		}
	}
};
</script>

<style>
/* 遮罩层 */
.uni-mask {
	background: rgba(0, 0, 0, 0.6);
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 1;
}

/* 弹出层形式的广告 */
.uni-banner {
	width: 70%;
	position: fixed;
	left: 50%;
	top: 50%;
	border-radius: 10 upx;
	z-index: 99;
	transform: translate(-50%, -50%);
}
</style>
