<template>

	<div class="controls-list">


		<el-menu>

			<div v-for="item in controls">
				<vddl-list :list="item.list" :allowed-types="item.list">
					<vddl-draggable v-for="(list, index) in item.list" :key="list.type"
					  :draggable="list"
					  :wrapper="item.list"
					  :index="index"
					  :copied="copied"
					  effect-allowed="copy">
					  	
					  	  <el-menu-item :index="list.wfw_id">
					  	      <i class="el-icon-news"></i>
					  	      <span slot="title">{{list.wfw_name_ch}}</span>
					  	  </el-menu-item>
					  	 

					  	
					</vddl-draggable>
				</vddl-list>
			</div>
		</el-menu>

		
	</div>





</template>



<script>
import Vue from 'vue'
import control_library_data from '../../api/control_library_data'
import Vddl from 'vddl'


Vue.use(Vddl)

export default {
	data() {
	   return {
	     	controls: [],
	     	
	   };
	},
  	computed: {},
  	created(){
	   	Vue.http.get("http://control.com")
	      .then((res) => {
	      	this.controls.push(res.data);
	      }, (error) => {});
  	},
  	methods: {
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

