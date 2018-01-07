<template>
  <div>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
      <a href="javascript:void(0);" class="toogle-side-menu" v-on:click="isCollapse=!isCollapse"></a>
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-th"></i>
          <span slot="title">模块</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/module/list">模块管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="fa fa-sitemap"></i>
        <span slot="title">工作流</span>
      </el-menu-item>
      
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-keyboard-o"></i>
          <span slot="title">表单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/forms/list">表单管理</el-menu-item>
          <el-menu-item index="/forms/dataSource">数据源管理</el-menu-item>
          <el-menu-item index="/forms/control">控件管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-line-chart"></i>
          <span slot="title">统计</span>
        </template>
       
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-key"></i>
          <span slot="title">权限</span>
        </template>
        
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
  &:hover{ opacity: .9; transition: opacity .5s ease;}

}
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 100%;
}
.el-submenu__title i{margin-right: 10px;}
.el-menu-item i{margin-right: 10px;}
</style>
