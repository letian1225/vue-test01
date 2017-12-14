<template>

	<div class="controls-list">


		<el-menu>
			<div v-for="list in controls">
				<vddl-list :list="list.norm" :allowed-types="list.norm">
					<vddl-draggable v-for="(norm, index) in list.norm" :key="norm.type"
					  :draggable="norm"
					  :wrapper="list.norm"
					  :index="index"
					  :copied="copied"
					  effect-allowed="copy">
					  	
					  	  <el-menu-item :index="norm.type">
					  	      <!-- <i class="el-icon-location"></i>
					  	      <span slot="title">{{index}}</span> -->
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
	
</style>

