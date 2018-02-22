<template>
  	<div>
	   
	    
	    			<div class="page-title">
						<span v-if="this.wd_id != 0">列表管理 - 编辑</span>
						<span v-else>列表管理 - 新建</span>
					</div>

					<div class="page-body">
						
						
						<el-steps :active="active" finish-status="success" align-center simple>
						  <el-step title="基础信息"></el-step>
						  <el-step title="样式配置"></el-step>
						  <el-step title="字段配置"></el-step>
						  <el-step title="搜索条件配置"></el-step>
						</el-steps>


						<el-form ref="formStep1" :model="dataList" label-width="150px" style=" margin:30px auto;" v-show="active == 1" status-icon>
							<el-form-item label="列表英文名称" prop="wd_name" :rules="{ required: true, message: '不能为空'}">
							  <el-input v-model="dataList.wd_name" style="width:217px;"></el-input>
							</el-form-item>
							<el-form-item label="列表中文名称" prop="wd_name_ch" :rules="{ required: true, message: '不能为空'}">
							  <el-input v-model="dataList.wd_name_ch" style="width:217px;"></el-input>
							</el-form-item>
							<el-form-item label="所属公司ID">
							  <el-input v-model="dataList.wd_company" style="width:217px;"></el-input>
							</el-form-item>
							<el-form-item label="归属模块" prop="wd_module" :rules="{ required: true, message: '不能为空'}">
							  <moduleList @setModule="setModule" :getModuel="dataList.wd_module"></moduleList>
							</el-form-item>
							<el-form-item label="是否启用">
							    <el-switch v-model="dataList.wd_abled" active-value="1" inactive-value="0"></el-switch>
							</el-form-item>
						  	<el-form-item label="选择表单" prop="wd_form" :rules="{ required: true, message: '不能为空'}">
						  		<el-select v-model="dataList.wd_form" placeholder="请选择" @change="formIdFun">
						  		  <el-option
						  		    v-for="item in formList"
						  		    :key="item.wff_id"
						  		    :label="item.wff_name"
						  		    :value="item.wff_id"
						  		    :disabled="(item.wff_abled == 0)? true : false">
						  		      <span style="float: left;">{{ item.wff_name }}</span>
						  		      <span style="float: right;">{{ item.wff_id }}</span>
						  		  </el-option>
						  		</el-select>
						  	</el-form-item>
							<el-form-item>
								<el-button @click="$router.push('/custom/list/list')">返回列表</el-button>
							    <el-button type="primary" @click="next(1)">下一步</el-button>
							</el-form-item>
						</el-form>


						<el-form ref="formStep2" :model="dataList.wd_style_json" label-width="150px" style="margin:30px auto;" v-show="active == 2" status-icon>
							<el-form-item label="列表显示名称" prop="listName" :rules="{ required: true, message: '不能为空'}">
							  <el-input v-model="dataList.wd_style_json.listName" style="width:217px;"></el-input>
							</el-form-item>
							<el-form-item label="列表显示样式" prop="listType" :rules="{ required: true, message: '不能为空'}">
								<el-select v-model="dataList.wd_style_json.listType" placeholder="请选择">
								  <el-option
								    v-for="item in listTypeData"
								    :key="item.wcd_id"
								    :label="item.wcd_value"
								    :value="item.wcd_value">
								  </el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button @click="prev(1)">上一步</el-button>
							    <el-button type="primary" @click="next(2)">下一步</el-button>
							</el-form-item>

						</el-form>

						<el-form ref="formStep3" label-width="150px" style="margin:30px auto;" v-show="active == 3">
							<el-form-item label="ID对应字段">
								<el-select v-model="dataList.wd_style_json.idField.value"  @change="idFieldFun" placeholder="请选择">
								    <el-option
								      v-for="item in field"
								      :key="item.name"
								      :label="item.labelName"
								      :value="item.name">
								    </el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="标题对应字段">
								<el-select v-model="dataList.wd_style_json.titleField.value"  @change="titleFieldFun" placeholder="请选择">
								    <el-option
								      v-for="item in field"
								      :key="item.name"
								      :label="item.labelName"
								      :value="item.name">
								    </el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="内容对应字段">
								<el-select v-model="dataList.wd_style_json.contentField.value"  @change="contentFieldFun" placeholder="请选择">
								    <el-option
								      v-for="item in field"
								      :key="item.name"
								      :label="item.labelName"
								      :value="item.name">
								    </el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="图片对应字段">
								<el-select v-model="dataList.wd_style_json.imgField.value"  @change="imgFieldFun" placeholder="请选择">
								    <el-option
								      v-for="item in field"
								      :key="item.name"
								      :label="item.labelName"
								      :value="item.name">
								    </el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="时间对应字段">
								<el-select v-model="dataList.wd_style_json.timeField.value"  @change="timeFieldFun" placeholder="请选择">
								    <el-option
								      v-for="item in field"
								      :key="item.name"
								      :label="item.labelName"
								      :value="item.name">
								    </el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button @click="prev(2)">上一步</el-button>
							    <el-button type="primary" @click="next(3)">下一步</el-button>
							</el-form-item>
						</el-form>
						

						<el-form ref="formStep4" label-width="150px" style=" margin:30px auto;" v-show="active == 4">
							<el-form-item label="搜索条件">
								<table class="layout-table" v-show="dataList.wd_style_json.searchCondition.length > 0" style="width:500px; margin-bottom:20px;">
									<thead>
										<tr>
											<th>序号</th>
											<th>文字对应字段</th>
											<th>值对应的字段</th>
											<th>搜索显示文字</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in dataList.wd_style_json.searchCondition">
											<td>{{index}}</td>
											<td>{{item.nameField}}</td>
											<td>{{item.valueField}}</td>
											<td>{{item.labelName}}</td>
											<td><a href="javascript:;" v-on:click="dataList.wd_style_json.searchCondition.splice(index, 1)">删除</a></td>
										</tr>
									</tbody>
								</table>
								<el-button type="primary" @click="searchConditionDialog = true">添加</el-button>
							</el-form-item>
							<el-form-item label="选择搜索字段">
								<el-select v-model="dataList.wd_style_json.searchFieldArray" placeholder="请选择" readonly="true" @change="searchFieldFun"
									multiple 
									filterable 
									allow-create 
									default-first-option>
								    <el-option
								      v-for="item in field"
								      :key="item.name"
								      :label="item.labelName"
								      :value="item.name">
								    </el-option>
								</el-select>
							</el-form-item>
							<el-form-item>
								<el-button @click="prev(3)">上一步</el-button>
							    <el-button type="primary" @click="editWfDataInfo">保存</el-button>
							</el-form-item>
						</el-form>


						




						<el-dialog title="添加搜索条件" :visible.sync="searchConditionDialog">
							<pre>{{searchCondition}}</pre>
						  	<el-form v-model="searchCondition" label-width="150px">
						  		<el-form-item label="文字对应字段">
									<el-select v-model="searchCondition.nameField" placeholder="请选择">
									    <el-option
									      v-for="item in field"
									      :key="item.name"
									      :label="item.labelName"
									      :value="item.name">
									    </el-option>
									</el-select>
						  		</el-form-item>
				  		  		<el-form-item label="值对应的字段">
				  					<el-select v-model="searchCondition.valueField" placeholder="请选择">
				  					    <el-option
				  					      v-for="item in field"
				  					      :key="item.name"
				  					      :label="item.labelName"
				  					      :value="item.name">
				  					    </el-option>
				  					</el-select>
				  		  		</el-form-item>
				  		  		<el-form-item label="搜索显示文字">
									<el-input v-model="searchCondition.labelName" style="width:217px;"></el-input>
						  		</el-form-item>
						  		<el-form-item>
									<el-button type="primary"  @click="searchConditionFun">确认</el-button>
						  		</el-form-item>
						    </el-form>
						</el-dialog>




					</div>
	    	
	</div>
</template>




<script>
import Vue from 'vue'
import moduleList from '../../../components/moduleList'

export default {
  name:"",
  data() {
     return {
     	active:1,
     	searchConditionDialog:false,
     	dataList:{
     		wd_id:"",
     		wd_name:"",
     		wd_name_ch:"",
     		wd_form:"",
     		wd_company:this.CID(),
     		wd_module:"",
     		wd_abled:"1",
     		wd_create_userid:"",
     		wd_style_json:{
				listName: "",
				listType: "",
				searchKeyWord: "",
				searchKeyWordField: [],
				searchCondition: [],
				idField: {
					value: "",
					labelName: ""
				},
				titleField: {
					value: "",
					labelName: ""
				},
				contentField: {
					value: "",
					labelName: ""
				},
				imgField: {
					value: "",
					labelName: ""
				},
				timeField: {
					value: "",
					labelName: ""
				}
			}
     	},
     	formList:"",
     	listTypeData:"",
     	field:"",
     	searchCondition:
 		{
 			nameField: "",
 			valueField: "",
 			valueSelected: "",
 			labelName: "",
 			options: "",
 			key:"",
 		},
 		searchFieldArray:[],
 		wd_id:"",

     }
  },
  computed: {},
  created(){
  	
  	this.listWfForms()
  	this.listType()
  	this.wd_id = this.$route.query.wd_id
  	if(this.$route.query.wd_id != 0){
  		this.getDataInfoByListID(3)
  	}
  
  	
  	
  },
  methods: {
  	getDataInfoByListID(wd_id){
		Vue.http.jsonp(this.URL+"DataList/getDataInfoByListID",{params: { wd_id: wd_id}})
		   .then((res) => {
		   		let rs = res.data.list
		   		console.log(res.data.list)
	     		this.dataList.wd_id = rs.wd_id
	     		this.dataList.wd_name = rs.wd_name
	     		this.dataList.wd_name_ch = rs.wd_name_ch
	     		this.dataList.wd_form = rs.wd_form
	     		this.dataList.wd_company = rs.wd_company
	     		this.dataList.wd_module = rs.wd_module
	     		this.dataList.wd_abled = rs.wd_abled
	     		this.dataList.wd_create_userid = rs.wd_create_userid
	     		this.getFormFieldListByFormId(rs.wd_form)
	     		this.dataList.wd_style_json = JSON.parse(rs.wd_style_json) 
		   }, (error) => { })
  	},
  	editWfDataInfo(){
  		let wd_id = (this.dataList.wd_id == "") ? 0 : this.dataList.wd_id
  		Vue.http.post(this.URL+"DataList/editWfDataInfo",{
  		    wd_id: wd_id,
  		    wd_name:this.dataList.wd_name,
  		    wd_name_ch:this.dataList.wd_name_ch,
  		    wd_form:this.dataList.wd_form,
  		    wd_company:this.dataList.wd_company,
  		    wd_module:this.dataList.wd_module,
  		    wd_abled:this.dataList.wd_abled,
  		    wd_create_userid:this.wd_create_userid,
  		    wd_style_json:JSON.stringify(this.dataList.wd_style_json)
  		  },{emulateJSON: true}).then((res) => {
  		  	console.log(res.data)
  		  if(res.data.errorCode == 1){
  		    this.$notify({
  		      title: '提示',
  		      message: this.dataList.wd_name_ch + '保存成功',
  		      duration: 0,
  		      type: 'success'
  		    });
  		    if(wd_id == 0){
  		      this.$router.push('/custom/list/list')
  		    }
  		  }else{

  		  	this.$notify.error({
  		  	  title: '提示',
  		  	  message: this.dataList.ws_name + '保存失败',
  		  	  duration: 0,
  		  	  type: 'warning'
  		  	});

  		  	console.log(res.data.errorSql)
  		  }

  		  }, (error) => {
  		})
  	},
  	next(num){
  		if(num == 1){
  			this.$refs['formStep1'].validate((valid) => {
  			  if (valid) {
  			    this.active = 2;
  			  } else {
  			    return false;
  			  }
  			});
  		}else if(num == 2){
  			this.$refs['formStep2'].validate((valid) => {
  			  if (valid) {
  			    this.active = 3;
  			  } else {
  			    return false;
  			  }
  			});
  		}else if(num == 3){
  			this.active = 4;
  		}
  	},
  	prev(num){
    	this.active = num;
  	},
  	submitForm(formName){
	    this.$refs[formName].validate((valid) => {
	      if (valid) {
	        alert('submit!');
	      } else {
	        console.log('error submit!!');
	        return false;
	      }
	    });
	},
	searchConditionFun(){
		this.dataList.wd_style_json.searchCondition.push({
			nameField: this.searchCondition.nameField,
			valueField: this.searchCondition.valueField,
			valueSelected: "",
			labelName: this.searchCondition.labelName,
			options: "",
			key:this.TOKEN(),
		})
		this.searchConditionDialog = false
	},
	searchFieldFun(msg){
  		let _this = this
  		_this.dataList.wd_style_json.searchFieldArray = msg
  	},
  	listWfForms(){
  	  Vue.http.jsonp(this.URL+"Forms/listWfForms")
  	     .then((res) => {
  	        this.formList = res.data.list
  	     }, (error) => { })
  	},
  	setModule(msg){
  	  this.dataList.wd_module = msg
  	},
  	//获取列表显示样式
  	listType(){
  	  Vue.http.jsonp(this.URL+"FormWidgets/getCodeDetailById?wc_id=16")
  	     .then((res) => {
  	        this.listTypeData = res.data.list
  	     }, (error) => { })
  	},
  	formIdFun(msg){
  		this.getFormFieldListByFormId(msg)
  	},
  	idFieldFun(msg){
  		let obj = {};
	      	obj = this.field.find((item)=>{
	        return item.name === msg
	    })
	    this.dataList.wd_style_json.idField.labelName = obj.labelName
  	},
  	titleFieldFun(msg){
  		let obj = {};
	      	obj = this.field.find((item)=>{
	        return item.name === msg
	    })
	    this.dataList.wd_style_json.titleField.labelName = obj.labelName
  	},
  	contentFieldFun(msg){
  		let obj = {};
	      	obj = this.field.find((item)=>{
	        return item.name === msg
	    })
	    this.dataList.wd_style_json.contentField.labelName = obj.labelName
  	},
  	imgFieldFun(msg){
  		let obj = {};
	      	obj = this.field.find((item)=>{
	        return item.name === msg
	    })
	    this.dataList.wd_style_json.imgField.labelName = obj.labelName
  	},
  	timeFieldFun(msg){
  		let obj = {};
	      	obj = this.field.find((item)=>{
	        return item.name === msg
	    })
	    this.dataList.wd_style_json.timeField.labelName = obj.labelName
  	},


  	//根据表单结构ID,取得表单所有字段list
  	getFormFieldListByFormId(wff_id){
  	  	Vue.http.jsonp(this.URL+"Statistics/getFormFieldListByFormId",{params: { wff_id: wff_id}})
  	     	.then((res) => {
  	        this.field = res.data.list
  	        console.log(res.data.list)
  	     }, (error) => {})
  	},
  	
  	
  },
  components:{moduleList}
}
</script>

<style scoped lang="less">

</style>