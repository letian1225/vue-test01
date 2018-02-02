<template>
	<div>
		<el-container>
			<el-header>
				<navbar></navbar>
			</el-header>

			<el-container>
		
				<sidemenu></sidemenu>
				
				<el-main>
					<div class="page-title">
						<span>列表管理</span>
					</div>
					<div class="page-body">
						<el-form :inline="true">
						  <el-form-item label="选择模块：">
						    <moduleList @setModule="setModule"></moduleList>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="$router.push('edit')">新建列表</el-button>
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
						    <el-table-column label="操作"  width="120">
						      <template slot-scope="scope">
						        <el-button
						          type="primary"
						          size="mini" @click="dialogEdit = true, onEdit(scope.row)">
						          编辑
						        </el-button>
						        <!-- <el-button
						          type="text"
						          size="small" @click="onDelete(scope.row.wm_id)">
						          删除
						        </el-button> -->
						      </template>
						    </el-table-column>
						</el-table>
					</div>

					

		

					


				</el-main>

			</el-container>

		</el-container>
	</div>
</template>




<script>
import Vue from 'vue'
import navbar from '../../components/navbar'
import sidemenu from '../../components/sidemenu'
import moduleList from '../../components/moduleList'

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
		Vue.http.jsonp("http://milibangong.cn/Appservice/DataList/listWfDataList",{params: { wd_module: wd_module}})
		   .then((res) => {
		   		this.tableData = res.data.list
		   		console.log(this.tableData)
		   }, (error) => { })
  	},
  	setModule(msg){
  		this.listWfDataList(msg)
  	},
  	onDelete(wm_id){
  		
  	},
  	onEdit(row){
  		this.$router.push({name:'StatisticsEdit',query:{ws_id:row.ws_id}});
  	}
  },
  components:{navbar, sidemenu, moduleList}
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