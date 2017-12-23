<template>
<div class="design">
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


  	<div class="attribute" v-if="attribute.length > 0">
  		<h3>属性面板</h3>
  		<h4>基本信息</h4>
  		<div class="attr-item">
  			<label>ID</label>
  			<span class="readonly-text">{{attribute[0].wfw_id}}</span>
  		</div>
  		<div class="attr-item">
  			<label>英文名</label>
  			<span class="readonly-text">{{attribute[0].wfw_name}}</span>
  		</div>
  		<div class="attr-item">
  			<label>中文名</label>
  			<span class="readonly-text warn">{{attribute[0].wfw_name_ch}}</span>
  		</div>
  		<h4>属性信息</h4>
  		<div class="attr-item">
  			<label>显示名称</label>
  			<div class="edit-text">
  				<input type="text" v-model="attribute[0].wfw_attr[0].labelName" placeholder="">
  			</div>
  		</div>
  		<div class="attr-item">
  			<label>控件NAME</label>
  			<div class="edit-text">
  				<input type="text" v-model="attribute[0].wfw_attr[0].name" placeholder="">
  			</div>
  		</div>
  		<div class="attr-item">
  			<label>数据源</label>
  			<div class="edit-text">
  				<input type="text" v-model="attribute[0].wfw_attr[0].dataSource" placeholder="">
  			</div>
  		</div>
  		<div class="attr-item">
  			<label>是否隐藏</label>
  			<div class="edit-text">
  				<div class="radio">
  					<input type="radio" v-model="attribute[0].wfw_attr[0].display" name="display" :value="false">
  					<span>显示</span>
  				</div>
  				<div class="radio">
  					<input type="radio" v-model="attribute[0].wfw_attr[0].display" name="display" :value="true">
  					<span>隐藏</span>
  				</div>
  			</div>
  		</div>
  		<div class="attr-item">
  			<label>类型</label>
  			<div class="edit-text">
  				<div v-for="item in attribute[0].wfw_attr[0].type"  class="radio">
					<input type="radio" v-model="attribute[0].wfw_attr[0].type_selected" name="type" :value="item.wfwq_id" :id="item.wfwq_name">
					<span>{{item.wfwq_name_ch}}</span>
  				</div>
  			</div>
  		</div>

  		<div class="attr-item" v-if="attribute[0].wfw_attr[0].option != null">
  			<label>OPTION</label>
  			<div class="edit-text">
  				<div v-for="(item,index) in attribute[0].wfw_attr[0].option"  class="option">
					<input type="text" v-model="item.value" placeholder="value">
					<input type="text" v-model="item.text" placeholder="text">
					<a href="javascript:;" v-on:click="attribute[0].wfw_attr[0].option.splice(index, 1)">删除</a>
  				</div>
  				<a href="javascript:;" v-on:click="attribute[0].wfw_attr[0].option.push({'value':'','text':''})">增加一条</a>
  			</div>
  		</div>


  		


  		<el-form ref="form" label-width="80px" style="padding:10px;">


		  <pre>
		  	{{lists}}
		  </pre>
  		
  		</el-form>


  	</div>
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
	.forms{ width: calc(~"100% - 800px"); height:calc(~"100% - 60px"); position: fixed; left: 300px; top:60px; overflow: auto; background-color: #fff; webkit-user-select: none;
		.vddl-list{ width: 100%; min-height: 700px; .clearfix; padding: 20px; box-sizing: border-box;
			.vddl-draggable{width: 100%; padding:10px; box-sizing: border-box; .clearfix;
				&.selected{background-color:#f2f2f2;}
				.form-row{
					label{width:100px; height:30px; line-height:30px; float: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
					span{width:calc(~"100% - 100px"); height:30px; line-height:30px;  padding:0 10px; box-sizing: border-box; border:1px solid #e6e6e6; float: left; display: inline-block;}
				}
			}
		}
		.placeholder{width: 100%; height: 50px; line-height: 50px; background-color: #ddd; margin: 5px 0;}
		
	}
	
	
	.attribute{width:500px; height: calc(~"100% - 60px"); border-left: 1px solid #e6e6e6;  background: #fff; position: fixed; right: 0; top:60px; overflow: auto;
		h3{font-size: 16px; padding: 15px 10px; font-weight: normal; margin: 0; border-bottom: 1px solid #e6e6e6; background-color: #fff; color: #333;}
		h4{font-size: 14px; padding: 5px 10px; font-weight: normal; margin: 0; border-bottom: 1px solid #e6e6e6; background-color: #fff; color: #333;}
		.attr-item{width: 100%;.clearfix; border-bottom: 1px solid #e6e6e6; font-size: 14px;  position: relative;
			&>label{width: 150px; height: 100%; line-height: 30px; position: absolute; left: 0; top:0; padding: 0 10px; box-sizing: border-box; background-color: #f2f2f2;  color: #333;}
			.readonly-text{width: calc(~"100% - 150px"); line-height: 30px; float: left; margin-left: 150px; padding: 0 10px; color: #999; box-sizing: border-box; border-left: 1px solid #e6e6e6;
				&.warn{color: #f00;}
			}
			.edit-text{width: calc(~"100% - 150px"); line-height: 30px; float: left; margin-left: 150px; padding: 0 10px; color: #999; box-sizing: border-box; border-left: 1px solid #e6e6e6;
				input[type='text']{width: 100%; height: 100%; border:0;
					&:focus{outline: 0;}
				}
				.radio{position: relative; cursor: pointer; display: inline-block;  font-size: 12px; margin-right: 10px;
					span{color: #333; display: block; width: 100%;  height: 22px; line-height: 22px; padding: 0 10px; border:1px solid #ccc;}
					input[type='radio']{-webkit-appearance:none; width: 100%; height: 100%; position: absolute; left: 0; top:0; 
						&:focus{outline: 0;}
						&:checked + span{color:#fff; background-color: #333; border-color: #333;}
					}
				}
				.option{
					input[type='text']{width:calc(~"50% - 20px"); background-color: #fff; padding:2px 5px; border:1px solid #e6e6e6;}
					a{display: inline-block; color: #999; font-size: 12px;}
				}
				a{color: #333;}
			}
		}
	}
	
	
</style>
