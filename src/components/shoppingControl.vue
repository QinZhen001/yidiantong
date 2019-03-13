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
        <div class="content-right" :class="{'active-right': isActive }" @click.stop="settle">
          <div class="text">选择 ({{totalNum}})</div>
        </div>
      </div>
      <div class="shopping-list-wrapper" v-if="showShopListFlag">
        <shopping-list :list="shopList" @clearShoppingCar="clearShoppingCar"></shopping-list>
      </div>
    </div>
    <div class="mask"
         v-if="showShopListFlag"
         @click.stop="clickMask">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import ShoppingList from './shoppingList.vue'

  const DEFAULT_LOGO_URL = '/static/img/icon_shoppingcar_default.png'
  const ACTIVE_LOGO_URL = '/static/img/icon_shoppingcar_active.png'

  export default{
    props: {
      shopList: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
        logoUrl: DEFAULT_LOGO_URL,
        isActive: false,
        totalPrice: 0,
        totalNum: 0,
        showShopListFlag: false,
      }
    },
    methods: {
      showList(){
        if (this.shopList.length) {
          this.showShopListFlag = true
        }
      },
      clickMask(){
        this.showShopListFlag = false
      },
      clearShoppingCar(){
        this.$emit('clearShoppingCar')
      },
      settle(){
        if (this.shopList.length) {
          this.$emit('settle')
        }
      }
    },
    watch: {
      shopList(newArr, oldArr){
        if (newArr.length) {
          this.isActive = true
          this.logoUrl = ACTIVE_LOGO_URL
        } else {
          this.isActive = false
          this.logoUrl = DEFAULT_LOGO_URL
          this.showShopListFlag = false
        }
        this.totalNum = 0
        this.totalPrice = 0
        newArr.forEach(item => {
          this.totalPrice += item.num * item.price
          this.totalNum += item.num
        })
      },
    },
    components: {
      ShoppingList
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
    .shopping-list-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      transform: translate3d(0, -100%, 0);
      transition: all 0.5s;
      z-index: -1;
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
