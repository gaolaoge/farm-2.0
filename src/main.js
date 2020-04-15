import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
import echarts from 'echarts'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$echarts = echarts

const vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default vue
