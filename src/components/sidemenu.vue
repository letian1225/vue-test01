<template>
  <div>
   	
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <a href="javascript:void(0);" class="toogle-side-menu" v-on:click="isCollapse=!isCollapse"></a>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">模块</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">工作流</span>
      </el-menu-item>
      
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">表单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">表单管理</el-menu-item>
          <el-menu-item index="3-2">控件管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {
      isCollapse: false,
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  components:{}
}
</script>

<style scoped lang="less">
.toogle-side-menu{position: absolute; right: -11px; top:50px; width: 11px; height: 40px; text-align: center; background: rgb(84, 92, 100) url(../assets/toogle.png) center no-repeat; color: #fff;
  &:hover{ opacity: .9; transition: opacity .5s ease}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 100%;
}
</style>
