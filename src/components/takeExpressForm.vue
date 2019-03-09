<template>
  <div class="form">
    <input-item beforeText="姓 名"
                placeholder="请输入姓名"
                type="text"
                ref="takeNameInput"
                :validate="nameValidate"
                :value="takeForm.name"
                @changText="setTakeFormItem('name',$event)">
    </input-item>
    <input-item beforeText="宿 舍"
                placeholder="请输入宿舍号 格式如88-206"
                type="text"
                ref="takeDormInput"
                :validate="dormNumValidate"
                :value="takeForm.dorm"
                @changText="setTakeFormItem('dorm',$event)">
    </input-item>
    <input-item beforeText="手 机"
                placeholder="请输入正确的手机号"
                type="number"
                ref="takePhoneInput"
                :value="takeForm.phone"
                :validate="phoneValidate"
                @changText="setTakeFormItem('phone',$event)">
    </input-item>
    <input-item beforeText="学 号"
                placeholder="请输入正确的学号"
                ref="takeStudentNumInput"
                type="number"
                :value="takeForm.studentNum"
                @changText="setTakeFormItem('studentNum',$event)">
    </input-item>
    <TextareaItem firstText="信 息"
                  secondText="粘贴板:"
                  placeholder="请将收到的快递信息复制粘贴于此框"
                  ref="takeInfoTextarea"
                  @changText="setTakeFormItem('info',$event)">
    </TextareaItem>
  </div>
</template>

<script type="text/ecmascript-6">
  import InputItem from './inputItem.vue'
  import TextareaItem from './textareaItem.vue'

  import {
    showToast,
    nameValidate,
    dormNumValidate,
    phoneValidate,
    dateValidate,
    timeValidate
  } from '../utils/index'

  export default{
    data(){
      return {
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
      }
    },
    methods: {
      setTakeFormItem(key, val){
        this.$set(this.takeForm, key, val)
      },
      clear(){
        this.takeForm = {
          name: '',
          dorm: '',
          phone: '',
          studentNum: '',
          info: ''
        }
        this.$refs.takeNameInput.clear()
        this.$refs.takeDormInput.clear()
        this.$refs.takePhoneInput.clear()
        this.$refs.takeStudentNumInput.clear()
        this.$refs.takeInfoTextarea.clear()
      },
      check(){
        if (!this.takeForm.name) {
          showToast("请您填写正确的名字!")
          return false
        }
        if (!this.takeForm.dorm) {
          showToast("请您填写正确的宿舍号!")
          return false
        }
        if (!this.takeForm.phone) {
          showToast("请您填写正确的手机号码!")
          return false
        }
        if (!this.takeForm.studentNum) {
          showToast("请您填写正确的学号!")
          return false
        }
        if (!this.deliveryForm.info) {
          showToast("请您填写正确的信息!")
          return false
        }
        return true
      },
      getData(){
        return this.takeForm
      }
    },
    components: {
      InputItem,
      TextareaItem
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import '../common/less/variable';

  .form {
    padding: 0 @page-bd-spacing;
    width: 100%;
    box-sizing: border-box;
  }
</style>
