<template>
	
	<div>
		
		<div class="page-title">
			<span>表单管理</span>
		</div>
		<div class="page-body">
			<div class="search-bar">
				<el-button type="primary" size="small"  @click="onCreateForm('0')">新建表单</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%" max-height="550">
			    <el-table-column
			      prop="wff_id"
			      label="ID">
			    </el-table-column>
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
			      prop="wff_node"
			      label="归属节点ID">
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
			        <el-button @click="onCreateForm(scope.row.wff_id)" type="primary" size="mini" icon="el-icon-edit"></el-button>
			        <el-button @click="onGetFormData(scope.row.wff_id)" type="info" size="mini" icon="fa fa-database"></el-button>
			      </template>
			    </el-table-column>
			</el-table>

		</div>

		<el-dialog title="表单JSON结构" :visible.sync="dialogShowJsonVisible">
	  		<pre>{{rowJson}}</pre>
		</el-dialog>

		<el-dialog title="数据列表" :visible.sync="dialogDataListVisible">
	  		<table class="layout-table">
	  			<thead>
	  				<tr>
	  					<th v-for="(value, i) in dataList[0]">{{value.labelName}}[{{value.name}}]</th>
	  				</tr>
	  			</thead>
	  			<tbody>
	  				<tr v-for="(item, i) in dataList">
	  					<td v-for="(value, i) in item">{{value.value}}</td>
	  				</tr>
	  			</tbody>
	  		</table>
		</el-dialog>
	</div>
</template>





<script>
import Vue from 'vue'
export default {
  name:"list",
  data() {
    return {
    	loading:true,
        tableData: [],
        rowJson:[],
        dialogShowJsonVisible:false,
        dialogDataListVisible:false,
        dataList: [],
    }
  },
  created(){
  	this.listWfFormWidgets()
  },
  computed:{

  },
  methods: {
  	onGetFormData(wff_id){
  		this.dialogDataListVisible = true
  		this.http.jsonp(this.URL+"Statistics/getFormDataListByFormId",{params: { wff_id: wff_id}})
  		   .then((res) => {
  		   		this.dataList = res.data.list

  		   }, (error) => { })
  	},
  	listWfFormWidgets(){
		Vue.http.jsonp(this.URL+"Forms/listWfForms")
		   .then((res) => {
		   		this.tableData = res.data.list
		   		this.loading = false
		   }, (error) => { })
  	},
  	showRowJson(rows){
  		this.rowJson = JSON.parse(rows)
  	},
  	onCreateForm(wff_id){
  		if(wff_id === 0){
  			this.$router.push({path:'/custom/form/edit',query:{wff_id:0}});
  		}else{
  			this.$router.push({path:'/custom/form/edit',query:{wff_id:wff_id}});
  		}
  	},

  },
  components:{}
}
</script>