<template>
	<div class="controls-list">
		<div v-for="control in controls" class="controls-list-inner">
			<draggable v-model="control.norm" :options="{group:{ name:'forms',  pull:'clone', put:false }, sort:false}">
			   <div v-for="norm in control.norm" class="item">
				  	<i :class="norm.icon"></i>
	          		<span>{{norm.type}}</span>
			   </div>
			</draggable>
		</div>
	</div>
</template>
<script>
import draggable from 'vuedraggable'
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      controls:'controls',
    }),
  },
  created(){
    this.$store.dispatch('controls')
  },
  methods: {
  	moveEvent:function(evt,originalEvent){

  	
  	}
  },
  components:{draggable}
}
</script>
<style scoped lang="less">

.controls-classify-name{padding: 10px; background-color: #1d4350; color: #fff;}
.controls-list{width: 300px;  height: calc(~"100% - 40px");  position: fixed; left: 0; top:40px; background-color: #f2f2f2; 
	.controls-list-inner{
		.item{width: 100%; height: 40px; line-height: 40px; background-color: #fff; border-bottom: 1px solid #eee;cursor: move; padding: 0 10px; box-sizing: border-box;
	  		i{font-size: 16px; display: inline-block; width: 20px;}
	  		span{}
	  		&:hover{background-color: #eee;}
		}
	}
}
  



</style>

