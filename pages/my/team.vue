<template>
	<view class="page">
<!-- 		<uni-nav-bar fixed="true" left-icon="back" @click-left="back" @click-right="showMenu" left-text="返回" right-text="确定"
		 title="公司认证" class="top-view titles"></uni-nav-bar> -->
		 <view style="uni-card" v-if="team==null">
			 <view>你还没创建团队</view>
			 <button @tap="onCreate">现在创建</button>
		 </view>
		<view class="uni-card" v-else>
			<view class="uni-list">
				<view style="background-color: #66ad28; display: flex;justify-content: center;  padding-top: 5px; padding-bottom: 50upx;">
					<view style="display: flex;flex-direction: column;  align-items: center; justify-content: center; width: 100%;">
						
						<view class="grace-add-file" v-if="team.avatar_text" style="justify-content: center;">
							<view class="garce-items " style="height: 180upx;width: 180upx; justify-content: center;flex-direction: row; align-items: center;" >
									<image :src="image_root+team.avatar_text"  @tap="showImgs"></image>
									<view class="grace-close" @tap="removeImg(1)" id="'grace-items-img-1'"></view>
							 </view>
						 </view>
						<view class="uni-uploader__input-box"  v-else>
							<view class="uni-uploader__input" @tap="chooseImg"></view>
						</view>
						<!-- <text>{{team.name}}</text> -->
						<input name="team_name" type="text" placeholder="请录入团队名" :value="team.name"  @confirm="onConfirm" style="text-align: center;" />
						<text>团队代码：{{team.id}}</text>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge">
						综合评分
						<uni-rate max="5" :value="team.score" disabled="true"></uni-rate>
						<text>{{team.score}}分</text>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right uni-navigate-badge" @click="onGotoComments">
						大家说
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-badge">
						团队规模
						<text>{{team.member_num}}人</text>
					</view>
				</view>
				<view class="uni-list-cell " hover-class="uni-list-cell-hover" >
					<view class="uni-list-cell-navigate  uni-navigate-right uni-navigate-badge" >
						
						 <picker @change="onPickerMaster" :value="master_index" :range="member_list" style="height:50upx;">				
						 <view>
						   团队负责人
						   
						   <view style="margin-left:350upx; width:400upx; margin-top:-50upx;">{{member_list[master_index]}}</view>
						</view>
						   </picker>
					</view>
				</view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-badge">
						平台接单
						<text>{{team.order_total}}单</text>
					</view>
				</view>
				
						
				<view class="grace-select-tips">
					<checkbox-group  name='condition2'>
						<label v-for="(item, index) in orderNumArr" :key="index" :class="[item.checked ? 'grace-checked' : '']" style="width: 150upx; text-align: center;margin-left: 35upx;">
							<checkbox :value="item.service_id" checked="false" style="width: 150upx;"></checkbox> {{item.name}}({{item.count}})
						</label>
					</checkbox-group>
				</view>
			<view>
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate  uni-navigate-badge">
						可接业务
						<text  style="color: #007AFF;"></text>
					</view>
					
					
				</view>
			<view class="grace-select-tips">
				<checkbox-group @change="graceSelectChange" name='condition'>
					<label v-for="(item, index) in graceSelectTips" :key="index" :class="[item.checked ? 'grace-checked' : '']" style="width: 150upx; text-align: center;margin-left: 35upx;">
						<checkbox :value="item.value" :checked="item.checked" style="width: 150upx;"></checkbox> {{item.name}}
					</label>
				</checkbox-group>
			</view>
			</view>
			<view>
			
				</view>
				<view style="margin-top: 2upx;" class="uni-card">
		
				<view style="margin-left: 15upx;">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate  uni-navigate-badge">
						案例展示（展示最多五个案例）
						<text style="color: #007AFF;" @tap="goDetailPage('my/team_case_add?team_id='+team.id)">添加</text>
					</view>	
				</view>
				
				 <view class="uni-comment">
						
						<!-- style="flex-direction: row-reverse;" -->
					<view v-for="(item,index) in teamcase.content" :key="index" >
				      <view class="uni-comment-list" :style="item.left?'':'flex-direction: row-reverse;'">
							
				      <view class="uni-comment-face">
				        <image :src="image_root+team.avatar" mode="widthFix"></image>
				      </view>
							
				      <view class="uni-comment-body">
				        <view class="uni-comment-top" style="display:flex; flex-direction: row; space-between; text-align: right;">
				          <text>{{item.create_time}}</text> <text @tap="onRemoveCase(item.id)" >删除</text>
				        </view>
<!-- 				        <view class="uni-comment-date">
				          <text>{{item.create_time}}</text>
				        </view> -->
				        <view class="uni-comment-content">
				          {{index+1}}.{{item.content}}
				        </view>
				        <view class="uni-grid-9" style="width:600upx;">
				          <view class="uni-grid-9-item " hover-class="uni-grid-9-item-hover"
				                style=" height: 200upx; width: 200upx;" v-for="(img,ind) in item.images" :key="ind">
				            <image :src="image_root+img.path" class="uni-grid-9-text image-item" @tap="showImgs(item, ind)"></image>
				          </view>
				          
				        </view>
				 <!--       <view class="uni-comment-date">
				          <view>{{item.days}}天前</view>
				          <view class="uni-comment-replay-btn">{{item.count}}回复</view>
				        </view> -->
				      </view>
				    </view>
						
						</view>
						
						
				    
				    </view>
				  </view>
				  <!-- 评论区 end -->
				</view>
				
			</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniBadge from '@/components/uni-badge.vue';
// import uniNavBar from '@/components/uni-nav-bar.vue'
import uniRate from "../../components/uni-rate/uni-rate.vue"
import util from '@/common/util.js';

var _self = null;
export default {
   
    components: {
        uniBadge,
		uniRate
		// uniNavBar
    },
    data() {
        const currentDate = this.getDate({
            format: true
        });
        return {
			graceSelectTips: [
				{ name: '基修', value: '0', checked: true },
				{ name: '安装维修', value: '0', checked: true },
				{ name: '复尺测量', value: '1', checked: false },
				{ name: '围挡拆场', value: '2', checked: false },
				{ name: '标识广告', value: '3', checked: false },
			],
			title: '用户信息',
			team:null,
            gender: ['男', '女'],
            index: 0,
            date: currentDate,
            birthday: '',
            index_sex: '',
            yesrs: ['1-3年', '3-5年', '5-10年', '10年以上'],
            sel_years_index: 0,
            sel_year: '',
			teamcase:[],
			image_root:util.IMAGE_URI,
			user_id:0,
			member:[],
			member_list:[],
			master_index: 0,
			service:[],
			orderNumArr:[],
			
        };
    },
	onLoad(option) {
		_self = this;
		if(option){
			this.user_id = option.user_id;
			this.loadTeamInfo(this.user_id);
			
		}
		//load category
		this.graceSelectTips = [];
		var service = uni.getStorageSync('service');
		this.service = service;
		if(service){
			for (var i = 0; i < service.length; i++) {
				
				this.graceSelectTips.push({
					name:service[i].name,
					value:service[i].id,
					checked:false,
				});
				
			}
		}
	},
	onShow() {
		_self = this;

			this.loadTeamInfo(this.user_id);

	},
    computed: {
		
        startDate() {
            return this.getDate('start');
        },
        endDate() {
            return this.getDate('end');
        }
    },
    methods: {
		getServiceName:function(id){
			for (var i = 0; i < this.service.length; i++) {
				if(this.service[i].id == id){
					return this.service[i].name;
				}
			}
		},
		onRemoveCase:function(id){
			util.GET('user/team_case/delete?id='+id, {}, function(data) {
				console.log('user/team_case/delete:' + data);
				
				
				_self.loadTeamCase(_self.team.id);
// 				//remove 
// 				for (var i = 0; i < _self.member_list.length; i++) {
// 					_self.member_list[i]
// 				}
				
				
			});
		},
		onGotoComments:function(e){
			uni.navigateTo({
				url:'/pages/my/team_comments/team_comments?team_id='+this.team.id,
			});
		},
		loadMembers:function(team_id){
			util.GET('user/team_member/lists?team_id='+team_id, {}, function(data) {
				console.log('user/team_member/lists:' + data);
				_self.member = data.content;
				
				var itemList = [];
				for (var i in _self.member) {
					itemList.push(_self.member[i].name+ "   "+_self.member[i].mobile);
				}
				_self.member_list = itemList;
				
			});
		},
		onPickerMaster:function(e){
			console.debug('onPickerMster');
			 this.master_index = e.target.value
			
			
// 			
// 			// get member
// 			uni.showActionSheet({
// 				itemList: itemList,
// 				success: function (res) {
// 					console.log('选中了第' + (res.tapIndex + 1) + '个按钮 value:' +this.member[res.tapIndex].name);
// 					//sel: this.member[res.tapIndex].name
// 					this.team.master = this.member[res.tapIndex].name;
// 				},
// 				fail: function (res) {
// 					console.log(res.errMsg);
// 				}
// 			});
		},
		showImgs : function(e){
		    
			var url = this.image_root+this.team.avatar_text;
		    uni.previewImage({
		      urls: [url],
		    })
		},
		removeImg : function(ind){
							
		     // _self.imageList[ind] = '';
				this.team.avatar_text = '';

		},
		onConfirm(e){
			console.info("onConfirm:"+ JSON.stringify(e.detail))
			this.team.name = e.detail.value;
			this.onSave();
		},
		onCreate(){
			var reqData = {
				name:'team_name',
				user_id:this.user_id,
			};
			
			util.POST('user/team/add', reqData, function(data) {
				console.log('user/team/add:' + data);
				_self.team = data;
				
			});	
		},
		onSave(){
			var reqData = this.team;
			
			util.POST('user/team/edit', reqData, function(data) {
				console.log('user/team/add:' + data);
				_self.team = data;
				
			});	
		},
		chooseImg() { //选择图片
		    uni.chooseImage({
		        sourceType: ["camera", "album"],
		        sizeType: ["compressed"],
		        // count: 8 - this.imageList.length,
				 count: 1,
		        success: (res) => {
		            // this.imageList = this.imageList.concat(res.tempFilePaths);
					
					
					
					var imageSrc = res.tempFilePaths[0]
					
					wx.uploadFile({
					  url: util.API_URI + 'sys/upload',
					  filePath: imageSrc,
					  name: 'data',
					  success: (res) => {
					    console.log('uploadImage success, res is:', res)
					    uni.showToast({
					      title: '上传成功',
					      icon: 'success',
					      duration: 1000,
					    })
					    // this.imageList = imageSrc
					
					    // var obj = eval('(' + res.data + ')')
						var obj = JSON.parse(res.data);
						_self.team.avatar = obj.id;
						_self.team.avatar_text = obj.url;
					    //fixme:update info
						
						_self.onSave();
					  },
					  fail: (err) => {
					    console.log('uploadImage fail', err)
					    uni.showModal({
					      content: err.errMsg,
					      showCancel: false,
					    })
					    uni.hideLoading()
					  },
					  complete: () => {
					    console.log('complate')
					  },
					})
					
					
		        }
		    })
		},
		graceSelectChange: function (e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.graceSelectTips.length; i++) {
				if (checkVal.indexOf(this.graceSelectTips[i].value + '') != -1) {
					this.graceSelectTips[i].checked = true;
				} else {
					this.graceSelectTips[i].checked = false;
				}
			}
			this.graceSelectTips = this.graceSelectTips;
			 console.log('checkbox发生change事件，携带value值为：' + e.detail.value)
			this.condition = e.detail.value
		},
		
		loadTeamInfo(user_id){
				util.GET('user/team/detail?user_id='+user_id, {}, function(data) {
					console.log('user/team/detail:' + data);
					_self.team = data;
					//calc order_num
					var orderNumArr = [];
					var total = 0;
					for (var i = 0; i < data.order_num.length; i++) {
						var item = data.order_num[i];
						if(item){
							item.name = _self.getServiceName(item.service_id);
							orderNumArr.push(item);
							
							total+= parseInt(item.count);
						}
						
					}
					
					//append none
					for (var i = 0; i < _self.service.length; i++) {
						var service_id = _self.service[i].id;
						var find = false;
						for (var j = 0; j < data.order_num.length; j++) {
							if(service_id == data.order_num[j].service_id){
								find = true;
								
							}
						}
						
						//append
						if(!find){

							orderNumArr.push({
								name:_self.getServiceName(service_id),
								service_id: service_id,
								count:0
							});
						}
					}
					
					_self.orderNumArr = orderNumArr;
					_self.team['order_total'] = total;
					//calc service category
					var serviceIdArr = data.service.split(',');
					for (var j = 0; j < serviceIdArr.length; j++) {
						for (var i = 0; i < _self.graceSelectTips.length; i++) {
							
							if(_self.graceSelectTips[i].value == serviceIdArr[j]){
								_self.graceSelectTips[i].checked = true;
							}
						}
					
					}
					
					

					_self.loadTeamCase(_self.team.id);
					_self.loadMembers(_self.team.id);
				});	
		},
		loadTeamCase(team_id){
				util.GET('user/teamcase/lists?team_id='+team_id, {}, function(data) {
					console.log('user/teamcase/list:' + data);
					_self.teamcase = data;
					
				});	
		},
        bindPickerChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.target.value);
            this.index = e.target.value;
            this.index_sex = e.target.value;
        },
        bindDateChange: function(e) {
            this.date = e.target.value;
            this.date_sel = e.target.value;
        },
        bindtimeChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.target.value);
            this.time = e.target.value;
            this.sex_time = e.target.value;
        },
        getDate(type) {
            const date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            if (type === 'start') {
                year = year - 60;
            } else if (type === 'end') {
                year = year + 2;
            }
            month = month > 9 ? month : '0' + month;
            day = day > 9 ? day : '0' + day;

            return `${year}-${month}-${day}`;
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
	.image-item {
	  width: 95%;
	  height: 95%;
	}
</style>
