<template>
  <div class="center">
    <image :src="url"></image>
    <div class="text">{{name}}空空空空如也</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      name: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: '/static/img/null.png'
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  .center {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
    text-align: center;
    font-size: 0;
    image {
      display: inline-block;
      width: 90px;
      height: 90px;
    }
    .text {
      font-size: 14px;
      color: #666;
    }
  }
</style>
