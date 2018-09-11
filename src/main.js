import Vue from 'vue'
import App from './App'
import './common/css/reset.css'
import './common/css/weui.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()


