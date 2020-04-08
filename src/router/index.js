import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login.vue'),
      beforeEnter: (to,from,next) => {
        next()
      }
    },
    {
      path: '/task',
      name: 'task',
      component: () => import('@/components/task.vue')
    },
    {
      path: '/assets',
      name: 'assets',
      component: () => import('@/components/assets.vue')
    },
    {
      path: '/bill',
      name: 'bill',
      component: () => import('@/components/bill.vue')
    },
    {
      path: '/upTop',
      name: 'upTop',
      component: () => import('@/components/upTop.vue')
    }
  ]
})
