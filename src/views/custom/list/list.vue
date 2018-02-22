<template>
	<div>

				
				
					<div class="page-title">
						<span>列表管理</span>
					</div>
					<div class="page-body">
						<el-form :inline="true">
						  <el-form-item label="选择模块：">
						    <moduleList @setModule="setModule"></moduleList>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="onEdit(0)">新建列表</el-button>
						  </el-form-item>
						</el-form>

						<el-table
						    :data="tableData"
						    style="width: 100%" max-height="750">
						    <el-table-column 
						      prop="wd_id"
						      label="ID">
						    </el-table-column>
						    <el-table-column
						      prop="wd_name"
						      label="英文名称">
						    </el-table-column>
						    <el-table-column
						      prop="wd_name_ch"
						      label="中文名称">
						    </el-table-column>
						    <el-table-column
						      prop="wd_company"
						      label="公司ID">
						    </el-table-column>
						    <el-table-column
						      prop="wd_module"
						      label="模块ID">
						    </el-table-column>
						    <el-table-column
						      prop="wd_form"
						      label="表单ID">
						    </el-table-column>
						    <el-table-column
						      prop="wd_abled"
						      label="状态">
						      <template slot-scope="scope">
						      	{{scope.row.wd_abled == 1 ? "启用" : "禁用"}}
						      </template>
						    </el-table-column>
						    <el-table-column
						      prop="wd_create_time"
						      label="创建时间">
						    </el-table-column>
						    <el-table-column
						      prop="wd_create_userid"
						      label="创建用户ID">
						    </el-table-column>
						    <el-table-column label="操作">
						      <template slot-scope="scope">
						        <el-button
						          type="text"
						          size="mini" @click="onEdit(scope.row.wd_id)">
						          编辑
						        </el-button>
						        <el-button
						          type="text"
						          size="mini" @click="onDelete(scope.row.wd_id)">
						          删除
						        </el-button>
						      </template>
						    </el-table-column>
						</el-table>
					</div>

	</div>
</template>




<script>
import Vue from 'vue'
import moduleList from '../../../components/moduleList'

export default {
  name:"list",
  data() {
    return {
        tableData: [],
    }
  },
  created(){
  	
  },
  computed:{},
  filters:{},
  methods: {
  	listWfDataList(wd_module){
		Vue.http.jsonp(this.URL+"DataList/listWfDataList",{params: { wd_module: wd_module}})
		   .then((res) => {
		   		this.tableData = res.data.list
		   }, (error) => { })
  	},
  	setModule(msg){
  		this.listWfDataList(msg)
  	},
  	onDelete(wm_id){
  		
  	},
  	onEdit(wd_id){
  		if(this.moduleId != ""){
  			
  		}
  		this.$router.push({path:'/custom/list/edit',query:{wd_id:wd_id}});
  	}
  },
  components:{moduleList}
}
</script>

<style scoped lang="less">
.table-expand {
	font-size: 0; padding: 20px 0;
}
.table-expand label {
	width: 90px;
	color: #99a9bf;
}
.table-expand .el-form-item {
	width: 100%;
}
.table-expand .dl-layout{border-bottom: 1px solid #e6e6e6; border-right: 1px solid #e6e6e6; width: 100%; display: table;
	dl{ margin: 0; background-color: #fff; display: table-row;}
	dd{font-weight: bold; text-align: center; display: table-cell; margin: 0; padding: 3px 25px; border-left: 1px solid #e6e6e6; border-top: 1px solid #e6e6e6; background-color: #f2f2f2;}
	dt{text-align: center; margin: 0; display: table-cell; padding: 3px 25px; border-left: 1px solid #e6e6e6; border-top: 1px solid #e6e6e6;}
}
.k-panel{border:1px solid #e6e6e6;
	.k-hd{width: 100%; text-align: center; font-weight: bold; padding: 5px 0; border-bottom: 1px solid #e6e6e6; background-color: #f2f2f2;}
	.k-bd{width: 100%; height: 300px; overflow: auto;
		ul{width: 100%; float: left; padding: 0; margin: 0;
			li{width: 100%; padding: 10px; border-bottom: 1px solid #eee; float: left; box-sizing: border-box;}
		}
	}
}

</style>