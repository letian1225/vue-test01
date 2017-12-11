<template>
<div class="design">
	
	<div v-for="list in lists" class="design-inner">
		<b-container fluid>
		<draggable v-model="list.people" 
			:options="{group:'forms',ghostClass:'sortable-ghost',selectedClass:'sortable-ghost'}">
		   	<div v-for="person in list.people"  class="item" v-bind:class="{'selected': selected === person}" v-on:click="selectedEvent(person)">
	   			<b-row v-if="person.type == 'text'">
	   		      <b-col sm="3"><label class="labeltext">{{ person.labeltext }}:</label></b-col>
	   		      <b-col sm="9"><b-form-input :type="person.type"></b-form-input></b-col>
	   		    </b-row>
		   	</div>
		</draggable>
		</b-container>
	</div>

	

	


	
</div>
</template>
<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex';
export default {
	data() {
	   return {
	     	lists: [],
	   };
	},
	computed: {
		...mapGetters({
			selected:'selected'
		}),
	},
	created(){
	  	Vue.http.get("http://lists.com")
	    .then((res) => {
	    	this.lists.push(res.data);
	    }, (error) => {
	      console.log(error)
	    });
	},
	methods: {
		...mapActions(['selectedEvent']),
	},
	components:{draggable}
}
</script>
<style scoped lang="less">

.vddl-list {
    padding-left: 0;
    min-height: 400px;
}

.design{width: calc(~"100% - 800px"); height: calc(~"100% - 40px"); overflow: auto; position: fixed; left: 300px; top:40px;
  &::-webkit-scrollbar {width:2px;height:2px;}
  &::-webkit-scrollbar-track-piece {background:#EEE;-webkit-border-radius:6px;}
  &::-webkit-scrollbar-thumb:vertical {background:#555;-webkit-border-radius:6px;}
  &::-webkit-scrollbar-thumb:horizontal {background:#555;-webkit-border-radius:6px;}
  .design-inner{
  	.design-inner{}
    .sortable-ghost{width: 100%; float: left; background-color: #f2f2f2; }
    .item{margin: 10px 0; padding: 5px; float: left; width: 100%;
    	.labeltext{margin:5px 0 0 0;}
     }
    .selected{ box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); border-radius: 5px;}
  }

}

</style>
