import request from '@/utils/request'

export function createFish() {
  return request({
    url: '/api/v1/game/fish/create',
    method: 'post'
  })
}

export function ownerFishList() {
  return request({
    url: '/api/v1/game/fish/list',
    method: 'get'
  })
}

export function fishing(fishId) {
  const data = {
    fish_id: fishId
  }
  return request({
    url: '/api/v1/game/fish/fishing',
    method: 'post',
    data
  })
}

export function eatFish(fishId) {
  const data = {
    fish_id: fishId
  }
  return request({
    url: '/api/v1/game/fish/eat',
    method: 'post',
    data
  })
}

export function putFish(fishId) {
  const data = {
    fish_id: fishId
  }
  return request({
    url: '/api/v1/game/fish/put',
    method: 'post',
    data
  })
}
