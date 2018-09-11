<template>
  <div class="divider" :style="{height:height}"></div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      height: {
        type: String,
        default: "10px"
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';

  .divider {
    width: 100%;
    background-color: @color-divider;
    box-sizing: border-box;
  }
</style>
