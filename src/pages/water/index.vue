<template>
  <div class="water">
    <common-header
      upText="SQ水店 (B&W正装代理点)"
      downText="营业时间: 8:30 ─ 12:00 14:40 ─ 23:00"
      :navItems="['掌上订水','余水查询']"
      @changeNav="changeNav">
    </common-header>
    <div class="water-reserve-wrapper" v-if="curNavIndex===0">
      <water-list
        :waterList="waterList"
        @chooseWater="chooseWater">
      </water-list>
      <div class="bottom-text">
        <div class="left">
          <p class="text">配送范围：</p>
        </div>
        <div class="right">
          <p class="text">五邑大学（请提前半天预约送水）</p>
          <p class="text">电话叫水请直接联系客服</p>
        </div>
      </div>
      <div class="button-wrapper">
        <common-button
          padding="26"
          text="我已选好"
          @clickBtn="clickConfirmQuery">
        </common-button>
        <div class="phone-wrapper">
          <img class="phone" src="/static/img/phone.png" @click.stop="makePhoneCall">
        </div>
      </div>
    </div>
    <div class="water-fill" v-if="curNavIndex===2">
      <div class="header-wrapper">
        <img-header title="个人信息"></img-header>
      </div>
      <div class="form">
        <input-item beforeText="姓 名"
                    type="text"
                    :validate="nameValidate"
                    @changText="setOrderFormItem('name',$event)"
                    :value="orderForm.name"
                    placeholder="请输入姓名">
        </input-item>
        <input-item beforeText="宿 舍"
                    type="text"
                    :validate="dormNumValidate"
                    @changText="setOrderFormItem('dorm',$event)"
                    :value="orderForm.dorm"
                    placeholder="请输入宿舍号 格式如:47-206">
        </input-item>
        <input-item beforeText="手 机"
                    type="text"
                    :validate="phoneValidate"
                    @changText="setOrderFormItem('phoneNum',$event)"
                    :value="orderForm.phoneNum"
                    placeholder="请输入正确的手机号">
        </input-item>
        <p class="text">稍后会有有工作人员联系您，请保持电话畅通</p>
      </div>
      <div class="button-wrapper">
        <common-button
          text="确定订水"
          padding="26"
          @clickBtn="confirmWater">
        </common-button>
      </div>
    </div>
    <div class="water-query" v-if="curNavIndex===1">
      <div class="header-wrapper">
        <img-header title="登录"></img-header>
      </div>
      <div class="form">
        <input-item beforeText="账 号"
                    type="text"
                    @changText="setUserFormItem('account',$event)"
                    :value="userForm.account"
                    placeholder="请输正确的账号">
        </input-item>
        <input-item beforeText="密 码"
                    type="text"
                    password="true"
                    @changText="setUserFormItem('password',$event)"
                    :value="userForm.password"
                    placeholder="请输入正确的密码">
        </input-item>
        <p class="text">SQ已经您的资料录入系统，账号为订购时向我们提供的手机号码，密码为宿舍号（如88-206）</p>
      </div>
      <div class="button-wrapper">
        <common-button
          padding="42"
          text="查询"
          @clickBtn="confirmQuery">
        </common-button>
      </div>
      <water-result
        :showResult="showQueryResult"
        :restBucket="restBucket"
        :restWater="restWater">
      </water-result>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CommonHeader from '../../components/commonHeader.vue'
  import CommonButton from '../../components/commonButton.vue'
  import ImgHeader from '../../components/imgHeader.vue'
  import InputItem from '../../components/inputItem.vue'
  import WaterList from '../../components/waterList.vue'
  import WaterResult from '../../components/waterResult.vue'
  //  import {request} from '../../api/request'
  import {phoneNum} from '../../common/constant/constant'
  import {
    getRandomNum,
    showToast, nameValidate,
    dormNumValidate, phoneValidate
  }  from '../../utils/index'
  import {userInfoMixin} from '../../common/mixin/mixin'
  import {waterList} from '../../common/constant/constant'

  //里面属性 title num price
  let choseWater = {}

  const WATER_RESERVE = 0, //展示掌上定水
    WATER_QUERY = 1,   //展示余水查询
    WATER_FILL = 2,   //展示填写定水信息
    MAX_LENGTH = 5; //查询结果长度

  const db = wx.cloud.database()

  export default{
    mixins: [userInfoMixin],
    data(){
      return {
        orderForm: {
          name: '',
          dorm: '',
          phoneNum: ''
        },
        userForm: {
          account: '',
          password: ''
        },
        nameValidate: nameValidate,
        dormNumValidate: dormNumValidate,
        phoneValidate: phoneValidate,
        curNavIndex: 0,
        waterList: waterList,
        showQueryResult: false,
        restWater: getRandomNum(10, 20), //余水
        restBucket: getRandomNum(1, 3) //余桶
      }
    },
    methods: {
      changeNav(index){
          this.curNavIndex = index
      },
      chooseWater(item){
        choseWater = item
      },
      clickConfirmQuery(){
        if (Object.keys(choseWater).length) {
//          console.log('choseWater', choseWater)
          this.curNavIndex = WATER_FILL
        } else {
          showToast('请您先选择套餐!')
        }
      },
      confirmWater(){
        if (this.checkedOrderForm()) {
          this.commitOrder()
        }
      },
      commitOrder(){
        db.collection('order').add({
          data: {
            shopList: [{...choseWater}],
            time: new Date(),
            nickName: this.userInfo.nickName,
            name: this.orderForm.name,
            dorm: this.orderForm.dorm,
            phoneNum: this.orderForm.phoneNum
          }
        }).then(res => {
          showToast('下单成功', 'success')
          this.clearData()
        })
      },
      clearData(){
        this.orderForm.name = ''
        this.orderForm.dorm = ''
        this.orderForm.phoneNum = ''
        this.waterList = waterList
        setTimeout(() => {
          this.curNavIndex = WATER_RESERVE
        }, 1000)
      },
      checkedOrderForm(){
        if (!this.orderForm.name) {
          showToast('请先输入姓名!')
          return false
        }
        if (!this.orderForm.dorm) {
          showToast('请先输入宿舍号!')
          return false
        }
        if (!this.orderForm.phoneNum) {
          showToast('请先输入手机号!')
          return false
        }
        return true
      },
      confirmQuery(){
        if (this.checkedAccount()) {
          this.showQueryResult = false
          showToast('正在查询ing...', 'loading')
          setTimeout(() => {
            this.restWater = getRandomNum(10, 20)//余水
            this.restBucket = getRandomNum(1, 3) //余桶
            this.showQueryResult = true
          }, 2000)
        }
      },
      checkedAccount(){
        if (!this.userForm.account) {
          showToast('请填写正确的账号!')
          return false
        }
        if (!this.userForm.password) {
          showToast('请填写正确的密码!')
          return false
        }
        return true
      },
      makePhoneCall(){
        wx.makePhoneCall({
          phoneNumber: phoneNum
        })
      },
      setOrderFormItem(key, val){
        this.$nextTick(() => {
          this.$set(this.orderForm, key, val)
        })
      },
      setUserFormItem(key, val){
        this.$nextTick(() => {
          this.$set(this.userForm, key, val)
        })
      }
    },
    watch: {
      curWaterIndex(newVal, oldVal){
        this.curWaterName = this.waterNames[newVal]
        this.curWaterPrice = getRandomNum(20, 25)
      }
    },
    computed: {},
    components: {
      CommonHeader,
      CommonButton,
      ImgHeader,
      InputItem,
      WaterList,
      WaterResult
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../../common/less/variable';
  @import '../../common/less/mixin1';

  .water {
    width: 100%;
    height: 100vh;
    background-color: @color-bg;
    .water-reserve-wrapper {
      position: relative;
      .bottom-text {
        display: flex;
        margin-top: 8px;
        margin-left: 95px;
        box-sizing: border-box;
        color: @color-middle-black;
        .left {
          flex: 0 0 auto;
          text-align: right;
        }
        .right {
          flex: 1 1 auto;
        }
        .text {
          .no-wrap();
          font-size: @font-size-small;
        }
      }
      .button-wrapper {
        padding-top: 8px;
        position: relative;
        text-align: center;
        .phone-wrapper {
          position: absolute;
          top: -10px;
          right: 25px;
          width: 40px;
          height: 40px;
          box-sizing: border-box;
          border-radius: 50%;
          .common-shadow();
          .phone {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .water-fill, .water-query {
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
      .text {
        margin-top: 5px;
        font-size: @font-size-small;
        color: @color-middle-black;
      }
      .button-wrapper {
        text-align: center;
        width: 100%;
      }
    }
    .water-fill {
      .button-wrapper {
        margin-top: 20px;
      }
    }
    .water-query {
      .text {
        text-indent: 20px;
      }
      .button-wrapper {
        margin-top: 10px;
      }
    }
  }
</style>
