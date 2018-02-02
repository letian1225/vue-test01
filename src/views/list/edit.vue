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
						<span>列表管理 - 新建/编辑</span>
					</div>

					<div class="page-body">
						
						<pre>{{dataList}}</pre>

						<el-steps :active="active" finish-status="success" align-center simple>
						  <el-step title="基础信息"></el-step>
						  <el-step title="样式配置"></el-step>
						  <el-step title="字段配置"></el-step>
						  <el-step title="搜索条件配置"></el-step>
						</el-steps>


						<el-form ref="formStep1" :model="dataList" label-width="150px" style=" margin:30px auto;" v-show="active == 2" status-icon>
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
								<el-button>返回列表</el-button>
							    <el-button type="primary" @click="next(1)">下一步</el-button>
							</el-form-item>
						</el-form>


						<el-form ref="formStep2" :model="dataList.wd_style_json" label-width="120px" style="margin:30px auto;" v-show="active == 2" status-icon>
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
								<el-button @click="prev()">上一步</el-button>
							    <el-button type="primary" @click="next(2)">下一步</el-button>
							</el-form-item>

						</el-form>

						<el-form ref="formStep3" label-width="120px" style="margin:30px auto;" v-show="active == 2">
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
								<el-button @click="prev()">上一步</el-button>
							    <el-button type="primary" @click="next(3)">下一步</el-button>
							</el-form-item>
						</el-form>
						

						<el-form ref="formStep4" label-width="120px" style=" margin:30px auto;" v-show="active == 3">
							<el-form-item>
								<el-button @click="prev()">上一步</el-button>
							    <el-button type="primary" >保存</el-button>
							</el-form-item>
						</el-form>




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
  name:"",
  data() {
     return {
     	active:2,
     	dataList:{
     		wd_id:"",
     		wd_name:"",
     		wd_name_ch:"",
     		wd_form:"",
     		wd_company:"",
     		wd_module:"",
     		wd_abled:"1",
     		wd_create_userid:"",
     		wd_style_json:{
				listName: "买家一览表",
				listType: "peopleListStyle",
				searchKeyWord: "",
				searchKeyWordField: [],
				searchCondition: [
					{
						nameField: "user_name",
						valueField: "wfd_user_id",
						valueSelected: "",
						labelName: "买家姓名",
						options: ""
					}
				],
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

     }
  },
  computed: {},
  created(){
  	this.listWfForms()
  	this.listType()
  },
  methods: {
  	next(num){
  		if(num == 1){
  			this.$refs['formStep1'].validate((valid) => {
  			  if (valid) {
  			    if (this.active++ > 2) this.active = 0;
  			  } else {
  			    return false;
  			  }
  			});
  		}else if(num == 2){
  			this.$refs['formStep2'].validate((valid) => {
  			  if (valid) {
  			    if (this.active++ > 2) this.active = 0;
  			  } else {
  			    return false;
  			  }
  			});
  		}else if(num == 3){
  			this.$refs['formStep3'].validate((valid) => {
  			  if (valid) {
  			    if (this.active++ > 2) this.active = 0;
  			  } else {
  			    return false;
  			  }
  			});
  		}
    	
  	},
  	prev(){
    	if (this.active-- < 2) this.active = 0;
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
  	listWfForms(){
  	  Vue.http.jsonp("http://milibangong.cn/Appservice/Forms/listWfForms")
  	     .then((res) => {
  	        this.formList = res.data.list
  	     }, (error) => { })
  	},
  	setModule(msg){
  	  this.dataList.wd_module = msg
  	},
  	//获取列表显示样式
  	listType(){
  	  Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/getCodeDetailById?wc_id=16")
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
  	  	Vue.http.jsonp("http://milibangong.cn/Appservice/Statistics/getFormFieldListByFormId",{params: { wff_id: wff_id}})
  	     	.then((res) => {
  	        this.field = res.data.list
  	        console.log(res.data.list)
  	     }, (error) => {})
  	},





  
  	createUID(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
		    return v.toString(16)
		})
	},
  	
  	
  },
  components:{navbar,sidemenu,moduleList}
}
</script>

<style scoped lang="less">

</style>