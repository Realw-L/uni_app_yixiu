<template>
  <view>
    <uni-nav-bar fixed="true" left-icon="back" @click-left="onBack" @click-right="onClose" left-text="返回"
                 right-text="关闭"
                 title="明细" class="top-view titles" style="margin-top: -20upx;"></uni-nav-bar>
    <web-view :webview-styles="webviewStyles" :src="url"></web-view>
  </view>
</template>

<script>

import util from '@/common/util.js'

export default {
  data () {
    return {
      title: '详情',
      url: 'http://m.baidu.com',
      webviewStyles: {
        progress: {
          color: '#FF3333',
        },
      },
    }
  },
  onBackPress () {
    // uni.navigateBack({
    //   delta: 1,
    // })

  },
  onNavigationBarButtonTap (e) {
    console.debug('onNavigationBarButtonTap:' + JSON.stringify(e))
    // uni.showToast({
    //   title: 'test',
    // })
    //

    uni.navigateBack({
      delta: 1,
    })

  },
  onLoad (option) {
    console.debug(JSON.stringify(option))
    if (option && option.url) {
      var uri = decodeURI(option.url)
      //get prams
      var param = util.buildParam(option)
      if (param.length > 0) {
        uri += '?' + util.buildParam(option)
      }
      this.url = uri
      console.debug('web go url:' + this.url)
      return

      if (option.fullurl) {
        var fulluri = option.fullurl
        this.url = fulluri
        return
      } else if (option.id) {
        uri = uri + '?id=' + option.id
        if (option.groupid) {
          uri = uri + '&groupid=' + option.groupid
        }
      } else if (option.groupid) {
        uri = uri + '?groupid=' + option.groupid
      } else {

      }

      this.url = uri
      //parse param

      console.info('web--onload option:' + JSON.stringify(option))
    }
  },
  methods: {
    onBack () {
      uni.navigateBack({
        delta: 1,
      })
    },

    onClose () {
			
      uni.navigateBack({
        delta: 100,
      })
    },

  },
}
</script>

<style>
</style>
