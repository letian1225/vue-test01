<template>
  <div>
    <input type="text" v-model="uname">
    <input type="text" v-model="upass">
    <a href="javascript:void(0);" v-on:click="login()">submit</a>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      uname:"",
      upass:""

    }
  },
  methods:{
    login:function(){
      if(this.uname !== "" && this.upass !== ""){
        this.$router.push('form')
      }else{
        
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
