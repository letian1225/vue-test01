<!--获取表单列表的SELECT控件-->
<template>
    <el-select v-model="value" placeholder="请选择" @change="formIdFun" >
      <el-option
        v-for="item in options"
        :key="item.wff_id"
        :label="item.wff_name"
        :value="item.wff_id"
        :disabled="(item.wff_abled == 0)? true : false">
          <span style="float: left;">{{ item.wff_name }}</span>
          <span style="float: right;">{{ item.wff_id }}</span>
      </el-option>
    </el-select>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'module',
  data () {
    return {
      options: [],
      value: ''
    }
  },
  created(){
    this.listWfForms()
  },
  methods:{
    formIdFun(){
      this.$emit('formIdFun',this.value)
      console.log(this.value)
    },
    listWfForms(){
      Vue.http.jsonp("http://milibangong.cn/Appservice/Forms/listWfForms")
         .then((res) => {
            this.options = res.data.list
            
         }, (error) => { })
    },
  },
  components:{}
}
</script>

<style scoped lang="less">

</style>
