<template>
  <div class="shopping-list" >
    <div class="list-header">
      <div class="header-left">shopping车</div>
      <div class="header-right" @click.stop="clearShoppingCar">清空</div>
    </div>
    <scroll-view class="list-content" scroll-y="true">
      <div class="list-item"
           v-for="(item,index) in list"
           :key="index">
        <div class="item-title">{{item.title}}</div>
        <div class="item-price">￥{{item.price}}</div>
        <div class="item-num">数量: {{item.num}}</div>
      </div>
    </scroll-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      clearShoppingCar(){
        this.$emit('clearShoppingCar')
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';
  @import '../common/less/mixin1';

  .shopping-list {
    width: 100%;
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
      background: #fff;
      box-sizing: border-box;
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
          flex: 0 0 140px;
          line-height: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgb(7, 17, 27);
        }
        .item-price {
          flex: 1 1 auto;
          box-sizing: border-box;
          padding-left: 10px;
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

</style>
