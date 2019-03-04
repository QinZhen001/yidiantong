<template>
  <div>
    <div class="shopping">
      <div class="shopping-control" @click.stop="showList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'active-logo': isActive }">
              <image :src="logoUrl"></image>
            </div>
          </div>
        </div>
        <div class="content-center">
          <div class="price" :class="{'active-price': isActive }">￥{{totalPrice}}</div>
        </div>
        <div class="content-right" :class="{'active-right': isActive }">
          <div class="text">结算 ({{totalNum}})</div>
        </div>
      </div>
      <div class="shopping-list" v-if="showShopList">
        <div class="list-header">
          <div class="header-left">购物车</div>
          <div class="header-right">清空</div>
        </div>
        <div class="list-content">
          <div class="list-item"
               v-for="(item,index) in shopList"
               :key="index">
            <div class="item-title">{{item.title}}</div>
            <div class="item-price">￥{{item.price}}</div>
            <div class="item-num">数量: {{item.num}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="showShopList" @click.stop="clickMask"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'


  const DEFAULT_LOGO_URL = '/static/img/icon_shoppingcar_default.png'
  const ACTIVE_LOGO_URL = '/static/img/icon_shoppingcar_active.png'

  export default{
    data(){
      return {
        logoUrl: DEFAULT_LOGO_URL,
        isActive: false,
        totalPrice: 0,
        totalNum: 0,
//        shopList: [
//          {
//            title: "看积商adadadasdasdasd压约",
//            price: 197,
//            num: 1,
//          },
//          {
//            title: "斯展叫家",
//            price: 258,
//            num: 1,
//          }
//        ],
        showShopList: false,
      }
    },
    methods: {
      showList(){
        if (this.shopList.length) {
          this.showShopList = true
        }
      },
      clickMask(){
        this.showShopList = false
      },
    },
    watch: {
      shopList(newVal, oldVal){
        if (newVal.length) {
          this.isActive = true
          this.logoUrl = ACTIVE_LOGO_URL
        } else {
          this.isActive = false
          this.logoUrl = DEFAULT_LOGO_URL
        }
      },
    },
    computed: {
      ...mapState([
        'shopList'
      ])
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .shopping {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    z-index: 999;
    box-sizing: border-box;
    .shopping-control {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      background-color: #515151;
      .content-left {
        flex: 0 0 auto;
        height: 100%;
        .logo-wrapper {
          position: relative;
          top: -10px;
          padding: 6px;
          margin: 0 12px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          vertical-align: top;
          background-color: #515151;
          .logo {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #333;
            &.active-logo {
              background: #FE6905;
            }
            image {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 26px;
              height: 26px;
            }
          }
        }
      }
      .content-center {
        flex: 1 1 auto;
        height: 30px;
        .price {
          vertical-align: top;
          display: inline-block;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.4);
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          &.active-price {
            color: white;
          }
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        height: 100%;
        text-align: center;
        background-color: #CECECE;
        &.active-right {
          background-color: #FE6905;
        }
        .text {
          height: 48px;
          line-height: 48px;
          color: seashell;
          font-size: 16px;
        }
      }
    }
    .shopping-list {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      transition: all 0.5s;
      z-index: -1;
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        box-sizing: border-box;
        .header-left {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .header-right {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #fff;
        .list-item {
          display: flex;
          align-items: center;
          height: 48px;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border-bottom: none;
          }
          .item-title, .item-price, .item-num {
            display: inline-block;
            font-size: 14px;
          }
          .item-title {
            flex: 0 0 110px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: rgb(7, 17, 27);
          }
          .item-price {
            flex: 1 1 auto;
            box-sizing: border-box;
            padding-left: 5px;
            line-height: 24px;
            height: 24px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .item-num {
            flex: 0 0 auto;
            color: #ddd;
          }
        }
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(7, 17, 27, 0.6);
    z-index: 1;
  }
</style>
