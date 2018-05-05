<template>
	<div>
		<div class="page-title">

			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/custom/company/company' }">选择公司</el-breadcrumb-item>
				<el-breadcrumb-item>模块管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="pull-right">
				<el-button type="primary" size="mini" @click="dialogCreate = true">新建模块</el-button>
        <el-button type="info" size="mini" @click='$router.push({path: "/custom/search/search", query: {company_id: $route.query.company_id}});'>筛选条件配置</el-button>
				<el-button size="mini" onclick="window.history.go(-1)">返回上一级</el-button>
			</div>

		</div>
		<div class="page-body">
			<el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" max-height="750">
				<el-table-column prop="wm_name" label="模块名称">
				</el-table-column>
				<el-table-column prop="wm_icon" label="模块图标">
					<template slot-scope="scope">
						<img :src="'../../static/images/module/'+scope.row.wm_icon+'@3x.png'" style="margin-top:5px;" width="50" height="50" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADqklEQVR4Xu2bS17bMBCHZ0xIk2xKFs1DWRROUHqCJiegnKDlBKUnKD1B6QkKJyg3ID0BcIKysRLDIrABysPTn8gDx7GRrFgJdqxtZGXm818azUhGWPCGC+4/ZAAyBSw4gbEp0Ov1Vm5u7t+lmUmhkDspl8sXQx9HAM7Oztbv7ugQEVbSDIAILpaXsVWpVI6FnyMAnDt7APApzc57fNtnrPrZB6DbBsAPiwGA/jBWa2YAxqfAuAKI4MSyrO00KMJ13V1E8CzuSgp46pR0CJz7p3cGQGUNyBQwopRNgYQTyNaAbBGcQRQQucTDA20QUZMITy3L2q/X37RfwuwxPgU4724D4A+/s0Sw12hUt+YNwSiATue8SeQehjlJBN8bjerOPCEYBTA5+IQOThmrraUWgG07PVkNoVjMl71FiFnDMKwAh2QOMVada/HVNIADANh4Zg04aTSq6zJIz/3e6fRW6/Xyqe4YRgGI8Hd/TyLcvQ4xcJOxqoCk1Wzb2UGE1WEFR2cQowCEQX0I7gEAvvUYeImI2/V6RZTatJo3wiDm13RVYBzA0DthsOu6Tcuy2oVC7niahU9UqK+v/x0B4Gp/fGozVmvpkJwZAB3jwp7h3PkNAB+9vyNaLZ3dZeIAcO4IxwUAX9NTQaIAiBXfdW+PwvYWOipIFADOu4cA+FiyDm4UeWeZGACDkPdNtpYg4laU6JIIAIP9xJHM+UFEiKSCmQIQEi4WX21GCYGTIU8FA31lrLar0nNmADjv7gLgFwA4YKy6qWKc6GPbzi9EeDyrU23ikLNUyq+pgJ4JgMm6gNobCg95chSqtQbjAMIknMvh++ExdJA74rmrq9u/snQ6NB4oqsA4gDAJE8FxqZRvhclUHvLkKgCgn4zVnj3DNApALuFgA8PqiCou+/vIEiVjACJIeCwljhbylJCMLjwE9TYGQFXC3hV7AE1cxZmqSBJFBUYARJdwP5HxhEqlV6veKTxRih3AFBeqRGVoLMVVd1DeMyxRih2AbTsiW4tVwnL3VHoEqyBWAKoJi4q5JvoEqSA2ALJTIBMORR9zMl2OBYBewhLd/Die8KfLsQDQSVjicEZvjHEVTA1AvtvTM9PsU0/J2NQA+mf/mKg7xEtLdDFMxKYGYPZNmR89A6BzR0iksim7KuvZuCndFDUvzfn9QwYg6Krsgn8woXDOPz/FxvvPl4j59eFRe9BHUy8wy4uPgP/Yfq53d+JzS3+kDIA+u3Q8mSkgHe9R34v/L9SjbkcAggwAAAAASUVORK5CYII='">
					</template>
				</el-table-column>
				<el-table-column prop="wm_abled" label="状态">
					<template slot-scope="scope">
						{{scope.row.wm_abled == 1 ? "正常" : "禁用"}}
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" type="info" @click="enterForm(scope.row.wm_id)">表单管理
						</el-button>
						<el-button size="mini" type="info" @click="enterWorkflow(scope.row.wm_id)">工作流管理
						</el-button>
						<el-button size="mini" @click="dialogEdit = true, onEdit(scope.row)">编辑
						</el-button>
						<el-button type="danger" size="mini" @click="onDelete(scope.row.wm_id)">删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>

		<el-dialog width="400px" title="新增模块" :visible.sync="dialogCreate" append-to-body>
			<el-form ref="form" :model="row" label-width="120px">
				<el-form-item label="模块名称">
					<el-input v-model="row.wm_name" style="width:193px;"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-select v-model="row.wm_type" placeholder="请选择">
						<el-option v-for="item in typeListData" :key="item.wcd_value" :value="item.wcd_value" :label="item.wcd_text">{{item.wcd_text}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="模块图标">
					<el-select v-model="row.wm_icon" placeholder="请选择">
						<el-option v-for="item in moduleIcon" :key="item.value" :value="item.value">
							<span style="float:left;"><img :src="item.src" width="32" height="32"></span>
							<span style="float:right;">{{item.value}}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="row.wm_abled" active-value="1" inactive-value="0"></el-switch>
				</el-form-item>
				<el-form-item label="调用页面模板" style="display:none;">
					<el-input v-model="row.wm_tpl"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSave(0)" size="small">保存</el-button>
					<el-button @click="dialogCreate = false" size="small">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog width="400px" title="编辑模块" :visible.sync="dialogEdit" append-to-body>
			<el-form ref="form" :model="row" label-width="120px">
				<el-form-item label="模块名称">
					<el-input v-model="row.wm_name" style="width:193px;"></el-input>
				</el-form-item>
				<el-form-item label="分类">
					<el-select v-model="row.wm_type" placeholder="请选择">
						<el-option v-for="item in typeListData" :key="item.wcd_value" :value="item.wcd_value" :label="item.wcd_text">{{item.wcd_text}}</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="模块图标">
					<el-select v-model="row.wm_icon" placeholder="请选择">
						<el-option v-for="item in moduleIcon" :key="item.value" :value="item.value">
							<span style="float:left;"><img :src="item.src" width="32" height="32"></span>
							<span style="float:right;">{{item.value}}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="row.wm_abled" active-value="1" inactive-value="0"></el-switch>
				</el-form-item>
				<el-form-item>
					<el-button size="small" type="primary" @click="onSave(row.wm_id)">保存</el-button>
					<el-button size="small" @click="dialogEdit = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import Vue from "vue";
import moduleIconData from "../../../api/module_icon_data";

export default {
  name: "list",
  data() {
    return {
      tableData: [],
      row: {
        wm_id: "",
        wm_name: "",
        wm_company: "",
        wm_users: "",
        wm_partments: "0",
        wm_icon: "",
        wm_abled: "1",
        wm_tpl: "0",
        wm_type: ""
      },
      moduleIcon: [],
      typeListData: [],
      dialogCreate: false,
      dialogEdit: false,
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1 //默认开始页面
    };
  },
  created() {
    this.listWfModule();
    this.typeList();
    Vue.http.get("module_icon").then(
      res => {
        this.moduleIcon = res.data.module_icon;
      },
      error => {}
    );
  },
  computed: {},
  methods: {
    enterForm(wm_id) {
      //跳转进入模块页面
      this.$router.push({
        path: "/custom/form/form",
        query: {
          module_id: wm_id,
          company_id: this.$route.query.company_id
        }
      });
    },
    enterWorkflow(wm_id) {
      //跳转进入模块页面
      this.$router.push({
        path: "/custom/workflow/workflow",
        query: { 
					module_id: wm_id, 
					company_id: this.$route.query.company_id 
				}
      });
    },
    setUrl(msg) {
      this.row.wm_icon = msg;
    },
    listWfModule() {
      Vue.http
        .jsonp(this.URL + "Module/listWfModule", {
          params: {
            wm_company: this.$route.query.company_id
          }
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
    //模块分类
    typeList() {
      Vue.http
        .jsonp(this.URL + "FormWidgets/getCodeDetailById", {
          params: {
            wc_id: "21"
          }
        })
        .then(
          res => {
            console.log(res);
            this.typeListData = res.data.list;
          },
          error => {}
        );
    },
    onSave(wm_id) {
      Vue.http
        .jsonp(this.URL + "Module/editWfModule", {
          params: {
            wm_id: wm_id,
            wm_name: this.row.wm_name,
            wm_company: this.$route.query.company_id,
            wm_users: this.AUID(),
            wm_partments: this.row.wm_partments,
            wm_icon: this.row.wm_icon,
            wm_abled: this.row.wm_abled,
            wm_tpl: this.row.wm_tpl,
            wm_type: this.row.wm_type
          }
        })
        .then(
          res => {
            if (res.data.errorCode == 1) {
              if (wm_id == 0) {
                this.dialogCreate = false;
              } else {
                this.dialogEdit = false;
              }
              this.listWfModule();
              this.$notify({
                title: "提示",
                message: this.row.wm_name + "保存成功",
                duration: 0,
                type: "success"
              });
            }
          },
          error => {}
        );
    },
    onDelete(wm_id) {
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http
            .jsonp(this.URL + "Module/delWfModule", {
              params: { wm_id: wm_id }
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
                this.listWfModule();
              },
              error => {}
            );
        })
        .catch(() => {});
    },
    onEdit(row) {
      this.row = row;
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