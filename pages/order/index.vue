<template >
	<view class="uni-padding-wrap uni-common-pb">
			<view style="width:750rpx; height:3000rpx; background:#F6F6F6; text-align:center; line-height:800rpx;">
				<view class="uni-padding-wrap uni-common-mt" style="align-items: center; justify-content: center; margin-bottom: 20upx; margin-left: -10upx;">
					<uni-segmented-control
						:current="current"
						:values="items"
						v-on:clickItem="onClickItem"
						:styleType="styleType"
						:activeColor="activeColor"
					></uni-segmented-control>
				</view>
				<view class="content">
					<view v-show="current == 0">
						<view class="uni-list">
							<view class="uni-triplex-left" v-show="!orders.content || orders.content.length <= 0">
								<text class="uni-title uni-ellipsis uni-center">暂无数据</text>
							</view>

							<block v-for="(item, index) in orders.content" :key="index">
								<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goOrderDetailPage(item)">
									<view class="uni-triplex-row">
										<view class="uni-triplex-left">
											<text class="uni-title uni-ellipsis">订单号：{{ item.order_no }}</text>
											<text class="uni-text">类别:{{ item.name }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 距离: {{ item.dist }}</text>
											<text class="uni-text">下单时间: {{ item.create_time }}</text>
											<text class="uni-text">施工日期：{{ item.start_time }}</text>
											<text class="uni-text-small uni-ellipsis">施工地点：{{ item.address }}</text>
										</view>
										<view class="uni-triplex-right" style="width:120upx; center;display: flex;">
											<image :src="item.cover" mode="" style="width: 120upx; height: 120upx;"></image>
											<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">{{ item.order_mode_str }}</text>
											<text class="uni-h5" style="text-align: center; color: #ff0000; font-family:黑体; font-size: 25upx; margin-top: 15upx;">
												{{ item.status_str }}
											</text>
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
					<view v-show="current == 1">
						<view class="uni-list">
							<view class="uni-triplex-row" v-show="!masters.content || masters.content.length <= 0">
								<text class="uni-title uni-ellipsis uni-center">暂无数据</text>
							</view>

							<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, key) in masters.content" :key="key">
								<view class="uni-list-cell-navigate uni-navigate-right uni-media-list " @tap="goMasterPage(item)">
									<view class="uni-media-list-logo"><image v-if="item.avatar" :src="item.avatar"></image></view>
									<view class="uni-media-list-body" style="height: 150upx; " >
										<view class="uni-media-list-text-top" style="display: flex; text-align: left;">
											昵称:{{ item.nickname }}
											<!-- 加入时间:{{item.create_time}} -->
										</view>
										<view class="uni-media-list-text-bottom uni-ellipsis" style="display: flex; text-align: left;">师傅技能:{{ item.skill == null ? '暂无' : item.skill }}</view>
										<view class="uni-media-list-text-bottom uni-ellipsis" style="display: flex; text-align: left;">服务类型:{{ item.description == null ? '暂无' : item.description }}</view>
									    <view class="uni-media-list-text-bottom uni-ellipsis" style="display: flex; text-align: left;">服务地区:龙岗区，罗湖区，南山区</view>
									</view>
									<view class="uni-triplex-right">
										{{ item.dist }}
										<text class="uni-h5" v-if="item.create_time"></text>
										<!-- <text class="uni-h5" v-if="!item.dist"></text> -->
										<!-- <text class="uni-h5" v-else>{{parseInt(item.dist)>1000?Math.round(parseInt(item.dist)/1000)+'km': parseInt(item.dist)+'m'}}</text> -->
									</view>
								</view>
							</view>
						</view>
					</view>
					<!--<view v-show="current === 2">-->
					<!--选项卡3的内容-->
					<!--</view>-->
				</view>
				<uni-load-more :loadingType="loadingType"></uni-load-more>
			</view>
		</view>
	</view>
</template>
<script>
		import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';	
		import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
//城市
import uniSegmentedControl from '@/components/uni-segmented-control.vue';
import util from '@/common/util.js';
import uniLoadMore from '@/components/uni-load-more.vue';

var self = null;
var _self = null;
export default {
	components: {

		uniSegmentedControl,
		uniLoadMore,
		//城市
		mpvuePicker,
		mpvueCityPicker		
	},
	data() {
		return {
			height: 0,
			categoryActive: 0,
			scrollTop: 0,
			scrollHeight: 0,



			image_root: util.IMAGE_URI,
			items: ['找订单', '找师傅'],
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
			colors: ['#8BC21F', '#4cd964', '#dd524d'],
			current: 0,
			activeColor: '#6cb231',
			styleType: 'button',
			orders: { status: 1, page: 0, page_size: 10, content: [] },
			masters: { status: 1, page: 0, page_size: 10, content: [] },
			loadingType: 0,
			actor: 0, // 0:user 1:master
			latitude: 0.0,
			longitude: 0.0,

			
		};
	},
	onLoad(option) {
		self = this;
		_self = this;
		this.longitude = uni.getStorageSync('local_gps_longitude');
		this.latitude = uni.getStorageSync('local_gps_latitude');
		// uni.setStorageSync('local_gps_latitude', util.DEFAULT_LATITUDE);

		console.info(JSON.stringify(option));
		this.actor = uni.getStorageSync('actor_type');
		var title = '市场订单';
		if (this.actor == 1) {
			title = '师傅订单';
		}

		if (option) {
			var status = parseInt(option.status);
			if (status == 4) {
				this.current = 2;
			}
		}

		// var status = this.getStatus();
		// this.onLoadTasks(status);
		// this.onLoadTasks(3);
		uni.setNavigationBarTitle({
			title: title
		});
	},
	onShow() {
		self = this;
		_self = this;
		this.longitude = uni.getStorageSync('local_gps_longitude');
		this.latitude = uni.getStorageSync('local_gps_latitude');

		var status = this.getStatus();

		this.orders = { status: 1, page: 0, page_size: 10, content: [] };
		this.onLoadTasks(status);
		this.onLoadMaster(1);
		
	},
	onPullDownRefresh() {
		console.log('refresh');

		(self.orders = { status: 1, page: 0, page_size: 10, content: [] }), this.onLoadTasks(3);
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onShareAppMessage() {
		return {
			title: '欢迎体验异修'
		};
	},
	onNavigationBarButtonTap(e) {
		//     uni.navigateTo({
		//       // #ifdef APP-PLUS
		//       url: '/platforms/app-plus/about/about',
		//       // #endif
		//       // #ifdef H5
		//       url: '/platforms/h5/about/about',
		//       // #endif
		//     })
		uni.navigateTo({ url: '/pages/my/order_index' });
	},
	onReachBottom() {
		if (this.loadingType !== 0) {
			return;
		}
		this.loadingType = 1;

		this.onLoadTasks(3);
	},
	
	//城市
	onLoad : function(){
	    //默认值设置，请延迟一些时间来产生组件属性变化
		setTimeout(()=>{
			this.cityPickerValueDefault2 = [8,0,0];
		}, 1000)
	},
	methods: {
		goMasterPage(item) {
			// console.info(e);
			//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
			uni.navigateTo({
				// url: url
				url: 'master_order?id=' + item.id
			});
		},
		getStatus() {
			//get order status
			var status = -1;
			if (this.current == 0) {
				// status = -1; //all
				status = 3; // 改为等抢单
			} else if (this.current == 1) {
				status = 2;
			} else if (this.current == 2) {
				status = 4; //include 5
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
				var status = this.getStatus();

				//reload
				this.onLoadTasks(status);
			}
		},
		onLoadTasks(status) {
			console.debug('status:' + status);
			this.loadingType = 1;
			var self = this;
			var location = this.longitude + ',' + this.latitude;

			var reqData = { page: this.orders.page + 1, page_size: this.orders.page_size, location: location, actor: this.actor };
			if (status != -1) {
				reqData.status = status;
			}
			reqData.actor = -1;

			//lists ==>tasks
			util.GET('order/tasks', reqData, function(data) {
				for (var i = 0; i < data.content.length; i++) {
					data.content[i].cover = util.IMAGE_URI + data.content[i].cover;

					_self.orders.content.push(data.content[i]);
				}
				_self.orders.page = data.page;
				_self.loadingType = data.content.length < 1 ? 2 : 0;
			});
		},

		goOrderDetailPage(item) {
			//fixme: for test
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
		},
		onLoadMaster(status) {
			util.GET(
				'user/public/masters',
				{
					page: this.masters.page + 1,
					page_size: this.masters.page_size,
					location: this.longitude + ',' + this.latitude
				},
				function(data) {
					//append data

					for (var i = 0; i < data.content.length; i++) {
						data.content[i].avatar = util.IMAGE_URI + data.content[i].avatar;
						_self.masters.content.push(data.content[i]);
						if (data.content[i].longitude == null) continue;
					} //end for

					// _self.masters.content.concat(data.content);

					_self.masters.page = data.page;
					_self.masters.page_size = data.page_size;
				}
			);
		}
	}
};
</script>

<style>
.graceSelectMenuItem {
	width: 200rpx;
	line-height: 90rpx;
}
/* #ifdef  H5 */
.grace-fixed-top {
	top: 44px;
}
/* #endif */
.orderImg {
	width: 28px;
	height: 28px;
}
.grace-filter-ft {
	width: 100%;
	height: 50px;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
}
.grace-filter-ft-close {
	line-height: 50px;
	text-align: center;
	width: 50%;
}
.grace-filter-rbtn {
	width: 50%;
	position: relative;
	line-height: 50px;
	color: #3688ff;
	text-align: center;
}
.grace-filter-buttons {
	opacity: 0;
	width: 100%;
	position: absolute;
	z-index: 9;
	left: 0;
	top: 0;
	height: 100rpx;
}

.demo {
	display: flex;
	flex-wrap: nowrap;
	border-left: 1px solid #f8f8f8;
	margin-top: 100rpx;
}
.demo view {
	width: 100%;
	text-align: center;
	padding: 10rpx 2%;
	border-bottom: 1px solid #f8f8f8;
	border-right: 1px solid #f8f8f8;
}
</style>
