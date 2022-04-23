<template>
	<view>
		<view class="uni-common-mt">
			<form>
				<view class="uni-list">
						<view style="display: flex; justify-content: center; margin-left: -170upx;">
						<view class="uni-title">卡号</view>
				<input type="text" name="youxiang" placeholder="请输入卡号" style="margin-top: 15upx; margin-left: 20upx;" maxlength="19">
						</view>
						
				</view>
				<view style="display: flex; flex-direction: row; margin-left: 50upx; margin-top: 20upx;">
					<image src="../../static/o.png" mode="" style="width: 30upx;height: 30upx;"></image>
					<text 
					style="color: #a2a2a2; font-size: 20upx; font-family: 微软雅黑; margin-left: 10upx;  " >支付宝智能加密，保障您的用卡安全，<text style="color: #6db131; font-size: 20upx;" @tap="modalTap">了解安全保障</text></text>							
				</view>				
					<view>
				<button class="btn-submit" formType="submit" type="primary" 
				style="background-color: #09BB07; border-radius: 37upx; width: 90%; height: 60upx; margin-top: 300upx; font-size: 30upx;">下一步</button>
					</view>
					<view style="display: flex; justify-content: center; margin-left: 50upx; margin-top: 50upx;">
						<image src="../../static/z1.png" mode="" style="width: 30upx;height: 30upx;"></image>
						<text 
						style="font-size: 20upx; margin-left: 10upx; " >账户安全保障中</text>							
					</view>
			</form>
		</view>
	</view>
</template>
<script>

export default {
  data () {
    return {
      title: '添加银行卡',
    }
  },
  methods: {
    goDetailPage (e) {
      let path = e.url ? e.url : e
      let url = ~path.indexOf('platform') ? path : '/pages/' + path
      uni.navigateTo({
        url: url,
      })
      return false
    },
  },
}
</script>

<style>
  .cell-pd {
    padding: 22 upx 30 upx;
  }

  .list-pd {
    margin-top: 50 upx;
  }
</style>
