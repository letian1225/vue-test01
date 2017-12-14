<template>
  <div>
   	
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <a href="javascript:void(0);" class="toogle-side-menu" v-on:click="isCollapse=!isCollapse"></a>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">模块管理</span>
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
        <span slot="title">工作流管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">表单管理</span>
      </el-menu-item>
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
.toogle-side-menu{position: absolute; right: -9px; top:50px; width: 8px; height: 80px; text-align: center; background-color: #409EFF; color: #fff;
  &:hover{ opacity: .5;}
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 100%;
}
</style>
