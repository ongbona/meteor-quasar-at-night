import './main.html';
import Vue from 'vue';
import App from './App.vue';
// import App from './Layout.vue'

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.min.css';
import Quasar from 'quasar';
// import ch from '../node_modules/quasar/dist/lang/km.umd.min'
Vue.use(Quasar, {
  // ...,
  // lang: ch
})


import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routes'
const router = new VueRouter({
  routes,// short for `routes: routes`
  mode: 'history',
})



Meteor.startup(() => {
  new Vue({
    el: 'app',
    router,
    ...App,
  });
});