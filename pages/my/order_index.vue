<template>
	<view class="uni-padding-wrap uni-common-pb">
		<view class="uni-padding-wrap uni-common-mt" style="align-items: center; justify-content: center; margin-bottom: 20upx; margin-left: -25upx; ">
			<uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType" :activeColor="activeColor" ></uni-segmented-control>
		</view>
		<view class="content">
			<view v-show="current >= 0">
				<view class="uni-list">
					<view class="uni-triplex-left" v-show="!orders.content || orders.content.length <= 0"><text class="uni-title uni-ellipsis uni-center">暂无数据</text></view>
					<block v-for="(item, index) in orders.content" :key="index">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goOrderDetailPage(item)">
							<view class="uni-triplex-row">
								<view class="uni-triplex-left">
									<text class="uni-title uni-ellipsis">订单号：{{ item.order_no }}</text>
									<text class="uni-text">{{ item.name }} 时间:{{ item.create_time }}</text>
									<text class="uni-text">施工日期：{{ item.start_time }}</text>
									<text class="uni-text-small uni-ellipsis">施工地点：{{ item.address }}</text>
								</view>
								<view class="uni-triplex-right" style="width:120upx; center;display: flex;">
									<image :src="image_root + item.icon" mode="" style="width: 120upx; height: 120upx;"></image>
									<text class="uni-h5" style="text-align: center; color: #448c04; font-family:黑体; font-size: 30upx; margin-top: 5upx;" >
										{{ item.order_mode_str }}
									</text>
									<text
										class="uni-h5"
										style="text-align: center; color: #ff0000; font-family:黑体; font-size: 25upx; margin-top: 15upx;">
										{{ item.status_str }}
									</text>
									<text class="uni-h5" 
									style="text-align: center; color: #ff0000; font-family:黑体; font-size: 25upx;
									 margin-top: 15upx; border-color: #09BB07; border-style: solid; border-radius: 50upx;" @tap="goDetailPage('shifubaojia')" >
										报价师傅
									</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
			<!--<view v-show="current === 1">-->
			<!--选项卡2的内容-->
			<!--</view>-->
			<!--<view v-show="current === 2">-->
			<!--选项卡3的内容-->
			<!--</view>-->
		</view>
		<uni-load-more :loadingType="loadingType"></uni-load-more>
	</view>
</template>
<script>
import uniSegmentedControl from '@/components/uni-segmented-control.vue';
import util from '@/common/util.js';
import uniLoadMore from '@/components/uni-load-more.vue';

var self = null;
export default {
	components: {
		uniSegmentedControl,
		uniLoadMore
	},
	data() {
		return {
			image_root: util.IMAGE_URI,
			items: ['全部', '未支付', '待报价', '未完成', '已完成'],
			styles: [
				{
					value: 'button',
					text: '按钮',
					checked: true
				},
				{
					value: 'text',
					text: '文字'
				}
			],
			colors: ['#007aff', '#4cd964', '#dd524d'],
			current: 0,
			activeColor: '#6cb231',
			styleType: 'button',
			orders: {page:0, page_size:10, content:[], status:1},
			loadingType: 0,
			actor: 0 // 0:user 1:master
		};
	},
	onLoad(option) {
		self = this;
		this.actor = uni.getStorageSync('actor_type');
		var title = '用户订单';
		if (this.actor == 1) {
			title = '师傅订单';
		}
		var status = this.getStatus();
		// this.onLoadTasks(status);
		uni.setNavigationBarTitle({
			title: title
		});
	},
	onShow() {
		this.orders =  {page:0, page_size:10, content:[], status:1};
		var status = this.getStatus();
		this.onLoadTasks(status);
	},
	onShareAppMessage() {
		return {
			title: '欢迎体验异修'
		};
	},
	onBackPress(options) {
		//close all   1000 course crash. 
		// uni.navigateBack() 同样会触发 onBackPress 函数。因此在 onBackPress 中直接调用 uni.navigateBack() 并始终返回 true 会引发死循环
		 if (options.from === 'navigateBack') {  
                return false;  
            }  
            
			
		var pages = getCurrentPages();
		console.debug('back :'+pages.length)
		uni.navigateBack({
			delta: pages.length
		})
		return true; //true 只有在该函数中返回值为 true 时，才表示不执行默认的返回，自行处理此时的业务逻辑。
		// uni.switchTab({
		// 	url:"/pages/home/index"
		// })
	},
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
	onPullDownRefresh() {
		console.log('refresh');
		var status = this.getStatus();
		this.orders = {page:0, page_size:10, content:[], status:1};
		
		this.onLoadTasks(status);
		
		uni.stopPullDownRefresh();
	},
	onReachBottom() {
		if (this.loadingType !== 0) {
			return;
		}
		this.loadingType = 1;

		if (!self.orders) {
			return;
		}

		var reqData = { page: self.orders.page + 1, page_size: self.orders.page_size, 
		actor: self.actor };
		if (status != -1) {
			reqData.status = status;
		}
		// reqData.actor = -1;

		util.GET('order/lists', reqData, function(data) {
			for (var i = 0; i < data.content.length; i++) {
				data.content[i].cover = util.IMAGE_URI + data.content[i].cover;
			}
			if(self.orders.content){
				
			
				self.orders.content = self.orders.content.concat(data.content);
			}
			self.orders.page = data.page;
			self.loadingType = data.content.length<1?2:0;
		});
	},
	methods: {
		getStatus() {
			//get order status
			var status = -1;
			if (this.current == 0) {
				status = -1; //all
			} else if (this.current == 1) {
				status = 2;
			} else if (this.current == 2) {
				status = 4;
			} else if (this.current == 3) {
				status = 6;
			} else {
				status = -2;
			}
			return status;
		},
		onClickItem(index) {
			console.debug('switch to :' + index);
			if (this.current !== index) {
				this.current = index;
				
				//clear
				this.orders = {page:0, page_size:10, content:[], status:1};
				
				var status = this.getStatus();

				//reload
				this.onLoadTasks(status);
			}
		},
		onLoadTasks(status) {
			console.debug('status:' + status);

			var self = this;
			var reqData = { page: this.orders.page+1, page_size: this.orders.page_size,
			 actor: self.actor };
			if (status != -1) {
				reqData.status = status;
			}

			util.GET('order/lists', reqData, function(data) {
				for (var i = 0; i < data.content.length; i++) {
					data.content[i].cover = util.IMAGE_URI + data.content[i].cover;
					//self.orders.content.push(data.content[i]);
				}
				self.orders.content = self.orders.content.concat(data.content);
				self.orders.page = data.page;
				self.orders.page_size = data.page_size;

				self.loadingType = 0;
			});
		},

		goOrderDetailPage(item) {
			var uri = '/pages/order/task_detail?order_no=' + item.order_no;
			if (this.current == 4) {
				uri = '/pages/order/task_detail_for_bid?order_no=' + item.order_no;
			}
			uni.navigateTo({
				url: uri
			});
		},

		goDetailPage(e) {
			let path = e.url ? e.url : e;
			let url = ~path.indexOf('platform') ? path : path;
			uni.navigateTo({
				url: url
			});
			return false;
		}
	}
};
</script>

<style></style>
