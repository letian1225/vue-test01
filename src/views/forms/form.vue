<template>
  <div>
    <el-container>
      <el-header>
          <el-menu class="el-menu-demo" mode="horizontal">

            <el-submenu index="2">
              <template slot="title">菜单</template>
              <el-menu-item index="2-1">新建表单</el-menu-item>
              <el-menu-item index="2-2">保存表单</el-menu-item>
              <el-menu-item index="2-3">控制台</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank"></a></el-menu-item>
          </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <controls></controls>
        </el-aside>
        <el-main style="padding:0">
          <design></design>
        </el-main>
      </el-container>
    </el-container>
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


</style>