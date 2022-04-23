<template>
	<view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="item in news.content">
			<view class="uni-list">
				<view class="uni-triplex-row" @tap="onGoToNews(item)">
					<image :src="item.image" mode="" style="width: 273upx; height: 200upx;margin-right: 5px;"></image>
					<view class="uni-triplex-left">
						<text class="uni-title uni-ellipsis">{{item.title.substring(0,16)}}</text>
						<text class="uni-text-small">{{item.abstract}}</text>
					
					<view class="uni-triplex" style="text-align: right;">
						<text class="uni-h5">{{item.create_time}}</text>
					</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import util from '.././../common/util';
export default {
    data() {
        return {
            title: '新闻',
            news: {}
        };
    },
    onLoad() {
        this.onLoadNews();
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
        }
    }
};
</script>

<style>
</style>
