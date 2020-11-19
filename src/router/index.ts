import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: 'about' */ '../views/Elections.vue')
  },
  {
    path: '/elections',
    name: 'election-list',
    component: () => import(/* webpackChunkName: 'about' */ '../views/Elections.vue')
  },
  {
    path: '/account/:id',
    name: 'account-form',
    component: () => import('../views/Account.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
