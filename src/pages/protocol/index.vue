<template>
  <div class="protocol-page">
    <div class="header">
      {{headerText}}
    </div>
    <div class="content">
      <div class="protocol-dec">{{protocolDec}}</div>
      <text class="protocol-text" space="true" selectable="true">{{protocolText}}</text>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {protocolText, protocolDec} from '../../common/constant/constant'

  export default{
    data(){
      return {
        headerText: '<快递服务协议>',
        protocolText: protocolText,
        protocolDec: protocolDec,
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';

  .protocol-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .header {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: @font-size-medium-x;
      color: whitesmoke;
      background-color: #3C4448;
    }
    .content {
      width: 100%;
      padding: 0 6px;
      box-sizing: border-box;
      font-size: @font-size-medium;
      .protocol-dec {
        margin-top: 10px;
        text-indent: 2em;
        font-size: @font-size-medium;
        color: @color-light-black;
      }
      .protocol-text {
        margin: 10px 0;
        display: block;
        color: @color-middle-black;
        font-size: @font-size-medium;
      }
    }
  }
</style>
