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
      <div v-for="(item,index) in userList"
           :key="index"
           class="item"
           @click.stop="jump(item)">
        <div class="item-left">
          <img :src="item.iconUrl" alt="">
        </div>
        <div class="item-right">
          <text class="text">{{item.name}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Divider from '../../components/divider.vue'
  import {request} from '../../api/request'
  import {showDialog, getUserInfo} from '../../utils/index'
  import {appName} from '../../common/constant/constant'
  import {userInfoMixin} from '../../common/mixin/mixin'

  export default{
    mixins: [userInfoMixin],
    data(){
      return {
        userList: [
          {
            name: '我的购物车',
            iconUrl: '/static/img/me/shopping_car.png',
            url: '/pages/me-shoppingcar/main'
          },
          {
            name: '我的订单',
            iconUrl: '/static/img/me/order.png'
          },
          {
            name: '我的发布',
            iconUrl: '/static/img/me/release.png'
          },
          {
            name: '我的快递',
            iconUrl: '/static/img/me/express.png'
          },
          {
            name: '我的优惠卷',
            iconUrl: '/static/img/me/coupon.png',
            url: '/pages/coupon/main'
          },
        ]
      }
    },
    methods: {
      test(){
        console.log('test')
        wx.getUserInfo({
          success(res) {
            console.log(res.userInfo)
          }
        })
      },
      jump(item){
        if (item.url) {
          wx.navigateTo({
            url: item.url
          })
        }
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
        font-size: 0;
        .avatar-wrapper {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-color: @color-bg;
          border: 2px solid @color-divider;
          box-sizing: border-box;
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
