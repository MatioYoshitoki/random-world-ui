import { createRouter, createWebHashHistory } from 'vue-router'

import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

const routes = generatedRoutes.map((item) =>
  item?.meta?.layout !== false ? setupLayouts([item])[0] : item
)
routes.push({ path: '/', redirect: '/dashboard' })

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
