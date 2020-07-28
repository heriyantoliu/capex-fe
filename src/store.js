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
    role: []
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null;
    },
    findRole: state => role => {
      if (state.role === undefined) {
        return false;
      }
      return state.role.includes(role);
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
      state.role = userData.role;
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
        role: []
      });
    },

    async login({ commit }, authData) {
      try {
        const accountResp = await axiosCapex.post('/login', null, {
          auth: {
            username: authData.username,
            password: authData.password
          }
        });
        localStorage.setItem('token', accountResp.data.token);
        localStorage.setItem('userId', accountResp.data.id);
        localStorage.setItem('username', accountResp.data.username);
        localStorage.setItem('name', accountResp.data.name);
        localStorage.setItem('email', accountResp.data.email);
        commit('setToken', accountResp.data.token);

        const rolesResp = await axiosCapex.get(
          `/user/${accountResp.data.username}/roles`
        );
        commit('authUser', {
          userId: accountResp.data.id,
          username: accountResp.data.username,
          name: accountResp.data.name,
          role: rolesResp.data.role,
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
      });

      try {
        const rolesResp = await axiosCapex.get(`user/${username}/roles`);

        commit('setToken', token);
        commit('authUser', {
          userId,
          username,
          name,
          email,
          role: rolesResp.data.role
        });
        return;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
});
