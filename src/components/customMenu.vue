<template>
  <div>
    <el-menu :default-active="$route.path" class="menu" unique-opened router>
      
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-table"></i>
          <span slot="title">表单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/form/form">表单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-th"></i>
          <span slot="title">模块</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/module/module">模块管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-database"></i>
          <span slot="title">数据源</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/source/source">数据源管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-dot-circle-o"></i>
          <span slot="title">控件</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/control/control">控件管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


      <el-submenu index="5">
        <template slot="title">
          <i class="fa fa-list"></i>
          <span slot="title">列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/list/list">列表管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="6">
        <i class="fa fa-sitemap"></i>
        <span slot="title">工作流</span>
      </el-menu-item>
      
      

      <el-submenu index="7">
        <template slot="title">
          <i class="fa fa-line-chart"></i>
          <span slot="title">统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/statistics/statistics">统计管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {}
  },
  methods:{},
  components:{}
}
</script>

<style scoped lang="less">

</style>
