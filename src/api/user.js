import request from '@/utils/request'

// 登录
export function userLogin(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}
