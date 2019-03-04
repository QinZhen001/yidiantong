<template>
  <div class="dress">
    <common-header
      upText="营业时间: 8:30 ── 22:00"
      :navItems="['商品展示','最近优惠','传单展示']"
      @changeNav="changeNav">
    </common-header>
    <div class="dress-wrapper" v-if="curIndex===0">
      <dress-list
        :dressList="dressList"
        @chooseItem="chooseGoods">
      </dress-list>
    </div>
    <div class="discount-wrapper" v-if="curIndex===1">
      <dress-list :dressList="dressList"></dress-list>
    </div>
    <div class="leaflet-wrapper" v-if="curIndex===2">
      leaflet-wrapper
    </div>
    <shopping-control></shopping-control>
  </div>
</template>

<script type="text/ecmascript-6">
  import CommonHeader from '../../components/commonHeader.vue'
  import ShoppingControl from '../../components/shoppingControl.vue'
  import DressList from '../../components/dressList.vue'
  import {request} from '../../api/request'
  import {mapMutations, mapState} from 'vuex'

  const DRESS_SHOW = 0, DISCOUNT_SHOW = 1, LEAFLET_SHOW = 2;


  export default{
    created(){
//      this.getDressList()
    },
    data(){
      return {
        dressList: [{
          "imgUrl": "/static/img/dress.png",
          "title": "则图太照确制",
          "price": 197,
          "stock": 38
        }, {
          "imgUrl": "/static/img/dress.png",
          "title": "至正量老且",
          "price": 149,
          "stock": 17
        }, {
          "imgUrl": "/static/img/dress.png",
          "title": "须部实口型",
          "price": 77,
          "stock": 33
        }, {
          "imgUrl": "/static/img/dress.png",
          "title": "亲步准",
          "price": 192,
          "stock": 22
        }, {
          "imgUrl": "/static/img/dress.png",
          "title": "总毛观车应无",
          "price": 127,
          "stock": 79
        }, {
          "imgUrl": "/static/img/dress.png",
          "title": "命细证斗亲",
          "price": 269,
          "stock": 91
        }, {
          "imgUrl": "/static/img/dress.png",
          "title": "看积商压约",
          "price": 197,
          "stock": 22
        }, {
          "imgUrl": "/static/img/dress.png",
          "title": "地事实眼农来",
          "price": 202,
          "stock": 84
        },
          {
            "imgUrl": "/static/img/dress.png",
            "title": "斯展叫家",
            "price": 258,
            "stock": 97
          }
        ],
        curIndex: 0
      }
    },
    methods: {
//      async getDressList(){
//        const res = await request('/dressList')
//        this.dressList = res.data.dressList
//        console.log(this.dressList)
//      },
      changeNav(index){
        if (index === DISCOUNT_SHOW) {
          this.getDressList()
        }
        this.curIndex = index
      },
      chooseGoods(item){
        console.log(item)
        let hasChanged = false
//        this.shopList.forEach(item => {
//          if(item.name === )
//        })
        setShopList()
      },
      ...mapMutations({
        setShopList: 'SET_SHOP_LIST'
      })
    },
    computed: {
      ...mapState([
        'shopList'
      ])
    },
    components: {
      CommonHeader,
      DressList,
      ShoppingControl
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .dress {
    width: 100%;
    min-height: 100vh;
    background-color: @color-bg;
    .dress-wrapper, .discount-wrapper, .leaflet-wrapper {
      padding-top: 5px;
      padding-bottom: 50px;
    }
  }
</style>
