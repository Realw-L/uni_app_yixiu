<template>
  <view style="margin-top: 50upx;">
    <view class="uni-common-mt">
      <form>
        <!--<view class="uni-list">-->
        <!--<view class="uni-list-cell">-->
        <!--<view class="uni-list-cell-left">-->
        <!--<view class="uni-label">图片来源</view>-->
        <!--</view>-->
        <!--<view class="uni-list-cell-right">-->
        <!--<picker :range="sourceType" @change="sourceTypeChange" :value="sourceTypeIndex" mode="selector">-->
        <!--<view class="uni-input">{{sourceType[sourceTypeIndex]}}</view>-->
        <!--</picker>-->
        <!--</view>-->
        <!--</view>-->
        <!--<view class="uni-list-cell">-->
        <!--<view class="uni-list-cell-left">-->
        <!--<view class="uni-label">图片质量</view>-->
        <!--</view>-->
        <!--<view class="uni-list-cell-right">-->
        <!--<picker :range="sizeType" @change="sizeTypeChange" :value="sizeTypeIndex" mode="selector">-->
        <!--<view class="uni-input">{{sizeType[sizeTypeIndex]}}</view>-->
        <!--</picker>-->
        <!--</view>-->
        <!--</view>-->

        <!--<view class="uni-list-cell">-->
        <!--<view class="uni-list-cell-left">-->
        <!--<view class="uni-label">数量限制</view>-->
        <!--</view>-->
        <!--<view class="uni-list-cell-right">-->
        <!--<picker :range="count" @change="countChange" mode="selector">-->
        <!--<view class="uni-input">{{count[countIndex]}}</view>-->
        <!--</picker>-->
        <!--</view>-->
        <!--</view>-->
        <!--</view>-->
        <view class="uni-list list-pd">
          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-head">
                <view class="uni-uploader-title">点击预览选好施工参考图</view>
                <view class="uni-uploader-info">{{imageList.length}}/9</view>
              </view>
              <view class="uni-uploader-body">
                <view class="uni-uploader__files">
                  <block v-for="(image,index) in imageList" :key="index">
                    <view class="uni-uploader__file">
                      <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
                    </view>
                  </block>
                  <view class="uni-uploader__input-box">
                    <view class="uni-uploader__input" @tap="chooseImage"></view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>


        <view class="uni-list list-pd">
          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-head">
                <view class="uni-uploader-title">品牌式验收单</view>
                <view class="uni-uploader-info">{{imageVerifyIDList.length}}/9</view>
              </view>
              <view class="uni-uploader-body">
                <view class="uni-uploader__files">
                  <block v-for="(image,index) in imageVerifyList" :key="index">
                    <view class="uni-uploader__file">
                      <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewVerifyImage"></image>
                    </view>
                  </block>
                  <view class="uni-uploader__input-box">
                    <view class="uni-uploader__input" @tap="chooseVerifyImage"></view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

      </form>
    </view>
  </view>
</template>
<script>
const sourceType = [
  ['camera'],
  ['album'],
  ['camera', 'album'],
]
const sizeType = [
  ['compressed'],
  ['original'],
  ['compressed', 'original'],
]
import util from '../../../common/util.js'

var graceChecker = require('../../../common/graceChecker.js')
export default {
  data () {
    return {
      title: 'choose/previewImage',
      imageList: [],
      imageIDList: [],

      imageVerifyList: [],
      imageVerifyIDList: [],

      sourceTypeIndex: 2,
      sourceType: ['拍照', '相册', '拍照或相册'],
      sizeTypeIndex: 2,
      sizeType: ['压缩', '原图', '压缩或原图'],

      countIndex: 8,
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

      countVerifyIndex: 8,
      countVerify: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },
  onLoad (option) {
    console.debug('option:' + JSON.stringify(option))
    if (option) {

      var self = this

      if (!util.isNull(option.work_refer)) {
        this.imageIDList = option.work_refer.split(',')
        
        util.GET('sys/images?ids='+option.work_refer, {}, function (data) {
          console.info(data)
          if (data.status == 1) {
            self.imageList = []
            for (var i in data.content) {
              self.imageList.push( util.IMAGE_URI+data.content[i])
							
            }
          } else {
        
          }
        })

      }

      if (!util.isNull(option.work_verify)) {

        this.imageVerifyIDList = option.work_verify.split(',')
        util.GET('sys/images?ids='+option.work_verify, {}, function (data) {
          console.info(JSON.stringify(data))
          if (data.status == 1) {
        
            self.imageVerifyList = []
            for (var i in data.content) {
              self.imageVerifyList.push(util.IMAGE_URI+data.content[i])
            }
        
          } else {
        
          }
        })
        

      }

    }
		console.debug('iamgeIDList:'+JSON.stringify(this.imageIDList))
		console.debug('iamgeList:'+JSON.stringify(this.imageList))
		console.debug('iamgeVerifyList:'+JSON.stringify(this.imageVerifyList))
		console.debug('iamgeVerifyIDList:'+JSON.stringify(this.imageVerifyIDList))
  },
  onUnload () {
    this.imageList = [],
      this.imageIDList = [],

      this.sourceTypeIndex = 2,
      this.sourceType = ['拍照或相册'],
      this.sizeTypeIndex = 2,
      this.sizeType = ['压缩或原图'],
      this.countIndex = 8
  },
  onBackPress () {
		console.debug('onBackPress'+this.imageIDList.join(','))
    //save in storage
    uni.setStorageSync('work_refer', this.imageIDList.join(','))
    uni.setStorageSync('work_verify', this.imageVerifyIDList.join(','))

  },
  onNavigationBarButtonTap (e) {
    console.debug('onNavigationBarButtonTap:' + JSON.stringify(e))
    uni.showToast({
      title: 'save ',
    })

    //save in storage
    uni.setStorageSync('work_refer', this.imageIDList.join(','))
    uni.setStorageSync('work_verify', this.imageVerifyIDList.join(','))


    // and back()
    uni.navigateBack({
      delta: 1,
    });


  },
  methods: {
    sourceTypeChange: function (e) {
      this.sourceTypeIndex = e.target.value
    },
    sizeTypeChange: function (e) {
      this.sizeTypeIndex = e.target.value
    },
    countChange: function (e) {
      this.countIndex = e.target.value
    },
    chooseImage: async function () {

      var self = this
      if (this.imageList.length === 9) {
				uni.showToast({
					title:'最多9张图片'
				});
				return;
        let isContinue = await this.isFullImg()
        console.log('是否继续?', isContinue)
        if (!isContinue) {
          return
        }
      }

      uni.chooseImage({
        sourceType: sourceType[this.sourceTypeIndex],
        sizeType: sizeType[this.sizeTypeIndex],
        count: this.imageList.length + this.count[this.countIndex] > 9 ?
          9 - this.imageList.length : this.count[this.countIndex],
        success: (res) => {

          // this.imageList = this.imageList.concat(res.tempFilePaths)
          console.debug('res' + JSON.stringify(res))
          // console.debug('imageList:' + this.imageList)

					for(var i=0; i < res.tempFilePaths.length; i++){
						
						var file_path = res.tempFilePaths[i]
						
						wx.uploadFile({
							url: util.API_URI + '/sys/upload',
							filePath: file_path,
							name: 'data',
							success: (data) => {
								console.log('uploadImage success, data is:' +JSON.stringify(file_path))
								//data is
								// var obj = JSON.parse(data)
								// data.data is string
								// var obj = eval('(' + data.data + ')')
								var obj = JSON.parse(data.data);
								console.debug('parse obj is:' + JSON.stringify(obj))
								if(obj.success==1){
									self.imageIDList.push(obj.id)
									this.imageList.push(file_path)
									uni.showToast({
										title: '上传成功',
										icon: 'none',
										duration: 1000,
									})
									
									console.debug('imageIDList:'+JSON.stringify(self.imageIDList))
								}else{
									
									uni.showToast({
										title: obj.message,
										icon: 'none',
										duration: 1000,
									})
								}
								
							},
							fail: (err) => {
								console.log('uploadImage fail', err)
								uni.showModal({
									content: err.errMsg,
									showCancel: false,
								})
								uni.hideLoading()
							},
							complete: () => {
								console.log('complate')
								//check  use count

								if (self.imageList.length == self.imageList.length) {

									console.debug('all complate')
								}
							},
						})
          //end upload
					} //end for
        }, //end succed
      })
    },

    chooseVerifyImage: async function () {

      var self = this
      if (this.imageVerifyList.length === 9) {
        let isContinue = await this.isVerifyFullImg()
        console.log('是否继续?', isContinue)
        if (!isContinue) {
          return
        }
      }

      uni.chooseImage({
        sourceType: sourceType[this.sourceTypeIndex],
        sizeType: sizeType[this.sizeTypeIndex],
        count: this.imageVerifyList.length + this.countVerify[this.countVerifyIndex] > 9 ?
          9 - this.imageVerifyList.length : this.countVerify[this.countVerifyIndex],
        success: (res) => {

          // this.imageVerifyList = this.imageVerifyList.concat(res.tempFilePaths)
          console.debug('verify res' + JSON.stringify(res))
          // console.debug('verify imageList:' + this.imageVerifyList)

					for(var i=0; i < res.tempFilePaths.length; i++){
						var imagepath = res.tempFilePaths[i]
					
          uni.uploadFile({
            url: util.API_URI + '/sys/upload',
            filePath: imagepath,
            name: 'data',
            success: (ret) => {
              console.log('uploadImage success, res is:', ret)
              //ret is
              // var obj = JSON.parse(ret)
              // ret.data is string
              var obj = eval('(' + ret.data + ')')
              console.debug('parse obj is:', obj)
              self.imageVerifyIDList.push(obj.id)
							this.imageVerifyList.push(imagepath)
              uni.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000,
              })
            },
            fail: (err) => {
              console.log('uploadImage fail', err)
              uni.showModal({
                content: err.errMsg,
                showCancel: false,
              })
              uni.hideLoading()
            },
            complete: () => {
              console.log('complate')
              //check  use count

              if (self.imageVerifyList.length == self.imageVerifyIDList.length) {

                console.debug('all complate')
              }
            },
          })
          //end upload
					}//end for
        },//end succed
      })
    },

    isFullImg: function () {
      return new Promise((res) => {

        uni.showModal({
          content: '已经有9张图片了,是否清空现有图片？',
          success: (e) => {
            if (e.confirm) {
              this.imageList = []
              this.imageIDList = []
              res(true)
            } else {
              res(false)
            }
          },
          fail: () => {
            res(false)
          },
        })
      })
    },

    isVerifyFullImg: function () {
      return new Promise((res) => {

        uni.showModal({
          content: '已经有9张图片了,是否清空现有图片？',
          success: (e) => {
            if (e.confirm) {
              this.imageVerifyList = []
              this.imageVerifyIDList = []
              res(true)
            } else {
              res(false)
            }
          },
          fail: () => {
            res(false)
          },
        })
      })
    },
    previewImage: function (e) {
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: this.imageList,
      })
    },

    previewVerifyImage: function (e) {
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: this.imageVerifyList,
      })
    },

    goDetailPage (e) {
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
  .cell-pd {
    padding: 22 upx 30 upx;
  }

  .list-pd {
    margin-top: 50 upx;
  }
</style>
