<template>
	
	<div>
        <div class="page-title">
            <span>工作流管理</span>
        </div>

        <div class="page-body">
            <div class="search-bar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-button  size="small"  type="primary" @click="dialogCreate = true">新建工作流</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
            <el-table
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%" max-height="550">
                <el-table-column
                    label="名称">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>ID: {{ scope.row.wf_id }}</p>
                        <p>公司ID: {{ scope.row.wf_company }}</p>
                        <p>模块ID: {{ scope.row.wf_module }}</p>
                        <p>分类: {{ scope.row.wf_type }}</p>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.wf_name }}</el-tag>
                        </div>
                      </el-popover>
                    </template>
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
                        @click="dialogEdit = true, edit(scope.row)"
                        size="mini">
                        编辑
                    </el-button>
                    <el-button
                        @click="dialogDetail = true, listNodes(scope.row.wf_id)"
                        size="mini" type="info">
                        节点管理
                    </el-button>
                    <el-button 
                        @click="delWfWorkFlow(scope.row.wf_id)"
                        size="mini" type="danger">
                        删除
                    </el-button>
                    </template>
                </el-table-column>
                
            </el-table>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>

				<el-dialog
            width="80%"
            title="工作流节点管理"
            :visible.sync="dialogDetail">
						<el-form :inline="true">
								<el-form-item>
										<el-button type="primary" @click="dialogNodesCreate = true">新建节点</el-button>
								</el-form-item>
						</el-form>
            <el-table
                :data="nodesData" 
                style="width: 100%" max-height="550">
                <el-table-column
                    prop="wn_id"
                    label="节点ID">
                </el-table-column>
                <el-table-column
                    label="名称">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>节点ID: {{ scope.row.wn_id }}</p>
                        <p>公司ID: {{ scope.row.wn_company }}</p>
                        <p>模块ID: {{ scope.row.wn_module }}</p>
                        <p>序列号: {{ scope.row.wn_step }}</p>
                        <p>节点分类: {{ scope.row.wn_node_type }}</p>
                        <p>节点处理人ID: {{ scope.row.wn_user }}</p>
                        <div slot="reference" class="name-wrapper">
                          <el-tag size="medium">{{ scope.row.wn_name }}</el-tag>
                        </div>
                      </el-popover>
                    </template>
                </el-table-column>
								<el-table-column
                    prop="wn_workflow"
                    label="所属工作流">
                </el-table-column>
								<el-table-column
                    prop="wn_node_true"
                    label="通过节点编号">
                </el-table-column>
								<el-table-column
                    prop="wn_node_false"
                    label="未通过节点编号">
                </el-table-column>
                <el-table-column
                    prop="wn_remarks"
                    label="备注">
                </el-table-column>
								<el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button
                        @click="dialogNodesEdit = true, editN(scope.row)"
                        size="mini">
                        编辑
                    </el-button>
                    <el-button 
                        @click="deleteNode(scope.row.wn_id)"
                        type="danger"
                        size="mini">
                        删除
                    </el-button>
                    </template>
                </el-table-column>
                
                
                
            </el-table>
        </el-dialog>

				<el-dialog
            width="50%"
            title="新建节点"
            :visible.sync="dialogNodesCreate">
            <el-form ref="form" :model="editNodesData" label-width="120px">
                <el-form-item label="名称">
                <el-input v-model="editNodesData.wn_name" style="width:217px;"></el-input>
                </el-form-item>
                <el-form-item label="模块">
                <moduleList @setModule="setModule" style="width:217px;"></moduleList>
                </el-form-item>
								<el-form-item label="序列号">
                <el-input v-model="editNodesData.wn_step" style="width:217px;"></el-input>
                </el-form-item>
								<el-form-item label="节点类型">
                  <el-select v-model="editNodesData.wn_node_type" placeholder="请选择" style="width:217px;">
                    <el-option
                      v-for="item in nodeTypeData"
                      :key="item.wcd_value"
                      :label="item.wcd_text"
                      :value="item.wcd_value">
                    </el-option>
                  </el-select>
                </el-form-item>
								<el-form-item label="节点处理人id">
                <el-input v-model="editNodesData.wn_user" style="width:217px;"></el-input>
                </el-form-item>
								<el-form-item label="通过节点编号">
                <el-select v-model="editNodesData.wn_node_true" placeholder="请选择" style="width:217px;">
                    <el-option
                      v-for="item in nodesData"
                      :key="item.wn_id"
                      :label="item.wn_id"
                      :value="item.wn_id">
                      <span style="float: left">{{ item.wn_id }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.wn_name }}</span>
                    </el-option>
                </el-select>
                
                </el-form-item>
								<el-form-item label="未通过节点编号">
                <el-select v-model="editNodesData.wn_node_false" placeholder="请选择" style="width:217px;">
                    <el-option
                      v-for="item in nodesData"
                      :key="item.wn_id"
                      :label="item.wn_id"
                      :value="item.wn_id">
                      <span style="float: left">{{ item.wn_id }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.wn_name }}</span>
                    </el-option>
                </el-select>
                </el-form-item>
								<el-form-item label="备注">
                <el-input type="textarea" v-model="editNodesData.wn_remarks"></el-input>
                </el-form-item>
								<el-form-item label="执行方法">
                <el-input type="textarea" v-model="editNodesData.wn_node_action"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editNode(0)">立即保存</el-button>
                    <el-button @click="dialogNodesCreate = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

				<el-dialog
            width="50%"
            title="编辑节点"
            :visible.sync="dialogNodesEdit">
            <el-form ref="form" :model="editNodesData" label-width="120px">
                <el-form-item label="名称">
                <el-input v-model="editNodesData.wn_name" style="width:217px;"></el-input>
                </el-form-item>
                <el-form-item label="模块">
                <moduleList @setModule="setModule" :getModuel="editNodesData.wn_module" style="width:217px;"></moduleList>
                </el-form-item>
								<el-form-item label="序列号">
                <el-input v-model="editNodesData.wn_step" style="width:217px;"></el-input>
                </el-form-item>
								<el-form-item label="节点类型">
                  <el-select v-model="editNodesData.wn_node_type" placeholder="请选择" style="width:217px;">
                    <el-option
                      v-for="item in nodeTypeData"
                      :key="item.wcd_value"
                      :label="item.wcd_text"
                      :value="item.wcd_value">
                    </el-option>
                  </el-select>
                </el-form-item>
								<el-form-item label="节点处理人id">
                <el-input v-model="editNodesData.wn_user" style="width:217px;"></el-input>
                </el-form-item>
								<el-form-item label="通过节点编号">
                <el-select v-model="editNodesData.wn_node_true" placeholder="请选择" style="width:217px;">
                    <el-option
                      v-for="item in nodesData"
                      :key="item.wn_id"
                      :label="item.wn_id"
                      :value="item.wn_id">
                      <span style="float: left">{{ item.wn_id }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.wn_name }}</span>
                    </el-option>
                </el-select>
                
                </el-form-item>
								<el-form-item label="未通过节点编号">
                <el-select v-model="editNodesData.wn_node_false" placeholder="请选择" style="width:217px;">
                    <el-option
                      v-for="item in nodesData"
                      :key="item.wn_id"
                      :label="item.wn_id"
                      :value="item.wn_id">
                      <span style="float: left">{{ item.wn_id }}</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.wn_name }}</span>
                    </el-option>
                </el-select>
                </el-form-item>
								<el-form-item label="备注">
                <el-input type="textarea" v-model="editNodesData.wn_remarks"></el-input>
                </el-form-item>
								<el-form-item label="执行方法">
                <el-input type="textarea" v-model="editNodesData.wn_node_action"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editNode(editNodesData.wn_id)">立即保存</el-button>
                    <el-button @click="dialogNodesEdit = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog
            width="40%"
            title="新建工作流"
            :visible.sync="dialogCreate" append-to-body>
            <el-form ref="form" :model="editData" label-width="120px">
                <el-form-item label="名称">
                <el-input v-model="editData.wf_name" style="width:217px;"></el-input>
                </el-form-item>
                <el-form-item label="模块">
                <moduleList @setModule="setModule" style="width:217px;"></moduleList>
                </el-form-item>
                <el-form-item label="是否启用">
                <el-switch v-model="editData.wf_abled" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select v-model="editData.wf_type" placeholder="请选择" style="width:217px;">
                    <el-option
                      v-for="item in workflowNodeTypeData"
                      :key="item.wcd_value"
                      :label="item.wcd_text"
                      :value="item.wcd_value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editWfWorkFlow(0)">立即保存</el-button>
                    <el-button @click="dialogCreate = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


        <el-dialog
            width="40%"
            title="编辑工作流"
            :visible.sync="dialogEdit">
            <el-form ref="form" :model="editData" label-width="120px">
                <el-form-item label="名称">
                <el-input v-model="editData.wf_name" style="width:217px;"></el-input>
                </el-form-item>
                <el-form-item label="模块">
                <moduleList @setModule="setModule" :getModuel="editData.wf_module" style="width:217px;"></moduleList>
                </el-form-item>
                <el-form-item label="是否启用">
                <el-switch v-model="editData.wf_abled" active-value="1" inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select v-model="editData.wf_type" placeholder="请选择" style="width:217px;">
                    <el-option
                      v-for="item in workflowNodeTypeData"
                      :key="item.wcd_value"
                      :label="item.wcd_text"
                      :value="item.wcd_value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editWfWorkFlow(editData.wf_id)">立即保存</el-button>
                    <el-button @click="dialogEdit = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>




        

	</div>
</template>





<script>
import Vue from "vue";
import moduleList from "../../../components/moduleList";
export default {
  name: "dataSource",
  data() {
    return {
      tableData: [],
      editData: {
        wf_abled: "1"
      },
      nodesData: [],
      editNodesData: {},
      wn_workflow: "",

      workflowNodeTypeData: "",
      nodeTypeData: "",
      dialogCreate: false,
      dialogEdit: false,
      dialogDetail: false,
      dialogNodesEdit: false,
      dialogNodesCreate: false,
      total: 0, //默认数据总数
      pagesize: 10, //每页的数据条数
      currentPage: 1 //默认开始页面
    };
  },
  created() {
    this.listWfWorkFlow(0);
    this.workflowNodeType();
    this.nodeType();
  },
  computed: {},
  methods: {
    listNodes(wn_workflow) {
      this.wn_workflow = wn_workflow;
      Vue.http
        .jsonp(this.URL + "Nodes/listNodes", {
          params: { wn_workflow: wn_workflow }
        })
        .then(
          res => {
            this.nodesData = res.data.list;
          },
          error => {}
        );
    },
    editN(row) {
      this.editNodesData = row;
    },
    workflowNodeType() {
      Vue.http
        .jsonp(this.URL + "FormWidgets/getCodeDetailById", {
          params: { wc_id: "18" }
        })
        .then(
          res => {
            this.workflowNodeTypeData = res.data.list;
          },
          error => {}
        );
    },
    nodeType() {
      Vue.http
        .jsonp(this.URL + "FormWidgets/getCodeDetailById", {
          params: { wc_id: "4" }
        })
        .then(
          res => {
            this.nodeTypeData = res.data.list;
            console.log(this.nodeTypeData);
          },
          error => {}
        );
    },
    editNode(wn_id) {
      Vue.http
        .jsonp(this.URL + "Nodes/editNode", {
          params: {
            wn_id: wn_id,
            wn_name: this.editNodesData.wn_name,
            wn_company: this.CID(),
            wn_module: this.editNodesData.wn_module,
            wn_workflow: this.wn_workflow,
            wn_step: this.editNodesData.wn_step,
            wn_node_type: this.editNodesData.wn_node_type,
            wn_user: this.editNodesData.wn_user,
            wn_node_true: this.editNodesData.wn_node_true,
            wn_node_false: this.editNodesData.wn_node_false,
            wn_remarks: this.editNodesData.wn_remarks,
            wn_node_action: this.editNodesData.wn_node_action
          }
        })
        .then(
          res => {
            this.dialogNodesCreate = false;
            this.dialogNodesEdit = false;
            this.listNodes(this.wn_workflow);
          },
          error => {}
        );
    },
    deleteNode(wn_id) {
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Vue.http
          .jsonp(this.URL + "Nodes/deleteNode", {
            params: { wn_id: wn_id }
          })
          .then(
            res => {
              if (res.data.errorCode == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.listNodes(this.wn_workflow);
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              }
            },
            error => {}
          );
      });
    },
    setModule(msg) {
      this.editData.wf_module = msg;
      this.editNodesData.wn_module = msg;
    },
    edit(row) {
      this.editData = row;
    },
    listWfWorkFlow(wf_module) {
      Vue.http
        .jsonp(this.URL + "WorkFlow/listWfWorkFlow", {
          params: { wf_module: wf_module }
        })
        .then(
          res => {
            this.tableData = res.data.list;
            this.total = res.data.list.length;
          },
          error => {}
        );
    },
    editWfWorkFlow(wf_id) {
      Vue.http
        .jsonp(this.URL + "WorkFlow/editWfWorkFlow", {
          params: {
            wf_id: wf_id,
            wf_name: this.editData.wf_name,
            wf_company: this.CID(),
            wf_module: this.editData.wf_module,
            wf_abled: this.editData.wf_abled,
            wf_type: this.editData.wf_type
          }
        })
        .then(
          res => {
            this.dialogCreate = false;
            this.dialogEdit = false;
            this.listWfWorkFlow(0);
          },
          error => {}
        );
    },
    delWfWorkFlow(wf_id) {
      this.$confirm("此操作删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        Vue.http
          .jsonp(this.URL + "WorkFlow/delWfWorkFlow", {
            params: { wf_id: wf_id }
          })
          .then(
            res => {
              if (res.data.errorCode == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.listWfWorkFlow(0);
              } else {
                this.$message({
                  type: "warning",
                  message: "删除失败!"
                });
              }
            },
            error => {}
          );
      });
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    }
  },

  components: { moduleList }
};
</script>

<style scoped lang="less">

</style>