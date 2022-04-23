<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-triplex-left" style="width:120upx; center;display: flex;" @tap="goDetailPage('home/master_order')">
					<image src="../../static/asd.png" mode="" style="width: 120upx; height: 120upx;"></image>
				</view>
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">订单号：12121</text>
						<text class="uni-text">店铺名称:123</text>
						<text class="uni-text">类目:标识广告</text>
						<text class="uni-text">下单时间:</text>
					</view>
					<view class="uni-triplex-right" style="width: 360upx; ">
						<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">
							报价
							<text>￥110</text>
						</text>
						<button type="primary" class="grace-button" size="mini" style="background-color: #09BB07;" @tap="showDialog2">雇佣他</button>
						<text>付款后可见师傅号码</text>
						<view style="display: flex; flex-direction: row; width: 340upx;">
							<button type="primary" class="grace-button" size="mini" style="background-color: #09BB07; height: 60upx; width: 130upx;">投诉</button>
							<button
								type="primary"
								class="grace-button"
								size="mini"
								style="background-color: #09BB07; height: 60upx; width:130upx;"
								@tap="goDetailPage('my/fabiaopinglun')"
							>
								评价
							</button>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-triplex-left" style="width:120upx; center;display: flex;" @tap="goDetailPage('home/master_order')">
					<image src="../../static/asd.png" mode="" style="width: 120upx; height: 120upx;"></image>
				</view>
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">订单号：12121</text>
						<text class="uni-text">店铺名称:123</text>
						<text class="uni-text">类目:标识广告</text>
						<text class="uni-text">下单时间:</text>
					</view>
					<view class="uni-triplex-right" style="width: 360upx; ">
						<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">
							报价
							<text>￥110</text>
						</text>
						<button type="primary" class="grace-button" size="mini" style="background-color: #09BB07;" @tap="showDialog2">雇佣他</button>
						<text>13560784455</text>
						<view style="display: flex; flex-direction: row; width: 340upx;">
							<button type="primary" class="grace-button" size="mini" style="background-color: #09BB07; height: 60upx; width: 130upx;">投诉</button>
							<button type="primary" class="grace-button" size="mini" style="background-color: #09BB07; height: 60upx; width:130upx;">评价</button>
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-triplex-left" style="width:120upx; center;display: flex;" @tap="goDetailPage('home/master_order')">
					<image src="../../static/asd.png" mode="" style="width: 120upx; height: 120upx;"></image>
				</view>
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">订单号：12121</text>
						<text class="uni-text">店铺名称:123</text>
						<text class="uni-text">类目:标识广告</text>
						<text class="uni-text">下单时间:</text>
					</view>
					<view class="uni-triplex-right" style="width: 360upx; ">
						<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">
							报价
							<text>￥110</text>
						</text>
						<button type="primary" class="grace-button" size="mini" style="background-color: #09BB07;" @tap="showDialog2">雇佣他</button>
						<text>付款后可见师傅号码</text>
						<view style="display: flex; flex-direction: row; width: 340upx;">
							<button type="primary" class="grace-button" size="mini" style="background-color: #09BB07; height: 60upx; width: 130upx;">投诉</button>
							<button type="primary" class="grace-button" size="mini" style="background-color: #09BB07; height: 60upx; width:130upx;">评价</button>
						</view>
					</view>
				</view>
			</view>
			<graceDialog title="温馨提示" :show="show2" v-on:closeDialog="closeDialog2">
				<view slot="content" style="display: flex;flex-direction: column; text-align: center;">
					<text>您确认是否雇佣此师傅为您提供服务吗？</text>
					<text>（雇佣师傅后24小时未付款订单将自动关闭）</text>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view><button type="primary" style="color:#3688FF;" @tap="confirm2">确认</button></view>
						<view><button type="primary" @tap="closeDialog2">取消</button></view>
					</view>
				</view>
			</graceDialog>
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
			uni.showToast({ title: '稍等片刻，即将联系', icon: 'none' });
		},
		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		}
	}
};
</script>

<style></style>
