<template>
  <view class="uni-padding-wrap uni-common-pb">
    <view class="content">
      <view class="uni-list">
        <view class="uni-list-cell" hover-class="uni-list-cell-hover">
          <view class="uni-triplex-row">
            <view class="uni-triplex-left">
              <text class="uni-title uni-ellipsis">订单号：{{order.order_no}}</text>
              <view class="uni-triplex-left"
                    style="margin-left: 0upx; display: flex; flex-direction:row;justify-content: space-between;">
                <text class="uni-title">类目:{{order.service_name}}</text>
                <view class="uni-title uni-ellipsis" style="width: 250upx;">价格:
                  <text style="color: red; width: 250upx;">￥{{order.price}}</text>
                </view>
              </view>
              <text class="uni-title uni-ellipsis">施工地点：</br>{{order.address}}</text>
            </view>

            <view class="uni-triplex-right" style="align-items: center;display: flex;">
              <image src="../../static/60x60.png" mode="" style="width: 120upx; height: 120upx;"></image>
              <text class="uni-h5" style="color: #448c04; font-family:黑体; font-size: 30upx; margin-top: 10upx;">{{order.order_mode_str}}</text>
              <text class="uni-h5" style="color: #ff0000; font-family:黑体; font-size: 25upx; margin-top: 20upx;">{{order.status_str}}</text>
            </view>
          </view>
        </view>

        <view style="display: flex;justify-content: space-between; uni-card">
          <view class="uni-title" style="font-size: 20upx; color: #888888;">施工地点</view>
          <view class="uni-title" style="font-size: 20upx; color: #888888;" @tap="onOpenLocation">导航</view>
          <view>
            <view class="uni-title" style="font-size: 20upx; color: #1482D1;" @tap="onCopy">复制地址</view>
          </view>
        </view>
        <view style="display: flex;justify-content: space-between; uni-card">
          <view class="uni-title" style="font-size: 20upx;">{{order.address}}</view>
        </view>
        <view>
          <map :latitude="order.latitude" :longitude="order.longitude" :markers="covers">
          </map>
        </view>
        <view style="display: flex;justify-content: space-between;">
          <view style="font-size: 1upx; color: #888888;">注意事项（环境、配件、验收单如没列出，视为不寄回，不配发）</view>
        </view>
        <view style="display: flex;flex-direction: column; uni-card">
          <view style="font-size: 30upx; " v-if="order.work_height">施工高度：{{order.work_height_str}}
          </view>
          <view class="uni-title" v-else>施工高度：~~</view>
          <!--<view style="font-size:30upx;">施工数量：8个</view>-->
        </view>
        <view style="background-color: #f6f6f6;  width: 650upx; margin-left: 20upx;">
          <view style="font-size: 30upx;">施工内容:</view>
          <text style="width: 97%; background-color: #f6f6f6; color: #000000;">{{order.comment}}</text>
        </view>
        <view style="display: flex;flex-direction: column; uni-card">
          <view style="color: #a2a2a2; font-size: 20upx;">负责联系人</view>
          <view
            style="display: flex;justify-content: space-between; background-color: #f6f6f6; width: 650upx; margin-left: 20upx;">
            <view style="font-size: 25upx; ">联系人电话</view>
            <view style="font-size: 25upx; ">{{order.mobile}}</view>
            <view style="font-size: 25upx; color: #1482D1;" @tap="onMakePhoneCall(order)"> 拨打</view>
          </view>
        </view>
        <view style="display: flex;flex-direction: column; margin-top: 100upx;">
          <view style="display: flex;justify-content: space-between;">
            <view style="font-size: 35upx;color: red; margin-top: 15upx; ">一口价:￥{{order.price}}</view>
            <view>
              <button class="mini-btn" type="default" size="mini"
                      style="background-color: yellow; color: #black; font-size: 30upx;" @tap="onHandleOrder">{{order_button_name}}
              </button>
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
  data () {
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
      order: {},
			order_mode_array:['市场单','竞价','指派'],
			order_button_name:'立即抢单',

    }
  },
  onLoad (option) {
    if (option) {

      this.loadOrder(option.order_no)
    }

  },
  methods: {
		//get order
		onHandleOrder(){
			
			var self = this;
			//actor
			//new status
			//actor
			if(this.order.status==2){ //go to pay
				 this.goDetailPage('home/order/pay?order_no='+this.order.order_no)
				 return;
			}
			
			var newStatus = parseInt(this.order.status) +1;
			var  actor = uni.getStorageSync('actor_type')
			var self = this;
			util.POST('order/handle', { actor:actor, order_no: this.order.order_no, status:newStatus}, function(data) {
			
				console.info("response data:"+JSON.stringify(data));
				if (data.status == 1) {
					uni.showToast({
						title: data.message,
						duration: 2000
					});
					
					setTimeout("uni.switchTab({url:'/pages/order/index?status="+newStatus+"'})",2000); 
					
				} else {
					uni.showToast({
						title: '操作失败:'+data.content,
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
        data: this.order.address,
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
							var  actor = uni.getStorageSync('actor_type')
							self.order_button_name = util.getActorOrderStatus(actor, self.order.status);
						

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
