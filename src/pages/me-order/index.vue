<template>
  <div class="coupon-page">
    <div v-if="couponList.length">

    </div>
    <div v-else>
      <center-text name="优惠卷"></center-text>
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
    methods: {},
    computed: {},
    components: {
      CenterText,
      ShoppingList
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .coupon-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;

  }

</style>
