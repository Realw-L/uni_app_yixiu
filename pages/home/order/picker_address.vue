<template>
	<view>
		<view class="uni-form-item uni-row" style="justify-content: center;align-items: center;">
			<view class="uni-row" style="justify-content: center;align-items: center;" @tap="goDetailPage">
				<text @tap="goDetailPage" style="margin-right: 1px;">{{ picked_city }}</text>
				<uni-icon type="arrowdown" color="#333333" size="22" @tap="goDetailPage" style="margin-right: 10px;"></uni-icon>
			</view>
			<input class="uni-input" confirm-type="search" placeholder="请输入搜索范围" style="display: flex; justify-content: center;" @input="OnInputKey" @confirm="OnInputKey" />
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<!-- <image src="../../../static/map.png" mode="" style="width: 750upx; height: 550upx;"></image> -->
			<map ref="mapid" class="map_home" :latitude="latitude" :longitude="longitude" scale="13" show-location="true" :markers="covers" @callouttap="onCalloutTap"></map>
		</view>

		<block v-for="(item, index) in pois" :key="index">
			<view style="display: flex; margin-left: 5px; flex-direction: column; background-color: #ffffff;">
				<view style="height: 1px; width: 100%; background-color:#BBBBBB;"></view>
				<view style="display: flex;flex-direction: row; flex: 1;">
					<view><uni-icon type="location" size="25"></uni-icon></view>

					<view style="display: flex; flex-direction: column; flex: 1;" @click="onPicker(item)">
						<view style="display: flex;flex-direction: row; justify-content: space-between; " >
							<text style="" >{{ item.name }}</text>
							<text style="" v-if="item.distance > 1000">{{ item.distance / 1000 }}km</text>
							<text style=""  v-else>{{ item.distance }}m</text>
						</view>
						<text >{{ item.address }}</text>
					</view>
				</view>
			</view>
		</block>

		<view style="height: 1px; width: 100%; background-color:#BBBBBB;"></view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon.vue';
import util from '../../../common/util.js';

var _self = null;
var self = null;
export default {
	components: {
		uniIcon
	},
	data() {
		return {
			markers: [],
			covers: [],
			latitude: util.DEFAULT_LATITUDE,
			longitude: util.DEFAULT_LONGITUDE,
			title: '选择位置',
			pois: [],
			city_center: '',
			picked_city: '请选择城市',
			key: '',
			page:1,
		};
	},
	onLoad(option) {
		
	},
	onShow() { //方便选了城市回来触发
		//default
		_self = this;
		self = this;
		
		
		uni.getLocation({
			type: 'wgs84',
			
			success: function(res) {
				console.debug('getLocation：' + JSON.stringify(res))
				console.log('当前位置的经度：' + res.longitude)
				console.log('当前位置的纬度：' + res.latitude)
		
				_self.latitude = res.latitude
				_self.longitude = res.longitude
				
				//save local gps
				uni.setStorageSync('local_gps', res.longitude+','+res.latitude)
				uni.setStorageSync('local_gps_longitude', res.longitude)
				uni.setStorageSync('local_gps_latitude', res.latitude)
				_self.local_gps_longitude = res.longitude;
				_self.local_gps_latitude = res.latitude;
				
				console.log('local_gps'+res.longitude+','+res.latitude);
				//get city info
				_self.GetLocalCity(res.longitude+","+res.latitude ,"")
				
				//sync location
				if(uni.getStorageSync('login_status')==1){
					
						var reqData = {
							type:0,
							gps_address:_self.city,
							city_id:'',
							city:_self.city,
							longitude:_self.longitude,
							latitude:_self.latitude,
						}
						_self.synUserPlace(reqData);
				}
			},
			fail:function(res){
				console.error('getLocation：' + JSON.stringify(res))
				//给初始值
				_self.latitude = util.DEFAULT_LATITUDE;
				_self.longitude = util.DEFAULT_LONGITUDE;
				_self.local_gps_latitude = util.DEFAULT_LATITUDE;
				_self.local_gps_longitude = util.DEFAULT_LONGITUDE;
				
				uni.setStorageSync('local_gps', util.DEFAULT_LONGITUDE+','+util.DEFAULT_LATITUDE);
				uni.setStorageSync('local_gps_longitude', util.DEFAULT_LONGITUDE);
				uni.setStorageSync('local_gps_latitude', util.DEFAULT_LATITUDE);
				uni.setStorageSync('local_city', '深圳');
				_self.city = '深圳';
				_self.local_city = '深圳';
			},
			complete:function(res){
				if(!_self.city || _self.city.length<=0){
					_self.latitude = util.DEFAULT_LATITUDE;
					_self.longitude = util.DEFAULT_LONGITUDE;
					_self.local_gps_latitude = util.DEFAULT_LATITUDE;
					_self.local_gps_longitude = util.DEFAULT_LONGITUDE;
					
					uni.setStorageSync('local_gps', util.DEFAULT_LONGITUDE+','+util.DEFAULT_LATITUDE);
					uni.setStorageSync('local_gps_longitude', util.DEFAULT_LONGITUDE);
					uni.setStorageSync('local_gps_latitude', util.DEFAULT_LATITUDE);
					uni.setStorageSync('local_city', '深圳');
					_self.city = '深圳';
					_self.local_city = '深圳';
				}
			},
		});
		
		//clear 
		this.pois =  [];
		this.page = 1;
		

		var picked_city = uni.getStorageSync('picked_city');
		console.debug('picked_city:' + picked_city);
		if (picked_city && picked_city != uni.getStorageSync('local_city')) {
			//new
			_self.picked_city = picked_city;
			_self.city_center = uni.getStorageSync('picked_city_center');

			var arr = _self.city_center.split(',');
			if (arr) {
				_self.longitude = arr[0];
				_self.latitude = arr[1];
			}
		} else {
			//location city
			_self.picked_city = uni.getStorageSync('local_city');
			_self.longitude = uni.getStorageSync('local_gps_longitude');
			_self.latitude = uni.getStorageSync('local_gps_latitude');
			if(!_self.picked_city){
				_self.city_center = uni.getStorageSync('picked_city_center');
			}else{
				_self.city_center = _self.longitude + ',' + _self.latitude;
			}
			
			console.debug('local city_center:' + _self.city_center);
		}
		this.searchPOI(_self.key);
	},
	onBackPress() {},
	onReachBottom() {
		this.page = this.page+1;
		this.searchPOI(_self.key);
	},
	methods: {
		OnInputKey(e) {
			this.key = e.detail.value;
			this.key = this.key.trim();
			//init 、
			self.pois = [];
			this.page = 1;
			console.debug(this.key);
			this.searchPOI(this.key);
		},
	
		// qa:https://lbs.amap.com/api/webservice/guide/api/search
		searchPOI(key) {
			// 在天安门周围1千米内对关键字“肯德基”进行检索
			
			console.log('search POI: key=>'+this.key+': center gps:'+ this.city_center);
			var uri = 'https://restapi.amap.com/v3/place/around?offset=20&key=f4ef5eba538efbe9a6f7147c601f8f2e';
			if(this.city_center!=''){
				uri += '&location=' + this.city_center;
			}else{ //detail center
					uri += '&location=114.14644,22.66829';
			
			}
			
			if(this.key!=''){
				
				uri += '&keywords=' + key;
			}else{
				uri +='&types=190000|180000|170000|140000|120000|060000|050000';
			}
			
			var self = this;
			uni.request({
				url: uri+'&page='+this.page,
				methods: 'get',
				success: ret => {
					self.pois = self.pois.concat(ret.data.pois);
					if (self.pois && self.pois.length > 0) {
						var loc = self.pois[0].location;
						var locArr = loc.split(',');
						self.latitude = locArr[1];
						self.longitude = locArr[0];

						self.covers = [
							{
								id: 1,
								latitude: self.latitude,
								longitude: self.longitude,
								iconPath: '../../../static/map/point.png',
								callout: {
									content: self.pois[0].address,
									color: 'blue'
									// display:'ALWAYS',
								}
							}
						];
					}
					console.debug(JSON.stringify(ret.data));
				},
				fail: res => {}
			});
		},

		onPicker(item) {
			console.debug('picked: ' + JSON.stringify(item));

			//storage
			uni.setStorageSync('location', item.location);
			uni.setStorageSync('locationAddress', item.pname + item.cityname + item.adname + item.address);

			//clear
			uni.setStorageSync('picked_city', '');
			uni.navigateBack();

			//get city info
		},

		goDetailPage(e) {
			var url = '/pages/home/order/city?=' + _self.picked_city;
			uni.navigateTo({
				url: url
			});
			return false;
		},
		
	}
};
</script>

<style>
.map_home {
	width: 100%;
	height: 500upx;
}
.uni-input {
	width: 100%;
	height: 50upx;
	padding: 0;
	margin: 3px;
}
</style>
