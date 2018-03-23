<template>
  <div class="header">
    <span class="brand">
        大连翼网科技有限公司
    </span>
    <div class="nav">
      <router-link to="/home/home" >我的工作台</router-link>
      <router-link to="/custom/home" :class="customActive">自定义管理</router-link>
      <router-link to="/sign/home" :class="signActive">考勤管理</router-link>
      <a href="javascript:;">系统设置</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavBar',
  data () {
    return {
    }
  },
  computed: {
    customActive(){
      let path = this.$route.path;
      if(path.indexOf('custom') !== -1){
        return "router-link-active"
      }
    },
    signActive(){
      let path = this.$route.path;
      if(path.indexOf('sign') !== -1){
        return "router-link-active"
      }
    },


  },
  methods:{
  },
  components:{}
}
</script>

<style scoped lang="less">
  
</style>
