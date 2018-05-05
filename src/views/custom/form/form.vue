<template>

	<div>

		<div class="page-title">

			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/custom/company/company' }">选择公司</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/custom/module/module?company_id='+$route.query.company_id }">模块管理</el-breadcrumb-item>
				<el-breadcrumb-item>表单管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="pull-right">
				<el-button type="primary" size="mini" @click="onCreateForm('0')">新建表单</el-button>
				<el-button size="mini" onclick="window.history.go(-1)">返回上一级</el-button>
			</div>

		</div>

		<div class="page-body">

			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" max-height="750">
				<el-table-column prop="wff_name" label="表单名称">
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
						<el-button @click="onCreateForm(scope.row.wff_id)" size="mini">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>

		</div>

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
      dataList: [],
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
      if (wff_id === 0) {
        this.$router.push({
          path: "/custom/form/edit",
          query: {
            wff_id: 0,
            module_id: this.$route.query.module_id,
            company_id: this.$route.query.company_id
          }
        });
      } else {
        this.$router.push({
          path: "/custom/form/edit",
          query: {
            wff_id: wff_id,
            module_id: this.$route.query.module_id,
            company_id: this.$route.query.company_id
          }
        });
      }
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