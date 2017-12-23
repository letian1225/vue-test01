<template>
  <div>
    <header>
      <el-button-group>
        <el-button icon="fa fa-save"> 保存</el-button>
        <el-button icon="fa fa-folder-o"> 新建</el-button>
        <el-button icon="fa fa-folder-open-o"> 打开</el-button>
        <el-button icon="fa fa-code"> 控制台</el-button>
      </el-button-group>
    </header>
    <controls></controls>
    <design></design>
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

  header{height: 60px; width: 100%; position: fixed; left: 0; top:0; background-color: #f2f2f2; padding: 8px 10px; box-sizing: border-box;}

</style>