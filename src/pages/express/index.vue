<template>
  <div class="express-page">
    <common-header
      upText="西门快递 (B&W正装代理点)"
      downText="营业时间: 8:30 ─ 22:00"
      :navItems="['寄快递','取快递']"
      @changeNav="changeNav">
    </common-header>
    <div class="express-delivery" v-if="showFlag===0">
      <div class="agreement-wrapper">
        <agreement text="我愿意遵守邑点通"
                   protocol="<快递服务协议>"
                   url="/pages/protocol/main"
                   :isAgree="isAgreeService"
                   @checkedChange="checkedChange('isAgreeService',$event)">
        </agreement>
      </div>
      <div class="zto-express">
        <div class="button" @click.stop="chooseExpress('zto')">
          <img src="/static/img/zhongtong.png" alt="">
        </div>
      </div>
      <div class="anen-express">
        <div class="button" @click.stop="chooseExpress('anneng')">
          <img src="/static/img/annneng.png" alt="">
        </div>
      </div>
      <div class="phone-wrapper">
        <img class="phone" src="/static/img/phone.png" @click.stop="phoneCall">
      </div>
    </div>
    <div class="delivery-fill" v-if="showFlag===2">
      <div class="header-wrapper">
        <img-header title="预约寄件"></img-header>
      </div>
      <div class="form">
        <input-item beforeText="姓 名"
                    placeholder="请输入姓名"
                    type="text"
                    ref="deliverNameInput"
                    :value="deliveryForm.name"
                    :validate="nameValidate"
                    @changText="getdeliveryFormResult('name',$event)">
        </input-item>
        <input-item beforeText="宿 舍"
                    placeholder="请输入宿舍号 格式如:47-206"
                    type="text"
                    ref="deliverDormInput"
                    :value="deliveryForm.dorm"
                    :validate="dormNumValidate"
                    @changText="getdeliveryFormResult('dorm',$event)">
        </input-item>
        <input-item beforeText="手 机"
                    placeholder="请输入正确的手机号"
                    type="number"
                    ref="deliverPhoneInput"
                    :value="deliveryForm.phone"
                    :validate="phoneValidate"
                    @changText="getdeliveryFormResult('phone',$event)">
        </input-item>
        <picker mode="date" @change="changeDate">
          <input-item beforeText="日 期"
                      :value="deliveryForm.date">
          </input-item>
        </picker>
        <picker mode="time" @change="changeTime">
          <input-item beforeText="时 间"
                      :value="deliveryForm.time">
          </input-item>
        </picker>
        <input-item beforeText="估重量"
                    afterText="kg"
                    ref="deliverWeightInput"
                    type="digit"
                    width="80"
                    :value="deliveryForm.weight"
                    @changText="getdeliveryFormResult('weight',$event)">
        </input-item>
        <div class="agreement-wrapper">
          <agreement text="我同意邑点通"
                     protocol="<上门服务费用条款>"
                     url="/pages/protocol/main"
                     :isAgree="isAgreeToDoor"
                     @checkedChange="checkedChange('isAgreeToDoor',$event)">
          </agreement>
        </div>
        <common-button text="确认下单" @clickBtn="comfirmDelivery"></common-button>
      </div>
    </div>
    <div class="express-take" v-if="showFlag===1">
      <div class="header-wrapper">
        <img-header title="取件人信息"></img-header>
      </div>
      <div class="form">
        <input-item beforeText="姓 名"
                    placeholder="请输入姓名"
                    type="text"
                    ref="takeNameInput"
                    :validate="nameValidate"
                    :value="takeForm.name"
                    @changText="getTakeFormResult('name',$event)">
        </input-item>
        <input-item beforeText="宿 舍"
                    placeholder="请输入宿舍号 格式如88-206"
                    type="text"
                    ref="takeDormInput"
                    :validate="dormNumValidate"
                    :value="takeForm.dorm"
                    @changText="getTakeFormResult('dorm',$event)">
        </input-item>
        <input-item beforeText="手 机"
                    placeholder="请输入正确的手机号"
                    type="number"
                    ref="takePhoneInput"
                    :value="takeForm.phone"
                    :validate="phoneValidate"
                    @changText="getTakeFormResult('phone',$event)">
        </input-item>
        <input-item beforeText="学 号"
                    placeholder="请输入正确的学号"
                    type="number"
                    :value="takeForm.studentNum"
                    @changText="getTakeFormResult('studentNum',$event)">
        </input-item>
        <TextareaItem firstText="信 息"
                      secondText="粘贴板:"
                      placeholder="请将收到的快递信息复制粘贴于此框"
                      @changText="getTakeFormResult('info',$event)">
        </TextareaItem>
        <div class="button-wrapper">
          <common-button text="到店自取" @clickBtn="navToBySelf"></common-button>
        </div>
        <div class="button-wrapper">
          <common-button text="送达宿舍" @clickBtn="navToDorm"></common-button>
        </div>
      </div>
    </div>
    <div class="express-take-by-self" v-if="showFlag===3">
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
            <span class="text">请当天到店自取<span class="red-text">(玫瑰园BW正装店)</span>，</span>
            <span class="text">否则会产生保管费用。</span>
          </div>
        </div>
        <div class="form-item">
          <div class="item-left">
            <text class="text" space='emsp'>费 用:</text>
          </div>
          <div class="item-right">
            <span class="text">当天到店自取支付<span class="red-text">1元</span></span>
            <span class="text">保管费<span class="red-text">3元/天</span> </span>
          </div>
        </div>
        <textarea-item firstText="留 言:"></textarea-item>
        <div class="agreement-wrapper">
          <agreement text="我同意邑点通"
                     protocol="<代拿服务费用条款>"
                     url="/pages/protocol/main"
                     @checkedChange="checkedChange">
          </agreement>
        </div>
      </div>
      <div class="button-wrapper">
        <common-button text="确定下单" @clickBtn="comfirmTakeBySelf"></common-button>
      </div>
    </div>
    <div class="express-take-to-dorm" v-if="showFlag===4">
      <div class="header-wrapper">
        <img-header title="送达宿舍"></img-header>
      </div>
      <div class="form">
        <div class="form-item">
          <div class="item-left">
            <text class="text" space='emsp'>费 用:</text>
          </div>
          <div class="item-right">
            <span class="text">北区宿舍及附近：3-5元</span>
            <span class="text">西区/玫瑰园宿舍及附近：3-4元</span>
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
                     @checkedChange="checkedChange">
          </agreement>
        </div>
      </div>
      <div class="button-wrapper">
        <common-button text="确定下单"></common-button>
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
  import {
    showToast, showDialog, nameValidate, dormNumValidate, phoneValidate, dateValidate, timeValidate
  } from '../../utils/index'
  import {phoneNum} from '../../common/constant/constant'

  const DELIVERY_SHOW = 0, //寄快递展示
    EXPRESS_TAKE = 1, //取快递基本信息填写
    DELIVERY_FILL = 2, //寄快递基本信息填写
    EXPRESS_TAKE_BY_SELF = 3,  //取快递 到店自取
    EXPRESS_TAKE_TO_DORM = 4;  //取快递 送达快递

  const EXPRESS_ZTO = 'zto', EXPRESS_ANNENG = 'anneng'


  export default{
    data()
    {
      return {
        isAgreeService: false,
        isAgreeToDoor: false,
        showFlag: DELIVERY_SHOW,
        deliveryForm: {
          express: '',
          name: '',
          dorm: '',
          phone: '',
          date: '',
          time: '',
          weight: ''
        },
        takeForm: {
          name: '',
          dorm: '',
          phone: '',
          studentNum: '',
          info: ''
        },
        nameValidate: nameValidate,
        dormNumValidate: dormNumValidate,
        phoneValidate: phoneValidate,
        dateValidate: dateValidate,
        timeValidate: timeValidate
      }
    },
    methods: {
      changeDate(e){
        this.deliveryForm.date = e.mp.detail.value
      },
      changeTime(e){
        this.deliveryForm.time = e.mp.detail.value
      },
      chooseExpress(express){
        if (!this.isAgreeService) {
          showToast("请您先同意快递服务协议!")
          return
        }
        this.showFlag = DELIVERY_FILL
        this.deliveryForm.express = express
      },
      checkedChange(key, newBool){
        this[key] = newBool
      },
      comfirmTakeBySelf(){
        showDialog('', "快件到店后，我们会以短信方式通知您，请当天到店收取（玫瑰园BW正装店），否则产生额外保管费！", false, "我知道了")
      },
      comfirmDelivery(){
        if (!this.isAgreeToDoor) {
          showToast("请您先同意上门服务费用条款!")
          return
        }
        console.log('下单成功', this.deliveryForm)
        this.clearDeliveryForm()
      },
      clearDeliveryForm(){
        this.deliveryForm = {
          express: '',
          name: '',
          dorm: '',
          phone: '',
          date: '',
          time: '',
          weight: ''
        }
        this.$refs.deliverNameInput.clear()
        this.$refs.deliverDormInput.clear()
        this.$refs.deliverPhoneInput.clear()
        this.$refs.deliverWeightInput.clear()
      },
      changeNav(index){
        this.showFlag = index
      },
      navToBySelf(){
        this.showFlag = EXPRESS_TAKE_BY_SELF
        console.log(this.deliveryForm, this.takeForm)
      },
      navToDorm(){
        this.showFlag = EXPRESS_TAKE_TO_DORM
        console.log(this.deliveryForm, this.takeForm)
      },
      phoneCall(){
        wx.makePhoneCall({
          phoneNumber: phoneNum
        })
      },
      getdeliveryFormResult(key, val){
        this.$nextTick(() => {
          this.$set(this.deliveryForm, key, val)
        })
        console.log('deliveryForm', this.deliveryForm, this.takeForm)
      },
      getTakeFormResult(key, val){
        this.$nextTick(() => {
          this.$set(this.takeForm, key, val)
        })
        console.log('this.takeForm', this.deliveryForm, this.takeForm)
      }
    },
    watch: {
      showFlag(newVal, oldVal){
        if (newVal === EXPRESS_TAKE && oldVal === DELIVERY_FILL) {
          //从寄快递填写 跳转到 取快递基本信息填写
          this.$nextTick(() => {
            this.deliveryForm = {}
            this.takeForm = {}
            this.$refs.takeNameInput.clear()
            this.$refs.takeDormInput.clear()
            this.$refs.takePhoneInput.clear()
          })
        } else if (newVal === DELIVERY_SHOW && oldVal === EXPRESS_TAKE) {
          //取快递基本信息填写 跳转到  寄快递展示
          this.deliveryForm = {
            express: '',
            name: '',
            dorm: '',
            phone: '',
            date: '',
            time: '',
            weight: ''
          }
          this.takeForm = {
            name: '',
            dorm: '',
            phone: '',
            studentNum: '',
            info: ''
          }
        }
      }
    },
    components: {
      CommonHeader,
      Agreement,
      ImgHeader,
      InputItem,
      TextareaItem,
      CommonButton
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
      .zto-express, .anen-express {
        font-size: 0;
        text-align: center;
        .button {
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
      .anen-express {
        margin-top: 25px;
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
    }
    .express-take {
      .button-wrapper {
        margin-top: 20px;
        display: inline-block;
        width: 50%;
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
        margin-top: 35px;
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
