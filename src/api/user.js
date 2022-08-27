import request from '@/utils/request'

// 登录
export function userLogin(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

// 签到
export function signIn() {
  return request({
    url: '/api/v1/user/sign_in',
    method: 'post'
  })
}

// 扩大背包
export function packageExpand() {
  return request({
    url: '/api/v1/user/package/expand',
    method: 'post'
  })
}
