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
		<view>
		<text>工程案例</text>
		<text style="margin-left: 50upx;">深圳万象城半岛精品工程案例</text>
		<view style="display: flex; justify-content: space-between; justify-content: center;">
			<image src="../../static/111111.png" mode="" style="width: 150upx; height: 150upx;"></image>
			<image src="../../static/111111.png" mode="" style="width: 150upx; height: 150upx;"></image>
		</view>
		</view>
		
	</view>
	
	<view style="display: flex; flex-direction: row;" @tap="showDialog2">
		<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;" >联系师傅</button>
	</view>

					<graceDialog :isTitle="false" :show="show2" v-on:closeDialog="closeDialog2">
							
						<view class="content2" slot="content">
							<view style="text-align: center; color: #AAAAAA; font-size: 50upx;" >联系师傅</view>
							<text style="display: flex;  font-size: 30upx;">联系师傅需支付***元</text>
						</view>
						<view slot="btns" class="grace-space-between" >
							<button class="grace-dialog-buttons" style="background-color: #00C777; width: 300upx; color: #FFFFFF; " @tap="confirm2">付款</button>
						</view>
					</graceDialog>
	
	</view>
</template>

<script>
import util from '@/common/util.js'
import uniRate from "../../components/uni-rate/uni-rate.vue"
import graceDialog from '@/graceUI/components/graceDialog.vue'
var self 
export default {
    components: {uniRate,
	graceDialog
	},
	data() {
		return {
			show2 : false,
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
		// 第2个演示 [ 带有按钮 ]
				showDialog2 : function(){
					this.show2 = true;
				},
				closeDialog2 : function(){
					this.show2 = false;
				},
				confirm2 : function(){
					this.closeDialog2();
					uni.showToast({title:"您点击了确认按钮", icon:"none"});
				},
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
	.content1{padding:25rpx; font-size:26rpx; text-align:center; line-height:60rpx;background-color:#F8F8F8; display:block;}
	.content2{padding:30rpx; padding-right:80rpx; line-height:50rpx; font-size:26rpx;}
</style>
