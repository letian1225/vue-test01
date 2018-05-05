<template>

  <div>
   

    <div class="page-body" style="padding:20px;"> 
      <h5>密码修改</h5>
      <el-form label-width="70px" style="width:300px; margin-top:50px;">
        <el-form-item label="新的密码">
          <el-input type="password" v-model="pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>





<script>
import Vue from "vue";

export default {
  name: "",
  data() {
    return {
      pass: "",
      checkPass: ""
    };
  },
  created() {},
  computed: {},
  methods: {
    submit() {
      if (this.pass == "" || this.checkPass == "") {
        this.$message({
          showClose: true,
          message: "不能为空",
          type: "error"
        });
        return;
      }
      if (this.checkPass != this.pass) {
        this.$message({
          showClose: true,
          message: "两个密码不一致",
          type: "error"
        });
        return;
      }
      this.editAgentUserPsd();
    },
    editAgentUserPsd() {
      Vue.http
        .jsonp(this.URL + "Agent/editAgentUserPsd", {
          params: {
            au_id: this.AUID(),
            au_psd: this.pass,
            update_au_id: this.AUID()
          }
        })
        .then(
          res => {
            console.log(res);
            if(res.data.errorCode == 1){
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              });
            }else{
              this.$message({
                showClose: true,
                message: res.data.errorName,
                type: 'error'
              });
            }
          },
          error => {}
        );
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
  h5{padding: 0 0 10px; margin: 0 0 20px 0; border-bottom: 1px solid #ddd;}
</style>