<template>
  <!--带图片的header-->
  <div class="img-header">
    <img class="header-img" src="/static/img/img_header.png" alt="">
    <text class="header-text" v-if="title">{{title}}</text>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';
  @import '../common/less/mixin1';

  .img-header {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 34px;
    width: 308px;
    filter: drop-shadow(0 5px 5px #e0e0e0);
    .header-img {
      height: 100%;
      width: 100%;
    }
    .header-text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: @font-size-medium;
      color: @color-deep-white;
      letter-spacing: 2px;
    }
  }
</style>
