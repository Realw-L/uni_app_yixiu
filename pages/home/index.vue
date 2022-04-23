<template v-bind:>
	<view>
		<uni-nav-bar
			color="#333333"
			background-color="#FFFFFF"
			fixed="false"
			right-icon="list"
			@click-left="goDetailPage('/pages/home/city?city=' + city)"
			@click-right="goDetailPage('news')"
		>
			<block slot="left" style="width: 120upx; ">
				<view class="city" style="width: 120upx; " @tap="goDetailPage('/pages/home/city?city=' + city)">
					<text style="width: 60upx;">{{ city }}</text>
					<!-- <uni-icon type="arrowdown" color="#333333" size="22"></uni-icon> -->
					<text class="grace-icons icon-arrow-down"></text>
				</view>
			</block>
			<view class="input-view">
				<text class="grace-icons icon-search"></text>
				<input confirm-type="search" @confirm="onConfirmSearch" class="input" type="text" placeholder="输入搜索地址" />
			</view>
			<block slot="right" style="width: 50upx;">
				<view class="city" style="width: 50upx; ">
					<!-- <text style="width: 60upx;">分享</text> -->
					<text class="grace-icons icon-share" style="font-size: 45upx; margin-right:10upx;"></text>
				</view>
			</block>
		</uni-nav-bar>
		<view class="grace-body">
			<view class="page-section swiper  grace-box-shadow" style="background-color: white;">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(ad, index) in pageData.ad.data" :key="index">
							<view class="swiper-item uni-bg-red" @tap="GoAdPage(ad)"><image :src="image_root+ad.image" mode="" style="width: 100%; height: 160px;"></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view style="display: flex; justify-content: space-between;"><text style="font-size: 35upx;">下单选择</text></view>
			<view class=" grace-bg-white">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" style="height: 400upx;">
							<swiper-item>
								<view class="swiper-item">
									<view class=" demoForIcon grace-margin-top " style="display: flex; justify-content: space-between; text-align: center;">
										<view class="items" @tap="goDetailPage('order/add_order?service_id=1')">
											<view class="icon"><image src="../../static/img/1.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">店铺维修</view>
										</view>
										<view class="items" @tap="goDetailPage('order/add_order?service_id=1')">
											<view class="icon"><image src="../../static/img/2.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">广告/招牌</view>
										</view>

										<view class="items" @tap="goDetailPage('order/add_order?service_id=1')">
											<view class="icon"><image src="../../static/img/3.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">找设计</view>
										</view>
										<view class="items" @tap="goDetailPage('order/add_order?service_id=1')">
											<view class="icon"><image src="../../static/img/4.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">找展柜</view>
										</view>
										<view class="items" @tap="goDetailPage('order/add_order?service_id=1')">
											<view class="icon"><image src="../../static/img/5.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">门头</view>
										</view>
									</view>
									<view class=" demoForIcon grace-margin-top " style="display: flex; justify-content: space-between; text-align: center;  ">
										<view class="items" @tap="goDetailPage('order/add_order?service_id=1')">
											<view class="icon"><image src="../../static/img/1.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">店铺拆装</view>
											<text style="color: #AAAAAA; ">(标准下单)</text>
										</view>
										<view class="items" @tap="goDetailPage('order/add_order?service_id=1')">
											<view class="icon"><image src="../../static/img/2.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">店铺复尺</view>
											<text style="color: #AAAAAA; ">(标准下单)</text>
										</view>

										<view class="items" @tap="goDetailPage('order/add_order?service_id=1')">
											<view class="icon"><image src="../../static/img/3.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">围挡</view>
											<text style="color: #AAAAAA; ">(标准下单)</text>
										</view>
										<view class="items" @tap="goDetailPage('order/add_order')">
											<view class="icon"><image src="../../static/img/4.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">招牌安装</view>
											<text style="color: #AAAAAA; ">(标准下单)</text>
										</view>
										<view class="items">
											<view class="icon"><image src="../../static/img/5.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">其他</view>
										</view>
									</view>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">
									<view class=" demoForIcon grace-margin-top " style="display: flex; justify-content: space-between; text-align: center;">
										<view class="items" @tap="goDetailPage('order/add_order?id='+item.id)" v-for="(item,index) in pageData.mainmenu.data"  :key="index">
											<view class="icon"><image src="../../static/img/1.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">{{item.name}}</view>
										</view>
										
									</view>
									<view class=" demoForIcon grace-margin-top " style="display: flex; justify-content: space-between; text-align: center;  ">
										<view class="items" @tap="goDetailPage('order/add_order')">
											<view class="icon"><image src="../../static/img/1.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">店铺拆装</view>
											<text style="color: #AAAAAA; ">(标准下单)</text>
										</view>
										<view class="items" @tap="goDetailPage('order/add_order')">
											<view class="icon"><image src="../../static/img/2.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">店铺复尺</view>
											<text style="color: #AAAAAA; ">(标准下单)</text>
										</view>
							
										<view class="items" @tap="goDetailPage('order/add_order')">
											<view class="icon"><image src="../../static/img/3.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">围挡</view>
											<text style="color: #AAAAAA; ">(标准下单)</text>
										</view>
										<view class="items" @tap="goDetailPage('order/add_order')">
											<view class="icon"><image src="../../static/img/4.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">招牌安装</view>
											<text style="color: #AAAAAA; ">(标准下单)</text>
										</view>
										<view class="items">
											<view class="icon"><image src="../../static/img/5.png" mode="" style="width: 70upx; height: 70upx;"></image></view>
											<view class="text">其他</view>
										</view>
									</view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<graceSpeaker :vertical="true" iconColor="#E76B61" :interval="5000" iconClass="grace-icons icon-speaker" :msgs="speakerMsgs"></graceSpeaker>
			<view style="display: flex; flex-direction: row;">
				<view style=" text-align: center;">
					<text
						class="grace-tags-large margin grace-tbr grace-box-shadow grace-bg-white "
						style="font-size:30upx;  width: 250upx;padding: 50upx;"
						@tap="goDetailPage('bid/index')"
					>
						装修询价
					</text>
				</view>
				<view style=" text-align: center;">
					<text
						class="grace-tags-large margin grace-tbr grace-bg-white grace-box-shadow"
						style="font-size:30upx; width: 250upx; padding: 50upx; "
						@tap="goDetailPage('bid/index')"
					>
						巡展搭建
					</text>
				</view>
			</view>
			<view style="display: flex; flex-direction: row; ">
				<view  style=" text-align: center;">
					<text
						class="grace-tags-large margin grace-tbr grace-bg-white grace-box-shadow"
						style="font-size:30upx;  width: 250upx;padding: 50upx; "
						@tap="goDetailPage('new_user')"
					>
						找项目管家
					</text>
				</view>
				<view  style=" text-align: center;">
					<text
						class="grace-tags-large margin grace-tbr grace-bg-white  grace-box-shadow"
						style="font-size:30upx; width: 250upx; padding: 50upx; "
						@tap="goDetailPage('master')"
					>
						找师傅
					</text>
				</view>
			</view>
			<view style="display: flex; justify-content: space-between; align-items: center;">
				<text style="margin-left: 10px;">优秀案例</text>
				<text style="color: red;" @tap="goDetailPage('new_object')">更多>></text>
			</view>
			<scroll-view class="grace-scroll-x" :show-scrollbar="false" scroll-x style="height: 300upx; background-color: white;">
				<view class="grace-scroll-x-items" v-for="(item, index) in pageData.ordercase.data" :key="index">
					<view class="demo grace-border grace-border-radius-small" style="width: 320upx; height: 250upx; display: flex; justify-content: center;">
						<view style="display: flex; flex-direction: column;">
							<image :src="image_root+item.cover" mode="" style="height:200upx; width: 300upx; "></image>
							<text>{{item.address | subStr(20,10)}}</text>
							<text>{{item.address | cutStr(10)}}</text>
						</view>
					</view>
				</view>
			</scroll-view>

			<view class="content  grace-box-shadow" v-for="(cate, cindex) in NonstandardCategory" :key="cindex">
				<view style="display: flex; justify-content: space-between; align-items: center;">
					<text style="margin-left: 10px;" >{{cate.name}}</text>
					<text style="color: red;" @click="goDetailPage('order/category?service_id='+cate.id)">更多>></text>
				</view>
				<view class=" grace-bg-white grace-grids  five">
					<view class="grace-grids-items" @click="goDetailPage('order/index?service_id='+item.id)"  v-for="(item, index) in cate.promotion" :key="index">
						<image class="grace-grids-icon-img" src="../../static/img/1.png" mode="widthFix"></image>
						<text class="grace-grids-text">{{item.name}}</text>
					</view>
					
				</view>
			</view>
			<view class="content" style="margin-top: 20upx;">
				<view v-show="current === 1">
					<view class="uni-list">
						<view class="uni-triplex-row" v-show="!orders.content || orders.content.length <= 0"><text class="uni-title uni-ellipsis uni-center">暂无数据</text></view>
						<block v-for="(item, index) in orders.content" :key="index">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" @tap="goOrderDetailPage(item)">
								<view class="uni-triplex-row">
									<view class="uni-triplex-left">
										<text class="uni-title uni-ellipsis">{{ item.name }} 时间:{{ item.create_time }}</text>
										<view style="flex-direction: row;justify-content: space-between;">
											<text class="uni-text">订单:{{ item.order_no }}</text>
										</view>
										<text class="uni-text-small uni-ellipsis">{{ item.address }}</text>
									</view>
									<view class="uni-triplex-right">{{ item.dist }}</view>
								</view>
							</view>
						</block>
					</view>
				</view>

				<view v-show="current === 2">
					<view class="uni-list">
						<view class="uni-triplex-row" v-show="!masters.content || masters.content.length <= 0">
							<text class="uni-title uni-ellipsis uni-center">暂无数据</text>
						</view>

						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, key) in masters.content" :key="key">
							<view class="uni-list-cell-navigate uni-navigate-right uni-media-list " @tap="goMasterPage(item)">
								<view class="uni-media-list-logo"><image v-if="item.avatar" :src="item.avatar"></image></view>
								<view class="uni-media-list-body" style="height: 110upx;">
									<view class="uni-media-list-text-top">
										昵称:{{ item.nickname }}
										<!-- 加入时间:{{item.create_time}} -->
									</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">技能:{{ item.skill == null ? '暂无' : item.skill }}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">服务:{{ item.description == null ? '暂无' : item.description }}</view>
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
			</view>
		</view>
	</view>
</template>
<script>
import uniNavBar from '@/components/uni-nav-bar.vue';

import uniSegmentedControl from '@/components/uni-segmented-control.vue';

import util from '@/common/util.js';

var graceChecker = require('../../common/graceChecker.js');
import graceSpeaker from '@/graceUI/components/graceSpeaker.vue';
import uniLoadMore from '@/components/uni-load-more.vue';

var bitmap = null;
let _self = {};
export default {
	components: {
		uniNavBar,
		uniSegmentedControl,
		graceSpeaker,
		uniLoadMore
	},
	data() {
		return {
			init: false,
			pageData:{},
			NonstandardCategory:{},
			
			image_root:this.$util.IMAGE_URI,
			title: 'swiper',
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			speakerMsgs: [{ title: '黄师傅完成了一单', url: '../index/index', opentype: 'navigate' }, { title: '李师傅完成了一单', url: '../index/index', opentype: 'switchTab' }],
			city: '',
			local_city: '',
			//segment

			items: ['附近', '找订单', '找师傅'],
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
			activeColor: '#8BC21F',
			styleType: 'button',
			//end

			//map
			latitude: 0.0,
			longitude: 0.0,
			local_gps_longitude: 0.0,
			local_gps_latitude: 0.0,
			markers: [
				// {
				// 					id:1,
				// 						latitude: 22.9085,
				// 						longitude: 114.39747,
				// 						iconPath: '../../static/map/master_pin.png',
				// 						callout:{
				// 							content:'万先生:\n地址:深圳龙岗平湖',
				// 							color:'blue',
				// 							// display:'ALWAYS',
				// 						}
				// 					},
				// 					{
				// 						id:2,
				// 						latitude: 22.9,
				// 						longitude: 114.39,
				// 						iconPath: '../../static/map/order_pin.png',
				// 							callout:{
				// 								content:'装修:\n单号:343243434',
				// 							color:'red',
				// 							// display:'ALWAYS',
				// 						}
				// 					},
			], //--------------------------
			controls: [
				{
					id: 1,
					iconPath: '../../static/map/location.png',
					clickable: true,
					position: {
						left: 5,
						top: 400,
						width: 30,
						height: 30
					}
				}
			],
			lists: [],
			adLists: [],
			categories: [],
			orders: { status: 1, page: 0, page_size: 10, content: [] },
			masters: { status: 1, page: 0, page_size: 10, content: [] },
			speakerIconImg: '../../static/images/order.png',
			speakerNews: [],
			mapCxt: {},
			search_key: '',
			popmenuShowX: true
		};
	},

	onLoad() {
		_self = this;
		this.initLocation();
		this.loadNonstandardCategory()
		//if  dev mode init data
		if (util.isDevMode()) {
			_self.latitude = util.DEFAULT_LATITUDE;
			_self.longitude = util.DEFAULT_LONGITUDE;
			uni.setStorageSync('local_gps', util.DEFAULT_LONGITUDE + ',' + util.DEFAULT_LATITUDE);
			uni.setStorageSync('local_gps_longitude', util.DEFAULT_LONGITUDE);
			uni.setStorageSync('local_gps_latitude', util.DEFAULT_LATITUDE);
			uni.setStorageSync('local_city', '深圳');
			_self.city = '深圳';
		}

		// this.mapCxt = uni.createMapContext(this.$refs.mapid,this);
		//fixme: use it, the map cann't show.
		uni.getLocation({
			type: 'wgs84',

			success: function(res) {
				console.debug('getLocation：' + JSON.stringify(res));
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);

				_self.latitude = res.latitude;
				_self.longitude = res.longitude;

				//save local gps
				uni.setStorageSync('local_gps', res.longitude + ',' + res.latitude);
				uni.setStorageSync('local_gps_longitude', res.longitude);
				uni.setStorageSync('local_gps_latitude', res.latitude);
				_self.local_gps_longitude = res.longitude;
				_self.local_gps_latitude = res.latitude;

				console.log('local_gps' + res.longitude + ',' + res.latitude);
				//get city info
				_self.GetLocalCity(res.longitude + ',' + res.latitude, '');

				//sync location
				if (uni.getStorageSync('login_status') == 1) {
					var reqData = {
						type: 0,
						gps_address: _self.city,
						city_id: '',
						city: _self.city,
						longitude: _self.longitude,
						latitude: _self.latitude
					};
					_self.synUserPlace(reqData);
				}
			},
			fail: function(res) {
				console.error('getLocation：' + JSON.stringify(res));
				_self.initLocation();
			},
			complete: function(res) {
				if (!_self.city || _self.city.length <= 0) {
					_self.initLocation();
				}
			}
		});

		this.init = true;
	},
	onShow() {
		if (!this.init) {
			this.init = true;
		}
		//check same city
		var new_city = uni.getStorageSync('city');
		var city_center = uni.getStorageSync('city_center');
		console.info('on show: new_city' + new_city + 'local city is:' + _self.local_city);
		console.info('on show: city_center' + city_center);
		if (city_center && _self.city != new_city) {
			//relocation the map  to city center
			// if(city_center){ //fixme: for test
			console.info('on show: need switch city  from ' + _self.city + ' to ' + new_city);
			_self.city = new_city;
			// city_center parse to
			if (new_city == _self.local_city) {
				_self.longitude = _self.local_gps_longitude;
				_self.latitude = _self.local_gps_latitude;
			} else {
				if (city_center.length > 0) {
					//use the city center

					var locArr = city_center.split(',');

					_self.longitude = locArr[0];
					_self.latitude = locArr[1];
					//reload order: auto load in onready
					// _self.onLoadMaster(1);
					// _self.onLoadTasks(1);
					if (uni.getStorageSync('login_status') == 1) {
						var reqData = {
							type: 0,
							gps_address: '',
							city_id: '',
							city: _self.city,
							longitude: _self.longitude,
							latitude: _self.latitude
						};
						_self.synUserPlace(reqData);
					}
				}
			}
		} else {
			//location local
			_self.longitude = _self.local_gps_longitude;
			_self.latitude = _self.local_gps_latitude;
			console.info('on show: need not switch city');
		}

		//this.onLoadTasks(1);
		//this.onLoadMaster(1);
	},
	onPullDownRefresh() {
		console.log('refresh');
		//clear
		(this.masters = { status: 1, page: 0, page_size: 10, content: [] }), (this.orders = { status: 1, page: 0, page_size: 10, content: [] }), this.onLoadTasks(1);
		//this.onLoadMaster(1);

		uni.stopPullDownRefresh();
	},
	onReachBottom() {
		//load more
		//this.onLoadTasks(1);
		//this.onLoadMaster(1);
	},
	onReady() {
		
		//check storage
		this.user = uni.getStorageSync('user_info');
		if (this.user) {
		} else {
			this.loadUserDetail();
		}

		this.loadCategory();
	
		this.loadPageData();
		return;
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
	filters: {
		calcKM: function(dist) {
			var val = this.calcKM();

			console.info('calcKM:', val);
			return val;
		}
	},
	methods: {
		loadNonstandardCategory:function(){
			uni.request({
				url: this.$util.NEW_API_URI+'/service/category',
				method: 'GET',
				data:{},
				success: res=>{
					if (res.statusCode == 200) {
						console.debug('nonstandard category:',res.data.data)
						_self.NonstandardCategory = res.data.data
						uni.setStorageSync('nonstandard_category', res.data.data)
						
						//cate list
						
						for (var i=0; i<_self.NonstandardCategory.length; i++) {
							 var cate = _self.NonstandardCategory[i]
							 cate.promotion = []
							 for (var j=0; j<(cate.children!=null?cate.children.length:0); j++) {
								var scate = cate.children[j]
								 for (var k=0; k<(scate.children!=null?scate.children.length:0); k++) {
								 
									cate.promotion.push(scate.children[k])
									if(cate.promotion.length>3)
										break
								 }
							 }
						}
						
						console.debug('NonstandardCategory:',_self.NonstandardCategory)
					}
				},
				fail: (err) => {
					console.error(err)
				}
				});
				
		},
		loadPageData:function(){
			uni.request({
				url: this.$util.BATCHSQL_URI,
				method: 'post',
				data: {
					  "yixiou.page.home.ad|ad": {
					  },
					  "yixiou.page.home.mainmenu|mainmenu": {
					  },
					  "yixiou.page.home.message|message": {
					  },
					  "yixiou.page.home.categorymenu|categorymenu": {
					  },
					  "yixiou.page.home.ordercase|ordercase": {
					  }
				},
				success: res => {
					console.log('submit form success:', res);
					if (res.statusCode == 200) {
						_self.pageData = res.data.data;
						
						_self.speakerMsgs = []
						for (var i=0 ; i < res.data.data.message.data.length; i++) {
							var item = res.data.data.message.data[i]
							
							_self.speakerMsgs.push({title:item.message, id:item.id, url: '../index/index', opentype: 'navigate' })
						}
						_self.speakerMsgs
						console.log('page data:', res);
					} else {
						
					}
				},
				fail: (err) => {
					console.error(err)
				}
			});
		},
		GoOrder: function(service_id) {
			uni.navigateTo({
				url: 'order/index?service_id=' + service_id
			});
		},
		// #ifdef APP-PLUS
		createtab: function() {
			// 设置水平居中位置
			var leftPos = Math.ceil((plus.screen.resolutionWidth - 60) / 2);
			var view = new plus.nativeObj.View('icon', {
				bottom: '19px',
				left: leftPos + 'px',
				width: '60px',
				height: '60px'
			});
			view.drawBitmap(bitmap, {
				tag: 'font',
				id: 'icon',
				src: '/static/app-tabber/my_order.png',
				position: {
					top: '0px',
					left: '5px',
					width: '50px',
					height: '100%'
				}
			});
			view.addEventListener(
				'click',
				function(e) {
					uni.switchTab({
						url: '/pages/home/order/index'
					});
				},
				false
			);
			view.show();
		},
		// #endif

		onControltap: function(e) {
			console.debug('onControltap:' + JSON.stringify(e));

			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.debug('getLocation：' + JSON.stringify(res));
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);

					_self.latitude = res.latitude;
					_self.longitude = res.longitude;
				},
				fail: function(res) {
					console.error('getLocation：' + JSON.stringify(res));
				},
				complete: function(res) {}
			});
		},
		initLocation: function() {
			_self.latitude = util.DEFAULT_LATITUDE;
			_self.longitude = util.DEFAULT_LONGITUDE;
			_self.local_gps_latitude = util.DEFAULT_LATITUDE;
			_self.local_gps_longitude = util.DEFAULT_LONGITUDE;

			uni.setStorageSync('local_gps', util.DEFAULT_LONGITUDE + ',' + util.DEFAULT_LATITUDE);
			uni.setStorageSync('local_gps_longitude', util.DEFAULT_LONGITUDE);
			uni.setStorageSync('local_gps_latitude', util.DEFAULT_LATITUDE);
			uni.setStorageSync('local_city', '深圳');
			_self.city = '深圳';
			_self.local_city = '深圳';
		},
		showmenuX: function() {
			// this.popmenuShowX = !this.popmenuShowX;

			uni.navigateTo({
				url: '/pages/home/order/index?id=49'
			});
		},
		// qa:https://lbs.amap.com/api/webservice/guide/api/search
		searchPOI(key) {
			// 在天安门周围1千米内对关键字“肯德基”进行检索
			var city_center = this.longitude + ',' + this.latitude;
			console.debug('search center:', city_center);
			var uri = 'https://restapi.amap.com/v3/place/around?key=f4ef5eba538efbe9a6f7147c601f8f2e&location=' + city_center + '&keywords=' + key;
			if (key == '') {
				uri =
					'https://restapi.amap.com/v3/place/around?key=f4ef5eba538efbe9a6f7147c601f8f2e&location=' +
					city_center +
					'&types=190000|180000|170000|140000|120000|060000|050000&keywords=' +
					key;
			}
			var self = this;
			uni.request({
				url: uri,
				methods: 'get',
				success: ret => {
					self.pois = ret.data.pois;
					if (self.pois && self.pois.length > 0) {
						var loc = self.pois[0].location;
						var locArr = loc.split(',');
						_self.latitude = locArr[1];
						_self.longitude = locArr[0];
						return;
					}
					console.debug(JSON.stringify(ret.data));
				},
				fail: res => {}
			});
		},
		calcKM: function(dist) {
			if (!dist) return '';

			var d = parseFloat(dist);
			if (d > 1000) {
				d = d / 1000;
				return Math.round(d).toString() + 'km';
			}

			var val = Math.round(d).toString() + 'm';
			console.info('calcKM:', val);
			return val;
		},
		synUserPlace(reqData) {
			//api: user/sync_places
			util.POST('user/sync_places', reqData, function(data) {
				if (data.status == 1) {
				}
			});
		},
		// qa:https://lbs.amap.com/api/webservice/guide/api/search
		GetLocalCity(city_center, key) {
			// 在天安门周围1千米内对关键字“肯德基”进行检索
			var uri = 'https://restapi.amap.com/v3/place/around?key=f4ef5eba538efbe9a6f7147c601f8f2e&location=' + city_center + '&keywords=' + key;
			if (key == '') {
				uri =
					'https://restapi.amap.com/v3/place/around?key=f4ef5eba538efbe9a6f7147c601f8f2e&location=' +
					city_center +
					'&types=190000|180000|170000|140000|120000|060000|050000&keywords=' +
					key;
			}

			uni.request({
				url: uri,
				methods: 'get',
				success: ret => {
					console.log('get local city:' + JSON.stringify(ret));
					let pois = ret.data.pois;
					if (pois.length > 0) {
						if (_self.local_city == '') {
							//remove 市
							var city = pois[0].cityname;
							var endPos = city.lastIndexOf('市');
							if (endPos > 0) {
								city = city.substring(0, endPos);
							}
							_self.city = city;
							_self.local_city = city;
							uni.setStorageSync('local_city', city);
							console.info('local_city:' + city);
						}
					}
					console.debug(JSON.stringify(ret.data));
				},
				fail: res => {
					console.error('GetLocalCity err :' + JSON.stringify(ret.data));
				}
			});
		},

		onCalloutTap(e) {
			console.debug('callouttap:' + JSON.stringify(e));
			//fixme: go to order detail
			// get order_no
			var markerId = e.detail.markerId;

			uni.navigateTo({
				url: '/pages/order/task_detail?order_no=' + markerId
			});
		},
		loadUserDetail() {
			var userid;

			this.user = uni.getStorageSync('user_info');
		},

		onGoToNews(item) {
			var url = util.H5_URL + 'news/detail&id=' + item.id;
			util.goH5(url);
		},
		GoAdPage(ad) {
			console.log('go ad detail:' + JSON.stringify(ad));
			if (ad.id == 19) {
				//询价
				this.goDetailPage('bid/index');
				return;
			}

			// #ifdef APP-PLUS

			if (ad.type == 1) {
				//外链打开
				plus.runtime.openURL(ad.url);
				return;
			}
			// #endif

			//ad url: {{HOST}}/index.php/sys/ad/detail?id=19

			var durl = decodeURI(ad.url);
			// #ifdef MP-WEIXIN
			durl = util.HOST + '/index.php/sys/ad/detail?id=' + ad.id;
			// #endif
			durl = util.HOST + '/index.php/sys/ad/detail?id=' + ad.id;
			console.log('go ad url:' + durl);

			var url = util.getMainUri(durl);
			var param = util.getUriParams(durl);
			if (param && param.length > 0) {
				url += '&' + param;
			}
			if (ad) {
				uni.navigateTo({
					// url:ad.url,
					// url: '/pages/home/web?url=' + url,
					url: '/pages/home/web?url=' + url
				});
			}
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

					var mmarkers = [];
					//first is location
					mmarkers.push({
						id: 0,
						latitude: _self.latitude,
						longitude: _self.longitude,
						iconPath: '../../static/map/point.png',
						data_type: ''
					});

					for (var i = 0; i < data.content.length; i++) {
						data.content[i].avatar = util.IMAGE_URI + data.content[i].avatar;
						_self.masters.content.push(data.content[i]);
						if (data.content[i].longitude == null) continue;
						mmarkers.push({
							id: data.content[i].id,
							latitude: parseFloat(data.content[i].latitude),
							longitude: parseFloat(data.content[i].longitude),
							iconPath: '../../static/map/master_pin.png',
							data_type: 'user',
							callout: {
								content: data.content[i].username,
								color: 'blue',
								display: 'ALWAYS'
							}
						});
					} //end for

					// _self.masters.content.concat(data.content);

					_self.masters.page = data.page;
					_self.masters.page_size = data.page_size;

					_self.markers = _self.markers.concat(mmarkers);
					//reset location
					_self.longitude = _self.longitude;
					_self.latitude = _self.latitude;
				}
			);
		},

		onLoadTasks(status) {
			var taskPins = [];
			var location = this.longitude + ',' + this.latitude;
			util.GET(
				'order/tasks',
				{
					location: location,
					page: this.orders.page + 1,
					page_size: this.orders.page_size
				},
				function(data) {
					console.debug('order/tasks' + JSON.stringify(data));

					for (var i = 0; i < data.content.length; i++) {
						data.content[i].cover = util.IMAGE_URI + data.content[i].cover;
						_self.orders.content.push(data.content[i]);
						if (data.content[i].longitude == null) continue;
						taskPins.push({
							id: data.content[i].order_no,
							order_no: data.content[i].order_no,
							data_type: 'order',
							latitude: parseFloat(data.content[i].latitude),
							longitude: parseFloat(data.content[i].longitude),
							iconPath: '../../static/map/order_pin.png',
							callout: {
								content: data.content[i].order_no,
								color: 'blue',
								display: 'ALWAYS'
							}
						});
					}
					_self.orders.page = data.page;
					_self.orders.page_size = data.page_size;

					_self.markers = _self.markers.concat(taskPins);
					//不改变地图定位
					// _self.latitude = _self.latitude;
					console.debug('order/tasks :' + JSON.stringify(data));
					console.debug('_self.markers :' + JSON.stringify(_self.markers));
				}
			);
		},

		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		
		loadCategory() {
			uni.request({
				url: util.getAPI('service/lists'),
				method: 'get',
				data: {},
				success: res => {
					console.log('service lists:', res);
					if (res.statusCode == 200) {
						_self.categories = res.data.content.reverse();
						for (var i in _self.categories) {
							_self.categories[i].icon = util.IMAGE_URI + _self.categories[i].icon;
						}
						uni.setStorageSync('service', _self.categories);
					} else {
					}
				}
			});
		},
		clickLeft() {
			uni.showToast({
				title: '左侧按钮'
			});
		},
		search() {
			uni.showToast({
				title: '搜索'
			});
		},

		scan() {
			// 允许从相机和相册扫码
			uni.scanCode({
				success: function(res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		},

		onConfirmSearch(e) {
			// 				uni.showToast({
			// 					title: '搜索',
			// 				})
			// 				uni.navigateTo({
			// 					url:'/pages/home/search/search?key='+e.detail.value,
			// 					icon: 'none'
			// 				})

			this.search_key = e.detail.value;
			console.debug('search key:' + this.search_key);
			this.searchPOI(this.search_key);
		},
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		},
		trigerCollapse(e) {
			if (!this.lists[e].pages) {
				this.goDetailPage(this.lists[e].url);
				return;
			}
			for (var i = 0; i < this.lists.length; ++i) {
				if (e === i) {
					this.lists[i].open = !this.lists[e].open;
				} else {
					this.lists[i].open = false;
				}
			}
		},
		goDetailPage(page) {
			// console.info(e);
			//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
			uni.navigateTo({
				// url: url
				url: page
			});
		},
		goMasterPage(item) {
			// console.info(e);
			//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
			uni.navigateTo({
				// url: url
				url: 'master_order?id=' + item.id
			});
		},

		goCategoryPage(item) {
			console.log('----------------------------------------------------------------------');

			var url = '';
			url = '/pages/home/bid/index?id=' + item.id;
			if ('基装' == item.name) {
				url = '/pages/home/bid/index?id=' + item.id;
			} else if ('询价' == item.name) {
			} else {
				url = '/pages/home/order/index?id=' + item.id;
			}
			// console.info(e);
			//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
			uni.navigateTo({
				// url: url
				url: url
			});
		},

		goOrderDetailPage(item) {
			uni.navigateTo({
				url: '/pages/order/task_detail?order_no=' + item.order_no
			});
		}
	}
};
</script>

<style>
.grace-scroll-x-items image {
	width: 300rpx;
	height: 200rpx;
}
page {
	height: auto;
	min-height: 100%;
}

.swiper {
	height: 250 upx;
}

.swiper-item {
	display: block;
	height: 300 upx;
	line-height: 300 upx;
	text-align: center;
}

.swiper-list {
	margin-top: 40 upx;
	margin-bottom: 0;
}

.uni-common-mt {
	margin-top: 60 upx;
	position: relative;
}

.info {
	position: absolute;
	right: 20 upx;
}

.menu_item {
	width: 100 upx;
	height: 100 upx;
}

.city {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin-left: 5px;
}

.input-view {
	/* width: 92%; */
	display: flex;
	background-color: #e7e7e7;
	/* height: 30px; */
	border-radius: 10px;
	padding: 0;
	flex-wrap: nowrap;
	margin: 10px 0;
	margin-top: 7px;
	/* 		line-height: 30px; */
	align-items: center;
}

.input-view .uni-icon {
	line-height: 30px !important;
	align-self: center;
}

.input-view .input {
	height: 30px;
	line-height: 30px;
	width: 94%;
	padding: 0;
	align-self: center;
}

.map_home {
	width: 100%;
	height: 700upx;
}

map {
	width: 100%;
	height: 700upx;
}

#circleRound {
	padding: 2px;

	width: 30 upx;

	height: 30upx;

	border: 1px solid #dedede;

	-moz-border-radius: 15px;
	/* 火狐浏览器 */

	-webkit-border-radius: 15px;
	/* 谷歌和Safari浏览器 */

	border-radius: 15px;
	/* W3C 语法支持的浏览器 */

	margin-bottom: 20px;
}
.demo {
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	margin-top: 30rpx;
}
</style>
