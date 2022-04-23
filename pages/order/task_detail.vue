<template>
  <view class="uni-padding-wrap uni-common-pb">
    <view class="content">
      <view class="uni-list">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
          <view class="uni-triplex-row">
            <view class="uni-triplex-left">
              <text class="uni-title uni-ellipsis">订单号：{{order.order_no}}</text>
						<!-- 		<text class="uni-title uni-ellipsis">店铺名称：{{order.shop_name}}</text> -->
              <view class="uni-triplex-left"
                    style="margin-left: 0upx; display: flex; flex-direction:row;justify-content: space-between;">
                <text class="uni-title">类目:{{order.service_name}}</text>
                <view class="uni-title uni-ellipsis" style="width: 250upx;">价格:
                  <text style="color: red; width: 250upx;">￥{{order.fee }}</text>
                </view>
              </view>
							<text class="uni-title">下单时间：{{order.create_time}}</text>
              <text class="uni-title">施工时间：{{order.start_date}}--{{order.end_date}}</text>
              <text class="uni-title uni-ellipsis">施工地点：{{order.address}} {{order.address_detail}}</text>
            </view>

            <view class="uni-triplex-right" style="width:120upx; center;display: flex;">
              <!-- <image src="../../static/60x60.png" mode="" style="width: 120upx; height: 120upx;"></image> -->
							<image :src="order.icon" style="height: 60px;width: 60px;"></image>
              <text class="uni-h5" style="text-align: center;color: #448c04; font-family:黑体; font-size: 30upx; margin-top: 10upx;">{{order.order_mode_str}}</text>
              <text class="uni-h5" style="color: #ff0000; font-family:黑体; font-size: 25upx; margin-top: 20upx; text-align: center;">{{order.status_str}}</text>
            </view>
          </view>		 
        </view>
		 <view class="uni-list">
 <view class="uni-triplex-row">
		    <view class="uni-triplex-left">
		      <text class="uni-title uni-ellipsis">相关的图片</text>
		  						<!-- 		<text class="uni-title uni-ellipsis">店铺名称：{{order.shop_name}}</text> -->
								<view style="display: flex;justify-content: center;">
									<image src="../../static/1111.png" mode="" style="width: 140upx; height: 140upx;"></image>
										<image src="../../static/1111.png" mode="" style="width: 140upx; height: 140upx;"></image>
								</view>
		    </view>
		  </view>
		  </view>
 <view class="uni-list">
 <view class="uni-triplex-row">
		    <view class="uni-triplex-left">
		      <text class="uni-title uni-ellipsis">其他的要求</text>
		  						<!-- 		<text class="uni-title uni-ellipsis">店铺名称：{{order.shop_name}}</text> -->
								<view style="display: flex; flex-direction: column;">
<text>1.需要提供维修后的全景图片；</text>
<text>2.需要四人以上，需自备登高工具；</text>
								</view>
		    </view>
		  </view>
		  </view>
        <view style="display: flex;justify-content: space-between; uni-card">
          <view class="uni-title" style="font-size: 20upx; color: #888888;">地图明细</view>
		  <view>
		  <text style="font-size: 20upx;">广东省/深圳市/龙岗区/布吉街道天虹商场</text>
		  </view>
          <view class="uni-title" style="font-size: 20upx; color: #888888;" @tap="onOpenLocation">导航</view>
         <!-- <view>
            <view class="uni-title" style="font-size: 20upx; color: #1482D1;" @tap="onCopy">复制地址</view>
          </view> -->
        </view>
        <view style="display: flex;justify-content: space-between; uni-card">
          <view class="uni-title" style="font-size: 20upx;">{{order.address}} {{order.address_detail}}</view>
        </view>
        <view>
          <map :latitude="order.latitude" :longitude="order.longitude" :markers="covers">
          </map>
        </view>
     <!--   <view style="display: flex;justify-content: space-between;">
          <view style="font-size: 1upx; color: #888888;">注意事项（环境、配件、验收单如没列出，视为不寄回，不配发）</view>
        </view>
       <view style="display: flex;flex-direction: column; uni-card">
          <view style="font-size: 30upx; " v-if="order.work_height">施工高度：{{order.work_height_str}}
          </view>
          <view class="uni-title" v-else>施工高度：~~</view>
          <view style="font-size:30upx;">施工数量：8个</view>
        </view> -->
        <view style="background-color: #f6f6f6;  width: 650upx; margin-left: 20upx;">
          <view style="font-size: 30upx;">施工内容:</view>
          <text style="width: 97%; background-color: #f6f6f6; color: #000000;">{{order.comment}}</text>
        </view>
		<view style="background-color: #f6f6f6;  width: 650upx; margin-left: 20upx; display: flex; justify-content: space-between; ">
			 <view style="font-size: 30upx;">联系人</view>
		  <view style="font-size: 30upx;">魏先生</view>
		  <text style=" background-color: #f6f6f6; color: #000000;">135xxxx7834</text>
		   <view style="font-size: 30upx; color: red;">拨打</view>
		</view>
<!--        <view style="display: flex;flex-direction: column; uni-card">
          <view style="color: #a2a2a2; font-size: 20upx;">负责联系人</view>
          <view
            style="display: flex;justify-content: space-between; background-color: #f6f6f6; width: 650upx; margin-left: 20upx;">
            <view style="font-size: 25upx; ">联系人</view>
            <view style="font-size:25upx;">{{order.contact}}</view>
            <view style="font-size: 25upx; ">{{order.mobile}}</view>
            <view style="font-size: 25upx; color: #1482D1;" @tap="onMakePhoneCall(order)"> 拨打</view>
          </view> -->
        </view>
        <view style="display: flex;flex-direction: column; margin-top: 100upx;" v-if="!(order.type==2 && order.status==2&& order.customer_id!= user.id)">
          <view style="display: flex;justify-content: space-between;">
            <view style="font-size: 35upx;color: red; margin-top: 15upx; " v-if="order.type==0" >一口价:￥{{order.price }}</view>
						<view style="font-size: 35upx;color: red; margin-top: 15upx; " v-if="order.type==2" >托管预付50%:￥{{order.half_fee}}</view>
           <view style="display: flex; flex-direction: column;">
<!-- 						<view>
              <button class="mini-btn" type="default" size="mini"
                      style="width: 230upx; background-color: #6CB231; color: #black; font-size: 30upx; color: white;"  @tap="onSwitchActorToMaster">切换师傅
              </button>
            </view> -->
						 <view>
						  <button class="mini-btn" type="default" size="mini"
						          style="width: 230upx; background-color: #6CB231; color: #black; font-size: 30upx; color: white;" @tap="onHandleOrder">{{order_button_name}}
						  </button>
						</view>
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
import util from '@/common/util.js'

export default {
  data() {
    return {
      disabled: true,
      title: '任务明细',
      latitude: 39.909,
      longitude: 116.39742,
      covers: [],
      workHeightArray: [
        {
          label: '小于1米',
          value: 1,
        },
        {
          label: '小于3米',
          value: 2,
        },
        {
          label: '小于5米',
          value: 3,
        },
        {
          label: '小于10米',
          value: 4,
        },
      ],
			user:{},
      order: {},
			order_mode_array:['市场单','竞价','指派'],
			order_button_name:'立即抢单',
     actor:0,
    }
  },
  onLoad (option) {
		this.user = uni.getStorageSync('user_info');
    if (option) {

      this.loadOrder(option.order_no)
    }

  },
  methods: {
		onSwitchActorToMaster(){
			this.actor=1;
			// this.$refs.master.initData();
			uni.setStorageSync('actor_type', this.actor);
			uni.showToast({
				title:'已切换成师傅角色'
			})
		},
		   onSwitchToMaster () {
		
		  this.$emit('onSwitchActor', 1)
		},
		orderCheck(){
			
					
					if(this.user){
						
						if(!this.user.filled_info){
							uni.showToast({
								title:'请先完善用户信息再下单。'
							})
							setTimeout(function(){
								 uni.navigateTo({
								  url: '/pages/my/face',
								});
							},1000);
							
							
							return 
						}
						
						if(!parseInt(this.user.identity_status)){
							uni.showToast({
								title:'请先完成实名认证后再下单。'
							})
							setTimeout(function(){
								uni.navigateTo({
								  url: '/pages/my/certification_id',
								});
							},1000);
							 
							
							
							
							return false
						}
				}
				return true
		},
		//get order
		onHandleOrder(){
				var self = this;
				var  actor = uni.getStorageSync('actor_type')
			//actor
			if(this.order.status==2 ||
			this.order.status==11 && this.order.type==2){ //go to pay
				//check self 
				if (this.order.customer_id != this.user.id){
						uni.showToast({
							title:'不属于自己的订单,不能去支付',
						});
				}else{
					this.goDetailPage('home/order/pay?order_no='+this.order.order_no)
				}
				 
				 return;
			}
			//new status
			var newStatus = parseInt(this.order.status) +1;
		
			var handle_data = { actor:actor, order_no: this.order.order_no, status:newStatus}
			if( actor==1 && newStatus == 4 ){ //check filled info and identity_status>0
				if(!this.orderCheck())
				{
					return false;
				}
				 // go on
			}else if(actor==1 && newStatus == 5){ //施工完成
				var uri='/pages/order/verify/verify?order_no='+this.order.order_no;
				
				 uni.navigateTo({
				  url: uri,
				})
				return 
			}else if(actor==0 && newStatus == 6){ //验收
				var uri='/pages/order/verify/verify?order_no='+this.order.order_no;
				
				 uni.navigateTo({
				  url: uri,
				})
				return
			}else if (actor==0 && newStatus==4){
				uni.showToast({
					title:'用户不能抢单，请切换到师傅角色。',
					icon:'none'
				})
				return;
			}else if(actor==1 && this.user.id == this.order.customer_id && this.order.status==3){
				
				uni.showToast({
					title:'你不能抢自己的单.',
					icon:'none'
				})
				return;
			}
			
			console.info("order/handle:from data:"+JSON.stringify(handle_data));
			util.POST('order/handle', handle_data, function(data) {
				console.info("order/handle:-------response data:"+JSON.stringify(data));
				if (data.status == 1) {
						uni.showToast({
							title: data.message,
							icon:'none',
							duration: 2000
						});
					
					if(newStatus == 4 || newStatus == 5 ){
						//go to 
							
					}else if(newStatus == 6 ){
						//go to 
							
					}
					
						setTimeout(function(){
						uni.switchTab({url:'/pages/order/index?status='+newStatus});
					}, 2000);	
					
				} else {
					
					uni.showToast({
						title: '操作失败:'+data.message,
						icon:'none',
						duration: 2000
					});
				}
			});
		},
    onOpenLocation () {

      uni.openLocation({
        latitude: parseFloat( this.order.latitude),
        longitude: parseFloat(this.order.longitude),
        success: function () {

          console.debug('open location success')
        },
      })
    },

    onCopy () {
      uni.setClipboardData({
        data: this.order.address + this.order.address_detail,
        success: function () {
          console.log('success')
          uni.showToast({
            title: '复制成功',
          })
        },
      })
    },

    onMakePhoneCall: function (order) {
      uni.makePhoneCall({
        phoneNumber: order.mobile,
        success: () => {
          console.log('成功拨打电话')
        },
      })
    },
    goDetailPage (e) {
      let path = e.url ? e.url : e
      let url = ~path.indexOf('platform') ? path : '/pages/' + path
      uni.navigateTo({
        url: url,
      })
      return false
    },

    loadOrder (order_no) {
      var self = this
      //singin auto reg
      util.POST(
        'order/confirm',
        {
          order_no: order_no,
        },
        function (data) {
          console.info('handle:' + JSON.stringify(data))
          if (data.status == 1) {
            self.order = data.content
            self.covers = [
              {
                latitude: parseFloat(data.content.latitude),
                longitude: parseFloat(data.content.longitude),
                iconPath: '../../static/map/order_pin.png',
              },
            ];
						
						self.order.icon = util.IMAGE_URI + self.order.icon;
						
						// 托管单 不给师傅看到 平台费 self.order.customer_id
						// if(self.order.type ==2 && self.order.status >=3 && self.order.customer_id != self.user.id){  //师傅看
						if(self.order.type ==2 && self.order.customer_id != self.user.id){  //师傅看
							self.order['half_fee'] = parseFloat(self.order.price) /2
							self.order['fee'] = parseFloat(self.order.price) 
						}else{ //自己看
							self.order['fee'] = parseFloat(self.order.price)+ parseFloat(self.order.charge) 
							self.order['half_fee'] = (parseFloat(self.order.price)+ parseFloat(self.order.charge) )/2
						}
						
						var  actor = uni.getStorageSync('actor_type')
						//self.order_button_name = util.getActorOrderStatus(actor, self.order.status);
						self.order_button_name = util.getActorOrderStatus(actor, data.content.status);
          } else {
            uni.showToast({title: data.content.message, icon: 'none'})
          }
					
        },
      )
    },

  },
}
</script>

<style>
  map {
    width: 100%;
    height: 600 upx;
  }
</style>
