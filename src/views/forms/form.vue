<template>
  <div>
  
  <header id="header" class="header"></header>
  



  
  <controls></controls>
  <design></design>
	

  


  

  
  

 
  
<!--
    
    <pre v-highlightjs><code class="json">{{lists}}</code></pre>

-->



  </div>
</template>
<script>

import controls from '../../components/forms/controls'
import design from '../../components/forms/design'





export default {
  name:"",
  components:{
    controls,design
  }
}
</script>

<style scoped lang="less">
  //.header{ width: 100%; height: 40px; box-sizing: border-box; background: linear-gradient(to right, rgb(97, 144, 232), rgb(167, 191, 232));}
  .controls-classify-name{ display:none; padding: 10px; background-color: #1d4350; color: #fff;}
  .controls-list{width: 100px;  height: calc(~"100% - 40px");  position: fixed; left: 0; top:40px; background-color: #fff; 
    .controls-list-inner{
      
    }
  }

  .design{width: 400px; height: calc(~"100% - 40px"); overflow: auto; position: fixed; left: 100px; top:40px;
    // &::-webkit-scrollbar {width:2px;height:2px;}
    // &::-webkit-scrollbar-track-piece {background:#EEE;-webkit-border-radius:6px;}
    // &::-webkit-scrollbar-thumb:vertical {background:#555;-webkit-border-radius:6px;}
    // &::-webkit-scrollbar-thumb:horizontal {background:#555;-webkit-border-radius:6px;}
    // .design-inner{
    //  .design-inner{}
    //   .sortable-ghost{width: 100%; float: left; background-color: #f2f2f2; }
    //   .item{margin: 10px 0; padding: 5px; float: left; width: 100%;
    //    .labeltext{margin:5px 0 0 0;}
    //    }
    .selected{background-color:#eee;}
    
    // }
  }

</style>