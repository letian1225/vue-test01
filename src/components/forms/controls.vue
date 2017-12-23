<template>

	<div class="controls-list">


			<h3>控件库</h3>
			<vddl-list :list="controls" :allowed-types="controls">
				<vddl-draggable v-for="(item, index) in controls" :key="item.wfw_id"
				  :draggable="item"
				  :wrapper="controls"
				  :index="index"
				  :copied="copied"
				  effect-allowed="copy">
				  	
				  	      <i :class="item.wfw_icon"></i>
				  	      <span>{{item.wfw_name_ch}}</span>
				  	 

				  	
				</vddl-draggable>
			</vddl-list>

		
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
	.controls-list{width: 300px; height:calc(~"100% - 60px"); position: fixed; left: 0; top:60px;background-color: #fff;  border-right: 1px solid #e6e6e6; 
		h3{font-size: 16px; padding: 15px 10px; font-weight: normal; margin: 0; border-bottom: 1px solid #e6e6e6; background-color: #fff; color: #333;}
		.vddl-list{ width: 100%;
			.vddl-draggable{width: 33.333%; height: 100px; cursor: move; display: inline-block;  text-align: center; padding: 10px; box-sizing: border-box; border-bottom: 1px solid #e6e6e6;
				&:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(7),&:nth-of-type(10),&:nth-of-type(13),&:nth-of-type(16),&:nth-of-type(19),&:nth-of-type(22){border-right: 1px solid #e6e6e6;}
				&:nth-of-type(2),&:nth-of-type(5),&:nth-of-type(8),&:nth-of-type(11),&:nth-of-type(14),&:nth-of-type(17),&:nth-of-type(20),&:nth-of-type(23),&:nth-of-type(26){border-right: 1px solid #e6e6e6;}
				i{font-size: 20px; color: #333; margin-top: 10px; }
				span{display: block; font-size: 12px; margin-top: 20px; color: #333;}
				&:hover{background-color: #e6e6e6; box-shadow: 0 0 5px #e6e6e6; transition: all .5s ease;}
			}
		}
		
	}
</style>

