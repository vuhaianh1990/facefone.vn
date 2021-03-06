
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

// Import Bootstrap
import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);

// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('group-component', require('./components/group/GroupMemberComponent.vue'));
Vue.component('team-component', require('./components/team/TeamMemberComponent.vue'));
Vue.component('active-member-component', require('./components/supermember/ActiveMemberComponent.vue'));

const app = new Vue({
    el: '#app'
});
