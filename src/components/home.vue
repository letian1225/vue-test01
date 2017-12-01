<template>
  <div>


    <div v-for="list in lists">
      
      <!--
      <vddl-list :list="[]" class="panel__body--list">
        <vddl-placeholder class="panel__placeholder">
          DELETE
        </vddl-placeholder>
      </vddl-list>
      -->
      <br><br>

      <vddl-list class="panel__body--list" 
        :list="list.people" 
        :external-sources="true"
        :inserted="inserted">

        <vddl-draggable class="panel__body--item" v-for="(person, index) in list.people" :key="person.type"
          :draggable="person"
          :wrapper="list.people"
          :index="index"
          :selected="selected"
          effect-allowed="move">

          <CONTROL :data="person"></CONTROL>

        </vddl-draggable >

        <vddl-placeholder class="panel__placeholder">
          Drop any <strong></strong> here
        </vddl-placeholder>

      </vddl-list>

    </div>
    
    <br><br>
    
    <div v-for="list in controls">
      <vddl-list class="panel__body--list" 
        :list="list.norm"
        :allowed-types="list.norm">
        <vddl-draggable v-for="(norm, index) in list.norm" :key="norm.type"
          :draggable="norm"
          :wrapper="list.norm"
          :index="index"
          :copied="copied"
          :dragend="dragend"
          effect-allowed="copy">
          {{norm.type}}
        </vddl-draggable>
      </vddl-list>
    </div>
    
    <br><br>
    

    <ATTRPANEL :data="attribute" :attrLists="attrLists"></ATTRPANEL>
    
    
    <button type="button" v-on:click="save()">button</button>



    <br> 
    <pre>{{lists}}</pre> 

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
      "controls":[
        {
          "label": "Controls",
          "allowedTypes": [
            "page"
          ],
          "norm":[
            {
              "type": "TEXTBOX",
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

            }
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
    selected(data){
      this.attribute = []
      this.attribute.push(data);
      this.attrLists = [];
      for(let x in data){
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

<style scoped>
*{font-size: 12px;}
pre{width: 100%; text-align: left; font-size: 14px;}
.panel__body--list{min-height: 100px; }
.vddl-placeholder{opacity: .2;}
.vddl-dragging-source{color: #f00;}
</style>