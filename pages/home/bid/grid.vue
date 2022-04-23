<template>
	<gracePage :customHeader="false">
		<view slot="gBody" class="grace-flex-v1" id="gBody">
			<!-- 搜索组件 -->
			<view style="padding:20rpx 100rpx; background-color:#F6F7F8;" id="hSearch"><graceSearch @clear="search" @confirm="search"></graceSearch></view>
			<!-- 数据区域 -->
			<view class="grace-cate-wrap grace-space-between">
				<scroll-view scroll-y class="grace-cate-left grace-scroll-y" :style="{ height: mainHeight + 'px' }" :scroll-into-view="leftTo">
					<text
						v-for="(item, index) in mainCate"
						:key="index"
						:class="['grace-cate-left-item', currentCateIndex == item.id ? 'grace-cate-left-current' : '']"
						:data-cateid="item.id"
						:data-cateindex="index"
						@tap="changCate"
						:id="'cate' + item.id"
					>
						{{ item.name }}
					</text>
				</scroll-view>
				<view class="grace-product-list-body">
					<view style="display: flex;flex-direction: column;">
						<view><text>店铺</text></view>
						<view style="margin-left: -170upx; width: 500upx;"><graceSelectTags :items="subCate" type="radio" @change="change1"></graceSelectTags></view>
					</view>
					<view style="display: flex;flex-direction: column;">
						<view><text>参考案例</text></view>
						<view style="margin-left: -170upx; width: 500upx;"><graceSelectTags :items="subCase" type="radio" @change="change2"></graceSelectTags></view>
					</view>
					<view style="display: flex;flex-direction: column;">
						<view><text>效果图</text></view>
						<view style="display: flex; flex-direction: row; justify-content: center;">
							<image
								v-for="(item, index) in caseItem ? caseItem.effect_imgs : []"
								:src="item"
								mode=""
								style="width: 200upx; height: 200upx; margin-left: -200upx;"
							></image>
						</view>
					</view>
					<view style="display: flex;flex-direction: column;">
						<view><text>施工图</text></view>
						<view style="display: flex; flex-direction: row; justify-content: center;">
							<image
								v-for="(item, index) in caseItem ? caseItem.working_imgs : []"
								:src="item"
								mode=""
								style="width: 200upx; height: 200upx; margin-left: -450upx;"
							></image>
						</view>
					</view>
					<view style="display: flex;flex-direction: column;">
						<view><text>报价图</text></view>
						<view style="display: flex; flex-direction: row; justify-content: center;">
							<image
								v-for="(item, index) in caseItem ? caseItem.bid_imgs : []"
								:src="item"
								mode=""
								style="width: 200upx; height: 200upx; margin-left: -450upx;"
							></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</gracePage>
</template>
<script>
import gracePage from '@/graceUI/components/gracePage.vue';
import graceSearch from '@/graceUI/components/graceSearch.vue';
import graceSelectTags from '@/graceUI/components/graceSelectTags.vue';
import graceSegmentedControl from '@/graceUI/components/graceSegmentedControl.vue';
// 模拟商品数据信息 真实项目应来自 api 请求
var productsData = require('../../../graceUI/demoData/products.js');
var pageHeight = 500;
var self = null;
export default {
	data() {
		return {
			mainHeight: 500,
			// 左侧分类
			currentCateIndex: 1,
			currentSubCateIndex: 0,
			currentSubCaseIndex: 0,

			// 左侧滚动定位
			leftTo: 'cate1',
			// 产品列表滚动定位
			productListTo: '',
			mainCate: [],
			subCate: [],
			subCase: [],
			caseItem: null,
			// 商品信息
			allProducts: productsData.allProducts
		};
	},
	filters: {
		checkArray: function(value) {
			if (typeof value == 'undefined' || !value || value == 0) {
				return [];
			}
			if (Array.isArray(value)) return value;

			return [];
		}
	},
	onReady: function() {
		self = this;
		uni.getSystemInfo({
			success: function(res) {
				pageHeight = res.windowHeight;
			}
		});
		setTimeout(() => {
			uni.createSelectorQuery()
				.select('#gBody')
				.fields({ size: true }, res => {
					uni.createSelectorQuery()
						.select('#hSearch')
						.fields({ size: true }, res2 => {
							this.mainHeight = res.height - res2.height;
							// #ifdef H5
							this.mainHeight = res.height - res2.height - 44;
							// #endif
						})
						.exec();
				})
				.exec();
		}, 1000);

		//load data
		this.loadCategory();
	},
	onBackPress() {
		var val = [];
		val.push( this.mainCate[this.currentCateIndex].name) ;
		val.push( this.subCate[this.currentCateIndex].name) ;
		val.push( this.subCase[this.currentSubCaseIndex].name) ;
		
		uni.$emit('pick_shop_type', {index:[this.currentCateIndex, this.currentSubCateIndex, this.currentSubCaseIndex],
		value:val} )
	},
	methods: {
		change1: function(val) {
			var index = val;
			this.currentSubCateIndex = index;

			//init subcase

			self.subCase = self.subCate[index].children.data;
			for (var i = 0; i < self.subCase.length; i++) {
				self.subCase[i].checked = i == 0 ? true : false;
				self.subCase[i].value = i;

				self.subCase[i].effect_imgs = [];
				self.subCase[i].working_imgs = [];
				self.subCase[i].bid_imgs = [];
			}
			self.caseItem = null;

			this.change2(0);
		},
		change2: function(val) {
			//get images
			var index = val;
			this.currentSubCaseIndex = index;

			var ids = this.subCase[index].effect_img.split(',');
			ids = ids.concat(this.subCase[index].working_img.split(','));
			ids = ids.concat(this.subCase[index].bid_img.split(','));

			var idsstr = ids.join(',');
			this.getCaseImages(idsstr);

			//get images
		},
		rscroll: function(e) {
			this.getIndex();
		},
		getCaseImages: function(ids) {
			this.$util.GET('sys/images?ids=' + ids, {}, function(data) {
				console.info(data);
				if (data.status == 1) {
					for (var i = 0; i < data.content.length; i++) {
						data.content[i] = self.$util.IMAGE_URI + data.content[i];
					}

					var len = self.subCase[self.currentSubCaseIndex].effect_img.split(',').length;
					self.subCase[self.currentSubCaseIndex].effect_imgs = data.content.slice(0, len);

					var len2 = self.subCase[self.currentSubCaseIndex].working_img.split(',').length;
					self.subCase[self.currentSubCaseIndex].workings_imgs = data.content.slice(len, len + len2);

					var len3 = self.subCase[self.currentSubCaseIndex].bid_img.split(',').length;
					self.subCase[self.currentSubCaseIndex].bids_imgs = data.content.slice(len + len2);

					self.subCase[self.currentSubCaseIndex].handle_img = true;
					self.caseItem = self.subCase[self.currentSubCaseIndex];
					console.log('subCase', self.subCase);
					console.log('mainCate', self.mainCate);
				} else {
				}
			});
		},
		loadCategory: function() {
			uni.request({
				url: this.$util.API_URI2,
				method: 'GET',
				data: {
					query:
						'{list:page_shop_category(cond:"pid is null"){\
							  count\
							  page\
							  data{\
							    id\
							    name\
							    pid\
							    children:shop_category{\
								  count\
								  page\
								  data{\
									id\
									name\
									pid\
									children:shop_case{\
									          count\
									          page\
									          data{\
									           id\
									           name\
									           working_img\
									           bid_img\
									           effect_img\
									          }\
									 }\
									}\
								  }\
							    }\
							   }\
							 }'
				},
				success: function(ret) {
					console.log(ret);
					self.mainCate = ret.data.data.list.data;
					self.subCate = self.mainCate[0].children.data;
					for (var i = 0; i < self.subCate.length; i++) {
						self.subCate[i].checked = i == 0 ? true : false;
						self.subCate[i].value = i;
					}

					//init subcase
					if (self.subCate.length > 1) {
						self.currentSubCaseIndex = 0;
						self.subCase = self.subCate[0].children.data;
						for (var i = 0; i < self.subCase.length; i++) {
							self.subCase[i].checked = i == 0 ? true : false;
							self.subCase[i].value = i; // use index

							self.subCase[i].effect_imgs = [];
							self.subCase[i].working_imgs = [];
							self.subCase[i].bid_imgs = [];
						}
					}

					//load first item images
					var ids = self.subCase[self.currentSubCaseIndex].effect_img.split(',');
					ids = ids.concat(self.subCase[self.currentSubCaseIndex].working_img.split(','));
					ids = ids.concat(self.subCase[self.currentSubCaseIndex].bid_img.split(','));

					var idsstr = ids.join(',');
					self.getCaseImages(idsstr);

					console.log('subcate:', self.subCate);
					console.log('subcase:', self.subCase);
				},
				fail: ret => {
					console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
					console.log(ret);
				}
			});
		},
		// 动态识别分类激活
		getIndex: function(i) {
			const query = uni.createSelectorQuery();
			query.selectAll('.products').boundingClientRect();
			query.selectViewport().scrollOffset();
			query.exec(res => {
				var products = res[0];
				for (let i = 0; i < products.length; i++) {
					if (products[i].top > 0 && products[i].top >= pageHeight / 2) {
						(this.currentCateIndex = products[i].dataset.parentid), (this.leftTo = 'cate' + products[i].dataset.parentid);
						return;
					}
				}
			});
		},
		changCate: function(e) {
			self.caseItem = null;
			var cateid = e.currentTarget.dataset.cateid;
			var cateIndex = e.currentTarget.dataset.cateindex;
			this.currentCateIndex = cateid;
			this.productListTo = 'productList' + cateid;
			this.subCate = this.mainCate[cateIndex].children.data;
			for (var i = 0; i < this.subCate.length; i++) {
				this.subCate[i].checked = i == 0 ? true : false;
				this.subCate[i].value = i;
			}

			//init subcase
			self.subCase = [];
			if (self.subCate.length > 1) {
				self.subCase = self.subCate[0].children.data;
				for (var i = 0; i < self.subCase.length; i++) {
					self.subCase[i].checked = i == 0 ? true : false;
					self.subCase[i].value = i;
					self.subCase[i].effect_imgs = [];
					self.subCase[i].working_imgs = [];
					self.subCase[i].bid_imgs = [];
				}
				self.currentSubCatIndex = 0;
				self.currentSubCaseIndex = 0;
				self.change2(0);
			}
		},
		search: function(e) {
			var kwd = e;
			var searchIndex = -1;
			var index = 0;
			for (var k in this.allProducts) {
				for (var i = 0; i < this.allProducts[k].length; i++) {
					if (this.allProducts[k][i].name.indexOf(kwd) != -1) {
						searchIndex = this.allProducts[k][i].productId;
						break;
					}
					index++;
				}
				if (searchIndex != -1) {
					break;
				}
			}
			console.log(searchIndex);
			if (searchIndex != -1) {
				this.productListTo = 'products' + searchIndex;
			}
		},
		gotoinfo: function(e) {
			console.log(e);
			uni.showToast({
				title: '商品id ' + e
			});
		}
	},
	components: { gracePage, graceSearch, graceSelectTags, graceSegmentedControl }
};
</script>
<style>
.grace-cate-wrap {
	width: 750rpx;
}
.grace-cate-left {
	width: 200rpx;
	background-color: #f6f7f8;
}
.grace-cate-right {
	width: 530rpx;
	overflow: hidden;
}
.grace-cate-left-item {
	display: inline-flex;
	width: 100%;
	line-height: 40rpx;
	height: 40rpx;
	padding: 35rpx 0;
	font-size: 26rpx;
	justify-content: center;
}
.grace-cate-left-current {
	background-color: #ffffff;
	color: #ff0036;
}
.right-cate-name {
	line-height: 80rpx;
	font-size: 28rpx;
	color: #666666;
	font-weight: bold;
	display: block;
	width: 100%;
}
.grace-product-list {
	padding: 10rpx 0;
	margin-bottom: 5px;
	font-size: 0;
}
.grace-product-list-body {
	width: 355rpx;
	padding-right: 10rpx;
}
.grace-product-list-img {
	width: 150rpx;
	height: 150rpx;
}
.grace-product-title {
	line-height: 50rpx;
	font-size: 28rpx;
	display: block;
	width: 100%;
}
.grace-product-price {
	line-height: 60rpx;
	font-size: 32rpx;
	color: #ff0036;
	display: block;
	width: 100%;
}
.grace-product-btn {
	line-height: 60rpx;
	font-size: 40rpx;
	color: #ff0036;
	padding-right: 20rpx;
}
</style>
