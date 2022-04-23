<template>
	<gracePage :customHeader="false">
		<!-- 页面主体 -->
		<view slot="gBody">
			<view class="grace-nowrap grace-fixed-top grace-border-b grace-bg-white" style="display: flex; justify-content: center;">
				<view class="graceSelectMenuItem">
					<graceSelectMenu :show="show1" :items="selectMenu1" @showMenu="showMenu1" 
					@close="closeMenu1" @select="select1" :height="500" :selectIndex="selectVal1"></graceSelectMenu>
				</view>
				<view class="graceSelectMenuItem">
					<graceSelectMenu 
					:show="show2" :height="500" :items="selectMenu2" :selectIndex="selectVal2" 
					@showMenu="showMenu2" @close="closeMenu2" @select="select2"></graceSelectMenu>
				</view>
			</view>
			<!-- 这个 view 是用于占位的 避免吸顶元素遮住下面的内容 -->
			<view style="height:100rpx;"></view>
			<!-- 页面数据展示 -->
		
			<view>
				<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center" style="display: flex;flex-direction: column;">
					<view><image src="../../static/10s.png" mode="" style="width: 100%; height: 400upx;"></image></view>
					<view>龙岗区李朗国际珠宝园（案例1）</view>
					<view style="color: #AAAAAA; display: flex; justify-content: space-between;"  >
							<text>广东省/深圳市</text>
							<text>查看更多</text></view>
					</view>
				</view>
				<view class="grace-idcard-items grace-img-in grace-rows grace-flex-center" style="display: flex;flex-direction: column; margin-top: 50upx;">
					<view><image src="../../static/10s.png" mode="" style="width: 100%; height: 400upx; "></image></view>
					<view>龙岗区李朗国际珠宝园（案例2）</view>
					<view style="color: #AAAAAA; display: flex; justify-content: space-between;"  >
						<text>广东省/深圳市</text>
						<text>查看更多</text></view>
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
export default {
	data(){
		return {
			// 第1个菜单
			selectVal1 : 0,
			show1 : false,
			selectMenu1 : ['按地区', '价格排序', '评价排序', '人气排序'],
			// 第2个菜单
			selectVal2 : 0,
			show2 : false,
			selectMenu2 : ['按时间', '100 - 1000', '1000 - 10000', '10000 +'],
			// 第3个菜单
			selectVal3 : 0,
			show3 : false,
			selectMenu3 : ['全部颜色', '黑色', '蓝色', '红色'],
			
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
		gracePage, graceSelectMenu, graceDrawer, graceSelectTags
	},
	methods:{
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