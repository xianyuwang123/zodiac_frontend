import axios from 'axios'
import cookie from './cookie'

axios.defaults.baseURL = ''

//post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//设置超时
axios.defaults.timeout = 10000

axios.interceptors.request.use(
  (config) => {
    // 获取token
    const signature = cookie.getCookie('signature')
    config.headers.post['x-requested-token'] = signature
    // console.log('signature',config);
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    // alert(`异常请求：${error.message}`)
    //   console.log("this",this);
    //   alert({
    //     message: 'error.message',
    //     timeout: 3000, // ms.
    //     color:'error'
    // })
  }
)

export default {
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data,
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  get(url, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: data,
      })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
