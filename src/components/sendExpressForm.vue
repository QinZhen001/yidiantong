<template>
  <div class="form">
    <input-item beforeText="姓 名"
                placeholder="请输入姓名"
                type="text"
                ref="deliverNameInput"
                :value="deliveryForm.name"
                :validate="nameValidate"
                @changText="setDeliveryFormItem('name',$event)">
    </input-item>
    <input-item beforeText="宿 舍"
                placeholder="请输入宿舍号 格式如:47-206"
                type="text"
                ref="deliverDormInput"
                :value="deliveryForm.dorm"
                :validate="dormNumValidate"
                @changText="setDeliveryFormItem('dorm',$event)">
    </input-item>
    <input-item beforeText="手 机"
                placeholder="请输入正确的手机号"
                type="number"
                ref="deliverPhoneInput"
                :value="deliveryForm.phone"
                :validate="phoneValidate"
                @changText="setDeliveryFormItem('phone',$event)">
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
                @changText="setDeliveryFormItem('weight',$event)">
    </input-item>
  </div>
</template>

<script type="text/ecmascript-6">
  import InputItem from './inputItem.vue'

  import {
    showToast,
    nameValidate,
    dormNumValidate,
    phoneValidate,
    dateValidate,
    timeValidate
  } from '../utils/index'

  export default{
    props: {
      expressName: {
        type: String
      }
    },
    data(){
      return {
        deliveryForm: {
          expressName: '',
          name: '',
          dorm: '',
          phone: '',
          date: '',
          time: '',
          weight: ''
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
      setDeliveryFormItem(key, val){
//        console.log('val', val)
        this.$set(this.deliveryForm, key, val)
      },
      clear(){
        this.deliveryForm = {
          expressName: '',
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
      check(){
        if (!this.deliveryForm.name) {
          showToast("请您填写正确的名字!")
          return false
        }
        if (!this.deliveryForm.dorm) {
          showToast("请您填写正确的宿舍号!")
          return false
        }
        if (!this.deliveryForm.phone) {
          showToast("请您填写正确的手机号码!")
          return false
        }
        if (!this.deliveryForm.date) {
          showToast("请您填写正确的日期!")
          return false
        }
        if (!this.deliveryForm.time) {
          showToast("请您填写正确的时间!")
          return false
        }
        if (!this.deliveryForm.weight) {
          showToast("请您填写正确的估重量!")
          return false
        }
        return true
      },
      getData(){
        return this.deliveryForm
      }
    },
    watch: {
      expressName: {
        handler: function (newVal, oldVal) {
          this.deliveryForm.expressName = newVal
        },
        immediate: true
      }
    },
    components: {
      InputItem
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
