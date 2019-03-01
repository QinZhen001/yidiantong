<template>
  <div class="release-info-page">
    <div class="release-header">
      <div class="header-center">
        <image class="header-img" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl"></image>
        <div class="header-name" v-if="userInfo.nickName">{{userInfo.nickName}}</div>
      </div>
      <div class="header-right">
        <common-button
          text="发布"
          :width="42"
          :showShadow="false"
          @clickBtn="releaseInfo">
        </common-button>
      </div>
    </div>
    <div class="release-body">
      <input-item beforeText="标 题"
                  placeholder="请输入正确的标题"
                  type="text"
                  :value="releaseForm.title"
                  @changText="getReleaseFormResult('title',$event)">
      </input-item>
      <input-item beforeText="微信号"
                  placeholder="方便他人一键复制"
                  type="text"
                  :value="releaseForm.title"
                  @changText="getReleaseFormResult('weChat',$event)">
      </input-item>
      <input-item beforeText="标 签"
                  placeholder="输入自定义标签(以空格隔开)"
                  type="text"
                  :value="releaseForm.title"
                  @changText="getReleaseFormResult('customTag',$event)">
      </input-item>
      <div class="picker-wrapper">
        <picker
          @change="chooseType"
          :value="index"
          :range="typeArray">
          <div class="picker">
            <text class="text" space='emsp'>类 型:</text>
            <div class="chose-text" v-if="releaseForm.type">{{releaseForm.type}}</div>
            <div class="chose-text" v-else>请选择类型</div>
          </div>
        </picker>
      </div>
      <textarea-item firstText="描 述:"
                     placeholder="留下详细的说明(包括时间，地点，金额等)"
                     height="90"
                     @changText="completeDesc">
      </textarea-item>
      <div class="img-upload-wrapper">
        <div class="img-wrapper"
             v-for="(url,index) in showImgUrls"
             :key="index">
          <image
            class="content-img"
            :src="url">
          </image>
          <image class="delete-img"
                 src="/static/img/icon_delete.png"
                 @click.stop="deletePic(index)">
          </image>
        </div>
        <image
          class="upload-img"
          @click.stop="choosePic"
          src="/static/img/upload.png">
        </image>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  import Divider from '../../components/divider.vue'
  import {showToast, md5} from '../../utils/index'
  import CommonButton from '../../components/commonButton.vue'
  import InputItem from '../../components/inputItem.vue'
  import TextareaItem from '../../components/textareaItem.vue'
  import {userInfoMixin} from '../../common/mixin/mixin'

  export default{
    mixins: [userInfoMixin],
    data(){
      return {
        releaseForm: {
          title: '', //标题
          description: '', //描述
          weChat: '', //微信号码
          type: '', //类型
          customTag: [], //自定义标签
          imgUrLs: [] //图片在云存储的地址
        },
        showImgUrls: [],//展示图片的地址
        typeArray: ['家教', '实习', '兼职', '交易', '其他'],
        isUploading: false
      }
    },
    methods: {
      releaseInfo(){
        if (this.checkInfo()) {
          console.log('this.releaseForm', this.releaseForm)
          const db = wx.cloud.database()
          db.collection('info').add({
            data: {
              nickName: this.userInfo.nickName,
              avatarUrl: this.userInfo.avatarUrl,
              title: this.releaseForm.title,
              description: this.releaseForm.description,
              weChat: this.releaseForm.weChat,
              type: this.releaseForm.type,
              customTag: this.releaseForm.customTag,
              imgUrls: this.releaseForm.imgUrLs,
              time: new Date()
            }
          }).then(res => {
            this.successRelease()
          })
        }
      },
      successRelease(){
        this.releaseForm.title = ''
        this.releaseForm.description = ''
        this.releaseForm.weChat = ''
        this.releaseForm.type = ''
        this.releaseForm.customTag = []
        this.releaseForm.imgUrLs = []
        showToast('信息成功发布!', 'success')
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      },
      checkInfo(){
        let str = ''
        if (!this.releaseForm.title) {
          str = '请填写正确的标题!'
        } else if (!this.releaseForm.description) {
          str = '请填写正确的描述!'
        } else if (!this.releaseForm.weChat) {
          str = '请填写正确的微信号码!'
        } else if (!this.releaseForm.type) {
          str = '请选择正确的类型!'
        } else if (this.isUploading) {
          str = '图片正在上传，请稍候发布!'
        }
        if (str) {
          showToast(str)
          return false
        }
        return true
      },
      getReleaseFormResult(key, val){
        if (key === 'customTag') {
          val = val.split(' ')
        }
        this.$nextTick(() => {
          this.$set(this.releaseForm, key, val)
        })
      },
      chooseType(event){
        console.log(event)
        let index = event.mp.detail.value
        this.releaseForm.type = this.typeArray[index]
      },
      completeDesc(text){
        this.releaseForm.description = text
      },
      choosePic(){
        wx.chooseImage({
          count: 3,
          success: (res) => {
            console.log(res.tempFilePaths)
            this.showImgUrls = res.tempFilePaths
            this.uploadPic(res.tempFilePaths)
          },
          fail: () => {
            showToast('选择图片失败! Ora')
          }
        })
      },
      uploadPic(imgUrls){
        imgUrls.forEach((url, index) => {
          this.isUploading = true
          wx.showNavigationBarLoading()
          let encrypt = md5(url)
          wx.cloud.uploadFile({
            cloudPath: `img/${encrypt}.png`,
            filePath: url, // 文件路径
          }).then(res => {
            console.log('res.fileID', res.fileID)
            this.releaseForm.imgUrLs.push(res.fileID)
            if (index === imgUrls.length - 1) {
              this.isUploading = false
              wx.hideNavigationBarLoading()
            }
          }).catch(error => {
            showToast('上传图片失败! Ora', error)
            this.isUploading = false
            wx.hideNavigationBarLoading()
          })
        })
      },
      deletePic(index){
//        console.log('index',index)
        this.releaseForm.imgUrLs.splice(index, 1)
        this.showImgUrls.splice(index, 1)
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    components: {
      Divider,
      CommonButton,
      InputItem,
      TextareaItem
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "../../common/less/variable";

  .release-info-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .release-header {
      position: relative;
      width: 100%;
      height: 50px;
      border-bottom: 1px solid @color-divider;
      margin-bottom: 10px;
      .header-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
        display: flex;
        align-items: center;
        .header-img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .header-name {
          margin-left: 10px;
          display: inline-block;
          font-size: @font-size-medium;
        }
      }
      .header-right {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .release-body {
      padding: 0 @page-bd-spacing;
      width: 100%;
      box-sizing: border-box;
      .picker-wrapper {
        height: 42px;
        width: 100%;
        .picker {
          display: flex;
          align-items: center;
          height: 42px;
          color: @color-middle-black;
          font-size: @font-size-medium;
          letter-spacing: ~"1rpx";
          .text {
            flex: 0 0 auto;
            display: inline-block;
          }
          .chose-text {
            flex: 0 0 auto;
            margin-left: 10px;
            padding: 3px 10px;
            display: inline-block;
            box-sizing: border-box;
            border: 1px solid @color-font-red;
            color: @color-font-red;
          }
        }
      }
      .img-upload-wrapper {
        margin-top: 15px;
        width: 100%;
        height: 100px;
        .upload-img, .img-wrapper {
          display: inline-block;
          width: 80px;
          height: 100%;
        }
        .img-wrapper {
          position: relative;
          margin-right: 20px;
          .content-img {
            width: 100%;
            height: 100%;
          }
          .delete-img {
            position: absolute;
            right: -9px;
            top: -9px;
            width: 18px;
            height: 18px;
            z-index: 1;
          }
        }
        .upload-img {
          border: 1px dashed #FFCE00;
        }
      }
    }
  }

</style>
