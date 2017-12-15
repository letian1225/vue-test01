<template>
    <div class="login-wallpaper">
      <div class="login">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              suffix-icon="fa fa-user"
               type="text" v-model="loginForm.username" auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              placeholder="请输入密码"
              suffix-icon="fa fa-lock"
               type="password" v-model="loginForm.pass" auto-complete="off">
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


export default {
   data() {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else{
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          pass: '',
        },
        rules: {
          username: [
            { validator: validateName, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
     };
   },
   methods: {
     submitForm(formName) {
       this.$refs[formName].validate((valid) => {
         if (valid) {
           this.$router.push('home')
         } else {
           console.log('error submit!!');
           return false;
         }
       });
     }
   }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-wallpaper{width: 100%; height: 100%; position: fixed; left: 0; top:0; background: url('../assets/login-wallpaper.jpg') 0 0 no-repeat; background-size: auto 100%;}
  .login{width: 500px; height: 100%; position: fixed; right: 0; top: 0; background-color: rgba(255, 255, 255, 1); padding: 100px; box-sizing: border-box;}
  
</style>
