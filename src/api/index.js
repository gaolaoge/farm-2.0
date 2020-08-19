import axios from 'axios'
import vue from '@/main.js'
import {Message} from "element-ui";

// 业务服务
const businessServer = new axios.create({
  baseURL: 'http://192.168.1.179/',
  // baseURL: 'http://223.80.107.190:18146',    // 测试环境
  // baseURL: 'http://10.2.2.146',              // 测试环境2
  // baseURL: 'http://192.168.1.179',              // 测试环境3
  // timeout: 5000,
  // headers: {}
})

businessServer.interceptors.request.use(config => {
  let token = null
  if(document.cookie) token = document.cookie.split(';').find(curr => /token/.test(curr)).split('=')[1]
  if(sessionStorage.getItem('token')) token = sessionStorage.getItem('token')
  config.headers['token'] = token
  return config
})

// respone拦截器 拦截到所有的response，然后先做一些判断
businessServer.interceptors.response.use(
  response => {
    const res = response.data
    // if (res.code != 200) {
    //   // alert('有一定的错误存在:' + res.message)  //不弹出 将错传给调用出使用
    //   return Promise.reject(res.message)  //这里的值会传递给我调用接口处的错误返回信息
    // } else {
    return response
    // }
  },
    error => {
    if(vue.$route.path == '/login') return false
    if(error.response.status == 401){
      vue.$message({
        message: '授权失效，需要重新登录',
        type: 'error',
        showClose: true,
        duration: 2000
      })
      sessionStorage.setItem('token','')
      vue.$router.push('/login')
    }
})

export {
  businessServer,
  fileServer
}
