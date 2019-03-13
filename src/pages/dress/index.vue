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
      <dress-list :dressList="discountList" @chooseItem="chooseGoods"></dress-list>
    </div>
    <div class="leaflet-wrapper" v-if="curIndex===2">
      <image src="/static/img/leaflet.jpg"></image>
    </div>
    <shopping-control
      :shopList="shopList"
      @settle="settleGoods"
      @clearShoppingCar="clearShoppingCar">
    </shopping-control>
  </div>
</template>

<script type="text/ecmascript-6">
  import CommonHeader from '../../components/commonHeader.vue'
  import ShoppingControl from '../../components/shoppingControl.vue'
  import DressList from '../../components/dressList.vue'
  import {request} from '../../api/request'
  import {userInfoMixin} from '../../common/mixin/mixin'
  import {showToast} from '../../utils/index'
  import {mapMutations, mapState} from 'vuex'
  import {productList, discountList} from '../../common/constant/constant'


  const DRESS_SHOW = 0, DISCOUNT_SHOW = 1, LEAFLET_SHOW = 2;
  const db = wx.cloud.database()

  export default{
    mixins: [userInfoMixin],
    data(){
      return {
        dressList: productList,
        discountList: discountList,
        curIndex: DRESS_SHOW
      }
    },
    methods: {
      changeNav(index){
        this.curIndex = index
      },
      chooseGoods(item){
        console.log(item)
        let hasChanged = false
        let newShopList = JSON.parse(JSON.stringify(this.shopList))
        this.shopList.forEach((i, index) => {
          if (i.title === item.title) {
            newShopList[index].num++
            hasChanged = true
          }
        })
        if (!hasChanged) {
          newShopList.push({
            title: item.title,
            price: item.price,
            num: 1
          })
        }
        this.setShopList(newShopList)
      },
      clearShoppingCar(){
        this.setShopList([])
      },
      settleGoods(){
        wx.showModal({
          title: '选择',
          content: '确定要选择这些商品吗?',
          success: (res) => {
            if (res.confirm) {
              this.commitOrder()
            }
          }
        })
      },
      commitOrder(){
        db.collection('order').add({
          data: {
            shopList: this.shopList,
            time: new Date(),
            nickName: this.userInfo.nickName
          }
        }).then(res => {
          showToast('成功', 'success')
          this.setShopList([])
        })
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
    .dress-wrapper, .discount-wrapper{
      padding-top: 5px;
      padding-bottom: 50px;
    }
    .leaflet-wrapper {
      padding-top: 0;
      padding-bottom: 0;
      position: absolute;
      left: 0;
      top: 200px;
      width: 100%;
      height: 100%;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
