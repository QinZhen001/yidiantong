<template>
  <div class="coupon-page">
    <div v-if="couponList.length">
      <div v-for="(item,index) in couponList"
           v-bind:key="index"
           class="coupon-wrapper">
        <div class="coupon">
          <div class="coupon-header">
            <div class="icon-wrapper">
              <image class="icon" :src="item.iconUrl"></image>
            </div>
            <div class="header-text">{{item.name}}</div>
          </div>
          <div class="coupon-footer">
            {{item.numberStr}}
          </div>
          <image class="coupon-bg" :src="item.cardUrL"></image>
        </div>
      </div>
    </div>
    <div v-else>
      <center-text name="优惠卷"></center-text>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ShoppingList from '../../components/shoppingList.vue'
  import CenterText from '../../components/centerText.vue'
  import {mapState, mapMutations} from 'vuex'

  export default{
    data(){
      return {
        couponList: [
          {
            name: 'COMEBUY干杯',
            cardUrL: '/static/img/card/card_1.jpg',
            iconUrl: '/static/img/icon_tea_1.png',
            numberStr: '594236841'
          },
          {
            name: '佐敦道奶茶店',
            cardUrL: '/static/img/card/card_2.jpg',
            iconUrl: '/static/img/icon_tea_2.png',
            numberStr: '315745982'
          },
          {
            name: '益和堂奶茶店',
            cardUrL: '/static/img/card/card_3.jpg',
            iconUrl: '/static/img/icon_tea_3.png',
            numberStr: '237895135'
          }
        ]
      }
    },
    methods: {},
    computed: {},
    components: {
      CenterText,
      ShoppingList
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .coupon-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .coupon-wrapper {
      padding: 15px 15px 0 15px;
      width: 100%;
      height: 160px;
      box-sizing: border-box;
      .coupon {
        position: relative;
        width: 100%;
        height: 100%;
        .coupon-bg {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .coupon-header {
          display: flex;
          align-items: center;
          position: absolute;
          left: 0;
          top: 0;
          height: 60px;
          width: 100%;
          .icon-wrapper {
            margin-left: 10px;
            flex: 0 0 40px;
            display: inline-block;
            position: relative;
            width: 40px;
            height: 40px;
            background-color: white;
            border-radius: 50%;
            .icon {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 26px;
              height: 26px;
            }
          }
          .header-text {
            flex: 1 1 auto;
            margin-left: 10px;
            display: inline-block;
            font-size: @font-size-medium-x;
            color: white;
          }
        }
        .coupon-footer {
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: white;
          font-size: @font-size-medium;
        }
      }
    }
  }

</style>
