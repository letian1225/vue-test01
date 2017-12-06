<template>
<div class="design">
	{{lists}}
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
				:selected="selected"
				v-bind:class="{'selected': selected === person}"
				effect-allowed="move">
				<div class="control-item">
					<div class="control-label">{{data.labeltext}}</div>

					<div class="control-field" v-if="data.type == 'TEXTBOX'">
						<input type="text" :value="data.value">
					</div>

					<div class="control-field" v-if="data.type == 'SELECT'">
						<select><option v-for="option in data.option" :value="option.value">{{option.text}}</option></select>
					</div>

					<div class="control-field" v-if="data.type == 'RADIO'">
						<div v-for="group in data.group">
							<label>{{group.text}}</label>
							<input type="radio" :name="group.name" :value="group.value">
						</div>
					</div>
				</div>
			</vddl-draggable >
			<vddl-placeholder class="placeholder"></vddl-placeholder>
			</vddl-list>
	    </div>
	</div> 
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
    }),
  },
  created(){
  	this.$store.dispatch('lists')
  },
  methods: {
  	...mapActions(['inserted','selected'])
  },
  components:{}
}
</script>
<style scoped lang="less">
.clearfix(){
	&:before,
	&:after{content:" "; display:table; clear:both;}
}
.design{width:500px; height:500px; border:1px solid #ccc;}
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
