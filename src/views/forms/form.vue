<template>
  <div>
    <header>
      <el-button-group >
        <el-button icon="fa fa-arrow-circle-o-left" @click="$router.push('forms/list')"> 返回</el-button>
        <el-button icon="fa fa-save" @click="dialogCreateFormVisible = true"> 保存表单</el-button>
        <el-button icon="fa fa-code" @click="dialogConsoleVisible = true"> 控制台</el-button>
      </el-button-group>

      
    </header>
    

    <el-dialog title="保存表单" :visible.sync="dialogCreateFormVisible">
        <el-form ref="form" :model="formJson" label-width="120px">
          <el-form-item label="表单名称">
            <el-input v-model="formJson.wff_name"></el-input>
          </el-form-item>
          <el-form-item label="所属公司ID">
            <el-input v-model="formJson.wff_company"></el-input>
          </el-form-item>
          <el-form-item label="归属模块">
            <moduleList @setModule="setModule" :getModuel="formJson.wff_module"></moduleList>
          </el-form-item>
          <el-form-item label="归属工作流ID">
            <el-input v-model="formJson.wff_workflow"></el-input>
          </el-form-item>
          <el-form-item label="归属节点ID">
            <el-input v-model="formJson.wff_node"></el-input>
          </el-form-item>
          <el-form-item label="是否启用">
              <el-switch v-model="formJson.wff_abled" active-value="1" inactive-value="0"></el-switch>
            </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="onCreateFormSubmit">立即保存</el-button>
              <el-button @click="dialogCreateFormVisible = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog title="控制台" :visible.sync="dialogConsoleVisible">
        <pre><code class="json">{{formJson}}</code></pre>
    </el-dialog>
    
    <div class="controls-list">
        <h3>控件库</h3>
        <vddl-list :list="controls" :allowed-types="controls">
          <vddl-draggable v-for="(item, index) in controls" :key="item.wfw_id"
            :draggable="item"
            :wrapper="controls"
            :index="index"
            :copied="copied"
            effect-allowed="copy">
              
                    <i :class="item.wfw_icon"></i>
                    <span>{{item.wfw_name_ch}}</span>
              
          </vddl-draggable>
        </vddl-list>
    </div>


    <div class="design">
      
      <div class="forms">
        <vddl-list class="forms-list"
            :list="formJson.wff_json" 
            :external-sources="true"
            :inserted="inserted">
              <vddl-draggable v-for="(list, index) in formJson.wff_json" :key="list.uid"
                :draggable="list"
                :wrapper="formJson.wff_json"
                :index="index"
                :selected="selectedEvent"
                v-bind:class="{'selected': selected === list}"
                effect-allowed="move">
                
                <div class="form-row">
                  <label>{{list.wfw_attr[0].labelName == "" ? "名称" : list.wfw_attr[0].labelName}}</label>
                  <span>{{list.wfw_name_ch}}</span>
                </div>
            
              </vddl-draggable >
              <vddl-placeholder class="placeholder">
                
              </vddl-placeholder>
        </vddl-list>
        <vddl-list :list="[]" class="drag-remove">
          <i class="fa fa-trash"></i>
          <p>拖到此处删除控件</p>
          <vddl-placeholder class="placeholder"><i class="fa fa-trash-o"></i></vddl-placeholder>
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
              <label>数据源</label>
              <div class="edit-text">
                <input type="text" v-model="attribute.wfw_attr[0].dataSource" placeholder="" readonly>
                <a href="javascript:;" @click="dialogDataSourceVisible = true">添加数据源</a>
              </div>
            </div>
            <div class="attr-item">
              <label>是否隐藏</label>
              <div class="edit-text">
                <div class="radio">
                  <input type="radio" v-model="attribute.wfw_attr[0].display" name="display" :value="false">
                  <span>显示</span>
                </div>
                <div class="radio">
                  <input type="radio" v-model="attribute.wfw_attr[0].display" name="display" :value="true">
                  <span>隐藏</span>
                </div>
              </div>
            </div>
            <div class="attr-item" v-if="attribute.wfw_attr[0].type != null">
              <label>类型</label>
              <div class="edit-text">
                <div v-for="item in attribute.wfw_attr[0].type"  class="radio">
                <input type="radio" v-model="attribute.wfw_attr[0].type_selected" name="type" :value="item.wfwq_id" :id="item.wfwq_name">
                <span>{{item.wfwq_name_ch}}</span>
                </div>
              </div>
            </div>

            <div class="attr-item" v-if="attribute.wfw_attr[0].option != null">
              <label>OPTION</label>
              <div class="edit-text">
                <div v-for="(item,index) in attribute.wfw_attr[0].option"  class="option">
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
            <el-table
                :data="dataSourceData"
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
                  <template slot-scope="scope">
                    {{scope.row.wc_abled === '0' ? '否' : '是'}}
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="dialogDataSourceVisible = false, selectDataSourceData(scope.row.wc_id)">
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
import Vue from 'vue'
import Vddl from 'vddl'
import moduleList from '../../components/moduleList'

Vue.use(Vddl)

export default {
  name:"",
  data() {
     return {
        controls: [],
        attribute:"",
        selected:"",
        dialogSaveVisible:false,
        dialogCreateVisible:false,
        dialogConsoleVisible:false,
        dialogDataSourceVisible:false,
        dataSourceData:[],
        dialogCreateFormVisible:false,
        formJson:{
          wff_name:"新建表单_" + this.createUID(),
          wff_company:"3",
          wff_module:"3",
          wff_workflow:"3",
          wff_node:"3",
          wff_abled:"1",
          wff_json:[]
        },
     }
  },
  computed: {},
  created(){
    this.listWfFormWidgets()
    this.listWfForms()
    this.getCodeList()
  },
  methods: {
    setModule(msg){
      console.log(msg)
      this.formJson.wff_module = msg
    },
    //数据源列表
    getCodeList(){
      Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/getCodeList")
         .then((res) => {
            //console.log(res.data.list)
            this.dataSourceData = res.data.list
         }, (error) => { })
    },
    selectDataSourceData(id){
      console.log(id)
      this.attribute.wfw_attr[0].dataSource = id
    },
    onCreateFormSubmit(){
      let wff_id = this.$route.query.wff_id
      if(wff_id !== undefined){
        if(wff_id == 0){
          //新建
          this.editWfForms(0)
        }else{
          //编辑
          this.editWfForms(wff_id)
        }
      }
      
    },
    //根据表单ID取得指定的表单数据
    listWfForms(){
      let wff_id = this.$route.query.wff_id

      if(wff_id !== undefined){

        if(wff_id == 0){
          //新建
        }else{
          //编辑
          this.getWfFormByID(wff_id)
          Vue.http.jsonp("http://milibangong.cn/Appservice/Forms/listWfForms",{params: { wff_id: wff_id}})
             .then((res) => {
                console.log(res.data.list)
             }, (error) => { })
        }

      }
    },
    //根据表单结构ID取得指定的表单结构                 
    getWfFormByID(wff_id){
      Vue.http.jsonp("http://milibangong.cn/Appservice/Forms/getWfFormByID",{params: { wff_id: wff_id}})
         .then((res) => {
            this.formJson.wff_name = res.data.list[0].wff_name
            this.formJson.wff_company = res.data.list[0].wff_company
            this.formJson.wff_module = res.data.list[0].wff_module
            this.formJson.wff_workflow = res.data.list[0].wff_workflow
            this.formJson.wff_node = res.data.list[0].wff_node
            this.formJson.wff_json = JSON.parse(res.data.list[0].wff_json)
            console.log(res.data.list[0].wff_json)

         }, (error) => { })
    },
    //控件列表
    listWfFormWidgets(){
      Vue.http.jsonp("http://milibangong.cn/Appservice/FormWidgets/listWfFormWidgets")
        .then((res) => {
          this.controls = res.data.list
        }, (error) => {

      })
    },
    //编辑、新建表单
    editWfForms(wff_id){
      Vue.http.post("http://milibangong.cn/Appservice/Forms/editWfForms",{
          wff_id: wff_id,
          wff_name:this.formJson.wff_name,
          wff_company:this.formJson.wff_company,
          wff_module:this.formJson.wff_module,
          wff_node:this.formJson.wff_node,
          wff_workflow:this.formJson.wff_workflow,
          wff_abled:this.formJson.wff_abled,
          wff_json:JSON.stringify(this.formJson.wff_json)
        },{emulateJSON: true}).then((res) => {
        console.log(res)
        if(res.data.errorCode == 1){
          this.dialogCreateFormVisible = false
          this.$notify({
            title: '提示',
            message: this.formJson.wff_name + '保存成功',
            duration: 0,
            type: 'success'
          });
        }else{

        }

        }, (error) => {
      })
    },
    selectedEvent(person){
      this.attribute = person
      this.selected = person
    },
    createUID(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
          return v.toString(16)
      })
    },
    inserted(data){
      data.item.uid = this.createUID()
    },
    copied(){
      
    }
  },
  components:{moduleList}
}
</script>

<style scoped lang="less">
  .clearfix{&:after{content:".";display:block;height:0;clear:both;visibility:hidden}
    &:before{content:".";display:block;height:0;clear:both;visibility:hidden}
  }
  header{height: 60px; width: 100%; position: fixed; left: 0; top:0; background-color: #f2f2f2; padding: 8px 10px; box-sizing: border-box;}

  .controls-list{width: 300px; height:calc(~"100% - 60px"); position: fixed; left: 0; top:60px;background-color: #fff;  border-right: 1px solid #e6e6e6; 
    h3{font-size: 16px; padding: 15px 10px; font-weight: normal; margin: 0; border-bottom: 1px solid #e6e6e6; background-color: #fff; color: #333;}
    .vddl-list{ width: 100%;
      .vddl-draggable{width: 33.333%; height: 100px; cursor: move; display: inline-block;  text-align: center; padding: 10px; box-sizing: border-box; border-bottom: 1px solid #e6e6e6;
        &:nth-of-type(1),&:nth-of-type(4),&:nth-of-type(7),&:nth-of-type(10),&:nth-of-type(13),&:nth-of-type(16),&:nth-of-type(19),&:nth-of-type(22){border-right: 1px solid #e6e6e6;}
        &:nth-of-type(2),&:nth-of-type(5),&:nth-of-type(8),&:nth-of-type(11),&:nth-of-type(14),&:nth-of-type(17),&:nth-of-type(20),&:nth-of-type(23),&:nth-of-type(26){border-right: 1px solid #e6e6e6;}
        i{font-size: 20px; color: #333; margin-top: 10px; }
        span{display: block; font-size: 12px; margin-top: 20px; color: #333;}
        &:hover{background-color: #e6e6e6; box-shadow: 0 0 5px #e6e6e6; transition: all .5s ease;}
      }
    }
  }
  .design{
    .drag-remove{position: fixed; width: 120px; height: 120px; border-radius: 5px; text-align: center; border:1px solid #e6e6e6; background-color: #f2f2f2; right: 520px; bottom: 20px;
      i{font-size: 72px; color: #999; margin-top: 10px;}
      p{font-size: 12px; color: #999; position: relative; z-index: 1;}
      .placeholder{width: 100%; height: 100%; position: absolute; left: 0; top:0; background-color: #fff; margin: 0; border-radius: 5px;}
    }
  }
  
  .forms{ width: calc(~"100% - 800px"); height:calc(~"100% - 60px"); position: fixed; left: 300px; top:60px; overflow: auto; background-color: #fff; webkit-user-select: none;
    .forms-list{ width: 100%; min-height: 700px; .clearfix; padding: 20px; box-sizing: border-box;
      .vddl-draggable{width: 100%; padding:10px; box-sizing: border-box; .clearfix;
        &.selected{background-color:#f2f2f2;}
        .form-row{
          label{width:100px; height:30px; line-height:30px; float: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
          span{width:calc(~"100% - 100px"); height:30px; line-height:30px;  padding:0 10px; box-sizing: border-box; border:1px solid #e6e6e6; float: left; display: inline-block;}
        }
      }
    }
    .placeholder{width: 100%; height: 50px; line-height: 50px; background-color: #ddd; margin: 5px 0;}
  }
  .attribute{width:500px; height: calc(~"100% - 60px"); border-left: 1px solid #e6e6e6;  background: #fff; position: fixed; right: 0; top:60px; overflow: auto;
    h3{font-size: 16px; padding: 15px 10px; font-weight: normal; margin: 0; border-bottom: 1px solid #e6e6e6; background-color: #fff; color: #333;}
    h4{font-size: 14px; padding: 5px 10px; font-weight: normal; margin: 0; border-bottom: 1px solid #e6e6e6; background-color: #fff; color: #333;}
    .attr-item{width: 100%;.clearfix; border-bottom: 1px solid #e6e6e6; font-size: 14px;  position: relative;
      &>label{width: 150px; height: 100%; line-height: 30px; position: absolute; left: 0; top:0; padding: 0 10px; box-sizing: border-box; background-color: #f2f2f2;  color: #333;}
      .readonly-text{width: calc(~"100% - 150px"); line-height: 30px; float: left; margin-left: 150px; padding: 0 10px; color: #999; box-sizing: border-box; border-left: 1px solid #e6e6e6;
        &.warn{color: #f00;}
      }
      .edit-text{width: calc(~"100% - 150px"); line-height: 30px; float: left; margin-left: 150px; padding: 0 10px; color: #999; box-sizing: border-box; border-left: 1px solid #e6e6e6;
        input[type='text']{width: 100%; height: 100%; border:0;
          &:focus{outline: 0;}
        }
        .radio{position: relative; cursor: pointer; display: inline-block;  font-size: 12px; margin-right: 10px;
          span{color: #333; display: block; width: 100%;  height: 22px; line-height: 22px; padding: 0 10px; border:1px solid #ccc;}
          input[type='radio']{-webkit-appearance:none; width: 100%; height: 100%; position: absolute; left: 0; top:0; 
            &:focus{outline: 0;}
            &:checked + span{color:#fff; background-color: #333; border-color: #333;}
          }
        }
        .option{
          input[type='text']{width:calc(~"50% - 20px"); background-color: #fff; padding:2px 5px; border:1px solid #e6e6e6;}
          a{display: inline-block; color: #999; font-size: 12px;}
        }
        a{color: #333;}
      }
    }
  }

</style>