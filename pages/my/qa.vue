<template>
	<view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-triplex-left" v-show="qas && qas.length <= 0"><text class="uni-title uni-ellipsis">暂无数据</text></view>

			<view class="uni-list" v-for="item in qas">
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">问：{{ item.title }}</text>
						<text class="uni-text-small uni-ellipsis">答：{{ item.answer }}</text>
					</view>
					<view class="uni-triplex-right">
						<text class="uni-h5">{{ item.create_time }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-list">
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">问：什么是最好的装修公司</text>
						<text class="uni-text-small uni-ellipsis">答：异修平台</text>
					</view>
					<view class="uni-triplex-right"><text class="uni-h5">12-11</text></view>
				</view>
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-list">
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">问：什么是最好的装修公司</text>
						<text class="uni-text-small uni-ellipsis">答：异修平台</text>
					</view>
					<view class="uni-triplex-right"><text class="uni-h5">12-11</text></view>
				</view>
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-list">
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">问：什么是最好的装修公司</text>
						<text class="uni-text-small uni-ellipsis">答：异修平台</text>
					</view>
					<view class="uni-triplex-right"><text class="uni-h5">12-11</text></view>
				</view>
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-list">
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">问：什么是最好的装修公司</text>
						<text class="uni-text-small uni-ellipsis">答：异修平台</text>
					</view>
					<view class="uni-triplex-right"><text class="uni-h5">12-11</text></view>
				</view>
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-list">
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">问：什么是最好的装修公司</text>
						<text class="uni-text-small uni-ellipsis">答：异修平台</text>
					</view>
					<view class="uni-triplex-right"><text class="uni-h5">12-11</text></view>
				</view>
			</view>
		</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-list">
				<view class="uni-triplex-row">
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">问：什么是最好的装修公司</text>
						<text class="uni-text-small uni-ellipsis">答：异修平台</text>
					</view>
					<view class="uni-triplex-right"><text class="uni-h5">12-11</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import util from '@/common/util.js';

export default {
	data() {
		return {
			title: '开票',
			qas: {}
		};
	},

	onLoad() {
		this.onLoadQA();
	},
	methods: {
		onLoadQA() {
			var self = this;

			util.GET('faq/lists?category=0', { page: 1, page_size: 10, status: status }, function(data) {
				self.orders = data;
				for (var i = 0; i < data.content.length; i++) {
					// self.qas[i].icon = util.IMAGE_URI + self.orders[i].icon
				}
			});
		},
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
