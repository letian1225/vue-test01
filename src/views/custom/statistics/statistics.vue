<template>
	
	<div>
		
					<div class="page-title">
						<span>统计管理</span>
					</div>
					<div class="page-body">
						<el-form :inline="true" class="form-inline">
						  	<el-button type="primary" size="small"  @click="onEdit(0)">新建统计</el-button>
						</el-form>
						<el-table
						    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
						    style="width: 100%" max-height="750">
						    <el-table-column  type="expand">
						    	<template slot-scope="props">
				    	        <el-form label-position="left" inline class="table-expand" label-width="120px">
				    	          <el-form-item label="统计字段：">
				    	            <span>{{props.row.ws_json.statisticsField}}</span>
				    	          </el-form-item>
				    	          <el-form-item label="统计方式：">
				    	            <span>{{props.row.ws_json.statisticsType}}</span>
				    	          </el-form-item>
				    	          <el-form-item label="显示字段：">
				    	          	<span>{{props.row.ws_json.showField}}</span>
				    	          </el-form-item>
				    	          <el-form-item label="筛选条件：">
				    	          		<div class="dl-layout">
				    	          			<dl>
				    	          				<dd v-for="(item,key) in props.row.ws_json.whereField[0]" :key="key">{{key}}</dd>
				    	          			</dl>
				    	          			<dl v-for="(value, index) in props.row.ws_json.whereField" :key="index">
																<dt v-for="(item, key) in value" :key="key">{{item}}</dt>
															</dl>
				    	          		</div>
				    	          </el-form-item>
				    	          <el-form-item label="分组条件：">
				    	            <span>{{props.row.ws_json.groupField}}</span>
				    	          </el-form-item>
				    	          <el-form-item label="排序条件：">
				    	            <div class="dl-layout">
				    	            	<dl>
				    	            		<dd v-for="(item,key) in props.row.ws_json.orderField[0]" :key="key">{{key}}</dd>
				    	            	</dl>
				    	            	<dl v-for="(value, index) in props.row.ws_json.orderField" :key="index">
															<dt v-for="(item, key) in value" :key="key">{{item}}</dt>
														</dl>
				    	            </div>
				    	          </el-form-item>
				    	        </el-form>
				    	      </template>
						    </el-table-column>
						    <el-table-column 
						      prop="ws_id"
						      label="ID">
						    </el-table-column>
						    <el-table-column
						      prop="ws_name"
						      label="英文名称">
						    </el-table-column>
						    <el-table-column
						      prop="ws_name_ch"
						      label="中文名称">
						    </el-table-column>
						    <el-table-column
						      prop="ws_company"
						      label="公司ID">
						    </el-table-column>
						    <el-table-column
						      prop="ws_module"
						      label="模块ID">
						    </el-table-column>
						    <el-table-column
						      prop="ws_form"
						      label="表单ID">
						    </el-table-column>
						    <el-table-column
						      prop="ws_abled"
						      label="状态">
						      <template slot-scope="scope">
						      	{{scope.row.ws_abled == 1 ? "启用" : "禁用"}}
						      </template>
						    </el-table-column>
						    <el-table-column
						      prop="ws_create_time"
						      label="创建时间">
						    </el-table-column>
						    <el-table-column
						      prop="ws_create_userid"
						      label="创建用户ID">
						    </el-table-column>
						    <el-table-column label="操作"  width="120">
						      <template slot-scope="scope">
						        <el-button
						          size="mini" @click="dialogEdit = true, onEdit(scope.row.ws_id)">
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
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
					</div>

	</div>
</template>




<script>
import Vue from "vue";

export default {
  name: "list",
  data() {
    return {
      tableData: [],
			total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
    };
  },
  created() {
    this.listWfStatistics();
  },
  computed: {},
  filters: {},
  methods: {
    listWfStatistics() {
      Vue.http
        .jsonp(this.URL + "Statistics/listWfStatistics?ws_company=0")
        .then(
          res => {
            this.tableData = res.data.list;
						this.total = res.data.list.length
            for (var i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].ws_json !== "undefined") {
                this.tableData[i].ws_json = JSON.parse(
                  this.tableData[i].ws_json
                );
              }
            }
          },
          error => {}
        );
    },
    onDelete(wm_id) {},
    onEdit(ws_id) {
      this.$router.push({
        path: "/custom/statistics/edit",
        query: { ws_id: ws_id }
      });
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
.table-expand {
  font-size: 0;
  padding: 20px 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  width: 100%;
}
.table-expand .dl-layout {
  border-bottom: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
  width: 100%;
  display: table;
  dl {
    margin: 0;
    background-color: #fff;
    display: table-row;
  }
  dd {
    font-weight: bold;
    text-align: center;
    display: table-cell;
    margin: 0;
    padding: 3px 25px;
    border-left: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
    background-color: #f2f2f2;
  }
  dt {
    text-align: center;
    margin: 0;
    display: table-cell;
    padding: 3px 25px;
    border-left: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
  }
}
.k-panel {
  border: 1px solid #e6e6e6;
  .k-hd {
    width: 100%;
    text-align: center;
    font-weight: bold;
    padding: 5px 0;
    border-bottom: 1px solid #e6e6e6;
    background-color: #f2f2f2;
  }
  .k-bd {
    width: 100%;
    height: 300px;
    overflow: auto;
    ul {
      width: 100%;
      float: left;
      padding: 0;
      margin: 0;
      li {
        width: 100%;
        padding: 10px;
        border-bottom: 1px solid #eee;
        float: left;
        box-sizing: border-box;
      }
    }
  }
}
</style>