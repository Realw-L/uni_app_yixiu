<template>
	<view>
		<view class="grace-list-items">
			<view class="grace-list-body grace-border-b">
				<view class="grace-list-title"><text class="grace-list-title-text">公司介绍：</text></view>
				<view><textarea value="" placeholder="" style="border: solid 1px; height: 150upx;" /></view>
			</view>
		</view>
		<view style="display: flex; flex-direction: row;">
			<view>
				<text>营业执照</text>
		<view class="grace-img-card-item">
			<view class="grace-img-card-img">
				<image src="https://graceui.oss-cn-beijing.aliyuncs.com/demoimgs/2.png" :src="idCard1"  @tap="selectImg1" mode="widthFix" class="grace-img-card-img"></image>
				<text class="grace-img-card-bgTitle">上传营业执照</text>
			</view>
		</view>
		</view>
		<view>
			<text>资质荣誉</text>
		<view class="grace-img-card-item" style="margin-left: 50upx;">
			<view class="grace-img-card-img">
				<image src="https://graceui.oss-cn-beijing.aliyuncs.com/demoimgs/2.png" :src="idCard2"  @tap="selectImg2" mode="widthFix" class="grace-img-card-img"></image>
				<text class="grace-img-card-bgTitle">上传资质荣誉</text>
			</view>
		</view>	
		</view>
		</view>
		<view>
			<text>公司宣传视频</text>
	<view class="grace-img-card-item">
		<view class="grace-img-card-img">
			<image src="../../static/img/11.png":src="idCard3"  @tap="selectImg3" mode="widthFix" class="grace-img-card-img"></image>
			<text class="grace-img-card-bgTitle">上传视频</text>
		</view>
	</view>
	</view>
					<text>最近案例</text>
	<view style="display: flex; flex-direction: row;">			
			<view>
		<view class="grace-img-card-item">
			<view class="grace-img-card-img">
				<image src="../../static/shili.png" mode="widthFix" class="grace-img-card-img"></image>
			</view>
		</view>
		</view>
		<view>
		<view class="grace-img-card-item" style="margin-left: 50upx;">
			<view class="grace-img-card-img">
				<image src="https://graceui.oss-cn-beijing.aliyuncs.com/demoimgs/2.png" :src="idCard4"  @tap="selectImg4" mode="widthFix" class="grace-img-card-img"></image>
				<text class="grace-img-card-bgTitle">上传案例</text>
			</view>
		</view>	
		</view>
		</view>
	<view class="grace-list-items">
		<view class="grace-list-body grace-border-b">
			<view class="grace-list-title"><text class="grace-list-title-text">案例介绍：</text></view>
			<view><textarea value=""  placeholder="如:户型面积,装修风格,装修报价,案例介绍" style="border: solid 1px; height: 250upx;" /></view>
		</view>
	</view>
	
	<view style="display: flex; flex-direction: row; margin-top: 50upx;" >
		<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;" @tap.stop="tap">完成</button>
	</view>
	</view>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
	    data() {
	    	return {
				 idCard1 : '../../static/shili.png',
				 idCard2 : '../../static/shili.png',
				 idCard3 : '../../static/shili.png',
				 idCard4 : '../../static/tianjia.png',
	    	}
	    },
		methods:{
			tap : function(e){
				var id = e.currentTarget.dataset.id;
				uni.showToast({
					title:'您的资料已提交成功，会在1-2个工作日内审核完成，请耐心等待',
					icon:"none"
				});
				this.hideMenu();
			},
			selectImg1 : function() {
				uni.chooseImage({
					count:1,
					success:(res) => {
						this.idCard1 = res.tempFilePaths[0];
					}
				})
			},
			selectImg2 : function() {
				uni.chooseImage({
					count:1,
					success:(res)=>{
						this.idCard2 = res.tempFilePaths[0];
					}
				})
			},
			selectImg3 : function() {
				uni.chooseImage({
					count:1,
					success:(res)=>{
						this.idCard3 = res.tempFilePaths[0];
					}
				})
			},
			selectImg4 : function() {
				uni.chooseImage({
					count:1,
					success:(res)=>{
						this.idCard4 = res.tempFilePaths[0];
					}
				})
			},
			uploadCards : function(){
				if(
				this.idCard1 == 'https://lanhu.oss-cn-beijing.aliyuncs.com/ps2cd8e5feb924c1f4-b826-4dcd-a986-c338a92b57db' || 
				this.idCard2 == 'https://lanhu.oss-cn-beijing.aliyuncs.com/ps8f524a9bcb0ab440-6a40-408d-86a1-64d365a2168a'
				){
					uni.showToast({title:"请选择身份证照片", icon:"none"});
					return;
				}
				// 临时文件地址保存在 this.idCard1 和 this.idCard2 
				// 请调用  uni.uploadFile api 完成上传工作
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
		components:{
			gracePage
		}
	}	
</script>

<style>
</style>
