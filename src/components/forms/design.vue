<template>
<div class="design">
	<el-row>
	  <el-col :span="16">
	  		<div v-for="item in lists" class="forms">
	  			<vddl-list 
	  	          	:list="item.list" 
	  	          	:external-sources="true"
	  	          	:inserted="inserted">
		  	          	<vddl-draggable v-for="(list, index) in item.list" :key="list.uid"
			  	            :draggable="list"
			  	            :wrapper="item.list"
			  	            :index="index"
			  	            :selected="selectedEvent"
			  	            v-bind:class="{'selected': selected === list}"
			  	            effect-allowed="move">
			  	            
			  	   			<div v-if="list.wfw_name == 'dropdownlist'">
			  	   				<label>{{list.wfw_name_ch}}</label>
			  	   				<select></select>
			  	   			</div>

			  	   			

		  	          	</vddl-draggable >
		  	          	<vddl-placeholder class="placeholder"></vddl-placeholder>
	  	        </vddl-list>
	  		</div>
	  </el-col>
	  <el-col :span="8">
	  	<div class="attribute">
	  		<el-form ref="form" label-width="80px" v-if="attribute.wfw_name == 'dropdownlist'">
	  		  <el-form-item label="名称">
	  		    <el-input v-model="attribute.wfw_name_ch"></el-input>
	  		  </el-form-item>
	  		  <el-form-item label="类型">
	  		  	<div v-for="item in attribute.wfwq_type">
	  		  		<el-radio v-model="attribute.wfwq_type_selected" :label="item.wfwq_id">{{item.wfwq_name_ch}}</el-radio>
	  		  	</div>
	  		  </el-form-item>
	  		</el-form>
			<pre>{{value}}</pre>
			<pre>{{lists}}</pre>
	  		
	  		

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
	     	value:"",
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
			data.item.uid = this.createUID()
		}
	},
	components:{}
}
</script>
<style scoped lang="less">
	.forms{ width: 360px; padding: 20px; border:1px solid #e6e6e6; float: left;}
	.vddl-list{ width: 100%; min-height: 700px; float: left;}
	.vddl-draggable{width: 100%; height: 50px; line-height: 50px; background-color: #f9f9f9; margin: 5px 0; float: left;}
	.placeholder{width: 100%; height: 50px; line-height: 50px; background-color: #ddd; margin: 5px 0; float: left;}
</style>
