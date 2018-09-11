<template>
  <div class="common-button" @click.stop="clickBtn">
    <text v-if="text">{{text}}</text>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      text: {
        type: String
      }
    },
    methods: {
      clickBtn(){
        this.$emit('clickBtn')
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';
  @import '../common/less/mixin1';

  .common-button {
    position: relative;
    margin: 0 auto;
    width: 150px;
    height: 40px;
    background-color: @color-bg-red;
    border-radius: 20px;
    text-align: center;
    .common-shadow();
    text {
      height: 40px;
      line-height: 40px;
      color: @color-deep-white;
      font-size: @font-size-medium;
      letter-spacing: 2px;
    }
  }
</style>
