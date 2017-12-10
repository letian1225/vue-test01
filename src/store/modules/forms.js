import Vue from 'vue'
import control_library_data from '../../api/control_library_data'
import design_lists_data from '../../api/design_lists_data'

import * as types from '../mutation-types'
const state = {
  uid: "",
  selected: "",
  controls: [],
}
// getters
const getters = {
  controls: state => state.controls,
  selected: state => state.selected,
}


// actions
const actions = {
  controls({ commit }) {
    Vue.http.get("http://control.com")
      .then((res) => {
        commit(types.CONTROLS, res.data)
      }, (error) => {
        console.log(error)
      });
  },
  
  selectedEvent({ commit }, item) {
    commit(types.SELECTED_EVENT, item)
  },
  inserted({ commit }, data) {
    //console.log(data);
    commit(types.INSERTED, data)
  },
}


// mutations
const mutations = {
  [types.CONTROLS](state, item) {
    state.controls.push(item)
  },
  [types.INSERTED](state, data) {},
  [types.SELECTED_EVENT](state, item) {
    state.selected = item
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
