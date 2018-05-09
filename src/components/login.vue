<template>
  <div class="login-wallpaper">
    <div class="login">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
        <el-form-item prop="au_login_name">
          <el-input placeholder="请输入用户名" suffix-icon="fa fa-user" type="text" v-model="loginForm.au_login_name" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item prop="au_psd">
          <el-input placeholder="请输入密码" suffix-icon="fa fa-lock" type="password" v-model="loginForm.au_psd" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">立刻登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { setCookie, getCookie } from "@/vendor/cookie.js";
export default {
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        au_login_name: "",
        au_psd: ""
      },
      rules: {
        au_login_name: [{ validator: validateName, trigger: "blur" }],
        au_psd: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (getCookie("username")) {
      this.$router.push("/home/home");
    }
  },
  methods: {
    agentUserLogin() {
      Vue.http
        .jsonp(this.URL + "Agent/agentUserLogin", {
          params: {
            au_login_name: this.loginForm.au_login_name,
            au_psd: this.loginForm.au_psd
          }
        })
        .then(
          res => {
            if (res.data.errorCode == "1") {
              setCookie("username", this.loginForm.au_login_name, 1000 * 60);
              setCookie("a_id", res.data.agent_user.a_id, 1000 * 60);
              setCookie("au_id", res.data.agent_user.au_id, 1000 * 60);
              this.$router.push("/home/home");
            } else {
              this.$message({
                showClose: true,
                message: res.data.errorReason,
                type: 'error'
              });
            }
          },
          error => {}
        );
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.agentUserLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-wallpaper {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: url("../assets/login-wallpaper.jpg") 0 0 no-repeat;
  background-size: auto 100%;
}
.login {
  width: 500px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 1);
  padding: 100px;
  box-sizing: border-box;
}
</style>
