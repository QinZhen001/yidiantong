<template>
  <div class="reserve-list">
    <div class="left">
      <div v-for="(item,index) in waterNames"
           :key="index"
           @click.stop="chooseWater(index)"
           class="left-item"
           :class="{active:index===curWaterIndex}">
        <p class="text">{{item}}</p>
      </div>
    </div>
    <div class="right">
      <div class="right-first-item">
        <img src="/static/img/tong_water.jpg" alt="">
        <div class="item-content">
          <p class="up-text">{{curWaterName}}</p>
          <p class="down-text">原价：{{curWaterPrice}}元/桶</p>
        </div>
      </div>
      <div class="right-item"
           v-for="(item,index) in waterList"
           :key="index"
           @click.stop="chooseProduct(index)">
        <img v-if="!item.chose" src="/static/img/icon_add.png" alt="">
        <img v-else src="/static/img/icon_choose.png" alt="">
        <div class="middle">
          <p class="up-text">【{{item.title}}】 {{item.description}}</p>
          <p class="down-text">
            平均{{item.averagePrice}}元/桶
          </p>
        </div>
        <p class="total-price">¥{{item.totalPrice}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRandomNum} from '../utils/index'


  export default{
    props: {
      curWaterName: {
        type: String,
        default: '沁源山泉'
      },
      curWaterPrice: {
        type: Number,
        default: 23
      },
      waterList: {
        type: Array,
        default: []
      }
    },
    data(){
      return {
        waterNames: ['沁源山泉', '七翁井山泉', '古兜山矿泉', '加仑加', '华山泉', '怡宝'],
        curWaterIndex: 0,
      }
    },
    methods: {
      chooseProduct(index){
        let choseWater = {}
        if (this.waterList[index].chose) {
          //点击的这个已经被选中 那么设为未选中
          this.waterList[index].chose = false
        } else {
          this.waterList = this.waterList.map((item, curIndex) => ({
            ...item, chose: index === curIndex
          }))
          choseWater = {
            title: `${this.waterNames[index]} ${this.waterList[index].title}`,
            num: 1,
            price: this.waterList[index].totalPrice
          }
        }
        this.$emit('chooseWater', choseWater)
      },
      chooseWater(index){
        if (this.curWaterIndex !== index) {
          this.curWaterIndex = index
          this.getWaterList()
          this.$emit('chooseWater', {})
        }
      },
      getWaterList(){
        this.waterList = this.waterList.map(item => ({
          ...item,
          chose: false,
          averagePrice: getRandomNum(10, 20),
          totalPrice: getRandomNum(350, 650)
        }))
      },
    },
    watch: {
      curWaterIndex(newVal, oldVal){
        this.curWaterName = this.waterNames[newVal]
        this.curWaterPrice = getRandomNum(20, 25)
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';
  @import '../common/less/mixin1';

  .reserve-list {
    display: flex;
    height: 278px;
    .left {
      display: flex;
      flex-direction: column;
      flex: 0 0 96px;
      width: 96px;
      height: 100%;
      box-sizing: border-box;
      border-right: ~"1rpx" solid @color-border;
      .left-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1 auto;
        width: 100%;
        box-sizing: border-box;
        border-bottom: ~"1rpx" solid @color-border;
        font-size: @font-size-medium;
        color: @color-middle-black;
        &.active {
          background-color: @color-bg-red;
          color: @color-deep-white
        }
        .text {
          flex: 1 1 auto;
          text-align: center;
        }
      }
    }
    .right {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      .right-item {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        border-bottom: ~"1rpx" solid @color-border;
        &:active {
          background-color: #ddd;
        }
        img {
          margin: 0 12px 0 10px;
          flex: 0 0 20px;
          width: 20px;
          height: 20px;
        }
        .middle {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0;
          .up-text, .down-text {
            flex: 1 1 auto;
            color: @color-middle-black;
            .no-wrap();
          }
          .up-text {
            font-size: @font-size-medium;
          }
          .down-text {
            padding-left: 15px;
            font-size: @font-size-small;
          }
        }
        .total-price {
          flex: 3 1 auto;
          font-size: @font-size-medium-x;
          color: @color-font-red;
          font-weight: 600;
        }
      }
      .right-first-item {
        display: flex;
        align-items: center;
        flex: 0 0 80px;
        height: 80px;
        box-sizing: border-box;
        border-bottom: ~"1rpx" solid @color-border;
        overflow: hidden;
        img {
          margin-left: 12px;
          flex: 0 0 56px;
          width: 56px;
          height: 62px;
        }
        .item-content {
          margin-left: 12px;
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 0;
          .up-text, .down-text {
            flex: 1 1 auto;
            color: @color-middle-black;
            .no-wrap();
          }
          .up-text {
            letter-spacing: 1px;
            font-size: @font-size-medium;
            font-weight: 600;
          }
          .down-text {
            font-size: @font-size-small;
          }
        }
      }
    }
  }
</style>
