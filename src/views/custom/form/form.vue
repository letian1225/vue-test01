<template>
	
	<div>
		
		<div class="page-title">
			<span>表单管理</span>
		</div>
		<div class="page-body">
			<div class="search-bar">
				<el-button type="primary" size="small"  @click="onCreateForm('0')">新建表单</el-button>
			</div>
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" max-height="750">
			    <!-- <el-table-column
			      prop="wff_id"
			      label="ID">
			    </el-table-column> -->
			    <el-table-column
			      prop="wff_name"
			      label="表单名称">
			    </el-table-column>
			    <el-table-column
			      prop="wff_company"
			      label="公司ID">
			    </el-table-column>
			    <el-table-column
			      prop="wff_module"
			      label="归属模块ID">
			    </el-table-column>
			    <el-table-column
			      prop="wff_workflow"
			      label="归属工作流ID">
			    </el-table-column>
			    <el-table-column
			      prop="wff_abled"
			      label="状态">
			      <template slot-scope="scope">
			      	{{scope.row.wff_abled == 1 ? "启用" : "禁用"}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="wff_create_time"
			      label="创建时间">
			    </el-table-column>
			    <el-table-column
			      prop="wff_start_time"
			      label="启用时间">
			    </el-table-column>
			    <el-table-column label="操作" fixed="right">
			      <template slot-scope="scope">
			        <el-button @click="onCreateForm(scope.row.wff_id)" size="mini">编辑</el-button>
			        <el-button @click="onGetFormData(scope.row.wff_id)" type="info" size="mini">数据</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>

		</div>

		<el-dialog title="表单JSON结构" :visible.sync="dialogShowJsonVisible">
	  		<pre>{{rowJson}}</pre>
		</el-dialog>

		<el-dialog title="数据列表" :visible.sync="dialogDataListVisible">
	  		<table class="layout-table">
	  			<thead>
	  				<tr>
	  					<th v-for="(value, i) in dataList[0]" :key="i">{{value.labelName}}[{{value.name}}]</th>
	  				</tr>
	  			</thead>
	  			<tbody>
	  				<tr v-for="(item, i) in dataList" :key="i">
	  					<td v-for="(value, i) in item" :key="i">{{value.value}}</td>
	  				</tr>
	  			</tbody>
	  		</table>
		</el-dialog>
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
      rowJson: [],
      dialogShowJsonVisible: false,
      dialogDataListVisible: false,
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
    onGetFormData(wff_id) {
      this.dialogDataListVisible = true;
      this.http
        .jsonp(this.URL + "Statistics/getFormDataListByFormId", {
          params: { wff_id: wff_id }
        })
        .then(
          res => {
            this.dataList = res.data.list;
          },
          error => {}
        );
    },
    listWfFormWidgets() {
      Vue.http.jsonp(this.URL + "Forms/listWfForms").then(
        res => {
          this.tableData = res.data.list;
          this.total = res.data.list.length;
          this.loading = false;
        },
        error => {}
      );
    },
    showRowJson(rows) {
      this.rowJson = JSON.parse(rows);
    },
    onCreateForm(wff_id) {
      if (wff_id === 0) {
        this.$router.push({ path: "/custom/form/edit", query: { wff_id: 0 } });
      } else {
        this.$router.push({
          path: "/custom/form/edit",
          query: { wff_id: wff_id }
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