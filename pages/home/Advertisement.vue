<template>
	<view class="uni-common-pb">
		<view class="uni-card">
			<view class="uni-list-cell-divider" hover-class="uni-list-cell-hover">
				<textarea placeholder="请输入您的店铺名称" maxlength="20" style="height: 30px;" />
			</view>
			<view class="uni-list-cell-divider uni-flex" hover-class="uni-list-cell-hover" style="justify-content: space-between; padding: 15px 10px;">
				<text style="color: #000000;">现场联系人：</text>
				<input type="text" name="username" placeholder="" style="font-size: 15px; padding: 5px; " maxlength="3" />

				<switch :checked="indicatorDots" @change="changeIndicatorDots" style="margin-left: -100px;" />
				<view class="uni-list-cell-db">先生</view>

				<view>
					<text style="margin-left: -40px;">+86</text>
					<uni-icon type="arrowright" size="20" style="margin-top: 7px; margin-left: 0px;"> </uni-icon>
				</view>
			</view>
			<view class="uni-list-cell-divider" hover-class="uni-list-cell-hover">
				<input type="text" name="username" placeholder="邮箱(非必填)" style="font-size: 15px; padding: 5px;" maxlength="16" />
			</view>
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right" @tap="chooseLocation">
					所在地区<text style="margin-right: 10px;">{{locationAddress}}</text>
				</view>
			</view>

			<view class="uni-list-cell-divider" hover-class="uni-list-cell-hover" style="font-size: 15px;  height: 50px;">
				<text>详细地址：</text>
				<textarea placeholder="如道路、门牌号、小区、楼栋号、单元室等" maxlength="25" />
				</view>	
		</view>
		<view style="margin-top: 2px;" class="uni-card">
			<view class="uni-list-cell-divider" hover-class="uni-list-cell-hover" style="font-size: 15px; justify-content: center;">
				<text style="color: #000000;">项目周期</text>
			</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
				<view class="uni-list-cell-navigate uni-navigate-right">
					施工时间<text style="margin-right: 10px;"></text>
				</view>
			</view>
		<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="showSinglePickerh">
				<view class="uni-list-cell-navigate uni-navigate-right"  >
					施工高度<text style="margin-right: 10px;"></text>
				</view>		
			</view>
			<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirmhight" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
			
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			@onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
			
			<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<view class="uni-list-cell-navigate uni-navigate-right">
					<view class=" uni-flex uni-column">
						<text>施工参考图</text>
						<text style="color: #BBBBBB; font-size: 10px;">故障图、施工图、验收单、等</text>
					</view>	
						<text style="margin-right: 10px;"></text>
					</view>		
				</view>			
		</view>
		<view style="margin-top: 2px;" class="uni-card">
			<view class="uni-list-cell-divider" hover-class="uni-list-cell-hover" style="font-size: 15px;">
				<text>对师傅接单的要求</text>
			</view>
			<view class="uni-grid-9">
						<view class="uni-grid-9-item menu_item" hover-class="uni-grid-9-item-hover" style="height: 150upx; " >
							<label class="checkbox" >
								<checkbox value="cd" />电工证
							</label>
						</view>
						<view class="uni-grid-9-item menu_item" hover-class="uni-grid-9-item-hover" style="height: 150upx; " >
							<label class="checkbox" >
								<checkbox value="cd"/>施工证
							</label>
						</view>
						<view class="uni-grid-9-item menu_item" hover-class="uni-grid-9-item-hover" style="height: 150upx; " >
							<label class="checkbox">
								<checkbox value="cd" />高空证
							</label>
						</view>
						<view class="uni-grid-9-item menu_item" hover-class="uni-grid-9-item-hover" style="height: 150upx; " >
							<label class="checkbox">
								<checkbox value="cd"/>电焊工证
							</label>
						</view>
						<view class="uni-grid-9-item menu_item" hover-class="uni-grid-9-item-hover" style="height: 150upx; " >
							<label class="checkbox">
								<checkbox value="cd" />保险
							</label>
						</view>
						<view class="uni-grid-9-item menu_item" hover-class="uni-grid-9-item-hover" style="height: 150upx; " >
							<label class="checkbox">
								<checkbox value="cd" />品牌式验收单
							</label>
						</view>
						<view class="uni-grid-9-item menu_item" hover-class="uni-grid-9-item-hover" style="height: 150upx; " >
							<label class="checkbox">
								<checkbox value="cd"/>异修验收单
							</label>
						</view>
					</view>
			<view class="uni-list-cell-divider" hover-class="uni-list-cell-hover" style="font-size: 15px;  height: 150px;">
				<textarea placeholder="施工内容(描述注意事项或细节)" />
				</view>		
		</view>
		
			<view style="margin-top: 20px;" class="uni-card">
		<button type="primary" style="background-color: #09BB07;width: 30%;">创建订单</button>
		</view>
	</view>
</template>

<script>
	// https://github.com/zhetengbiji/mpvue-picker
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	// https://github.com/zhetengbiji/mpvue-citypicker
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import cityData from '@/common/city.data.js';
	import uniIcon from "@/components/uni-icon.vue"
	var util = require('../../common/util.js');
	
	var formatLocation = util.formatLocation;
	export default {
		components: {uniIcon},

		data() {
			return {
				title: 'chooseLocation',
				hasLocation: false,
				location: {},
				locationAddress: '',
				
			}
			
		},
		methods: {
			chooseLocation: function () {
				uni.chooseLocation({
					success: (res) => {
						this.hasLocation = true,
							this.location = formatLocation(res.longitude, res.latitude),
							this.locationAddress = res.address
					}
				})
			},
			clear: function () {
				this.hasLocation = false
			}
		},
		
	components: {
		mpvuePicker,
		mpvueCityPicker
	},
	data() {
		return {
			pickerSingleArray: [{
					label: '小于1米',
					value: 1
				},
				{
					label: '小于3米',
					value: 2
				},
				{
					label: '小于5米',
					value: 3
				},
				{
					label: '小于10米',
					value: 4
				}
			],
			mulLinkageTwoPicker: cityData,
			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			height: '',
			mode: '',
			deepLength: 1,
			pickerValueDefault: [0],
			pickerValueArray:[]
		};
	},
	methods: {
		onCancel(e) {
			console.log(e)
		},
		// 单列
		showSinglePickerh() {
			this.pickerValueArray = this.pickerSingleArray
			this.mode = 'selector'
			this.deepLength = 1
			this.pickerValueDefault = [0]
			this.$refs.mpvuePicker.show()
		},
		onConfirm(e) {
			this.pickerText = JSON.stringify(e)
		},
// 		onConfirmhight(e){
// 			this.pickerText = e['lable'];
// 				// this.pickerText = JSON.stringify(e)
// 		}
	},
	onBackPress() {
		if (this.$refs.mpvuePicker.showPicker) {
			this.$refs.mpvuePicker.pickerCancel();
			return true;
		}
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
			return true;
		}
	},
	onUnload() {
		if (this.$refs.mpvuePicker.showPicker) {
			this.$refs.mpvuePicker.pickerCancel()
		}
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel()
		}
	}
	}
	
</script>

<style>


</style>
