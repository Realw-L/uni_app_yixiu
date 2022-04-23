<template>
  <view>
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control :current="current" :values="items" v-on:clickItem="onClickItem" :styleType="styleType"
                             :activeColor="activeColor"></uni-segmented-control>
    </view>
    <view class="content">
      <view v-show="current === 0">
        <view style="margin-top: 0upx;" @tap="goDetailPage('home/index')">

          <image :src="item.image" mode="" style="width:654upx; height:142upx;" v-for="(item,i) in coupons.content"></image>

        </view>
      </view>
      <view v-show="current === 1">
        <view>
          <image :src="item.image" mode="" style="width:654upx; height:142upx;" v-for="(item,i) in coupons.content"></image>
        </view>
      </view>
      <view v-show="current === 2">
        <view>
					<image :src="item.image" mode="" style="width:654upx; height:142upx;" v-for="(item,i) in coupons.content"></image>
          
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import uniSegmentedControl from '@/components/uni-segmented-control.vue'
import util from '@/common/util.js';

export default {
  data () {
    return {
      items: [
        '未使用',
        '已使用',
        '已失效',
      ],
      current: 0,
      activeColor: '#007aff',
      styleType: 'text',
      coupons:[]
    }
  },
  components: {
    uniSegmentedControl,
  },
  onLoad(){
    this.onLoadCoupons()
  },
	onShow(){
	  this.onLoadCoupons()
	},
  methods: {

    onLoadCoupons() {
      var self = this;

      //status  0 未使用  1 已使用  -1. 已过期
      var status = -1;

      if (this.current==0){
        status = 0;

      } else if (this.current==1){
        status = 1;

      } else{

        status = -1;
      }

      //singin auto reg
      util.POST(
        'coupon/my',
        {
          status:status,
          group: 1,
        },
        function(data) {
          console.info('handle:' + JSON.stringify(data));
          if (data.status == 1) {
            self.coupons = data
            for (var i=0; i < self.coupons.content.length; i++ ){
              self.coupons.content[i].image = util.IMAGE_URI + self.coupons.content[i].image;
            }

          } else {
            uni.showToast({ title: data.message, icon: 'none' });
          }
        }
      );
    },
    onClickItem (index) {
      if (this.current !== index) {
        this.current = index
        this.onLoadCoupons();
      }
    },
    styleChange (evt) {
      if (this.styleType !== evt.target.value) {
        this.styleType = evt.target.value
      }
    },
    colorChange (evt) {
      if (this.styleType !== evt.target.value) {
        this.activeColor = evt.target.value
      }
    },
    goDetailPage (e) {
      let path = e.url ? e.url : e
      let url = ~path.indexOf('platform') ? path : '/pages/' + path
      uni.switchTab({
        url: url,
      })
      return false
    },

  },

}
</script>

<style>
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300 upx;
    text-align: center;
  }

  .color-tag {
    width: 50 upx;
    height: 50 upx;
  }
</style>
