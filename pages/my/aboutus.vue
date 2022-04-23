<template>
	<view>
		<view class="uni-common-mt">

			<view style="display: flex; justify-content: center;">
				<view class="uni-title" style="font-size: 50upx;">活动介绍</view>
			</view>
			<view style="display: flex; justify-content: center;">
				<view class="uni-title">2018-12-11：11：46：05</view>
			</view>
			<view style="text-align: center;">
				<image src="../../static/10s.png" mode=""></image>
				<text class="uni-title" style="align-items: center; justify-content: center; width: 90%; flex-wrap: wrap;">sdaksjdljaskldasjdlksaj
					{{content}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	// import { getAboutus } from '@/api/recycle.js';
	export default {
		data() {
			return {
				title: '关于我们',
				content:'',
				
			}
		},
		onLoad() {
			getAboutus().then(({ data }) => {
				if (data) {
					
					self.content = data;
				}
				console.log(data);
			});
		},
		methods: {

			goDetailPage(e) {
				let path = e.url ? e.url : e;
				let url = ~path.indexOf('platform') ? path : '/pages/' + path;
				uni.navigateTo({
					url: url
				});
				return false;
			},
		},

	}
</script>

<style>
	.cell-pd {
		padding: 22upx 30upx;
	}

	.list-pd {
		margin-top: 50upx;
	}
</style>
