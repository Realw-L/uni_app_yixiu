<template>
	<view>
		<view v-if="actor==0">
			<user ref="user" :avatar="avatar" :user="userinfo" @onSwitchActor="onSwitchActorToMaster"></user>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js'
	import user from './user.vue'
	import master from './master.vue'
	export default {
	components: {
			user,
		  master,
		},

		data(){
			return{
				actor:0,//user
        userinfo:{},
				avatar:''
			}
		},
		onShow(){

			  //for test ================================
			if (util.isDevMode()) {
			    uni.setStorageSync('login_status', 1);
			    uni.setStorageSync('token', util.getToken());
			    uni.setStorageSync('user_info', {
			        id: 1,
			        username: 'huamoran',
			        nickname: 'huamoran',
			        mobile: '13798454564',
			        avatar: '../../static/icon/certication.png',
			        balance: 34.34
			    });
			    uni.setStorageSync('user_id', 1);


			}
			//end =================================================

			//check user login
			var login_status = uni.getStorageSync('login_status');
			if (login_status != 1) {
			    uni.navigateTo({
			        url: 'login/login'
			    });
			    return;
			}

			//check storage
			this.userinfo = uni.getStorageSync('user_info');
			if (this.userinfo) {
			  this.avatar = util.IMAGE_URI+this.userinfo.avatar;
			} else {
			    // this.loadUserDetail();
			}

			if (!uni.getStorageSync('sys_info')) {

				//this.loadSysInfo();
			}
		},
		onReady(){
			// this.$refs.user.initData();
      // this.$refs.master.initData();
			this.actor = uni.getStorageSync('actor_type')
			
		},
	onLoad() {
		this.actor = uni.getStorageSync('actor_type')
	},
		onShow(){
			this.loadUserInfo();
			
		},
		methods:{
			onSwitchActorToMaster(){
				this.actor=1;
				uni.setNavigationBarTitle({
					title: "师傅中心"
				});
				// this.$refs.master.initData();
				uni.setStorageSync('actor_type', this.actor);
			},
			onSwitchActorToUser(){
				this.actor=0;
				uni.setNavigationBarTitle({
					title: '用户中心'
				});
				uni.setStorageSync('actor_type', this.actor);
			},
			loadUserInfo() {
				console.log('loadUserInfo')
				var self = this;
				var id = uni.getStorageSync('user_id');
				util.GET('user/detail?id='+id, {id:id}, function(data) {
					console.log('user/detail:' + JSON.stringify(data));
					
					uni.setStorageSync('user_info', data);
					
					self.userinfo = data;
					self.avatar = util.IMAGE_URI+self.userinfo.avatar;
				});
			},
		


		}
	}
</script>

<style>

</style>
