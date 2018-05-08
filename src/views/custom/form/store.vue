<template>

  <div>

   

    <div class="page-title">

			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/custom/company/company' }">选择公司</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/custom/module/module?company_id='+$route.query.company_id }">模块管理</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/custom/form/form?module_id='+$route.query.module_id+'&company_id='+$route.query.company_id }">表单管理</el-breadcrumb-item>
        <el-breadcrumb-item>表单市场</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="pull-right">
				<el-button size="mini" onclick="window.history.go(-1)">返回上一级</el-button>
			</div>

		</div>

    <el-table :data="tableShareData" max-height="750">
      <el-table-column prop="wff_name" label="表单名称">
      </el-table-column>
      <el-table-column prop="wff_name_ch" label="表单描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="copyForm(scope.row.wff_id)" size="mini">使用</el-button>
          
        </template>
      </el-table-column>
    </el-table>



    


  </div>
</template>





<script>
import Vue from "vue";
export default {
  name: "list",
  data() {
    return {
      tableShareData:[],
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1 //默认开始页面
    };
  },
  created() {
    this.listWfFormWidgetsShare();
    
  },
  computed: {},
  methods: {
    copyForm(wff_id){
      Vue.http
        .jsonp(this.URL + "Forms/copyForm", {
          params: {
            wff_id: wff_id,
            to_company_id: this.$route.query.company_id,
            to_module_id:this.$route.query.module_id
          }
        })
        .then(
          res => {
            console.log(res);
          },
          error => {}
        );
    },
    listWfFormWidgetsShare() {
      Vue.http
        .jsonp(this.URL + "Forms/listWfForms", {
          params: {
            wff_company: "1",
          }
        })
        .then(
          res => {
            console.log(res);
            this.tableShareData = res.data.list; 
            
          },
          error => {}
        );
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
  .el-tabs{padding:10px;}
</style> 