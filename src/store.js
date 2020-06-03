import Vue from 'vue';
import Vuex from 'vuex';
import { axiosCapex } from './axios-instance.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    userId: null,
    username: null,
    email: null,
    name: null,
    rule: []
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null;
    },
    findRule: state => rule => {
      if (state.rule === undefined) {
        return false;
      }
      return state.rule.includes(rule);
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    authUser(state, userData) {
      state.userId = userData.userId;
      state.username = userData.username;
      state.email = userData.email;
      state.name = userData.name;
      state.rule = userData.rule;
    }
  },
  actions: {
    logout({ commit }) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      commit('authUser', {
        token: '',
        userId: '',
        username: '',
        name: '',
        email: '',
        rule: []
      });
    },

    async login({ commit }, authData) {
      try {
        const accountResp = await axiosCapex.post('/login', {
          username: authData.username,
          password: authData.password
        });
        localStorage.setItem('token', accountResp.data.token);
        localStorage.setItem('userId', accountResp.data.id);
        localStorage.setItem('username', accountResp.data.username);
        localStorage.setItem('name', accountResp.data.name);
        localStorage.setItem('email', accountResp.data.email);
        commit('setToken', accountResp.data.token);

        const rulesResp = await axiosCapex.get('/rules');
        commit('authUser', {
          userId: accountResp.data.id,
          username: accountResp.data.username,
          name: accountResp.data.name,
          rule: rulesResp.data.rule,
          email: accountResp.data.email
        });
        return; //accountResp.data;
      } catch (err) {
        throw new Error(err);
      }
    },

    async tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }
      // const expirationDate = localStorage.getItem('expirationDate');
      // const now = new Date();
      // if (now >= expirationDate) {
      // 	return;
      // }
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');
      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');
      commit('setToken', token);
      commit('authUser', {
        userId,
        username,
        name,
        email
        // rule: rulesResp.data.rule
      });

      try {
        const rulesResp = await axiosCapex.get('/rules');

        commit('setToken', token);
        commit('authUser', {
          userId,
          username,
          name,
          email,
          rule: rulesResp.data.rule
        });
        return;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
});
