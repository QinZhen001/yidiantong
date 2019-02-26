<template>
  <div class="me">
    <div class="me-header">
      <div class="header-bend-bg"></div>
      <div class="header-content">
        <div class="avatar-wrapper">
          <img :src="userInfo.avatarUrl" alt="">
        </div>
        <div class="username">{{userInfo.nickName}}</div>
      </div>
    </div>
    <divider height="15px"></divider>
    <div class="me-list">
      <div class="item">
        <div class="item-left">
          <img src="/static/img/footer/me.png" alt="">
        </div>
        <div class="item-right">
          <text class="text" @click="test">我的aaa订单</text>
        </div>
      </div>
      <div class="item">
        <div class="item-left">
          <img src="/static/img/footer/me.png" alt="">
        </div>
        <div class="item-right">
          <text class="text">我的订单</text>
        </div>
      </div>
      <div class="item">
        <div class="item-left">
          <img src="/static/img/footer/me.png" alt="">
        </div>
        <div class="item-right">
          <text class="text">我的订单</text>
        </div>
      </div>
      <div class="item">
        <div class="item-left">
          <img src="/static/img/footer/me.png" alt="">
        </div>
        <div class="item-right">
          <text class="text">我的订单</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import Divider from '../../components/divider.vue'
  import {request} from '../../api/request'
  import {showDialog, getUserInfo} from '../../utils/index'
  import {appName} from '../../common/constant/constant'

  export default{
    data(){
      return {
        userList: [
          {name: '购物车', iconUrl: ''},
          {name: '我的订单', iconUrl: ''},
          {name: '我的发布', iconUrl: ''},
          {name: '我的快递', iconUrl: ''},
          {name: '我的优惠卷', iconUrl: ''},
        ]
      }
    },
    mounted(){
      if (!this.userInfo.nickName) {
//        getUserInfo()
      }
    },
    methods: {
      login(){
//        wx.login({
//          success: function (res) {
//            if (res.code) {
//              console.log(res.code)
//              //向自己服务器请求
//              const result = request('/user_login.action', 'GET', {code: res.code})
//              console.log(result)
//            }
//          }
//        })
      },
      test(){
        console.log('test')
//        const db = wx.cloud.database()
//        db.collection('books').where({
//          father: 'father'
//        }).get({
//          success(res) {
//            // 输出 [{ "title": "The Catcher in the Rye", ... }]
//            console.log(res)
//          }
//        })

//        wx.cloud.callFunction({name: 'login'}).then(res => {
//          console.log(res)
//        })
        wx.getUserInfo({
          success(res) {
            console.log(res.userInfo)
          }
        })

//        showDialog('获取权限', `允许${appName}获取您的信息吗？`, true, '允许!')
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    components: {
      Divider
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .me {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .me-header {
      position: relative;
      height: 225px;
      width: 100%;
      .header-bend-bg {
        width: 100%;
        height: 112px;
        background: #EA5149;
        border-bottom-right-radius: 1000px 100px;
        border-bottom-left-radius: 1000px 100px;
      }
      .header-content {
        position: absolute;
        left: 50%;
        height: 50%;
        transform: translate(-50%, -50%);
        .avatar-wrapper {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: @color-bg;
          border: 2px solid @color-divider;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .username {
          text-align: center;
          color: @color-middle-black;
          font-size: @font-size-medium-x;
          letter-spacing: 1px;
        }
      }
    }
    .me-list {
      .item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 55px;
        .item-left {
          position: relative;
          flex: 0 0 60px;
          width: 60px;
          height: 55px;
          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 28px;
            height: 28px;
          }
        }
        .item-right {
          flex: 1 1 auto;
          height: 55px;
          box-sizing: border-box;
          border-bottom: ~"1rpx" solid @color-divider;
          .text {
            height: 55px;
            line-height: 55px;
            font-size: @font-size-medium-x;
            color: @color-middle-black
          }
        }
      }
    }
  }
</style>
