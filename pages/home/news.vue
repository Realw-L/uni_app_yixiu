<template>
	<view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="item in news.content">
			<view class="uni-list">
				<view class="uni-triplex-row" @tap="onGoToNews(item)">
					<image :src="item.image" mode="aspectFit" style="width: 200upx; height: 200upx; margin-right: 5px;"></image>
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">{{item.title.substring(0,16)}}</text>
						<text class="uni-text-small ">{{item.abstract}}</text>
						<view class="uni-triplex" style="text-align: right;">
							<text class="uni-h5"> 	{{item.create_time}}</text>
						</view>
			
					</view>
					
				</view>
							
			</view>


		</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
import util from '.././../common/util';
export default {
    data() {
        return {
            news: {},
			title: '下拉刷新 + 加载更多',
			data: [],
			loadMoreText: "加载中...",
			showLoadMore: false,
			max: 0
        };
    },
	onLoad() {
		this.initData();
		   this.onLoadNews();
	},
	onUnload() {
		this.max = 0,
		this.data = [],
		this.loadMoreText = "加载更多",
		this.showLoadMore = false;
	},
	onReachBottom() {
		console.log("onReachBottom");
		if (this.max > 40) {
			this.loadMoreText = "没有更多数据了!"
			return;
		}
		this.showLoadMore = true;
		setTimeout(() => {
			this.setDate();
		}, 300);
	},
	onPullDownRefresh() {
		console.log('onPullDownRefresh');
		this.initData();
	},
    methods: {
        onGoToNews(item) {
			var url = util.H5_URL + 'news/detail&id=' + item.id;
			console.log(url)
            util.goH5(url);
			
        },

        onLoadNews() {
            var self = this;

            util.GET('news/lists', { page: 1, page_size: 10 }, function(data) {
                self.news = data;
                if (data && data.content.length > 0) {
                }

                for (var i = 0; i < data.content.length; i++) {
                    self.news.content[i].image = util.IMAGE_URI + self.news.content[i].image;
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
        },
		initData(){
			setTimeout(() => {
				this.max = 0;
				this.data = [];
				let data = [];
				this.max += 10;
				for (var i = this.max - 9; i < this.max + 1; i++) {
					data.push(i)
				}
				this.data = this.data.concat(data);
				uni.stopPullDownRefresh();
			}, 300);
		},
		setDate() {
			let data = [];
			this.max += 10;
			for (var i = this.max - 9; i < this.max + 1; i++) {
				data.push(i)
			}
			this.data = this.data.concat(data);
		}
    }
};
</script>

<style>
</style>
