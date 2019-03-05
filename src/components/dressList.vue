<template>
  <ul class="dress-list">
    <li class="list-item"
        v-for="(item,index) in dressList"
        :key="index"
        @click.stop="clickItem(index)">
      <div class="item-wrapper">
        <img :src="item.imgUrl" alt="">
        <p class="item-title" v-if="item.title">{{item.title}}</p>
        <p class="item-price" v-if="item.price">￥{{item.price}}元</p>
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
    },
    methods: {
      clickItem(index){
        this.$emit('chooseItem', this.dressList[index])
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';
  @import '../common/less/mixin1';

  .dress-list {
    width: 100%;
    padding: 5px 0 5px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .list-item {
      flex: 1 1 auto;
      width: 50%;
      padding-top: 12px;
      text-align: center;
      background: whitesmoke;
      box-sizing: border-box;
      &:nth-child(odd), &:nth-child(even) {
        padding: 0 5px;
      }
      &:last-child {
        flex: 0 0 auto;
      }
      .item-wrapper {
        display: inline-block;
        width: 100%;
        font-size: 0;
        border: 1px solid @color-border;
        border-radius: 5px;
        img {
          width: 100%;
          height: 120px;
        }
        .item-title, .item-price, .item-stock {
          font-size: @font-size-medium;
          color: @color-middle-black;
          .no-wrap();
        }
        .item-price {
          color: @color-font-red;
        }
        .item-stock {
          font-size: @font-size-small;
          color: @color-light-black;
        }
      }
    }
  }
</style>
