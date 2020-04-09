import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: {
      name: '',
      imgUrl: require('@/assets/userImg.png'),
      imgUrlMini: require('@/assets/userImgMini.png'),
      // token: '',
      // balance: '26.23',
      grade: '铂金会员'
    },
    login: false,
    zoneId: ''
  },
  getter: {

  },
  mutations: {
    changeLogin(state,val){
      state.login = val
    },
    changeUserName(state,val){
      state.user.name = val
    },
    // changeToken(state,val){
    //   state.user.token = val
    // }
    changeZoneId(state,val){
      state.zoneId = val
    }
  },
  actions: {

  }
})
