<template>
  <div class="index-page">
    <swiper class="swiper"
            indicator-color="#888888"
            indicator-active-color="#EA5149"
            indicator-dots="true"
            autoplay="true"
            circular="true">
      <div v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <img :src="item">
        </swiper-item>
      </div>
    </swiper>
    <divider></divider>
    <div class="map" @click.stop="navToShop">
      <img src="/static/img/map.png" alt="">
      <div class="text-content">
        <div class="text-item">营业时间: 8:30-22:00</div>
        <div class="text-item">联系方式: {{phoneNum}}</div>
        <div class="text-item">地址: (B&W正装)玫瑰园置禾超市隔壁</div>
      </div>
    </div>
    <divider></divider>
    <div class="nav" v-if="showFlag">
      <div class="nav-item"
           v-for="(item,index) in navItems"
           :key="index"
           @click.stop="clickNavItem(item.pageUrl)">
        <button class="nav-item-content"
                hover-class="none"
                open-type="getUserInfo"
                @getuserinfo="getUserInfo">
          <img :src="item.imgUrl">
          <text class="text">{{item.text}}</text>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Divider from '../../components/divider.vue'
  import {request} from '../../api/request'
  import {navItems, shareInfo, phoneNum, shopPosition} from '../../common/constant/constant'
  import {showToast, setUserInfo} from '../../utils/index'
  import {userInfoMixin} from '../../common/mixin/mixin'


  export default {
    mixins: [userInfoMixin],
    data(){
      return {
        imgUrls: [
          "cloud://dev-00195f.6465-dev-00195f/slider/slider_1.jpg",
          "cloud://dev-00195f.6465-dev-00195f/slider/slider_2.jpg",
          "cloud://dev-00195f.6465-dev-00195f/slider/slider_3.jpg",
          "cloud://dev-00195f.6465-dev-00195f/slider/slider_4.jpg",
          "cloud://dev-00195f.6465-dev-00195f/slider/slider_5.jpg"
        ],
        navItems: navItems,
        phoneNum: phoneNum,
        showFlag: 0
      }
    },
    created(){
      const db = wx.cloud.database()
      db.collection('init').get().then(res => {
//        console.log('res', res.data[0].showFlag)
        this.showFlag = res.data[0].showFlag || 0
      })
    },
    mounted(){

    },
    methods: {
      clickNavItem(url){
        if (!this.userInfo.nickName) {
          showToast("请允许获取用户信息!")
          return
        }
        if (!url) {
          showToast("敬请期待", null, "/static/img/icon_warn.png")
          return
        }
        wx.navigateTo({
          url: url
        })
      },
      navToShop(){
        wx.openLocation({
          latitude: shopPosition[0],
          longitude: shopPosition[1],
          name: "邑大XXX店",
          address: '五邑大学玫瑰园置禾超市隔壁'
        })
      },
      getUserInfo(res){
//        console.log(res)
        if (!this.userInfo.nickName && res.mp.detail.userInfo && res.mp.detail.userInfo.avatarUrl) {
          setUserInfo({
            avatarUrl: res.mp.detail.userInfo.avatarUrl,
            nickName: res.mp.detail.userInfo.nickName,
          })
        }
      }
    },
    components: {
      Divider
    },
    onShareAppMessage (res) {
      return shareInfo
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin1";

  .index-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .swiper {
      width: 100%;
      height: 225px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .map {
      position: relative;
      height: 65px;
      width: 100%;
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      .text-content {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: @color-middle-black;
      }
    }
    .nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      width: 100%;
      background: white;
      .nav-item {
        position: relative;
        flex: 1 1 auto;
        height: 100px;
        width: 33.33333333%;
        .nav-item-content {
          .cancel-default-btn();
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100%;
          height: 100%;
          font-size: 0;
          img {
            flex: 0 0 auto;
            width: 48px;
            height: 48px;
          }
          .text {
            height: 32px;
            line-height: 32px;
            flex: 0 0 auto;
            font-size: @font-size-medium;
            letter-spacing: ~"1rpx";
            color: @color-middle-black;
          }
        }
      }
    }
  }
</style>
