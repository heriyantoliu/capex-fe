import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
