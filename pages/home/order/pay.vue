<template>
	<view class="page">
		<view class="uni-padding-wrap uni-common-mt">
			<view class="uni-card">
<!-- 				<view class="uni-card-content">
					<view class="uni-card-content-inner" style="padding-bottom: 0px;margin-top: 0px;display: flex; flex-direction: row;">
						<view class="uni-flex" style="display: flex; flex-direction: column;">
							<image src="../../../static/location@3x.png" mode="" style="width: 50upx; height: 50upx; margin-top: 100upx;"></image>
						</view>
						<view class="uni-flex" style="display: flex; flex-direction: column;">
							<text>订单号：123165132</text>
							<text>店铺名称：1321</text>
							<text>类目：标识广告<text>价格：￥90</text></text>
							<text>下单时间：2019-4-02 11：20：40</text>
							<text>施工日期：2019-4-02 11：20：40</text>
							<text>施工地址：腾讯大厦</text>
							<text>联系人：{{ order.contact }}</text>
							<text>{{ order.mobile }}</text>
							<text style="width: 500upx;">服务地址：{{ order.address }} {{ order.address_detail }}</text>
							<text style="width: 500upx; font-size: 28upx; color: #09BB07;">（如无法联系，可选择添加代理人）</text>
						</view>
						
					</view>
				</view> -->							
				<view class="uni-list">							
									<view class="uni-list-cell" hover-class="uni-list-cell-hover">
										<view class="uni-triplex-row">
											<view class="uni-triplex-left">
												<text class="uni-title uni-ellipsis">订单号：12121  </text>
												<text class="uni-text">店铺名称:123</text>
												<text class="uni-text">类目:标识广告<text>价格：</text><text style="color: red;">￥70</text></text>
												<text class="uni-text">下单时间: 2019-4-02 11：20：40</text>
												<text class="uni-text">施工日期：2019-4-02 11：20：40</text>
												<text class="uni-text-small uni-ellipsis">施工地址：腾讯大厦</text>
											</view>
											<view class="uni-triplex-right" style="width:120upx; center;display: flex;">
												<image src="../../../static/asd.png" mode="" style="width: 120upx; height: 120upx;"></image>
												<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">竞价</text>
												<text class="uni-h5" style="text-align: center; color: #ff0000; font-family:黑体; font-size: 25upx; margin-top: 15upx;">
													待服务
												</text>
											</view>
										</view>
									</view>
							</view>
<!-- 				<view class="uni-card" style="padding-top: 0px;margin-top: 0px;">
					<view class="uni-card-content" style="padding-top: 0px; margin-top: 0px;">
						<view class="uni-card-content-inner" style="padding-top: 3px; margin-top: 0px;display: flex; flex-direction: row;">
							<view class="uni-flex" style="display: flex; flex-direction: column; margin-right: 5px;">
								<image :src="order.cover" mode="" style="width: 120upx; height: 120upx;  "></image>
							</view>
							<view class="uni-flex" style="display: flex; flex-direction: column;">
								<text>服务产品：{{ order.service_name }}</text>
								<text style="width: 500upx; font-size: 28upx; color: #09BB07;">种类：{{ order.service_category }}</text>
								<text style="width: 500upx; font-size: 28upx; color: #09BB07;">￥{{order.fee }}元</text>
							</view>
							<view class="uni-flex" style="display: flex; flex-direction: column;"><text style="margin-left: 5upx; margin-top: 90upx;">x2</text></view>
						</view>
					</view>
				</view> -->
<!-- 				<view class="uni-card">
					<view class="uni-card-content">
						<view class="uni-card-content-inner" style="padding-top: 0px;margin-top: 0px;display: flex; flex-direction: row;">
							<view class="uni-flex" style="display: flex; flex-direction: row; justify-content: space-between; width: 100%; unicode-bidi: ;">
								<text>优惠券:</text>
								<text v-if="order.coupon_price > 0">-￥{{ order.coupon_price }}</text>
								<text v-else>无</text>
							</view>
						</view>
						<view class="uni-card-content-inner" style="padding-top: 0px;margin-top: 0px;display: flex; flex-direction: row;" v-if="order.status < 4">
							<view class="uni-flex" style="display: flex; flex-direction: row; justify-content: space-between; width: 100%; unicode-bidi: ;">
								<text>服务费:</text>
								<text v-if="order.charge > 0">+￥{{ order.charge }}</text>
								<text v-else>无</text>
							</view>
						</view>
					</view>
				</view> -->
			</view>
			<view style="margin-left: -25upx;">
				<form @submit="formSubmit" @reset="formReset">
					<view class="uni-common-mt">
						<view
							style="display: flex; justify-content: center; align-items: center; border:0.5px solid #8bc21f; border-radius: 20upx; width: 650upx; margin-left: 40upx;"
						>
							<view class="uni-title" style="width: 250upx;" v-if="order.type == 0">金额（￥）：</view>
							<view class="uni-title" style=" flex-wrap: nowrap;" v-if="order.type == 2">托管预付50% 金额（￥）：</view>

							<!-- <input type="text" disabled="true" name="price" :value="order.total" placeholder=""
                     style=" margin-top: 15upx;"> -->
							<text style=" ">{{ order.total }}</text>
							<view class="uni-title" style="padding-left: 20upx;"></view>
						</view>
						<radio-group name="channel">
<!-- #ifndef MP-WEIXIN -->

							           <view>
              <view
                style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: 40upx; margin-left: 50upx; background-color: #ffffff; padding-top: 10upx; padding-bottom: 10upx; padding-left: 50upx; width: 600upx;">
                <image :src="HOST+'/Public/app/pay.png'" mode=""
                       style="width:18%; height: 100upx; margin-top: 1upx;"></image>
                <view style="display: flex; flex-direction: column; margin-left: 25upx; margin-top: 2upx;">
                  <text style="font-size: 30upx;">支付宝支付</text>
                  <text style="font-size:15upx; width: 300upx;">推荐有支付宝的用户使用</text>
                </view>
								<radio value="2" style="color:#8bc21f; flex: 1; text-align: right;"/>
              </view>
            </view>
			<!-- #endif -->
							<view>
								<view
									style="display: flex; flex-direction: row;justify-content: space-between; align-items: center; margin-top: 20upx; margin-left: 50upx; background-color: #ffffff; padding-top: 10upx; padding-bottom: 10upx; padding-left: 50upx; width: 600upx;"
								>
									<image :src="HOST+'/Public/app/wechatt.png'" mode="" style="width:18%; height: 100upx; margin-top: 1upx;"></image>
									<view style="display: flex; flex-direction: column; margin-left: 25upx; margin-top: 2upx;">
										<text style="font-size: 30upx;">微信支付</text>
										<text style="font-size:15upx; width: 350upx;">推荐开通微信支付的用户使用</text>
									</view>
									<radio value="3" style=" flex: 1; text-align: right;" />
								</view>
							</view>
							<view>
								<view
									style="display: flex; flex-direction: row;justify-content: space-between; align-items: center; margin-top: 20upx; margin-left: 50upx; background-color: #ffffff; padding-top: 10upx; padding-bottom: 10upx; padding-left: 50upx; width: 600upx;"
								>
									<image :src="HOST+'/Public/app/yuee.png'" mode="" style="width:18%; height: 100upx; margin-top: 1upx;"></image>
									<view style="display: flex; flex-direction: column; margin-left: 25upx; margin-top: 2upx;">
										<text style="font-size: 30upx;">余额支付</text>
										<text style="font-size:15upx; width: 350upx;">推荐使用余额支付（剩余{{ user.balance }}元）</text>
									</view>
									<radio value="1" style="flex: 1; text-align: right;" @click="onClientAccountPay" />
								</view>
							</view>
						</radio-group>
					</view>
					<view>
						<button class="btn-submit" formType="submit" type="primary" style="margin-top: 20px; margin-left: 20px;margin-right: 20px; background-color: #6cb231;">
							确认支付
						</button>
					</view>
				</form>
			</view>
		</view>
		<!-- 弹出层演示 2 -->
		<graceMaskView :show="show_pay_password" bgcolor="#FFFFFF" v-on:close="onClosePayPwd">
			<view>
				<view style="display: flex; justify-content: center; font-size: 50upx; margin: 5upx;">
					<label>
						<view style="font-size: 60upx;">请输入支付密码</view>
						<view>
							<text style="font-size: 40upx;">确认支付</text>
							<text style="color:#95c274; font-size: 60upx;">￥{{ order.total }}</text>
						</view>
					</label>
				</view>
				<!-- <input type="password" name="pay_password" @input="onPayPwdInput" placeholder="支付密码" style="font-size: 15px; padding: 5px; width: 90%; color: #0ff0f0;" /> -->

				<view data-scindex="0">
					<view class="content"><uni-password ref="secrity" @input="onInput" @confirm="onConfirm" style=" margin-top: 10upx;">请输入6位支付密码</uni-password></view>
				</view>

				<view style="height: 1px; width: 100%; margin: 220upx;"></view>
				<!-- <view style="display: flex; flex-direction: row;">
							<button class="btn-submit" type="primary"
						         style="background-color:#FFFFFF; color: #333333; border-radius: 25upx; width: 40%; height: 80upx; margin-bottom: 5upx; font-size: 35upx;"
						         @click="onClosePayPwd">取消
						 </button>   
               <button class="btn-submit" type="primary"
                     style="background-color: #09BB00; border-radius: 25upx; width: 40%; height: 80upx; margin-bottom: 5upx; font-size: 35upx;"
                     @click="onPyPwdConfirm">确定
             </button>   
						 </view> -->
			</view>
		</graceMaskView>
		<view style="height:80upx;"></view>
	</view>
</template>

<script>
import util from '../../../common/util.js';
import uniPassword from '@/components/uni-password/uni-password.vue';
import uniIcon from '@/components/i-icon/i-icon.vue';
import uniKeyboard from '@/components/uni-keyboard.vue';
var graceChecker = require('../../../common/graceChecker.js');
import graceMaskView from '@/graceUI/components/graceMaskView.vue';
var self;
export default {
	components: {
		graceMaskView,
		uniPassword,
		uniIcon,
		uniKeyboard
	},
	data() {
		return {
			title: '确认订单',
			loading: false,
			providerList: [],
			order: {},
			user: {},
			show_pay_password: false,
			pay_password: '',
			verified_pay_password: false,
			submitFormData: {},
			service: null,
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			titleShowId: 'tabTag-0',
			tabHeight: 200,
			tabs: [],
			showKeyboard: false,
			order_no: '',
			open_id: 0
		};
	},

	onShow() {
		this.user = uni.getStorageSync('user_info');
	},
	onLoad(option) {
		self = this;

		this.user = uni.getStorageSync('user_info');
		if (option && option.order_no && option.order_no.length > 0) {
			console.debug('option:' + JSON.stringify(option));
			this.order_no = option.order_no;

			this.loadOrder(option.order_no);
		} else {
			uni.showToast({
				title: '订单编号参数缺失。请返回重新下单。',
				icon: 'none'
			});
		}
		this.service = uni.getStorageSync('service');

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
		done(password) {
			console.log(password);
			console.log(this.$refs);
		},
		confirmPwd() {
			this.$refs.keyboard.show();
		},
		onInput(e) {
			// e.cancel = true;
		},
		onConfirm(e) {
			let password = e.value;

			this.onPyPwdConfirm({
				detail: {
					value: password
				}
			});
		},

		onClientAccountPay(e) {
			//check
		},
		onPayPwdInput(e) {
			this.pay_password = e.detail.value;
		},
		onClosePayPwd(e) {
			this.show_pay_password = false;
		},
		onPyPwdConfirm(e) {
			var self = this;
			var pwd = e.detail.value;

			self.pay_password = pwd;

			console.info('mobile:' + self.user.mobile);
			console.info('pay_password:' + self.pay_password);
			//check
			var payObj = { user_id: self.user.id, mobile: self.user.mobile, password: self.pay_password };

			util.GET('user/check_pay_pwd', payObj, function(data) {
				console.info('handle:' + JSON.stringify(data));

				if (data.status == 1) {
					self.verified_pay_password = true;
					self.show_pay_password = false;
					//fixme:auto submit

					self.formSubmit(self.submitFormData);
				} else {
					uni.showToast({
						title: '验证失败。'
					});
				}
			});
		},
		formSubmit: function(e) {
			var self = this;

			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'price',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '金额不能为空'
				},
				{
					name: 'channel',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '请选择支付方式'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			formData.price = self.order.total;
			console.debug('formData:' + JSON.stringify(formData));

			var checkRes = graceChecker.check(formData, rule);
			console.debug('check:' + checkRes);
			checkRes = true;
			if (checkRes) {
				//call pay
				// formData.price
				//this.onDeposit(formData);
				var fdata = {
					order_no: this.order.order_no,
					price: this.order.total,
					channel: formData.channel,
					coupon_id: this.order.coupon_id
				};

				// #ifdef MP-WEIXIN

				fdata.open_id = self.open_id;
				if (fdata.channel == 3) {
					fdata.channel = 5;
					formData.channel = 5;
				}
				// #endif

				console.debug('post data:' + JSON.stringify(fdata));
				if (formData.channel == 1) {
					//check pay pwd
					//check is set pay password
					//check is set pay password
					if (self.user && !self.user.assigned_pay_password) {
						uni.showToast({
							title: '你还未设置支付密码，请先去设置支付密码。'
						});
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/my/face'
							});
						}, 2000);

						return;
					}

					if (!self.verified_pay_password) {
						self.show_pay_password = true;
						self.submitFormData = e;
						return;
					}
				}

				util.POST('order/pay', fdata, function(data) {
					console.info('handle:' + JSON.stringify(data));
					console.info('handle: formData' + JSON.stringify(formData));
					console.info('handle :' + data.order_status);
					if (data.status == 1) {
						if (data.order_status == 3 ||  data.order_status == 4 || data.order_status == 6) {
							//account paied
							uni.showToast({ title: '支付' + fdata.price + '成功', icon: 'none' });

							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/my/order_index'
								});
							}, 2000);

							return;
						} else {
							uni.showToast({ title: '等待支付' + fdata.price + '元', icon: 'none' });
						}

						//pay
						if (formData.channel == 2) {
							//alipay
							console.debug('alipay:' + data.content);

							uni.requestPayment({
								provider: 'alipay',
								orderInfo: data.content, //订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));

									uni.showToast({ title: '订单支付成功！', icon: 'none' });
									setTimeout(function() {
										uni.navigateTo({
											url: '/pages/my/order_index'
										});
									}, 2000);
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
								}
							});
						} else if (formData.channel == 3 || formData.channel == 5) {
							//wxpay or miniapp
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
									uni.showToast({ title: '订单支付成功！', icon: 'none' });
									setTimeout(function() {
										uni.navigateTo({
											url: '/pages/my/order_index'
										});
									}, 2000);
								},
								fail: function(err) {
									console.log('fail:' + JSON.stringify(err));
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

		loadOrder(order_no) {
			var self = this;
			//singin auto reg
			util.POST(
				'order/confirm',
				{
					order_no: order_no
				},
				function(data) {
					console.info('handle:' + JSON.stringify(data));
					if (data.status == 1) {
						self.order = data.content;
						self.order['fee'] = parseFloat(self.order.price)+parseFloat(self.order.charge)
						// set cover
						for (var i in self.service) {
							if (self.service[i].id == self.order.provider_id) {
								self.order.cover = self.service[i].icon;
								
							}
						}
					} else {
						uni.showToast({ title: data.message, icon: 'none' });
					}
				}
			);
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
			util.GET('order/pay', payObj, function(data) {
				console.info('handle:' + JSON.stringify(data));
				console.info('handle: payObj' + JSON.stringify(payObj));
				console.info('data.status:' + data.status);
				if (data.status == 1) {
					if (data.order_status == 3 || data.order_status == 4) {
						uni.showToast({ title: '支付' + payObj.price + '成功', icon: 'none' });
						uni.navigateTo({
							url: 'pages/order/index'
						});

						return;
					} else {
						uni.showToast({ title: '支付' + payObj.price + '请求发起成功' + data.status, icon: 'none' });
					}

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
	},
	onReady() {
		//获取屏幕高度及比例
		var winInfo = uni.getSystemInfo({
			success: res => {
				var windowHeight = res.windowHeight;
				//获取头部标题高度
				var dom = uni.createSelectorQuery().select('#tab-title');
				dom.fields({ size: true }, res2 => {
					if (!res2) {
						return;
					}
					//计算得出滚动区域的高度
					this.tabHeight = windowHeight - res2.height;
					console.log(this.tabHeight);
				}).exec();
			}
		});
	}
};
</script>

<style>
.uni-card {
	margin-top: 50 upx;
}

.page {
	padding-top: 60 upx;
	background: #efeff4;
}

.image-view {
	height: 480 upx;
	overflow: hidden;
}

.image {
	width: 100%;
}
page {
	background: #f2f2f2;
}
.keyboard-container {
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
}
uni-button[type='primary'] {
	background: #00c456 !important;
}
/* 选项卡 */
.tab {
	padding: 0;
}
.tab-title {
	white-space: nowrap;
	text-align: center;
	background: #ffffff;
}
.tab-title view {
	width: auto;
	padding: 0 12px;
	margin: 0 8px;
	line-height: 42px;
	display: inline-block;
	text-align: center;
	border-bottom: 2px solid #ffffff;
	font-size: 30upx;
}
.tab-title view:first-child {
	margin-left: 0;
}
.tab-title view:last-child {
	margin-right: 0;
}
.tab-current {
	border-bottom: 4upx solid #00c777 !important;
	color: #00c777;
}
.tab-swiper {
	width: 100%;
	height: 350upx;
	padding: 0;
}
.tab-swiper swiper-item {
	width: 100%;
}
.tab-swiper swiper-item navigator {
	line-height: 70upx;
	width: 100%;
	display: block;
}
.tab-swiper-full {
	width: 100%;
	height: auto;
}
.tab-swiper-full swiper-item {
	width: 100%;
}
.tab-swiper-full scroll-view {
	width: 100%;
	height: 100%;
}

.center {
	text-align: center;
}
.mt-10 {
	margin-top: 10px;
}
.pt-10 {
	paddint-top: 10px;
}

.content {
	text-align: center;
	height: 400upx;
}

.payment-container {
	border-top: 1px solid #e2e2e2;
	height: calc(100%-44px);
	overflow: hidden;
}
.payment-container .payment {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	background: #fff;
}
.payment-container .payment view:nth-child(2) {
	flex: 1;
}
.payment-container .payment-active {
	background: #e2e2e2;
}
.payment-container .payment image {
	width: 30px;
	height: 30px;
	margin-right: 10px;
}

.money-container {
	background: #fff;
	padding: 10px;
}
.money-container .money-box {
	padding: 10px 0;
	border-bottom: 1px solid #efefef;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.money-container .money-box .button {
	font-size: 12px;
	color: #cf9f41;
}
.money-container .money-box view:nth-child(1) {
	font-size: 25px;
}
.money-container .money-box view:nth-child(2) {
	flex: 1;
	font-size: 30px;
	padding: 0 5px;
}

.money-container .tips {
	color: #222;
	padding-top: 10px;
	font-size: 12px;
}

.button-box {
	padding: 0 10px;
}
</style>
