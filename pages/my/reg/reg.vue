<template>
	<view>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<view style="display: flex;justify-content: center;"><image src="../../../static/banner.png"  mode="scaleToFill" style="width: 100%; height:350upx;" ></image></view>
					<view class="uni-list" style="margin-top: 20upx;">
						<view class="uni-list-cell">
							<image src="../../../static/x.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input class="uni-input" name="mobile" @input="onInputMobile" placeholder="请输入您的手机号码" maxlength="11" />
							<image src="../../../static/y.png" mode="" style="width: 50upx; height: 50upx;"></image>
						</view>
					</view>
					<view class="uni-list" style="margin-top: 50upx;">
						<view class="uni-list-cell">
							<image src="../../../static/z.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input class="uni-input" type="number" name="code" @input="onInputCode" placeholder="请输入验证码" maxlength="6" />
							<button
								class="mini-btn"
								type="default"
								size="mini"
								style="background-color: #ffffff; border: 1px solid;  border-radius: 50upx; color: #a2a2a2; font-size: 20upx;"
								@tap="onGetSms"
							>
								获取验证码
							</button>
						</view>
					</view>
					<view class="uni-list" style="margin-top: 50upx;">
						<view class="uni-list-cell">
							<image src="../../../static/o.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input :type="pwdShow ? 'text' : 'password'" class="uni-input" name="password"  placeholder="请输入密码" :disabled="pwdShow ? true : false" @input="onInputPassword" />
							<view class="grace-form-funs grace-icons icon-eye" :style="{color:pwdShow?'#3688FF':''}" @tap="pwdShow = !pwdShow"></view>
							
						</view>
					</view>
					<view class="uni-list" style="margin-top: 50upx;">
						<view class="uni-list-cell">
							<image src="../../../static/o.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input :type="pwdShow2 ? 'text' : 'password'" class="uni-input" name="password" placeholder="再次输入密码" :disabled="pwdShow2 ? true : false" @input="onInputPassword" />
							<view class="grace-form-funs grace-icons icon-eye" :style="{color:pwdShow2?'#3688FF':''}" @tap="pwdShow2 = !pwdShow2"></view>
							
						</view>
					</view>
				</view>

				<view class="uni-btn-v uni-common-mt" style="margin-top: 150upx; display: flex; flex-direction: column;">
					<button class="btn-submit" formType="submit" type="primary" style="background-color: #09BB07; border-radius: 50upx;">注册</button>
					<view style="display: flex;  justify-content: center;">
						<view style="justify-content: center;">
							<checkbox-group style="display:flex; flex-direction: row; justify-content: center;">
								<label>
									<checkbox value="cb" checked="true" />
									同意
								</label>
								<view @tap="onProtocol">异修服务条款</view>
							</checkbox-group>
						</view>
					</view>
				</view>
			</form>
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
			code: '',
			password: '',
			re_password: '',
			pwdShow:false,
			pwdShow2:false
		};
	},
	onLoad() {
		_self = this;
	},

	methods: {
		onProtocol() {
			var url = util.H5_URL + 'sys/protocol';
			util.goH5(url);
		},
		onGetSms() {
			//verify  mobile and code first
			var self = this;
			util.POST(
				'user/check_signup_with_sms',
				{ mobile: this.mobile },
				function(data) {
					console.info('check_signup_with_sms:', JSON.stringify(data));
					uni.showToast({
						title: '发送成功',
						duration: 2000
					});
				},
				function(data) {
					//failed
					if (data.status == -100) {
						//手机已注册

						uni.showToast({ title: data.message, icon: 'none', duration: 2000 });
						console.debug(data.message);

						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/my/login/login?mobile=' + _self.mobile
							});
						}, 2000);
					} else {
						uni.showToast({ title: data.message, icon: 'none', duration: 2000 });
					} //end if
				}
			); //end
		},

		onInputCode(e) {
			this.code = e.detail.value;
		},

		onInputMobile(e) {
			this.mobile = e.detail.value;
		},

		onInputPassword(e) {
			this.password = e.detail.value;
		},

		onInputRePassword(e) {
			this.re_password = e.detail.value;
		},

		onReg() {
			var self = this;
			//singin auto reg
			util.POST(
				'user/signup',
				{
					mobile: this.mobile,
					password: this.password,
					code: this.code
				},
				function(data) {
					console.info('handle:' + JSON.stringify(data));
					if (data.status == 1) {
						self.user = data;

						uni.setStorageSync('user_id', self.user.id);
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('login_status', 1);
						uni.setStorageSync('user_info', self.user);

						self.onGetCoupons();

						uni.switchTab({
							url: '/pages/home/index'
						});
					} else {
						uni.showToast({ title: data.message, icon: 'none' });
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/my/login/login?mobile=' + self.mobile
							});
						}, 2000);
					}
				},
				function(data) {
					console.debug('reg fail.' + JSON.stringify(data));

					uni.showToast({
						icon: 'none',
						title: data.message
					});

					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/my/login/login?mobile=' + self.mobile
						});
					}, 3000);

					return false;
				}
			);
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
					return false;
				}
			);
		},

		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'mobile',
					checkType: 'phoneno',
					checkRule: '',
					errorMsg: '请输入正确的手机号码'
				},
				{
					name: 'code',
					checkType: 'string',
					checkRule: '4,6',
					errorMsg: '验证码应为4-6个字符'
				},
				{
					name: 'password',
					checkType: 'string',
					checkRule: '6,12',
					errorMsg: '密码6-12个字符'
				},
				{
					name: 're_password',
					checkType: 'string',
					checkRule: '6,12',
					errorMsg: '密码6-12个字符'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug('formData:' + JSON.stringify(formData));
			if (this.password != this.re_password) {
				uni.showToast({ title: '两次密码不一致!', icon: 'none' });
				return;
			}
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.onReg();
				// uni.showToast({title:"验证通过!", icon:"none"});
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

<style></style>
