<template>
  <div class="me">
    <div class="me-header">
      <div class="header-bend-bg"></div>
      <button class="header-content"
              hover-class="none"
              open-type="getUserInfo"
              @getuserinfo="getUserInfo">
        <div class="avatar-wrapper">
          <img :src="userInfo.avatarUrl" alt="">
        </div>
        <div class="username" v-if="userInfo.nickName">{{userInfo.nickName}}</div>
        <div class="username" v-else>点我登录</div>
      </button>
    </div>
    <divider height="15px"></divider>
    <div class="me-list" v-if="showFlag">
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
  import {setUserInfo, showToast} from '../../utils/index'
  import {appName, shareInfo} from '../../common/constant/constant'
  import {userInfoMixin} from '../../common/mixin/mixin'


  export default{
    mixins: [userInfoMixin],
    created(){
      const db = wx.cloud.database()
      db.collection('init').get().then(res => {
//        console.log('res', res.data[0].showFlag)
        this.showFlag = res.data[0].showFlag || 0
      })
    },
    data(){
      return {
        showFlag: 0,
        userList: [
          {
            name: '我的物品',
            iconUrl: '/static/img/me/shopping_car.png',
            url: '/pages/me-shoppingcar/main'
          },
          {
            name: '我的订单',
            iconUrl: '/static/img/me/order.png',
            url: '/pages/me-order/main'
          },
          {
            name: '我的快递',
            iconUrl: '/static/img/me/express.png',
            url: '/pages/me-express/main'
          },
          {
            name: '我的优惠卷',
            iconUrl: '/static/img/me/coupon.png',
            url: "/pages/me-coupon/main",
          },
        ]
      }
    },
    onShareAppMessage (res) {
      return shareInfo
    },
    methods: {
      jump(item){
        if (!this.userInfo.nickName) {
          showToast('请您先登录!')
          return
        }
        if (item.url) {
          wx.navigateTo({
            url: item.url
          })
        }
      },
      getUserInfo(res){
        if (res.mp.detail.userInfo && res.mp.detail.userInfo.avatarUrl) {
          setUserInfo({
            avatarUrl: res.mp.detail.userInfo.avatarUrl,
            nickName: res.mp.detail.userInfo.nickName,
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
  @import '../../common/less/mixin1';

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
        .cancel-default-btn();
        position: absolute;
        left: 50%;
        top: 50%;
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
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: @color-middle-black;
          font-size: @font-size-medium-x;
          letter-spacing: 1px;
          .no-wrap();
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
