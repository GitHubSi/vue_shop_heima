import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import Element from 'element-ui'

// 导入全局样式表
import './assets/css/global.css'

// 每一个组件都可以使用this.$http访问到axios
import axios from 'axios'
// 设置请求的根路径
axios.defaults.baseURL = 'http://www.ysqorz.top:8888/api/private/v1/'

axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
  // 最后必须return config
})
Vue.prototype.$http = axios

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
