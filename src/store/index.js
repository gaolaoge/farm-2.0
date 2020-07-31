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
      avatar: require('@/assets/userImg.png'),  // 头像
      token: '',
      balance: '0.000',     // 金币余额
      haveCapacity: '0.000',// 剩余容量
      payAmount: '0.000',   // 累计支付金币
      goldCoins: '0.000',   // 累计到账金币
      consumption: '0.00',  // 累计消费金币
      level: null,
      birthday: null,
      email: null,
      sex: null,
    },
    login: false,
    zoneId: '',
    socket_: null
  },
  getter: {},
  mutations: {
    changeSocket_(s, val) {
      s.socket_ = val
    },
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
      if (val == 0) s.user.level = '普通会员'
      else if (val == 1) s.user.level = '璀璨白银'
      else if (val == 2) s.user.level = '荣耀黄金'
      else if (val == 3) s.user.level = '尊贵铂金'
      else if (val == 4) s.user.level = '永恒钻石'
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
    changeAvatar(s, val) {
      s.user.avatar = val
    },
    changeHaveCapacity(s, val) {
      s.user.haveCapacity = val
    }
  },
  actions: {}
})
