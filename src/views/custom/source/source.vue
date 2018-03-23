<template>
	
	<div>

				
				
					<div class="page-title">
						<span>数据源管理</span>
					</div>

					<div class="page-body">
						<div class="search-bar">
							<el-button type="primary" size="small"  @click="dialogCreate = true">新建数据源</el-button>
						</div>
						
						<el-table
						    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
			    			style="width: 100%" max-height="750">
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
						      <template slot-scope="scope">
						      	{{scope.row.wc_abled === '0' ? '否' : '是'}}
						      </template>
						    </el-table-column>
						   
						    <el-table-column label="操作">
						      <template slot-scope="scope">
						        <el-button
						          @click="dialogEdit = true, getCodeListById(scope.row.wc_id)"
						          size="mini">
						          编辑
						        </el-button>
						        <el-button
						          @click="dialogDetail = true, onDetail(scope.row.wc_id)"
						          type="info"
						          size="mini">
						          明细
						        </el-button>
						        <el-button
						          @click="deleteCodeById(scope.row.wc_id)"
						          type="danger"
						          size="mini">
						          删除
						        </el-button>
						      </template>
						    </el-table-column>
						    
						</el-table>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>

					</div>
			  		<el-dialog
		  		      width="40%"
		  		      title="新增数据源"
		  		      :visible.sync="dialogCreate"
		  		      append-to-body>
		  		      	<pre>{{row}}</pre>
						<el-form ref="form" :model="row" label-width="120px">
						  <el-form-item label="数据源英文名称">
						    <el-input v-model="row.wc_name"></el-input>
						  </el-form-item>
						  <el-form-item label="数据源中文名称">
						    <el-input v-model="row.wc_name_ch"></el-input>
						  </el-form-item>
						  <el-form-item label="是否启用">
						    <el-switch v-model="row.wc_abled" active-value="1" inactive-value="0"></el-switch>
						  </el-form-item>
						  <el-form-item>
						      <el-button type="primary" @click="onSaveEdit(0)">立即保存</el-button>
						      <el-button @click="dialogCreate = false">取消</el-button>
						    </el-form-item>
						</el-form>
		  		    </el-dialog>
	    	  		<el-dialog
	      		      width="40%"
	      		      title="编辑数据源"
	      		      :visible.sync="dialogEdit"
	      		      append-to-body>
	    				<el-form ref="form" :model="row" label-width="120px">
	    				  <el-form-item label="数据源英文名称">
	    				    <el-input v-model="row.wc_name"></el-input>
	    				  </el-form-item>
	    				  <el-form-item label="数据源中文名称">
	    				    <el-input v-model="row.wc_name_ch"></el-input>
	    				  </el-form-item>
	    				  <el-form-item label="是否启用">
	    				    <el-switch v-model="row.wc_abled" active-value="1" inactive-value="0"></el-switch>
	    				  </el-form-item>
	    				  <el-form-item>
	    				      <el-button type="primary" @click="onSaveEdit(row.wc_id)">立即保存</el-button>
	    				      <el-button @click="dialogEdit = false">取消</el-button>
	    				    </el-form-item>
	    				</el-form>
	      		    </el-dialog>
					<el-dialog title="数据源明细" :visible.sync="dialogDetail" width="80%">
						<el-form :inline="true" class="form-inline">
						  	<el-button type="primary" size="small"  @click="dialogCreateDetail = true">新建数据源明细</el-button>
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
				  		      <template slot-scope="scope">
			  		              <el-tag
			  		                :type="scope.row.wcd_is_default === '0' ? 'primary' : 'success'"
			  		                close-transition>{{scope.row.wcd_is_default === '0' ? '否' : '是'}}</el-tag>
			  		          </template>
				  		    </el-table-column>
				  		    <el-table-column
				  		      prop="wcd_abled"
				  		      label="是否可用">
				  		      <template slot-scope="scope">
				  		      	{{scope.row.wcd_abled === '0' ? '否' : '是'}}
				  		      </template>
				  		    </el-table-column>
				  		    <el-table-column label="操作">
				  		      <template slot-scope="scope">
				  		        <el-button
				  		          @click="dialogEditDetail = true, onDetailById(scope.row.wcd_id)"
				  		          type="text"
				  		          size="small">
				  		          编辑
				  		        </el-button>
				  		        <el-button
				  		          @click="onDetailDelete(scope.row.wcd_id, scope.row.wcd_wc_id)"
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
	  		  		      :visible.sync="dialogCreateDetail"
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
	  						      <el-switch v-model="rowDetail.wcd_is_default" active-value="1" inactive-value="0"></el-switch>
	  						  </el-form-item>
	  						  <el-form-item label="是否启用">
	  						      <el-switch v-model="rowDetail.wcd_abled" active-value="1" inactive-value="0"></el-switch>
	  						  </el-form-item>
	  						  <el-form-item>
	  						      <el-button type="primary" @click="onSaveEditDetail(0,rowDetail.wcd_wc_id)">立即保存</el-button>
	  						      <el-button @click="dialogCreateDetail = false">取消</el-button>
	  						    </el-form-item>
	  						</el-form>
	  		  		    </el-dialog>
				  		<el-dialog
			  		      width="60%"
			  		      title="编辑数据源明细"
			  		      :visible.sync="dialogEditDetail"
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
							    <el-switch v-model="rowDetail.wcd_is_default" active-value="1" inactive-value="0"></el-switch>
							  </el-form-item>
							  <el-form-item label="是否启用">
							    <el-switch v-model="rowDetail.wcd_abled" active-value="1" inactive-value="0"></el-switch>
							  </el-form-item>
							  <el-form-item>
							      <el-button type="primary" @click="onSaveEditDetail(rowDetail.wcd_id,rowDetail.wcd_wc_id)">立即保存</el-button>
							      <el-button @click="dialogEditDetail = false">取消</el-button>
							    </el-form-item>
							</el-form>
			  		    </el-dialog>
					</el-dialog>

	</div>
</template>





<script>
import Vue from "vue";

export default {
  name: "dataSource",
  data() {
    return {
      tableData: [],
      tableDetail: [],
      tableEditDetail: [],
      row: {
        wc_id: "",
        wc_name: "",
        wc_name_ch: "",
        wc_abled: "1"
      },
      rowDetail: {
        wcd_id: "",
        wcd_wc_id: "",
        wcd_value: "",
        wcd_text: "",
        wcd_order: "0",
        wcd_is_default: "0",
        wcd_abled: "1"
      },
      dialogCreate: false,
      dialogEdit: false,
      dialogDetail: false,
      dialogEditDetail: false,
      dialogCreateDetail: false,
			total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
    }
  },
  created() {
    this.getCodeList();
  },
  computed: {},
  methods: {
    //数据源列表
    getCodeList() {
      Vue.http.jsonp(this.URL + "FormWidgets/getCodeList").then(
        res => {
          this.tableData = res.data.list
					this.total = res.data.list.length
        },
        error => {}
      );
    },
    //根据数据源ID查询
    getCodeListById(wc_id) {
      Vue.http
        .jsonp(this.URL + "FormWidgets/getCodeList", {
          params: { wc_id: wc_id }
        })
        .then(
          res => {
            this.row = res.data.list[0]
          },
          error => {}
        );
    },
    //编辑数据源保存
    onSaveEdit(wc_id) {
      Vue.http
        .jsonp(this.URL + "FormWidgets/editCode", {
          params: {
            wc_id: wc_id,
            wc_name: this.row.wc_name,
            wc_name_ch: this.row.wc_name_ch,
            wc_abled: this.row.wc_abled
          }
        })
        .then(
          res => {
            if (res.data.errorCode == 1) {
              if (wc_id == 0) {
                this.dialogCreate = false;
              } else {
                this.dialogEdit = false;
              }
              this.getCodeList();
              this.$notify({
                title: "提示",
                message: this.row.wc_name_ch + "保存成功",
                duration: 0,
                type: "success"
              });
            }
          },
          error => {}
        );
    },
    //删除数据源和明细
    deleteCodeById(wc_id) {
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http
            .jsonp(this.URL + "FormWidgets/deleteCodeById", {
              params: { wc_id: wc_id }
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
                this.getCodeList();
              },
              error => {}
            );
        })
        .catch(() => {});
    },
    //数据源明细
    onDetail(wc_id) {
      this.rowDetail.wcd_wc_id = wc_id;
      Vue.http
        .jsonp(this.URL + "FormWidgets/getCodeDetailById", {
          params: { wc_id: wc_id }
        })
        .then(
          res => {
            this.tableDetail = res.data.list;
            console.log(res);
          },
          error => {}
        );
    },
    //根据数据源ID获取明细
    onDetailById(wcd_id) {
      Vue.http
        .jsonp(this.URL + "FormWidgets/getCodeDetailByDetailId", {
          params: { wcd_id: wcd_id }
        })
        .then(
          res => {
            this.rowDetail = res.data.list[0];
          },
          error => {}
        );
    },
    //删除数据源明细
    onDetailDelete(wcd_id, wcd_wc_id) {
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Vue.http
            .jsonp(this.URL + "FormWidgets/deleteCodeDetailByDetailId", {
              params: { wcd_id: wcd_id }
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
                this.onDetail(wcd_wc_id);
              },
              error => {}
            );
        })
        .catch(() => {});
    },
    //编辑数据源明细保存
    onSaveEditDetail(wcd_id, wcd_wc_id) {
      Vue.http
        .jsonp(this.URL + "FormWidgets/editCodeDetail", {
          params: {
            wcd_id: wcd_id,
            wcd_wc_id: wcd_wc_id,
            wcd_value: this.rowDetail.wcd_value,
            wcd_text: this.rowDetail.wcd_text,
            wcd_order: this.rowDetail.wcd_order,
            wcd_is_default: this.rowDetail.wcd_is_default,
            wcd_abled: this.rowDetail.wcd_abled
          }
        })
        .then(
          res => {
            console.log(res);
            //this.tableDetail = res.data.list
            if (res.data.errorCode == 1) {
              if (wcd_id == 0) {
                this.dialogCreateDetail = false;
              } else {
                this.dialogEditDetail = false;
              }
              this.onDetail(wcd_wc_id);
              this.$notify({
                title: "提示",
                message: this.rowDetail.wcd_text + "保存成功",
                duration: 0,
                type: "success"
              });
            }
          },
          error => {}
        );
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