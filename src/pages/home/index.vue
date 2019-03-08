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
    <div class="nav">
      <div class="nav-item"
           v-for="(item,index) in navItems"
           :key="index">
        <div class="nav-item-content" @click.stop="clickNavItem(item.pageUrl)">
          <img :src="item.imgUrl">
          <text class="text">{{item.text}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Divider from '../../components/divider.vue'
  import {request} from '../../api/request'
  import {navItems, shareInfo, phoneNum, shopPosition} from '../../common/constant/constant'
  import {showToast} from '../../utils/index'
  import {userInfoMixin} from '../../common/mixin/mixin'

  export default {
    mixins: [userInfoMixin],
    data(){
      return {
        imgUrls: [],
        navItems: navItems,
        phoneNum: phoneNum
      }
    },
    created(){
      this.getImgUrls()
    },
    mounted(){

    },
    methods: {
      async getImgUrls(){
        const res = await request('/swiper')
//        console.log(res)
        this.imgUrls = res.data.imgList
//        console.log(this.imgUrls)
      },
      clickNavItem(url){
        if (!url) {
          showToast("敬请期待", null, "/static/img/icon_warn.png")
          return
        }
        console.log(url)
        wx.navigateTo({
          url: url
        })
      },
      navToShop(){
        wx.openLocation({
          latitude: shopPosition[0],
          longitude: shopPosition[1],
          name: "邑大B&W正装店",
          address: '五邑大学玫瑰园置禾超市隔壁'
        })
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
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          font-size: 0;
          .extend-click();
          img {
            width: 48px;
            height: 48px;
          }
          .text {
            margin-top: 8px;
            text-align: center;
            display: block;
            font-size: 14px;
            letter-spacing: ~"1rpx";
            color: @color-middle-black;
          }
        }
      }
    }
  }
</style>
