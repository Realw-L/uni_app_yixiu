<template>
	<view>
		<view class="grace-card-view">
			<view class="grace-card-body grace-border-b" style="border-radius: 20upx;">
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
							<view @tap="goDetailPage('my/order_new')">查看</view>
							<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="ucenter-line"></view>
			<view class="grace-card-footer" style="display: flex;justify-content: space-between; color: #AAAAAA;">
				<text>总金额：￥2000</text>
				<text>10个订单</text>
			</view>
		</view>
		<view class="grace-card-view">
			<view class="grace-card-body grace-border-b" style="border-radius: 20upx;">
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
							<view>查看</view>
							<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="ucenter-line"></view>
			<view class="grace-card-footer" style="display: flex;justify-content: space-between; color: #AAAAAA;">
				<text>总金额：￥2000</text>
				<text>10个订单</text>
			</view>
		</view>
		<view class="grace-card-view">
			<view class="grace-card-body grace-border-b" style="border-radius: 20upx;">
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
							<view>查看</view>
							<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="ucenter-line"></view>
			<view class="grace-card-footer" style="display: flex;justify-content: space-between; color: #AAAAAA;">
				<text>总金额：￥2000</text>
				<text>10个订单</text>
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

<style></style>
