import Vue from 'vue'
import api from '../../api/control_library_data'
import * as types from '../mutation-types'
const state = {
	uid:"",
	selected:"",
	controls:[],
	lists: [
	  {
	    "label": "form",
	    "allowedTypes": [
	      "page"
	    ],
	    "people": [
	      {
	        "type": "SELECT",
	        "labeltext":"label",
	        "id":"7f275028-6aa1-46fd-ab32-19880d4a0a8d",
	        "name":"",
	        "align":"",
	        "disabled":"",
	        "option":[
	          {
	            "value":"",
	            "text":"",
	          }
	        ]

	      },
	      {
	        "type": "RADIO",
	        "labeltext": "label",
	        "disabled": "",
	        "id": "",
	        "group":[
	        {
	          "name": "33",
	          "value": "22",
	          "text": "11"
	        },
	        {
	          "name": "33",
	          "value": "111",
	          "text": "111"
	        }
	        ]
	      },
	      
	      //...
	    ]
	  }
	]
}
// getters
const getters = {
  controls: state => state.controls,
  lists: state => state.lists,
}


// actions
const actions = {
  controls({ commit }){
    Vue.http.get("http://api.com")
      .then((res) => {
        commit(types.CONTROLS, res.data)
        console.log(res.data)
      },(error) => {
        console.log(error)
      });
  },
  lists({ commit }, item){
  	commit(types.LISTS, item)
  },
  selected({ commit }, item){
  	commit(types.CONTROLS, item)
  },
  inserted({ commit }, data){
  	commit(types.INSERTED, data)
  }
}


// mutations
const mutations = {
  [types.CONTROLS] (state, item) {
    state.controls.push(item) 
  },
  [types.LISTS] (state, item) {
    state.lists.push(item) 
  },
  [types.INSERTED] (state, data) {
    data.item.id = state.uid
  },
  [types.SELECTED] (state, item){
  	state.selected = item
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}