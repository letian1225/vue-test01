<template>
<div class="design">



	<div class="forms">
		<ui-alert @dismiss="showAlert1 = false" v-show="showAlert1">
            Hi everybody! This is the default alert.
        </ui-alert>
        <ui-radio-group :name="group1" v-model="group1" :options="['Ned', 'Rod', 'Todd']">Favourite Flanders</ui-radio-group>
        <ui-select
            label="Favourite colour"
            placeholder="Select a colour"
            :options="['Ned', 'Rod', 'Todd']"
            v-model="select1">
            	
        </ui-select>
		<div v-for="list in lists" class="forms-inner">
			<vddl-list 
	          :list="list.people" 
	          :external-sources="true"
	          :inserted="inserted">
	          <vddl-draggable v-for="(person, index) in list.people" :key="person.id"
	            :draggable="person"
	            :wrapper="list.people"
	            :index="index"
	            :selected="selectedEvent"
	            v-bind:class="{'selected': selected === person}"
	            effect-allowed="move">

	            <div v-if="person.type == 'text'">
	   				<ui-textbox floating-label :label="person.labeltext" placeholder="Enter your name" v-model="person.value" ></ui-textbox>
	   			</div>

	          </vddl-draggable >

	          <vddl-placeholder class="placeholder">3333</vddl-placeholder>

	        </vddl-list>
		</div>

		<pre>{{lists}}</pre>
	</div>



	<div class="attribute">
		<div class="attribute-inner">
			
			<div v-if="attribute.labeltext">
				<input type="text" v-model="attribute.labeltext">
			</div>
			<pre>{{attribute}}</pre>
		</div>
	</div>


</div>
</template>
<script>
import Vue from 'vue'
import design_lists_data from '../../api/design_lists_data'
import Vddl from 'vddl'
import { UiTextbox, UiButton, UiMenu, UiAlert, UiSwitch, UiTab, UiTabs, UiRadio, UiRadioGroup, UiCheckbox, UiCheckboxGroup, UiSelect, UiCollapsible, UiPopover, UiPreloader, UiConfirm, UiFileupload, UiModal } from 'keen-ui'
Vue.use(Vddl)
export default {
	data() {
	   return {
	     	lists: [],
	     	attribute:[],
	     	selected:"",
	     	group1:"",
	     	select1:"",
	     	showAlert1:true
	   };
	},
	computed: {},
	created(){
	  	Vue.http.get("http://lists.com")
	    .then((res) => {
	    	this.lists.push(res.data);
	    }, (error) => {});
	},
	methods: {
		selectedEvent(person){
			this.attribute = person
			this.selected = person
		},
		createUID(){
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
			    return v.toString(16)
			})
		},
		inserted(data){
			data.item.id = this.createUID()
		}
	},
	components:{
		UiTextbox, UiButton, UiMenu, UiAlert, UiSwitch, UiTab, UiTabs, UiRadio, UiRadioGroup, UiCheckbox, UiCheckboxGroup, UiSelect, UiCollapsible, UiPopover, UiPreloader, UiConfirm, UiFileupload, UiModal
	}
}
</script>
<style scoped lang="less">
	.vddl-list{min-height: 100px;}
</style>
