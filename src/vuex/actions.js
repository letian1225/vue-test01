import Vue from 'vue'
import data from '../api/control_library_data'
export const ControlLibrary = ({ commit }) => {
  Vue.http.get("http://api.com")
    .then((res) => {
      commit("SET_CONTROLS", res.data)
    },(error) => {
      console.log(error)
    });
}
