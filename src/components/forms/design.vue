<template>
<div class="design">
	<pre>
		{{lists}}
	</pre>
	<div v-for="list in lists" class="design-inner">
		<draggable v-model="list.people" :options="{group:'forms'}">
		   <div v-for="person in list.people">
	   			<b-row v-if="person.type == 'text'">
	   		      <b-col sm="3"><label>{{ person.labeltext }}:</label></b-col>
	   		      <b-col sm="9"><b-form-input :type="person.type"></b-form-input></b-col>
	   		    </b-row>
		   </div>
		</draggable>
	</div>

	


	
</div>
</template>
<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex';
//Vue.use(Vddl);
export default {
	data() {
	   return {
	     lists: [],
	   };
	},
	computed: {
		// ...mapGetters({
		// 	selected:'selected'
		// }),
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
		//...mapActions(['inserted','selectedEvent']),
	},
	components:{draggable}
}
</script>
<style scoped lang="less">

.vddl-list {
    padding-left: 0;
    min-height: 400px;
}

.design{width: calc(~"100% - 800px"); height: calc(~"100% - 50px"); overflow: auto; position: fixed; left: 300px; top:50px;
  &::-webkit-scrollbar {width:2px;height:2px;}
  &::-webkit-scrollbar-track-piece {background:#EEE;-webkit-border-radius:6px;}
  &::-webkit-scrollbar-thumb:vertical {background:#555;-webkit-border-radius:6px;}
  &::-webkit-scrollbar-thumb:horizontal {background:#555;-webkit-border-radius:6px;}
  .design-inner{
    .screen{
      .vddl-draggable{width: 100%; margin: 4px 0; padding: 4px; position: relative;
      	&:after{content: ""; position: absolute; left: 0; top:0; width: 100%; height: 100%;}
      }
      .vddl-draggable.selected{border-radius: 0.25rem; box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);}
    }
    .placeholder{width: 100%; height: 50px; float: left; border-top:1px dashed #999; border-bottom:1px dashed #999;}
  }
}

</style>
