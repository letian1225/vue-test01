<template>
	
	<div>
        <div class="page-title">
            <span>工作流管理</span>
        </div>

        <div class="page-body">
            <div class="search-bar">
                <el-form :inline="true">
                    <el-form-item label="选择模块：">
                        <moduleList @setModule="setModule"></moduleList>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="dialogCreate = true">新建工作流</el-button>
                    </el-form-item>
                </el-form>
            </div>
            
            <el-table
                :data="tableData" border
                style="width: 100%" max-height="550">
                <el-table-column
                    prop="wf_id"
                    label="ID">
                </el-table-column>
                <el-table-column
                    prop="wf_name"
                    label="名称">
                </el-table-column>
                <el-table-column
                    prop="wf_company"
                    label="公司ID">
                </el-table-column>
                <el-table-column
                    prop="wf_module"
                    label="模块ID">
                </el-table-column>
                <el-table-column
                    prop="wf_type"
                    label="分类">
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
                        type="text"
                        size="small">
                        编辑
                    </el-button>
                    <el-button
                        @click="dialogDetail = true"
                        type="text"
                        size="small">
                        详细
                    </el-button>
                    <el-button
                        
                        type="text"
                        size="small">
                        删除
                    </el-button>
                    </template>
                </el-table-column>
                
            </el-table>
        </div>

        <el-dialog
            width="40%"
            title="新建工作流"
            :visible.sync="dialogCreate"
            append-to-body>
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
                <el-input v-model="editData.wf_type" style="width:217px;"></el-input>
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
            :visible.sync="dialogEdit"
            append-to-body>
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
                <el-input v-model="editData.wf_type" style="width:217px;"></el-input>
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
      dialogCreate: false,
      dialogEdit: false,
      dialogDetail: false,
      dialogEditDetail: false,
      dialogCreateDetail: false
    };
  },
  created() {},
  computed: {},
  methods: {
    setModule(msg) {
      this.listWfWorkFlow(msg);
      this.editData.wf_module = msg;
    },
    edit(row) {
			this.editData = row
			console.log(row)
		},
    listWfWorkFlow(wf_module) {
      Vue.http
        .jsonp(this.URL + "WorkFlow/listWfWorkFlow", {
          params: { wf_module: wf_module }
        })
        .then(
          res => {
            this.tableData = res.data.list;
            console.log(res);
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
						this.dialogCreate = false
						this.dialogEdit = false
          },
          error => {}
        );
    }
  },
  components: { moduleList }
};
</script>

<style scoped lang="less">

</style>