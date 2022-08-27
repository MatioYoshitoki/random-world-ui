import request from '@/utils/request'

export function marketFishList(orderId, pageNo, pageSize, orderBy, sort) {
  const data = {
    order_id: orderId,
    page_no: pageNo,
    page_size: pageSize,
    order_by: orderBy,
    sort: sort
  }
  return request({
    url: '/api/v1/game/fish/market/list',
    method: 'get',
    data
  })
}

export function buyFish(orderId) {
  const data = {
    order_id: orderId
  }
  return request({
    url: '/api/v1/game/fish/market/buy',
    method: 'post',
    data
  })
}

export function sellFish(fishId, price) {
  const data = {
    fish_id: fishId,
    price: price
  }
  return request({
    url: '/api/v1/game/fish/market/sell',
    method: 'post',
    data
  })
}
export function sellOutFish(orderId) {
  const data = {
    order_id: orderId
  }
  return request({
    url: '/api/v1/game/fish/market/sold/out',
    method: 'post',
    data
  })
}
