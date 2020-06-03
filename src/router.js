import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import store from './store';
import Dashboard from './views/Dashboard';
import Signin from './views/Signin';
import CreateCapex from './views/CreateCapex';
import ListCapex from './views/ListCapex';
import DetailCapex from './views/DetailCapex';
import ApprCapex from './views/ListApprCapex';
import ACCCapex from './views/ListACCCapex';
import Profile from './views/Profile';
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
          next('/signin');
        }
      },
      children: [
        { path: 'create', name: 'create', component: CreateCapex },
        { path: '', name: 'apprCapex', component: ApprCapex },
        { path: 'myCapex', name: 'myCapex', component: ListCapex },
        { path: 'waitAppr', name: 'waitCapex', component: ApprCapex },
        { path: 'accAppr', name: 'accCapex', component: ACCCapex },
        { path: 'profile/:ID', name: 'profile', component: Profile },
        {
          path: '/capex/:ID',
          name: 'capexDet',
          component: DetailCapex
        }
      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      name: 'errorPage',
      component: NotFound
    }
  ]
});

export default router;
