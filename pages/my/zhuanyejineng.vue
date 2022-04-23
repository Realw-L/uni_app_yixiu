<template>
	<view class="grace-margin">
		<view class="uni-list-cell" hover-class="uni-list-cell-hover">
			<view class="uni-triplex-row" style="display: flex; flex-direction: column;">
				<view class="uni-triplex-left" style="display: flex; flex-direction: row;"><text style="display: flex; flex-direction: row;">选择技能业务范围</text></view>
			</view>
		</view>
		<view class="grace-select-tags">
			<checkbox-group @change="graceSelectChange" name="tipName" style="display: flex; justify-content: space-between; ">
				<label v-for="(item, index) in graceSelectTips" :key="index" :class="[item.checked ? 'grace-checked' : '']" style="width: 150upx; text-align: center; ">
					<checkbox :value="item.value + ''" :checked="item.checked"></checkbox>
					{{ item.name }}
				</label>
			</checkbox-group>
		</view>
		<button type="primary" style="margin-top:30px; background-color: #00C456;" form-type="submit">提交</button>
	</view>
</template>
<script>
Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == val) return i;
	}
	return -1;
};
export default {
	data() {
		return {
			graceSelectTips: [
				{ name: '普工', value: '0', checked: true },
				{ name: '电工', value: '1', checked: false },
				{ name: '木工', value: '2', checked: false },
				{ name: '瓦工', value: '3', checked: false },
				{ name: '油漆工', value: '4', checked: false },
				{ name: '水工', value: '5', checked: false },
				{ name: '电焊工', value: '6', checked: false },
				{ name: '电器维修', value: '7', checked: false },
				{ name: '装修', value: '8', checked: false },
				{ name: '维修', value: '9', checked: false },
				{ name: '广告画', value: '10', checked: false },
				{ name: '拆除', value: '11', checked: false },
				{ name: '围挡', value: '12', checked: false },
				{ name: '安装', value: '13', checked: false },
				{ name: '高空', value: '14', checked: false }
			]
		};
	},
	onLoad: function() {},
	methods: {
		// 多选示例
		graceSelectChange: function(e) {
			var checkVal = e.detail.value;
			for (var i = 0; i < this.graceSelectTips.length; i++) {
				if (checkVal.indexOf(this.graceSelectTips[i].value) != -1) {
					this.graceSelectTips[i].checked = true;
				} else {
					this.graceSelectTips[i].checked = false;
				}
			}
			this.graceSelectTips = this.graceSelectTips;
		}
	}
};
</script>
<style></style>
