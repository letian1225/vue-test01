<template>

	<div class="controls-list">


		<el-menu>
			<vddl-list :list="controls" :allowed-types="controls">
				<vddl-draggable v-for="(item, index) in controls" :key="item.wfw_id"
				  :draggable="item"
				  :wrapper="controls"
				  :index="index"
				  :copied="copied"
				  effect-allowed="copy">
				  	
				  	  <el-menu-item :index="item.wfw_id">
				  	      <i class="el-icon-news"></i>
				  	      <span slot="title">{{item.wfw_name_ch}}</span>
				  	  </el-menu-item>
				  	 

				  	
				</vddl-draggable>
			</vddl-list>
		</el-menu>

		
	</div>





</template>



<script>
import Vue from 'vue'
import Vddl from 'vddl'


Vue.use(Vddl)

export default {
	data() {
	   return {
	     	controls: [],
	   }
	},
  	computed: {},
  	created(){
	   	this.listWfFormWidgets()
  	},
  	methods: {
	  	listWfFormWidgets(){
			Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/listWfFormWidgets")
		   .then((res) => {
		   	console.log(res.data.list)
		   	this.controls = res.data.list
		   }, (error) => {})
	  	},
		copied(){
			
		}
  	},
  	components:{
  		
  	}
}
</script>
<style scoped lang="less">
	.controls-list{}
</style>

