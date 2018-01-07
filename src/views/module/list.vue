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
						<span>模块管理</span>
					</div>
					<div class="page-body">
						<el-form :inline="true" class="form-inline">
						  	<el-button type="primary" size="small"  @click="dialogCreate = true">新建模块</el-button>
						</el-form>
						<el-table
						    :data="tableData"
						    style="width: 100%" max-height="550">
						    <el-table-column
						      prop="wm_id"
						      label="模块ID">
						    </el-table-column>
						    <el-table-column
						      prop="wm_name"
						      label="模块名称">
						    </el-table-column>
						    <el-table-column
						      prop="company_name"
						      label="公司">
						    </el-table-column>
						    <el-table-column
						      prop="admin_names"
						      label="管理人">
						    </el-table-column>
						    <el-table-column
						      prop="partment_names"
						      label="适用部门">
						    </el-table-column>
						    <el-table-column
						      prop="wm_icon"
						      label="模块图标">
						      <template slot-scope="scope">
						      	<img :src="scope.row.wm_icon" width="50" height="50" onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADqklEQVR4Xu2bS17bMBCHZ0xIk2xKFs1DWRROUHqCJiegnKDlBKUnKD1B6QkKJyg3ID0BcIKysRLDIrABysPTn8gDx7GRrFgJdqxtZGXm818azUhGWPCGC+4/ZAAyBSw4gbEp0Ov1Vm5u7t+lmUmhkDspl8sXQx9HAM7Oztbv7ugQEVbSDIAILpaXsVWpVI6FnyMAnDt7APApzc57fNtnrPrZB6DbBsAPiwGA/jBWa2YAxqfAuAKI4MSyrO00KMJ13V1E8CzuSgp46pR0CJz7p3cGQGUNyBQwopRNgYQTyNaAbBGcQRQQucTDA20QUZMITy3L2q/X37RfwuwxPgU4724D4A+/s0Sw12hUt+YNwSiATue8SeQehjlJBN8bjerOPCEYBTA5+IQOThmrraUWgG07PVkNoVjMl71FiFnDMKwAh2QOMVada/HVNIADANh4Zg04aTSq6zJIz/3e6fRW6/Xyqe4YRgGI8Hd/TyLcvQ4xcJOxqoCk1Wzb2UGE1WEFR2cQowCEQX0I7gEAvvUYeImI2/V6RZTatJo3wiDm13RVYBzA0DthsOu6Tcuy2oVC7niahU9UqK+v/x0B4Gp/fGozVmvpkJwZAB3jwp7h3PkNAB+9vyNaLZ3dZeIAcO4IxwUAX9NTQaIAiBXfdW+PwvYWOipIFADOu4cA+FiyDm4UeWeZGACDkPdNtpYg4laU6JIIAIP9xJHM+UFEiKSCmQIQEi4WX21GCYGTIU8FA31lrLar0nNmADjv7gLgFwA4YKy6qWKc6GPbzi9EeDyrU23ikLNUyq+pgJ4JgMm6gNobCg95chSqtQbjAMIknMvh++ExdJA74rmrq9u/snQ6NB4oqsA4gDAJE8FxqZRvhclUHvLkKgCgn4zVnj3DNApALuFgA8PqiCou+/vIEiVjACJIeCwljhbylJCMLjwE9TYGQFXC3hV7AE1cxZmqSBJFBUYARJdwP5HxhEqlV6veKTxRih3AFBeqRGVoLMVVd1DeMyxRih2AbTsiW4tVwnL3VHoEqyBWAKoJi4q5JvoEqSA2ALJTIBMORR9zMl2OBYBewhLd/Die8KfLsQDQSVjicEZvjHEVTA1AvtvTM9PsU0/J2NQA+mf/mKg7xEtLdDFMxKYGYPZNmR89A6BzR0iksim7KuvZuCndFDUvzfn9QwYg6Krsgn8woXDOPz/FxvvPl4j59eFRe9BHUy8wy4uPgP/Yfq53d+JzS3+kDIA+u3Q8mSkgHe9R34v/L9SjbkcAggwAAAAASUVORK5CYII='">
						      </template>
						    </el-table-column>
						    <el-table-column
						      prop="wm_abled"
						      label="状态">
						    </el-table-column>
						    <el-table-column
						      prop="wm_tpl"
						      label="调用页面模板">
						    </el-table-column>
						    <el-table-column label="操作"  width="120">
						      <template slot-scope="scope">
						        <el-button
						          type="text"
						          size="small" @click="dialogEdit = true, onEdit(scope.row)">
						          编辑
						        </el-button>
						        <el-button
						          type="text"
						          size="small" @click="onDelete(scope.row.wm_id)">
						          删除
						        </el-button>
						      </template>
						    </el-table-column>
						</el-table>
					</div>

			  		<el-dialog
		  		      width="40%"
		  		      title="新增模块"
		  		      :visible.sync="dialogCreate"
		  		      append-to-body>
						<el-form ref="form" :model="row" label-width="120px">
						  <el-form-item label="模块名称">
						    <el-input v-model="row.wm_name"></el-input>
						  </el-form-item>
						  <el-form-item label="公司ID">
						    <el-input v-model="row.wm_company"></el-input>
						  </el-form-item>
						  <el-form-item label="管理人ID">
						    <el-input v-model="row.wm_users"></el-input>
						  </el-form-item>
						  <el-form-item label="适用部门ID">
						    <el-input v-model="row.wm_partments"></el-input>
						  </el-form-item>
						  <el-form-item label="模块图标">
						    <el-input v-model="row.wm_icon" readonly></el-input>
						    <upload @url="setUrl" :value="row.wm_icon"></upload>
						  </el-form-item>
						  <el-form-item label="是否启用">
						    <el-switch v-model="row.wm_abled" active-value="1" inactive-value="0"></el-switch>
						  </el-form-item>
						  <el-form-item label="调用页面模板">
						    <el-input v-model="row.wm_tpl"></el-input>
						  </el-form-item>
						  <el-form-item>
						      <el-button type="primary" @click="onSave(0)">立即保存</el-button>
						      <el-button @click="dialogCreate = false">取消</el-button>
						    </el-form-item>
						</el-form>
		  		    </el-dialog>

	    	  		<el-dialog
	      		      width="40%"
	      		      title="编辑模块"
	      		      :visible.sync="dialogEdit"
	      		      append-to-body>
	    				<el-form ref="form" :model="row" label-width="120px">
	    				  <el-form-item label="模块名称">
	    				    <el-input v-model="row.wm_name"></el-input>
	    				  </el-form-item>
	    				  <el-form-item label="公司ID">
	    				    <el-input v-model="row.wm_company"></el-input>
	    				  </el-form-item>
	    				  <el-form-item label="管理人ID">
	    				    <el-input v-model="row.wm_users"></el-input>
	    				  </el-form-item>
	    				  <el-form-item label="适用部门ID">
	    				    <el-input v-model="row.wm_partments"></el-input>
	    				  </el-form-item>
	    				  <el-form-item label="模块图标">
	    				    <el-input v-model="row.wm_icon" readonly></el-input>
	    				    <upload @url="setUrl" :value="row.wm_icon"></upload>
	    				  </el-form-item>
	    				  <el-form-item label="是否启用">
	    				    <el-switch v-model="row.wm_abled" active-value="1" inactive-value="0"></el-switch>
	    				  </el-form-item>
	    				  <el-form-item label="调用页面模板">
	    				    <el-input v-model="row.wm_tpl"></el-input>
	    				  </el-form-item>
	    				  <el-form-item>
	    				      <el-button type="primary" @click="onSave(row.wm_id)">立即保存</el-button>
	    				      <el-button @click="dialogEdit = false">取消</el-button>
	    				    </el-form-item>
	    				</el-form>
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
import upload from '../../components/upload'




export default {
  name:"list",
  data() {
    return {
        tableData: [],
        row:{
        	"wm_id":"",
        	"wm_name":"",
			"wm_company":"",
			"wm_users": "",
			"wm_partments": "",
			"wm_icon": "",
			"wm_abled": "1",
			"wm_tpl": "",

        },
        dialogCreate:false,
        dialogEdit:false
        		
    }
  },
  created(){
  	this.listWfModule()
  },
  computed:{

  },
  methods: {
  	setUrl(msg){
  		this.row.wm_icon = msg
  	},
  	listWfModule(){
		Vue.http.jsonp("http://milibangong.cn/Appservice/Module/listWfModule")
		   .then((res) => {
		   		console.log( res.data.list)
		   		this.tableData = res.data.list

		   }, (error) => { })
  	},
  	onSave(wm_id){
  		Vue.http.jsonp("http://milibangong.cn/Appservice/Module/editWfModule",{
	  			params: { 
	  				wm_id:wm_id,
	  				wm_name:this.row.wm_name,
	  				wm_company:this.row.wm_company,
	  				wm_users:this.row.wm_users,
	  				wm_partments:this.row.wm_partments,
	  				wm_icon:this.row.wm_icon,
	  				wm_abled:this.row.wm_abled,
	  				wm_tpl:this.row.wm_tpl,
	  			}
  			})
  		   .then((res) => {
  		   		if(res.data.errorCode == 1){
  		   			if(wm_id == 0){
  		   				this.dialogCreate = false
  		   			}else{
  		   				this.dialogEdit = false
  		   			}
  		   			this.listWfModule()
          			this.$notify({
          			  title: '提示',
          			  message: this.row.wm_name + '保存成功',
          			  duration: 0,
          			  type: 'success'
          			});
          		}

  		   }, (error) => { })

  	},
  	onDelete(wm_id){
  		this.$confirm('此操作删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
	  		Vue.http.jsonp("http://milibangong.cn/Appservice/Module/delWfModule",{params: { wm_id: wm_id}})
	  		   .then((res) => {
					if(res.data.errorCode == 1){
						this.$message({
						  type: 'success',
						  message: '删除成功!'
						});
					}else{
						this.$message({
						  type: 'warning',
						  message: '删除失败!'
						});
					}
	  		   		this.listWfModule()
	  		   }, (error) => { })
          

        }).catch(() => {});
  	},
  	onEdit(row){
  		this.row = row
  	}

  },
  components:{navbar, sidemenu, upload}
}
</script>

<style scoped lang="less">

</style>