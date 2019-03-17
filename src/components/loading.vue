<template>
  <div class="loading-wrapper" v-if="showLoading" :style="{height:height + 'px'}">
    <img src="/static/img/icon_loading.png"/>
    <text>{{text}}</text>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      showLoading: {
        type: Boolean,
        default: true
      },
      height: {
        type: Number,
        default: 90
      },
      text: {
        type: String,
        default: 'Loading...'
      }
    },
    data(){

    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .loading-wrapper {
    width: 100%;
    height: 100px;
    img {
      width: 48px;
      height: 48px;
    }
  }
</style>
