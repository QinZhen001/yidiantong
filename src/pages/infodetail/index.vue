<template>
  <div class="detail-info-page">
    <div class="header">
      <image class="header-left-img" :src="info.avatarUrl"></image>
      <div class="header-left-text" v-if="info.nickName">{{info.nickName}}</div>
      <div class="header-right-text" v-if="info.time">
        {{info.time}}
      </div>
    </div>
    <divider></divider>
    <div class="title" v-if="info.title">
      {{info.title}}
    </div>
    <div class="description" v-if="info.description">
      {{info.description}}
    </div>
    <div class="wechat-wrapper" v-if="info.weChat">
      <image src="/static/img/icon_wechat.png"></image>
      <div class="wechat-text">{{info.weChat}}</div>
      <div class="btn-wrapper">
        <common-button
          text="获取微信号"
          :width="80"
          :showShadow="false"
          @clickBtn="copyWeChat">
        </common-button>
      </div>
    </div>
    <divider></divider>
    <div class="img-wrapper">
      <image class="img"
             v-for="(url,index) in info.imgUrls"
             :key="index"
             :src="url"
             @click.stop="previewImg(index)">
      </image>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Divider from '../../components/divider.vue'
  import CommonButton from '../../components/commonButton.vue'
  import {formatTime, showToast} from '../../utils/index'
  import {mapState} from 'vuex'

  export default{
    data(){
      return {}
    },
    mounted(){

    },
    methods: {
      copyWeChat(){
        wx.setClipboardData({
          data: this.info.weChat,
          success: (res) => {
            showToast('复制微信号成功', 'success')
          }
        })
      },
      previewImg(index){
        wx.previewImage({
          current: this.info.imgUrls[index], // 当前显示图片的http链接
          urls: this.info.imgUrls // 需要预览的图片http链接列表
        })
      }
    },
    computed: {
      ...mapState([
        'info'
      ])
    },
    components: {
      Divider,
      CommonButton
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "../../common/less/variable";

  .detail-info-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .header {
      display: flex;
      align-items: center;
      height: 50px;
      width: 100%;
      .header-left-img {
        margin-left: 10px;
        flex: 0 0 30px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: inline-block;
      }
      .header-left-text {
        margin-left: 10px;
        flex: 1 1 auto;
        font-size: @font-size-medium;
      }
      .header-right-text {
        margin-right: 10px;
        flex: 0 0 auto;
        font-size: @font-size-small;
        color: #888;
      }
    }
    .title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: black;
      font-size: @font-size-medium-x;
    }
    .description {
      padding: 10px 15px;
      font-size: @font-size-medium
    }
    .wechat-wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      height: 60px;
      image {
        margin-left: 15px;
        flex: 0 0 auto;
        width: 30px;
        height: 30px;
      }
      .wechat-text {
        margin-left: 10px;
        flex: 1 1 auto;
        color: #689F38;
        font-size: @font-size-medium-x;
      }
      .btn-wrapper {
        margin-right: 15px;
      }
    }
    .img-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 15px 10px;
      background-color: @color-bg;
      .img {
        flex: 0 0 150px;
        width: 150px;
        height: 200px;
      }
    }
  }
</style>
