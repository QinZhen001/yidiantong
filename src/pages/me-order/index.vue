<template>
  <div class="order-page">
    <div v-if="shopList" class="shop-list-wrapper">
      <div class="card-item" v-for="(item,index) in shopList" :key="index">
        <div class="header">
          <div class="header-left">{{item.time}}</div>
          <div class="header-right">已下单</div>
        </div>
        <div class="center" v-if="item.name">
          <div class="center-name">{{item.name}}</div>
          <div class="center-dorm">宿舍号:{{item.dorm}}</div>
          <div class="center-phone">手机:{{item.phoneNum}}</div>
        </div>
        <div
          class="shop-list-item"
          v-for="(product,i) in item.shopList"
          :key="i">
          <div class="title">{{product.title}}</div>
          <div class="price">价格: {{product.price}}</div>
          <div class="num">数量: {{product.num}}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <center-text name="订单"></center-text>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import ShoppingList from '../../components/shoppingList.vue'
  import CenterText from '../../components/centerText.vue'
  import {mapState, mapMutations} from 'vuex'
  import {userInfoMixin} from '../../common/mixin/mixin'
  import {formatTime} from '../../utils/index'


  const db = wx.cloud.database()

  export default{
    mixins: [userInfoMixin],
    mounted(){
      db.collection('order').where({
        nickName: this.userInfo.nickName
      }).get().then(res => {
        console.log('res.data', res.data)
        this.shopList = res.data.map(item => ({
          ...item, time: formatTime(item.time)
        }))

      })
    },
    data(){
      return {
        shopList: [],
        timeList: []
      }
    },
    methods: {},
    computed: {},
    components: {
      CenterText
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';
  @import '../../common/less/mixin1';

  .order-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    font-size: @font-size-medium;
    .shop-list-wrapper {
      position: relative;
      overflow: hidden;
      .card-item {
        position: relative;
        margin: 10px 10px 0 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid @color-border;
        background-color: white;
        .header {
          height: 30px;
          width: 100%;
          .header-left {
            float: left;
            color: @color-light-black;
            font-size: @font-size-small;
          }
          .header-right {
            float: right;
            color: @color-font-red;
            font-size: @font-size-medium;
            padding: 0 2px;
            border: 1px solid @color-font-red;
          }
        }
        .center, .shop-list-item {
          display: flex;
          align-items: center;
          width: 100%;
          height: 30px;
          font-size: @font-size-medium;
          color: @color-middle-black;
        }
        .center {
          .center-name {
            .no-wrap();
            flex: 0 0 120px;
            width: 120px;
            font-weight: 700;
          }
          .center-dorm {
            font-size: @font-size-small;
            flex: 1 1 auto;
          }
          .center-phone {
            font-size: @font-size-small;
            flex: 0 0 auto;
          }
        }
        .shop-list-item {
          .title {
            flex: 0 0 120px;
            width: 120px;
            .no-wrap();
          }
          .price {
            flex: 1 1 auto;
            color: @color-font-red;
          }
          .num {
            flex: 0 0 auto;
          }
        }
      }
    }
  }

</style>
