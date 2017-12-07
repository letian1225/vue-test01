<template>
<div class="design">
	
	<div v-for="list in lists">
	    <div class="screen">
			<vddl-list 
				:list="list.people" 
				:external-sources="true"
				:inserted="inserted">
			<vddl-draggable v-for="(person, index) in list.people" :key="person.type"
				:draggable="person"
				:wrapper="list.people"
				:index="index"
				:selected="selectedEvent"
				v-bind:class="{'selected': selected === person}"
				effect-allowed="move">
				<div class="control-item">
					<div class="control-label">{{person.labeltext}}</div>

					
				</div>
			</vddl-draggable >
			<vddl-placeholder class="placeholder">11111111111111</vddl-placeholder>
			</vddl-list>
	    </div>
	</div> 
	
	<pre>{{lists}}</pre>
	
</div>
</template>
<script>
import Vue from 'vue'
import Vddl from 'vddl';
import { mapGetters, mapActions } from 'vuex';
Vue.use(Vddl);
export default {
	
	computed: {
	...mapGetters({
		lists:'lists',
		selected:'selected'

	}),
	},
	created(){
		this.$store.dispatch('lists')
	},
	methods: {
		...mapActions(['inserted','selectedEvent'])
	},
	components:{}
}
</script>
<style scoped lang="less">
.clearfix(){
	&:before,
	&:after{content:" "; display:table; clear:both;}
}
.vddl-list {
    padding-left: 0;
    min-height: 40px;
}
.design{}
.control-item{ 
	width: 100%; box-sizing: border-box; padding: 10px 5px; .clearfix(); position: relative;
	.control-label{width: 30%;  height: 30px; line-height: 30px; font-size: 12px; float: left; white-space: normal; text-overflow: ellipsis; overflow: hidden;
		& + .control-field{width: 70%; float: left;}
	}
	.control-field{width: 100%;
		//input[type=text]{width: 100%; pointer-events: none; height: 30px; padding: 0 5px; box-sizing: border-box; border:1px solid #333; -webkit-appearance:none; background-color: #fff;}
		
		//select{width: 100%; height: 30px; pointer-events: none; padding: 0 5px; box-sizing: border-box; border:1px solid #333; -webkit-appearance:none; background: url("../assets/arrow.png") #fff no-repeat scroll right center ;}
	}
}
</style>
