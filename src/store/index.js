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
      token: '',
      balance: '0.000',     // 余额
      payAmount: '0.000',   //
      goldCoins: '0.000',
      consumption: '0.00'
      // grade: '铂金会员'
    },
    login: false,
    zoneId: ''
  },
  getter: {

  },
  mutations: {
    changeLogin(s,val){
      s.login = val
    },
    changeUserName(s,val){
      s.user.name = val
    },
    changeUserBalance(s,val){
      s.user.balance = val
    },
    // changeToken(s,val){
    //   s.user.token = val
    // }
    changeZoneId(s,val){
      s.zoneId = val
    },
    changePayAmount(s,val){
      // 累计支付金额
      s.user.payAmount = val
    },
    changeGoldCoins(s,val){
      // 累计到账金币
      s.user.goldCoins = val
    },
    changeConsumption(s,val){
      // 累计消费金币
      s.user.consumption = val
    },
    // 操作 - 下载
    downloadFun(){

    },
    // 操作 - 删除
    deleteFun(){

    }
  },
  actions: {

  }
})
