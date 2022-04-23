<template>
	<view class="uni-padding-wrap uni-common-pb">
		<view class="uni-header-logo" v-bind:style="[{'margin-top': '0upx', height: '200upx', 'background-image': 'url('+HOST+'/Public/app/back.jpg)' }]">
			<view class="uni-flex" style="margin-top: 20upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 50upx;">
				<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
					<image :src="avatar" @tap="goDetailPage('my/face')" style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
				</view>
				<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 50upx;">
					<view class="text" style=" color: #000000; font-size:25upx; text-align: left;">用户名:{{ user.nickname }}</view>
					<view class="text" style="  color: #000000; font-size:25upx; text-align: left;">积分:650分</view>
					<view class="text" style=" color: #000000; font-size:25upx; display:flex;">
						<view style="font-size: 25upx; width: 60upx;">星级:</view>
						<uni-rate value="2"></uni-rate>
					</view>
				</view>
				<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-left: 5upx; padding-left: 5upx; margin-top: 50upx;">
					<button class="mini-btn" type="default" size="mini" style="height: 50upx; width: 210upx; margin-left: 20upx;" @tap="onSwitchToMaster">切换到用户</button>
					<button class="mini-btn" type="default" size="mini" style="width: 210upx; height: 50upx; margin-top: 20upx; margin-left: 20upx;" @tap="onGoMoment">
						我的圈子
					</button>
				</view>
			</view>
		</view>

		<view style="display: flex; align-items: center; flex-direction:row; justify-content: space-between; flex-wrap: nowrap; padding-bottom: 50upx; " class="uni-common-pb">
			<text style="margin-top: 15upx; margin-left: 10upx; width: 300upx;">余额：{{ user.balance }}元</text>
			<button
				type="primary"
				style="width: 130upx; font-size: 30upx; height: 50upx; margin-left: 170upx; margin-top: 10upx; line-height: 28px;"
				@tap="goDetailPage('my/charge')"
			>
				充值
			</button>
			<button
				type="warn"
				style="width: 130upx; font-size: 30upx; height: 50upx; margin-top: 10upx;  margin-left: 10upx; line-height: 28px;"
				@tap="goDetailPage('my/withdraw')"
			>
				提现
			</button>
		</view>
		<view>
			<view class="uni-grid-9" style="background: none; border: none; margin-top: -23px; margin-left: -20px;">
				<view class="uni-grid-9-item" style="height: 140upx; background: none; border: none;" hover-class="uni-grid-9-item-hover" @tap="goDetailPage('my/order_index')">
					<image src="../../static/icon/order1.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">订单</text>
				</view>
				<view
					class="uni-grid-9-item"
					style="height: 140upx; background: none; border: none;"
					hover-class="uni-grid-9-item-hover no-border-right"
					@tap="goDetailPage('my/receiving_report')"
				>
					<image src="../../static/icon/verify1.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">验收单</text>
				</view>
				<view class="uni-grid-9-item" style="height: 140upx; background: none; border: none;" hover-class="uni-grid-9-item-hover" @tap="goDetailPage('my/ticket')">
					<image src="../../static/icon/tick1.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">开票</text>
				</view>
				<view class="uni-grid-9-item" style="height: 140upx; background: none; border: none;" hover-class="uni-grid-9-item-hover" @tap="showShade2">
					<image src="../../static/u22.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">签到</text>
				</view>
				<view class="grace-shade grace-shade-black" v-if="show2">
					<view class="grace-shade-msg" style="background: none;">
						<view class="body">
							<image src="../../static/hongbao.png" style="width: 500upx; height: 500upx;"></image>
							<view class="close-btn grace-icons icon-close3" @tap="closeShade2"></view>
						</view>
					</view>
				</view>
				<view
					class="uni-grid-9-item"
					style="height: 140upx; background: none; border: none;"
					hover-class="uni-grid-9-item-hover no-border-right"
					@tap="goDetailPage('my/team_member?user_id=' + user.id)"
				>
					<image src="../../static/u20.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">积分商城</text>
				</view>
				<view class="uni-grid-9-item" style="height: 140upx; background: none; border: none;" hover-class="uni-grid-9-item-hover" @tap="goDetailPage('platform_praise')">
					<image src="../../static/u21.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">平台好评</text>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-center" style="height: 130upx; " @tap="goDetailPage('my/promotion_master')">
			<image :src="HOST+'/Public/app/tuik.jpg'" mode="scaleToFill" style="width:100%; height: 150upx;"></image>
		</view>
		<view class="uni-card" v-for="(list, index) in lists" :key="index">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse">
					<view
						class="uni-list-cell-navigate"
						hover-class="uni-list-cell-hover"
						:class="[list.open ? 'uni-active' : '', list.pages ? 'uni-navigate-bottom' : 'uni-navigate-right']"
						@click="trigerCollapse(index)"
					>
						{{ list.name }}
					</view>
					<view class="uni-list uni-collapse" v-if="list.pages" :class="list.open ? 'uni-active' : ''">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, key) in list.pages" :key="key" @click="goDetailPage(item)">
							<view class="uni-list-cell-navigate uni-navigate-right">{{ item.name ? item.name : item }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import share from '@/common/share.js';
import util from '@/common/util.js';
import uniRate from '@/components/uni-rate/uni-rate.vue';
var _self = null;
export default {
	name: 'master',
	components: {
		uniRate
	},
	props: {
		user: {
			type: Object,
			default: null
		},

		avatar: {
			type: String,
			default: '../../static/touxiang.png'
		}
	},
	data() {
		return {
			HOST: this.$util.HOST,
			show2: false,
			title: '师傅中心',
			lists: [
				{
					name: '使用指南',
					url: 'my/help'
				},
				{
					name: '平台反馈',
					url: 'my/feedback'
				},
				{
					name: '用户协议',
					url: 'my/user_protocal'
				},
				{
					name: '关于我们',
					url: 'my/aboutus'
				},

				// #ifndef MP-WEIXIN
				{
					name: '版本更新',
					url: 'my/upgrade'
				},
				// #endif
				{
					name: '分享推广',
					url: 'my/share/share'
				},
				{
					name: '退出帐户',
					url: 'my/sinout'
				}
			]

			//begin nan

			//end
		};
	},
	onLoad() {
		console.debug('master onLoad');
		_self = this;
	},
	onShareAppMessage() {
		return {
			title: '欢迎体验uni-app',
			path: '/pages/tabBar/template/template'
		};
	},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			// #ifdef APP-PLUS
			url: '/platforms/app-plus/about/about',
			// #endif
			// #ifdef H5
			url: '/platforms/h5/about/about'
			// #endif
		});
	},
	onLoad() {},
	onBackPress() {
		//监听back键，关闭弹出菜单
		if (this.shareObj.shareMenu.isVisible()) {
			this.shareObj.shareMenu.hide();
			this.shareObj.alphaBg.hide();
			return true;
		}
	},
	methods: {
		showShade2: function() {
			this.show2 = true;
		},
		closeShade2: function() {
			this.show2 = false;
		},
		onGoMoment() {
			uni.switchTab({
				//url:'/pages/moment/index'
				url: '/pages/moment/index/index'
			});
		},
		initData() {
			console.debug('master initData');
			//check storage
			this.user = uni.getStorageSync('user_info');
			if (this.user) {
				console.debug('user_info:' + JSON.stringify(this.user));
				this.avatar = util.IMAGE_URI + this.user.avatar;
			} else {
				this.loadUserDetail();
			}

			if (!uni.getStorageSync('user_info')) {
			}
		},
		onSwitchToMaster() {
			this.$emit('onSwitchActor', 0);
		},

		loadUserDetail() {
			var userid;

			this.user = uni.getStorageSync('user_info');
		},

		loadSysInfo() {
			var self = this;

			util.GET('sys/info', {}, function(data) {
				console.log('sys/info:' + data);
				uni.setStorageSync('sys_info', data);
			});
		},

		upgrade2(url) {
			uni.showToast({
				icon: 'none',
				title: '在后台开始下载...'
			});
			// var url="http://app.yidikj.com/promotion/yixiou.apk"; // 下载文件地址
			var dtask = plus.downloader.createDownload(url, {}, function(d, status) {
				if (status == 200) {
					// 下载成功
					var path = d.filename;

					plus.runtime.install(path);
					console.log(d.filename);
				} else {
					//下载失败
					alert('Download failed: ' + status);
				}
			});
			dtask.start();
		},

		upgrade() {
			var self = this;

			var verInfo = util.getAPPInfo('com.ffhapp.yixiou');

			util.GET(
				'sys/upgrade',
				{
					version: verInfo.versionName
				},
				function(data) {
					console.log('sys/upgrade:' + data);

					//check
					if (!util.compareVersion(verInfo.versionName, data.version)) {
						uni.showModal({
							title: '检测到新版本',
							content: '确定要升级?',
							success: res => {
								if (res.confirm) {
									this.upgrade2(data.url);

									//
									// uni.downloadFile({
									//   url: '"http://app.yidikj.com/promotion/yixiou.apk"', //仅为示例，并非真实的资源
									//   success: (res) => {
									//     if (res.statusCode === 200) {
									//       console.log('下载成功');
									//     }
									//   }
									// });
								}
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: '已是最新版本',
							showCancel: false
						});
					}
				}
			);
		},

		trigerCollapse(e) {
			if (!this.lists[e].pages) {
				this.goDetailPage(this.lists[e].url);
				return;
			}
			for (var i = 0; i < this.lists.length; ++i) {
				if (e === i) {
					this.lists[i].open = !this.lists[e].open;
				} else {
					this.lists[i].open = false;
				}
			}
		},
		goDetailPage(e) {
			let path = e.url ? e.url : e;
			if (path == 'my/sinout') {
				//exit and clear session
				//clear data
				uni.showModal({
					title: '提示',
					content: '是否退出',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorage();
							uni.setStorageSync('login_status', 0);
							console.debug('sinout');
							path = '/pages/home/index';
							uni.switchTab({
								url: path
							});
						} else if (res.cancel) {
							return;
						}
					}
				});

				return;
			} else if (path == 'my/aboutus') {
				var API_GET_SYS_ABOUT = util.H5_URL + 'sys/aboutus';

				util.goH5(API_GET_SYS_ABOUT); //about us
				return;
			} else if (path == 'my/qa') {
				var url = util.H5_URL + 'faq/lists&category=0';
				util.goH5(url);
				return;
			} else if (path == 'my/user_protocal') {
				var url = util.H5_URL + 'sys/service';
				util.goH5(url);
				return;
			} else if (path == 'my/upgrade') {
				this.upgrade();
				return;
			}
			// 			else if (path == 'my/feedback') {
			//                 //api:var url = util.H5_URL + 'message/feedbacks';
			// 				var url = util.H5_URL + 'sys/feedback&groupid=0';
			//                 util.goH5(url);
			//                 return;
			//             }
			else if (path == 'my/help') {
				var url = 'https://a5.rabbitpre.com/m2/aUe1ZjaPR5';
				// #ifdef MP-WEIXIN
				url = util.H5_URL + 'sys/manual?actor=1';
				// #endif
				util.goH5(url);
				return;
			} else if (path == 'my/share/share') {
				// #ifdef APP-PLUS
				this.shareInfo();
				return;
				// #endif
				// #ifdef H5
				//todo:H5分享
				return;
				// #endif
			}

			let uri = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: uri
			});
			return false;
		},
		//分享
		shareInfo() {
			let shareInfo = {
				href: 'https://uniapp.dcloud.io',
				title: '分享测试',
				desc: '分享测试',
				imgUrl: '/static/logo.png'
			};
			let shareList = [
				{
					icon: '/static/sharemenu/wx.png',
					text: '微信好友'
				},
				{
					icon: '/static/sharemenu/pyq.png',
					text: '朋友圈'
				},
				{
					icon: '/static/sharemenu/weibo.png',
					text: '微博'
				},
				{
					icon: '/static/sharemenu/qq.png',
					text: 'QQ'
				},
				{
					icon: '/static/sharemenu/copy.png',
					text: '复制'
				},
				{
					icon: '/static/sharemenu/more.png',
					text: '更多'
				}
			];
			this.shareObj = share(shareInfo, shareList, function(index) {
				console.log('点击按钮的序号: ' + index);
				let shareObj = {
					href: shareInfo.href || '',
					title: shareInfo.title || '',
					summary: shareInfo.desc || '',
					success: res => {
						console.log('success:' + JSON.stringify(res));
					},
					fail: err => {
						console.log('fail:' + JSON.stringify(err));
					}
				};
				switch (index) {
					case 0:
						shareObj.provider = 'weixin';
						shareObj.scene = 'WXSceneSession';
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || '';
						uni.share(shareObj);
						break;
					case 1:
						shareObj.provider = 'weixin';
						shareObj.scene = 'WXSenceTimeline';
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || '';
						uni.share(shareObj);
						break;
					case 2:
						shareObj.provider = 'sinaweibo';
						shareObj.type = 0;
						shareObj.imageUrl = shareInfo.imgUrl || '';
						uni.share(shareObj);
						break;
					case 3:
						shareObj.provider = 'qq';
						shareObj.type = 1;
						shareObj.imageUrl = shareInfo.imgUrl || '';
						uni.share(shareObj);
						break;
					case 4:
						uni.setClipboardData({
							data: shareInfo.href,
							complete() {
								uni.showToast({
									title: '已复制到剪贴板'
								});
							}
						});
						break;
					case 5:
						plus.share.sendWithSystem({
							type: 'web',
							title: shareInfo.title || '',
							thumbs: [shareInfo.imgUrl || ''],
							href: shareInfo.href || '',
							content: shareInfo.desc || ''
						});
						break;
				}
			});
			this.$nextTick(() => {
				this.shareObj.alphaBg.show();
				this.shareObj.shareMenu.show();
			});
		}
	}
};
</script>

<style>
page {
	height: auto;
	min-height: 100%;
}

.uni-card {
	box-shadow: none;
}

.uni-list:after {
	height: 0;
}

.uni-list:before {
	height: 0;
}

.text {
	color: #ffffff;
}

.function_icon {
	width: 50px;
	height: 50px;
}

.content {
	text-align: center;
	height: 400upx;
}

.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}

.title {
	font-size: 36upx;
	color: #8f8f94;
}
</style>
