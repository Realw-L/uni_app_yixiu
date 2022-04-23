<template>
	<view class="grace-padding">
		
		<view class="grace-title" style="margin-top:60upx;">
			<view class="grace-h5 grace-blod">大家评论</view>
		</view>
		<!-- 评论区 start -->
		<view class="grace-comment">
			<view class="grace-comment-list" v-for="(item,index) in comments" :key="index">
				<view class="grace-comment-face"><image :src="image_root+item.avatar" mode="widthFix"></image></view>
				<view class="grace-comment-body">
					<view class="grace-comment-top">
						<text>{{item.username}}</text>
						<text class="grace-iconfont icon-zan" @tap="onLike(item)">{{item.like}}</text>
					</view>
					<view class="grace-comment-date">
						<text>{{item.create_time}}</text>
						<!-- <text>{{item.like}}</text> -->
					</view>
					<view class="grace-comment-content">{{item.content}}</view>
				</view>
			</view>
		</view>	
		
		<!-- <view class="grace-more-bottom">
			<navigator class="grace-border">查看全部评论 <text class="grace-iconfont icon-arrow-right"></text></navigator>
		</view> -->
		<view style="height:100upx;"></view>
		<!-- 评论输入框 -->
		<view class="grace-footer">
			<view class="grace-input">
				<view class="grace-input-icon grace-iconfont icon-write"></view>
				<input type="text"  placeholder="写评论" @input="onInput"></input>
			</view>
			<view class="grace-items" style="padding:0 20upx;" @tap="onAddComment">发布</view>
		</view>
	</view>
</template>
<script>
	import util from '../../../common/util.js';
	
	let _self = null;
	
	
export default {
	data() {
		return {
			image_root: util.IMAGE_URI,
			team_id:0,
			input_content:'',
			comments:[{
				avatar:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				create_time:'2018-01-03 03:12:34',
				username:'moran',
				like:11,
				content:'卖家真不错， 服务非常用心， 做得很好很漂亮。'
			},
			{
				avatar:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				create_time:'2018-01-03 03:12:34',
				username:'moran',
				like:11,
				content:'卖家真不错， 服务非常用心， 做得很好很漂亮。'
			},
			{
				avatar:'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				create_time:'2018-01-03 03:12:34',
				username:'moran',
				like:11,
				content:'卖家真不错， 服务非常用心， 做得很好很漂亮。'
			},
			],
		}
	},
	onLoad(option) {
		_self = this;
		if(option){
			var team_id = option.team_id;
			this.team_id = team_id;
			if(team_id){
				this.loadComment(team_id);
			}
		}
	},
	methods:{
		onLike:function(item){
			var reqDAta = {
				id:item.id,
				like:item.like?item.like+1:1,
			}
			util.POST('user/team_comment/edit', reqDAta, function(data) {
				console.log('user/team_comment/edit:' + data);
				
				//refresh
				_self.loadComment(_self.team_id);
				
				
			});
		},
		onInput:function(e){
			console.debug(JSON.stringify(e));
			this.input_content = e.target.value;
		},
		onAddComment:function(e){
			var reqDAta = {
				content:this.input_content,
				team_id:this.team_id,
			}
			util.POST('user/team_comment/add', reqDAta, function(data) {
				console.log('user/team_comment/add:' + data);
				
				//refresh
				_self.loadComment(_self.team_id);
				
				
			});
		},
		loadComment:function(team_id){
			util.GET('user/team_comment/lists?team_id='+team_id, {}, function(data) {
				console.log('user/team_comment/lists:' + data);
				_self.comments = data.content;
				
			
				
			});
		},
		
	}
	
}
</script>
<style>
page{background:#FFF;}
</style>

