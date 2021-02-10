import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import store from './store';
import Dashboard from './views/Dashboard';
import Signin from './views/Signin';
import Policy from './views/Policy';

import DetailCapex from './views/DetailCapex';
import ApprCapex from './views/ListApprCapex';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next(`/signin?redirect=${window.location.pathname}`);
        }
      },
      children: [
        {
          path: 'create',
          name: 'create',
          component: () => import('./views/CreateCapex.vue')
        },
        { path: '', name: 'SOP', component: Policy },
        {
          path: 'myCapex',
          name: 'myCapex',
          component: () => import('./views/ListCapex.vue')
        },
        { path: 'waitAppr', name: 'waitCapex', component: ApprCapex },
        {
          path: 'replicate',
          name: 'replicate',
          component: () => import('./views/ListReplicate.vue')
        },
        {
          path: 'accAppr',
          name: 'accCapex',
          component: () => import('./views/ListACCCapex.vue')
        },
        {
          path: 'profile/:ID',
          name: 'profile',
          component: () => import('./views/Profile.vue')
        },
        {
          path: '/capex/:ID',
          name: 'capexDet',
          component: DetailCapex
        },
        {
          path: '/report/budget',
          name: 'reportBudget',
          component: () => import('./views/Report/Budget.vue')
        },
        {
          path: '/report/transaction',
          name: 'reportTransaction',
          component: () => import('./views/Report/Transaction.vue')
        },
        {
          path: '/user-guide',
          name: 'userGuide',
          component: () => import('./views/userGuide.vue')
        }
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },

    {
      path: '*',
      name: 'errorPage',
      component: () => import('./views/NotFound.vue')
    }
  ]
});

export default router;
