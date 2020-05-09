import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
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
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/components/demo.vue')
    },
    {
      path: '/rechargepage',
      name: 'rechargePage',
      component: () => import('@/components/rechargePage.vue')
    },
  ]
})

router.beforeResolve((to,from,next) => {
  if(to.path == '/login'){
    next()
  }else {
    if(sessionStorage.getItem('token')){
      next()
    }else {
      next({path: '/login'})
    }
  }
})

export default router
