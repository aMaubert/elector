import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {State} from "@/store";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
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
  const userState = localStorage.getItem('userState');
  if(to.path === '/' || !userState) {
    return next({ name : 'login'});
  }
  const state = JSON.parse(userState) as State;
  if( !state || !state.user || !state.user)  {
    return next({ name : 'login'});
  }
  next();

});

export default router
