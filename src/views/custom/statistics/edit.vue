<template>
  	<div>
	  
		
	    			<div class="page-title">
						<span v-if="this.ws_id != 0">统计管理 - 编辑</span>
						<span v-else>统计管理 - 新建</span>
					</div>
					<div class="page-body">
						<el-form ref="form" label-width="120px">
							<el-form-item label="统计名称">
							  <el-input v-model="formJson.ws_name" style="width:217px;"></el-input>
							</el-form-item>
							<el-form-item label="统计说明">
							  <el-input v-model="formJson.ws_name_ch" style="width:217px;"></el-input>
							</el-form-item>
							<el-form-item label="所属公司ID">
							  <el-input v-model="formJson.ws_company" style="width:217px;"></el-input>
							</el-form-item>
							<el-form-item label="归属模块">
							  <moduleList @setModule="setModule" :getModuel="formJson.ws_module"></moduleList>
							</el-form-item>

							<el-form-item label="是否启用">
							    <el-switch v-model="formJson.ws_abled" active-value="1" inactive-value="0"></el-switch>
							</el-form-item>

						  	<el-form-item label="选择统计表单">
						  		<el-select v-model="formJson.ws_form" placeholder="请选择" @change="formIdFun">
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
					  		<el-form-item label="选择统计字段">
					  			<el-select v-model="ws_json.statisticsField" placeholder="请选择">
					  			    <el-option
					  			      v-for="item in field"
					  			      :key="item.name"
					  			      :label="item.labelName"
					  			      :value="item.name">
					  			    </el-option>
					  			</el-select>
					  		</el-form-item>
					  		<el-form-item label="选择统计方式">
								<el-radio-group v-model="ws_json.statisticsType" size="small">
									<el-radio-button v-for="item in mode" :key="item.wcd_id" :label="item.wcd_value">{{item.wcd_text}}</el-radio-button>
								</el-radio-group>
					  		</el-form-item>

					  		<el-form-item label="选择统计条件">
					  			<table class="layout-table" v-show="ws_json.whereField.length > 0" style="width:500px;">
					  				<thead>
					  					<tr>
					  						<th>序号</th>
					  						<th>连接符</th>
					  						<th>字段</th>
					  						<th>条件</th>
					  						<th>值</th>
					  						<th>操作</th>
					  					</tr>
					  				</thead>
					  				<tbody>
					  					<tr v-for="(item, index) in ws_json.whereField" :key="index">
					  						<td>{{index}}</td>
					  						<td>{{item.contact}}</td>
					  						<td>{{item.field}}</td>
					  						<td>{{item.condition}}</td>
					  						<td>{{item.fieldvalue}}</td>
					  						<td><a href="javascript:;" v-on:click="ws_json.whereField.splice(index, 1)">删除</a></td>
					  					</tr>
					  				</tbody>
					  			</table>
								<el-button type="primary"  size="small" @click="whereDialog = true">添加</el-button>
					  		</el-form-item>

					  		<el-form-item label="选择分组字段">
					  			<table class="layout-table" v-show="groupFieldArray.length > 0" style="width:500px;">
					  				<thead>
					  					<tr>
					  						<th>序号</th>
					  						<th>字段</th>
					  						<th>操作</th>
					  					</tr>
					  				</thead>
					  				<tbody>
					  					<tr v-for="(item, index) in groupFieldArray">
					  						<td>{{index}}</td>
					  						<td>{{item}}</td>
					  						<td><a href="javascript:;" v-on:click="ws_json.groupField.splice(index, 1), groupFieldArray.splice(index, 1)">删除</a></td>
					  					</tr>
					  				</tbody>
					  			</table>
					  			<el-button type="primary" size="small" @click="groupFieldDialog = true ">添加分组字段</el-button>
					  			<el-button type="info" size="small" @click="customGroupFieldDialog = true ">添加自定义分组字段</el-button>
					  		</el-form-item>

					  		<el-form-item label="选择排序方式">
					  			<table class="layout-table" v-show="ws_json.orderField.length > 0" style="width:500px;">
					  				<thead>
					  					<tr>
					  						<th>序号</th>
					  						<th>字段</th>
					  						<th>排序方式</th>
					  						<th>操作</th>
					  					</tr>
					  				</thead>
					  				<tbody>
					  					<tr v-for="(item, index) in ws_json.orderField">
					  						<td>{{index}}</td>
					  						<td>{{item.field}}</td>
					  						<td>{{item.order}}</td>
					  						<td><a href="javascript:;" v-on:click="ws_json.orderField.splice(index, 1)">删除</a></td>
					  					</tr>
					  				</tbody>
					  			</table>
								<el-button type="primary"  size="small" @click="orderDialog = true ">添加</el-button>
					  		</el-form-item>


					  		<el-form-item label="显示字段">
					  			<table class="layout-table" v-show="showFieldArray.length > 0" style="width:500px;">
					  				<thead>
					  					<tr>
					  						<th>序号</th>
					  						<th>字段</th>
					  						<th>操作</th>
					  					</tr>
					  				</thead>
					  				<tbody>
					  					<tr v-for="(item, index) in showFieldArray">
					  						<td>{{index}}</td>
					  						<td>{{item}}</td>
					  						<td><a href="javascript:;" v-on:click="ws_json.showField.splice(index, 1), showFieldArray.splice(index, 1)">删除</a></td>
					  					</tr>
					  				</tbody>
					  			</table>
								<el-button type="primary"  size="small" @click="showFieldDialog = true">添加显示字段</el-button>
					  			<el-button type="info"  size="small" @click="customShowFieldDialog = true">添加自定义显示字段</el-button>
					  		</el-form-item>


					  		<el-form-item label="选择统计图">
					  			<table class="layout-table" v-if="showResult != ''">
					  				<thead>
					  					<tr>
					  						<th v-for="(item,key) in showResult">{{key}}</th>
					  					</tr>
					  				</thead>
					  				<tbody>
					  					<tr>
					  						<td v-for="(value, index) in showResult">{{value}}</td>
					  					</tr>
					  				</tbody>
					  			</table>
								<el-button type="warning"  size="small" @click="chartDialog = true ">选择</el-button>
					  		</el-form-item>

							
							<el-form-item>
								<el-button @click="$router.push('/custom/statistics/statistics')">返回</el-button>
								<el-button type="primary" @click="editWfStatistics()">保存</el-button>
							</el-form-item>

					  	</el-form>

		  		  	    <el-dialog title="添加分组字段" :visible.sync="groupFieldDialog">
		  		  	      	<el-form ref="form" label-width="120px">
		  		  	      		<el-form-item label="选择字段">
		  				  			<el-checkbox-group v-model="groupFieldArray">
		  				  				<el-checkbox v-for="item in field" :label="item.name" :key="item.name" style="width:220px; margin:0;">{{item.labelName}}</el-checkbox>
		  				  			</el-checkbox-group>
		  			  			</el-form-item>
		  	  			  		<el-form-item>
		  	  						<el-button type="primary"  @click="groupFieldConfirm">确认</el-button>
		  	  			  		</el-form-item>
		  		  	        </el-form>
		  		  	    </el-dialog>

				  	    <el-dialog title="添加自定义分组字段" :visible.sync="customGroupFieldDialog">
				  	      	<el-form ref="form" label-width="120px">
		  	  	  		  		<el-form-item label="字段英文名">
		  	  	  					<el-input v-model="customGroupField.field" style="width:200px;"></el-input>
		  	  	  		  		</el-form-item>
  	  	  		  		  		<el-form-item label="字段中文名">
  	  	  		  					<el-input v-model="customGroupField.fieldCh" style="width:200px;"></el-input>
  	  	  		  		  		</el-form-item>
			  			  		<el-form-item>
			  						<el-button type="primary"  @click="customGroupFieldConfirm">确认</el-button>
			  			  		</el-form-item>
				  	        </el-form>
				  	    </el-dialog>
						
				  	    <el-dialog title="添加显示字段" :visible.sync="showFieldDialog">
				  	      	<el-form ref="form" label-width="120px">
				  	      		<el-form-item label="选择字段">
						  			<el-checkbox-group v-model="showFieldArray">
						  				<el-checkbox v-for="item in field" :label="item.name" :key="item.name" style="width:220px; margin:0;">{{item.labelName}}</el-checkbox>
						  			</el-checkbox-group>
					  			</el-form-item>
			  			  		<el-form-item>
			  						<el-button type="primary"  @click="showFieldConfirm">确认</el-button>
			  			  		</el-form-item>
				  	        </el-form>
				  	    </el-dialog>

				  	    <el-dialog title="添加自定义显示字段" :visible.sync="customShowFieldDialog">
				  	      	<el-form ref="form" label-width="120px">
		  	  	  		  		<el-form-item label="字段英文名">
		  	  	  					<el-input v-model="customShowField.field" style="width:200px;"></el-input>
		  	  	  		  		</el-form-item>
  	  	  		  		  		<el-form-item label="字段中文名">
  	  	  		  					<el-input v-model="customShowField.fieldCh" style="width:200px;"></el-input>
  	  	  		  		  		</el-form-item>
			  			  		<el-form-item>
			  						<el-button type="primary"  @click="customShowFieldConfirm">确认</el-button>
			  			  		</el-form-item>
				  	        </el-form>
				  	    </el-dialog>

						<el-dialog title="选择统计条件" :visible.sync="whereDialog">
						  	<el-form ref="whereField" v-model="whereField" label-width="120px">
						  		<el-form-item label="连接符">
									<el-radio-group v-model="whereField.contact" size="small">
										<el-radio-button v-for="item in contact" :key="item.wcd_id" :label="item.wcd_value">{{item.wcd_text}}</el-radio-button>
									</el-radio-group>
						  		</el-form-item>
						  		<el-form-item label="字段">
									<el-select v-model="whereField.field" placeholder="请选择">
									    <el-option
									      v-for="item in field"
									      :key="item.name"
									      :label="item.labelName"
									      :value="item.name">
									    </el-option>
									</el-select>
						  		</el-form-item>
						  		<el-form-item label="条件">
									<el-radio-group v-model="whereField.condition" size="small">
										<el-radio-button v-for="item in condition" :key="item.wcd_id" :label="item.wcd_value">{{item.wcd_text}}</el-radio-button>
									</el-radio-group>
						  		</el-form-item>
						  		<el-form-item label="值">
									<el-input v-model="whereField.fieldvalue" style="width:200px;"></el-input>
						  		</el-form-item>
						  		<el-form-item>
									<el-button type="primary"  @click="whereChoose">确认</el-button>
						  		</el-form-item>
						    </el-form>
						</el-dialog>

					    <el-dialog title="选择排序方式" :visible.sync="orderDialog">
					      	<el-form ref="form" label-width="120px">
					  	  		<el-form-item label="字段">
					  				<el-select v-model="orderField.field" placeholder="请选择">
					  				    <el-option
					  				      v-for="item in field"
					  				      :key="item.name"
					  				      :label="item.labelName"
					  				      :value="item.name">
					  				    </el-option>
					  				</el-select>
					  	  		</el-form-item>
					  	  		<el-form-item label="排序方式">
					  				<el-radio-group v-model="orderField.order" size="small">
										<el-radio-button v-for="item in order" :key="item.wcd_id" :label="item.wcd_value">{{item.wcd_text}}</el-radio-button>
									</el-radio-group>
					  	  		</el-form-item>
							  		<el-form-item>
										<el-button type="primary"  @click="orderChoose">确认</el-button>
							  		</el-form-item>
					        </el-form>
					    </el-dialog>


				        <el-dialog title="选择统计图" :visible.sync="chartDialog">
				          	<el-form ref="form" label-width="200px">
				          		<el-form-item label="选择统计图">
				          			<el-select v-model="ws_json.showType" placeholder="请选择" @change="showTypeFun">
				          			    <el-option
				          			      v-for="item in showType"
				          			      :key="item.wcd_id"
				          			      :label="item.wcd_value"
				          			      :value="item.wcd_value">
				          			    </el-option>
				          			</el-select>
				          		</el-form-item>





								<div v-if="ws_json.showType == 'barChart'">
							  		<el-form-item label="标题">
							  			<!--图标题,用户输入	-->
										<el-input v-model="showResult.titleName" style="width:217px;"></el-input>
							  		</el-form-item>
					  		  		<el-form-item label="X轴坐标标题">
					  		  			<!--x轴坐标标题,用户输入-->
					  					<el-input v-model="showResult.xAxisTitleName" style="width:217px;"></el-input>
					  		  		</el-form-item>
				  		  		
					  		  		<el-form-item label="Y轴坐标标题">
					  		  			<!--y轴坐标标题,用户输入-->
					  					<el-input v-model="showResult.yAxisTitleName" style="width:217px;"></el-input>
					  		  		</el-form-item>
					  		  		<el-form-item label="X轴刻度值数组" style="display:none;">
					  		  			<!--x轴刻度值数组,留空	-->
					  					<el-input v-model="showResult.xAxisValues" style="width:217px;"></el-input>
					  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴最小值" style="display:none;">
			  		  		  			<!--y轴最小值,留空	-->
			  		  					<el-input v-model="showResult.yAxisNameMin" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴最大值" style="display:none;">
			  		  		  			<!--y轴最大值,留空	-->
			  		  					<el-input v-model="showResult.yAxisNameMax" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="x轴刻度对应的值" style="display:none;">
			  		  		  			<!--与x轴刻度对应的值组成的数组,留空-->
			  		  					<el-input v-model="showResult.yAxisValues" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="X轴字段名">
			  		  		  			<!--由用户指定x轴显示统计结果的字段名-->
			  		  		  			<el-select v-model="showResult.xName" placeholder="请选择">
			  		  		  			    <el-option
			  		  		  			      v-for="item in field"
			  		  		  			      :key="item.name"
			  		  		  			      :label="item.labelName"
			  		  		  			      :value="item.name">
			  		  		  			    </el-option>
			  		  		  			</el-select>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴字段名">
			  		  		  			<!--由用户指定y轴显示统计结果的字段名-->
			  		  		  			<el-select v-model="showResult.yName" placeholder="请选择">
			  		  		  			    <el-option
			  		  		  			      v-for="item in field"
			  		  		  			      :key="item.name"
			  		  		  			      :label="item.labelName"
			  		  		  			      :value="item.name">
			  		  		  			    </el-option>
			  		  		  			</el-select>
			  		  		  		</el-form-item>
								</div>
								<div v-if="ws_json.showType == 'peiChart'">
							  		<el-form-item label="标题">
							  			<!--图标题,用户输入	-->
										<el-input v-model="showResult.titleName" style="width:217px;"></el-input>
							  		</el-form-item>
					  		  		<el-form-item label="数据总量" style="display:none;">
					  		  			<!--数据总量,留空-->
					  					<el-input v-model="showResult.total" style="width:217px;"></el-input>
					  		  		</el-form-item>
				  		  		
					  		  		<el-form-item label="数据条数" style="display:none;">
					  		  			<!--数据条数,留空-->
					  					<el-input v-model="showResult.itemNum" style="width:217px;"></el-input>
					  		  		</el-form-item>
					  		  		<el-form-item label="统计结果字段">
					  		  			<!--由用户指定显示统计结果的字段名-->
					  		  			<el-select v-model="showResult.name" placeholder="请选择">
					  		  			    <el-option
					  		  			      v-for="item in field"
					  		  			      :key="item.name"
					  		  			      :label="item.labelName"
					  		  			      :value="item.name">
					  		  			    </el-option>
					  		  			</el-select>
					  		  		</el-form-item>
					  		  		<el-form-item label="值组成的数组" style="display:none;">
					  		  			<!--每条数据的值组成的数组,留空-->
					  					<el-input v-model="showResult.values" style="width:217px;"></el-input>
					  		  		</el-form-item>
								</div>
								<div v-if="ws_json.showType == 'funnelChart'">
							  		<el-form-item label="标题">
							  			<!--图标题,用户输入	-->
										<el-input v-model="showResult.titleName" style="width:217px;"></el-input>
							  		</el-form-item>
					  		  		<el-form-item label="字段名">
					  		  			<!--由用户指定显示统计结果的字段名-->
					  		  			<el-select v-model="showResult.name" placeholder="请选择">
					  		  			    <el-option
					  		  			      v-for="item in field"
					  		  			      :key="item.name"
					  		  			      :label="item.labelName"
					  		  			      :value="item.name">
					  		  			    </el-option>
					  		  			</el-select>
					  		  		</el-form-item>
					  		  		<el-form-item label="项目数量组成的数组" style="display:none;">
					  		  			<!--每个阶段的项目数量组成的数组,留空-->
					  					<el-input v-model="showResult.values" style="width:217px;"></el-input>
					  		  		</el-form-item>
								</div>
								<div v-if="ws_json.showType == 'lineChart'">
							  		<el-form-item label="标题">
							  			<!--图标题,用户输入	-->
										<el-input v-model="showResult.titleName" style="width:217px;"></el-input>
							  		</el-form-item>
							  		<el-form-item label="LINE名称">
							  			<!--图标题,用户输入	-->
										<el-input v-model="showResult.lineName" style="width:217px;"></el-input>
							  		</el-form-item>
					  		  		<el-form-item label="X轴坐标标题">
					  		  			<!--x轴坐标标题,用户输入-->
					  					<el-input v-model="showResult.xAxisTitleName" style="width:217px;"></el-input>
					  		  		</el-form-item>
				  		  		
					  		  		<el-form-item label="Y轴坐标标题">
					  		  			<!--y轴坐标标题,用户输入-->
					  					<el-input v-model="showResult.yAxisTitleName" style="width:217px;"></el-input>
					  		  		</el-form-item>
					  		  		<el-form-item label="X轴刻度值数组" style="display:none;">
					  		  			<!--x轴刻度值数组,留空	-->
					  					<el-input v-model="showResult.xAxisValues" style="width:217px;"></el-input>
					  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴最小值" style="display:none;">
			  		  		  			<!--y轴最小值,留空	-->
			  		  					<el-input v-model="showResult.yAxisNameMin" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴最大值" style="display:none;">
			  		  		  			<!--y轴最大值,留空	-->
			  		  					<el-input v-model="showResult.yAxisNameMax" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="x轴刻度对应的值" style="display:none;">
			  		  		  			<!--与x轴刻度对应的值组成的数组,留空-->
			  		  					<el-input v-model="showResult.yAxisValues" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="X轴字段名">
			  		  		  			<!--由用户指定x轴显示统计结果的字段名-->
			  		  		  			<el-select v-model="showResult.xName" placeholder="请选择">
			  		  		  			    <el-option
			  		  		  			      v-for="item in field"
			  		  		  			      :key="item.name"
			  		  		  			      :label="item.labelName"
			  		  		  			      :value="item.name">
			  		  		  			    </el-option>
			  		  		  			</el-select>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴字段名">
			  		  		  			<!--由用户指定y轴显示统计结果的字段名-->
			  		  		  			<el-select v-model="showResult.yName" placeholder="请选择">
			  		  		  			    <el-option
			  		  		  			      v-for="item in field"
			  		  		  			      :key="item.name"
			  		  		  			      :label="item.labelName"
			  		  		  			      :value="item.name">
			  		  		  			    </el-option>
			  		  		  			</el-select>
			  		  		  		</el-form-item>
								</div>

								<div v-if="ws_json.showType == 'curveChart'">
							  		<el-form-item label="标题">
							  			<!--图标题,用户输入	-->
										<el-input v-model="showResult.titleName" style="width:217px;"></el-input>
							  		</el-form-item>
					  		  		<el-form-item label="X轴坐标标题">
					  		  			<!--x轴坐标标题,用户输入-->
					  					<el-input v-model="showResult.xAxisTitleName" style="width:217px;"></el-input>
					  		  		</el-form-item>
				  		  		
					  		  		<el-form-item label="Y轴坐标标题">
					  		  			<!--y轴坐标标题,用户输入-->
					  					<el-input v-model="showResult.yAxisTitleName" style="width:217px;"></el-input>
					  		  		</el-form-item>
					  		  		<el-form-item label="X轴刻度值数组" style="display:none;">
					  		  			<!--x轴刻度值数组,留空	-->
					  					<el-input v-model="showResult.xAxisValues" style="width:217px;"></el-input>
					  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴最小值" style="display:none;">
			  		  		  			<!--y轴最小值,留空	-->
			  		  					<el-input v-model="showResult.yAxisNameMin" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴最大值" style="display:none;">
			  		  		  			<!--y轴最大值,留空	-->
			  		  					<el-input v-model="showResult.yAxisNameMax" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="x轴刻度对应的值" style="display:none;">
			  		  		  			<!--与x轴刻度对应的值组成的数组,留空-->
			  		  					<el-input v-model="showResult.yAxisValues" style="width:217px;"></el-input>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="X轴字段名">
			  		  		  			<!--由用户指定x轴显示统计结果的字段名-->
			  		  		  			<el-select v-model="showResult.xName" placeholder="请选择">
			  		  		  			    <el-option
			  		  		  			      v-for="item in field"
			  		  		  			      :key="item.name"
			  		  		  			      :label="item.labelName"
			  		  		  			      :value="item.name">
			  		  		  			    </el-option>
			  		  		  			</el-select>
			  		  		  		</el-form-item>
			  		  		  		<el-form-item label="Y轴字段名">
			  		  		  			<!--由用户指定y轴显示统计结果的字段名-->
			  		  		  			<el-select v-model="showResult.yName" placeholder="请选择">
			  		  		  			    <el-option
			  		  		  			      v-for="item in field"
			  		  		  			      :key="item.name"
			  		  		  			      :label="item.labelName"
			  		  		  			      :value="item.name">
			  		  		  			    </el-option>
			  		  		  			</el-select>
			  		  		  		</el-form-item>
								</div>

								<div v-if="ws_json.showType == 'totalnumberChart'">
							  		<el-form-item label="标题">
							  			<!--图标题,用户输入	-->
										<el-input v-model="showResult.titleName" style="width:217px;"></el-input>
							  		</el-form-item>
								</div>












				    		  	<el-form-item>
				    				<el-button type="primary"  @click="chartChoose">确认</el-button>
				    		  	</el-form-item>
				            </el-form>
				        </el-dialog>




					</div>
	    		
	   
	</div>
</template>




<script>
import Vue from 'vue'
import chooseFormList from '../../../components/chooseFormList'
import moduleList from '../../../components/moduleList'
export default {
  name:"",
  data() {
     return {
     	groupFieldDialog:false,
     	customGroupFieldDialog:false,
     	showFieldDialog:false,
     	customShowFieldDialog:false,
     	formList:[],
        fieldId:"",
        field:[],
        mode:[],
        contact:"",
        condition:"",
        order:"",
        ws_id:"",
        groupFieldArray:[],
        customGroupField:{},
        showFieldArray:[],
        customShowField:{},
        showField:{
        	"key":"",
        	"field": "",
        	"fieldCh": "",
        },
        whereDialog:false,
        whereField:{
        	"key":"",
    		"contact": "",
    		"field": "",
    		"fieldvalue": "",
    		"condition": ""
        },
        orderDialog:false,
        orderField:{
        	"key":"",
        	"field": "",
        	"order": "",
        },
        chartDialog:false,
        showType:[],
        showResult:"",
        barChart:{},
		peiChart:{},
		funnelChart:{},
		lineChart:{},
		curveChart:{},
		totalnumberChart:{
			"titleName":"",
			"month":{"last":"","this":"","best":""},
			"quarter":{"last":"","this":"","best":""},
			"year":{"last":"","this":"","best":""}
		},

       	ws_json:
       	{
		    "statisticsField": "", 		//统计字段
		    "statisticsType": "", 		//统计方式
		    "showField": [],			//显示字段
		    "whereField": [],			//条件
		    "groupField": [],			//分组字段
		    "orderField": [],
		    "showType": "",		//统计图
		    "showResult": {}
		},
		formJson:{
			ws_id:"",
			ws_name:"",
			ws_name_ch:"",
			ws_module:"",
			ws_company:this.CID(),
			ws_abled:"1",
			ws_form:"",
		}

     }
  },
  computed: {},
  created(){
  	
  	this.ws_id = this.$route.query.ws_id
  	if(this.ws_id != 0){
  		this.listWfStatistics(this.ws_id)
  	}
  	this.listWfForms()
    this.getMode()
    this.getContact()
    this.getCondition()
    this.getOrder()
    this.getChart()
  },
  methods: {
  	
  	groupFieldConfirm(){
  		this.groupFieldDialog = false
  		let _this = this
	    let size = _this.ws_json.groupField.length
  		for(let i = size; i < this.groupFieldArray.length; i++){
	  		let obj = {};
		      	obj = this.field.find((item)=>{
		        return item.name === this.groupFieldArray[i]
		    })
  			_this.ws_json.groupField.push({
  				"key": _this.KEY,
  				"field":this.groupFieldArray[i],
  				"fieldCh": obj.labelName
  			})
  		}
  	},
  	customGroupFieldConfirm(){
  		this.groupFieldArray.push(this.customGroupField.field)
  		this.ws_json.groupField.push({
  			"key": this.KEY,
  			"field":this.customGroupField.field,
  			"fieldCh": this.customGroupField.fieldCh
  		})
  		this.customGroupFieldDialog = false
  	},
  	showFieldConfirm(){
  		this.showFieldDialog = false
  		let _this = this
  		let size = _this.ws_json.showField.length
  		for(let i = size; i < this.showFieldArray.length; i++){
	  		let obj = {};
		      	obj = this.field.find((item)=>{
		        return item.name === this.showFieldArray[i]
		    })
  			_this.ws_json.showField.push({
  				"key": _this.KEY,
  				"field":this.showFieldArray[i],
  				"fieldCh": obj.labelName
  			})
  		}
  	},
  	customShowFieldConfirm(){
  		this.showFieldArray.push(this.customShowField.field)
  		this.ws_json.showField.push({
  			"key": this.KEY,
  			"field":this.customShowField.field,
  			"fieldCh": this.customShowField.fieldCh
  		})
  		this.customShowFieldDialog = false
  	},
  	listWfForms(){
  	  Vue.http.jsonp(this.URL+"Forms/listWfForms")
  	     .then((res) => {
  	        this.formList = res.data.list
  	     }, (error) => { })
  	},
  	listWfStatistics(ws_id){
		Vue.http.jsonp(this.URL+"Statistics/listWfStatistics",{params: { ws_company: this.CID(), ws_id:ws_id}})
		   .then((res) => {

		   		let rs = res.data.list[0]
		   		this.formJson.ws_id = rs.ws_id
		   		this.formJson.ws_name = rs.ws_name
		   		this.formJson.ws_name_ch = rs.ws_name_ch

		   		this.formJson.ws_module = rs.ws_module
		   		this.formJson.ws_company = rs.ws_company
		   		this.formJson.ws_abled = rs.ws_abled
		   		this.formJson.ws_form = rs.ws_form


		   		this.getFormFieldListByFormId(rs.ws_form)


		   		
		   		this.ws_json = JSON.parse(rs.ws_json)

		   		for(let i = 0; i < this.ws_json.groupField.length; i++){
		   			this.groupFieldArray.push(this.ws_json.groupField[i].field)
		   		}

		   		for(let i = 0; i < this.ws_json.showField.length; i++){
		   			this.showFieldArray.push(this.ws_json.showField[i].field)
		   		}


		   		this.showType = this.ws_json.showType

	   			this.showResult = this.ws_json.showResult
		   			
		   }, (error) => { })
  	},
  	editWfStatistics(){
  		let ws_id = (this.ws_id == "") ? 0 : this.ws_id
  		Vue.http.post(this.URL+"Statistics/editWfStatistics",{
  		    ws_id: ws_id,
  		    ws_form:this.formJson.ws_form,
  		    ws_name:this.formJson.ws_name,
  		    ws_name_ch:this.formJson.ws_name_ch,
  		    ws_module:this.formJson.ws_module,
  		    ws_company:this.formJson.ws_company,
  		    ws_abled:this.formJson.ws_abled,
  		    ws_json: JSON.stringify(this.ws_json)
  		  },{emulateJSON: true}).then((res) => {
  		  if(res.data.errorCode == 1){
  		    this.$notify({
  		      title: '提示',
  		      message: this.formJson.ws_name + '保存成功',
  		      duration: 0,
  		      type: 'success'
  		    });
  		    if(ws_id == 0){
  		      this.$router.push('/custom/statistics/statistics')
  		    }
  		  }else{

  		  	this.$notify.error({
  		  	  title: '提示',
  		  	  message: this.formJson.ws_name + '保存失败',
  		  	  duration: 0,
  		  	  type: 'warning'
  		  	});

  		  	console.log(res.data.errorSql)
  		  }

  		  }, (error) => {
  		})
  	},
  	setModule(msg){
  	  this.formJson.ws_module = msg
  	},
  	showTypeFun(msg){
  		this.showResult = {}
  		if(msg == "barChart"){
  			this.showResult = this.barChart
  		}else if(msg == "peiChart"){
  			this.showResult = this.peiChart
  		}else if(msg == "funnelChart"){
  			this.showResult = this.funnelChart
  		}else if(msg == "lineChart"){
  			this.showResult = this.lineChart
  		}else if(msg == "curveChart"){
  			this.showResult = this.curveChart
  		}else if(msg == "totalnumberChart"){
  			this.showResult = this.totalnumberChart
  		}
  	},
  	chartChoose(){
  		this.ws_json.showResult = this.showResult
  		this.chartDialog = false
  	},
  	whereChoose(){
  		this.ws_json.whereField.push({
  			"key": this.KEY,
  			"contact": this.whereField.contact,
  			"field": this.whereField.field,
  			"fieldvalue": this.whereField.fieldvalue,
  			"condition": this.whereField.condition,
  		})
  		this.whereDialog = false
  	},
  	orderChoose(){
  		this.ws_json.orderField.push({
  			"key": this.KEY,
        	"field": this.orderField.field,
        	"order": this.orderField.order,
  		})
  		this.orderDialog = false
  	},
  	formIdFun(msg){
  		this.fieldId = ""
  		this.formJson.ws_form = msg
  		this.getFormFieldListByFormId(msg)

  	},
  	//根据表单结构ID,取得表单所有字段list
  	getFormFieldListByFormId(wff_id){
  	  Vue.http.jsonp(this.URL+"Statistics/getFormFieldListByFormId",{params: { wff_id: wff_id}})
  	     .then((res) => {
  	        this.field = res.data.list
  	     }, (error) => { })
  	},

  	//获取统计方式
  	getMode(){
  	  Vue.http.jsonp(this.URL+"FormWidgets/getCodeDetailById?wc_id=11")
  	     .then((res) => {
  	        this.mode = res.data.list
  	     }, (error) => { })
  	},
  	//获取连接符
  	getContact(){
  	  Vue.http.jsonp(this.URL+"FormWidgets/getCodeDetailById?wc_id=12")
  	     .then((res) => {
  	        this.contact = res.data.list
  	     }, (error) => { })
  	},
  	//获取条件
  	getCondition(){
  	  Vue.http.jsonp(this.URL+"FormWidgets/getCodeDetailById?wc_id=13")
  	     .then((res) => {
  	        this.condition = res.data.list
  	     }, (error) => { })
  	},
  	//获取条件
  	getOrder(){
  	  Vue.http.jsonp(this.URL+"FormWidgets/getCodeDetailById?wc_id=14")
  	     .then((res) => {
  	        this.order = res.data.list
  	     }, (error) => { })
  	},
  	//获取统计图
  	getChart(){
  	  Vue.http.jsonp(this.URL+"FormWidgets/getCodeDetailById?wc_id=15")
  	     .then((res) => {
  	        //this.order = res.data.list
  	        for(let i = 0; i < res.data.list.length; i++){
  	        	if(res.data.list[i].wcd_value == "barChart"){
  	        		this.barChart = JSON.parse(res.data.list[i].wcd_text)
  	        	}else if(res.data.list[i].wcd_value == "peiChart"){
  	        		this.peiChart = JSON.parse(res.data.list[i].wcd_text)
  	        	}else if(res.data.list[i].wcd_value == "funnelChart"){
  	        		this.funnelChart = JSON.parse(res.data.list[i].wcd_text)
  	        	}else if(res.data.list[i].wcd_value == "lineChart"){
  	        		this.lineChart = JSON.parse(res.data.list[i].wcd_text)
  	        	}else if(res.data.list[i].wcd_value == "curveChart"){
  	        		this.curveChart = JSON.parse(res.data.list[i].wcd_text)
  	        	}else if(res.data.list[i].wcd_value == "totalnumberChart"){
  	        		this.totalnumberChart = JSON.parse(res.data.list[i].wcd_text)
  	        	}
  	        	this.showType = res.data.list
  	        }
  	        console.log(this.showType)
  	     }, (error) => { })
  	},

  },
  components:{chooseFormList,moduleList}
}
</script>

<style scoped lang="less">

</style>