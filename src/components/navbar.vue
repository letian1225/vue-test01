<template>
  <div>
    <el-menu
    	:default-active="$route.path" 
      router
    	mode="horizontal" 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    	@select="handleSelect">
      	<el-menu-item index="/home">我的桌面</el-menu-item>
        <el-menu-item index="/home">系统设置</el-menu-item>
      	<el-submenu index="9" style="float:right; margin:0 20px 0 0;">
	        <template slot="title">当前登录用户：Eason</template>
	        <el-menu-item index="9-1">个人设置</el-menu-item>
	        <el-menu-item index="9-2">退出登录</el-menu-item>
      	</el-submenu>

    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
    	activeIndex: '1',
    }
  },
  methods:{
  	handleSelect(key, keyPath) {
    	console.log(key, keyPath);
  	}
  },
  components:{}
}
</script>

<style scoped>

</style>
