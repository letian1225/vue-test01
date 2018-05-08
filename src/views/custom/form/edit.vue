<template>
  <div>

    <div class="form-header">
      <el-button-group>
        <el-button icon="fa fa-arrow-circle-o-left" onclick="window.history.go(-1)"> 返回</el-button>
        <el-button icon="fa fa-save" @click="dialogCreateFormVisible = true"> 保存表单</el-button>
        <el-button icon="fa fa-remove" @click="empty"> 清空控件</el-button>
        <el-button icon="fa fa-code" @click="dialogConsoleVisible = true"> 控制台</el-button>
      </el-button-group>
    </div>

    <el-dialog title="保存表单"  :visible.sync="dialogCreateFormVisible" width="400px">
      <el-form ref="form" :model="formJson" label-width="100px">
        <el-form-item label="表单名称">
          <el-input v-model="formJson.wff_name" style="width:192px;"></el-input>
        </el-form-item>
        <el-form-item label="归属工作流" v-show="workflowDisplay">
          <el-select v-model="formJson.wff_workflow" placeholder="请选择">
            <el-option v-for="item in workflowData" :key="item.wf_id" :label="item.wf_name" :value="item.wf_id">
              <span style="float: left;">{{ item.wf_name }}</span>
              <span style="float: right;">{{ item.wf_id }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch v-model="formJson.wff_abled" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onCreateFormSubmit">立即保存</el-button>
          <el-button size="small" @click="dialogCreateFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="控制台" :visible.sync="dialogConsoleVisible">
      <pre><code class="json">{{formJson}}</code></pre>
    </el-dialog>

    <div class="controls-list">
      <h3>控件库</h3>
      <vddl-list :list="controls" :allowed-types="controls">
        <vddl-draggable v-for="(item, index) in controls" :key="item.wfw_id" :draggable="item" :wrapper="controls" :index="index" :copied="copied" effect-allowed="copy">

          <i :class="item.wfw_icon"></i>
          <span>{{item.wfw_name_ch}}</span>

        </vddl-draggable>
      </vddl-list>
    </div>

    <div class="design">

      <div class="forms">
        <div class="forms-header">
          <i class=""></i>
          <span>{{formJson.wff_name}}</span>
          <em>提交</em>
        </div>
        <vddl-list class="forms-list" :list="formJson.wff_json" :external-sources="true" :inserted="inserted">
          <vddl-draggable v-for="(list, index) in formJson.wff_json" :key="list.uid" :draggable="list" :wrapper="formJson.wff_json" :index="index" :selected="selectedEvent" v-bind:class="{'selected': selected === list}" effect-allowed="move">

            <div class="form-row">
              <label v-show="list.wfw_name != 'textArea' && list.wfw_name != 'image'">{{list.wfw_attr[0].labelName == "" ? list.wfw_name_ch + "Label" : list.wfw_attr[0].labelName}}</label>
              <span v-if="list.wfw_name == 'departmenttree'" class="text-left">请选择部门</span>
              <span v-else-if="list.wfw_name == 'contact'" class="text-left">请选择人员</span>
              <span v-else-if="list.wfw_name == 'map'" class="ipt-map">请选择位置</span>
              <span v-else-if="list.wfw_name == 'timePicker'" class="ipt-base">请选择时间</span>
              <span v-else-if="list.wfw_name == 'areaPicker'" class="ipt-base">请选择地区</span>
              <span v-else-if="list.wfw_name == 'fileUpload'" class="ipt-file-upload"></span>
              <span v-else-if="list.wfw_name == 'inputFiled'" class="text-left">请输入内容</span>
              <span v-else-if="list.wfw_name == 'textArea'" class="ipt-text-area">请输入内容</span>
              <span v-else-if="list.wfw_name == 'numberFiled'" class="text-left">请输入数值</span>
              <span v-else-if="list.wfw_name == 'radio'" class="ipt-base">请选择</span>
              <span v-else-if="list.wfw_name == 'checkbox'" class="ipt-base">请选择</span>
              <span v-else-if="list.wfw_name == 'image'" class="ipt-image">
                <h3>{{list.wfw_attr[0].labelName == "" ? list.wfw_name_ch + "Label" : list.wfw_attr[0].labelName}}</h3>
                <em></em>
              </span>
              <span v-else-if="list.wfw_name == 'freeTree'" class="ipt-base">请选择</span>
              <span v-else-if="list.wfw_name == 'switch'" class="ipt-switch"></span>
              <span v-else>{{list.wfw_name_ch}}</span>
            </div>

          </vddl-draggable>
          <vddl-placeholder class="placeholder">

          </vddl-placeholder>
        </vddl-list>
        <vddl-list :list="[]" class="drag-remove">
          <i class="fa fa-trash"></i>
          <p>拖到此处删除控件</p>
          <vddl-placeholder class="placeholder">
            <i class="fa fa-trash-o"></i>
          </vddl-placeholder>
        </vddl-list>
      </div>

      <div class="attribute">
        <h3>属性面板</h3>
        <div v-if="attribute !== ''">
          <h4>基本信息</h4>
          <div class="attr-item">
            <label>ID</label>
            <span class="readonly-text">{{attribute.wfw_id}}</span>
          </div>
          <div class="attr-item">
            <label>英文名</label>
            <span class="readonly-text">{{attribute.wfw_name}}</span>
          </div>
          <div class="attr-item">
            <label>中文名</label>
            <span class="readonly-text warn">{{attribute.wfw_name_ch}}</span>
          </div>
          <h4>属性信息</h4>
          <div class="attr-item">
            <label>显示名称</label>
            <div class="edit-text">
              <input type="text" v-model="attribute.wfw_attr[0].labelName" placeholder="">
            </div>
          </div>
          <div class="attr-item">
            <label>控件NAME</label>
            <div class="edit-text">
              <input type="text" v-model="attribute.wfw_attr[0].name" placeholder="">
            </div>
          </div>
          <div class="attr-item">
            <label>值最大长度</label>
            <div class="edit-text">
              <input type="number" v-model="attribute.wfw_attr[0].maxSize" placeholder="">
            </div>
          </div>
          <div class="attr-item" v-if="attribute.wfw_attr[0].placeholder != null">
            <label>默认显示文字</label>
            <div class="edit-text">
              <input type="text" v-model="attribute.wfw_attr[0].placeholder" placeholder="">
            </div>
          </div>
          <div class="attr-item" v-if="attribute.wfw_attr[0].dataType != null">
            <label>值数据类型</label>
            <div class="edit-text">
              <input type="text" v-model="attribute.wfw_attr[0].dataType" placeholder="">
            </div>
          </div>
          <div class="attr-item" v-if="attribute.wfw_attr[0].dataSource != null">
            <label>数据源</label>
            <div class="edit-text">
              <input type="text" v-model="attribute.wfw_attr[0].dataSource" placeholder="" readonly>
              <a href="javascript:;" @click="dialogDataSourceVisible = true">添加数据源</a>
            </div>
          </div>
          <div class="attr-item" v-if="attribute.wfw_attr[0].isMustInput != null">
            <label>是否必填</label>
            <div class="edit-text">
              <div class="radio">
                <input type="radio" v-model="attribute.wfw_attr[0].isMustInput" name="isMustInput" value="true">
                <span>是</span>
              </div>
              <div class="radio">
                <input type="radio" v-model="attribute.wfw_attr[0].isMustInput" name="isMustInput" value="false">
                <span>否</span>
              </div>
            </div>
          </div>
          <div class="attr-item" v-if="attribute.wfw_attr[0].readOnly != null">
            <label>是否可编辑</label>
            <div class="edit-text">
              <div class="radio">
                <input type="radio" v-model="attribute.wfw_attr[0].readOnly" name="readOnly" value="true">
                <span>是</span>
              </div>
              <div class="radio">
                <input type="radio" v-model="attribute.wfw_attr[0].readOnly" name="readOnly" value="false">
                <span>否</span>
              </div>
            </div>
          </div>
          <div class="attr-item">
            <label>是否隐藏</label>
            <div class="edit-text">
              <div class="radio">
                <input type="radio" v-model="attribute.wfw_attr[0].display" name="display" value="false">
                <span>显示</span>
              </div>
              <div class="radio">
                <input type="radio" v-model="attribute.wfw_attr[0].display" name="display" value="true">
                <span>隐藏</span>
              </div>
            </div>
          </div>

          <div class="attr-item" v-if="attribute.wfw_attr[0].type != null">
            <label>类型</label>
            <div class="edit-text">
              <div v-for="item in attribute.wfw_attr[0].type" :key="item.type_id" class="radio">
                <input type="radio" v-model="attribute.wfw_attr[0].type_selected" name="type" :value="item.type_id" :id="item.type_name">
                <span>{{item.type_name_ch}}</span>
              </div>
            </div>
          </div>

          <div class="attr-item" v-if="attribute.wfw_attr[0].option != null">
            <label>OPTION</label>
            <div class="edit-text">
              <div v-for="(item,index) in attribute.wfw_attr[0].option" :key="index" class="option">
                <input type="text" v-model="item.value" placeholder="value">
                <input type="text" v-model="item.text" placeholder="text">
                <a href="javascript:;" v-on:click="attribute.wfw_attr[0].option.splice(index, 1)">删除</a>
              </div>
              <a href="javascript:;" v-on:click="attribute.wfw_attr[0].option.push({'value':'','text':''})">增加一条</a>
            </div>
          </div>

        </div>

      </div>

      <el-dialog title="选择数据源" :visible.sync="dialogDataSourceVisible">
        <el-table :data="dataSourceData" style="width: 100%" max-height="550">
          <el-table-column prop="wc_id" label="ID">
          </el-table-column>
          <el-table-column prop="wc_name" label="数据源英文名称">
          </el-table-column>
          <el-table-column prop="wc_name_ch" label="数据源名称">
          </el-table-column>
          <el-table-column prop="wc_abled" label="是否启用">
            <template slot-scope="scope">
              {{scope.row.wc_abled === '0' ? '否' : '是'}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="dialogDataSourceVisible = false, selectDataSourceData(scope.row.wc_id)">
                选择
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </el-dialog>

    </div>

  </div>
</template>




<script>
import Vue from "vue";
import Vddl from "vddl";
import moduleList from "../../../components/moduleList";

Vue.use(Vddl);

export default {
  name: "",
  data() {
    return {
      controls: [],
      attribute: "",
      selected: "",
      dialogSaveVisible: false,
      dialogCreateVisible: false,
      dialogConsoleVisible: false,
      dialogDataSourceVisible: false,
      dataSourceData: [],
      dialogCreateFormVisible: false,
      formJson: {
        wff_name: "",
        wff_company: "",
        wff_module: "",
        wff_workflow: "",
        wff_abled: "1",
        wff_json: []
      },
      workflowDisplay:false,
      workflowData: []
    };
  },
  computed: {},
  created() {
    this.listWfFormWidgets();
    this.listWfForms();
    this.getCodeList();
    this.listWfWorkFlow();

    console.log(this.$route.module_id);
    //if(this.$route.module_id == undefined)
  },
  methods: {
    empty() {
      this.formJson.wff_json = [];
    },
    listWfWorkFlow() {
      Vue.http
        .jsonp(this.URL + "WorkFlow/listWfWorkFlow", {
          params: { wf_module: this.$route.query.module_id }
        })
        .then(
          res => {
            console.log(res);
            if(res.data.errorCode == 1){
              this.workflowData = res.data.list;
              this.workflowDisplay = true;
            }else{
              this.workflowDisplay = false;
            }
          },
          error => {}
        );
    },
    //数据源列表
    getCodeList() {
      Vue.http.jsonp(this.URL + "FormWidgets/getCodeList").then(
        res => {
          this.dataSourceData = res.data.list;
        },
        error => {}
      );
    },
    selectDataSourceData(id) {
      this.attribute.wfw_attr[0].dataSource = id;
    },
    onCreateFormSubmit() {
      let wff_id = this.$route.query.wff_id;
      if (wff_id !== undefined) {
        if (wff_id == 0) {
          //新建
          this.editWfForms(0);
        } else {
          //编辑
          this.editWfForms(wff_id);
        }
      }
    },
    //根据表单ID取得指定的表单数据
    listWfForms() {
      let wff_id = this.$route.query.wff_id;
      if (wff_id !== undefined) {
        if (wff_id == 0) {
          //新建
        } else {
          //编辑
          this.getWfFormByID(wff_id);
          Vue.http
            .jsonp(this.URL + "Forms/listWfForms", {
              params: { wff_id: wff_id }
            })
            .then(
              res => {
                //console.log(res.data.list)
              },
              error => {}
            );
        }
      }
    },
    //根据表单结构ID取得指定的表单结构
    getWfFormByID(wff_id) {
      Vue.http
        .jsonp(this.URL + "Forms/getWfFormByID", { params: { wff_id: wff_id } })
        .then(
          res => {
            this.formJson.wff_name = res.data.list[0].wff_name;
            this.formJson.wff_company = this.$route.query.company_id;
            this.formJson.wff_module = this.$route.query.module_id;
            this.formJson.wff_workflow = res.data.list[0].wff_workflow;
            this.formJson.wff_node = res.data.list[0].wff_node;
            if (res.data.list[0].wff_json != null) {
              this.formJson.wff_json = res.data.list[0].wff_json;
            }
          },
          error => {}
        );
    },
    //控件列表
    listWfFormWidgets() {
      Vue.http.jsonp(this.URL + "FormWidgets/listWfFormWidgets").then(
        res => {
          this.controls = res.data.list;
        },
        error => {}
      );
    },
    //编辑、新建表单
    editWfForms(wff_id) {
      Vue.http
        .post(
          this.URL + "Forms/editWfForms",
          {
            wff_id: wff_id,
            wff_name: this.formJson.wff_name,
            wff_company: this.$route.query.company_id,
            wff_module: this.$route.query.module_id,
            wff_node: this.formJson.wff_node,
            wff_workflow: this.formJson.wff_workflow,
            wff_abled: this.formJson.wff_abled,
            wff_json: JSON.stringify(this.formJson.wff_json)
          },
          { emulateJSON: true }
        )
        .then(
          res => {
            if (res.data.errorCode == 1) {
              this.dialogCreateFormVisible = false;
              this.$notify({
                title: "提示",
                message: this.formJson.wff_name + "保存成功",
                duration: 0,
                type: "success"
              });
              window.history.go(-1);
            } else {
              this.dialogCreateFormVisible = false;
              this.$message({
                message: "保存失败，请联系管理员！",
                type: "error"
              });
            }
          },
          error => {}
        );
    },
    selectedEvent(person) {
      this.attribute = person;
      this.selected = person;
    },
    createUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    inserted(data) {
      data.item.uid = this.createUID();
    },
    copied() {}
  },
  components: { moduleList }
};
</script>

<style scoped lang="less">
.clearfix {
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  &:before {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.form-header {
  height: 60px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f2f2f2;
  padding: 8px 10px;
  box-sizing: border-box;
  z-index: 1001;
}
.controls-list {
  width: 300px;
  height: calc(~"100% - 60px");
  position: fixed;
  left: 0;
  top: 60px;
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
  h3 {
    font-size: 16px;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    font-weight: normal;
    margin: 0;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    color: #333;
  }
  .vddl-list {
    width: 100%;
    .vddl-draggable {
      width: 33.333%;
      height: 102px;
      cursor: move;
      display: inline-block;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #e6e6e6;
      &:nth-of-type(1),
      &:nth-of-type(4),
      &:nth-of-type(7),
      &:nth-of-type(10),
      &:nth-of-type(13),
      &:nth-of-type(16),
      &:nth-of-type(19),
      &:nth-of-type(22) {
        border-right: 1px solid #e6e6e6;
      }
      &:nth-of-type(2),
      &:nth-of-type(5),
      &:nth-of-type(8),
      &:nth-of-type(11),
      &:nth-of-type(14),
      &:nth-of-type(17),
      &:nth-of-type(20),
      &:nth-of-type(23),
      &:nth-of-type(26) {
        border-right: 1px solid #e6e6e6;
      }
      i {
        font-size: 20px;
        color: #333;
        margin-top: 10px;
      }
      span {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        color: #333;
      }
      &:hover {
        background-color: #e6e6e6;
        box-shadow: 0 0 5px #e6e6e6;
        transition: all 0.5s ease;
      }
    }
  }
}
.design {
  .drag-remove {
    position: fixed;
    width: 120px;
    height: 120px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #e6e6e6;
    background-color: #f2f2f2;
    right: 520px;
    bottom: 20px;
    i {
      font-size: 72px;
      color: #999;
      margin-top: 10px;
    }
    p {
      font-size: 12px;
      color: #999;
      position: relative;
      z-index: 1;
    }
    .placeholder {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #fff;
      margin: 0;
      border-radius: 5px;
    }
  }
}

.forms {
  width: calc(~"100% - 800px");
  height: calc(~"100% - 60px");
  position: fixed;
  left: 300px;
  top: 60px;
  overflow: auto;
  background-color: #fff;
  webkit-user-select: none;
  .forms-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #f9f9f9;
    color: #2d2d2d;
    i {
      display: inline-block;
      float: left;
      width: 50px;
      height: 50px;
      background: no-repeat center
        url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAA1CAYAAAC9bOBUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAHqSURBVFiFvdgxTsMwGIbhty0ziphQNi6AAJ+AjbFHKAz/MRA3QKxeqNg4BeIAEREXAC4AHdnKULukbto4ju1/ShQrT744ceyMlsslsUtrjYist4Ej4AU4BM4PMoKnwBIoxpnBmYh8RkM9wSeAKGgLeAG8uaA5xuA+3qhah2ydto0gjq0bb6ghyda6baxch4k90rhglzqw6i3gbl3q2ganmglci6ycyccw2af+A5ci8h4CQkvS1OAWmgPcQHOBazQnCDApyzIrCDCys8FcIDRuby4QzO3NCcIq6XkD/EkNWnRqQIAHEXlPIjnoPVCb/Tut9QxARGxfx0dFZAFcNuDH1PDYnDwrPCnLEqUUSqnfqqqegSvgGJhWVfWllKqVUmitUUpFQcfNJLkSb4xIjeGwAD6AwrS7FpG52y601l8ZJ4lNvDD7UROP3JW4k/iM1cBR2AsRkdpt17e2Zg5OH9f8Jy6AF3MhgxK3TsxSwztngynhvfPeVHDnDD8F7LWWiQ17r9piwlvvaVe1vMdv5pD3e9x7Je4kqYFrs+2duhdsw07igfbodi2ae/PxaE0c/HfF6eM524kLt91gtAM+2wcp/k0XAgf3qVt7+rhm9VTbz2ScH5Lgnzgq2geOinrAt0lQCzdqDtyY7VeAP/VZOynlbD9MAAAAAElFTkSuQmCC);
      background-size: 10px;
    }
    span {
      display: inline-block;
      width: calc(~"100% - 120px");
      height: 50px;
      line-height: 50px;
      float: left;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    em {
      display: inline-block;
      float: right;
      width: 70px;
      height: 50px;
      text-align: center;
      font-style: normal;
    }
  }
  .forms-list {
    width: 100%;
    min-height: 700px;
    .clearfix;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
    .vddl-draggable {
      width: 100%;
      padding: 0;
      box-sizing: border-box;
      .clearfix;
      &.selected {
        background-color: #f2f2f2;
      }
      .form-row {
        border-bottom: 1px solid #e6e6e6;
        .clearfix;
        label {
          width: 250px;
          height: 50px;
          line-height: 50px;
          padding: 0 20px;
          color: #2d2d2d;
          box-sizing: border-box;
          float: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          width: calc(~"100% - 250px");
          color: #999;
          height: 50px;
          line-height: 50px;
          padding: 0 20px;
          position: relative;
          box-sizing: border-box;
          float: left;
          display: inline-block;
          &.ipt-map {
            text-align: right;
            padding: 0 50px 0 0;
            background: 15px center
              url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAJwSURBVGiB7ZrNkdowGIYfZXIP6YASSAVhK8hqZ5wzVJBQQZYKFioIdx1EKlingpAK4hLcgXKwSAzYki0J1rPj5wSW9Fmvpe9HBmGM4TXw5qUnkIpRyNAYhQyNUcjQeDVC3vYdIITw9jGZnAFTYFa7nAOFULrwjg9I0qLvoDYhJpNT4AtwTyWijQOwBfZC6bLR1ksJMZl8pBIx6WGqAFZC6f2FvVsLMZmcABqY977zfzZC6VX9wk2FWBHPnPpBKDuh9PL4JURITNT6ThoRAAuTya8xBoJWxGTynmpLpaQEPgili5AV6R1+LU8d+uyB3/bzO/zRbAJ8A5aOPq30XhE+P8yAX44eJSCF0nn9ovWpJ2DhGiuUfn8rH7n3tN+diwAQSpfWoS/CbY2JyeQ8YE5BQj462nZC6YNn/MrTPu83nYrUtdYPXwdbovjE9ia1kMaSI6JfZ0KEuCbxyTfYOv080H4rIUJ+OtoWdqIufIkv7zedihAhzqgDPLeJMZlcUOWKNooOwaKR0MyucYfhgqpUP9jPM6ptt/CYXwmlN7fM7FvcQqZ0y/51SmAXOJ+wqGUTXh560xa2bQetLsSE33XE2HNKYBNjIFhI4lWJWg2IT4hBleoZhVD6MdZIlBBbbsRusRQPI9nLhz+4zxptnbxx/9m78vg3tshtlffxwp1jisq6ft+os4x18Dopq981VRbvwq7pfVYMyYTYpys7dC1IuKWOJD2P2ILPF8WSbqkjyd/G25yQtzSvm87zKbjWzwqSywNSniLxtXEVIQ3+0tv/grnaDz12Cx2d+u4afnFyv/GfDwNjFDI0RiFDYxQyNP4CwbDb3INT9uAAAAAASUVORK5CYII=)
              no-repeat;
            background-size: 30px;
            &:after {
              content: "";
              position: absolute;
              right: 0;
              top: 0;
              height: 100%;
              width: 50px;
              background: no-repeat center
                url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ1JREFUeNrE1tEJwkAMBuAS+q4jOEJXcANHaJ/63AnsBvrapzqCGxQ3qJs4gv/BPUhBMLn8JhCOQgMfues1dfVjTNPUYDkju77vXxUpRPHuAXlCLsDtw0Hoyh3LgGyYKE2HEuqK5cZEibYAqI6JEksREyXWQhZKSoo3qEs4aINq0aU5HOSNEq/D6IUSz0/WA+UK8kC5g3KkX8xqQVFAeRo4WlCsDplRNJAVRQV9QY2hoA/Umh934aC8VW26DoAbQkEbTBd6hrQYKsiCoYGsGAqoBJOidoSkEXbJ06MJ49YhL4wLyBNTDPLGFIEYGDOIhTGBmBg1iI1Rgf6B0XZoZmO0N/UD+QRmZE4IbwEGAEJ/rem8k7uWAAAAAElFTkSuQmCC);
              background-size: 15px;
            }
          }
          &.ipt-base {
            text-align: right;
            padding: 0 50px 0 0;
            &:after {
              content: "";
              position: absolute;
              right: 0;
              top: 0;
              height: 100%;
              width: 50px;
              background: no-repeat center
                url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ1JREFUeNrE1tEJwkAMBuAS+q4jOEJXcANHaJ/63AnsBvrapzqCGxQ3qJs4gv/BPUhBMLn8JhCOQgMfues1dfVjTNPUYDkju77vXxUpRPHuAXlCLsDtw0Hoyh3LgGyYKE2HEuqK5cZEibYAqI6JEksREyXWQhZKSoo3qEs4aINq0aU5HOSNEq/D6IUSz0/WA+UK8kC5g3KkX8xqQVFAeRo4WlCsDplRNJAVRQV9QY2hoA/Umh934aC8VW26DoAbQkEbTBd6hrQYKsiCoYGsGAqoBJOidoSkEXbJ06MJ49YhL4wLyBNTDPLGFIEYGDOIhTGBmBg1iI1Rgf6B0XZoZmO0N/UD+QRmZE4IbwEGAEJ/rem8k7uWAAAAAElFTkSuQmCC);
              background-size: 15px;
            }
          }
          &.ipt-file-upload {
            text-align: right;
            padding: 0 50px 0 0;
            background: right center
              url(data:image/png;base64,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)
              no-repeat;
            background-size: 40px;
            &:after {
              content: "";
            }
          }
          &.ipt-text-area {
            width: 100%;
            height: 152px;
          }
          &.ipt-image {
            width: 100%;
            height: 152px;
            line-height: normal;
            h3 {
              font-size: 14px;
              font-weight: normal;
              color: #333;
              margin: 10px 0;
            }
            em {
              width: 100px;
              height: 100px;
              border: 1px solid #e6e6e6;
              display: block;
              background: #fff center no-repeat
                url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAzCAYAAAAn3w6xAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMS8xNC8xOB1o60AAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzbovLKMAAAC1UlEQVRoge1b3XXyMAxVOF1CGcNhCydb9DAUp1M0ZIomHiMeI98DmFJHJoCvQjn97ktfQLWu9S9TTNNESAx9Pw3OQWUGVMZQtd0WSJkFkoBD206j9zB5Kex2OxgJG5Sgoe9XUZ7oSDRKFo4AJbOXgCQa4gIp0y+ZiZmz5afIRbgChID9fj8T0lgLUT7g0HWzmy+ZqW6aLBKyXUBSvjIGqnyQGQPhCg9bQCrdlcxUW5t7Lvl/Oie6Q44l/CAAkcPRph9j//GR9f2YrLMLHNo2W3lU0LuGJtO6Ru9/uO2GCFfAaJn+JZiZSgDJgYQNooApmbNv5h7U1kJIGPp+KtrPzxkBJbNKJH8mUgH0TcytK9xmfBjt+FEZQ977Wep8iz+odQjvPQ3OJXP3cPobiJDyfi6YeZkANJYUjzGebmlw7tj+KhBxCVUCpPL1HgzOkfdeNR7BusEYucoHjN5T23XklVptFQu4pnzKx0NQTBVjbdepVJlwAlL+vpRaAyGVMUkCB+fgGQrqAiHgxQip9dbbq60VC6sxIT8HUAKQ3WEqFf5qAiSzzTHZyhix5EWSoDoTRORwSQYyI8AIkA6FIEDq/pBDURgBUk+BgmaPoFYIIQ+tGQfUCEDiJS0ACc2lixoBWrV7AKpLhBEQHwgZqTXJVHUBhOlKUxxkhlGzAKLvfj4HEonIoAi1AHTtnuoKkVMidQJG7+nwwEAjpTx6/A6PAak2tu26m6zBnwjTXLdfAj4QCbV7aqARhp1E3wotTYPCZzXG9Sojsdraq2Oxs8I3ytPcVailwdRU515oL2pUx+LMTLv39+Ra6hrWWs+pL0aI6LzgCHXB0sR4jTV7wCoEBGhveR7BS3SDmvhPwLMP8GzMCFjzxefakMrxov/6Eh9H/caAlYNU9immaRIfO/4FVMYcXQA5YHgVlMxUbbfFhoiobpriL5Fw+Vhy9lRW8xcfz4b0i5N/5a6zby0Hi5MAAAAASUVORK5CYII=);
            }
          }
          &.ipt-switch {
            text-align: right;
            padding: 0 50px 0 0;
            background: right center
              url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAyCAYAAADLLVz8AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAQOSURBVGiB7ZpdaBxVGIafObuzu41Z2+YHSTVqKbY32laJijapGkWsXrRsYZAoGpRaBLFQvBCr3ln1TmsQUayhCvmhCWkbrMUaUGotFK1tETW00YhtwSRKTLqbzWZ2vDiWojaGnG/2p3Ae2Jvdmed88+7mnjpfrbmearzzvkklunyxaqqxaqqxaqqxaqqxaqqxaqqxaqqxaqqxaqqxaqqxaqqxaqqjzrmfl1oj3ag0apwap68r8nmymyhcnph5chbxnb9x1gguosg+/SMmhZcLzqztLC91P7AZuBuoMrKnz0PUhWQSamohkdDvj4/DH7/7jI9/B0E/1TVtfNhxzmiMEvPfAL3UtcCbwAYzowNTU+AADbdBYxOsvhkWLtKfAfg+nDsLR76CgYMwNDRGIvEiff3vSA6mFPwzQC91C9AH1JvZHJichLolsOkpuP2OufdJp6GrA/btAd9/m6VLt/BG24zR+CXgYoBeahnwJXCVsS2TgeUrYNvLUDXPq37gILTtgHx+B339W4xrKDJ6FvZSUeADJOFNT0NdHWx7af7hATTfB5s2Qy73LBvXP2pcR5G5sIxpAZqMLfm8frU+CVXV5tWsewjWroVMZjstXtJcVDwUXqoSeEZkyWZh1Wq4c428oocfgcrKerLZVrms8CigGWgQWXI5eGBdKAVx3fX6y0inN9Dizb1OLTEKeAy96DBjZgZqa+GG5aEVxU0rQalVZDIhSguDAu4SGXI5WHK1XiiHxTX1sGBBNb6/IjxpYVBAjcgQBOC6oEK8ra6phXgcYFl40sJQ7s2Esv/bhAJyIoPj6Ms4nw+nIoDRET2zKzUZnrQwKOBbkcF14ewZfdBh8cswZNJZIupYeNLCoIC9IkM0CiMjMDgYTkUAJ49DwGmi7lB40sKggE7gN5HFdeHA/lAKYngYThyHiopDdPWMhiMtHIru3lPAHpElHodj38AXn8sr2tUOmamASKRNLis8F2bh14AJc4vSl/LO9+Dnn8yr6d8LRw5DItFOV89Jc1Hx0AF29w4BW0WmWAzGxuD1V+HMr/Pf/9MD0P4+xOODuO7zolqKyL8bqq8AL5jbHN0gXVwFrU/APc0Xu9Cz8ec4fLQLPvkYou4Isdi9dO6+LM4+uHRLfyuwHYibGR29hvN93RRY0wgNt+o2VySit8nl4PQp+PooDHym2/sVVxwlGn2czt3fi46oyFz6oZKXagCeA9YDCWN7JqMDTSYheSUsXqSfzI2NwsQEnJ+EWGyQWPxdguAtununjccqEbM/lQPwUk3A08CDwEKjEYLg74arr89KHH0mKvUDSu1EqQ66egx+NMuD/w/QMifl3kwoe2yAQmyAQmyAQmyAQmyAQmyAQmyAQmyAQmyAQmyAQv4COt4ejFRauCAAAAAASUVORK5CYII=)
              no-repeat;
            background-size: 60px;
          }
        }
      }
    }
  }
  .placeholder {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #ddd;
    margin: 0;
  }
}
.attribute {
  width: 500px;
  height: calc(~"100% - 60px");
  border-left: 1px solid #e6e6e6;
  background: #fff;
  position: fixed;
  right: 0;
  top: 60px;
  overflow: auto;
  h3 {
    font-size: 16px;
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    font-weight: normal;
    margin: 0;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    color: #333;
  }
  h4 {
    font-size: 14px;
    padding: 5px 10px;
    font-weight: normal;
    margin: 0;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;
    color: #333;
  }
  .attr-item {
    width: 100%;
    .clearfix;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    position: relative;
    & > label {
      width: 150px;
      height: 100%;
      line-height: 30px;
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 10px;
      box-sizing: border-box;
      background-color: #f2f2f2;
      color: #333;
    }
    .readonly-text {
      width: calc(~"100% - 150px");
      line-height: 30px;
      float: left;
      margin-left: 150px;
      padding: 0 10px;
      color: #999;
      box-sizing: border-box;
      border-left: 1px solid #e6e6e6;
      &.warn {
        color: #f00;
      }
    }
    .edit-text {
      width: calc(~"100% - 150px");
      line-height: 30px;
      float: left;
      margin-left: 150px;
      padding: 0 10px;
      color: #999;
      box-sizing: border-box;
      border-left: 1px solid #e6e6e6;
      input[type="text"],
      input[type="number"] {
        width: 100%;
        height: 100%;
        border: 0;
        &:focus {
          outline: 0;
        }
      }
      .radio {
        position: relative;
        cursor: pointer;
        display: inline-block;
        font-size: 12px;
        margin-right: 10px;
        span {
          color: #333;
          display: block;
          width: 100%;
          height: 22px;
          line-height: 22px;
          padding: 0 10px;
          border: 1px solid #ccc;
        }
        input[type="radio"] {
          -webkit-appearance: none;
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          &:focus {
            outline: 0;
          }
          &:checked + span {
            color: #fff;
            background-color: #333;
            border-color: #333;
          }
        }
      }
      .option {
        input[type="text"] {
          width: calc(~"50% - 20px");
          background-color: #fff;
          padding: 2px 5px;
          border: 1px solid #e6e6e6;
        }
        a {
          display: inline-block;
          color: #999;
          font-size: 12px;
        }
      }
      a {
        color: #333;
      }
    }
  }
}
</style>