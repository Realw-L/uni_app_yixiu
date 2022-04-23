<template>
	<view>
		<view class="uni-padding-wrap">
			<form @submit="formSubmit" @reset="formReset">
				<view>
					<view style="display: flex;justify-content: center;" >
					<image src="../../../static/banner.png"  mode="scaleToFill" style="width: 100%; height:350upx;" ></image>							
					</view>
					<view class="uni-list" style="margin-top: 20upx;">
						<view class="uni-list-cell">
							<image src="../../../static/x.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input class="uni-input" name="mobile" @input="onInputMobile" placeholder="请输入您的手机号码"  maxlength="11"/>
							<image src="../../../static/y.png" mode="" style="width: 50upx; height: 50upx;"></image>
						</view>
						
					</view>
					<view class="uni-list" style="margin-top: 50upx;">
						<view class="uni-list-cell">
							<image src="../../../static/z.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input class="uni-input" name="code" placeholder="请输入验证码" maxlength="6" />
                             <button class="mini-btn" type="default" size="mini" style="background-color: #ffffff; border: 1px solid;  border-radius: 50upx; color: #a2a2a2; font-size: 20upx;" @tap="onGetSms">获取验证码</button>						
</view>	
					</view>
					<view class="uni-list" style="margin-top: 50upx;">
						<view class="uni-list-cell">
							<image src="../../../static/o.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input :type="pwdShow ? 'text' : 'password'" class="uni-input" name="password" placeholder="请输入密码" :disabled="pwdShow ? true : false" @input="onInputPassword" />											
							<view class="grace-form-funs grace-icons icon-eye" :style="{color:pwdShow?'#3688FF':''}" @tap="pwdShow = !pwdShow"></view>
							
						</view>
						
					</view>
					<view class="uni-list" style="margin-top: 50upx;">
						<view class="uni-list-cell">
							<image src="../../../static/o.png" mode="" style="width: 50upx; height: 50upx;"></image>
							<input :type="pwdShow2 ? 'text' : 'password'" class="uni-input" name="password"  placeholder="再次输入密码" :disabled="pwdShow2 ? true : false" @input="onInputPassword" />
							<view class="grace-form-funs grace-icons icon-eye" :style="{color:pwdShow?'#3688FF':''}" @tap="pwdShow2 = !pwdShow2"></view>							
						</view>
						
					</view>
				</view>
			
				<view class="uni-btn-v uni-common-mt" style="margin-top: 150upx; display: flex; justify-content: center;">
					<button class="btn-submit" formType="submit" type="primary" style="background-color: #09BB07; border-radius: 50upx; width: 90%; ">重置密码</button>
					<view style="display: flex;  justify-content: center;">
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
export default {
	data() {
		return {
			title: '表单验证',
			mobile:'',
			code:'',
			password:'',
			new_password:'',
			pwdShow : false,
				pwdShow2 : false
		};
	},
	methods: {
		onInputMobile(e){
			this.mobile = e.detail.value
		},
		onGetSms() {
			var self = this;
			util.POST('user/find_lose_pwd_sms', { mobile: this.mobile }, function(data) {
				console.info(data);
				if (data.status == 1) {
					uni.showToast({
						title: '发送成功',
						duration: 2000
					});
				} else {
						uni.showToast({
						title: data.message,
						duration: 2000
					});
				}
			});
		},
		reesetPwd(formData) {
			var self = this;
			util.GET('user/findPassword', formData,
			// { mobile: this.mobile ,new_password: this.repassword,code: this.code, pwd: this.password },
			function(data) {
					console.info(data);
					if (data.status == 1) {
						uni.showToast({
							title: '设置成功',
							duration: 1000
						});
						
						setTimeout(function(){
							uni.switchTab({
								url:'/pages/home/index'
							})
						}, 1500)
						
						
					} else {
							uni.showToast({
							title: data.message,
							duration: 1000
						});
						
					}
				},function(data){
						uni.showToast({
						title: data.message,
						duration: 1000
					});
					
					return false;
				});
		},
		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{ name: 'mobile', checkType: 'phoneno', checkRule: '', errorMsg: '请输入正确的手机号' },
				{
					name: "password",
					checkType: "string",
					checkRule: "6,12",
					errorMsg: "密码应为6-12个字符"
				},
				{
					name: "new_password",
					checkType: "string",
					checkRule: "6,12",
					errorMsg: "密码应为6-12个字符"
				},{
					name: 'code',
					checkType: 'string',
					checkRule: '4,6',
					errorMsg: '验证码应为4-6个字符'
				},
				
				
				
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug('formData:'+JSON.stringify(formData))
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				if (this.password != this.new_password) {
					uni.showToast({ title: '两次密码不一致!', icon: 'none' });
					return;
				}
				
				this.reesetPwd(formData)
				// uni.showToast({ title: '验证通过!', icon: 'none' });
				
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
</style>
