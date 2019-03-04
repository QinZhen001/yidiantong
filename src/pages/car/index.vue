<template>
  <div class="car-page">
    <image src="/static/img/learn_car.jpg"></image>
    <button open-type="contact">
      <div class="footer">联系客服</div>
    </button>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import Divider from '../../components/divider.vue'
  //  import {request} from '../../api/request'
  //  import {showDialog, getUserInfo} from '../../utils/index'
  //  import {appName} from '../../common/constant/constant'
  //  import {userInfoMixin} from '../../common/mixin/mixin'

  export default{
    data(){
      return {}
    },
    methods: {}
//    components: {
//      Divider
//    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';
  @import "../../common/less/mixin1";

  .car-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    image {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
    button {
      .cancel-default-btn();
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background-color: @color-font-red;
      opacity: 0.8;
      .footer {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: @font-size-medium-x;
        letter-spacing: 2px;
        color: white;
      }
    }
  }
</style>
