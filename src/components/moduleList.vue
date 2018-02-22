<template>
    <el-select v-model="value" placeholder="请选择" @change="setModule">
      <el-option
        v-for="item in options"
        :key="item.wm_id"
        :label="item.wm_name"
        :value="item.wm_id"
        :disabled="(item.wm_abled == 0)? true : false">
          <span style="float: left"><img width="20" height="20" :src="'../../static/images/module/'+item.wm_icon+'@3x.png'" style="vertical-align: middle;"></span>
          <span style="float: right;">{{ item.wm_name }}</span>
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
  props:['getModuel'],
  created(){
    this.listWfModule()
  },
  methods:{
    setModule(){
      this.$emit('setModule',this.value)
    },
    listWfModule(){
      Vue.http.jsonp("http://milibangong.cn/Appservice/Module/listWfModule")
         .then((res) => {
            this.options = res.data.list
            this.value = this.getModuel
            console.log(this.value)
         }, (error) => { })
    },
  },
  components:{}
}
</script>

<style scoped lang="less">

</style>
