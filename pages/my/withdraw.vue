<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-common-mt">
				<view style="display: flex; justify-content: center; margin-top: -50upx;">
					<image src="../../static/back.jpg" mode="" style="width: 800upx;height: 300upx;"></image>
				</view>
				<view style="display: flex; justify-content: center; margin-top: -150upx;">
					<text style="font-size: 25upx; color: #ffffff; font-family: 微软雅黑; margin-top: -90upx; margin-left: -200upx; ">当前余额（元）</text>
					<text style="font-size: 50upx; color: #ffffff; font-family: 微软雅黑; ">{{ user.balance }}元</text>
				</view>
				<view style="margin-top: 150upx;">
					<view class="uni-common-mt">
						<view style="display: flex; justify-content: center; border:0.5px solid #8bc21f; border-radius: 20upx; width: 650upx; margin-left: 50upx;">
							<view class="uni-title" style="font-family: 微软雅黑; width: 270upx;">金额（￥）：</view>
							<input type="text" name="price" placeholder="请输入提现金额" style=" margin-top: 15upx;" />
							<view class="uni-title" style="padding-left: 20upx;"></view>
						</view>
						<!-- <view>
				      <view style="display: flex; flex-direction: row; margin-top: 50upx; margin-left: 50upx; background-color: #ffffff; padding-top: 10upx; padding-bottom: 10upx; padding-left: 50upx; width: 600upx;">
				        <image src="{{HOST}}/Public/app/pay.png" mode="" style="width:18%; height: 100upx; margin-top: 1upx;"></image>
						<view style="display: flex; flex-direction: column; margin-left: 25upx; margin-top: 2upx;">
							<text style="font-size: 30upx;">支付宝支付</text>
							<text style="font-size:15upx; width: 300upx;">推荐有支付宝的用户使用</text>
						</view>			
				      </view>	  
					   </view> -->
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
								<image :src="HOST+'/Public/app/yinlianka.png'" mode="" style="width:18%; height: 100upx; margin-top: 1upx;"></image>
								<view style="display: flex; flex-direction: column; margin-left: 25upx; margin-top: 2upx;">
									<text style="font-size: 30upx;">银行卡支付</text>
									<text style="font-size:15upx; width: 350upx;">推荐使用储蓄银行卡支付</text>
								</view>
							</view>
						</view>
						<view style="text-align: right;">
							<radio-group name="channel" style=" display: flex; flex-direction: column; margin-top: -320upx;  margin-left: -70upx;">
								<label><radio value="0" style="margin-top: 230upx;" /></label>
								<!-- 	<label><radio value="1" style="color:#8bc21f ; display: none;" /></label>
								<label><radio value="2" style="margin-top: 90upx;" /></label> -->
							</radio-group>
						</view>
					</view>
				</view>
				<view style="display: flex; justify-content: center;">
					<view style=" display: flex; flex-direction: column; margin-left: 20upx; margin-top: 100upx; ">
						<text style="font-size: 25upx; font-family: 微软雅黑; ">注意事项</text>
						<text style="font-size: 25upx; font-family: 微软雅黑; ">
							1.提现申请将在1到3个工作日（节假日不在工作日内）,每周星期二和星期五统一打款；审批到帐
							<br />
							如遇到高峰期，可能延迟到帐，烦请请耐心等待
						</text>
						<text style="font-size: 25upx; font-family: 微软雅黑; ">2.提现收取0.1%手续费；</text>
					</view>
				</view>
				<view>
					<button
						class="btn-submit"
						formType="submit"
						type="primary"
						style="background-color: #09BB07; border-radius: 37upx; width: 90%; height: 80upx; margin-top: 25upx; font-size: 35upx;"
						
					>
						确认提现
					</button>
				</view>
			</view>
		</form>
	</view>
</template>
<script>
import util from '@/common/util.js';
var graceChecker = require('../../common/graceChecker.js');
export default {
	data() {
		return {
			HOST: this.$util.HOST,
			title: '提现',
			user: {},
			withdraw: 0.0
		};
	},
	onLoad() {
		this.user = uni.getStorageSync('user_info');
	},
	methods: {
		formSubmit: function(e) {
			console.debug('formSubmit');
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'price',
					checkType: 'number',
					checkRule: 'notnull',
					errorMsg: '金额必须大于0'
				},
				{
					name: 'channel',
					checkType: 'number',
					checkRule: 'notnull',
					errorMsg: '渠道不能为空'
				}
			];
			//进行表单检查
			var formData = e.detail.value;
			console.debug(formData);

			console.debug('formData:' + JSON.stringify(formData));

			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				this.onWithdraw(formData);
				// uni.showToast({title:"验证通过!", icon:"none"});
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		},

		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		},

		onWithdraw(formData) {
			// if (this.withdraw<=0){
			// 	uni.showToast({
			// 		icon: 'fail',
			// 		title:"余额不足以提现"
			// 	})
			// }else{
				console.debug("onWithdraw");
			console.debug(formData);
			
			util.GET('account/withdraw_channel', formData, function(data) {
				if (data && data.status == 1) {
					uni.showToast({
						icon: 'none',
						title: '提交成功，等待审批'
					});
				} else {
					uni.showToast({
						title: data.message
					});
				}
			});

			// }
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
