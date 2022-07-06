// 全局路由守卫
import router from '@/router'
import { userStore } from '@/store/modules/user'

const whiteList = ['/login'] // 白名单

router.beforeEach((to, from, next) => {
  const { token } = userStore()

  if (token) {
    if (whiteList.indexOf(to.path) !== -1) {
      next({ path: `/dashboard?redirect=${to.path}` })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach((to, from) => {})
