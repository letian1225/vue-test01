<template>
  <div>
    <el-menu :default-active="$route.path" class="menu" unique-opened router>

      

      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-database"></i>
          <span slot="title">功能设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/source/source">数据源管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/custom/control/control">表单控件管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!--
      <el-submenu index="5">
        <template slot="title">
          <i class="fa fa-list"></i>
          <span slot="title">列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/list/list">列表管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      -->

      <!--
      <el-submenu index="7">
        <template slot="title">
          <i class="fa fa-line-chart"></i>
          <span slot="title">统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/custom/statistics/statistics">统计管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      -->

    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">

</style>
