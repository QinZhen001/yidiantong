<template>
  <div class="dress">
    <common-header
      upText="营业时间: 8:30 ── 22:00"
      :navItems="['正装展示','最近优惠','传单展示']"
      @changeNav="changeNav">
    </common-header>
    <div class="dress-wrapper" v-if="curIndex===0">
      <dress-list :dressList="dressList"></dress-list>
    </div>
    <div class="discount-wrapper" v-if="curIndex===1">
      <dress-list :dressList="dressList"></dress-list>
    </div>
    <div class="leaflet-wrapper" v-if="curIndex===2">
      leaflet-wrapper
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CommonHeader from '../../components/commonHeader.vue'
  import DressList from '../../components/dressList.vue'
  import {request} from '../../api/request'

  const DRESS_SHOW = 0, DISCOUNT_SHOW = 1, LEAFLET_SHOW = 2;


  export default{
    created(){
      this.getDressList()
    },
    data(){
      return {
        dressList: [],
        curIndex: 0
      }
    },
    methods: {
      async getDressList(){
        const res = await request('/dressList')
        this.dressList = res.data.dressList
        console.log(this.dressList)
      },
      changeNav(index){
        if (index === DISCOUNT_SHOW) {
          this.getDressList()
        }
        this.curIndex = index
      }
    },
    components: {
      CommonHeader,
      DressList
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .dress {
    width: 100%;
    min-height: 100vh;
    background-color: @color-bg;

  }
</style>
