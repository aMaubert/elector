import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/elections',
    name: 'election-list',
    component: () => import(/* webpackChunkName: 'about' */ '../views/election/List.vue')
  },
  {
    path: '/elections/create',
    name: 'election-create',
    component: () => import('../views/election/Create.vue')
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
});

//Add Guard here
router.beforeEach((to, from, next) => {
  if( to.path === '/' ) {
    return next({ name : 'election-list'});
  }
  next();
});

export default router
