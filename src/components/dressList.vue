<template>
  <ul class="dress-list">
    <li class="list-item"
        v-for="(item,index) in dressList"
        :key="index"
        @click.stop="clickItem(index)">
      <div class="item-wrapper">
        <img :src="item.imgUrl" alt="">
        <p class="item-title" v-if="item.title">{{item.title}}</p>
        <p class="item-discount" v-if="item.discount">原价:￥{{item.discount}}元</p>
        <p class="item-price" v-if="item.price">
          <span v-if="item.discount">现价:</span>
          ￥{{item.price}}元
        </p>
        <div class="item-stock" v-if="item.stock">库存:{{item.stock}}</div>
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
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .list-item {
      flex: 1 1 auto;
      width: 50%;
      text-align: center;
      background: whitesmoke;
      box-sizing: border-box;
      &:nth-child(odd), &:nth-child(even) {
        padding: 5px 5px 0 5px;
      }
      &:last-child {
        flex: 0 0 auto;
      }
      .item-wrapper {
        position: relative;
        display: inline-block;
        width: 100%;
        font-size: 0;
        border: 1px solid @color-border;
        border-radius: 5px;
        img {
          width: 100%;
          height: 140px;
        }
        .item-title, .item-price {
          margin-top: 3px;
          font-size: @font-size-medium;
          color: @color-middle-black;
          .no-wrap();
        }
        .item-discount {
          font-size: @font-size-small;
          color: @color-light-black;
          text-decoration: line-through;
        }
        .item-price {
          color: @color-font-red;
        }
        .item-stock {
          position: absolute;
          right: 5px;
          top: 5px;
          padding: 0 2px;
          border-radius: 2px;
          border: 1px solid @color-font-red;
          font-size: @font-size-small;
          color: @color-font-red;
        }
      }
    }
  }
</style>
