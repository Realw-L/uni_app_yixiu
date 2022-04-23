<template>
	<gracePage headerBG="#FFFFFF" loadingBG="rgba(255,255,255,1)" :isLoading="pageLoading">
		<view slot="gHeader" style="padding:0 25rpx;">
			<graceNavBar :items="tabs" :currentIndex="currentIndex" @change="navChange"></graceNavBar>
		</view>
		<view slot="gBody" class="grace-flex-v1" id="gBody">
			<swiper :style="{height:mainHeight+'px'}" :current="currentIndex" @change="swiperChange">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<scroll-view scroll-y="true" :style="{height:mainHeight+'px'}">
						<view class="demo">选项内容主体区域</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "../../graceUI/components/gracePage.vue";
import graceNavBar from "../../graceUI/components/graceNavBar.vue";
export default {
    data() {
    	return {
			currentIndex: 0,
			tabs: [ '关注', '推荐'],
			mainHeight : 300,
			pageLoading : true
    	}
    },
	onReady:function(){
		setTimeout(()=>{
			uni.createSelectorQuery().select('#gBody').fields(
				{size: true}, (res) => {
					this.mainHeight = res.height;
				}
			).exec();
		},1000);
		setTimeout(()=>{this.pageLoading = false;}, 1500);
	},
	methods:{
		navChange: function (e) {
			this.currentIndex = e;
		},
		swiperChange: function (e) {
			var index = e.detail.current;
			this.currentIndex = index;
		}
	},
	components:{gracePage, graceNavBar}
}
</script>
<style>
.demo{text-align:center; line-height:150px; height:2000px;}
</style>