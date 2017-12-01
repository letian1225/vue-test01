<template>
	<div>
		<div v-for="attr in data">
		  <h3>{{attr.type}}</h3>
		  <div v-for="attrList in attrLists">
		    <!--All Attribute-->
		    <div v-if="attrList == 'labeltext'">
		      <input type="text" v-model="attr.labeltext">
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

		    <div v-if="attr.type == 'SELECT'">
		      <div v-if="attrList == 'option'">
		        <vddl-list :list="attr.option">
		          <vddl-draggable v-for="(option, index) in attr.option" :key="option.value"
		            :draggable="option"
		            :wrapper="attr.option"
		            :index="index"
		            effect-allowed="move">
		            <input type="text" v-model="option.value">
		            <input type="text" v-model="option.text">
		            <a href="javascript:void(0);" v-on:click="attr.option.splice(index, 1)">remove</a>
		          </vddl-draggable>
		        </vddl-list>
		        <a href="javascript:void(0);" v-on:click="attr.option.push({'value':'','text':''})">add a option</a>
		      </div>
		    </div>

		  </div>
		</div>
	</div>
</template>
<script>
	export default{
		props: ['data','attrLists']
	}
</script>
<style scoped lang="less">
</style>
