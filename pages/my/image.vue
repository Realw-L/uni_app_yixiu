<template>
  <view>
    <view class="uni-common-mt">
      <form ref="former" @submit="formSubmit" @reset="formReset">
        <view class="uni-list">
          <view style="display: flex; justify-content: center;">
            <view class="uni-title" style="width: 180upx;">姓名：</view>
            <input name="name" :value="name" type="text" placeholder="请输入您的真实姓名" maxlength="18"
                   @input="onInputName"
                   style="  padding: 15upx; background-color:#FFFFFF;"/>
          </view>
          <view style="display: flex; justify-content: center;">
            <view class="uni-title" style="width: 180upx;">身份证：</view>
            <input name="identity_no" :value="identity_no" type="text" placeholder="请输入您的身份证号码" maxlength="18"
                   @input="onInputIdentityNo"
                   style=" padding: 15upx; background-color:#FFFFFF;"/>
          </view>
        </view>
        <view class="uni-list list-pd" style="width: 500upx; height: 900upx;margin-left: 15%; ">
          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-body" style="display:flex; justify-content: center;margin-left: -230upx;">
                <view class="uni-uploader__files">
                  <block>
                    <view class="uni-uploader__file">
                      <image class="uni-uploader__img" :src="image1" :data-src="image1" @tap="previewImage"
                             style=""></image>
                    </view>
                  </block>
                  <view class="uni-uploader__input-box">
                    <view class="uni-uploader__input" @tap="chooseImage(0)"></view>
                  </view>
                </view>
              </view>
              <view class="uni-uploader-head" style="display:flex; justify-content: center; ">
                <view class="uni-uploader-title">点击添加身份证正面（头像照）</view>
              </view>
            </view>
          </view>
          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-body" style="display:flex; justify-content: center; margin-left: -230upx;">
                <view class="uni-uploader__files" >
                  <block >
                    <view class="uni-uploader__file" >
                      <image class="uni-uploader__img" :src="image2" :data-src="image2" @tap="previewImage"
                             style=""></image>
                    </view>
                  </block>

                  <view class="uni-uploader__input-box">
                    <view class="uni-uploader__input" @tap="chooseImage(1)"
                          style="width: 400upx; height: 300upx;"></view>

                  </view>

                </view>
              </view>
              <view class="uni-uploader-head" style="display:flex; justify-content: center;">
                <view class="uni-uploader-title">点击添加身份证反面（国徽照）</view>
              </view>
            </view>
          </view>
          <view class="uni-list-cell cell-pd">
            <view class="uni-uploader">
              <view class="uni-uploader-body" style="display:flex; justify-content: center; margin-left: -230upx;">
                <view class="uni-uploader__files">
                  <block>
                    <view class="uni-uploader__file">
                      <image class="uni-uploader__img" :src="image3" :data-src="image3" @tap="previewImage"></image>
                    </view>
                  </block>

                  <view class="uni-uploader__input-box">
                    <view class="uni-uploader__input" @tap="chooseImage(2)"></view>
                  </view>

                </view>
              </view>
              <view class="uni-uploader-head" style="display:flex; justify-content: center;">
                <view class="uni-uploader-title">手持身份证照片</view>
              </view>
            </view>
          </view>
          <button ref="submitForm" typeof="submit"></button>
        </view>
      </form>
    </view>
  </view>
</template>
<script>

import util from '@/common/util'

var graceChecker = require('../../common/graceChecker.js')
var sourceType = [
  ['camera'],
  ['album'],
  ['camera', 'album'],
]
var sizeType = [
  ['compressed'],
  ['original'],
  ['compressed', 'original'],
]
export default {
  data () {
    return {
      title: '实名认证',
      imageList: ['', '', ''],

      ids: ['', '', ''],
      image1: '',
      image2: '',
      image3: '',
      sourceTypeIndex: 2,
      sourceType: ['拍照', '相册', '拍照或相册'],
      sizeTypeIndex: 2,
      sizeType: ['压缩', '原图', '压缩或原图'],
      countIndex: 1,
      count: [1],
      name: '',
      identity_no: '',
    }
  },
  onLoad () {
    this.loadData()
  },
  onUnload () {
    this.imageList = [],
      this.sourceTypeIndex = 2,
      this.sourceType = ['拍照', '相册', '拍照或相册'],
      this.sizeTypeIndex = 2,
      this.sizeType = ['压缩', '原图', '压缩或原图'],
      this.countIndex = 1
  },
  onBackPress () {

  },
  onNavigationBarButtonTap (e) {
    console.debug('onNavigationBarButtonTap:' + JSON.stringify(e))

    //check
    var formData = {
      name: this.name,
      identity_no: this.identity_no,
      ids: this.ids.join(','),
    }

    this.formSubmit({detail: {value: formData}})

  },
  methods: {

    onInputIdentityNo (e) {
      this.identity_no = e.detail.value
    },

    onInputName (e) {
      this.name = e.detail.value
    },

    loadData () {

      var self = this
      //singin auto reg
      util.GET(
        'user/getIdentity',
        {},
        function (data) {
          console.info('handle:' + JSON.stringify(data))
          if (data.status == 1) {
           // uni.showToast({title: data.content, icon: 'none'})

            self.name = data.content.name
            self.identity_no = data.content.identity_no
						if(data.content.ids){
							  self.ids = data.content.ids.split(',')
						}


            if (self.ids && self.ids.length > 0) {
							// if(data.content.images){
								// self.imageList = data.content.images
							// }
              

              for (var i=0; i < data.content.images.length; i++) {
								self.imageList.push(util.IMAGE_URI + data.content.images[i]);
                switch (i) {
                  case 0:
                    self.image1 = util.IMAGE_URI + data.content.images[i]
                    break
                  case 1:
                    self.image2 = util.IMAGE_URI + data.content.images[i]
                    break
                  case 2:
                    self.image3 = util.IMAGE_URI + data.content.images[i]
                    break
                }
              }
            }
						console.debug('image1:'+self.image1)
          } else {
            uni.showToast({title: data.message, icon: 'none'})
          }
        },
      )
    },

    onSave (formdata) {

      console.info('save formdata:' + JSON.stringify(formdata))
      var self = this
      
      util.POST('user/identitys',formdata,
        function (data) {
          console.info('handle:' + JSON.stringify(data))
          if (data.status == 1) {
            uni.showToast({title: data.content, icon: 'none'})

          } else {
            uni.showToast({title: data.message, icon: 'none'})
          }
        },
      )
    },

    formSubmit: function (e) {
      //将下列代码加入到对应的检查位置
      //定义表单规则
      var rule = [
        {
          name: 'name',
          checkType: 'string',
          checkRule: '2,6',
          errorMsg: '姓名应为4-6个字符',
        },
        {
          name: 'identity_no',
          checkType: 'string',
          checkRule: '18,18',
          errorMsg: '身份证为18字符',
        },
      ]
      //进行表单检查
      var formData = e.detail.value
      console.debug('formData:' + JSON.stringify(formData))
      var checkRes = graceChecker.check(formData, rule)
      if (checkRes) {
        this.onSave(formData)

        // uni.showToast({title:"验证通过!", icon:"none"});
      } else {
        uni.showToast({title: graceChecker.error, icon: 'none'})
      }
    }
    ,
    formReset: function (e) {
      console.log('清空数据')
      this.chosen = ''
    }
    ,
    sourceTypeChange: function (e) {
      this.sourceTypeIndex = e.target.value
    }
    ,
    sizeTypeChange: function (e) {
      this.sizeTypeIndex = e.target.value
    }
    ,
    countChange: function (e) {
      this.countIndex = e.target.value
    }
    ,
    chooseImage: function (index) {

      var self = this
      uni.showLoading({})
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success: (res) => {
          console.log('chooseImage success, temp path is', res.tempFilePaths[0])
          var imageSrc = res.tempFilePaths[0]

          wx.uploadFile({
            url: util.API_URI + 'sys/upload',
            filePath: imageSrc,
            name: 'data',
            success: (res) => {
              console.log('uploadImage success, res is:', res)
              uni.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 1000,
              })
              // this.imageSrc = imageSrc

              // var obj = eval('(' + res.data + ')')
var obj = JSON.parse(res.data);
              console.debug('res.object:', obj)
              console.debug('imagelist:', self.imageList)

              self.index = index
              self.imageList[index] = util.IMAGE_URI + obj.url

              switch (index) {
                case 0:
                  self.image1 = util.IMAGE_URI + obj.url
                  break
                case 1:
                  self.image2 = util.IMAGE_URI + obj.url
                  break
                case 2:
                  self.image3 = util.IMAGE_URI + obj.url
                  break

              }

              self.ids[index] = obj.id

              console.debug(' images:' + self.imageList)
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
            },
          })

        },
        fail: (err) => {
          console.log('chooseImage fail', err)
          uni.hideLoading()
        },
      })
    }
    ,
    isFullImg: function () {
      return new Promise((res) => {
        uni.showModal({
          content: '已经有9张图片了,是否清空现有图片？',
          success: (e) => {
            if (e.confirm) {
              this.imageList = []
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
    }
    ,
    previewImage: function (e) {
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: this.imageList,
      })
    }
    ,
    goDetailPage (e) {
      let path = e.url ? e.url : e
      let url = ~path.indexOf('platform') ? path : '/pages/' + path
      uni.navigateTo({
        url: url,
      })
      return false
    }
    ,
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
