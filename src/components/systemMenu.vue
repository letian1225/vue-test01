<template>
  <div>
    <el-menu :default-active="$route.path" class="menu" unique-opened router>
      
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-sitemap"></i>
          <span slot="title">代理商</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/proxy/proxy">代理商管理</el-menu-item>
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
