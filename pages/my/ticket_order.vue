<template>
	<view>
		<view class="uni-list-cell" style="background-color:transparent;">
			<view class="uni-list">
				<view class="uni-triplex-row" style="background-color:transparent;" >
					<!-- <image src="../../static/60x60.png" mode="" style="width: 273upx; height: 200upx;"></image> -->
					<view class="uni-triplex-left" >
						<text class="uni-title uni-ellipsis">公司：深圳亿滴科技有限公司</text>
						<text class="uni-text">公司：深圳亿滴科技有限公司</text>
						<text class="uni-text">开户行：null</text>
						<text class="uni-text">公司银行帐号：755937787310101</text>
						<text class="uni-text-small uni-ellipsis">地点：深圳市龙岗区坂田街道五和大道南2号万科星火7栋115-E</text>
						<text class="uni-text">公司电话：18665126170</text>
					</view>
				</view>
				<view style="display: flex; flex-direction: row;">
				<view>发票类型：</view>
				<view class="grace-items" style="align-items:flex-start;">
								<view class="other">
									<graceSelectTags :items="demo1" type="radio" @change="change1"></graceSelectTags>
								</view>
							</view>
							</view>
			</view>
		</view>
		<view class="uni-list-cell" style="background-color:transparent;">
			<view class="uni-list">
				<view class="uni-triplex-row" style="background-color:transparent;" v-for="(item,index) in invoices.content" :key="index">
					<!-- <image src="../../static/60x60.png" mode="" style="width: 273upx; height: 200upx;"></image> -->
					<view class="uni-triplex-left" >
						<text class="uni-title uni-ellipsis">公司：{{item.company}}</text>
						<text class="uni-text">公司：{{item.company}}</text>
						<text class="uni-text">开户行：{{item.bank}}</text>
						<text class="uni-text">公司银行帐号：{{item.bank_account}}</text>
						<text class="uni-text-small uni-ellipsis">地点：{{item.address}}</text>
						<text class="uni-text">公司电话：{{item.contact_tel}}</text>
					</view>
					<view class="uni-right">
						<text class="uni-h5">{{item.create_time |formatDate}}</text>
					</view>
				</view>
			</view>
		</view>
		

		<view>
			<form @submit="formSubmit" @reset="formReset" >
			<view class="uni-list">				
				<view style="display: flex;">
					<!-- <view class="uni-title" style="margin-left: 10upx;">新添加：</view> -->
<!-- 					<view >
					<button class="mini-btn" type="primary" formType="submit" form-type="submit" size="mini" style="background-color: #6cb231; color: #FFFFFF; margin-top: 10upx; margin-left: 490upx;" >保存</button>					
				    </view> -->
				</view>
				</view>
				<view class="uni-list">
				<view style="display: flex;align-items: center;">
					<view class="uni-title"  style="width: 210upx; margin-left: 10upx;">公司名称：</view>
					<input type="text"  name="company" placeholder="请输入公司名称" style="border:0.5upx solid #378888; width: 500upx; ">
				</view>
			</view>
			<view class="uni-list">
				<view style="display: flex; align-items: center; ">
					<view class="uni-title" style="width: 210upx; margin-left: 10upx;">统一社会编码：</view>
					<input type="text" name="company_code" placeholder="请输入统一社会编码" maxlength="18" style="border:0.5px solid #378888; width: 500upx;  ">
				</view>
			</view>
			<view class="uni-list">
				<view style="display: flex; align-items: center; ">
					<view class="uni-title"  style="width: 210upx; margin-left: 10upx;">开户行：</view>
					<input type="text" name="bank" placeholder="请输入开户行" maxlength="10" style="border:0.5px solid #378888; width: 500upx;  margin-left: -50upx; margin-left: 1upx;">
				</view>
			</view>
			<view class="uni-list">
				<view style="display: flex; align-items: center;">
					<view class="uni-title"  style="width: 210upx; margin-left: 10upx;">公司银行账户：</view>
					<input type="text" name="bank_account" placeholder="请输入对公账户" maxlength="19" style="border:0.5px solid #378888; width: 500upx; ">
				</view>
			</view>
			<view class="uni-list">
				<view style="display: flex; align-items: center; ">
					<view class="uni-title"  style="width: 210upx; margin-left: 10upx;">地址：</view>
					<input type="text" name="address" placeholder="请输入地址" style="border:0.5px solid #378888; width: 500upx; ">
				</view>
			</view>
			<view class="uni-list">
				<view style="display: flex; align-items: center;">
					<view class="uni-title"  style="width: 210upx; margin-left: 10upx;">联系电话：</view>
					<input type="text" name="contact_tel" placeholder="请输入公司联系电话" style="border:0.5px solid #378888; width: 500upx; ">
				</view>
			</view>			
				<view class="uni-list">
					<view style="display: flex; justify-content: center; margin-top: 20upx; margin-bottom: 10upx;">
						<button type="primary" form-type="submit" style="width: 700upx;  background-color: #6cb231;">
							提交
						</button>
					</view>
				<view style="display: flex; align-items: center;">
					<view class="uni-title"  style="width: 100%; margin-left: 10upx; color: red; font-size: 30upx;"> *开票金额须大于1W（默认开普通发票，如需要开增值税发票，请联系客服）</view>	
				</view>
			</view>

			
			</form>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js'
	import graceSelectTags from "../../graceUI/components/graceSelectTags.vue"
	var graceChecker = require('../../common/graceChecker.js')
	
	let _self = null
	export default {
		data() {
			return {
				    demo1Val : 0, // 用于保存选中值、参与表单提交
				            demo1: [
				                { name: '普通发票', value: '0', checked: true },
				                { name: '增值税发票', value: '1', checked: false },
				            ],
				title: '开票信息',
				user:{},
				invoices:{},
			}
		},
			components: {
				graceSelectTags
			},
		onLoad() {
			_self=this;
			_self.loadLists();
		},
		filters:{
			formatDate:function(datestr){
				if(datestr && datestr.length>10){
					return datestr.substring(5,10);
				}
				return datestr;
			}
		},

		methods: {
	change1 : function(val){
				this.demo1Val = val;
			},
			formSubmit: function (e) {
				console.log("单选值 : ", this.demo1Val);
			      //将下列代码加入到对应的检查位置
			      //定义表单规则
			      var rule = [
			        {
			          name: 'company',
			          checkType: 'string',
			          checkRule: '3,40',
			          errorMsg: '请输入正确的公司名',
			        },
			        {
			          name: 'company_code',
			          checkType: 'string',
			          checkRule: '3,30',
			          errorMsg: '正确的公司统一社会编码',
			        },
			        {
			          name: 'contact_tel',
			          checkType: 'phoneno',
			          checkRule: '',
			          errorMsg: '请录入正确的联系方式，11位手机号码',
			        },
// 			
// 			        {
// 			          name: 'bank',
// 			          checkType: 'notnull',
// 			          checkRule: '',
// 			          errorMsg: '开户行',
// 			        },
// 					{
// 					  name: 'bank_account',
// 					  checkType: 'notnull',
// 					  checkRule: null,
// 					  errorMsg: '银行帐号',
// 					},
// 					{
// 					  name: 'address',
// 					  checkType: 'notnull',
// 					  checkRule: null,
// 					  errorMsg: '详情地址不能为空',
// 					},
// 			       
			      
			
			      ]
			      //进行表单检查
			      var formData = e.detail.value
			      console.debug('formData:' + JSON.stringify(formData))
				   var checkRes = graceChecker.check(formData, rule)
				  if (checkRes) {
						_self.onSave(formData);
				  }else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				  }
				 
					return checkRes;
				  },
				   formReset: function (e) {
				    console.log('清空数据')
				   
			},
			onSave:function(reqData){
				util.POST('user/invoice/add', reqData, function (data) {
							if(data.status==1){
								uni.showToast({
									title:'您的开票申请亿提交完成，会在2-3个工作日内审核完成，请耐心等待！',
									icon:'none',
								});
								
								//refresh ,reload lists
								_self.loadLists();
								
							}else{
								uni.showToast({
									title:data.content,
									icon:'none',
								})
							}
					
				});
			},
			loadLists:function(){
				var reqData = {
					user_id: _self.user.id
				}
				util.GET('user/invoice/lists', reqData, function (data) {
						if(data.status==1){
							
							_self.invoices = data;
						}else{
							uni.showToast({
								title:data.content,
								icon:'none',
							})
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
		},

	}
</script>

<style>


</style>
