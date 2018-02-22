// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import Element from 'element-ui'

import Util from './util/util.js'

import '../theme/index.css'
import 'font-awesome/css/font-awesome.css'
import './less/common.less'









Vue.use(VueResource)
Vue.use(Element)
Vue.use(router)
Vue.use(Util)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
