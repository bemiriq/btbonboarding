import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import Users from './Users.vue';
import Home from './Home.vue';
import Onboarding from './Onboarding.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import VueResource from 'vue-resource';

// Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(BootstrapVue);
// Vue.use(VueResource);

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

const routes = [
	{ path: '/users', component: Users},
	{ path : '/', component: Home},
	{ path : '/onboarding', component: Onboarding}
];

const router = new VueRouter({
	routes
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
