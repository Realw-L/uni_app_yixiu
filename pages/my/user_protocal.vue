<template>
	<view>
		<view class="uni-common-mt">
			<view style="display: flex; justify-content: center;">
				<view class="uni-title" style="font-size: 20upx;">撒懒得看就爱上了看得见阿斯科利大家速度了卡时间达拉斯空间的拉开圣诞节啊拉萨看得见案例数控刀具阿拉山口激动撒来看大家阿斯利康大家阿斯利康就爱上来看大家奥斯卡来得及阿斯利康京东</view>
			</view>
		</view>
	</view>
</template>
<script>
import util from '@/common/util.js'

	export default {
		data() {
			return {
				title: '赚取佣金',
			}
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
