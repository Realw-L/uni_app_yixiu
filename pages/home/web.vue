<template style="margin-left:50upx;">
  <view >
    <web-view :webview-styles="webviewStyles" :src="url" ></web-view>
  </view>
</template>

<script>

import util from '@/common/util.js'
export default {
  data () {
    return {
      title: '详情',
      url: '',
      webviewStyles: {
        progress: {
          color: '#FF3333',
        },
      },
    }

  },
  onBackPress () {
    // uni.navigateBack() //不用调，会重复调

  },
  onNavigationBarButtonTap (e) {
    console.debug('onNavigationBarButtonTap:' + JSON.stringify(e))
    // uni.showToast({
    //   title: 'test',
    // })
    //

    uni.navigateBack()

  },
  onLoad (option) {
    console.debug(JSON.stringify(option));
    if (option && option.url) {
      var uri = decodeURI(option.url)
      //get prams
      var param = util.buildParam(option)
      if (param.length>0){
        uri +='?'+util.buildParam(option)
      }
      this.url = uri;
      console.debug('web go url:'+this.url)
      return;

      if (option.fullurl) {
        var fulluri = option.fullurl
        this.url= fulluri
        return;
      }else if (option.id) {
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
}
</script>

<style>
</style>
