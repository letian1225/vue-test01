<template>

	<div>
		
    <div class="page-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/custom/company/company' }">选择公司</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/custom/module/module?company_id='+$route.query.company_id }">模块管理</el-breadcrumb-item>
				<el-breadcrumb-item>全局条件筛选配置</el-breadcrumb-item>
			</el-breadcrumb>
      <div class="pull-right">
        <el-button size="small" type="primary" @click="dialogCreate = true">新建</el-button>
      </div>
    </div>

		<div class="page-body">
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" max-height="750">
				<el-table-column prop="s_id" label="ID">
				</el-table-column>
				<el-table-column prop="company_id" label="公司ID">
				</el-table-column>
				<el-table-column prop="s_key" label="筛选字段">
				</el-table-column>
				<el-table-column prop="s_name" label="筛选条件对应名称">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="dialogEdit = true, formData = scope.row" size="mini">
							编辑
						</el-button>
						<el-button @click="delFormSearch(scope.row.s_id)" type="danger" size="mini">
							删除
						</el-button>
					</template>
				</el-table-column>

			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
		</div>
		<el-dialog width="40%" title="新增" :visible.sync="dialogCreate" append-to-body>
			<el-form ref="form" :model="formData" label-width="160px">
				<el-form-item label="筛选字段">
					<el-select v-model="formData.s_key" placeholder="请选择">
						<el-option v-for="item in keyData" :key="item.wcd_value" :value="item.wcd_value" :label="item.wcd_value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="筛选条件对应名称">
					<el-select v-model="formData.s_name" placeholder="请选择">
						<el-option v-for="item in nameData" :key="item.wcd_text" :value="item.wcd_text" :label="item.wcd_text">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button size="small" type="primary" @click="create">立即保存</el-button>
					<el-button size="small" @click="dialogCreate = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog width="40%" title="编辑" :visible.sync="dialogEdit" append-to-body>
			<el-form ref="form" :model="formData" label-width="160px">
				<el-form-item label="筛选字段">
					<el-select v-model="formData.s_key" placeholder="请选择">
						<el-option v-for="item in keyData" :key="item.wcd_value" :value="item.wcd_value" :label="item.wcd_value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="筛选条件对应名称">
					<el-select v-model="formData.s_name" placeholder="请选择">
						<el-option v-for="item in nameData" :key="item.wcd_text" :value="item.wcd_text" :label="item.wcd_text">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button size="small" type="primary" @click="edit(formData.s_id)">立即保存</el-button>
					<el-button size="small" @click="dialogEdit=false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>





<script>
import Vue from "vue";
import moduleList from "../../../components/moduleList";
export default {
  name: "dataSource",
  data() {
    return {
      tableData: [],
      formData: {},
      keyData: [],
      nameData: [],
      dialogCreate: false,
      dialogEdit: false,
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1 //默认开始页面
    };
  },
  created() {
    this.getFormSearchByCompayID();
    this.getCode();
  },
  computed: {},
  methods: {
    getCode() {
      Vue.http
        .jsonp(this.URL + "FormWidgets/getCodeDetailById", {
          params: { wc_id: "22" }
        })
        .then(
          res => {
            this.keyData = res.data.list;
            this.nameData = res.data.list;
          },
          error => {}
        );
    },
    getFormSearchByCompayID() {
      Vue.http
        .jsonp(this.URL + "FormSearch/getFormSearchByCompayID", {
          params: { company_id: this.$route.query.company_id }
        })
        .then(
          res => {
            console.log(res);
            if (res.data.errorCode == 1) {
              this.tableData = res.data.list;
              this.total = res.data.list.length;
            }
            
          },
          error => {}
        );
    },
    edit(s_id) {
      this.editFormSearch(s_id);
    },
    create() {
      this.editFormSearch(0);
    },
    editFormSearch(s_id) {
      Vue.http
        .jsonp(this.URL + "FormSearch/editFormSearch", {
          params: {
            s_id: s_id,
            company_id: this.$route.query.company_id ,
            s_key: this.formData.s_key,
            s_name: this.formData.s_name
          }
        })
        .then(
          res => {
            this.getFormSearchByCompayID();
            this.dialogCreate = false;
            this.dialogEdit = false;
          },
          error => {}
        );
    },
    delFormSearch(s_id) {
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http
            .jsonp(this.URL + "FormSearch/delFormSearch", {
              params: { s_id: s_id }
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
                this.getFormSearchByCompayID();
              },
              error => {}
            );
        })
        .catch(() => {});
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    }
  },

  components: { moduleList }
};
</script>

<style scoped lang="less">

</style>