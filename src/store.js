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
      return new Promise((resolve, reject) => {
        let user = {};
        axiosCapex
          .post('/login', null, {
            auth: {
              username: authData.username,
              password: authData.password
            }
          })
          .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('email', res.data.email);
            commit('setToken', res.data.token);
            user = { ...res.data };

            return axiosCapex.get(`/user/${res.data.username}/roles`);
          })
          .then(res => {
            commit('authUser', {
              userId: user.id,
              username: user.username,
              name: user.name,
              role: res.data.role,
              email: user.email
            });
            resolve();
          })
          .catch(err => {
            // console.log(err.response);
            reject(err.response);
          });
      });
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
