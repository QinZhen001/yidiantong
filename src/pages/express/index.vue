<template>
  <div class="express-page">
    <common-header
      upText="西门快递 (B&W正装代理点)"
      downText="营业时间: 8:30 ─ 22:00"
      :navItems="['寄快递','取快递']"
      @changeNav="changeNav">
    </common-header>
    <div class="express-delivery" v-if="showIndex===0">
      <div class="agreement-wrapper">
        <agreement text="我愿意遵守邑点通"
                   protocol="<快递服务协议>"
                   url="/pages/protocol/main"
                   :isAgree="hasAgreeServiceProtocol"
                   @checkedChange="checkedChange('hasAgreeServiceProtocol',$event)">
        </agreement>
      </div>
      <div class="express-btn"
           v-for="(item,index) in expresses"
           :key="index"
           @click.stop="chooseExpress(index)">
        <div class="btn-content">
          <img :src="item.imgUrl" alt="">
        </div>
      </div>
      <div class="phone-wrapper">
        <img class="phone" src="/static/img/phone.png" @click.stop="phoneCall">
      </div>
    </div>
    <div class="delivery-fill" v-if="showIndex===2">
      <div class="header-wrapper">
        <img-header title="预约寄件"></img-header>
      </div>
      <send-express-form
        :expressName="expressName"
        ref="sendExpressForm">
      </send-express-form>
      <div class="agreement-wrapper">
        <agreement text="我同意邑点通"
                   protocol="<上门服务费用条款>"
                   url="/pages/protocol/main"
                   :isAgree="hasAgreeDoorProtocol"
                   @checkedChange="checkedChange('hasAgreeDoorProtocol',$event)">
        </agreement>
      </div>
      <div class="button-wrapper">
        <common-button
          padding="30"
          text="确认"
          @clickBtn="confirmDeliveryForm"></common-button>
      </div>
    </div>
    <div class="express-take" v-if="showIndex===1">
      <div class="header-wrapper">
        <img-header title="取件人信息"></img-header>
      </div>
      <take-express-form
        ref="takeExpressForm">
      </take-express-form>
      <div class="button-wrapper">
        <common-button
          padding="30"
          text="到店自取"
          @clickBtn="navToBySelf">
        </common-button>
        <common-button
          padding="30"
          text="送达宿舍"
          @clickBtn="navToDorm">
        </common-button>
      </div>
    </div>
    <div class="express-take-by-self" v-if="showIndex===3">
      <div class="header-wrapper">
        <img-header title="到店自取"></img-header>
      </div>
      <div class="form">
        <div class="form-item">
          <div class="item-left">
            <text class="text" space='emsp'>说 明:</text>
          </div>
          <div class="item-right">
            <span class="text">快递到店后，我们会以短信方式通知您，</span>
            <span class="text">请当天到店自取<span class="red-text">(玫瑰园XXX店)</span>，</span>
            <span class="text">否则会产生保管费用。</span>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <text class="text" space='emsp'>费 用:</text>
          </div>
          <div class="item-right">
            <span class="text">当天到店自取支付<span class="red-text">1元</span></span>
            <span class="text">保管费<span class="red-text">1元/天</span> </span>
          </div>
        </div>
        <textarea-item firstText="留 言:"></textarea-item>
        <div class="agreement-wrapper">
          <agreement text="我同意邑点通"
                     protocol="<代拿服务费用条款>"
                     url="/pages/protocol/main"
                     :isAgree="hasAgreeTakeProtocol"
                     @checkedChange="checkedChange('hasAgreeTakeProtocol',$event)">
          </agreement>
        </div>
      </div>
      <div class="button-wrapper">
        <common-button
          padding="30"
          text="确定"
          @clickBtn="confirmTakeBySelf">
        </common-button>
      </div>
    </div>
    <div class="express-take-to-dorm" v-if="showIndex===4">
      <div class="header-wrapper">
        <img-header title="送达宿舍"></img-header>
      </div>
      <div class="form">
        <div class="form-item">
          <div class="item-left">
            <text class="text" space='emsp'>费 用:</text>
          </div>
          <div class="item-right">
            <span class="text">北区宿舍及附近：2-3元</span>
            <span class="text">西区/玫瑰园宿舍及附近：1-2元</span>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <text class="text" space='emsp'>备 注:</text>
          </div>
          <div class="item-right">
            <span class="text">快递重量要求在3kg以内</span>
            <span class="text">3kg以上请在留言区说明</span>
          </div>
        </div>
        <textarea-item firstText="留 言:"></textarea-item>
        <div class="agreement-wrapper">
          <agreement text="我同意邑点通"
                     protocol="<代拿服务费用条款>"
                     url="/pages/protocol/main"
                     :isAgree="hasAgreeTakeProtocol"
                     @checkedChange="checkedChange('hasAgreeTakeProtocol',$event)">
          </agreement>
        </div>
      </div>
      <div class="button-wrapper">
        <common-button
          @clickBtn="confirmTakeToDorm"
          padding="30"
          text="确定">
        </common-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CommonHeader from '../../components/commonHeader.vue'
  import Agreement from '../../components/agreement.vue'
  import ImgHeader from '../../components/imgHeader.vue'
  import InputItem from '../../components/inputItem.vue'
  import TextareaItem from '../../components/textareaItem.vue'
  import CommonButton from '../../components/commonButton.vue'
  import SendExpressForm from '../../components/sendExpressForm.vue'
  import TakeExpressForm from '../../components/takeExpressForm.vue'
  import {showToast, showDialog,} from '../../utils/index'
  import {phoneNum} from '../../common/constant/constant'
  import {userInfoMixin} from '../../common/mixin/mixin'

  const DELIVERY_SHOW = 0, //寄快递展示
    EXPRESS_TAKE = 1, //取快递基本信息填写
    DELIVERY_FILL = 2, //寄快递基本信息填写
    EXPRESS_TAKE_BY_SELF = 3,  //取快递 到店自取
    EXPRESS_TAKE_TO_DORM = 4;  //取快递 送达快递

  const EXPRESS_ZTO = '中通快递', EXPRESS_ANNENG = '安能快递'

  const db = wx.cloud.database()

  let takeForm = {}

  export default{
    mixins: [userInfoMixin],
    onUnload(){
      this.hasAgreeServiceProtocol = false
      this.hasAgreeDoorProtocol = false
      this.hasAgreeTakeProtocol = false
    },
    data(){
      return {
        expresses: [
          {name: EXPRESS_ZTO, imgUrl: '/static/img/zhongtong.png'},
          {name: EXPRESS_ANNENG, imgUrl: '/static/img/annneng.png'}
        ],
        curExpressName: EXPRESS_ZTO,
        hasAgreeServiceProtocol: false,
        hasAgreeDoorProtocol: false,
        hasAgreeTakeProtocol: false,
        showIndex: DELIVERY_SHOW,
      }
    },
    methods: {
      chooseExpress(index){
        if (!this.hasAgreeServiceProtocol) {
          showToast("请您先同意快递服务协议!")
          return
        }
        this.showIndex = DELIVERY_FILL
        this.expressName = this.expresses[index].name
      },
      checkedChange(key, newBool){
        this[key] = newBool
      },
      confirmDeliveryForm(){
        if (!this.hasAgreeDoorProtocol) {
          showToast("请您先同意上门服务费用条款!")
          return
        }
        if (this.$refs.sendExpressForm.check()) {
          this.submitDeliveryForm()
        }
      },
      submitDeliveryForm(){
        let formData = this.$refs.sendExpressForm.getData()
        //action行为 send代表寄快递 take代表取快递 (取快递时 增加字段takeAction取值 '到店自取' '送达宿舍')
        db.collection('express').add({
          data: {
            ...formData,
            expressName: this.curExpressName,
            action: 'send',
            nickName: this.userInfo.nickName //nickName作为查找的唯一标识
          }
        }).then(res => {
          showToast("成功!", 'success')
          this.$refs.sendExpressForm.clear()
        })
      },
      changeNav(index){
        this.showIndex = index
      },
      navToBySelf(){
        if (this.$refs.takeExpressForm.check()) {
          takeForm = this.$refs.takeExpressForm.getData()
          this.showIndex = EXPRESS_TAKE_BY_SELF
        }
      },
      navToDorm(){
        if (this.$refs.takeExpressForm.check()) {
          takeForm = this.$refs.takeExpressForm.getData()
          this.showIndex = EXPRESS_TAKE_TO_DORM
        }
      },
      confirmTakeBySelf(){
        if (!this.hasAgreeTakeProtocol) {
          showToast('请您先同意代拿服务费用条款!')
          return
        }
        showDialog('',
          "快件到店后，我们会以短信方式通知您，请当天到店收取（玫瑰园BW正装店），否则产生额外保管费！",
          false,
          "我知道了")
        this.submitTakeExpressForm('到店自取')
      },
      confirmTakeToDorm(){
        if (!this.hasAgreeTakeProtocol) {
          showToast('请您先同意代拿服务费用条款!')
          return
        }
        this.submitTakeExpressForm('送达宿舍')
      },
      submitTakeExpressForm(takeAction){
        db.collection('express').add({
          data: {
            ...takeForm,
            action: 'take', //取快递
            takeAction: takeAction,
            nickName: this.userInfo.nickName //nickName作为查找的唯一标识
          }
        }).then(res => {
          showToast("成功!", 'success')
          takeForm = {}
        })
      },
      phoneCall(){
        wx.makePhoneCall({
          phoneNumber: phoneNum
        })
      },
    },
    watch: {},
    components: {
      CommonHeader,
      Agreement,
      ImgHeader,
      InputItem,
      TextareaItem,
      CommonButton,
      SendExpressForm,
      TakeExpressForm
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';
  @import '../../common/less/mixin1';

  .express-page {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .express-delivery {
      position: relative;
      .agreement-wrapper {
        margin-top: 20px;
        margin-bottom: 40px;
        text-align: center;
      }
      .express-btn {
        margin-top: 25px;
        font-size: 0;
        text-align: center;
        &:first-child {
          margin-top: 0;
        }
        .btn-content {
          display: inline-block;
          width: 260px;
          height: 60px;
          box-sizing: border-box;
          border: 1px solid @color-border;
          border-radius: 10px;
          .common-shadow();
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .phone-wrapper {
        position: absolute;
        bottom: -98px;
        right: 20px;
        width: 54px;
        height: 54px;
        box-sizing: border-box;
        border-radius: 50%;
        .common-shadow();
        .phone {
          width: 100%;
          height: 100%;
        }
      }
    }
    .delivery-fill {
      .agreement-wrapper {
        padding: 0 @page-bd-spacing;
      }
      .button-wrapper {
        margin-top: 5px;
        width: 100%;
        text-align: center;
      }
    }
    .express-take {
      .button-wrapper {
        margin-top: 20px;
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }
    .express-take-by-self, .express-take-to-dorm {
      .form-item {
        margin-top: 6px;
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 0;
        overflow: hidden;
        &:not(:first-child) {
          margin: 10px 0;
        }
        .item-left {
          flex: 0 0 auto;
          align-self: flex-start;
          font-size: 0;
        }
        .item-right {
          flex: 1 1 auto;
          margin-left: 10px;
          display: inline-block;
          font-size: 0;
        }
        .text {
          display: block;
          color: @color-middle-black;
          font-size: @font-size-medium;
          letter-spacing: ~"1rpx";
          .red-text {
            color: @color-font-red;
            letter-spacing: ~"1rpx";
          }
        }
      }
      .button-wrapper {
        margin-top: 10px;
        width: 100%;
        text-align: center;
      }
    }
    .header-wrapper {
      position: relative;
      height: 56px;
      width: 100%;
    }
    .form {
      padding: 0 @page-bd-spacing;
      width: 100%;
      box-sizing: border-box;
    }
    .agreement-wrapper {
      margin: 5px 0;
      width: 100%;
      font-size: 0;
      box-sizing: border-box;
    }
  }
</style>
