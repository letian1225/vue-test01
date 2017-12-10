<!--All attribute setting-->
<template>
	<div class="setting">
		<!-- <div v-for="attr in data">
		  <h3 class="attr-control-name">{{attr.type}}</h3>
		  <div v-for="attrList in attrLists">
		    <div v-if="attrList == 'labeltext'">
		    	<div class="attr-item">
		    		<div class="attr-item-label">LabelName</div>
		    		<div class="attr-item-field"><input type="text" v-model="attr.labeltext"></div>
		    	</div>
		    </div>

		    <div v-if="attrList == 'name'">
		    	<div class="attr-item">
		    		<div class="attr-item-label">Name</div>
		    		<div class="attr-item-field"><input type="text" v-model="attr.name"></div>
		    	</div>
		    </div>

		    <div v-if="attrList == 'align'">
		      <div class="attr-item">
		      	<div class="attr-item-label">Align</div>
		      	<div class="attr-item-field">
		      		<select v-model="attr.align">
		      		  <option value=""></option>
		      		  <option value="left">left</option>
		      		  <option value="right">right</option>
		      		</select>
		      	</div>
		      </div>
		    </div>

		    <div v-if="attrList == 'disabled'">
		      <div class="attr-item">
		      	<div class="attr-item-label">Disabled</div>
		      	<div class="attr-item-field">
		      		<select v-model="attr.disabled">
		      		  <option value=""></option>
		      		  <option value="true">true</option>
		      		  <option value="false">false</option>
		      		</select>
		      	</div>
		      </div>
		    </div>

		    <div v-if="attrList == 'value'">
		    	<div class="attr-item">
		    		<div class="attr-item-label">Value</div>
		    		<div class="attr-item-field"><input type="text" v-model="attr.value"></div>
		    	</div>
		    </div>

		    <div v-if="attrList == 'maxLength'">
		      <div class="attr-item">
		      	<div class="attr-item-label">MaxLength</div>
		      	<div class="attr-item-field"><input type="text" v-model="attr.maxLength"></div>
		      </div>
		    </div>

		    <div v-if="attrList == 'readOnly'">
		      <div class="attr-item">
		      	<div class="attr-item-label">Readonly</div>
		      	<div class="attr-item-field">
					<select v-model="attr.readOnly">
					  <option value=""></option>
					  <option value="true">true</option>
					  <option value="false">false</option>
					</select>
		      	</div>
		      </div>
		    </div>

		    <div v-if="attr.type == 'SELECT'">
		      <div v-if="attrList == 'option'">
		        <vddl-list :list="attr.option">
		          <vddl-draggable v-for="(option, index) in attr.option" :key="option.value"
		            :draggable="option"
		            :wrapper="attr.option"
		            :index="index"
		            effect-allowed="move">
		            <div class="attr-item">
		            	<div class="attr-item-label">Option</div>
		            	<div class="attr-item-label sm">V</div>
		            	<div class="attr-item-field sm"><input type="text" v-model="option.value"></div>
		            	<div class="attr-item-label sm">T</div>
		            	<div class="attr-item-field sm"><input type="text" v-model="option.text"></div>
		            	<a href="javascript:void(0);" v-on:click="attr.option.splice(index, 1)" class="fa fa-remove"></a>
		            </div>
		          </vddl-draggable>
		        </vddl-list>
		        <a href="javascript:void(0);" v-on:click="attr.option.push({'value':'','text':''})">add a option</a>
		      </div>
		    </div>

		    <div v-if="attr.type == 'RADIO'">
		      <div v-if="attrList == 'group'">
		        <vddl-list :list="attr.group">
		          <vddl-draggable v-for="(group, index) in attr.group" :key="group.value"
		            :draggable="group"
		            :wrapper="attr.group"
		            :index="index"
		            effect-allowed="move">
		            <div class="attr-item">
		            	<div class="attr-item-label">Group</div>
		            	<div class="attr-item-label sm">ID</div>
		            	<div class="attr-item-field sm"><input type="text" v-model="group.id"></div>
		            	<div class="attr-item-label sm">Name</div>
		            	<div class="attr-item-field sm"><input type="text" v-model="group.name"></div>
		            	<div class="attr-item-label sm">V</div>
		            	<div class="attr-item-field sm"><input type="text" v-model="group.value"></div>
		            	<div class="attr-item-label sm">T</div>
		            	<div class="attr-item-field sm"><input type="text" v-model="group.text"></div>
		            	<a href="javascript:void(0);" v-on:click="attr.group.splice(index, 1)" class="fa fa-remove"></a>
		            </div>
		          </vddl-draggable>
		        </vddl-list>
		        <a href="javascript:void(0);" v-on:click="attr.group.push({'id':'','name':'','value':'','text':''})">add a radio</a>
		      </div>
		    </div>

		  </div>
		</div> -->
	</div>
</template>
<script>
// import Vue from 'vue'
// import Vddl from 'vddl';
// import { mapGetters, mapActions } from 'vuex';
// Vue.use(Vddl);
// export default {
//   computed: {
//     ...mapGetters({
//       controls:'controls',
//     }),
//   },
//   created(){
//     this.$store.dispatch('controls')
//   },
//   methods: {},
//   components:{}
// }
</script>
<style scoped lang="less">

.setting{width: 500px; height: calc(~"100% - 40px"); position: fixed; right: 0; top:40px; border-left: 1px solid #eee; background-color: #f2f2f2;}


</style>
