<template>
  <ul class="dress-list">
    <li class="list-item" v-for="(item,index) in dressList" :key="index">
      <div class="item-wrapper">
        <img :src="item.imgUrl" alt="">
        <p class="item-title" v-if="item.title">{{item.title}}</p>
        <p class="item-price" v-if="item.price">RMB: {{item.price}}</p>
        <p class="item-stock" v-if="item.stock">库存: {{item.stock}}</p>
      </div>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      dressList: {
        type: Array
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';
  @import '../common/less/mixin1';

  .dress-list {
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .list-item {
      padding-top: 10px;
      flex: 1 1 auto;
      width: 33.33333333%;
      text-align: center;
      .item-wrapper {
        display: inline-block;
        width: 90px;
        font-size: 0;
        img {
          width: 90px;
          height: 116px;
          border: ~"1rpx" solid @color-border;
          box-shadow: 1px 1px 5px #e0e0e0;
          border-radius: 5px;
        }
        .item-title, .item-price, .item-stock {
          margin-left: 5px;
          text-align: left;
          font-size: @font-size-medium;
          color: @color-middle-black;
          letter-spacing: 1px;
          .no-wrap();
        }
      }
    }
  }
</style>
