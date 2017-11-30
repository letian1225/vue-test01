<template>
  <div>


    <div v-for="list in lists">
      
      <vddl-list :list="[]" class="panel__body--list">
        <vddl-placeholder class="panel__placeholder">
          DELETE
        </vddl-placeholder>
      </vddl-list>
      
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
          {{person.type}}
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


    <div v-for="attr in attribute">
      {{attr}}

      <h3>{{attr.type}}</h3>
      <div v-for="attrList in attrLists">

        
        <!--All Attribute-->
        


        <div v-if="attrList == 'id'">
          <input type="text" v-model="attr.id">
        </div>

        <div v-if="attrList == 'name'">
          <input type="text" v-model="attr.name">
        </div>

        <div v-if="attrList == 'align'">
          <select v-model="attr.align">
            <option value=""></option>
            <option value="left">left</option>
            <option value="right">right</option>
          </select>
        </div>

        <div v-if="attrList == 'disabled'">
          <select v-model="attr.disabled">
            <option value=""></option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <div v-if="attrList == 'value'">
          <input type="text" v-model="attr.value">
        </div>

        <div v-if="attrList == 'maxLength'">
          <input type="number" v-model="attr.maxLength">
        </div>





        <div v-if="attrList == 'readOnly'">
          <select v-model="attr.readOnly">
            <option value=""></option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <div v-if="attr.type == 'TEXTBOX'">
          
        </div>


      </div>
      

    </div>
    <button type="button" v-on:click="save()">button</button>


    <br>
    <pre>{{controls}}</pre>
    <br> 
    <pre>{{lists}}</pre> 

  </div>
</template>

<script>
import Vue from 'vue'
import Vddl from 'vddl';
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
              "type": "TEXTBOX",
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
              "id":"",
              "name":"",
              "align":"",
              "disabled":"",

            },
            {
              "type": "RADIO",
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
    inserted(data){},
    selected(data){
      this.attribute = []
      this.attribute.push(data);
      this.attrLists = [];
      for(let x in data){
        this.attrLists.push(x);
      }
     
    },



    save(){
      // for(let i = 0; i < this.lists[0].people.length; i++){
      //   this.lists[0].people[i].sort = i;
      // }
      console.log(this.lists);
    }



  }

}
</script>

<style scoped>
*{font-size: 12px;}
pre{width: 100%; text-align: left; font-size: 14px;}
.panel__body--list{min-height: 100px; background-color: #f7f7f7;}
.vddl-placeholder{opacity: .2;}
.vddl-dragging-source{color: #f00;}
</style>