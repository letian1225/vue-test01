<template>
<div class="design">
	<el-row>
	  <el-col :span="16">
	  		<div v-for="item in lists" class="forms">
	  			<vddl-list class="vddl-list"
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
			  	            
			  	            <div class="form-row">
			  	            	<label>{{list.wfw_attr[0].labelName == "" ? "名称" : list.wfw_attr[0].labelName}}</label>
				  	   			<span>{{list.wfw_name_ch}}</span>
				  	   		</div>

			  	   			

		  	          	</vddl-draggable >
		  	          	<vddl-placeholder class="placeholder"></vddl-placeholder>
	  	        </vddl-list>
	  		</div>
	  </el-col>
	  <el-col :span="8">
	  	<div class="attribute" v-if="attribute.length > 0">
	  		<el-form ref="form" label-width="80px" style="padding:10px;">

	  		  <el-form-item label="英文名">
	  		    <el-input v-model="attribute[0].wfw_name" readonly></el-input>
	  		  </el-form-item>

	  		  <el-form-item label="中文名">
	  		    <el-input v-model="attribute[0].wfw_name_ch" readonly></el-input>
	  		  </el-form-item>

	  		  <el-form-item label="名称">
	  		    <el-input v-model="attribute[0].wfw_attr[0].labelName"></el-input>
	  		  </el-form-item>
	  		 
	  		  <div v-if="attribute[0].type != '' ">

	  		  	<el-form-item label="类型">
	  		  		<div v-for="item in attribute[0].wfw_attr[0].type">
	  		  			<el-radio v-model="attribute[0].wfw_attr[0].type_selected" :label="item.wfwq_id">{{item.wfwq_name_ch}}</el-radio>
	  		  		</div>
	  		  	</el-form-item>
	  		  </div>
	  		  


    		  <div v-if="attribute[0].wfw_name == 'listBox'">
  	  		  	
  	  		  	<div v-for="(item,index) in attribute[0].wfw_attr[0].option">
  	  		  		<el-form-item :label="'项'+(index+1)" >
  	  		  		<el-col :span="3" style="padding:0 10px; text-align: right;">Value</el-col>
  	  		  		<el-col :span="5">
  	  		  			<el-input v-model="item.value"></el-input>
  	  		  		</el-col>
					<el-col :span="3" style="padding:0 10px; text-align: right;">Text</el-col>
  	  		  		<el-col :span="5">
  	  		  			<el-input v-model="item.text"></el-input>
  	  		  		</el-col>
  	  		  		<el-col :span="5">
  	  		  			&nbsp;<el-button type="default" v-on:click="attribute[0].wfw_attr[0].option.splice(index, 1)">删除</el-button>
  	  		  		</el-col>
  	  		  		</el-form-item>
  	  		  	</div>
  	  		  	
  	  		  	<el-form-item>
  	  		  		 <el-button type="primary" v-on:click="attribute[0].wfw_attr[0].option.push({'value':'','text':''})">增加一个</el-button>
  	  		  	</el-form-item>
				


  	  		 
    		  </div>

    		  <pre>
    		  	{{lists}}
    		  </pre>
	  		
	  		</el-form>


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
			this.attribute = []
			this.attribute.push(person)
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
	.clearfix{&:after{content:".";display:block;height:0;clear:both;visibility:hidden}
	  &:before{content:".";display:block;height:0;clear:both;visibility:hidden}
	}
	.forms{ width: 360px; border:1px solid #e6e6e6; margin:100px auto;}
	.vddl-list{ width: 100%; min-height: 700px; .clearfix;}
	.placeholder{width: 100%; height: 50px; line-height: 50px; background-color: #ddd; margin: 5px 0;}
	.attribute{width:100%; border-left: 1px solid #e6e6e6; 
		h3{padding: 10px; border-bottom: 1px solid #e6e6e6; font-size: 14px; font-weight: normal; margin:0;}
	}
	.vddl-draggable{width: 100%; padding:10px; box-sizing: border-box; .clearfix;
		&.selected{background-color:#f2f2f2;}
		.form-row{
			label{width:100px; height:30px; line-height:30px; float: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
			span{width:calc(~"100% - 100px"); height:30px; line-height:30px;  padding:0 10px; box-sizing: border-box; border:1px solid #e6e6e6; float: left; display: inline-block;}
		}
	}
	
</style>
