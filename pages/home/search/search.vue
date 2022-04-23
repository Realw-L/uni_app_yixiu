<template>
	<view>
		
			<view class="uni-list">
				<view class="uni-triplex-row" v-show="!results.content || results.content.length <= 0">
					<text class="uni-title uni-ellipsis uni-center">暂无数据</text>
				</view>
				
				<block v-for="(item,index) in results.content" :key="index">
					
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goOrderDetailPage(item)" v-if="item.content_type==0">
						<view class="uni-triplex-row">
							<view class="uni-triplex-left">
								<text class="uni-title uni-ellipsis">{{item.name}}</text>
								<text class="uni-text">{{item.order_no}}</text>
								<text class="uni-text-small uni-ellipsis">{{item.address}}</text>
							</view>
							<view class="uni-triplex-right">
								<text class="uni-h5" v-if="!item.dist"></text>
								<text class="uni-h5" v-else>{{item.dist >1000?Math.round(item.dist/1000)+'km': parseInt(item.dist)+'m'}}</text>
							</view>
						</view>
					</view>
					
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list " v-if="item.content_type==1" >
						<view class="uni-media-list-logo">
							<image v-if="item.avatar" :src="item.avatar"></image>
						</view>
						<view class="uni-media-list-body" style="height: 110upx;">
							<view class="uni-media-list-text-top">昵称:{{item.name}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">技能:{{item.skill==null?"暂无": item.skill}}</view>
							<view class="uni-media-list-text-bottom uni-ellipsis">服务:{{ item.description==null?"暂无":item.description}}</view>
						</view>
						<view class="uni-triplex-right">
							<text class="uni-h5" v-if="!item.dist"></text>
							<text class="uni-h5" v-else>{{item.dist >1000?Math.round(item.dist/1000)+'km': parseInt(item.dist)+'m'}}</text>
						</view>
					</view>
				</block>
		</view>
		
		<uni-load-more :loadingType="loadingType" ></uni-load-more>
	</view>
</template>

<script>
	import util from '@/common/util.js'
	import uniLoadMore from '@/components/uni-load-more.vue';
	
	
	var _self = null
	export default {
		components: {
		  uniLoadMore
		},
		data() {
			return {
				results:[],
				key:'',
				loadingType:0,
			};
		
		},
		onLoad(option) {
			_self = this;
			if(option){
				_self.key = option.key;
				_self.search(option.key)
			}
		},
		onReachBottom() {
			_self.loadMore();
		},
		methods:{
			search(key){
				
				var reqData = {page: 1, page_size: 10, key: key,location: uni.getStorageSync('local_gps')}

				util.GET('order/search', reqData, function (data) {
				  _self.results = data;
					
				  _self.loadingType = 0;
				});
			},
			
			loadMore(){
				var reqData = {page: _self.results.page+1, page_size: _self.results.page_size, 
							key: _self.key,location: uni.getStorageSync('local_gps')}

				util.GET('order/search', reqData, function (data) {
				  _self.results.content.contact(data.content)
				  _self.results.page = data.page;
					
				  _self.loadingType = 0;
				});
			},
		}
	}
</script>

<style>

</style>
