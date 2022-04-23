<template>
	<view style="text-align: center;margin-top: 50%;">
		<view style="font-size: 100upx;">待开发...</view>
	</view>
<!-- 	<view id="moments">
		<view class="home-pic">
			<view class="home-pic-base">
				<view class="top-pic"><image class="header" :src="image_root + user.avatar" @tap="onPublish"></image></view>
				<view class="top-name">{{ user.nickname }}</view>
			</view>
		</view>

		<view class="moments__post" v-for="(post, index) in posts" :key="index" :id="'post-' + index">
			<view class="post-left"><image class="post_header" :src="post.header_image"></image></view>

			<view class="post_right">
				<text class="post-username">{{ post.username }}</text>
				<view id="paragraph" class="paragraph">{{ post.content.text }}</view>

				<view class="thumbnails">
					<view :class="post.content.images.length === 1 ? 'my-gallery' : 'thumbnail'" v-for="(image, index_images) in post.content.images" :key="index_images">
						<image class="gallery_img" lazy-load mode="aspectFill" :src="image" :data-src="image" @tap="previewImage(post.content.images, index_images)"></image>
					</view>
				</view>

				<view class="toolbar">
					<view class="timestamp">{{ post.timestamp }}</view>
					<view class="like" @tap="like(index)"><image :src="post.islike == false ? '../../../static/icon/islike.png' : '../../../static/icon/like.png'"></image></view>
					<view class="comment" @tap="comment(index)"><image src="../../../static/icon/comment.png"></image></view>
				</view>

				<view class="post-footer">
					<view class="footer_content">
						<image class="liked" src="../../../static/icon/liked.png"></image>
						<text class="nickname" v-for="(user, index_like) in post.like" :key="index_like">{{ user.username }}</text>
					</view>
					<view class="footer_content" v-for="(comment, comment_index) in post.comments.comment" :key="comment_index" @tap="reply(index, comment_index)">
						<text class="comment-nickname">
							{{ comment.username }}:
							<text class="comment-content">{{ comment.content }}</text>
						</text>
					</view>
				</view>
			</view>

		</view>

		<view class="foot" v-show="showInput" style="margin-bottom: -55upx;">
			<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
			
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{ loadMoreText }} </view>
	</view> -->
</template>

<script>
import chatInput from '@/components/im-chat/chatinput.vue'; //input框
import postData from './index.post.data.js'; //朋友圈数据
import util from '../../../common/util.js';
import uniLoadMore from '@/components/uni-load-more.vue';

var self, _self;
export default {
	components: {
		chatInput
	},
	data() {
		return {
			image_root: util.IMAGE_URI,
			// posts: postData, //模拟数据
			posts: {},
			user_id: 4,
			username: 'Liuxy',

			index: '',
			comment_index: '',

			input_placeholder: '评论', //占位内容
			focus: false, //是否自动聚焦输入框
			is_reply: false, //回复还是评论
			showInput: false, //评论输入框

			screenHeight: '', //屏幕高度(系统)
			platform: '',
			windowHeight: '', //可用窗口高度(不计入软键盘)

			loadMoreText: '加载中...',
			showLoadMore: false,
			moments: { page: 0, page_size: 10, content: [], status: 1 },
			user: {}
		};
	},
	mounted() {
		uni.getStorage({
			key: 'posts',
			success: function(res) {
				console.log(res.data);
				this.posts = res.data;
			}
		});
	},
	onLoad() {
		self = this;
		_self = this;
		this.user = uni.getStorageSync('user_info');
		if (this.user) {
			this.username = this.user.nickname;
		}
		uni.getSystemInfo({
			//获取设备信息
			success: res => {
				this.screenHeight = res.screenHeight;
				this.platform = res.platform;
			}
		});
		uni.startPullDownRefresh();
	},
	onShow() {
		uni.onWindowResize(res => {
			//监听窗口尺寸变化,窗口尺寸不包括底部导航栏
			if (this.platform === 'ios') {
				this.windowHeight = res.size.windowHeight;
				this.adjust();
			} else {
				if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				}
			}
		});
	},
	onHide() {
		uni.offWindowResize(); //取消监听窗口尺寸变化
	},
	onUnload() {
		(this.max = 0), (this.data = []), (this.loadMoreText = '加载更多'), (this.showLoadMore = false);
	},
	onReachBottom() {
		//监听上拉触底事件
		console.log('onReachBottom');
		this.showLoadMore = true;
		this.loadMoment();
		// setTimeout(() => {

		// //获取数据
		// if (this.posts.length < 20){//测试数据
		// 	this.posts = this.posts.concat(this.posts);
		// }else{
		// 	this.loadMoreText = "暂无更多";
		// }
		// }, 1000);
	},
	onPullDownRefresh() {
		//监听下拉刷新动作
		console.log('onPullDownRefresh');
		// 这里获取数据

		console.log('refresh');
		//clear data refresh
		_self.moments = { page: 0, page_size: 10, content: [], status: 1 };
		_self.loadMoment();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onNavigationBarButtonTap(e) {
		//监听标题栏点击事件
		if (e.index == 0) {
			// this.navigateTo('../publish/publish')
			this.navigateTo('../add');
		}
	},
	computed: {},
	methods: {
		onPublish:function(){
			this.navigateTo('../add');
		},
		loadMoment() {
			var reqData = {
				page: _self.moments.page + 1,
				page_size: _self.moments.page_size,
				location: ''
			};

			util.GET('moment/moments', reqData, function(data) {
				console.info('handle:' + JSON.stringify(data));
				if (data.status == 1) {
					// _self.moments = data;
					//append data
					//content.images
					for (var i = 0; i < data.content.length; i++) {
						data.content[i].header_image = util.IMAGE_URI + data.content[i].header_image;
						var imgs = data.content[i].content.images;
						for (var j = 0; j < imgs.length; j++) {
							data.content[i].content.images[j] = util.IMAGE_URI + imgs[j];
						}
					}
					if (_self.moments.content) {
						_self.moments.content = _self.moments.content.concat(data.content);
					}
					_self.moments.page = data.page;
					_self.moments.page_size = data.page_size;
					_self.posts = _self.moments.content;
				} else {
					uni.showToast({
						title: data.content,
						icon: 'none'
					});
				}
			});
		},


		navigateTo(url) {
			uni.navigateTo({
				url: url
			});
		},
		like(index) {
			var reqData = {
				moment_id: this.posts[index].id,
				like: this.posts[index].islike == 0 ? 1 : 0
			};

			if (this.posts[index].islike === 0) {
				this.posts[index].islike = 1;
				this.posts[index].like.push({
					uid: this.user_id,
					username: ',' + this.username
				});
			} else {
				this.posts[index].islike = 0;
				this.posts[index].like.splice(
					this.posts[index].like.indexOf({
						uid: this.user_id,
						username: ',' + this.username
					}),
					1
				);
			}

			//request

			util.POST('moment/like', reqData, function(data) {
				console.info('handle:' + JSON.stringify(data));
				if (data.status == 1) {
					// _self.moments = data;
					//append data
				} else {
					uni.showToast({
						title: data.content,
						icon: 'none'
					});
				}
			});
		},
		comment(index) {
			this.showInput = true; //调起input框
			this.focus = true;
			this.index = index;
		},
		adjust() {
			//当弹出软键盘发生评论动作时,调整页面位置pageScrollTo
			return;
			uni.createSelectorQuery()
				.selectViewport()
				.scrollOffset(res => {
					var scrollTop = res.scrollTop;
					let view = uni.createSelectorQuery().select('#post-' + this.index);
					view.boundingClientRect(data => {
						console.log('data:' + JSON.stringify(data));
						console.log('手机屏幕高度:' + this.screenHeight);
						console.log('竖直滚动位置' + scrollTop);
						console.log('节点离页面顶部的距离为' + data.top);
						console.log('节点高度为' + data.height);
						console.log('窗口高度为' + this.windowHeight);

						uni.pageScrollTo({
							scrollTop: scrollTop - (this.windowHeight - (data.height + data.top + 45)), //一顿乱算
							// scrollTop: 50,
							duration: 300
						});
					}).exec();
				})
				.exec();
		},
		reply(index, comment_index) {
			console.log('replay');
			this.is_reply = true; //回复中
			this.showInput = true; //调起input框
			let replyTo = this.posts[index].comments.comment[comment_index].username;
			this.input_placeholder = '回复' + replyTo;
			this.index = index; //post索引
			this.comment_index = comment_index; //评论索引
			this.focus = true;
		},
		blur: function() {
			this.init_input();
		},
		send_comment: function(message) {
			if (this.is_reply) {
				var reply_username = this.posts[this.index].comments.comment[this.comment_index].username;
				comment_content = '回复' + reply_username + ':' + message.content;
			} else {
				var comment_content = message.content;
			}
			this.posts[this.index].comments.total += 1;
			this.posts[this.index].comments.comment.push({
				uid: this.user_id,
				username: this.username,
				content: comment_content //直接获取input中的值
			});

			//request
			var reqData = {
				content: message.content,
				moment_id: this.posts[this.index].id
			};
			util.POST('moment/replay', reqData, function(data) {
				console.info('handle:' + JSON.stringify(data));
				if (data.status == 1) {
					// _self.moments = data;
					//append data
				} else {
					uni.showToast({
						title: data.content,
						icon: 'none'
					});
				}
			});
			this.init_input();
		},
		init_input() {
			this.showInput = false;
			this.focus = false;
			this.input_placeholder = '评论';
			this.is_reply = false;
		},
		previewImage(imageList, image_index) {
			var current = imageList[image_index];
			uni.previewImage({
				current: current,
				urls: imageList
			});
		},
		goPublish() {
			uni.navigateTo({
				url: './publish/publish',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style scoped>
@import url('./index.css');
</style>
