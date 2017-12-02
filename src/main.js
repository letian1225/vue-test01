// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import store from './vuex/store';
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import './less/common.less'

Vue.config.productionTip = false
Vue.prototype.$axios=axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
