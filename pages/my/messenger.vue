<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody" style=" ">
			<view class="grace-nowrap grace-fixed-top grace-flex-vcenter  grace-bg-white" style="display: flex; justify-content: center;">
				<view class="graceSelectMenuItem">
					<graceSelectMenu :show="show1" :items="selectMenu1" @showMenu="showMenu1" 
					@close="closeMenu1" @select="select1" :height="500" :selectIndex="selectVal1"></graceSelectMenu>
				</view>
				<view class="graceSelectMenuItem">
					<graceSelectMenu 
					:show="show2" :height="500" :items="selectMenu2" :selectIndex="selectVal2" 
					@showMenu="showMenu2" @close="closeMenu2" @select="select2"></graceSelectMenu>
				</view>
				<view class="graceSelectMenuItem grace-nowrap grace-flex-center grace-flex-vcenter">
					<graceSelectMenu
					:show="show3" :height="500" :items="selectMenu3" :selectIndex="selectVal3" 
					@showMenu="showMenu3" @close="closeMenu3" @select="select3"></graceSelectMenu>
				</view>
			</view>
			<!-- 这个 view 是用于占位的 避免吸顶元素遮住下面的内容 -->
			<view style="height:100rpx;"></view>
			<!-- 页面数据展示 -->
			<view class="grace-margin-top grace-text-center" >
				<view class="uni-header-logo" >
							<view class="uni-flex" style="margin-top: 5upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 30upx;" @tap="goDetailPage('my/messenger_new')">
								<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
									<image :src="avatar"  style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
								</view>
								<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 50upx;">
									<view class="text" style=" font-size:25upx; text-align: left;">订单号：13246</view>
				                  <view class="text" style=" text-align: left; ">
				                  										  <text>订单类型：店铺装修</text>
				                  </view>
								 <view style=" text-align: right; margin-top: -50upx; margin-right: 50upx;">
								 <text  style="color: red;">订单已验收</text>
								 </view>
								</view>
							</view>
						</view>
			</view>
			<view class="grace-margin-top grace-text-center">
				<view class="uni-header-logo" >
							<view class="uni-flex" style="margin-top: 5upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 30upx;">
								<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
									<image :src="avatar"  style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
								</view>
								<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 50upx;">
									<view class="text" style=" font-size:25upx; text-align: left;">实名认证</view>
				                  <view class="text" style=" text-align: left; ">
				                  										  <text>恭喜您，您2020-07-13提交的实名认证资料已经通过了，请放心接单。</text>
				                  </view>
								</view>
							</view>
						</view>
			</view>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceSelectMenu from "../../graceUI/components/graceSelectMenu.vue";
import graceDrawer from '@/graceUI/components/graceDrawer.vue';
import graceSelectTags from '@/graceUI/components/graceSelectTags.vue';
var systemInfo = require('../../graceUI/jsTools/systemInfo.js');
export default {
	data(){
		return {
			HOST: this.$util.HOST,
			// 第1个菜单
			selectVal1 : 0,
			show1 : false,
			selectMenu1 : ['审核消息'],
			// 第2个菜单
			selectVal2 : 0,
			show2 : false,
			selectMenu2 : ['订单消息'],
			// 第3个菜单
			selectVal3 : 0,
			show3 : false,
			selectMenu3 : ['其他消息'],
			
		}
	},
	onLoad : function () {
		var system = systemInfo.info();
		this.filterHeight = system.windowHeight;
		this.scrollHeight = system.windowHeight - 80;
	},
	components:{
		gracePage, graceSelectMenu, graceDrawer, graceSelectTags
	},

	methods:{
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				// #ifdef APP-PLUS
				url: '/platforms/app-plus/about/about',
				// #endif
				// #ifdef H5
				url: '/platforms/h5/about/about'
				// #endif
			});
		},
		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: url
			});
			return false;
		},
		// 下拉选择
		showMenu1  : function () {this.show1 = true;},
		closeMenu1 : function () {this.show1 = false;},
		select1    : function (index) {
			console.log("选择了 " + this.selectMenu1[index]);
		},
		showMenu2  : function () {this.show2 = true;},
		closeMenu2 : function () {this.show2 = false;},
		select2    : function (index) {
			console.log("选择了 " + this.selectMenu2[index]);
		},
		showMenu3  : function () {this.show3 = true;},
		closeMenu3 : function () {this.show3 = false;},
		select3    : function (index) {
			console.log("选择了 " + this.selectMenu3[index]);
		},
		// 条件筛选
		openFilter : function () {
			this.showFilter = true;
		},
		closeFilter : function () {
			this.showFilter = false;
		},
		// 可选标签事件
		filterChange1 : function (val) {
			this.filterVal1 = val;
		},
		filterSubmit : function () {
			// 收集相关数据,如:
			console.log(this.filterVal1);
			// 关闭筛选
			this.showFilter = false;
		},
		filterReset : function () {
			// 将筛选的值恢复初始即可，如:
			//this.*** = ***;
			this.$refs.graceSelectTags1.graceSelectChange(0);
		}
	}
}
</script>
<style>
/* #ifdef H5 */
.grace-fixed-top{top:44px;}
/* #endif */
.graceSelectMenuItem{width:187rpx; line-height:90rpx;}

.grace-filter-buttons{position:absolute; z-index:9999; width:680rpx; left:0; bottom:0; height:50px; box-sizing:border-box;}
.grace-filter-button{width:600rpx; height:50px; line-height:50px; text-align:center; font-size:28rpx; display:block;}
</style>