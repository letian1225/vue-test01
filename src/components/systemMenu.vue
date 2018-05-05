<template>
  <div>
    <el-menu :default-active="$route.path" class="menu" unique-opened router>
      
      <el-submenu index="1" v-show="a_level == 0 ? false : true">
        <template slot="title">
          <i class="fa fa-sitemap"></i>
          <span slot="title">代理商</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/proxy/proxy">代理商管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-cog"></i>
          <span slot="title">个人设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/admin/password">密码设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


    </el-menu>
  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from "@/vendor/cookie.js";
export default {
  name: '',
  data () {
    return {
      a_level:getCookie("a_level"),
    }
  },
  methods:{},
  components:{}
}
</script>

<style scoped lang="less">

</style>
