<template>
  <div>
    <input type="text" v-model="uname">
    <input type="text" v-model="upass">
    <a href="javascript:void(0);" v-on:click="foo()">submit</a>
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
    foo:function(){
      if(this.uname !== "" && this.upass !== ""){
        this.$router.push('form')
      }
      console.log(this.uname);
      console.log(this.upass);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
