<template>
	<view>
		<view class="grace-card-body grace-border-b" style="border-radius: 20upx; background-color: #FFFFFF;">
			<view class="grace-card-desc">
				<view class="grace-list">
					<view class="grace-list-items">
						<view class="grace-list-image ucenter-face grace-relative">
							<image class="grace-list-image ucenter-face-image" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
						</view>
						<view class="grace-list-body">
							<view class="grace-list-title"><text class="grace-list-title-text">**公司（深圳**铺位名）</text></view>
							<view class="grace-list-body-desc">18665126170</view>
						</view>
						<view style="margin-right: 10upx; color: red;">总金额：￥4000</view>
					</view>
				</view>
			</view>
		</view>
		<view style="display: flex; flex-direction: row; margin-top: 10upx; justify-content: space-between;">
			<view>
			<select>
			  <option value="时间">请选择时间</option>
			  <option >1990</option>
			  <option >1991</option>
			  <option >1992</option>
			</select>
			</view>
			<view>
			<select>
			  <option value="时间">请选择类目</option>
			  <option >充值</option>
			  <option >提现</option>
			  <option >订单明细</option>
			</select>
			</view>
			<view>
			<select>
			  <option value="时间">请选择状态</option>
			  <option >充值</option>
			  <option >提现</option>
			  <option >订单明细</option>
			</select>
			</view>
		</view>
		<view >
			<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
						<view class="uni-triplex-row">
							<view class="uni-triplex-left">
								<text class="uni-title uni-ellipsis">订单号:201909102255</text>
								<text class="uni-text">价格：260</text>
								<text class="uni-text">下单时间:2020.7.28 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12：25：25</text>
								<text class="uni-text">施工日期：2020.7.28</text>
								<text class="uni-text-small uni-ellipsis">施工地点：广东省深圳市龙岗区布吉街道天虹商场</text>
							</view>
							<view class="uni-triplex-right" style="width:120upx; center;display: flex;">
								<image src="../../static/images/order.png" mode="" style="width: 120upx; height: 120upx;"></image>
								<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">复尺测量</text>
							</view>
						</view>
					</view>
			</view>
		</view>
		<view >
			<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
						<view class="uni-triplex-row">
							<view class="uni-triplex-left">
								<text class="uni-title uni-ellipsis">订单号:201909102255</text>
								<text class="uni-text">价格：260</text>
								<text class="uni-text">下单时间:2020.7.28 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12：25：25</text>
								<text class="uni-text">施工日期：2020.7.28</text>
								<text class="uni-text-small uni-ellipsis">施工地点：广东省深圳市龙岗区布吉街道天虹商场</text>
							</view>
							<view class="uni-triplex-right" style="width:120upx; center;display: flex;">
								<image src="../../static/images/order.png" mode="" style="width: 120upx; height: 120upx;"></image>
								<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">复尺测量</text>
							</view>
						</view>
					</view>
			</view>
		</view>
		<view >
			<view class="uni-list">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" >
						<view class="uni-triplex-row">
							<view class="uni-triplex-left">
								<text class="uni-title uni-ellipsis">订单号:201909102255</text>
								<text class="uni-text">价格：260</text>
								<text class="uni-text">下单时间:2020.7.28 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12：25：25</text>
								<text class="uni-text">施工日期：2020.7.28</text>
								<text class="uni-text-small uni-ellipsis">施工地点：广东省深圳市龙岗区布吉街道天虹商场</text>
							</view>
							<view class="uni-triplex-right" style="width:120upx; center;display: flex;">
								<image src="../../static/images/order.png" mode="" style="width: 120upx; height: 120upx;"></image>
								<text class="uni-h5" style="text-align: center;  color: #448c04; margin-top: 5upx;">复尺测量</text>
							</view>
						</view>
					</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
			};
		},
		components: {
		},
		methods: {
        goDetailPage(e) {
            let path = e.url ? e.url : e;
            let url = ~path.indexOf('platform') ? path : '/pages/' + path;
            uni.navigateTo({
                url: url
            });
            return false;
        }
		}
	};
</script>
<style>
</style>
