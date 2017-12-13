<!--All attribute setting-->
<template>
	<div class="setting">
		<pre>
			{{setting}}
		</pre>
		<div class="setting-inner">
		  	<div>{{setting.type}}</div>
			
			<div v-if="setting.labeltext">
				<input type="text" v-model="setting.labeltext">
			</div>



		  <!--
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

			-->

		    <!-- <div v-if="attr.type == 'SELECT'">
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
		    </div> -->

		   
		  </div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      setting:'setting',
    }),
  },
  created(){
    
  },
  methods: {
  	
  },
  components:{}
}
</script>
<style scoped lang="less">

.setting{width: 200px; height: calc(~"100% - 40px"); position: fixed; right: 0; top:40px; background-color: #fff;}


</style>
