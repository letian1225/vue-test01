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
			  :dragend="dragend"
			  effect-allowed="copy">
			  	<i :class="norm.icon"></i>{{norm.type}}
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
  

    
  
    <ATTRPANEL :data="attribute" :attrLists="attrLists"></ATTRPANEL>
    
    




    

  </div>
</template>

<script>
import Vue from 'vue'
import Vddl from 'vddl';
import CONTROL from './control'
import ATTRPANEL from './attrPanel'
Vue.use(Vddl);

export default {
  name: 'vddl-item-types-demo',
  data(){
    return {
      attribute:[],
      attrLists:[],
      selected:"",
      "controls":[
        {
          "label": "Control library",
          "allowedTypes": [
            "page"
          ],
          "norm":[
            {
              "type": "TEXTBOX",
              "icon":"fa fa-edit",
              "labeltext":"label",
              "id":"",
              "name":"",
              "value":"",
              "maxLength":"",
              "readOnly":"",
              "align":"",
              "disabled":"",
            },
            {
              "type": "SELECT",
              "icon":"fa fa-caret-square-o-down",
              "labeltext":"label",
              "id":"",
              "name":"",
              "align":"",
              "disabled":"",
              "option":[
                {
                  "value":"",
                  "text":"",
                }
              ]
            },
            {
              "type": "RADIO",
              "icon": "fa fa-dot-circle-o",
              "labeltext":"label",
              "id":"",
              "name":"",
              "align":"",
              "disabled":"",
            },
            {
              "type": "CHECKBOX",
              "icon": "fa fa-check-square",
              "labeltext":"label",
              "id":"",
              "name":"",
              "align":"",
              "disabled":"",
            }
          ]
        }
      ],

      "lists": [
        {
          "label": "form",
          "allowedTypes": [
            "page"
          ],
          "people": [
            {
              "type": "SELECT",
              "labeltext":"label",
              "id":"7f275028-6aa1-46fd-ab32-19880d4a0a8d",
              "name":"",
              "align":"",
              "disabled":"",
              "option":[
                {
                  "value":"",
                  "text":"",
                }
              ]

            },
            
            //...
          ]
        }
      ]
    }
  },
  methods: {
    //controls methods
    copied(item){},
    dragend(data){},
    //lists methods
    inserted(data){
      data.item.id = this.guid();
    },
    selectedEvent(item){
      this.selected = item;
      this.attribute = []
      this.attribute.push(item);
      this.attrLists = [];
      for(let x in item){
        this.attrLists.push(x);
      }
    },
    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },
    save(){
      // for(let i = 0; i < this.lists[0].people.length; i++){
      //   this.lists[0].people[i].sort = i;
      // }
    }



  },
  components:{
    CONTROL,ATTRPANEL
  }

}
</script>

<style scoped lang="less">
  .controls-classify-name{padding: 10px; background-color: #2a2a2a; color: #ccc;}
	.controls-list{width: 300px; height: 100%; position: fixed; left: 0; top:0; background-color: #f2f2f2; border-right: 1px solid #eee;
		.vddl-draggable{width: 100px; height: 100px; text-align: center; float: left; cursor: move; padding: 0 10px; box-sizing: border-box; font-size: 12px;
			&:nth-child(odd){background-color: #fff;}
      &:nth-child(even){background-color: #f0f0f0;}
      i{font-size: 30px; margin: 20px 0; display: inline-block; width: 100%;}

      &:hover{background-color: #bbb; color: #fff;}
		}
	}

  .form-body{width: calc(~"100% - 600px"); height: 100%; position: fixed; left: 300px; top:0;
    .control-panel{width: 360px; height: 742px; margin: 100px auto; position: relative; background: url(../assets/iphone8plus.png) 0 0 no-repeat;
      .screen{width: 330px; height: 580px; position: absolute; left: 15px; top:83px; overflow: auto;
        &::-webkit-scrollbar {width:2px;height:2px;}
        &::-webkit-scrollbar-track-piece {background:#EEE;-webkit-border-radius:6px;}
        &::-webkit-scrollbar-thumb:vertical {background:#555;-webkit-border-radius:6px;}
        &::-webkit-scrollbar-thumb:horizontal {background:#555;-webkit-border-radius:6px;}
        .vddl-draggable.selected{background-color: #ccc;}
      }
      .placeholder{width: 100%; height: 50px; background-color: #eee; border-bottom: 1px solid #ccc;}
    }
  }


</style>