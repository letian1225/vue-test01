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
						<span>数据源管理</span>
					</div>
					<div class="page-body">
						<el-form :inline="true" class="form-inline">
						  	<el-button type="primary" size="small"  @click="onCreateForm('0')">新建数据源</el-button>
						</el-form>
						
						<el-table
						    :data="tableData"
						    style="width: 100%" max-height="550">
						    <el-table-column
						      prop="wc_id"
						      label="ID">
						    </el-table-column>
						    <el-table-column
						      prop="wc_name"
						      label="数据源英文名称">
						    </el-table-column>
						    <el-table-column
						      prop="wc_name_ch"
						      label="数据源名称">
						    </el-table-column>
						    <el-table-column
						      prop="wc_abled"
						      label="是否启用">
						    </el-table-column>
						   
						    <el-table-column label="操作">
						      <template slot-scope="scope">
						        <el-button
						          @click="onEdit(scope.row.wc_id)"
						          type="text"
						          size="small">
						          编辑数据源
						        </el-button>
						        <el-button
						          @click="diaglogDetail = true, onDetail(scope.row.wc_id)"
						          type="text"
						          size="small">
						          数据源明细
						        </el-button>
						      </template>
						    </el-table-column>
						    
						</el-table>


					</div>

					<el-dialog title="数据源明细" :visible.sync="diaglogDetail" width="80%">
						<el-form :inline="true" class="form-inline">
						  	<el-button type="primary" size="small"  @click="diaglogCreateDetail = true">新建数据源明细</el-button>
						</el-form>
				  		<el-table
				  		    :data="tableDetail"
				  		    style="width: 100%" max-height="550">
				  		    <el-table-column
				  		      prop="wcd_id"
				  		      label="ID">
				  		    </el-table-column>
				  		    <el-table-column
				  		      prop="wcd_wc_id"
				  		      label="关联主表代码ID">
				  		    </el-table-column>
				  		    <el-table-column
				  		      prop="wcd_value"
				  		      label="存储值">
				  		    </el-table-column>
				  		    <el-table-column
				  		      prop="wcd_text"
				  		      label="显示值">
				  		    </el-table-column>
				  		    <el-table-column
				  		      prop="wcd_order"
				  		      label="显示顺序">
				  		    </el-table-column>
				  		   	<el-table-column
				  		      prop="wcd_is_default"
				  		      label="是否是默认值">
				  		    </el-table-column>
				  		    <el-table-column
				  		      prop="wcd_abled"
				  		      label="是否可用">
				  		    </el-table-column>
				  		    <el-table-column label="操作">
				  		      <template slot-scope="scope">
				  		        <el-button
				  		          @click="diaglogEditDetail = true, onDetailById(scope.row.wcd_id)"
				  		          type="text"
				  		          size="small">
				  		          编辑数据源明细
				  		        </el-button>
				  		        <el-button
				  		          type="text"
				  		          size="small">
				  		          删除
				  		        </el-button>
				  		      </template>
				  		    </el-table-column>
				  		    
				  		</el-table>
	  			  		<el-dialog
	  		  		      width="60%"
	  		  		      title="新增数据源明细"
	  		  		      :visible.sync="diaglogCreateDetail"
	  		  		      append-to-body>
	  		  		      	<pre>{{rowDetail}}</pre>
	  						<el-form ref="form" :model="rowDetail" label-width="120px">
	  						  <el-form-item label="存储值">
	  						    <el-input v-model="rowDetail.wcd_value"></el-input>
	  						  </el-form-item>
	  						  <el-form-item label="显示值">
	  						    <el-input v-model="rowDetail.wcd_text"></el-input>
	  						  </el-form-item>
	  						  <el-form-item label="显示顺序">
	  						    <el-input v-model="rowDetail.wcd_order"></el-input>
	  						  </el-form-item>
	  						  <el-form-item label="是否是默认值">
	  						    <el-input v-model="rowDetail.wcd_is_default"></el-input>
	  						  </el-form-item>
	  						  <el-form-item label="是否启用">
	  						      <el-switch v-model="rowDetail.wcd_abled" active-value="1" inactive-value="0"></el-switch>
	  						  </el-form-item>
	  						  <el-form-item>
	  						      <el-button type="primary" @click="onSaveEditDetail(0,rowDetail.wcd_wc_id)">立即保存</el-button>
	  						      <el-button @click="diaglogCreateDetail = false">取消</el-button>
	  						    </el-form-item>
	  						</el-form>
	  		  		    </el-dialog>
				  		<el-dialog
			  		      width="60%"
			  		      title="编辑数据源明细"
			  		      :visible.sync="diaglogEditDetail"
			  		      append-to-body>
			  		      	<pre>{{rowDetail}}</pre>
							<el-form ref="form" :model="rowDetail" label-width="120px">
							  <el-form-item label="存储值">
							    <el-input v-model="rowDetail.wcd_value"></el-input>
							  </el-form-item>
							  <el-form-item label="显示值">
							    <el-input v-model="rowDetail.wcd_text"></el-input>
							  </el-form-item>
							  <el-form-item label="显示顺序">
							    <el-input v-model="rowDetail.wcd_order"></el-input>
							  </el-form-item>
							  <el-form-item label="是否是默认值">
							    <el-input v-model="rowDetail.wcd_is_default"></el-input>
							  </el-form-item>
							  <el-form-item label="是否启用">
							      <el-switch v-model="rowDetail.wcd_abled" active-value="1" inactive-value="0"></el-switch>
							  </el-form-item>
							  <el-form-item>
							      <el-button type="primary" @click="onSaveEditDetail(rowDetail.wcd_id,rowDetail.wcd_wc_id)">立即保存</el-button>
							      <el-button @click="diaglogEditDetail = false">取消</el-button>
							    </el-form-item>
							</el-form>
			  		    </el-dialog>
					</el-dialog>

					


					


				</el-main>

			</el-container>

		</el-container>
	</div>
</template>





<script>
import Vue from 'vue'
import navbar from '../../components/navbar'
import sidemenu from '../../components/sidemenu'


export default {
  name:"list",
  data() {
    return {
        tableData: [],
        tableDetail:[],
        tableEditDetail:[],
        rowDetail:{
        	"wcd_wc_id":"",
			"wcd_value": "",
			"wcd_text": "",
			"wcd_order": "0",
			"wcd_is_default": "0",
			"wcd_abled": "1"
		},
        rowJson:[],
        diaglogDetail:false,
        diaglogEditDetail:false,
        diaglogCreateDetail:false,
    }
  },
  created(){
  	this.getCodeList()
  },
  computed:{

  },
  methods: {
  	//数据源列表
  	getCodeList(){
  		Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/getCodeList")
  		   .then((res) => {
  		   		this.tableData = res.data.list
  		   }, (error) => { })
  	},
  	onEdit(wc_id){

  	},
  	//数据源明细
  	onDetail(wc_id){
  		this.rowDetail.wcd_wc_id = wc_id
  		Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/getCodeDetailById",{params: { wc_id: wc_id}})
  		   .then((res) => {
  		   		this.tableDetail = res.data.list
  		   		console.log(res)
  		   }, (error) => { })
  	},
  	//根据数据源ID获取明细
  	onDetailById(wcd_id){
  		Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/getCodeDetailByDetailId",{params: { wcd_id: wcd_id}})
  		   .then((res) => {
  		   		this.rowDetail = res.data.list[0]
  		   		console.log(this.rowDetail)
  		   }, (error) => { })


  	},

  	onEditDetail(wc_id){
  		Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/getCodeDetailById",{params: { wc_id: wc_id}})
  		   .then((res) => {
  		   		this.tableDetail = res.data.list

  		   }, (error) => { })
  	},
  	//编辑数据源明细保存
  	onSaveEditDetail(wc_id,wcd_wc_id){
  		Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/editCodeDetail",{
	  			params: { 
	  				wc_id: wc_id,
	  				wcd_wc_id:wcd_wc_id,
	  				wcd_value:this.rowDetail.wcd_value,
	  				wcd_text:this.rowDetail.wcd_text,
	  				wcd_order:this.rowDetail.wcd_order,
	  				wcd_is_default:this.rowDetail.wcd_is_default,
	  				wcd_abled:this.rowDetail.wcd_abled,
	  			}
  			})
  		   .then((res) => {
  		   		console.log(res)
  		   		//this.tableDetail = res.data.list
  		   		if(res.data.errorCode == 1){
  		   			if(wc_id == 0){
  		   				this.diaglogCreateDetail = false
  		   			}else{
  		   				this.diaglogEditDetail = false
  		   			}
  		   			this.onDetail(wcd_wc_id)
          			this.$notify({
          			  title: '提示',
          			  message: this.rowDetail.wcd_text + '保存成功',
          			  duration: 0,
          			  type: 'success'
          			});
          		}

  		   }, (error) => { })
  	}



  },
  components:{navbar, sidemenu,}
}
</script>

<style scoped lang="less">

</style>