<template>
  <div class="me-shopping-car-page">
    <div v-if="shopList.length">
      <shopping-list :list="shopList" @clearShoppingCar="clearShoppingCar"></shopping-list>
    </div>
    <div v-else>
      <center-text name="shopping车"></center-text>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ShoppingList from '../../components/shoppingList.vue'
  import CenterText from '../../components/centerText.vue'
  import {mapState, mapMutations} from 'vuex'

  export default{
    data(){
      return {}
    },
    methods: {
      clearShoppingCar(){
        this.setShopList([])
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
      CenterText,
      ShoppingList
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .me-shopping-car-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
  }
</style>
