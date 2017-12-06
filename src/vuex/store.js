import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
Vue.use(Vuex);

const state = {
	attrKey:[],
	attrLists:[],
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

const UID = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});
}


const mutations = {
	SET_CONTROLS(state,data){
		console.log(data)
		state.controls.push(data)
	},
	COPIED(state){

	},
	DRAGEND(state){

	},
	INSERTED(state,data){
	  data.item.id = UID();
	  console.log(data.item.id);
	},
	SELECTED_EVENT(state,item){
	  state.selected = item;
	  state.attrKey = []
	  state.attrKey.push(item);
	  state.attrLists = [];
	  for(let x in item){
	    state.attrLists.push(x);
	  }
	},
	SAVE_FORM_LIST(state){
		// for(let i = 0; i < state.lists[0].people.length; i++){
		//   	state.lists[0].people[i].sort = i;
		// }
		console.log(state.lists);
	}
}



export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})