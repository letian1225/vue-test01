<template>

  <div>

    <div class="page-title">

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>表单共享</el-breadcrumb-item>
      </el-breadcrumb>

    </div>


    <el-tabs v-model="activeName" type="card" @tab-click="this.listWfFormWidgetsShare">
      <el-tab-pane label="所有表单" name="allform" >
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" max-height="750">
          <el-table-column prop="wff_name" label="表单名称">
          </el-table-column>
          <el-table-column prop="wff_name_ch" label="表单描述">
          </el-table-column>
          <el-table-column prop="wff_workflow" label="归属工作流ID">
            <template slot-scope="scope">
              {{scope.row.wff_workflow == 0 ? "未加入工作流" : scope.row.wff_workflow}}
            </template>
          </el-table-column>
          <el-table-column prop="wff_abled" label="状态">
            <template slot-scope="scope">
              {{scope.row.wff_abled == 1 ? "正常" : "禁用"}}
            </template>
          </el-table-column>
          <el-table-column prop="wff_create_time" label="创建时间">
          </el-table-column>
          <el-table-column prop="wff_start_time" label="启用时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="copyForm(scope.row.wff_id)" size="mini">共享</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已共享表单" name="shareform">
        <el-table :data="tableShareData" max-height="750">
          <el-table-column prop="wff_name" label="表单名称">
          </el-table-column>
          <el-table-column prop="wff_name_ch" label="表单描述">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="onCreateForm(scope.row.wff_id)" size="mini">编辑</el-button>
              <el-button type="primary" @click="delWfForms(scope.row.wff_id)" size="mini">删除</el-button>
              
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>


    


  </div>
</template>





<script>
import Vue from "vue";
export default {
  name: "list",
  data() {
    return {
      loading: true,
      tableData: [],
      tableShareData:[],
      dataList: [],
      activeName: 'allform',
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1 //默认开始页面
    };
  },
  created() {
    this.listWfFormWidgets();
    
  },
  computed: {},
  methods: {
    copyForm(wff_id){
      Vue.http
        .jsonp(this.URL + "Forms/copyForm", {
          params: {
            wff_id: wff_id,
            to_company_id: "1"
          }
        })
        .then(
          res => {
            console.log(res);
          },
          error => {}
        );
    },
    delWfForms(wff_id){
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http
            .jsonp(this.URL + "Forms/delWfForms", {
              params: { wff_id: wff_id }
            })
            .then(
              res => {
                if (res.data.errorCode == 1) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                } else {
                  this.$message({
                    type: "warning",
                    message: "删除失败!"
                  });
                }
                this.listWfFormWidgetsShare();
              },
              error => {}
            );
        })
        .catch(() => {});
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
    listWfFormWidgets() {
      Vue.http
        .jsonp(this.URL + "Forms/listWfForms", {
          params: {
            wff_company: this.$route.query.company_id,
            wff_module: this.$route.query.module_id
          }
        })
        .then(
          res => {
            console.log(res);
            if (res.data.errorCode == 1) {
              this.tableData = res.data.list;
              this.total = res.data.list.length;
            }
            this.loading = false;
          },
          error => {}
        );
    },
    //创建、编辑表单
    onCreateForm(wff_id) {
      
      this.$router.push({
        path: "/custom/form/edit",
        query: {
          wff_id: wff_id
        }
      });
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