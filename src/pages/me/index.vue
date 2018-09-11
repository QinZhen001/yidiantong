<template>
  <div class="me">
    <div class="me-header">
      <div class="header-bend-bg"></div>
      <div class="header-content" @click="login">
        <div class="avatar-wrapper">
          <img src="/static/img/avatar.png" alt="">
        </div>
        <p class="username">我的的名字</p>
      </div>
    </div>
    <divider height="15px"></divider>
    <div class="me-list">
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
  import Divider from '../../components/divider.vue'
  import {request} from '../../api/request'

  export default{
    methods: {
      login(){
        wx.login({
          success: function (res) {
            if (res.code) {
              console.log(res.code)
              //向自己服务器请求
              const result = request('/user_login.action', 'GET', {code: res.code})
              console.log(result)
            }
          }
        })
      }
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
          img {
            width: 100%;
            height: 100%;
          }
        }
        .username {
          text-align: center;
          color: @color-middle-black;
          font-size: @font-size-medium-x;
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
