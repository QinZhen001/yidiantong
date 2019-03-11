<template>
  <div class="page">
    <div v-if="expressList.length" class="shop-list-wrapper">
      <div class="card-item" v-for="(item,index) in expressList" :key="index">
        <div class="header">
          <div class="header-left">{{item.name}}</div>
          <div class="header-right">{{item.action}}</div>
          <div class="header-right" v-if="item.expressName">{{item.expressName}}</div>
          <div class="header-right" v-if="item.takeAction">{{item.takeAction}}</div>
        </div>
        <div class="center" v-if="item.name">
          <div class="center-dorm">宿舍号: {{item.dorm}}</div>
          <div class="center-phone">手机: {{item.phone}}</div>
        </div>
        <div class="footer" v-if="item.date">
          <div class="footer-data">时间: {{item.date}} {{item.time}}</div>
          <div class="footer-weight">估重量: {{item.weight}} kg</div>
        </div>
      </div>
    </div>
    <div v-else>
      <center-text name="快递"></center-text>
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
      db.collection('express').where({
        nickName: this.userInfo.nickName
      }).get().then(res => {
        console.log('res.data', res.data)
        this.expressList = res.data.map(item => ({
          ...item, action: item.action === 'send' ? '寄快递' : '取快递'
        }))
      })
    },
    data(){
      return {
        expressList: [],
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

  .page {
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
            color: @color-deep-black;
            font-size: @font-size-medium;
          }
          .header-right {
            margin-left: 8px;
            float: right;
            color: @color-font-red;
            font-size: @font-size-medium;
            padding: 0 4px;
            border: 1px solid @color-font-red;
          }
          .header-right + .header-right {
            margin-left: 0;
          }
        }

        .center {
          display: flex;
          align-items: center;
          width: 100%;
          height: 30px;
          color: @color-middle-black;
          .center-dorm, .center-phone {
            .no-wrap();
            font-size: @font-size-small;
          }
          .center-dorm {
            flex: 1 1 auto;
          }
          .center-phone {
            flex: 0 0 120px;
          }
        }
        .footer {
          display: flex;
          align-items: center;
          width: 100%;
          height: 30px;
          color: @color-middle-black;
          .footer-data, .footer-weight {
            .no-wrap();
            font-size: @font-size-small;
          }
          .footer-data {
            flex: 1 1 auto;
          }
          .footer-weight {
            flex: 0 0 120px;
          }
        }
      }
    }
  }

</style>
