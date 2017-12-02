<template>
  <div>

	<div v-for="list in controls" class="controls-list">
		<h3 class="controls-classify-name">{{list.label}}</h3>
		<vddl-list class="panel__body--list" :list="list.norm" :allowed-types="list.norm">
			<vddl-draggable v-for="(norm, index) in list.norm" :key="norm.type"
			  :draggable="norm"
			  :wrapper="list.norm"
			  :index="index"
			  :copied="copied"
			  effect-allowed="copy">
			  	<!-- <i :class="norm.icon"></i> -->{{norm.type}}
			</vddl-draggable>
		</vddl-list>
	</div>



  
  
  
  <div v-for="list in lists" class="form-body">
    
    
    <!-- 
    <vddl-list :list="[]" class="panel__body--list">
      <vddl-placeholder class="panel__placeholder">
        DELETE
      </vddl-placeholder>
    </vddl-list> 
    -->
   
    
    <div class="control-panel">
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

            <CONTROL :data="person" :index="index"></CONTROL>

          </vddl-draggable >

          <vddl-placeholder class="placeholder"></vddl-placeholder>

        </vddl-list>
      </div>
    </div>
    

  </div> 
 
  

    
  
  <ATTRPANEL :data="attrKey" :attrLists="attrLists"></ATTRPANEL>
    
  

  <pre>{{controls}}</pre>



  <button type="button" v-on:click="saveFormLists">save</button>
    

  </div>
</template>

<script>
import Vue from 'vue'
import Vddl from 'vddl';
import CONTROL from './control'
import ATTRPANEL from './attrPanel'
import { mapState } from 'vuex';

Vue.use(Vddl);

export default {
  name: '',
  data(){
    return {
      
    }
  },
  computed: {
    ...mapState([]),
    controls(){
      return this.$store.state.controls;
    },
    lists(){
      return this.$store.state.lists;
    },
    selected(){
      return this.$store.state.selected;
    },
    attrKey(){
      return this.$store.state.attrKey;
    },
    attrLists(){
      return this.$store.state.attrLists;
    },
    printFormListsJSON(){
      return this.$store.state.lists;
    }
  },
  created(){
    this.$store.dispatch('GetControlsList');
  },
  methods: {
    copied(){
      this.$store.commit('COPIED');
    },
    inserted(data){
      this.$store.commit('INSERTED',data);
    },
    selectedEvent(item){
      this.$store.commit('SELECTED_EVENT',item);
    },
    saveFormLists(){
      this.$store.commit('SAVE_FORM_LIST');
    },
  },
  components:{
    CONTROL,ATTRPANEL
  }

}
</script>

<style scoped lang="less">
 //  .controls-classify-name{padding: 10px; background-color: #2a2a2a; color: #ccc;}
	// .controls-list{width: 300px; height: 100%; position: fixed; left: 0; top:0; background-color: #f2f2f2; border-right: 1px solid #eee;
	// 	.vddl-draggable{width: 100px; height: 100px; text-align: center; float: left; cursor: move; padding: 0 10px; box-sizing: border-box; font-size: 12px;
	// 		//&:nth-child(odd){background-color: #fff;}
 //      //&:nth-child(even){background-color: #f0f0f0;}
 //      i{font-size: 30px; margin: 20px 0; display: inline-block; width: 100%; display:none;}

 //      &:hover{background-color: #bbb; color: #fff;}
	// 	}
	// }

 //  .form-body{width: calc(~"100% - 600px"); height: 100%; position: fixed; left: 300px; top:0;
 //    .control-panel{width: 360px; height: 742px; margin: 100px auto; position: relative; 
 //        //background: url(../assets/iphone8plus.png) 0 0 no-repeat;
 //      .screen{width: 330px; height: 580px; position: absolute; left: 15px; top:83px; overflow: auto;
 //        &::-webkit-scrollbar {width:2px;height:2px;}
 //        &::-webkit-scrollbar-track-piece {background:#EEE;-webkit-border-radius:6px;}
 //        &::-webkit-scrollbar-thumb:vertical {background:#555;-webkit-border-radius:6px;}
 //        &::-webkit-scrollbar-thumb:horizontal {background:#555;-webkit-border-radius:6px;}
 //        .vddl-draggable.selected{background-color: #ccc;}
 //      }
 //      .placeholder{width: 100%; height: 50px; background-color: #eee; border-bottom: 1px solid #ccc;}
 //    }
 //  }


</style>