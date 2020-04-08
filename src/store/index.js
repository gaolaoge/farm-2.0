import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: {
      name: 'User Name',
      imgUrl: require('@/assets/userImg.png'),
      imgUrlMini: require('@/assets/userImgMini.png'),
      token: '1234567890',
      balance: '26.23',
      grade: '铂金会员'
    },
    login: false
  },
  getter: {

  },
  mutations: {
    changeLogin(state,val){
      state.login = val
    }
  },
  actions: {

  }
})
