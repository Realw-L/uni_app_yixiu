<template>
	<view>
		<view class="grace-card-view">
						<view class="grace-card-body grace-border-b" @tap="goDetailPage('my/adds_user')" >
								<view class="grace-list-body">
												<view class="grace-list-title">
													<text class="grace-list-title-text">账号管理</text>
												</view>
											</view>
										<image src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" class="grace-card-img"></image>
										</view>
									<view class="grace-list grace-margin-top">
													<view class="grace-list-items">
														<view class="grace-list-body grace-border-b" @tap="goDetailPage('my/iphone')">
															<view class="grace-list-title">
																<text class="grace-list-title-text">手机号码</text>
																<text>188****1234</text>
															</view>
														</view>
														<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
													</view>
													<view class="grace-list-items" @tap="goDetailPage('my/nicheng')">
														<view class="grace-list-body grace-border-b">
															<view class="grace-list-title">
																<text class="grace-list-title-text">昵称</text>
																<text>总公司</text>
															</view>
														</view>
														<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
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
