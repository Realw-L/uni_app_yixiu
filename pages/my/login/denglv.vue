<template>
  <view class="content">
    <view class="input-group">
      <view class="input-row border">
        <text class="title">账号：</text>
        <input type="text" v-model="account" placeholder="请输入账号">
      </view>
      <view class="input-row" v-if="pwdMode">
        <text class="title">密码：</text>
        <input type="text" password="true" v-model="password" placeholder="请输入密码">
      </view>
      <view class="input-row" v-else>
        <text class="title">验证码：</text>
        <input type="text" password="false" v-model="code" placeholder="请输入密码">
        <button type="primary" class="primary" @tap="onClickGenCode">{{codeMsg}}</button>
      </view>


    </view>
    <view class="btn-row">
      <button type="primary" class="primary" @tap="bindLogin">登录</button>
    </view>
    <!--<view class="action-row">-->
    <!--<navigator url="../reg/reg">注册账号</navigator>-->
    <!--<text>|</text>-->
    <!--<navigator url="../pwd/pwd">忘记密码</navigator>-->
    <!--</view>-->
    <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
      <view class="oauth-image" v-for="provider in providerList" :key="provider.value">
        <image :src="provider.image" @tap="oauth(provider.value)"></image>
      </view>
    </view>
  </view>
</template>

<script>
import service from '../../../service.js'
import util from '../../../common/util.js'
import {
  mapState,
  mapMutations,
} from 'vuex'

export default {
  data () {
    return {
      providerList: [],
      hasProvider: false,
      account: '',
      password: '',
      positionTop: 0,
      pwdMode: true,
      codeMsg: '获取验证码',
      timeCount: 60,
      user: {},
    }
  },
  computed: mapState(['forcedLogin']),
  methods: {

    onClickGenCode () {

      //send api

      //change the status
      this.codeMsg = ''
      this.timeCount = 60
      setInterval(function () {
        this.timeCount++
        if (this.timeCount <= 0) {
          clearInterval(this)
        }

        this.codeMsg = this.timeCount + 's'

      }, 1000)

    },

    signin (username, password) {
      var self = this
      util.POST('user/signin', {mobile: username, password: password}, function (data) {
        console.info(data)
        if (data.status == 1) {
          self.user = data
          self.user.avatar = self.user.avatar;

          uni.setStorageSync(
            'user_id', self.user.id,
          )
          uni.setStorageSync(
            'token', data.token,
          )
          uni.setStorageSync(
            'user_info', self.user,
          )

          uni.navigateBack({
            delta: 1,
          })
        } else {

        }
      })

    },
    ...mapMutations(['login']),
    initProvider () {
      const filters = ['weixin', 'qq', 'sinaweibo']
      uni.getProvider({
        service: 'oauth',
        success: (res) => {
          if (res.provider && res.provider.length) {
            for (let i = 0; i < res.provider.length; i++) {
              if (~filters.indexOf(res.provider[i])) {
                this.providerList.push({
                  value: res.provider[i],
                  image: '../../../static/img/' + res.provider[i] + '.png',
                })
              }
            }
            this.hasProvider = true
          }
        },
        fail: (err) => {
          console.error('获取服务供应商失败：' + JSON.stringify(err))
        },
      })
    },
    initPosition () {
      /**
       * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
       * 反向使用 top 进行定位，可以避免此问题。
       */
      this.positionTop = uni.getSystemInfoSync().windowHeight - 100
    },
    bindLogin () {
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      if (this.account.length < 5) {
        uni.showToast({
          icon: 'none',
          title: '账号最短为 5 个字符',
        })
        return
      }
      if (this.password.length < 6) {
        uni.showToast({
          icon: 'none',
          title: '密码最短为 6 个字符',
        })
        return
      }

      this.signin(this.account, this.password)

    },
    oauth (value) {

      uni.login({
        provider: value,
        success: (res) => {
          uni.getUserInfo({
            provider: value,
            success: (infoRes) => {
              /**
               * 实际开发中，获取用户信息后，需要将信息上报至服务端。
               * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
               */
              this.toMain(infoRes.userInfo.nickName)
            },
          })
        },
        fail: (err) => {
          console.error('授权登录失败：' + JSON.stringify(err))
        },
      })
    },
    toMain (userName) {
      /**
       * 强制登录时使用reLaunch方式跳转过来
       * 返回首页也使用reLaunch方式
       */
      if (this.forcedLogin) {
        uni.reLaunch({
          url: '../main/main',
        })
      } else {
        uni.navigateBack()
      }

    },
  },
  onLoad () {
    this.initPosition()
    this.initProvider()

    var user = uni.getStorageSync('user_info')
    if (user) {
      this.mobile = user.mobile
    }

  },
}
</script>

<style>
  .action-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .action-row navigator {
    color: #007aff;
    padding: 0 20px;
  }

  .oauth-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .oauth-image {
    width: 100px;
    height: 100px;
    border: 1px solid #dddddd;
    border-radius: 100px;
    margin: 0 40px;
    background-color: #ffffff;
  }

  .oauth-image image {
    width: 60px;
    height: 60px;
    margin: 20px;
  }
</style>
