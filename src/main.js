// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import axios from 'axios'
import VueResource from 'vue-resource'
import store from './store'
import App from './App'
import router from './router'
import VModal from 'vue-js-modal'
import VueHighlightJS from 'vue-highlightjs'
import 'font-awesome/css/font-awesome.css'
import './less/common.less'


Vue.use(VueHighlightJS)
Vue.use(VModal)
Vue.use(VueResource)
Vue.config.productionTip = false





//Vue.prototype.$axios=axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
