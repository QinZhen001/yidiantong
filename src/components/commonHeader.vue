<template>
  <div class="common-header">
    <img class="header-bg" src="/static/img/head.png">
    <div class="head-content">
      <img class="logo" src="/static/img/logo.png">
      <p class="up-text" v-if="upText">{{upText}}</p>
      <p class="down-text" v-if="downText">{{downText}}</p>
    </div>
    <div class="header-nav-wrapper" v-if="navItems">
      <div class="header-nav">
        <div class="nav-item"
             :class="{active:index===curIndex}"
             v-for="(item,index) in navItems"
             :key="index"
             @click.stop="clickNavItem(index)">
          <text class="nav-item-text">{{item}}</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      upText: {
        type: String
      },
      downText: {
        type: String
      },
      navItems: {
        type: Array
      }
    },
    data(){
      return {
        curIndex: 0
      }
    },
    methods: {
      clickNavItem(index){
        this.$emit('changeNav', index)
        this.curIndex = index
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';
  @import '../common/less/mixin1';

  .common-header {
    position: relative;
    width: 100%;
    height: 200px;
    .common-shadow();
    .header-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .head-content {
      display: inline-block;
      position: absolute;
      top: 26px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 0;
      .logo {
        width: 62px;
        height: 62px;
      }
      .up-text,.down-text {
        letter-spacing: 1px;
        font-size: @font-size-medium;
        color: @color-deep-white;
        .no-wrap();
      }
      .up-text {
        margin-top: 12px;
      }
      .down-text {
        margin-top: 2px;
        text-align: left;
      }
    }
    .header-nav-wrapper {
      position: absolute;
      height: 36px;
      width: 100%;
      left: 0;
      bottom: 0;
      .header-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 36px;
        box-sizing: border-box;
        border-top: ~'1rpx' solid @color-border;
        .nav-item {
          position: relative;
          flex: 1 1 auto;
          height: 100%;
          text-align: center;
          font-size: 0;
          box-sizing: border-box;
          &:not(:last-child)::before {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background: @color-border;
          }
          &.active {
            .inverted-triangle(#ffa89f);
            .nav-item-text {
              color: @color-deep-white;
            }
          }
          .nav-item-text {
            height: 36px;
            line-height: 36px;
            color: @color-border;
            font-size: @font-size-medium;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
</style>
