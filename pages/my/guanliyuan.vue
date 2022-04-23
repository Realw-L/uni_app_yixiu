<template>
	<view>
		<view class="grace-list" style="background-color: #AAAAAA;  height: 200upx;">
			<view class="grace-list-items" style="padding-top: 20upx;">
				<view class="grace-list-image ucenter-face grace-relative" style="margin-left: 150upx;" @tap="goDetailPage('my/install')" >
					<image class="grace-list-image ucenter-face-image" src="https://graceui.oss-cn-beijing.aliyuncs.com/faces/1.png" mode="widthFix"></image>
				</view>
				<view class="grace-list-body">
					<view class="grace-list-title"><text class="grace-list-title-text">昵称：总公司</text></view>
					<view  class="grace-list-title">用户名：18665125686</view>
				</view>
			</view>
		</view>		
		<view class="grace-margin-top grace-text-center" @tap="goDetailPage('my/order')" >
			<view class="uni-header-logo" style=" margin-top: 0upx;height: 200upx; background-image: url('https://app.yidikj.com/Public/app/back1.jpg');">
				<view class="uni-flex" style="margin-top: 20upx; display: flex; justify-content: center; background-color: #FFFFFF; border-radius: 20upx;">
					<view  style="display: flex;flex-direction: row;">
						<view class="text" style="display: flex; flex-direction: column;margin-right: 20upx; ">						
							<text style="font-size: 50upx;">233/单</text>
								<text  style="font-size: 40upx;">成交订单数</text>
						</view>
						<view class="grace-border-r"></view>
						<view class="text" style="display: flex; flex-direction: column; margin-left: 20upx; ">
							<text style=" font-size: 50upx;">23366/元</text>
							<text style="font-size: 40upx;">订单总金额</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="display: flex; justify-content: center;">
			<view class="qiun-charts"  style="display: flex;justify-content: space-between;">
				<!--#ifdef MP-ALIPAY -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchColumn"></canvas>
				<!--#endif-->
				<!--#ifndef MP-ALIPAY -->
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
				<!--#endif-->
			</view>
		</view>
	</view>
	
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import  { isJSON } from '@/common/checker.js';
	var _self;
	var canvaColumn=null;
	export default {
		data() {
			return {
				HOST: this.$util.HOST,
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:''
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			goDetailPage(e) {
			    let path = e.url ? e.url : e;
			    let url = ~path.indexOf('platform') ? path : '/pages/' + path;
			    uni.navigateTo({
			        url: url
			    });
			    return false;
			},
			getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let Column={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories=res.data.data.ColumnB.categories;
						Column.series=res.data.data.ColumnB.series;
						_self.textarea = JSON.stringify(res.data.data.ColumnB);
						_self.showColumn("canvasColumn",Column);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
			showColumn(canvasId,chartData){
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					padding:[15,5,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:0,
					},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid:true,
					},
					yAxis: {
            data:[{
              position:'right',
							axisLine:false,
              format:(val)=>{return val.toFixed(0)+'元'},
            }]
					},
					dataLabel: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						column: {
							type:'group',
							width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
						}
					  }
				});
				
			},
			touchColumn(e){
				canvaColumn.showToolTip(e, {
					format: function (item, category) {
						if(typeof item.data === 'object'){
							return category + ' ' + item.name + ':' + item.data.value 
						}else{
							return category + ' ' + item.name + ':' + item.data 
						}
					}
				});
        canvaColumn.touchLegend(e,{animation:true});
			},
			changeData(){
				if(isJSON(_self.textarea)){
					let newdata=JSON.parse(_self.textarea);
					canvaColumn.updateData({
						series: newdata.series,
						categories: newdata.categories,
						animation:true
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						image:'../../../static/images/alert-warning.png'
					})
				}
			}
		}
	}
</script>

<style>
	
</style>
