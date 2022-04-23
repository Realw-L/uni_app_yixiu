<template>
  <view>
    <view class="uni-padding-wrap">
      <!-- 评论区 start -->
      <view class="uni-comment">
				
				<!-- style="flex-direction: row-reverse;" -->
				<view v-for="(item,index) in moments.content" :key="index" >
          <view class="uni-comment-list" :style="item.left?'':'flex-direction: row-reverse;'">
					
          <view class="uni-comment-face">
            <image :src="image_root+item.avatar" mode="widthFix"></image>
          </view>
					
          <view class="uni-comment-body">
            <view class="uni-comment-top" :style="item.left?'':'text-align: right;'">
              <text>{{item.nickname}}</text>
            </view>
            <view class="uni-comment-date">
              <text>{{item.create_time}}</text>
            </view>
            <view class="uni-comment-content">
              {{item.content}}
            </view>
            <view class="uni-grid-9" style="width:600upx;">
              <view class="uni-grid-9-item " hover-class="uni-grid-9-item-hover"
                    style=" height: 200upx; width: 200upx;" v-for="(img,ind) in item.images" :key="ind">
                <image :src="image_root+img.path" class="uni-grid-9-text image-item" @tap="showImgs(item, ind)"></image>
              </view>
              
            </view>
            <view class="uni-comment-date">
              <view>{{item.days}}天前</view>
              <view class="uni-comment-replay-btn" @tap="onReplay(item)">{{item.count}}回复</view>
            </view>
          </view>
        </view>
				
				</view>
				
				
        
        </view>
      </view>
      <!-- 评论区 end -->
    </view>
	
  </view>
</template>

<script>
import util from '@/common/util.js'
import uniLoadMore from '@/components/uni-load-more.vue';
	let _self = null;
export default {
	 components: {
	  uniLoadMore
	},
  data () {
    return {
      title: '评论界面',
			moments:{page:0, page_size:10,content:[],status:1},
			image_root: util.IMAGE_URI,
    }
  },
	onShow(){
		_self = this;
		//_self.loadMoment();
		this.onPullDownRefresh();
	},
	onLoad(){
		_self = this;
		
	},
	onPullDownRefresh() {
	    console.log('refresh');
			//clear data refresh
			_self.moments = {page:0, page_size:10,content:[],status:1};
			_self.loadMoment();
			setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 1000);
			
			
	
	},
  onNavigationBarButtonTap (e) {
    uni.navigateTo({
      url:'/pages/moment/add',
      // url: '/pages/my/open',
    })
  },
	onReachBottom() {
		this.loadMoment();
	},
	methods:{
		onReplay:function(item){
			
		},
		showImgs : function(item,ind){
			
			var imgs = [];
			var selImg = '';
			for (var i = 0 ; i < item.images.length; i++) {
				imgs.push(_self.image_root+item.images[i].path);
				if(i==ind){
					selImg = _self.image_root+item.images[i].path;
				}
			}
	

			uni.previewImage({
			  urls: imgs,
				loop: true,
				indicator:'default',
			  current : selImg,
			})
		},
		loadMoment(){
			 var reqData = {
				  page:_self.moments.page+1,
					page_size: _self.moments.page_size,
					location:'',
			}
			
			util.GET(
			  'moment/lists',
			  reqData,
			  function (data) {
			    console.info('handle:' + JSON.stringify(data))
			    if (data.status == 1) {
						// _self.moments = data;
						//append data
						for (var i = 0; i < data.content.length; i++) {
									_self.moments.content.push(data.content[i]);
						}
						_self.moments.page = data.page;
						_self.moments.page_size = data.page_size;
						
			    }else{
						uni.showToast({
							title:data.content,
							icon:'none',
						})
					}
			})
		},
	}


}
</script>

<style>
  .image-item {
    width: 95%;
    height: 95%;
  }
</style>
