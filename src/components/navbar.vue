<template>
  <div class="header">
    <span class="brand">
      
    </span>
    <div class="nav">
      <!-- <router-link to="/home/home">我的工作台</router-link> -->
      <router-link to="/custom/company/company" :class="customActive">主线</router-link>
      <!-- <router-link to="/sign/home" :class="signActive">考勤管理</router-link> -->
      <router-link to="/system/home" :class="systemActive">设置</router-link>

    </div>
    <div class="pull-right">
      <span class="companyinfo">
          <a href="javascript:void(0);">
            <i class="fa fa-diamond"></i>
            <em>{{this.agent.a_name}}</em>
          </a>
      </span>
      

      <el-tooltip class="item" effect="dark" content="个人设置" placement="bottom">
        <router-link to="/system/admin/password">
          <i class="fa fa-user-circle-o"></i>
          <em>{{au_login_name}}</em>
        </router-link>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
        <a href="javascript:void(0);" @click="exit">
          <i class="fa fa-sign-out"></i>
        </a>
      </el-tooltip>
    </div>



  </div>
</template>

<script>
import Vue from "vue";
import { setCookie, getCookie, delCookie } from "@/vendor/cookie.js";

export default {
  name: "NavBar",
  data() {
    return {
      au_login_name: "",
      agent: {},
      aid: "",
      au_id: "",
    };
  },
  mounted() {
    if (getCookie("username")) {
      this.au_login_name = getCookie("username");
      this.au_id = getCookie("au_id");
      this.aid = getCookie("a_id");
      this.getAgentByUserID(this.au_id);
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    customActive() {
      let path = this.$route.path;
      if (path.indexOf("custom") !== -1) {
        return "router-link-active";
      }
    },
    signActive() {
      let path = this.$route.path;
      if (path.indexOf("sign") !== -1) {
        return "router-link-active";
      }
    },
    systemActive() {
      let path = this.$route.path;
      if (path.indexOf("system") !== -1) {
        return "router-link-active";
      }
    }
  },
  methods: {
    exit() {
      delCookie("username", "");
      delCookie("au_id", "");
      delCookie("a_id", "");
      delCookie("a_level", "");
      delCookie("a_parent_id", "");
      delCookie("is_can_create", "");
      if (getCookie("username") == "") {
        this.$router.push("/");
      }
    },
    getAgentByUserID(au_id) {
      Vue.http
        .jsonp(this.URL + "Agent/getAgentByUserID", {
          params: { au_id: au_id }
        })
        .then(
          res => {
            this.agent = res.data.agent;
            setCookie("a_level", res.data.agent.a_level, 1000 * 60);
            setCookie("is_can_create", res.data.agent.is_can_create, 1000 * 60);
            setCookie("a_parent_id", res.data.agent.a_parent_id, 1000 * 60);
          },
          error => {}
        );
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
em {
  font-style: normal;
}
.company_list_dialog_content ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.company_list_dialog_content li {
  width: 238px;
  height: 220px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #eee;
  margin: 10px;
  display: inline-block;
}
.company_list_dialog_content li .pic {
  margin-top: 20px;
}
.company_list_dialog_content li .pic img {
  width: 80px;
  height: 80px;
}
.company_list_dialog_content li .info h3 {
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.company_list_dialog_content li:hover {
  box-shadow: 0 0 5px #eee;
}
.company_list_dialog_footer {
  text-align: center;
}
.company_list_dialog_footer .el-button {
  margin: 15px 0;
}
.userinfo,
.companyinfo {
  color: #fff;
  line-height: 60px;
  display: inline-block;
  font-size: 14px;
}
.pull-right a {
  color: #fff;
  margin-right: 10px;
  font-size: 14px;
  &:hover {
    color: #eee;
  }
}
.pull-right i.fa {
  margin: 0 5px;
}
</style>
