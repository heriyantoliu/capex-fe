import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import store from './store';
import Dashboard from './views/Dashboard';
import Signin from './views/Signin';
import Policy from './views/Policy';

import CreateCapex from './views/CreateCapex';
import ListCapex from './views/ListCapex';
import DetailCapex from './views/DetailCapex';
import ApprCapex from './views/ListApprCapex';
import ACCCapex from './views/ListACCCapex';

import ReportBudget from './views/Report/Budget';
import ReportTransaction from './views/Report/Transaction';

import Profile from './views/Profile';
import ListReplicate from './views/ListReplicate';
import NotFound from './views/NotFound';

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
        { path: 'create', name: 'create', component: CreateCapex },
        { path: '', name: 'SOP', component: Policy },
        { path: 'myCapex', name: 'myCapex', component: ListCapex },
        { path: 'waitAppr', name: 'waitCapex', component: ApprCapex },
        {
          path: 'replicate',
          name: 'replicate',
          component: ListReplicate
        },
        { path: 'accAppr', name: 'accCapex', component: ACCCapex },
        { path: 'profile/:ID', name: 'profile', component: Profile },
        {
          path: '/capex/:ID',
          name: 'capexDet',
          component: DetailCapex
        },
        {
          path: '/report/budget',
          name: 'reportBudget',
          component: ReportBudget
        },
        {
          path: '/report/transaction',
          name: 'reportTransaction',
          component: ReportTransaction
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
      component: NotFound
    }
  ]
});

export default router;
