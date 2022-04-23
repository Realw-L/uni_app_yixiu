<template>
	<view>
		<view style="display: flex; justify-content: center;">
			<image :src="HOST+'/Public/app/receiving_report.png'" mode="" style="height: 500px;" @tap="previewImage"></image>
		</view>

		<view class="uni-padding-wrap uni-common-mt">
			<image class="img" v-if="imageSrc" :src="imageSrc" mode="center" />
			<block v-else>
				<view class="uni-hello-text">
					点击按钮下载验收单图片
				</view>
				<view class="uni-btn-v">
					<button type="primary" @click="saveNetImages">下载</button>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	import util from '@/common/util.js';
	export default {
		data() {
			return {
				HOST: this.$util.HOST,
				imageSrc: '',
			}
		},
		onUnload() {
			this.imageSrc = ''
		},
		methods: {
			 previewImage() { //预览图片
			    uni.previewImage({
					urls:['{{HOST}}/Public/app/receiving_report.png']
			    });
			},
			saveNetImages:function(){
				// 保存图片到相册中
			
			// 创建下载任务
				var picurl="{{HOST}}/Public/app/receiving_report.png";
				// #ifdef MP-WEIXIN
				
				
				uni.downloadFile({
					url: picurl, //仅为示例，并非真实的资源
					success: res => {
						console.debug(res);
						if (res.statusCode === 200) {
							
							console.log('下载成功');
							//file :res.tempFilePath
				
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									console.log('save success');
									
								}
							});
						}
					}
				});
				// #endif
				
				// #ifdef APP-PLUS
				var dtask = plus.downloader.createDownload(picurl, {}, function ( d, status ) {
				// 下载完成
				if ( status == 200 ) {
								
				uni.showToast({
					icon: 'none',
					title: 'download成功!'+d.filename,
				})
				
				plus.gallery.save(d.filename,function() {
				uni.showToast({
					icon: 'none',
					title: '保存成功!'+d.filename,
				})
				}, function() {
				uni.showToast({
					icon: 'none',
					title: '保存失败!'+d.filename,
				})
				});
				} else {
					uni.showToast({
						icon: 'none',
						title: 'Download! failed'+picname,
					})
				
				}
				});
				dtask.start();
				
				// #endif
			},
			saveimages:function(){
					uni.chooseImage({
				count: 1,
				sourceType: ['camera'],
				success: function (res) {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePaths[0],
						success: function () {
							console.log('save success');
							uni.showToast({
								icon: 'none',
								title: '保存成功!'+res.tempFilePaths[0],
							})
						}
						});
					}
				});
			},			
			downloadImage: function() {				
			var 	src = '{{HOST}}/Public/app/receiving_report.png'			
				plus.gallery.save(src,function() {
			uni.showToast({
				icon: 'none',
				title: '保存成功!'+src,
			})
			}, function() {
			uni.showToast({
				icon: 'none',
				title: '保存失败!'+src,
			})
			});
			uni.saveImageToPhotosAlbum({
					filePath: src,					
					success: function() {
						console.log('save success')
						uni.showToast({
							icon: 'none',
							title: '保存成功，请到相册查看!',
						})
					},
					fail: function(){
						console.log('save fail')
						
						uni.showToast({
							icon: 'none',
							title: '保存失败，'+src,
						})
					}
				})
			},
			goDetailPage(e) {
				let path = e.url ? e.url : e
				let url = ~path.indexOf('platform') ? path : '/pages/' + path
				uni.navigateTo({
					url: url,
				})
				return false
			},
		},

	}
</script>

<style>


</style>
