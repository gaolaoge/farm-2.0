import axios from 'axios'

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

export default http
