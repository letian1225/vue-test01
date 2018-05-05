<template>
  <div>

    <ul>
      <li v-for="(item,index) in company_list" :key="index">
        <div class="pic">
          <img :src="item.company_logo == null ? 'data:image/png;base64,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' : item.company_logo">
        </div>
        <div class="info">
          <h3 :title="item.company_name">{{item.company_name}}</h3>
          <el-button size="small" @click="enter(item.company_id)">进入管理</el-button>
        </div>
      </li>
    </ul>

  </div>
</template>





<script>
import Vue from "vue";
export default {
  name: "company",
  data() {
    return {
      company_list: [],
      agent: []
    };
  },
  mounted() {},
  computed: {},
  created() {
    this.getAgentByUserID(this.AUID());
  },
  methods: {
    enter(company_id) {
      //跳转进入模块页面
      this.$router.push({
        path: "/custom/module/module",
        query: { company_id: company_id }
      });
    },
    getAgentByUserID(au_id) {
      Vue.http
        .jsonp(this.URL + "Agent/getAgentByUserID", {
          params: { au_id: au_id }
        })
        .then(
          res => {
            this.agent = res.data.agent;
            if (res.data.company_list == null && res.data.agent.a_level != 2) {
              this.$message({
                message: "您目前还未被上级分配可管理的公司！",
                type: "warning"
              });
            } else {
              console.log(res.data.company_list);
              this.company_list = res.data.company_list;
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
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  width: 220px;
  height: 220px;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #eee;
  margin: 10px;
  display: block;
  float: left;
}
li .pic {
  margin-top: 20px;
}
li .pic img {
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
li .info h3 {
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
li:hover {
  box-shadow: 0 0 5px #eee;
}
</style>