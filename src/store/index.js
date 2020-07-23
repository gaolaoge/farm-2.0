import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    user: {
      name: null,           // 昵称
      account: null,        // 账号
      phone: null,
      imgUrl: require('@/assets/userImg.png'),
      imgUrlMini: require('@/assets/userImgMini.png'),
      token: '',
      balance: '0.000',     // 余额
      payAmount: '0.000',   // 累计支付金币
      goldCoins: '0.000',   // 累计到账金币
      consumption: '0.00',  // 累计消费金币
      level: null,
      birthday: null,
      email: null,
      sex: 'nan',
    },
    login: false,
    zoneId: ''
  },
  getter: {},
  mutations: {
    changeLogin(s, val) {
      s.login = val
    },
    changeAccount(s, val) {
      s.user.account = val
    },
    changeName(s, val) {
      s.user.name = val
    },
    changeUserBalance(s, val) {
      s.user.balance = val
    },
    // changeToken(s,val){
    //   s.user.token = val
    // }
    changeZoneId(s, val) {
      s.zoneId = val
    },
    changePayAmount(s, val) {
      s.user.payAmount = val  // 累计支付金额
    },
    changeGoldCoins(s, val) {
      s.user.goldCoins = val  // 累计到账金币
    },
    changeConsumption(s, val) {
      s.user.consumption = val// 累计消费金币
    },
    changePhone(s, val) {
      s.user.phone = val
    },
    changeLevel(s, val) {
      s.user.level = val
    },
    changeBirthday(s, val) {
      s.user.birthday = val
    },
    changeEmail(s, val) {
      s.user.email = val
    },
    changeSex(s, val) {
      s.user.sex = val
    },
  },
  actions: {}
})
