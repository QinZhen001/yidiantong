<template>
  <div class="water">
    <common-header
      upText="SQ水店 (B&W正装代理点)"
      downText="营业时间: 8:30 ─ 12:00 14:40 ─ 23:00"
      :navItems="['掌上订水','余水查询']"
      @changeNav="changeNav">
    </common-header>
    <div class="water-reserve" v-if="curNavIndex===0">
      <div class="reserve-list">
        <div class="left">
          <div v-for="(item,index) in waterNames"
               :key="index"
               @click.stop="chooseWater(index)"
               class="left-item"
               :class="{active:index===curWaterIndex}">
            <p class="text">{{item}}</p>
          </div>
        </div>
        <div class="right">
          <div class="right-first-item">
            <img src="/static/img/tong_water.jpg" alt="">
            <div class="item-content">
              <p class="up-text">{{curWaterName}}</p>
              <p class="down-text">原价：{{curWaterPrice}}元/桶</p>
            </div>
          </div>
          <div class="right-item"
               v-for="(item,index) in waterList"
               :key="index"
               @click.stop="chooseProduct(index)">
            <img v-if="!item.chose" src="/static/img/icon_add.png" alt="">
            <img v-else src="/static/img/icon_choose.png" alt="">
            <div class="middle">
              <p class="up-text">【{{item.title}}】 {{item.description}}</p>
              <p class="down-text">
                平均{{item.averagePrice}}元/桶
              </p>
            </div>
            <p class="total-price">¥{{item.totalPrice}}</p>
          </div>
        </div>
      </div>
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
        <common-button text="确定下单" @clickBtn="comfirmWater"></common-button>
        <div class="phone-wrapper">
          <img class="phone" src="/static/img/phone.png" @click.stop="phoneCall">
        </div>
      </div>
    </div>
    <div class="water-fill" v-if="curNavIndex===2">
      <div class="header-wrapper">
        <img-header title="个人信息"></img-header>
      </div>
      <div class="form">
        <input-item beforeText="姓 名"
                    placeholder="请输入姓名">
        </input-item>
        <input-item beforeText="宿 舍"
                    placeholder="请输入宿舍号 格式如:47-206">
        </input-item>
        <input-item beforeText="手 机"
                    placeholder="请输入正确的手机号">
        </input-item>
        <p class="text">稍后会有有工作人员联系您，请保持电话畅通</p>
      </div>
      <div class="button-wrapper">
        <common-button text="确定定水"></common-button>
      </div>
    </div>
    <div class="water-query" v-if="curNavIndex===1">
      <div class="header-wrapper">
        <img-header title="登录"></img-header>
      </div>
      <div class="form">
        <input-item beforeText="账 号"
                    placeholder="请输入手机号码">
        </input-item>
        <input-item beforeText="密 码"
                    placeholder="请输入宿舍号 格式如88-206">
        </input-item>
        <p class="text">SQ已经您的资料录入系统，账号为订购时向我们提供的手机号码，密码为宿舍号（如88-206）</p>
      </div>
      <div class="button-wrapper">
        <common-button text="确认" @clickBtn="comfirmQuery"></common-button>
      </div>
      <div class="header-wrapper">
        <img-header title="查询结果"></img-header>
      </div>
      <div class="form" v-if="showQueryResult">
        <text class="result-text" space="ensp">余 水：   {{calcRestWater}}桶</text>
        <text class="result-text" space="ensp">余 桶：   {{calcRestBucket}}个</text>
        <p class="other-text">对查询结果有任何疑问，请联系我们。</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import CommonHeader from '../../components/commonHeader.vue'
  import CommonButton from '../../components/commonButton.vue'
  import ImgHeader from '../../components/imgHeader.vue'
  import InputItem from '../../components/inputItem.vue'
  //  import {request} from '../../api/request'
  import {phoneNum} from '../../common/constant/constant'
  import {getRandomNum}  from '../../utils/index'


  const WATER_RESERVE = 0, //展示掌上定水
    WATER_QUERY = 1,   //展示余水查询
    WATER_FILL = 2,   //展示填写定水信息
    MAX_LENGTH = 5; //查询结果长度

  export default{
    data(){
      return {
        curNavIndex: 0,
        waterNames: ['沁源山泉', '七翁井山泉', '古兜山矿泉', '加仑加', '华山泉', '怡宝'],
        waterList: [{
          "title": "A套餐",
          "chose": false,
          "description": " 20送18",
          "averagePrice": 10,
          "totalPrice": 616
        }, {
          "title": "B套餐",
          "chose": false,
          "description": " 21送11",
          "averagePrice": 11,
          "totalPrice": 373
        }, {
          "title": "C套餐",
          "chose": false,
          "description": " 25送16",
          "averagePrice": 14,
          "totalPrice": 528
        }, {
          "title": "D套餐",
          "chose": false,
          "description": " 23送13",
          "averagePrice": 16,
          "totalPrice": 367
        }],
        curWaterIndex: 0,
        curWaterName: '沁源山泉',
        curWaterPrice: 23,
        showQueryResult: false,
        restWater: 100, //余水
        restBucket: 2 //余桶
      }
    },
    created(){
      this.getWaterList()
    },
    methods: {
      changeNav(index){
        this.curNavIndex = index
      },
      getWaterList(){
//       const res = await request('/waterList')
//       this.waterList = res.data.waterList
        console.log('getWaterList')
        this.waterList = this.waterList.map(item => ({
          ...item,
          chose: false,
          averagePrice: getRandomNum(10, 20),
          totalPrice: getRandomNum(350, 650)
        }))
      },
      chooseProduct(index){
        console.log()
        this.waterList = this.waterList.map((item, curIndex) => {
          index === curIndex ? item.chose = true : item.chose = false
          return item
        })
      },
      chooseWater(index){
        this.curWaterIndex = index
        this.getWaterList()
      },
      comfirmWater(){
        this.curNavIndex = WATER_FILL
      },
      comfirmQuery(){
        this.showQueryResult = true
      },
      phoneCall(){
        wx.makePhoneCall({
          phoneNumber: phoneNum
        })
      }
    },
    watch: {
      curWaterIndex(newVal, oldVal){
        this.curWaterName = this.waterNames[newVal]
        this.curWaterPrice = getRandomNum(20, 25)
      }
    },
    computed: {
      calcRestWater(){
        const length = MAX_LENGTH - String(this.restWater).length
        let str = ''
        for (let i = 0; i < length; i++) {
          str += ' '
        }
        return this.restWater + str
      },
      calcRestBucket(){
        const length = MAX_LENGTH - String(this.restBucket).length
        let str = ''
        for (let i = 0; i < length; i++) {
          str += ' '
        }
        return this.restBucket + str
      }
    },
    components: {
      CommonHeader,
      CommonButton,
      ImgHeader,
      InputItem
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
    .water-reserve {
      position: relative;
      .reserve-list {
        display: flex;
        height: 278px;
        .left {
          display: flex;
          flex-direction: column;
          flex: 0 0 96px;
          width: 96px;
          height: 100%;
          box-sizing: border-box;
          border-right: ~"1rpx" solid @color-border;
          .left-item {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1 1 auto;
            width: 100%;
            box-sizing: border-box;
            border-bottom: ~"1rpx" solid @color-border;
            font-size: @font-size-medium;
            color: @color-middle-black;
            &.active {
              background-color: @color-bg-red;
              color: @color-deep-white
            }
            .text {
              flex: 1 1 auto;
              text-align: center;
            }
          }
        }
        .right {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          height: 100%;
          .right-item {
            flex: 1 1 auto;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            border-bottom: ~"1rpx" solid @color-border;
            &:active {
              background-color: #ddd;
            }
            img {
              margin: 0 12px 0 10px;
              flex: 0 0 20px;
              width: 20px;
              height: 20px;
            }
            .middle {
              flex: 1 1 auto;
              display: flex;
              flex-direction: column;
              justify-content: center;
              font-size: 0;
              .up-text, .down-text {
                flex: 1 1 auto;
                color: @color-middle-black;
                .no-wrap();
              }
              .up-text {
                font-size: @font-size-medium;
              }
              .down-text {
                padding-left: 15px;
                font-size: @font-size-small;
              }
            }
            .total-price {
              flex: 3 1 auto;
              font-size: @font-size-medium-x;
              color: @color-font-red;
              font-weight: 600;
            }
          }
          .right-first-item {
            display: flex;
            align-items: center;
            flex: 0 0 80px;
            height: 80px;
            box-sizing: border-box;
            border-bottom: ~"1rpx" solid @color-border;
            overflow: hidden;
            img {
              margin-left: 12px;
              flex: 0 0 56px;
              width: 56px;
              height: 62px;
            }
            .item-content {
              margin-left: 12px;
              flex: 1 1 auto;
              display: flex;
              flex-direction: column;
              justify-content: center;
              font-size: 0;
              .up-text, .down-text {
                flex: 1 1 auto;
                color: @color-middle-black;
                .no-wrap();
              }
              .up-text {
                letter-spacing: 1px;
                font-size: @font-size-medium;
                font-weight: 600;
              }
              .down-text {
                font-size: @font-size-small;
              }
            }
          }
        }
      }
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
    .water-fill {
      .text {
        margin-top: 5px;
        font-size: @font-size-small;
        color: @color-middle-black;
      }
      .button-wrapper {
        position: fixed;
        left: 0;
        bottom: 40px;
        width: 100%;
      }
    }
    .water-query {
      .text {
        margin-top: 5px;
        font-size: @font-size-small;
        color: @color-middle-black;
        text-indent: 20px;
      }
      .button-wrapper {
        padding-top: 6px;
        width: 100%;
      }
      .result-text {
        display: block;
        font-size: @font-size-medium-x;
        color: @color-middle-black;
      }
      .other-text {
        margin-top: 5px;
        font-size: @font-size-small;
        color: @color-middle-black;
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
  }
</style>
