import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
import echarts from 'echarts'
import elTableInfiniteScroll from 'el-table-infinite-scroll'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(elTableInfiniteScroll)

Vue.prototype.$echarts = echarts

const vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default vue
