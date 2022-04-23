<template>
	<view class="page">
<!-- 		<uni-nav-bar fixed="true" left-icon="back" @click-left="back" @click-right="showMenu" left-text="返回" right-text="确定"
		title="公司认证" class="top-view titles"></uni-nav-bar> -->
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
					王工
					<text>135xxxx4444</text>
				</view>						
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						王工
						<text>135xxxx4444</text>
					</view>						
					</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						王工
						<text>135xxxx4444</text>
					</view>						
					</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						王工
						<text>135xxxx4444</text>
					</view>						
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	
	import uniBadge from "../../components/uni-badge.vue";
	export default {
		data() {
			return {
				title: '成员'
			}
		},
		components: {
			uniBadge
		},
				methods: {
					goDetailPage(e) {
						let path = e.url ? e.url : e;
						let url = ~path.indexOf('platform') ? path : '/pages/' + path ;
						uni.navigateTo({
							url: url
						});
						return false;
					},
				},
				
			
	}
		
			
</script>

<style>
</style>
