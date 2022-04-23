<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-common-mt">
				<view style="display: flex; justify-content: center; border:0.5px solid #8bc21f; border-radius: 20upx; width: 650upx; margin-left: 50upx;">
					<view class="uni-title" style="width: 250upx;">金额（￥）：</view>
					<input type="number" name="price" placeholder="请输入充值金额" style=" margin-top: 15upx;" />
					<view class="uni-title" style="padding-left: 20upx;"></view>
				</view>
				<!-- #ifndef MP-WEIXIN -->

				<view>
					<view
						style="display: flex; flex-direction: row; margin-top: 50upx; margin-left: 50upx; background-color: #ffffff; padding-top: 10upx; padding-bottom: 10upx; padding-left: 50upx; width: 600upx;"
					>
						<image :src="HOST+'/Public/app/pay.png'" mode="" style="width:18%; height: 100upx; margin-top: 1upx;"></image>
						<view style="display: flex; flex-direction: column; margin-left: 25upx; margin-top: 2upx;">
							<text style="font-size: 30upx;">支付宝支付</text>
							<text style="font-size:15upx; width: 300upx;">推荐有支付宝的用户使用</text>
						</view>
					</view>
				</view>
				<!-- #endif -->
				<view>
					<view
						style="display: flex; flex-direction: row; margin-top: 25upx; margin-left: 50upx; background-color: #ffffff; padding-top: 10upx; padding-bottom: 10upx; padding-left: 50upx; width: 600upx;"
					>
						<image :src="HOST+'/Public/app/wechatt.png'" mode="" style="width:18%; height: 100upx; margin-top: 1upx;"></image>
						<view style="display: flex; flex-direction: column; margin-left: 25upx; margin-top: 2upx;">
							<text style="font-size: 30upx;">微信支付</text>
							<text style="font-size:15upx; width: 350upx;">推荐开通微信支付的用户使用</text>
						</view>
					</view>
				</view>
				<view style="display: none;">
					<view
						style="display: flex; flex-direction: row; margin-top: 25upx; margin-left: 50upx; background-color: #ffffff; padding-top: 10upx; padding-bottom: 10upx; padding-left: 50upx; width: 600upx;"
					>
						<image src="../../static/yinlianka.png" mode="" style="width:18%; height: 100upx; margin-top: 1upx;"></image>
						<view style="display: flex; flex-direction: column; margin-left: 25upx; margin-top: 2upx;">
							<text style="font-size: 30upx;">银行卡支付</text>
							<text style="font-size:15upx; width: 350upx;">推荐使用储蓄银行卡支付</text>
						</view>
					</view>
				</view>
				<view style="text-align: right;">
					<radio-group name="channel" style=" display: flex; flex-direction: column; margin-top: -320upx;  margin-left: -70upx;">
						<!-- 			<!-- <label>
              <radio value="1" style="color:#8bc21f; display: none;"/>
            </label> -->
						<label><radio value="2" style="margin-top: 90upx;" /></label>
						<label><radio value="3" style="margin-top: 90upx;" /></label>
					</radio-group>
				</view>
			</view>
			<view>
				<button
					class="btn-submit"
					formType="submit"
					type="primary"
					style="background-color: #09BB07; border-radius: 37upx; width: 90%; height: 80upx; margin-top: 500upx; font-size: 35upx;"
				>
					确认充值
				</button>
			</view>
		</form>
	</view>
</template>
<script>
import util from '@/common/util.js';

var graceChecker = require('@/common/graceChecker.js');
var self;
export default {
	data() {
		return {
			HOST: this.$util.HOST,
			title: '充值',
			loading: false,
			providerList: [],
			open_id: -1
		};
	},

	onLoad: function() {
		self = this;

		// #ifdef APP-PLUS
		uni.getProvider({
			service: 'payment',
			success: e => {
				console.log('payment success', e);
				this.providerList = e.provider.map(value => {
					switch (value) {
						case 'alipay':
							return {
								name: '支付宝',
								id: value,
								loading: false
							};
						case 'wxpay':
							return {
								name: '微信',
								id: value,
								loading: false
							};
					}
				});

				console.log('pay providerList' + JSON.stringify(this.providerList));
			},
			fail: e => {
				console.log('获取登录通道失败：', e);
			}
		});
		// #endif

		//get open id
		var openid = uni.getStorageSync('open_id');
		if (openid) {
			self.open_id = openid;
			return;
		}

		uni.login({
			provider: 'weixin',
			success: function(loginRes) {
				console.log(JSON.stringify(loginRes.authResult));
				//openid
				self.wxmin_code2session(loginRes.code);
				//{"access_token":"20_pZXhPPRdn-ntzbyey95HbQA5i98zfDO_FOQVn6x8lT7fJsLZHQ0LC2oj7eiInG_SY4sFpsu4pN9PFKX9sNmgB5_1dBDgTZpOXqfLplJEePI","expires_in":7200,"refresh_token":"20_Cg56fmzWPT741yohzRW77DjlojdTMDR1Mi1ovju7DSgziSb6yBoQ9cicFn4Ho0SYoSH0n4U9k5oi742Lve6xUpEe7vi19s1JQopDrLWsxTk","openid":"ofLhf5kxxnqb_tfup22wvPFuMa0U","scope":"snsapi_userinfo","unionid":"oLHPs56Mg4OoB0D78NZHUMAhQL-o"}
			}
		});
	},

	methods: {
		wxmin_code2session: function(code) {
			util.GET('user/public/wxmin_code2session', { code: code }, function(data) {
				console.info(JSON.stringify(data));

				if (data.status == 1) {
					self.open_id = data.openid;
					uni.setStorageSync('open_id', data.open_id);
				}
			});
		},
		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'price',
					checkType: 'between',
					checkRule: '0,99999999',
					errorMsg: '金额应大于零'
				},
				{
					name: 'channel',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '请选择支付渠道'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug('formData:' + JSON.stringify(formData));

			var checkRes = graceChecker.check(formData, rule);
			console.debug('check:' + checkRes);
			checkRes = true;
			if (checkRes) {
				//mini_app  : add params openid , and channel is 5
				// #ifdef MP-WEIXIN
				formData.channel = 5; // 5 is mini_app
				formData.open_id = self.open_id;
				// #endif

				//call pay
				// formData.price
				//this.onDeposit(formData);
				util.GET('account/deposit', formData, function(data) {
					console.info('handle:' + JSON.stringify(data));
					console.info('handle: formData' + JSON.stringify(formData));
					if (data.status == 1) {
						uni.showToast({ title: '正在充值' + formData.price + '元', icon: 'none' });

						//pay
						if (formData.channel == 2) {
							//alipay

							console.debug('alipay:' + data.content);
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: data.content, //订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.showToast({
										icon: 'none',
										title: '充值成功'
									});
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.showToast({
										icon: 'none',
										title: '充值失败' + err.errMsg
									});
								}
							});
						} else if (formData.channel == 3 || formData.channel == 5) {
							//wxpay
							console.log('得到接口prepay_id' + JSON.stringify(data));
							let paymentData = data.content;
							console.log('得到接口prepay_id content' + JSON.stringify(paymentData));

							uni.requestPayment({
								provider: 'wxpay',
								// #ifdef MP-WEIXIN
								timeStamp: paymentData.timeStamp,
								nonceStr: paymentData.nonceStr,
								// package: paymentData.package,
								package: paymentData.package,
								signType: paymentData.signType,
								paySign: paymentData.paySign,

								// #endif
								// #ifndef MP-WEIXIN
								orderInfo: data.content, //订单数据
								// #endif

								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									uni.showToast({
										icon: 'none',
										title: '充值成功'
									});
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
									uni.showToast({
										icon: 'none',
										title: '充值失败' + err.errMsg
									});
								}
							});

							// uni.requestPayment({
							//   timeStamp: paymentData.timeStamp,
							//   nonceStr: paymentData.nonceStr,
							//   package: paymentData.package,
							//   signType: 'MD5',
							//   paySign: paymentData.sign,
							//   success: res => {
							//     uni.showToast({
							//       title: '感谢您的赞助!'
							//     });
							//   },
							//   fail: res => {
							//     uni.showModal({
							//       content: '支付失败,原因为: ' + res.errMsg,
							//       showCancel: false
							//     });
							//   },
							//   complete: () => {
							//     this.loading = false;
							//   }
							// });
						} //end if

						// uni.switchTab({
						//   url: '/pages/home/index'
						// });
					} else {
						uni.showToast({ title: data.message, icon: 'none' });
					}
				});

				console.debug('onDeposit end');
			}
		},
		formReset: function(e) {
			console.log('清空数据');
		},
		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		},
		onDeposit(payObj) {
			console.debug('onDeposit');
			var self = this;
			//singin auto reg
			util.GET('account/deposit', payObj, function(data) {
				console.info('handle:' + JSON.stringify(data));
				console.info('handle: payObj' + JSON.stringify(payObj));
				if (data.status == 1) {
					uni.showToast({ title: '充值' + payObj.price + '请发起成功', icon: 'none' });

					//pay
					uni.requestPayment({
						provider: payObj.channel == 2 ? 'alipay' : 'wxpay',
						orderInfo: data.content, //订单数据
						success: function(res) {
							console.log('success:' + JSON.stringify(res));
						},
						fail: function(err) {
							console.log('fail:' + JSON.stringify(err));
						}
					});

					// uni.switchTab({
					//   url: '/pages/home/index'
					// });
				} else {
					uni.showToast({ title: data.message, icon: 'none' });
				}
			});
		},
		//////////////////////////////////////////////////////
		async requestPayment(e, index) {
			this.providerList[index].loading = true;
			let orderInfo = await this.getOrderInfo(e.id);
			console.log('得到订单信息', orderInfo);
			if (orderInfo.statusCode !== 200) {
				console.log('获得订单信息失败', orderInfo);
				uni.showModal({
					content: '获得订单信息失败',
					showCancel: false
				});
				return;
			}
			uni.requestPayment({
				provider: e.id,
				orderInfo: orderInfo.data,
				success: e => {
					console.log('success', e);
					uni.showToast({
						title: '感谢您的赞助!'
					});
				},
				fail: e => {
					console.log('fail', e);
					uni.showModal({
						content: '支付失败,原因为: ' + e.errMsg,
						showCancel: false
					});
				},
				complete: () => {
					this.providerList[index].loading = false;
				}
			});
		}
	}
};
</script>

<style>
.cell-pd {
	padding: 22 upx 30 upx;
}

.list-pd {
	margin-top: 50 upx;
}
</style>
