<template>
	<gracePage headerBG="#FFFFFF" :customHeader="false">
		<view slot="gBody" class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-form-item grace-border-b">
					<text class="grace-form-label">您的姓名</text>
					<view class="grace-form-body">
						<input type="text" class="grace-form-input" name="name" placeholder="请填写联系姓名" :value="address.contact"></input>
					</view>
				</view>
				<view class="grace-form-item grace-border-b">
					<text class="grace-form-label">联系电话</text>
					<view class="grace-form-body">
						<input type="number" class="grace-form-input" name="phoneno" placeholder="请填写联系电话" :value="address.contact_mobile"></input>
					</view>
				</view>
				<view class="grace-form-item grace-border-b">
					<text class="grace-form-label">所在地区</text>
					<view class="grace-form-body" @tap="openPicker">
						<input type="text" class="grace-form-input" name="area" :value="area" disabled placeholder="请选择所在地区"></input>
					</view>
				</view>
				<view class="grace-form-item">
					<text class="grace-form-label">详细地址</text>
					<view class="grace-form-body">
						<input type="text" class="grace-form-input" name="address" :value="address.address" placeholder="请填写详细地址"></input>
					</view>
				</view>
				<view style="padding:30rpx 0;">
					<button formType="submit" type="primary" class="grace-button grace-border-radius">提交</button>
				</view>
				<graceAddressPicker :show="graceAddressPickerShow" @confirm="pickerConfirm" @close="closePicker" cancelTColor="关闭"></graceAddressPicker>
			</form>
		</view>
	</gracePage>
</template>
<script>
import gracePage from "@/graceUI/components/gracePage.vue";
import graceAddressPicker from '@/graceUI/components/graceAddressPicker.vue';
var  graceChecker = require("@/graceUI/jsTools/graceChecker.js");

var self = null;
export default {
	components:{gracePage, graceAddressPicker},
    data() {
    	return {
			id:-1,
			address:{},
			graceAddressPickerShow : false,
			area:'', //city
			areaIndex:[]
			
		};
    },
	onLoad(options) {
		console.log(options)
		self = this;
		if(options && options.id)
		{
			var id = options.id;
			this.loadDetail(id)
			this.id = id;
		}
	},
	onNavigationBarButtonTap(e) {
		this.addMoment();
	},
	methods:{
		openPicker : function () {
			this.graceAddressPickerShow = true;
		},
		pickerConfirm : function(e){
			console.log('picker confirm:', e);
			this.area = e.names[0]+' '+e.names[1]+' '+e.names[2];
			this.areaIndex = e.indexs;
			this.area = e.names.join('/')
			this.closePicker();
		},
		closePicker : function () {
			this.graceAddressPickerShow = false;
		},
		// 表单提交
		formSubmit : function(e){
			var rule = [
				{ name: "name", checkType: "string", checkRule: "1,10", errorMsg: "联系人应为1-20个字符" },
				{ name: "phoneno", checkType: "phoneno", checkRule: "", errorMsg: "请正确填写手机号" },
				{ name: "area", checkType: "string", checkRule: "1,100", errorMsg: "请选择所在地区" },
				{ name: "address", checkType: "string", checkRule: "5,100", errorMsg: "请正确填写详细地址" }
			];
			var formData = e.detail.value;
			var checkRes = graceChecker.check(formData, rule);
			if(checkRes){
				uni.showToast({title:"验证通过! 请观察控制台", icon:"none"});
				console.log(formData);
				self.saveAddress(self.id, self.areaIndex.join(','), self.area, formData.name, formData.phoneno,formData.address);
				
			}else{
				uni.showToast({ title: graceChecker.error, icon: "none" });
			}
		},
		loadDetail:function(_id){
			uni.request({
				url: this.$util.API_URI2,
				method: 'GET',
				data: {
					query:
						'{content:user_address(id:'+_id+'){ \
							   id\
							   address\
							   city\
							   city_index\
							   room\
							   contact\
							   contact_mobile\
						   }\
						}'
				},
				success: function(ret) {
					console.log(ret);
					
					
					self.address =  ret.data.data.content;
					self.area = self.address.city;
					console.log('address:', self.address);
				},
				fail: ret => {
					console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
					console.log(ret);
				}
			});
		},
		saveAddress: function(id, city_index, city, contact,contact_mobile, address) {
					uni.request({
						url: this.$util.API_URI2,
						method: 'GET',
						data: {
							query:
								'mutation{\
		 update_user_address(id:'+id+',city_index:"'+city_index+'", city:"'+city+'", address:"'+address+'", contact:"'+contact+'", contact_mobile:"'+contact_mobile+'"){\
		   id\
		   msg\
		   eff\
			}\
		}'
						},
						success: function(ret) {
							console.log(ret);
							
							uni.showToast({ title: '保存成功', icon: "none" });
		
						},
						fail: ret => {
							console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
							console.log(ret);
						}
					});
				},
				
				
	}
	
}
</script>
<style>
</style>