<template>
  <div v-if="showResult">
    <div class="header-wrapper">
      <img-header title="查询结果"></img-header>
    </div>
    <div class="result-wrapper">
      <div class="result-water">
        余 水:
        <div class="result-text">
          {{restWater}} 桶
        </div>
      </div>
      <div class="result-bucket">
        余 桶:
        <div class="result-text">
          {{restBucket}} 个
        </div>
      </div>
      <p class="other-text">对查询结果有任何疑问，请联系我们。</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ImgHeader from './imgHeader.vue'

  export default{
    props: {
      showResult: {
        type: Boolean,
        default: false
      },
      restWater: {
        type: Number,
      },
      restBucket: {
        type: Number
      }
    },
    components: {
      ImgHeader
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';

  .header-wrapper {
    position: relative;
    height: 56px;
    width: 100%;
  }

  .result-wrapper {
    padding: 0 @page-bd-spacing;
    width: 100%;
    box-sizing: border-box;
    .result-water, .result-bucket {
      height: 30px;
      width: 100%;
      display: block;
      font-size: @font-size-medium-x;
      color: @color-middle-black;
      .result-text {
        vertical-align: middle;
        display: inline-block;
        margin-left: 10px;
        padding: 2px 6px;
        height: 20px;
        line-height: 20px;
        border-radius: 2px;
        border: 1px solid @color-font-red;
        color: @color-font-red;
      }
    }
    .other-text {
      margin-top: 6px;
      font-size: @font-size-medium;
      color: @color-middle-black;
    }
  }
</style>
