<template>
  <div>
  
  <header id="header" class="header"></header>
  



  
  <controls></controls>
  <design></design>
  <setting></setting>
	

  


  

  
  

 
  
<!--
    
  
    
  
   <modal name="console" 
    :width="900"
    height="auto"
    :scrollable="true">
    <pre v-highlightjs><code class="json">{{lists}}</code></pre>
  </modal> 

-->



  </div>
</template>
<script>

import controls from '../../components/forms/controls'
import design from '../../components/forms/design'
import setting from '../../components/forms/setting'



export default {
  name:"form",
  components:{
    controls,design,setting
  }
}
</script>

<style scoped lang="less">

  .header{ width: 100%; height: 40px; box-sizing: border-box; background: linear-gradient(to right, rgb(97, 144, 232), rgb(167, 191, 232));}


</style>