<template>
	<div class="controls-list">
		<div v-for="control in controls">
			<draggable v-model="control.norm" :options="{group:{ name:'forms',  pull:'clone', put:false }, sort:false}">
			   <div v-for="norm in control.norm">
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
	.controls-list{width: 300px;  height: calc(~"100% - 40px");  position: fixed; left: 0; top:40px; 
    background-color: #f2f2f2; 
		.vddl-list{ display: flex; flex-wrap:wrap; }
    .vddl-draggable{width: 100px; height: 100px; background-color: #fff; border-right: 1px solid #eee; border-bottom: 1px solid #eee; text-align: center; cursor: move; padding: 0 10px; box-sizing: border-box; font-size: 12px;
      i{font-size: 30px; margin: 20px 0; display: inline-block; width: 100%;}
      &:hover{background-color: #eee;}
		}
	}
  



</style>

