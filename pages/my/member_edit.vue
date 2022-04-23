<template>
	<view>
		
		<view class="grace-bg-white grace-padding grace-common-mt">
			<view class="grace-form">
				<form @submit="formSubmit">
					<view class="grace-items">
						<view class="grace-label">联系姓名</view>
						<input type="text" class="input" name="name" :value="data.name" maxlength="5"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">联系电话</view>
						<input type="text" class="input" name="mobile" :value="data.mobile"></input>
					</view>
					<view class="grace-items">
						<view class="grace-label">所在地区</view>
						<view @click="cityPicker1" class="picker">
							{{cityText1}}
							<text class="grace-iconfont icon-arrow-right"></text>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">详细地址</view>
						<input type="text" class="input" name="address" :value="data.address"></input>
					</view>
					<view style="padding:22upx 0;">
						<button formType="submit" type="primary" style="width:100%;">更新</button>
					</view>
				</form>
			</view>
			<view class="grace-more-bottom"><text class="grace-iconfont icon-remove" @tap="onRemove">删除联系人</text> </view>
		</view>
		<mpvue-city-picker 
			:themeColor="themeColor" ref="mpvueCityPicker1" 
			:pickerValueDefault="cityPickerValueDefault1" 
			@onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>

<script>
import mpvuePicker from '../../threeComponents/mpvuePicker.vue';
import mpvueCityPicker from '../../threeComponents/mpvueCityPicker.vue';
import util from '@/common/util.js';

var  graceChecker = require("../../graceUI/graceChecker.js");
var _self = null;
export default {
	components: {
		mpvuePicker,
		mpvueCityPicker
	},
	data() {
		return {
			themeColor: '#007AFF', //颜色
			cityText1 : "请选择", //文本
			cityPickerValueDefault1 : [0,0,1], //默认选项
			city1 : null, //客户选择城市后保存的城市数据
			id:0,
			data:{},
		};
	},
	onLoad : function(option){
		_self = this;
		
		if(option){
			this.id = option.id;
			this.loadDetail(this.id);
		}
		
	},
	methods:{
		loadDetail(id){
			util.GET('user/team_member/detail?id='+id, {}, function(data) {
				console.log('user/team_member/detail' + JSON.stringify(data));
				_self.data = data;
				//parse :
				var arr = data.area.split(',');
				_self.cityPickerValueDefault1 = [];
				for (var i = 0; i < arr.length; i++) {
					_self.cityPickerValueDefault1.push( parseInt(arr[i]));
				}
				 
				 
				 _self.onConfirm1();
			});
		},
		
		editData(req){
			util.POST('user/team_member/edit', req, function(data) {
				console.log('user/team_member/detail' + JSON.stringify(data));
				
				uni.showToast({
					title:'更新成功',
					icon:'none'
				});
				setTimeout(function(){
					uni.navigateTo({
						url:'/pages/my/team_member'
					})
				},2000);
				
			});
		},
		onRemove(){
			util.GET('user/team_member/delete?id='+this.id, {}, function(data) {
				console.log('user/team_member/detail' + JSON.stringify(data));
				
				uni.showToast({
					title:'删除成功',
					icon:'none'
				});
				setTimeout(function(){
					uni.navigateTo({
						url:'/pages/my/team_member'
					})
				},2000);
				
			});
		},
		// 表单提交
		formSubmit : function(e){
			if(this.city1 == null){
				uni.showToast({title:"请选择地区", icon:"none"});
				return false;
			}
			var rule = [
				{ name: "name", checkType: "string", checkRule: "1,10", errorMsg: "联系人应为1-20个字符" },
				{ name: "mobile", checkType: "phoneno", checkRule: "", errorMsg: "请正确填写手机号" },
				{ name: "address", checkType: "string", checkRule: "5,100", errorMsg: "请正确填写详细地址" }
			];
			var formData = e.detail.value;
			formData.city1 = _self.city1.cityCode; //此处以保存用户城市代码为例
			var checkRes = graceChecker.check(formData, rule);
			if(checkRes){
				//uni.showToast({title:"验证通过! 请观察控制台", icon:"none"});
				console.log(formData);
				
				//save 
				formData['id'] = this.data.id;
				formData['area'] = this.cityPickerValueDefault1.join(',');
				_self.editData(formData);
				
			}else{
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
		},
		cityPicker1 : function(){
			this.$refs.mpvueCityPicker1.show();
		},
		onConfirm1(e) {
			var cityText1  = e.label;
			var cityValue1 = e.value;
			var cityCode1  = e.cityCode;
			console.log(cityText1, cityValue1, cityCode1);
			this.cityText1 = cityText1;
			this.cityPickerValueDefault1 = cityValue1;
			this.city1 = e;
		},
	},
	
}
</script>

<style>
.picker{line-height:80upx;}
</style>
