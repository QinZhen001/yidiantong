<template>
  <div class="textarea-item">
    <div class="item-left">
      <text class="text" :space=space v-if="firstText">{{firstText}}</text>
      <text class="text" :space=space v-if="secondText">{{secondText}}</text>
    </div>
    <textarea class="textarea"
              :placeholder="placeholder"
              :cursor-spacing="cursorSpacing"
              @blur="blur">
    </textarea>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      space: {
        type: String,
        default: 'emsp'
      },
      firstText: {
        type: String
      },
      secondText: {
        type: String
      },
      placeholder: {
        type: String
      },
      cursorSpacing: {
        //指定光标与键盘的距离，单位 px
        type: Number,
        default: 10
      },
    },
    methods: {
      blur(e){
        this.$emit('changText', e.mp.detail.value)
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';

  .textarea-item {
    margin-top: 6px;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 0;
    .item-left {
      flex: 0 0 auto;
      align-self: flex-start;
      color: @color-middle-black;
      font-size: @font-size-medium;
      .text {
        display: block;
      }
    }
    .textarea {
      flex: 1 1 auto;
      display: inline-block;
      margin-left: 10px;
      padding: 6px 10px;
      height: 60px;
      color: @color-middle-black;
      font-size: @font-size-medium;
      background: #e8e8e8;
      border-radius: 10px;
    }
    .textarea-placeholder {
      font-size: @font-size-medium;
      color: @color-light-black;
    }
  }
</style>
