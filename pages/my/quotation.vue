<template>
	<view>
		<view class="uni-list">
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
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-triplex-row" style="display: flex; flex-direction: column;">
					<view
						class="uni-triplex-left"
						style="display: flex; justify-content: center; flex-direction: row; align-items: center; border:0.5px solid #8bc21f; border-radius: 10upx; width: 650upx; height: 100upx;"
					>
						<text class="uni-title uni-ellipsis">报价金额（￥）</text>
						<input type="text" value="" placeholder="请输入报价金额" />
					</view>
					<view><text>报价金额不得低于50元</text></view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-triplex-row" style="border-color: #1AAD19;">
					<view class="uni-triplex-left">
						<textarea type="text" value="" placeholder="留言给下单方有利于提高雇佣率(50字内)" maxlength="50" style="height: 300upx;" />
					</view>
				</view>
			</view>
		</view>
		<view style="display: flex;justify-content: center;"><text>报价前务必确认订单信息并合理报价</text></view>
		<view><button type="primary" style="background-color: #09BB07; width: 650upx; border-radius: 50upx;" @tap="showDialog1">确认提交</button></view>
		<graceDialog title="温馨提示" :show="show1" :isBtns="false" v-on:closeDialog="closeDialog1">
			<view slot="content">
				<view class="content1" style="display: flex; justify-content: center;">您的报价已提交成功等待用户联系</view>
				<button type="primary" style="width: 300upx; background-color: #09BB07; margin-top: 50upx; margin-bottom: 50upx;">确认</button>
			</view>
		</graceDialog>
		<view style="display: flex; flex-direction: column;">
			<text>报价注意事项</text>
			<text>1.师傅务必根据实际情况合理给出报价。</text>
			<text>2.报价之后将不再修改之前的金额，如有虚假报价产生的不良后果。平台将会依据《违反出发规则》处理。</text>
			<text>3.师傅报价后就默认当前《处罚承诺》，并在网站上显示，如有纠纷。平台将会依此作为依据处理。</text>
		</view>
	</view>
</template>

<script>
import graceDialog from '@/graceUI/components/graceDialog.vue';
// 可选标签的 js 扩展
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
export default {
	data() {
		return {
			show1: false
		};
	},
	components: {
		graceDialog: graceDialog
	},
	methods: {
		// 第1个演示 [ 普通 ]
		showDialog1: function() {
			this.show1 = true;
		},
		closeDialog1: function() {
			this.show1 = false;
		}
	}
};
</script>

<style></style>
