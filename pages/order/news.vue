<template>
	<view class="uni-card">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-triplex-row">
				<view class="uni-triplex-left">
					<text class="uni-title uni-ellipsis">订单号：12121</text>
					<text class="uni-text">店铺名称:123</text>
					<text class="uni-text">
						类目:标识广告
						<text>价格：</text>
						<text style="color: red;">￥70</text>
					</text>
					<text class="uni-text">下单时间: 2019-4-02 11：20：40</text>
					<text class="uni-text">施工日期：2019-4-02 11：20：40</text>
					<text class="uni-text-small uni-ellipsis">施工地址：腾讯大厦</text>
				</view>
				<view class="uni-triplex-right" style="width:120upx; center;display: flex;">
					<image src="../../static/asd.png" mode="" style="width: 120upx; height: 120upx;"></image>
					<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">竞价</text>
					<text class="uni-h5" style="text-align: center; color: #ff0000; font-family:黑体; font-size: 25upx; margin-top: 15upx;">待服务</text>
				</view>
			</view>
		</view>
		<view class="uni-card">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" style="display: flex; flex-direction: column;">
				<view style="display: flex; border:0.5px solid #8bc21f; border-radius: 20upx; width: 650upx;">
					<view class="uni-title" >报价金额（￥）：</view>
					<input type="number" name="price" placeholder="请输入报价金额" style=" margin-top: 15upx;" />
				</view>
				<view>
					<text>
						报价金额不得低于
						<text style=" color: #448c04;">50</text>
						元
					</text>
				</view>
			</view>
		</view>
		<view style="margin-top: 2upx;" class="uni-card">
			<view class="uni-textarea">
				<textarea @input="onInputComment" placeholder="留言给下单方有利于提升雇佣率(50字内)" @focus="onFocus" style="width: 90%;  height: 100px;" />
			</view>
		</view>
		<view style="display: flex; justify-content: center;">报价前务必确认订单信息并合理报价</view>
		<view>
			<button
				type="primary"
				form-type="submit"
				@tap="showDialog2"
				style="margin-top: 20px; margin-left: 20px;margin-right: 20px; background-color: #6cb231; border-radius: 50upx;"
			>
				确认提交
			</button>
		</view>
		<view style="display: flex; ">报价注意事项</view>
		<view style="display: flex; ">1、师傅务必根据实际情况给出合理报价。</view>
		<view style="display: flex; ">2、报价之后将不再修改之前的金额，如有虚假报价产生不良后果。平台将会依据《违反处罚规则》处理。</view>
		<view style="display: flex; ">3、师傅报价后就默认当前《处罚承诺》，并在网站显示，如有纠纷平台将以此作为依据。</view>
		<graceDialog title="温馨提示" :show="show2" v-on:closeDialog="closeDialog2">
			<view slot="content" style="display: flex; justify-content:center; ">
				<view style="display: flex; flex-direction: column;">
					<view class="content1">您的报价已提交成功</view>
					<view class="content1">等待用户联系</view>
				</view>
			</view>
			<view slot="btns">
				<view class="grace-dialog-btns">
					<view><button type="primary" style="color:#3688FF;" @tap="confirm2">确认</button></view>
				</view>
			</view>
		</graceDialog>
	</view>
</template>

<script>
import graceDialog from '@/graceUI/components/graceDialog.vue';
export default {
	data() {
		return {
			show2: false
		};
	},
	components: {
		graceDialog: graceDialog
	},
	methods: {
		// 第2个演示 [ 带有按钮 ]
		showDialog2: function() {
			this.show2 = true;
		},
		closeDialog2: function() {
			this.show2 = false;
		},
		confirm2: function() {
			this.closeDialog2();
			uni.showToast({ title: '稍等片刻，请等待联系', icon: 'none' });
		}
	}
};
</script>

<style></style>
