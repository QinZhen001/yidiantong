<template>
  <div
    class="common-button"
    :class="{'show-shadow':showShadow}"
    :style="{padding: '0 '+ padding + 'px' }"
    @click.stop="clickBtn">
    <text v-if="text">{{text}}</text>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      text: {
        type: String
      },
      showShadow: {
        type: Boolean,
        default: true
      },
      padding: {
        type: Number | String,
        default: 16
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
    display: inline-block;
    position: relative;
    margin: 0 auto;
    height: 40px;
    background-color: @color-bg-red;
    border-radius: 20px;
    text-align: center;
    &.show-shadow {
      .common-shadow();
    }
    text {
      height: 40px;
      line-height: 40px;
      color: @color-deep-white;
      font-size: @font-size-medium;
      letter-spacing: 2px;
    }
  }
</style>
