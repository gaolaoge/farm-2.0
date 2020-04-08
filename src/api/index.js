import axios from 'axios'

const http = new axios.create({
  baseURL: 'http://192.168.1.184/',
  timeout: 5000,
  headers: {

  }
})

export default http
