import Vue from 'vue';
import Vuex from 'vuex';
import { axiosAccount, axiosCapex } from './axios-instance.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    userId: null,
    username: null,
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
      commit('authUser', {
        token: '',
        userId: '',
        username: '',
        name: '',
        rule: []
      });
    },

    async login({ commit }, authData) {
      try {
        const accountResp = await axiosAccount.post('/login', {
          username: authData.username,
          password: authData.password
        });
        localStorage.setItem('token', accountResp.data.token);
        localStorage.setItem('userId', accountResp.data.id);
        localStorage.setItem('username', accountResp.data.username);
        localStorage.setItem('name', accountResp.data.name);
        commit('setToken', accountResp.data.token);

        const rulesResp = await axiosCapex.get('/rules');
        commit('authUser', {
          userId: accountResp.data.id,
          username: accountResp.data.username,
          name: accountResp.data.name,
          rule: rulesResp.data.rule
        });
        return; //accountResp.data;
      } catch (err) {
        throw new Error(err);
      }
    },

    // login({ commit, dispatch }, authData) {
    // 	let accountData = {};

    // 	return new Promise((resolve, reject) => {
    // 		axiosAccount
    // 			.post('/login', {
    // 				email: authData.email,
    // 				password: authData.password
    // 			})
    // 			.then(res => {
    // 				// console.log(res);
    // 				// const now = new Date();
    // 				// const expirationDate = new Date(
    // 				// 	now.getTime() + res.data.expiresIn * 1000
    // 				// );
    // 				localStorage.setItem('token', res.data.token);
    // 				localStorage.setItem('userId', res.data.id);
    // 				localStorage.setItem('email', res.data.email);
    // 				localStorage.setItem('name', res.data.name);
    // 				accountData = res.data;
    // 				// localStorage.setItem('expirationDate', expirationDate);
    // 				commit('setToken', res.data.token);
    // 				axios
    // 					.get(process.env.VUE_APP_CAPEX_URL + '/rules', {
    // 						headers: {
    // 							Authorization: 'Bearer ' + res.data.token
    // 						}
    // 					})
    // 					.then(resRule => {
    // 						commit('authUser', {
    // 							userId: accountData.id,
    // 							email: accountData.email,
    // 							name: accountData.name,
    // 							rule: resRule.data.rule
    // 						});
    // 						resolve();
    // 					});

    // 				// resolve(accountData);
    // 				// dispatch('setLogoutTimer', res.data.expiresIn);
    // 			})

    // 			.catch(error => {
    // 				console.log(error);
    // 				console.log(error.config);
    // 				if (error.response) {
    // 					reject(error.response.data.message);
    // 				} else if (error.request) {
    // 					reject(error.message);
    // 				}
    // 			});
    // 	});
    // },

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
      commit('setToken', token);
      commit('authUser', {
        userId: userId,
        username: username,
        name: name
        // rule: rulesResp.data.rule
      });

      try {
        const rulesResp = await axiosCapex.get('/rules');

        commit('setToken', token);
        commit('authUser', {
          userId: userId,
          username: username,
          name: name,
          rule: rulesResp.data.rule
        });
        return;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
});
