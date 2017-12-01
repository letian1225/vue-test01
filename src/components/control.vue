<!--Display control style-->
<template>
	<div>
		<div v-if="data.type == 'TEXTBOX'" class="control-item">
		  <div class="control-label">{{data.labeltext}}</div>
		  <div class="control-field"><input type="text"></div>
		</div>
		<div v-if="data.type == 'SELECT'" class="control-item">
		  <div class="control-label">{{data.labeltext}}</div>
		  <div class="control-field">
		  	<select name="">
		  		<option v-for="option in data.option" :value="option.value">{{option.text}}</option>
		  	</select>
		  </div>
		</div>
	</div>
</template>
<script>
	export default{
		props: ['data','index'],
	}
</script>
<style scoped lang="less">
.clearfix(){
	&:before,
	&:after{content:" "; display:table; clear:both;}
}
.control-item{ border-bottom:1px solid #ccc; width: 100%; box-sizing: border-box; padding: 10px 5px; .clearfix(); position: relative;
	.control-label{width: 30%;  height: 30px; line-height: 30px; float: left; white-space: normal; text-overflow: ellipsis; overflow: hidden;
		& + .control-field{width: 70%; float: left;}
	}
	.control-field{width: 100%;
		select{width: 100%; height: 30px;}
	}
}
</style>
