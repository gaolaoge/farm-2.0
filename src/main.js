import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import echarts from 'echarts'
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import App from './App'
import router from './router'
import 'babel-polyfill'
import i18n from './lang'

// process.env.Mock && require('./mock')

Vue.config.devtools = true

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(elTableInfiniteScroll)

Vue.prototype.$echarts = echarts

const vue = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})

export default vue

