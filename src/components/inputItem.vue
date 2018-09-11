<!--v-model does not support dynamic input types. Use v-if branches instead.-->
<!--所以根据判断type来显示不同的input-->
<!--input获取焦点会弹出键盘，影响date,time的输入，所以这种情况采取div模拟input-->
<!--v-model经常改变和开速删除时回到导致光标抖动 所以使用v-model.lazy-->
<template>
  <div class="input-item">
    <text class="text" :space=space>{{beforeText}}:</text>
    <input class="input"
           v-if="type==='text'"
           type="text"
           v-model.lazy="curValue"
           :style="{flex:'0 0 '+ width +'px'}"
           :confirm-type="confirmType"
           :placeholder="placeholder"
           :cursor-spacing="cursorSpacing"
           @blur="blur"/>
    <input class="input"
           v-else-if="type==='number'"
           type="number"
           v-model.lazy="curValue"
           :style="{flex:'0 0 '+ width +'px'}"
           :confirm-type="confirmType"
           :placeholder="placeholder"
           :cursor-spacing="cursorSpacing"
           @blur="blur"/>
    <input class="input"
           v-else-if="type==='digit'"
           type="digit"
           v-model.lazy="curValue"
           :style="{flex:'0 0 '+ width +'px'}"
           :confirm-type="confirmType"
           :placeholder="placeholder"
           :cursor-spacing="cursorSpacing"
           @blur="blur"/>
    <div class="simulate-input" v-else>
      {{value}}
    </div>
    <text class="text after-text" v-if="afterText">{{afterText}}</text>
  </div>
</template>

<script type="text/ecmascript-6">
  import {showToast} from '../utils/index'

  export default{
    props: {
      space: {
        type: String,
        default: 'emsp'
      },
      type: {
        //input 的类型 (有效值：text number idcard digit)
        type: String,
      },
      confirmType: {
        //设置键盘右下角按钮的文字，仅在type='text'时生效
        type: String,
        default: 'next'
      },
      beforeText: {
        type: String
      },
      afterText: {
        type: String
      },
      placeholder: {
        type: String
      },
      confirmHold: {
        //点击键盘右下角按钮时是否保持键盘不收起
        type: Boolean,
        default: false
      },
      cursorSpacing: {
        //指定光标与键盘的距离，单位 px
        type: Number,
        default: 10
      },
      width: {
        type: Number
      },
      value: {
        type: String
      },
      style: {
        type: Object
      },
      validate: {
        type: Function
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
//      prop是由父组件决定的，不应该在一个子组件内部改变prop，所以这里用curValue接收props中的value
        curValue: this.value,
      }
    },
    methods: {
      blur(e){
        console.log('blur', e.mp.detail.value)
        this.validateVal(e.mp.detail.value)
      },
      validateVal(val){
        if (!this.validate) {
          this.$emit('changText', val)
          return
        }
        if (this.validate(val)) {
          this.$emit('changText', val)
          return
        }
//      直接改curValue会失败，加上$nextTick就可以了
//      原因：猜想是因为v-model.lazy在blur中触发改变curValue 所以这里要在$nextTick中改变curValue
        this.$nextTick(() => {
          this.curValue = ""
        })
        this.$emit('changText', "")
        showToast(`请输入正确的${this.beforeText.replace(/\s*/g, '')}!`)
      },
      clear(){
        console.log('clear')
        this.curValue = ""
      }
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';

  .input-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: 42px;
    font-size: 0;
    .text {
      flex: 0 0 auto;
      color: @color-middle-black;
      font-size: @font-size-medium;
    }
    .after-text {
      margin-left: 5px;
    }
    .input, .simulate-input {
      flex: 1 1 auto;
      display: inline-block;
      margin-left: 10px;
      padding-left: 20px;
      line-height: 30px;
      height: 30px;
      color: @color-middle-black;
      font-size: @font-size-medium;
      background: #e8e8e8;
      border-radius: 10px;
    }
    .input-placeholder {
      font-size: @font-size-medium;
      color: @color-light-black;
    }
  }
</style>
