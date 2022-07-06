import axios from 'axios'
import { userStore } from '@/store/modules/user'

const service = axios.create({
  baseURL: 'http://127.0.0.1:7777',
  timeout: 1000 * 15
})

service.interceptors.request.use(
  (config) => {
    const { token } = userStore()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res?.errno === 0) {
      return res
    } else {
      ElMessage.error(res?.message || '未知错误')
      return Promise.reject(new Error(res))
    }
  },
  (error) => {
    const res = error.response
    const req = error.request
    let msg = '未知错误'
    if (req.readyState === 4 && req.status === 0) {
      msg = '请求超时，请重试'
    }
    if (res) {
      const { status } = res
      switch (status) {
        case 400:
          msg = '请求错误(400)'
          break
        case 401:
          msg = '登录过期'
          break
        case 403:
          msg = '拒绝访问(403)'
          break
        case 404:
          msg = '请求出错(404)'
          break
        case 408:
          msg = '请求超时(408)'
          break
        case 500:
          msg = '服务器错误(500)'
          break
        case 501:
          msg = '服务未实现(501)'
          break
        case 502:
          msg = '网络错误(502)'
          break
        case 503:
          msg = '服务不可用(503)'
          break
        case 504:
          msg = '网络超时(504)'
          break
        case 505:
          msg = 'HTTP版本不受支持(505)'
          break
        default:
          msg = `连接出错(${status})!`
      }
    }

    ElMessage.error(msg)
    return Promise.reject(msg)
  }
)

export default service
