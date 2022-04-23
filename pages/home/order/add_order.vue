<template>
	<view class="page">
			<form @submit="formSubmit" @reset="formReset">
		<view class="grace-body">
			<view style="text-align: center;">{{title}}</view>
			<view>
				<view>下单模式相关条款</view>
				<view>1.1</view>
				<view>* 一口价模式</view>
				<view>
					该模式下单由用户跟师傅直接沟通对接，师傅用户双方如在交易过程中发生任何纠纷，一切纠纷均由双方自己沟通解决。（8小时后如果没有师傅接单，则需要用户提高价格重新下单或者下托管单，这样会有客服联系你。）
				</view>
				<view>* 月结模式</view>
				<view>该模式下单具体事宜联系客服；签订合同。（月结条件：为一线品牌；每月提供20单以上）</view>
				<view>* 托管模式</view>
			</view>
		</view>
		<view class="btn" @click="modalShow = true" style="margin-left: 25upx; background-color: #00C456;">我知道了</view>
		<view class="mask" v-if="modalShow" @click.stop="modalShow = false"></view>
		<view class="modal" v-if="modalShow">
			<view class="infoView">
				<image class="cover" :src="service_item.icon" mode=""></image>
				<view class="infoRight">
					<view class="infoRightBottom">
						<view class="stock" style="color: red; font-size: 45upx; margin-top: 50upx;">¥ {{ price }}</view>
					</view>
					<view class="stock">请选择规格</view>
				</view>
			</view>
			<view>
				<view v-for="(item, index) in service_item.service_attr?service_item.service_attr.data:[]">
					<view style="color: #AAAAAA;">{{ item.name }}</view>
					<view class="grace-form-body"><graceSelectTags :items="item.child" :key="index" :data-row="index" type="radio" @change="change1($event,index)"></graceSelectTags></view>
				</view>

			</view>
			<form @submit="formSubmit" class="grace-form">
				<view class="grace-form-item grace-border-b" style="display: flex; justify-content:space-around;">
					<view><text class="grace-form-label">数量</text></view>
					<view style="margin-left: 350upx;" class="grace-form-body"><graceNumberBox name="number"  @change="changeNumber"></graceNumberBox></view>
				</view>
			</form>

			<view class="grace-form-item grace-border-b">
				<text class="grace-form-label">施工时间</text>
				<view class="grace-form-body grace-nowrap grace-flex-end">
					<view class="grace-margin-top">
						<graceDateTime @confirm="confirm2" :value="demo4Val" :isTime="false">
							<text class="demo grace-border-radius">{{ demo4Val }}</text>
						</graceDateTime>
					</view>
				</view>
			</view>
			<view class="grace-list" @tap="goDetailPage('home/order/address')">
				<view class="grace-list-items">
					<view class="grace-list-body">
						<view class="grace-list-title" style="color: #AAAAAA;">
							<text class="grace-list-title-text" style="color: #AAAAAA;">下单人：{{address.contact}}</text>
							<text>{{address.contact_mobile}}</text>
							<text>{{address.city}}</text>
						</view>
						<view class="grace-list-body-desc">{{address.address}}{{address.room}}</view>
					</view>
					<text class="grace-list-arrow-right grace-icons icon-arrow-right"></text>
				</view>
			</view>
			<view class="skuView" v-for="(item, index) in skuArr" :key="index">
				<view class="skuName">{{ item.name }}</view>
				<view class="skuItemview">
					<view
						class="skuItem"
						v-for="(item2, index2) in item.values"
						@click="chooseSku(index, index2, item2.disabled)"
						:class="[item2.checked && !item2.disabled ? 'active' : '', item2.disabled ? 'disabled' : '']"
						:key="index2"
					>
						{{ item2.value }}
					</view>
				</view>
			</view>

			<view>
				<view style="color: #AAAAAA;">特色服务</view>
				<view class="grace-form-body"><graceSelectTags :items="append_items" type="checkbox" @change="changeAppendItems"></graceSelectTags></view>
			</view>
			<view class="infoView" style="margin-top: -20upx;" v-for="(item,index) in append_items_sel">
				<image class="cover" :src="item.cover" style="height: 150upx; width: 150upx;" mode=""></image>
				<view class="infoRight" >
					<view class="infoRightBottom"><view class="stock" style="margin-top: 20upx;"> {{item.comment}}</view></view>
					<view class="stock">{{item.desc}}</view>
				</view>
				<view style="color: red; width:200upx; font-size: 30upx;">￥：{{item.price}}</view>
			</view>
			<view style="text-align: right; font-size: 35upx; margin-top: -10upx;">
				<text>共1个订单</text>
				<text style="margin-left: 10upx;">共计：</text>
				<text style="color: red; ">￥{{append_total_price}}</text>
			</view>
			<view style="text-align: left; font-size: 35upx;">
				<text>需付：</text>
				<text style="color: red; font-weight: 550;">￥{{total_price}}</text>
			</view>
			<view style="display: flex; flex-direction: row; ">
				<view>
					<view style="width: 500upx; margin-top: 25upx;">
						<graceCheckBtn :checked="val" :parameter="[1, 2, 3]" @change="checkedChange" :size="46"><text class="grace-text">同意阅读相关服务说明</text></graceCheckBtn>
					</view>
				</view>
				<view class="btn" style="width: 200upx; background-color: #00BA62;" @click="onOrderAdd">立即支付</view>
		
			</view>
		</view>
		</form>
	</view>
</template>

<script>
import util from '../../../utils/index.js';
import graceCheckBtn from '@/graceUI/components/graceCheckBtn.vue';
import gracePage from '@/graceUI/components/gracePage.vue';
import graceSelectTags from '@/graceUI/components/graceSelectTags.vue';
import graceSegmentedControl from '@/graceUI/components/graceSegmentedControl.vue';
import graceNumberBox from '@/graceUI/components/graceNumberBox.vue';
import graceDateTime from '@/graceUI/components/graceDateTime.vue';
var self = null;
export default {
	data() {
		return {
			service_id:0,
			service_item: {},
			selIndex: [],
			title:'下单协议',
			append_items:[],
			selAppendItems:[],
			append_items_sel:[],
			address:{},
			append_total_price:0,
			total_price:0,
			number:0,
			sel_attr_id:-1,
			sel_append_items_ids: '',
			
			demo4Val: '请选择具体日期',
			val: true,
			demo1Val: 0, // 用于保存选中值、参与表单提交
			demo1: [{ name: '龙骨', value: '0', checked: true }, { name: '木板', value: '1', checked: false }, { name: '其他', value: '2', checked: false }],
			demo2Val: 0, // 用于保存选中值、参与表单提交
			demo2: [
				{ name: '直径140mm或189mm', value: '0', checked: true },
				{ name: '直径150mm或200mm', value: '1', checked: false },
				{ name: '直径140mm或189mm', value: '2', checked: false },
				{ name: '直径150mm或200mm', value: '3', checked: false }
			],
			demo3: [{ name: '垃圾清运', value: '0', checked: true }, { name: '围挡拆除', value: '1', checked: false }, { name: '....', value: '2', checked: false }],
			skuArr: [],
			specArr: [],
			chooseSkuObj: {},
			choosesSkuArr: [],
			stock: 0,
			price: 0,
			modalShow: false,
			demoVal: 3
		};
	},
	components: {
		gracePage,
		graceSelectTags,
		graceSegmentedControl,
		graceNumberBox,
		graceCheckBtn,
		graceDateTime
	},
	onLoad: function(option) {
		self = this;
		if(option)
		{
			this.service_id = option.service_id;
		}

		self.loadItem(this.service_id);
	},
	onShow() {
		uni.$once('pick_address', function(option){
			console.log('pick address:', option)
			self.address = option
		})
		
	},
	onUnload() {
		uni.$off('pick_address')
	},
	methods: {
		onOrderAdd: function(formData){

			//check data
			
			this.disable_order = true;
			var orderObj = new Object();
			//build order object
			orderObj.service_type = 0; //standard order
			orderObj.service_id = this.service_id;
			// orderObj.address_id=1; // auto crated
			
			orderObj.area = 1;
			
			orderObj.coupon_id = 0;
			orderObj.comment = this.comment;
			orderObj.staff_id = 0;
			orderObj.shop_name = this.shopName;
			// orderObj.address = this.locationAddress;  //change to
			orderObj.address = this.address.city;
			orderObj.address_detail = this.address.address + this.address.room;
			//orderObj.address_detail = formData.address_detail;
			
			orderObj.contact = this.address.contact;
			orderObj.mobile = this.address.contact_mobile;
			orderObj.email = this.email;
			// orderObj.order_condition = this.condition.join(',')
			orderObj.order_condition = this.condition;
			var loc = uni.getStorageSync('location');
			var locArr = loc.split(',');
			orderObj.longitude = locArr[0];
			orderObj.latitude = locArr[1];
			// send params, user local storage
			
			// formData.address = this.locationAddress;
			formData.address = this.address.address + this.address.room;
			formData.service_type = 0; //standard
			formData.service_id = this.service_id;
			formData.longitude = locArr[0];
			formData.latitude = locArr[1];
			formData.city = this.address.city; //uni.getStorageSync('city');
			formData.work_refer = this.work_refer;
			formData.work_verify = this.work_verify;
			
			console.debug('order obj:' , orderObj);
			console.debug('order form data:' , formData);
			
			var self = this;
			this.$util.POST(
				'order/add_standard',
				formData,
				function(data) {
					self.disable_order = false;
					if (data && data.order_no) {
						uni.showModal({
							title: '下单成功通知',
							content: '您已成功下单，订单编号:' + data.order_no,
							showCancel: false,
							confirmText: '确定'
						});
			
						//clear refer
						uni.setStorageSync('work_refer', '');
						uni.setStorageSync('work_verify', '');
						uni.setStorageSync('location', '');
						uni.setStorageSync('locationAddress', '');
						uni.setStorageSync('picked_city', '');
			
						setTimeout(function() {
							if (formData.type == 0) {
								//一口价才需要支付
			
								uni.navigateTo({
									url: '/pages/home/order/pay?order_no=' + data.order_no
								});
							} else {
								uni.navigateTo({
									url: '/pages/my/order_index?status=1'
								});
							}
						}, 1500);
					} else {
						uni.showModal({
							title: '下单失败',
							content: '下单失败，请注意检查填写内容是否规范。',
							showCancel: false,
							confirmText: '确定'
						});
					}
				} //end fun
			);
			this.disable_order = false;
			//go to next page
		},
		formSubmit: function(e) {
			//将下列代码加入到对应的检查位置
			//定义表单规则
			var rule = [
				{
					name: 'mobile',
					checkType: 'phoneno',
					checkRule: '',
					errorMsg: '请输入正确的手机号码'
				},
				//         {
				//           name: 'shop_name',
				//           checkType: 'string',
				//           checkRule: '3,30',
				//           errorMsg: '店铺应为3-30个字符',
				//         },
				{
					name: 'contact',
					checkType: 'string',
					checkRule: '1,5',
					errorMsg: '联系人应为1-5个字符'
				},
				// 				{
				// 					name: 'email',
				// 					checkType: 'string',
				// 					checkRule: '',
				// 					errorMsg: '请输入正确邮箱格式'
				// 				},
		
				{
					name: 'address_detail',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '详情地址不能为空'
				},
				// {
				// 	name: 'type',
				// 	checkType: 'notnull',
				// 	checkRule: '',
				// 	errorMsg: '订单类型不能为空'
				// },
				{
					name: 'number',
					checkType: 'int',
					checkRule: '1,3',
					errorMsg: '数量需大于零'
				},
				{
					name: 'sel_attr_id',
					checkType: 'int',
					checkRule: '1,999999',
					errorMsg: '请选择规格'
				},
				{
					name: 'start_time',
					checkType: 'notnull',
					checkRule: '',
					errorMsg: '开始时间不能为空'
				},
				// {
				// 	name: 'end_time',
				// 	checkType: 'notnull',
				// 	checkRule: '',
				// 	errorMsg: '结束时间不能为空'
				// }
			];
			//进行表单检查
		    var formData = e.detail.value;
			console.debug('formData:' ,formData);
			
			formData.address = this.address.address + this.address.room;
			formData.service_type = 0; //standard
			formData.service_id = this.service_id;
			formData.sel_append_items_ids = this.sel_append_items_ids; //append item
			formData.sel_attr_id = this.sel_attr_id; //attr
		
			var checkRes = graceChecker.check(formData, rule);
			if (checkRes) {
				//check mail
				console.debug(formData.email);
				if (formData.email && formData.email.length > 0) {
					//var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
					var mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
					if (!mailReg.test(formData.email)) {
						uni.showToast({ title: '邮箱格式错误!!', icon: 'none' });
						return;
					}
				}
		
				// var today = new Date();
				// today.setFullYear(today.getYear(), today.getMonth(), today.getDay());
				// if (to < from) {
				// 	uni.showToast({
				// 		title: '结束日期不能小于开始日期！'
				// 	});
				// 	return;
				// }
				// if (to < today.getTime()) {
				// 	uni.showToast({
				// 		title: '结束日期不能小于今天日期！'
				// 	});
				// 	return;
				// }
		
				this.onOrderAdd(formData);
				// uni.showToast({title:"验证通过!", icon:"none"});
			} else {
				uni.showToast({ title: graceChecker.error, icon: 'none' });
			}
		},
		formReset: function(e) {
			console.log('清空数据');
			this.chosen = '';
		},
		
		loadItem: function(_id) {
			uni.request({
				url: this.$util.API_URI2,
				method: 'GET',
				data: {
					query:
						'{item:service_detail(id:' +
						_id +
						'){\
							id\
							name\
							icon\
							service_attr{\
							count\
							data{\
							   id\
							   name\
							   options\
							}\
						   }\
							service_attr_value{\
							count\
							data{\
							   id\
							   attrs\
							   values\
							   price\
							}\
						   }\
							}\
							page_service_item{\
												count\
												data{\
												id\
												name\
												unit\
												price\
												desc\
												comment\
												cover\
											}\
							}\
							 }'
				},
				success: function(ret) {
					console.log(ret);
					
					self.service_item = ret.data.data.item;
					self.title = self.service_item.name;
					
					self.append_items = ret.data.data.page_service_item.data;
					self.getImages(self.service_item.icon)
					
					//trans att's value to array, attr_value's values to array
					for (var i = 0; i < self.service_item.service_attr.data.length; i++) {
						self.service_item.service_attr.data[i].options = self.service_item.service_attr.data[i].options.split(',');
						var items = [];
						for (var j = 0; j < self.service_item.service_attr.data[i].options.length; j++) {
						     items.push( { name: self.service_item.service_attr.data[i].options[j], value: j, checked: false });
						}
						self.service_item.service_attr.data[i].child = items
					}

					for (var i = 0; i < self.service_item.service_attr_value.data.length; i++) {
						self.service_item.service_attr_value.data[i].values = self.service_item.service_attr_value.data[i].values.split(',');
						var items = [];
						for (var j = 0; j < self.service_item.service_attr_value.data[i].values.length; j++) {
							items.push( { name: self.service_item.service_attr_value.data[i].name, value: j, checked: false });
						}
						
						self.service_item.service_attr_value.data[i].child = items
					}
					
					var append_cover_imgs = []
					for (var i = 0; i < self.append_items.length; i++) {
						self.append_items[i].value = i
						self.append_items[i].checked = false
						append_cover_imgs.push(self.append_items[i].cover)
					}
							
					self.getAppendItemsImages(append_cover_imgs.join(','))	
					console.log('service_item:', self.service_item);
				},
				fail: ret => {
					console.log('////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');
					console.log(ret);
				}
			});
		},

		getImages: function(ids) {
			this.$util.GET('sys/images?ids=' + ids, {}, function(data) {
				console.info(data);
				if (data.status == 1) {
					for (var i = 0; i < data.content.length; i++) {
						data.content[i] = self.$util.IMAGE_URI + data.content[i];
					}
					if(data.content.length>0)
						self.service_item.icon = data.content[0]
					
					console.log('get image of service_item', self.service_item);
				} else {
				}
			});
		},
		getAppendItemsImages: function(ids) {
			this.$util.GET('sys/images?ids=' + ids, {}, function(data) {
				console.info(data);
				if (data.status == 1) {
					for (var i = 0; i < data.content.length; i++) {
						data.content[i] = self.$util.IMAGE_URI + data.content[i];
					}
					
					for (var i = 0; i < self.append_items.length; i++) {
					
						self.append_items[i].cover = data.content[i]
						
					}
					
				
					
					console.log('get image of append_items', self.append_items);
				} else {
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
			
		confirm2: function(res) {
			this.demo4Val = res[0] + '-' + res[1] + '-' + res[2];
		},
		checkedChange: function(e) {
			console.log(e);
			this.val = e[0];
		},
		change: function(e) {
			console.log(e);
			uni.showToast({
				title: '值 : ' + e[0] + ' index : ' + e[1],
				icon: 'none'
			});
		},
		
		changeNumber:function(val){
			console.log('number:',val)
			this.number = val[0]
			this.total_price = this.append_total_price + self.price * self.number
		},
			
		change1: function(rowIndex, index) {
			console.log(rowIndex, index)
			self.selIndex = [rowIndex, index];
			self.title = self.service_item.name;
			self.price = self.service_item.service_attr_value.data[( rowIndex+1)*(index+1) -1].price;
			self.sel_attr_id = self.service_item.service_attr_value.data[( rowIndex+1)*(index+1) -1].id
			this.total_price = this.append_total_price + self.price * self.number
			
			this.demo1Val = index;
		},
		changeAppendItems: function(val) {
			this.selAppendItems = val

			this.append_items_sel = []
			this.append_total_price = 0;
			var sel = []
			for (var i = 0; i < val.length; i++) {
				this.append_items_sel.push( this.append_items[val[i]])
				sel.push(this.append_items[val[i]].id)
				this.append_total_price+= this.append_items[val[i]].price
				
			}
			this.sel_append_items_ids = sel.join(',');
			this.total_price = this.append_total_price + this.price*self.number;
			
		},
		formSubmit: function(e) {
			console.log('单选值 : ', this.demo1Val);
			console.log('多选值 : ', this.demo2Val);
		},
		changeStatus: function(index) {
			// 全选
			if (index == 1) {
				this.$refs.graceSelectTags2.selectAll();
			}
			// 全不选
			else if (index == 2) {
				this.$refs.graceSelectTags2.clearSelected();
			}
			// 设置默认值
			else {
				this.demo2 = [
					{ name: '专人配送', value: '0', checked: true },
					{ name: '精品品牌', value: '1', checked: false },
					{ name: '超值优惠', value: '2', checked: false },
					{ name: '门店自提', value: '3', checked: true },
					{ name: '三小时到', value: '4', checked: false }
				];
			}
		},

		// 点击规格按钮
		chooseSku(currentIndex, currentIndex2, isDiabled) {
			if (isDiabled) return;
			this.chooseSkuObj[currentIndex] = currentIndex2;
			this.choosesSkuArr[currentIndex] = currentIndex2;
			// 重制按钮
			this.skuArr.forEach((m, n) => {
				m.values.forEach((j, k) => {
					if (currentIndex == n) {
						j.checked = false;
					}
					j.disabled = false;
				});
			});
			// this.skuArr[currentIndex].values.forEach(item=>{
			// 	item.disabled = false;
			// 	item.checked = false;
			// })
			this.skuArr[currentIndex].values[currentIndex2].checked = true;
			let stock = 0,
				priceArr = [],
				emptyStockSku = [];
			this.specArr.forEach((item, index) => {
				if (util.isObjEqual(Object.assign({}, item.spec_index_obj, this.chooseSkuObj), Object.assign({}, item.spec_index_obj))) {
					if (item.stock <= 0 && this.choosesSkuArr.length == this.skuArr.length - 1) {
						emptyStockSku.push(item.spec_index_obj);
					}
					stock += Number(item.stock);
					priceArr.push(item.price);
				}
			});
			emptyStockSku.length &&
				emptyStockSku.map(item => {
					for (var k in item) {
						if (!this.chooseSkuObj.hasOwnProperty(k)) {
							console.log(k, item[k]);
							console.log('=====');
							this.skuArr[k].values[item[k]].disabled = true;
						}
					}
				});
			console.log(this.skuArr);

			this.stock = stock;
			if (priceArr.length == 1) {
				this.price = priceArr[0];
			} else {
				this.price = `${Math.min(...priceArr)}-${Math.max(...priceArr)}`;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f7f7f7;
	font-size: 28upx;
}
.page {
	.mask {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
	}
	.btn {
		width: 690upx;
		height: 90upx;
		background-color: #409eff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 10upx;
		color: white;
	}
	.modal {
		width: 100%;
		height: auto;
		max-height: 100vh;
		overflow-y: scroll;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 30upx;
		box-sizing: border-box;
		background-color: white;
		z-index: 20;
		.infoView {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: auto;
			border-bottom: 1rpx solid #dddddd;
			padding-bottom: 30upx;
			box-sizing: border-box;
			.cover {
				width: 200upx;
				height: 200upx;
				margin-right: 20upx;
			}
			.infoRight {
				flex: 1 auto;
				height: 200upx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				.name {
					font-weight: bold;
					font-size: 32upx;
				}
				.stock {
					color: #666;
				}
				.infoRightBottom {
					display: flex;
					align-items: center;
					justify-content: space-between;
					.numberControl {
						display: flex;
						align-items: center;
						.reduce,
						.add {
							width: 60upx;
							height: 45upx;
							background-color: #007aff;
							text-align: center;
							line-height: 45upx;
							font-size: 30upx;
							color: white;
							border-radius: 10upx;
						}
						.num {
							padding: 0 15upx;
						}
					}
				}
			}
		}
		.skuView {
			width: 100%;
			height: auto;
			padding: 30upx 0;
			box-sizing: border-box;
			&:last-of-type {
				margin-bottom: 0;
			}
			.skuName {
				font-size: 30upx;
				line-height: 60upx;
			}
			.skuItemview {
				display: flex;
				flex-wrap: wrap;
				margin-top: 10upx;
				.skuItem {
					width: auto;
					height: 50upx;
					padding: 0 20upx;
					margin-right: 20upx;
					display: inline-flex;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1px solid #dcdfe6;
					border-radius: 20upx;
				}
				.active {
					background-color: #409eff;
					color: white;
				}
				.disabled {
					background-color: #f5f5f5;
					color: #ccc;
				}
			}
		}
	}
}
</style>
