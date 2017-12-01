<!--Display control style-->
<template>
	<div class="control-panel">

		<div v-if="data.type == 'TEXTBOX'" class="control-item">
		  <div class="control-label">{{data.labeltext}}</div>
		  <div class="control-field"><input type="text"></div>
		</div>

		<div v-if="data.type == 'SELECT'" class="control-item">
		  <div class="control-label">{{data.labeltext}}</div>
		  <div class="control-field">
		  	<select name="" :disabled="data.disabled">
		  		<option v-for="option in data.option" :value="option.value">{{option.text}}</option>
		  	</select>
		  </div>
		</div>

	</div>
  
</template>
<script>
	export default{
		props: ['data']
	}
</script>
<style scoped lang="less">
.clearfix(){
	&:before,
	&:after{content:" "; display:table; clear:both;}
}
.control-item{ border:1px solid #eee; padding: 5px; margin: 5px; .clearfix();
	.control-label{width: 30%; float: left;
		& + .control-field{width: 70%; float: left;}
	}
	.control-field{width: 100%;}
}
</style>
