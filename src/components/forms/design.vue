<template>
<div class="design">
	<el-row>
	  <el-col :span="16">
	  		<div v-for="list in lists" class="forms">
	  			<vddl-list 
	  	          	:list="list.people" 
	  	          	:external-sources="true"
	  	          	:inserted="inserted">
	  	          	<el-form ref="form" label-width="80px">
		  	          	<vddl-draggable v-for="(person, index) in list.people" :key="person.id"
			  	            :draggable="person"
			  	            :wrapper="list.people"
			  	            :index="index"
			  	            :selected="selectedEvent"
			  	            v-bind:class="{'selected': selected === person}"
			  	            effect-allowed="move">
			  	            
			  	   			<el-form-item :label="person.labeltext" v-if="person.type == 'text'">
			  	   			  <el-input></el-input>
			  	   			</el-form-item>

		  	          	</vddl-draggable >
		  	          	<vddl-placeholder class="placeholder">3333</vddl-placeholder>
					</el-form>
	  	        </vddl-list>
	  		</div>
	  </el-col>
	  <el-col :span="8">
	  	<div class="attribute">
	  		
			<!--
	  		<el-form ref="form" label-width="80px">
	  		  <el-form-item label="名称" v-if="attribute.labeltext">
	  		    <el-input v-model="attribute.labeltext"></el-input>
	  		  </el-form-item>
	  		</el-form>
	  		-->

	  	</div>
	  </el-col>
	</el-row>
</div>
</template>
<script>
import Vue from 'vue'
import design_lists_data from '../../api/design_lists_data'
import Vddl from 'vddl'
Vue.use(Vddl)
export default {
	data() {
	   return {
	     	lists: [],
	     	attribute:[],
	     	selected:"",
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
	components:{}
}
</script>
<style scoped lang="less">
	.vddl-list{min-height: 100px;}
</style>
