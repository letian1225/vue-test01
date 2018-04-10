<template>

	<div>
		<div class="page-title">
			<span>代理商管理</span>
		</div>

		<div class="page-body">
			<div class="search-bar">
				<el-form :inline="true">
					<el-form-item>
						<el-button size="small" type="primary" @click="dialogCreate = true">新建代理商</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" max-height="750">
				<el-table-column prop="a_name" label="名称">
				</el-table-column>
				<el-table-column prop="a_level" label="级别">
					<template slot-scope="scope">
						<el-tag type="success" size="small" v-show="scope.row.a_level == 0">公司</el-tag>
						<el-tag type="info" size="small" v-show="scope.row.a_level == 1">代理商</el-tag>
						<el-tag type="primary" size="small" v-show="scope.row.a_level == 2">顶级代理商</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="a_parent_id" label="父级ID">
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间">
				</el-table-column>
				<el-table-column prop="is_can_create" label="创建下级">
					<template slot-scope="scope">
						{{scope.row.is_can_create == 1 ? "是" : "否"}}
					</template>
				</el-table-column>
				<el-table-column label="管理员管理">
					<template slot-scope="scope">
						<el-button @click="dialogAdmin = true, listAgentUser(scope.row.a_id), formAdminData.a_id = scope.row.a_id" type="primary" size="mini">
							管理
						</el-button>
					</template>
				</el-table-column>
				<el-table-column label="分配公司">
					<template slot-scope="scope">
						<el-button @click="dialogCompany = true, getAgentByUserID(scope.row.a_id), formCompanyData.a_id = scope.row.a_id" type="info" size="mini">
							管理
						</el-button>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="dialogEdit = true, formData = scope.row" size="mini">
							编辑
						</el-button>
						<el-button @click="deleteAgent(scope.row.a_id)" type="danger" size="mini">
							删除
						</el-button>
					</template>
				</el-table-column>

			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
		</div>

		<el-dialog width="90%" title="公司分配管理" :visible.sync="dialogCompany" append-to-body>
			<div class="search-bar">
				<el-form :inline="true">
					<el-form-item>
						<el-button size="small" type="primary" @click="dialogCompanySelect = true, listCompanyNoAgent()">选择公司</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableCompanyData" style="width: 100%" max-height="750">
				<el-table-column prop="company_id" label="ID">
				</el-table-column>
				<el-table-column prop="company_name" label="名称">
				</el-table-column>
				<el-table-column prop="company_desc" label="描述">
				</el-table-column>
				<el-table-column prop="company_addr" label="地址">
				</el-table-column>
				<el-table-column prop="company_tel" label="联系电话">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="unbind()" size="mini">
							解除关系
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>

		<el-dialog width="50%" title="选择公司" :visible.sync="dialogCompanySelect" append-to-body>
			<el-form ref="form" :model="formCompanyData" label-width="120px">
				<el-form-item label="选择公司">
					<el-select v-model="formCompanyData.company_id" filterable placeholder="请选择(支持模糊搜索)" style="width:300px;">
						<el-option v-for="item in companyData" :key="item.company_id" :label="item.company_name" :value="item.company_id">
							<span style="float: left; color:#333;">{{ item.company_name }}</span>
							<span style="float: right; color: #999; font-size: 13px">{{ item.company_id }}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" @click="dialogCompanySelect = false, distributeCompany()">立即保存</el-button>
					<el-button size="small" @click="dialogCompanySelect = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog width="90%" title="管理员管理" :visible.sync="dialogAdmin" append-to-body>
			<div class="search-bar">
				<el-form :inline="true">
					<el-form-item>
						<el-button size="small" type="primary" @click="dialogAdminCreate = true">新建管理员</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableAdminData" style="width: 100%" max-height="750">
				<el-table-column prop="au_id" label="ID">
				</el-table-column>
				<el-table-column prop="au_login_name" label="用户登录名">
				</el-table-column>
				<el-table-column prop="a_id" label="所属代理商ID">
				</el-table-column>
				<el-table-column prop="au_name" label="用户名称">
				</el-table-column>
				<el-table-column prop="au_mobile" label="管理员电话">
				</el-table-column>
				<el-table-column prop="create_time" label="创建时间">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="dialogAdminEdit = true, formAdminData = scope.row" size="mini">
							编辑
						</el-button>
						<el-button @click="deleteAgentUser(scope.row.au_id)" type="danger" size="mini">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>

		<el-dialog width="50%" title="新增管理员" :visible.sync="dialogAdminCreate" append-to-body>
			<el-form ref="form" :model="formAdminData" label-width="220px">
				<el-form-item label="用户登录名">
					<el-input v-model="formAdminData.au_login_name" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="用户登录密码">
					<el-input v-model="formAdminData.au_psd" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="用户名称">
					<el-input v-model="formAdminData.au_name" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="管理员电话">
					<el-input v-model="formAdminData.au_mobile" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" @click="dialogAdminCreate = false, createAdmin(formAdminData.a_id)">立即保存</el-button>
					<el-button size="small" @click="dialogAdminCreate = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog width="50%" title="编辑管理员" :visible.sync="dialogAdminEdit" append-to-body>
			<el-form ref="form" :model="formAdminData" label-width="220px">
				<el-form-item label="用户登录名">
					<el-input v-model="formAdminData.au_login_name" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="用户名称">
					<el-input v-model="formAdminData.au_name" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="管理员电话">
					<el-input v-model="formAdminData.au_mobile" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" @click="dialogAdminEdit = false, editAdmin(formAdminData.au_id, formAdminData.a_id)">立即保存</el-button>
					<el-button size="small" @click="dialogAdminEdit= false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog width="50%" title="新增代理商" :visible.sync="dialogCreate" append-to-body>
			<el-form ref="form" :model="formData" label-width="220px">
				<el-form-item label="代理商名称">
					<el-input v-model="formData.a_name" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="代理商级别">
					<el-radio-group v-model="formData.a_level" size="mini">
						<el-tooltip class="item" effect="dark" content="公司" placement="top">
							<el-radio-button label="0"></el-radio-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="代理商" placement="top">
							<el-radio-button label="1"></el-radio-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="顶级代理商" placement="top">
							<el-radio-button label="2"></el-radio-button>
						</el-tooltip>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="父级代理商">
					<el-input v-model="formData.a_parent_id" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="是否可以创建下级代理商">
					<el-switch v-model="formData.is_can_create" active-value="1" inactive-value="0"></el-switch>
				</el-form-item>

				<el-form-item>
					<el-button size="small" type="primary" @click="create">立即保存</el-button>
					<el-button size="small" @click="dialogCreate = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog width="50%" title="编辑代理商" :visible.sync="dialogEdit" append-to-body>
			<el-form ref="form" :model="formData" label-width="220px">
				<el-form-item label="代理商名称">
					<el-input v-model="formData.a_name" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="代理商级别">
					<el-radio-group v-model="formData.a_level" size="mini">
						<el-tooltip class="item" effect="dark" content="公司" placement="top">
							<el-radio-button label="0"></el-radio-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="代理商" placement="top">
							<el-radio-button label="1"></el-radio-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="顶级代理商" placement="top">
							<el-radio-button label="2"></el-radio-button>
						</el-tooltip>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="父级代理商">
					<el-input v-model="formData.a_parent_id" style="width:194px;"></el-input>
				</el-form-item>
				<el-form-item label="是否可以创建下级代理商">
					<el-switch v-model="formData.is_can_create" active-value="1" inactive-value="0"></el-switch>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="edit(formData.a_id)" size="small">立即保存</el-button>
					<el-button @click="dialogEdit = false" size="small">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>





<script>
import Vue from "vue";
export default {
  name: "",
  data() {
    return {
      tableData: [],
      tableAdminData: [],
      tableCompanyData: [],
      formData: {
        is_can_create: "1"
      },
      formAdminData: {},
      formCompanyData: {},
      companyData: [],
      dialogCreate: false,
      dialogEdit: false,
      dialogAdmin: false,
      dialogAdminCreate: false,
      dialogAdminEdit: false,
      dialogCompany: false,
      dialogCompanySelect: false,
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1 //默认开始页面
    };
  },
  created() {
    this.listChildAgent();
  },
  computed: {},
  methods: {
    getAgentByUserID(au_id) {
      Vue.http
        .jsonp(this.URL + "Agent/getAgentByUserID", {
          params: { au_id: au_id }
        })
        .then(
          res => {
            console.log(res);
            this.tableCompanyData = res.data.list;
          },
          error => {}
        );
    },
    listCompanyNoAgent() {
      Vue.http.jsonp(this.URL + "Agent/listCompanyNoAgent").then(
        res => {
          console.log(res);
          this.companyData = res.data.list;
        },
        error => {}
      );
    },
    distributeCompany() {
      Vue.http
        .jsonp(this.URL + "Agent/distributeCompany", {
          params: {
            a_id: this.formCompanyData.a_id,
            company_id: this.formCompanyData.company_id
          }
        })
        .then(
          res => {
			console.log(res)
            this.getAgentByUserID(this.formCompanyData.a_id);
          },
          error => {}
        );
    },
    unbind() {},
    listAgentUser(a_id) {
      Vue.http
        .jsonp(this.URL + "Agent/listAgentUser", {
          params: { a_id: a_id }
        })
        .then(
          res => {
            console.log(res);
            this.tableAdminData = res.data.list;
          },
          error => {}
        );
    },
    deleteAgentUser(au_id) {
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Vue.http
          .jsonp(this.URL + "Agent/deleteAgentUser", {
            params: { au_id: au_id }
          })
          .then(
            res => {
              if (res.data.errorCode == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.listAgentUser(au_id);
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              }
            },
            error => {}
          );
      });
    },
    editAgentUser(au_id, a_id) {
      if (au_id == 0) {
        Vue.http
          .jsonp(this.URL + "Agent/editAgentUser", {
            params: {
              au_id: au_id,
              au_login_name: this.formAdminData.au_login_name,
              au_psd: this.formAdminData.au_psd,
              a_id: a_id,
              au_name: this.formAdminData.au_name,
              au_mobile: this.formAdminData.au_mobile
            }
          })
          .then(
            res => {
              this.listAgentUser(a_id);
            },
            error => {}
          );
      } else {
        Vue.http
          .jsonp(this.URL + "Agent/editAgentUser", {
            params: {
              au_id: au_id,
              au_login_name: this.formAdminData.au_login_name,
              a_id: a_id,
              au_name: this.formAdminData.au_name,
              au_mobile: this.formAdminData.au_mobile
            }
          })
          .then(
            res => {
              this.listAgentUser(a_id);
            },
            error => {}
          );
      }
    },
    createAdmin(a_id) {
      console.log(a_id);
      this.editAgentUser(0, a_id);
    },
    editAdmin(au_id, a_id) {
      this.editAgentUser(au_id, a_id);
    },
    listChildAgent() {
      Vue.http
        .jsonp(this.URL + "Agent/listChildAgent", {
          params: { a_parent_id: "1" }
        })
        .then(
          res => {
            console.log(res);
            this.tableData = res.data.list;
            this.total = res.data.list.length;
          },
          error => {}
        );
    },
    deleteAgent(a_id) {
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Vue.http
          .jsonp(this.URL + "Agent/deleteAgent", {
            params: { a_id: a_id }
          })
          .then(
            res => {
              if (res.data.errorCode == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.listChildAgent();
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              }
            },
            error => {}
          );
      });
    },
    editAgent(a_id) {
      Vue.http
        .jsonp(this.URL + "Agent/editAgent", {
          params: {
            a_id: a_id,
            a_name: this.formData.a_name,
            a_level: this.formData.a_level,
            a_parent_id: this.formData.a_parent_id,
            create_time: this.formData.create_time,
            is_can_create: this.formData.is_can_create
          }
        })
        .then(
          res => {
            this.listChildAgent();
            this.dialogCreate = false;
            this.dialogEdit = false;
          },
          error => {}
        );
    },
    create() {
      this.editAgent(0);
    },
    edit(a_id) {
      this.editAgent(a_id);
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

</style>