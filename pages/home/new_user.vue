<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<view class="grace-nowrap grace-fixed-top grace-flex-vcenter" style="display: flex; justify-content: center;">
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
			<view class="grace-list">
				<view class="grace-list-items">
					<view class="grace-list-image ucenter-face grace-relative">
						<image class="grace-list-image ucenter-face-image" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
					</view>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">陈**</text>
						</view>
						<view class="grace-list-body-desc">性别：男 38岁</view>
						<view style="display: flex; flex-direction: row;">
						<view style="width:350upx; margin-top: -20upx;">		
						<graceStar :starnum="currentStarNum1" :cantap="false"></graceStar>
									</view>
									</view>
						<view class="grace-list-body-desc">好评：100%</view>
					</view>

						<view style="margin-right: 10upx;margin-top: 100upx;" @tap="goDetailPage('user')">
						<button type="default" class="grace-button" size="mini" style="background-color:#00BA62; color: #FFFFFF;">查看</button>
										</view>

				</view>
			</view>
			<view class="grace-list">
				<view class="grace-list-items">
					<view class="grace-list-image ucenter-face grace-relative">
						<image class="grace-list-image ucenter-face-image" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
					</view>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">陈**</text>
						</view>
						<view class="grace-list-body-desc">性别：男 38岁</view>
						<view style="display: flex; flex-direction: row;">
						<view style="width:350upx; margin-top: -20upx;">		
						<graceStar :starnum="currentStarNum1" :cantap="false"></graceStar>
									</view>
									</view>
						<view class="grace-list-body-desc">好评：100%</view>
					</view>

						<view style="margin-right: 10upx;margin-top: 100upx;" @tap="goDetailPage('user')">
						<button type="default" class="grace-button" size="mini" style="background-color:#00BA62; color: #FFFFFF;">查看</button>
										</view>

				</view>
			</view>
			<view class="grace-list">
				<view class="grace-list-items">
					<view class="grace-list-image ucenter-face grace-relative">
						<image class="grace-list-image ucenter-face-image" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
					</view>
					<view class="grace-list-body">
						<view class="grace-list-title">
							<text class="grace-list-title-text">陈**</text>
						</view>
						<view class="grace-list-body-desc">性别：男 38岁</view>
						<view style="display: flex; flex-direction: row;">
						<view style="width:350upx; margin-top: -20upx;">		
						<graceStar :starnum="currentStarNum1" :cantap="false"></graceStar>
									</view>
									</view>
						<view class="grace-list-body-desc">好评：100%</view>
					</view>

						<view style="margin-right: 10upx;margin-top: 100upx;" @tap="goDetailPage('user')">
						<button type="default" class="grace-button" size="mini" style="background-color:#00BA62; color: #FFFFFF;">查看</button>
										</view>
				</view>
			</view>
			<!-- 利用侧边抽屉组件实现筛选 -->
			<graceDrawer width="680rpx" :show="showFilter" v-on:closeDrawer="closeFilter" direction="right" padding="0rpx">
				<view slot="links" :style="{height:filterHeight+'px', position:'relative'}">
					<scroll-view scroll-y :style="{padding:'12px', height:scrollHeight+'px'}">
						<view>
							<text class="grace-title">筛选条件</text>
						</view>
						<view>
							<graceSelectTags ref="graceSelectTags1" :items="filterItems1" type="radio" @change="filterChange1" itemWidth="180rpx"></graceSelectTags>
						</view>
						<view class="grace-margin-top">
							<text class="grace-title">其他条件</text>
						</view>
						<view>
							<text class="grace-text">请根据项目情况仔细编写......</text>
						</view>
					</scroll-view>
					<!-- 底部按钮 -->
					<view class="grace-filter-buttons grace-rows grace-nowrap">
						<text class="grace-filter-button grace-gray" @tap="filterReset">重置条件</text>
						<text class="grace-filter-button grace-bg-blue" @tap="filterSubmit">确认筛选</text>
					</view>
				</view>
			</graceDrawer>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceSelectMenu from "../../graceUI/components/graceSelectMenu.vue";
import graceDrawer from '@/graceUI/components/graceDrawer.vue';
import graceSelectTags from '@/graceUI/components/graceSelectTags.vue';
var systemInfo = require('../../graceUI/jsTools/systemInfo.js');
import graceStar from '@/graceUI/components/graceStar.vue';
export default {
	data(){
		return {
			currentStarNum1  : 1,
			// 第1个菜单
			selectVal1 : 0,
			show1 : false,
			selectMenu1 : ['请选择地区', '深圳', '北京', '上海'],
			// 第2个菜单
			selectVal2 : 0,
			show2 : false,
			selectMenu2 : ['请选择类型', '围挡', '维修', '拆装'],
			// 第3个菜单
			selectVal3 : 0,
			show3 : false,
			selectMenu3 : ['按照排序', '距离', '单量', '不限'],
			
			// 侧边抽屉
			filterHeight : 300,
			scrollHeight : 300,
			showFilter : false,
			filterVal1 : 0, // 用于保存选中值、参与表单提交
			filterItems1: [
				{ name: '条件1', value: '0', checked: true },
				{ name: '条件2', value: '1', checked: false },
				{ name: '条件3', value: '2', checked: false },
				{ name: '条件4', value: '3', checked: false },
				{ name: '条件5', value: '4', checked: false },
				{ name: '条件6', value: '5', checked: false }
			]
		}
	},
	onLoad : function () {
		var system = systemInfo.info();
		this.filterHeight = system.windowHeight;
		this.scrollHeight = system.windowHeight - 80;
	},
	components:{
		gracePage, graceSelectMenu, graceDrawer, graceSelectTags,graceStar
	},
		onLoad : function(){
			// 延迟模拟网络请求改变星标
			setTimeout(function(){
				this.currentStarNum1 = 4;
			}.bind(this), 1000);
		},
	methods:{
		goDetailPage(page) {
			// console.info(e);
			//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
			uni.navigateTo({
				// url: url
				url: page
			});
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