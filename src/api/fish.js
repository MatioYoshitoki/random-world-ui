import request from '@/utils/request'

export function createFish() {
  return request({
    url: '/api/v1/game/fish/create',
    method: 'post'
  })
}
