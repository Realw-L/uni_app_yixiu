<template>
	<view class="uni-padding-wrap uni-common-pb">
		<view class="uni-header-logo" style="margin-top: '0upx';height: '200upx'; background-image: 'url(http://app.yidkj.com/Public/app/back1.jpg)';">
			<view class="uni-flex" style="margin-top: 20upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 50upx;">
				<view class="text" style="width: 200upx;height: 220upx;display: flex; justify-content: center;align-items: center;">
					<image :src="avatar" @tap="goDetailPage('my/face')" style="border: #f6f6f6 2px solid; border-radius:80upx; width:100upx ; height:100upx ;"></image>
				</view>
				<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-top: 50upx;">
					<view class="text" style=" color: #000000; font-size:25upx; text-align: left;">用户名:{{ user.nickname }}</view>
                  <view class="grace-tags-large grace-tbr" style="width: 100upx; color: #FFFFFF; background-color: #00C456;">普通会员</view>
				</view>
<!-- 				<view class="uni-flex uni-column" style="flex:1; height: :500upx; margin-left: 5upx; padding-left: 5upx; margin-top: 50upx;">
					<button class="mini-btn" type="default" size="mini" style="height: 50upx; width: 210upx; margin-left: 20upx;" @tap="onSwitchToMaster">切换到师傅</button>
					<button class="mini-btn" type="default" size="mini" style="width: 210upx; height: 50upx; margin-top: 20upx; margin-left: 20upx;" @tap="onGoMoment">
						我的圈子
					</button>
				</view> -->
			</view>
		</view>
		<view style="display: flex; align-items: center; flex-direction:row; justify-content: space-between; flex-wrap: nowrap; padding-bottom: 50upx; " class="uni-common-pb">
			<text style="margin-top: 10upx; margin-left: 30upx; width: 300upx;">余额：{{ user.balance }}元</text>
			<button type="primary" style="width: 130upx; height: 50upx; font-size: 30upx; margin-left: 170upx; margin-top: 10upx; line-height: 28px;" @tap="goDetailPage('my/pay_check')">查看
			</button>
			<button
				type="warn"
				style="width: 130upx; height: 50upx; margin-top: 10upx;  font-size: 30upx; margin-left: 10upx; line-height: 28px;"
				@tap="goDetailPage('my/charge')"
			>
				充值
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
				<view class="uni-grid-9-item" style="height: 140upx; background: none; border: none;" hover-class="uni-grid-9-item-hover" @tap="goDetailPage('my/help')">
					<image src="../../static/icon/readme1.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">使用指南</text>
				</view>
				<view
					class="uni-grid-9-item"
					style="height: 140upx; background: none; border: none;"
					hover-class="uni-grid-9-item-hover no-border-right"
					@tap="goDetailPage('my/customer_service')"
				>
					<image src="../../static/icon/customer_service1.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">联系客服</text>
				</view>
				<view
					class="uni-grid-9-item"
					style="height: 140upx; background: none; border: none;"
					hover-class="uni-grid-9-item-hover"
					@tap="goDetailPage('my/gongsirenzheng_new')"
				>
					<image src="../../static/icon/certication1.png" mode="center" class="function_icon"></image>
					<text class="uni-grid-9-text">企业认证</text>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-center" style="height: 130upx; " @tap="goDetailPage('my/live_user')">
			<image :rc="HOST+'/Public/app/yonghuka.jpg'" mode="scaleToFill" style="width:100%; height: 150upx;"></image>
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
import util from '@/common/util.js';
import uniRate from '@/components/uni-rate/uni-rate.vue';
export default {
	components: { uniRate },
	name: 'user',
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
			lists: [
				
				{
					name: '公司入驻',
					url: 'my/gongsiruzhu'
				},
				{
					name: '升级会员',
					url: 'my/live_user'
				},
				{
					name: '一键看店',
					url: 'my/share'
				},
				{
				  name: '我的优惠券',
				  url: 'my/coupon',
				},
				{
					name: '疑难解答',
					url: 'my/qa'
				},
		
		{
					name: '平台反馈',
					url: 'my/feedback'
				},
				{
					name: '我的收藏',
					url: 'my/gift'
				},
				{
					name: '用户协议',
					url: 'my/user_protocal'
				},
				{
					name: '关于我们',
					url: 'my/aboutus'
				},
				{
					name: '分享推广',
					url: 'my/share/share'
				},
				// #ifndef MP-WEIXIN
				{
					name: '版本更新',
					url: 'my/upgrade'
				},
				// #endif
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
		console.debug('onLoad');
		//for test ================================
		if (util.isDevMode()) {
			uni.setStorageSync('login_status', 1);
			uni.setStorageSync('token', 'afa629c8d41ced4ee2fedee64bbd488d');
			uni.setStorageSync('user_info', {
				id: 1,
				username: 'huamoran',
				nickname: 'huamoran',
				mobile: '13798454564',
				avatar: '../../static/icon/certication.png',
				balance: 34.34
			});
			uni.setStorageSync('user_id', 1);

			this.loadSysInfo();
		}
		//end =================================================

		//check user login
		var login_status = uni.getStorageSync('login_status');
		if (login_status != 1) {
			uni.navigateTo({
				url: 'login/login'
			});
			return;
		} else {
		}
	},
	onReady() {
		console.debug('onReady');
	},
	
	onNavigationBarButtonTap(e) {
		uni.navigateTo({ url:'/pages/my/messenger'});
	},
	methods: {
		
		onCallme() {
			uni.makePhoneCall({
				phoneNumber: '4008062355',
				complete() {}
			});
		},
		onGoMoment() {
			uni.switchTab({
				//url:'/pages/moment/index'
				url: '/pages/moment/index/index'
			});
		},
		initData() {
			console.debug('user initData');
			//check storage
			this.user = uni.getStorageSync('user_info');
			if (this.user) {
				console.debug('user_info:' + JSON.stringify(this.user));
				this.avatar = util.IMAGE_URI + this.user.avatar;
			} else {
				this.loadUserDetail();
			}

			if (!uni.getStorageSync('user_info')) {
				this.loadSysInfo();
			}
		},
		onSwitchToMaster() {
			this.$emit('onSwitchActor', 1);
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

		trigerCollapse(e) {
			if (!this.lists[e].pages) {
				if (this.lists[e].url == 'my/signout') {
					//clear storage
					uni.setStorageSync('login_status', 0);
					uni.navicateto('home/index');
				} else {
					this.goDetailPage(this.lists[e].url);
				}
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
		upgrade2(url) {
			uni.showToast({
				icon: 'none',
				title: '在后台开始下载...'
			});
			// var url = 'http://app.yidikj.com/promotion/yixiou.apk' // 下载文件地址
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
			var verInfo = util.getAPPInfo('com.ffhapp.yixiou');
			console.debug('verinfo:' + JSON.stringify(verInfo));

			var self = this;
			//       var req = { //升级检测数据
			//         'appid': plus.runtime.appid,
			//         'version': plus.runtime.version,
			//         'imei': plus.device.imei,
			//       }
			//       console.debug('req version:' + JSON.stringify(req))
			//

			util.GET('sys/upgrade', { version: verInfo.versionName }, function(data) {
				console.log('sys/upgrade:' + JSON.stringify(data));

				//check

				if (!util.compareVersion(verInfo.versionName, data.version)) {
					uni.showModal({
						title: '检测到新版本',
						content: '确定要升级?',
						success: res => {
							if (res.confirm) {
								self.upgrade2(data.url);
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
			});
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
				// this.upgrade2();
				return;
			} else if (path == 'my/help') {
				var url = 'https://a5.rabbitpre.com/m2/aUe1Zja2TA';
				// #ifdef MP-WEIXIN
				url = util.H5_URL + 'sys/manual?actor=0';
				// #endif
				util.goH5(url);
				return;
			}
			// 						else if (path == 'my/feedback') {
			//                 var url = util.H5_URL + 'sys/feedback&groupid=0';
			// 								//api:var url = util.H5_URL + 'message/feedbacks';
			//
			//                 util.goH5(url);
			//                 return;
			//             }

			let uri = ~path.indexOf('platform') ? path : '/pages/' + path;
			uni.navigateTo({
				url: uri
			});
			return false;
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
</style>
