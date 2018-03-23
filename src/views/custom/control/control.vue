<template>
	
	<div>
		
					<div class="page-title">
						<span>控件管理</span>
					</div>
					<div class="page-body">
						<div class="search-bar">
						  	<el-button type="primary" size="small" @click="dialogAddJsonVisible = true">新增控件</el-button>
						</div>
						
						<el-table
						    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
			    			style="width: 100%" max-height="750">
						    <el-table-column
						      prop="wfw_name_ch"
						      label="控件中文名称">
						    </el-table-column>
						    <el-table-column
						      prop="wfw_name"
						      label="控件英文名称">
						    </el-table-column>
						    <el-table-column
						      prop="wfw_icon"
						      label="控件ICON">
						      	<template slot-scope="scope">
						              <i :class="scope.row.wfw_icon"></i>
						        </template>
						    </el-table-column>
						    <el-table-column
						      label="操作">
						      <template slot-scope="scope">
						        <el-button
						          @click.native.prevent="editRowJson(scope.$index, tableData)"
						          @click="dialogEditJsonVisible = true"
						          size="mini">
						          编辑
						        </el-button>
						        <el-button
						          @click.native.prevent="showRowJson(scope.$index, tableData)"
						          @click="dialogShowJsonVisible = true"
						          type="info"
						          size="mini">
											结构
						        </el-button>
						      </template>
						    </el-table-column>
						</el-table>

						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
						
						
						<el-dialog title="新建控件" :visible.sync="dialogAddJsonVisible">
							<pre>{{newControlJson}}</pre>
					  		<el-form ref="newControlForm" :rules="newControlJsonRules" :model="newControlJson" label-width="120px">
								<el-form-item label="控件中文名称" prop="wfw_name_ch">
									<el-input v-model="newControlJson.wfw_name_ch"></el-input>
								</el-form-item>
								<el-form-item label="控件英文名称" prop="wfw_name">
									<el-input v-model="newControlJson.wfw_name"></el-input>
								</el-form-item>
								<el-form-item label="图标CLASS" prop="wfw_icon">
									<el-input v-model="newControlJson.wfw_icon"></el-input>
								</el-form-item>
					  		  	<div v-for="(item,index) in newControlJson.wfw_attr[0].diy" :key="index">
					  		  		<el-form-item label="属性名称" placeholder="请填写属性名称">
					  		  		  <el-input v-model="item.data_name"></el-input>
					  		  		</el-form-item>
					  		  		<el-form-item label="数据类型" prop="data_type">
					  		  		    <el-select v-model="item.data_type" placeholder="请选择数据类型">
					  		  		      	<el-option label="Object" value="object"></el-option>
					  		  		      	<el-option label="Array" value="array"></el-option>
					  		  		      	<el-option label="Text" value="text"></el-option>
					  		  		      	<el-option label="Number" value="number"></el-option>
					  		  		    </el-select>
					  		  		</el-form-item>
					  		  	</div>
					  		  	<el-form-item>
					  		  		<el-button type="primary" @click="onControlSubmit('newControlForm')">立即创建</el-button>
					  		  		<el-button type="warning" @click="onAddControlSubmit">新增属性</el-button>
					  		  		<el-button @click="onResetControlSubmit('newControlForm'), dialogAddJsonVisible = false">取消</el-button>
					  		  	</el-form-item>
					  		</el-form>
						</el-dialog>






							
						<el-dialog title="编辑属性" :visible.sync="dialogEditJsonVisible">
						  	<el-alert title="目前只可以编辑基础属性" type="warning" style="margin-bottom:20px;" :closable="false"></el-alert>
						  	<el-form ref="form" :model="rowJson" label-width="120px">
						  	  <el-form-item label="控件中文名称">
						  	    <el-input v-model="rowJson.wfw_name_ch"></el-input>
						  	  </el-form-item>
						  	  <el-form-item label="图标CLASS">
						  	    <el-input v-model="rowJson.wfw_icon"></el-input>
						  	  </el-form-item>
						  	  <div v-if="rowJson.wfw_name == 'listBox'">
						  	  	<div v-for="item in rowJson.wfw_attr[0].type" :key="item">
						  	  		<el-form-item :label="item.wfwq_name">
						  	  		  <el-input v-model="item.wfwq_name_ch"></el-input>
						  	  		</el-form-item>
						  	  	</div>
						  	  </div>
						  	  <el-form-item>
					  		  		<el-button type="primary" @click="onEditControlSubmit">立即保存</el-button>
					  		  		<el-button @click="reload(),dialogEditJsonVisible = false">取消</el-button>
					  		  	</el-form-item>
						  	</el-form>

						</el-dialog>

					  	<el-dialog title="JSON结构" :visible.sync="dialogShowJsonVisible">
					    	<pre>{{rowJson}}</pre>
					  	</el-dialog>


					</div>

	</div>
</template>





<script>
import Vue from "vue";

const DIY_ATTR_JSON = {
  wfw_id: "0",
  wfw_name: "",
  wfw_name_ch: "",
  wfw_abled: "1",
  wfw_icon: "",
  wfw_attr: [
    {
      uid: "",
      dataSource: "",
      labelName: "",
      display: "false",
      diy: []
    }
  ]
};

const CHECK_ADD_CONTROL = {
  wfw_name: [
    { required: true, message: "请输入英文控件名称", trigger: "blur" },
    { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
  ],
  wfw_name_ch: [
    { required: true, message: "请输入中文控件名称", trigger: "blur" },
    { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
  ],
  wfw_icon: [
    { required: true, message: "请输入控件图标Class", trigger: "blur" }
  ]
};

export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      rowJson: [],
      dialogAddJsonVisible: false,
      dialogEditJsonVisible: false,
      dialogShowJsonVisible: false,
      newControlJson: DIY_ATTR_JSON,
      newControlJsonRules: CHECK_ADD_CONTROL,
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1 //默认开始页面
    };
  },
  created() {
    this.listWfFormWidgets();
  },
  computed: {
    newAddControlJson() {
      return (this.newControlJson = DIY_ATTR_JSON);
    }
  },
  methods: {
    reload() {
      this.listWfFormWidgets();
    },
    listWfFormWidgets() {
      Vue.http.jsonp(this.URL + "FormWidgets/listWfFormWidgets").then(
        res => {
          this.tableData = res.data.list;
          this.total = res.data.list.length;
        },
        error => {}
      );
    },
    editRowJson(index, rows) {
      this.rowJson = rows[index];
    },
    showRowJson(index, rows) {
      this.rowJson = rows[index];
    },
    onEditControlSubmit() {
      let j = JSON.stringify(this.rowJson);
      Vue.http
        .jsonp(this.URL + "FormWidgets/editWfFormWidgets", {
          params: { jsonStr: j }
        })
        .then(
          res => {
            this.$message(res.data.errorName);
            this.dialogEditJsonVisible = false;
          },
          error => {
            this.$message(res.data.errorName);
          }
        );
    },
    onControlSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let j = JSON.stringify(this.newControlJson);
          Vue.http
            .jsonp(this.URL + "FormWidgets/editWfFormWidgets", {
              params: { jsonStr: j }
            })
            .then(
              res => {
                this.$message(res.data.errorName);
                this.dialogAddJsonVisible = false;
                this.reload();
              },
              error => {
                this.$message(res.data.errorName);
              }
            );
        } else {
          return false;
        }
      });
    },
    onAddControlSubmit() {
      let diy = {
        data_id: this.TOKEN(),
        data_type: "",
        data_name: "",
        data: ""
      };
      this.newControlJson.wfw_attr[0].diy.push(diy);
    },
    onResetControlSubmit(formName) {
      this.$refs[formName].resetFields();
      this.$set(this.newControlJson.wfw_attr[0], "diy", []);
      this.reload();
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