import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import forms from './modules/forms'

import createLogger from 'vuex/dist/logger';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	actions,
	getters,
	modules: {
	  forms
	},
  	strict: debug,
  	plugins: debug ? [createLogger()] : []
})