<template>
	<view class="zhezhao" v-show="shixian">
		<view class="xuanzeqi">
			<view class="quxiaoqueren">
				<view class="quniu" @click="OnCancel">取消</view>
				<view class="queniu" @click="OnConfirm">确定</view>
			</view>
			<picker-view v-if="visible" class="shigun" :indicator-style="indicatorStyle" :value="value" @change="bindChange">					
				<picker-view-column>
					<view class="itemd" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="itemd" v-for="(item,index1) in months" :key="index1">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="itemd" v-for="(item,index2) in days" :key="index2">{{item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>	
	</view>
</template>

<script>
	export default {

		data() {
			const date = new Date()
				const years = []
				const year = date.getFullYear()
				const months = []
				const month = date.getMonth()
				const days = []
				const day = date.getDate()
				for (let i = 1990; i <= date.getFullYear()+1; i++) {
					years.push(i)
				}
				for (let i = 1; i <= 12; i++) {
					months.push(i)
				}
				for (let i = 1; i <= 31; i++) {
					days.push(i)
				}
			return {
				
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				value: [year -1990, month , day - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				shixian: false 
				
			};
		},
		  props: {
		    /* value */
		    DateValue: {
		        type: String,
		        default: ''
		    }
		},
		methods: {
			confirm(){ //call 
				this.shixian = true;
				//get the value and init ui;
				var val = this.DateValue;
				var d = new Date(Date.parse(val));
				//value
				this.year = d.getFullYear();
				this.month = d.getMonth()+1;
				this.day = d.getDate();
				
				//index
				this.value = [d.getFullYear()-1990, d.getMonth(), d.getDate()-1];
			},
			bindChange: function (e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
				console.log(this.year+'-'+this.month +"-"+this.day)
			},
			OnCancel () { //cancel
				this.shixian = false;
				this.$emit('OnCancel');
			},
			OnConfirm (bangding) { //confirm
				
				var bangding = this.year;
				
				+'-'+this.month+'-'+this.day;
				if(this.month<10){
					bangding += '-0'+this.month;
				}else{
					bangding += '-'+this.month;
				}
				
				if(this.day<10){
					bangding += '-0'+this.day;
				}else{
					bangding += '-'+this.day;
				}
				this.shixian = false;
				this.$emit('OnConfirm',bangding);

			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.zhezhao{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0upx;
		right: 0upx;
		bottom: 0upx;
		left: 0upx;
		-webkit-transition: 0.15s;
		background: rgba(0,0,0,.5);
		z-index: 10;
	}
	.xuanzeqi{
		width: 100%;	
		background-color: #FFF;
		height: 500upx;
		position: absolute;
		bottom: 0upx;
		left: 0upx;
		z-index: 20;
		display: block;
	}
	.quxiaoqueren{
		height: 80upx;
		width: 100%;
		display: block;
		border-bottom: 1px solid #D8D8D8;
		position: relative;
		top: 0upx;
		left: 0upx;
	}
	.quniu{
		width: 80upx;
		border-radius: 6upx;
		height:50upx;
		line-height: 50upx;
		text-align: center;
		color: #000;
		float: left;
		margin-left: 20upx;
		font-size: 30upx;
		display: block;
		margin-top: 15upx;
	}
	.queniu{
		width: 80upx;
		border-radius: 6upx;
		height:50upx;
		line-height: 50upx;
		background-color: #19B955;
		text-align: center;
		color: #FFF;
		float: right;
		display: block;
		font-size: 30upx;
		margin-right: 20upx;
		margin-top: 15upx;
	}
	.shigun{
		background-color: #FFF;
		width: 80%;
		display: block;
		height: 500upx;
		margin: 0 auto;
	}
	.itemd{
		text-align: center;
		justify-content: center;
	}
</style>