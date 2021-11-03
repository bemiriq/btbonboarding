import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import Users from './Users.vue';
import Home from './Home.vue';
import Onboarding from './Onboarding.vue';
import Waiting from './Waiting.vue';
import Onsite from './Onsite.vue';
import Playing from './Playing.vue';
import Score from './Score.vue';
import Bigscreen from './Tvwaiting.vue';
import Print from './print.vue';
import Gamebaysignup from './Gbsignup.vue';
import Gamebayleaderboard from './Gbleaderboard.vue';
import Onboardingtest from './OnboardingTest.vue';
import Singleonboarding from './Singleonboarding.vue';
import Playerdetails from './Playerdetails.vue';
import Dashboard from './Dashboard.vue';
import Rfid from './Rfid.vue';
import Social from './Social.vue';
import Rfidmedia from './Rfidmedia.vue';
import Activeteams from './Activeteams.vue';
import Gamebay from './Gamebay.vue';
import Teamwaiting from './Teamwaiting.vue';


/* pages link for footer */
import Control from './Control.vue';
/**end of footer pages */
import Drag from './Drag.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import Vue from 'vue';
import VueDraggable from 'vue-draggable';
// import VueFire from 'vuefire';
// import VueMultiDrag from 'vue-multi-drag';
// import './firebase'; //this one is for database

// import VueResource from 'vue-resource';

// Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueDraggable);
// Vue.use(VueFire);
// var firebase = require('firebase');

const routes = [
	{ path: '/users', component: Users},
	{ path : '/home', component: Home},
	{ path : '/onboarding', component: Onboarding},
	{ path : '/waiting', component: Waiting},
	{ path : '/onsite', component: Onsite},
	{ path : '/playing', component: Playing},
	{ path : '/controlroom', component: Control},
	{ path : '/score', component: Score},
	{ path : '/drag', component: Drag},
	{ path : '/bigscreen', component: Bigscreen},
	{ path : '/print', component: Print},
	{ path : '/gbsignup', component: Gamebaysignup},
	{ path : '/gbleaderboard', component: Gamebayleaderboard},
	{ path : '/onboardingtest', component: Onboardingtest},
	{ path : '/Singleonboarding', component: Singleonboarding},
	{ path : '/Playerdetails', component: Playerdetails},
	{ path : '/Dashboard', component: Dashboard},
	{ path : '/Rfid', component: Rfid},
	{ path : '/Social', component: Social},
	{ path : '/Scanmedia', component: Rfidmedia},
	{ path : '/Activeteams', component: Activeteams},
	{ path : '/Gamebay', component: Gamebay},
	{ path : '/Teamwaiting', component: Teamwaiting},
		{ path: '/', component: Users} /** this defines the home page url **/
];

const router = new VueRouter({
	routes
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
