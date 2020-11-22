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
    path: '/elections/:name/candidate/create',
    name: 'election-add-candidate',
    component: () => import('../views/election/AddCandidate.vue')
  },
  {
    path: '/elections/:name/vote',
    name: 'election-vote',
    component: () => import('../views/election/Vote.vue')
  },
  {
    path: '/elections/:name/stats',
    name: 'election-stats',
    component: () => import('../views/election/Stats.vue')
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
