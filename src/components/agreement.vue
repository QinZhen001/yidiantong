<template v-if="text && navText">
  <!--同意协议组件-->
  <div class="agreement">
    <checkbox-group>
      <checkbox @click.stop="toggleCheck" :checked="checked"></checkbox>
      <text class="text" @click.stop="toggleCheck">{{text}}</text>
      <navigator :url="url">{{protocol}}</navigator>
    </checkbox-group>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      text: {
        type: String,
      },
      protocol: {
        type: String
      },
      url: {
        type: String
      },
      isAgree: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        checked: this.isAgree
      }
    },
    methods: {
      toggleCheck(){
        this.checked = !this.checked
      }
    },
    watch: {
      checked(newVal){
        this.$emit('checkedChange', newVal)
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';

  .agreement {
    margin: 0 auto;
    display: inline-block;
    font-size: 0;
    .text {
      margin-left: 2px;
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: @color-middle-black;
    }
    navigator {
      vertical-align: middle;
      display: inline-block;
      font-size: 14px;
      color: @color-font-red;
    }
    .navigator-hover {
      color: #ff3300;
      background: none;
    }
  }
</style>
