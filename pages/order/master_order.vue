<template>
	<view>
	<view style="display: flex; justify-content: center; margin-top: 50upx;">
		<view style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
			<img :src="user.avatar" alt="" style="width: 200upx; height: 200upx; background-color: #09BB07; border-radius: 100upx;">
			<view style="display: flex; flex-direction: row; margin-top: 10upx; justify-content: center;" >
				<text style="background-color: #09BB07; border-radius: 100upx; width:100upx; color: #FFFFFF; display: flex; justify-content: center;">公司</text>
				<text style="margin-left: 30upx;">{{user.username}}师傅</text>
			</view>
		</view>	
	</view>
	<view class="uni-card">
		<view class="uni-list">
	<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
		<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
			综合评分
			
			<uni-rate disabled="true" value="4"></uni-rate>
			<text>{{user.star}}分</text>
		</view>
	</view>
	<view class="uni-list-cell" hover-class="uni-list-cell-hover"  >
		<view class="uni-list-cell-navigate  uni-navigate-badge" >
			平台接单数
			
			<text>{{user.receive_order_num}}</text>
		</view>
	</view>
	<view class="uni-list-cell" hover-class="uni-list-cell-hover"  >
		<view class="uni-list-cell-navigate  uni-navigate-badge" >
			技能认证
			
			<text>{{user.skill}}</text>
		</view>
	</view>
	<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
		<view class="uni-list-cell-navigate  uni-navigate-badge" >
			业务类型
			
			<text>{{user.service_desc}}</text>
		</view>
	</view>
	<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
		<view class="uni-list-cell-navigate  uni-navigate-badge" >
			服务范围
			
			<text>{{user.service_area}}</text>
		</view>
	</view>
		</view>
	</view>
	
	<view style="display: flex; flex-direction: row;">
		
		<button type="primary" style="background-color: #959595; color: #FFFFFF;" @tap="onFavorite">收藏师傅</button>
		<button type="primary" style="background-color: #6cb231; color: #FFFFFF;" @tap="onCall">电话咨询</button>
	</view>
	</view>
</template>

<script>
import util from '@/common/util.js'
import uniRate from "../../components/uni-rate/uni-rate.vue"
var self 
export default {
    components: {uniRate},
	data() {
		return {
			avatar:'',
			user:{},
		}
	},
	
	onLoad(option){
		self = this
		if(option){
			this.loadMasterInfo(option.id)
		}
		
	},
	methods:{
		loadMasterInfo(id){
			
			// var id = uni.getStorageSync('user_id');
			
			util.GET('staff/master_detail?id='+id, {id:id}, function(data) {
				console.log('staff/master_detail:' + JSON.stringify(data));
				
				
				self.user = data;
				self.user.star = parseInt(self.user.star);
				self.user.avatar = util.IMAGE_URI+self.user.avatar;
			});
		},
		onCall(){
			uni.makePhoneCall({
				phoneNumber: this.user.mobile //仅为示例
			});
		},
		onFavorite(){
			var id = uni.getStorageSync('user_id');
			util.GET('mis/favorite/add', {object_id:id , group:'master'}, function(data) {
				console.log('mis/favorite:' + JSON.stringify(data));
				uni.showToast({
					title:'收藏成功',
				});
				
			});
		}
		
	}
}
</script>

<style>
</style>
