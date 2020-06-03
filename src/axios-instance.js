import axios from 'axios';
import router from './router';

const axiosCapex = axios.create({
  baseURL: process.env.VUE_APP_CAPEX_URL
});

axiosCapex.interceptors.request.use(
  config => {
    config.headers.authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
  },
  error => Promise.reject(error)
);

axiosCapex.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status != '401') {
      return Promise.reject(error);
    }
    router.replace('/signin');
    return;
  }
);

export { axiosCapex };
