import axios from 'axios'
import vue from '@/main.js'

const http = new axios.create({
  baseURL: 'http://192.168.1.184/',
  timeout: 5000,
  headers: {

  }
})

http.interceptors.request.use(config => {
  config.headers['token'] = sessionStorage.getItem('token')
  return config
})

// respone拦截器 拦截到所有的response，然后先做一些判断
http.interceptors.response.use(response => {
    const res = response.data
    // if (res.code != 200) {
    //   // alert('有一定的错误存在:' + res.message)  //不弹出 将错传给调用出使用
    //   return Promise.reject(res.message)  //这里的值会传递给我调用接口处的错误返回信息
    // } else {
      return response
    // }
  },error => {
    if(error.response.status == 401){
      vue.$message.error('授权失效，需要重新登录')
      sessionStorage.setItem('token','')
      vue.$router.push('/login')
    }
  })

export default http
