<template>
	<view>
		<view >
			<view style="display: flex;align-items: center;">
				<view class="uni-title" style="width: 210upx; margin-left: 10upx;">公司名称：</view>
				<input type="text" name="company" placeholder="请输入公司名称" style="border: 1upx solid #09BB07;  width: 500upx; "  />
			</view>
			<view style="display: flex;align-items: center;">
				<view class="uni-title" style="width: 210upx; margin-left: 10upx;">入驻类型：</view>
				<select style="width: 500upx;"> 
				  <option value="volvo">设计公司</option>
				  <option value="saab">展柜厂，装饰公司</option>
				</select>
			</view>
			<view style="display: flex;align-items: center;">
				<view class="uni-title" style="width: 210upx; margin-left: 10upx;">公司地址：</view>
				<select style="width: 500upx;">
				  <option value="volvo">广东省</option>
				  <option value="saab">湖南省</option>、
				  				  <option value="saab">北京省</option>
				</select>
			</view>
			<view style="display: flex;align-items: center;">
				<view class="uni-title" style="width: 210upx; margin-left: 10upx;">详细地址：</view>
				<input type="text" name="company" placeholder="南湾街道布澜路口" style="border: 1upx solid #09BB07;  width: 500upx; "  />
			</view>
			<view>上传店铺标志</view>
							<view class="grace-img-card-item">
								<view class="grace-img-card-img">
									<image src="https://graceui.oss-cn-beijing.aliyuncs.com/demoimgs/2.png" :src="idCard1"  @tap="selectImg1" mode="widthFix" class="grace-img-card-img"></image>
									<text class="grace-img-card-bgTitle">上传logo</text>
								</view>
							</view>
						</view>
				<view style="display: flex; flex-direction: row;">
					<image src="../../static/111.png" mode="" style="width: 50upx; height: 50upx;"></image>
					<text style="color: #AAAAAA;">格式为JPG/PNG/GIF，大小不得超过3M</text>
				</view>

			<view style="display: flex; flex-direction: row; margin-top: 50upx;" >
				<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;" @tap="goDetailPage('new_gongsiruzhu')">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	export default {
	    data() {
			return {
	            idCard1 : 'https://lanhu.oss-cn-beijing.aliyuncs.com/ps2cd8e5feb924c1f4-b826-4dcd-a986-c338a92b57db',
	            idCard2 : 'https://lanhu.oss-cn-beijing.aliyuncs.com/ps8f524a9bcb0ab440-6a40-408d-86a1-64d365a2168a'
	        };
	    },
		methods:{
			goDetailPage(page) {
				// console.info(e);
				//let url = ~e.indexOf('platform') ? e : '/pages/API/' + e + '/' + e;
				uni.navigateTo({
					// url: url
					url: page
				});
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
			}
		},
		components:{gracePage}
	}
</script>

<style>
	page{background:#F8F8F8;}
	.grace-idcard-main{margin:25rpx;}
	.grace-idcard-desc{background-color:#FFFFFF; color:#666666; line-height:56rpx; font-size:26rpx; padding:20rpx; border-radius:10rpx;}
	.grace-idcard-text{line-height:1.8em; margin-top:30rpx; color:#666666;}
	.grace-idcard-items{background-color:#FFFFFF; padding:50rpx; border-radius:10rpx; margin-top:15rpx;}
	.grace-idcard-items-image{width:398rpx;}
</style>
