<!--Display control style-->
<template>
	<div>
		<div v-if="data.type == 'TEXTBOX'" class="control-item">
		  <div class="control-label">{{data.labeltext}}</div>
		  <div class="control-field"><input type="text" :value="data.value"></div>
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
.control-item{ 
	width: 100%; box-sizing: border-box; padding: 10px 5px; .clearfix(); position: relative;
	.control-label{width: 30%;  height: 30px; line-height: 30px; font-size: 12px; float: left; white-space: normal; text-overflow: ellipsis; overflow: hidden;
		& + .control-field{width: 70%; float: left;}
	}
	.control-field{width: 100%;
		input[type=text]{width: 100%; pointer-events: none; height: 30px; padding: 0 5px; box-sizing: border-box; border:1px solid #333; -webkit-appearance:none; background-color: #fff;}
		
		select{width: 100%; height: 30px; pointer-events: none; padding: 0 5px; box-sizing: border-box; border:1px solid #333; -webkit-appearance:none; background: url("../assets/arrow.png") #fff no-repeat scroll right center ;}
	}
}
</style>
