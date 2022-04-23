<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<view class="grace-nowrap grace-fixed-top grace-flex-vcenter grace-border-b grace-bg-white" style="display: flex;justify-content: center;">
				<view class="graceSelectMenuItem">
					<graceSelectMenu
						:show="show1"
						:items="selectMenu1"
						@showMenu="showMenu1"
						@close="closeMenu1"
						@select="select1"
						:height="500"
						:selectIndex="selectVal1"
					></graceSelectMenu>
				</view>
				<view class="graceSelectMenuItem">
					<graceSelectMenu
						:show="show2"
						:height="500"
						:items="selectMenu2"
						:selectIndex="selectVal2"
						@showMenu="showMenu2"
						@close="closeMenu2"
						@select="select2"
					></graceSelectMenu>
				</view>
			</view>
			<!-- 这个 view 是用于占位的 避免吸顶元素遮住下面的内容 -->
			<view style="height:100rpx;"></view>
			<!-- 页面数据展示 -->
			<view>

				<view class="grace-margin-top grace-text-center">
					
					<view class="uni-header-logo">
						<view class="uni-flex" style="margin-top: 5upx; display: flex; justify-content: center; background-color: #FFFFFF;">				
							<view class="uni-flex uni-column" style="flex:1; height: :500upx; ">
											<view class="grace-border-b" style="display: flex; flex-direction: row; margin-left: 100upx;  ">
												<graceCheckBtn :checked="val" :parameter="[1,2,3]" @change="checkedChange" :size="46">
													<view class="text" style=" font-size:25upx; display: flex; justify-content: space-between;">
														<text>全选</text>
													</view>
												</graceCheckBtn>
											</view>
											<view style="display: flex; flex-direction: row; margin-left: 100upx;  margin-top: 5upx;">
												<graceCheckBtn :checked="val" :parameter="[1,2,3]" @change="checkedChange1" :size="46">
													<view class="text" style=" font-size:25upx; display: flex; justify-content: space-between;">
														<text>服务类目：店铺装修</text>
														<text style="margin-right:150upx;" >金额：1000</text>
													</view>
												</graceCheckBtn>
											</view>
								<view class="text" style=" text-align: left;  margin-left: 150upx; ">
									<image src="../../static/111.png" mode="" style="width: 50upx;height: 50upx;"></image>
									<text style="color: #AAAAAA;">施工时间：2020-07-14</text>
								</view>
								<view class="text" style=" text-align: left;   margin-left: 150upx;">
									<image src="../../static/111.png" mode="" style="width: 50upx;height: 50upx;"></image>
									<text style="color: #AAAAAA;">施工地址：深圳市龙岗区布吉街道112号</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="grace-margin-top grace-text-center">
					<view class="uni-header-logo" >
						<view class="uni-flex" style="margin-top: 5upx; display: flex; justify-content: center; background-color: #FFFFFF;">
							<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 10upx;">
											<view style="display: flex; flex-direction: row; margin-left: 100upx; ">
												<graceCheckBtn :checked="val" :parameter="[1,2,3]" @change="checkedChange2" :size="46">
													<view class="text" style=" font-size:25upx; display: flex; justify-content: space-between;">
														<text>服务类目：店铺装修</text>
														<text style="margin-right:150upx;" >金额：1000</text>
													</view>
												</graceCheckBtn>
											</view>
								<view class="text" style=" text-align: left;  margin-left: 150upx; ">
									<image src="../../static/111.png" mode="" style="width: 50upx;height: 50upx;"></image>
									<text style="color: #AAAAAA;">施工时间：2020-07-14</text>
								</view>
								<view class="text" style=" text-align: left;   margin-left: 150upx;">
									<image src="../../static/111.png" mode="" style="width: 50upx;height: 50upx;"></image>
									<text style="color: #AAAAAA;">施工地址：深圳市龙岗区布吉街道112号</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="grace-margin-top grace-text-center">
					<view class="uni-header-logo" >
						<view class="uni-flex" style="margin-top: 5upx; display: flex; justify-content: center; background-color: #FFFFFF;">
							<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 10upx;">
											<view style="display: flex; flex-direction: row; margin-left: 100upx; ">
												<graceCheckBtn :checked="val" :parameter="[1,2,3]" @change="checkedChange3" :size="46">
													<view class="text" style=" font-size:25upx; display: flex; justify-content: space-between;">
														<text>服务类目：店铺装修</text>
														<text style="margin-right:150upx;" >金额：1000</text>
													</view>
												</graceCheckBtn>
											</view>
								<view class="text" style=" text-align: left;  margin-left: 150upx; ">
									<image src="../../static/111.png" mode="" style="width: 50upx;height: 50upx;"></image>
									<text style="color: #AAAAAA;">施工时间：2020-07-14</text>
								</view>
								<view class="text" style=" text-align: left;   margin-left: 150upx;">
									<image src="../../static/111.png" mode="" style="width: 50upx;height: 50upx;"></image>
									<text style="color: #AAAAAA;">施工地址：深圳市龙岗区布吉街道112号</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex; flex-direction: row; margin-top: 50upx;">
					<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;" @tap="goDetailPage('my/ticket_order')">提交开票</button>
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script>
import gracePage from '@/graceUI/components/gracePage.vue';
import graceCheckBtn from "../../graceUI/components/graceCheckBtn.vue";
import graceSelectMenu from '@/graceUI/components/graceSelectMenu.vue';
import graceDrawer from '@/graceUI/components/graceDrawer.vue';
import graceSelectTags from '@/graceUI/components/graceSelectTags.vue';
var systemInfo = require('../../graceUI/jsTools/systemInfo.js');
export default {
	data() {
		return {
			HOST: this.$util.HOST,
				val : false,
				val1 : false,
				val2 : false,
				val3 : false,
			// 第1个菜单
			selectVal1: 0,
			show1: false,
			selectMenu1: ['已开票'],
			// 第2个菜单
			selectVal2: 0,
			show2: false,
			selectMenu2: ['未开票']
			// 第3个菜单
		};
	},
	onLoad: function() {
		var system = systemInfo.info();
		this.filterHeight = system.windowHeight;
		this.scrollHeight = system.windowHeight - 80;
	},
	components: {
		gracePage,
		graceSelectMenu,
		graceDrawer,
		graceSelectTags,
		 graceCheckBtn
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
				checkedChange : function (e) {
					console.log(e);
					this.val = e[0];
				},
				checkedChange1 : function (e) {
					console.log(e);
					this.val1 = e[0];
				},
				checkedChange2 : function (e) {
					console.log(e);
					this.val2 = e[0];
				},
				checkedChange3 : function (e) {
					console.log(e);
					this.val3 = e[0];
				},
		// 下拉选择
		showMenu1: function() {
			this.show1 = true;
		},
		closeMenu1: function() {
			this.show1 = false;
		},
		select1: function(index) {
			console.log('选择了 ' + this.selectMenu1[index]);
		},
		showMenu2: function() {
			this.show2 = true;
		},
		closeMenu2: function() {
			this.show2 = false;
		},
		select2: function(index) {
			console.log('选择了 ' + this.selectMenu2[index]);
		},
		showMenu3: function() {
			this.show3 = true;
		},
		closeMenu3: function() {
			this.show3 = false;
		},
		select3: function(index) {
			console.log('选择了 ' + this.selectMenu3[index]);
		},
		// 条件筛选
		openFilter: function() {
			this.showFilter = true;
		},
		closeFilter: function() {
			this.showFilter = false;
		},
		// 可选标签事件
		filterChange1: function(val) {
			this.filterVal1 = val;
		},
		filterSubmit: function() {
			// 收集相关数据,如:
			console.log(this.filterVal1);
			// 关闭筛选
			this.showFilter = false;
		},
		filterReset: function() {
			// 将筛选的值恢复初始即可，如:
			//this.*** = ***;
			this.$refs.graceSelectTags1.graceSelectChange(0);
		}
	}
};
</script>
<style>
/* #ifdef H5 */
.grace-fixed-top {
	top: 44px;
}
/* #endif */
.graceSelectMenuItem {
	width: 187rpx;
	line-height: 90rpx;
}

.grace-filter-buttons {
	position: absolute;
	z-index: 9999;
	width: 680rpx;
	left: 0;
	bottom: 0;
	height: 50px;
	box-sizing: border-box;
}
.grace-filter-button {
	width: 600rpx;
	height: 50px;
	line-height: 50px;
	text-align: center;
	font-size: 28rpx;
	display: block;
}
</style>
