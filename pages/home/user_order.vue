<template>
	<view>
		<view class="grace-list-items grace-border-b "><graceSelectTags :items="demo1" type="radio" @change="change1"></graceSelectTags></view>
		<view class="grace-border-b" style="display: flex; flex-direction: row;">
				<view  style="width: 270upx;">
					<text>主要联系人：</text>					
				</view>
				<input type="text" value="" placeholder="联系人姓名" />
			<view style="width: 140upx;"><text>电话：</text></view>
			<input type="text" value="" placeholder="请输入联系电话" />
		</view>
		<view class="grace-list-items  grace-border-b" @tap="goDetailPage('home/order/address')">
			<view class="grace-list-body">
				<view class="grace-list-title"><text class="grace-list-title-text">地址</text></view>
			</view>
			<text>地址簿</text>
			<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
		</view>
		<view  class="grace-border-b" style="height: 50px; display: flex; flex-direction: row;">
			<text style="width: 150upx;">详细地址：</text>					
			<textarea  placeholder="如道路、门牌号、小区、楼栋号、单元室等" maxlength="25" />
		</view>
		<view class="grace-list-items">
			<view class="grace-list-body grace-border-b">
				<view class="grace-list-title">
					<text class="grace-list-title-text">*施工PDF图纸：</text>
					<input type="text" value="" placeholder="故障图、施工图、验收单" />
				</view>
			</view>
		</view>
		<view style="display: flex; flex-direction: row;">
			<view>
				<text>上传PDF施工图纸</text>
		<view class="grace-img-card-item">
			<view class="grace-img-card-img">
				<image src="https://graceui.oss-cn-beijing.aliyuncs.com/demoimgs/2.png" :src="idCard1"  @tap="selectImg1" mode="widthFix" class="grace-img-card-img"></image>
				<text class="grace-img-card-bgTitle">上传施工图纸</text>
			</view>
		</view>
		</view>
		<view>
			<text>验收单</text>
		<view class="grace-img-card-item" style="margin-left: 50upx;">
			<view class="grace-img-card-img">
				<image src="https://graceui.oss-cn-beijing.aliyuncs.com/demoimgs/2.png" :src="idCard2"  @tap="selectImg2" mode="widthFix" class="grace-img-card-img"></image>
				<text class="grace-img-card-bgTitle">上传验收单</text>
			</view>
		</view>	
		</view>
		</view>
		<view class="grace-form-item grace-border-b">
			<text class="grace-form-label">施工时间</text>
			<view class="grace-form-body grace-nowrap grace-flex-end">
				<view class="grace-margin-top">
					<graceDateTime @confirm="confirm2" :value="demo4Val" :isTime="false">
						<text class="demo grace-border-radius">{{ demo4Val }}</text>
					</graceDateTime>
				</view>
			</view>
		</view>
		<view class="grace-list-items">
			<view class="grace-list-body grace-border-b">
				<view class="grace-margin-top">
					<graceCheckBtn :checked="val" :parameter="[1, 2, 3]" @change="checkedChange" :size="46"><text class="grace-text">托管模式</text></graceCheckBtn>
				</view>
			</view>
		</view>
		<view class="grace-list-items">
			<view class="grace-list-body grace-border-b">
				<view class="grace-list-title"><text class="grace-list-title-text">*施工内容</text></view>
				<view><textarea value="" placeholder="请输入详细的施工内容" style="border: solid 1px;" /></view>
			</view>
		</view>

		<view style="display: flex; flex-direction: row; margin-top: 50upx;">
			<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;">提交订单</button>
		</view>
		<view style="display: flex; justify-content: center;">
			<graceCheckBtn :checked="val1" :parameter="[1, 2, 3]" @change="checkedChange1" :size="46"><text class="grace-text">同意阅读异修服务协议</text></graceCheckBtn>
		</view>
	</view>
</template>
<script>
import gracePage from '@/graceUI/components/gracePage.vue';
import graceSelectTags from '@/graceUI/components/graceSelectTags.vue';
import graceSegmentedControl from '@/graceUI/components/graceSegmentedControl.vue';
import graceCheckBtn from '@/graceUI/components/graceCheckBtn.vue';
import graceNumberBox from '../../graceUI/components/graceNumberBox.vue';
import graceDateTime from '../../graceUI/components/graceDateTime.vue';
export default {
	data() {
		return {
						demo4Val: '请选择具体日期',
			idCard1 : '../../static/shili.png',
			idCard2 : '../../static/tianjia.png',
			val: false,
			val1: false,
			demo1Val: 0, // 用于保存选中值、参与表单提交
			demo1: [{ name: '装修', value: '0', checked: true }, { name: '安装', value: '1', checked: false }, { name: '围挡搭建', value: '2', checked: false }],
			demo2Val: [], // 用于保存选中值、参与表单提交
			demo2: null,
			// 分段器文本
			status: ['默认', '全选', '全不选']
		};
	},
	onLoad: function() {
		// 模拟 api 数据加载
		setTimeout(() => {
			this.demo2 = [
				{ name: '专人配送', value: '0', checked: true },
				{ name: '精品品牌', value: '1', checked: false },
				{ name: '超值优惠', value: '2', checked: false },
				{ name: '门店自提', value: '3', checked: true },
				{ name: '三小时到', value: '4', checked: false }
			];
		}, 1000);
	},
	methods: {
		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		},
		confirm2: function(res) {
			this.demo4Val = res[0] + '-' + res[1] + '-' + res[2];
		},
		selectImg1 : function() {
			uni.chooseImage({
				count:1,
				success:(res)=>{
					this.idCard1 = res.tempFilePaths[0];
				}
			})
		},
		selectImg2 : function() {
			uni.chooseImage({
				count:1,
				success:(res)=>{
					this.idCard2 = res.tempFilePaths[0];
				}
			})
		},
		checkedChange: function(e) {
			console.log(e);
			this.val = e[0];
		},
		checkedChange1: function(e) {
			console.log(e);
			this.val1 = e[0];
		},
		change1: function(val) {
			this.demo1Val = val;
		},
		change2: function(val) {
			this.demo2Val = val;
		},
		formSubmit: function(e) {
			console.log('单选值 : ', this.demo1Val);
			console.log('多选值 : ', this.demo2Val);
		},
		changeStatus: function(index) {
			// 全选
			if (index == 1) {
				this.$refs.graceSelectTags2.selectAll();
			}
			// 全不选
			else if (index == 2) {
				this.$refs.graceSelectTags2.clearSelected();
			}
			// 设置默认值
			else {
				this.demo2 = [
					{ name: '专人配送', value: '0', checked: true },
					{ name: '精品品牌', value: '1', checked: false },
					{ name: '超值优惠', value: '2', checked: false },
					{ name: '门店自提', value: '3', checked: true },
					{ name: '三小时到', value: '4', checked: false }
				];
			}
		}
	},
	components: {
		gracePage,
		graceSelectTags,
		graceSegmentedControl,
		graceCheckBtn,
				graceDateTime
	}
};
</script>
<style>
page {
	background: #f8f8f8;
}
.grace-idcard-main {
	margin: 25rpx;
}
.grace-idcard-desc {
	background-color: #ffffff;
	color: #666666;
	line-height: 56rpx;
	font-size: 26rpx;
	padding: 20rpx;
	border-radius: 10rpx;
}
.grace-idcard-text {
	line-height: 1.8em;
	margin-top: 30rpx;
	color: #666666;
}
.grace-idcard-items {
	background-color: #ffffff;
	padding: 50rpx;
	border-radius: 10rpx;
	margin-top: 15rpx;
}
.grace-idcard-items-image {
	width: 398rpx;
}
</style>
