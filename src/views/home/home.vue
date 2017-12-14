<template>
	<div>
		<el-container>
			<el-header>
				<!-- <navbar></navbar> -->
			</el-header>

			<el-container>
		
				<sidemenu></sidemenu>

				<el-main>
					<div class="page-title">
						<span>xxx</span>
					</div>
					<div class="page-body">
						<el-form :inline="true" class="form-inline">
						  <el-form-item label="审批人">
						    <el-input placeholder="审批人"></el-input>
						  </el-form-item>
						  <el-form-item label="活动区域">
						    <el-select placeholder="活动区域">
						      <el-option label="区域一" value="shanghai"></el-option>
						      <el-option label="区域二" value="beijing"></el-option>
						    </el-select>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" >查询</el-button>
						  </el-form-item>
						</el-form>
						<el-table
					      :data="tableData" class="table">
					      <el-table-column
					        prop="date"
					        label="日期"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="name"
					        label="姓名"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="address"
					        label="地址">
					      </el-table-column>
					    </el-table>

					    <el-pagination
					      background
					      layout="prev, pager, next"
					      :total="1000">
					    </el-pagination>

					</div>

					




	  						
	  					
					
					<!--
						/...
					-->
				</el-main>

			</el-container>

		</el-container>
	</div>
</template>





<script>
import navbar from '../../components/navbar'
import sidemenu from '../../components/sidemenu'
export default {
  name:"Home",
  data () {
    return {
      tableData: [{
	      date: '2016-05-02',
	      name: '王小虎',
	      address: '上海市普陀区金沙江路 1518 弄'
	    }, {
	      date: '2016-05-04',
	      name: '王小虎',
	      address: '上海市普陀区金沙江路 1517 弄'
	    }, {
	      date: '2016-05-01',
	      name: '王小虎',
	      address: '上海市普陀区金沙江路 1519 弄'
	    }, {
	      date: '2016-05-03',
	      name: '王小虎',
	      address: '上海市普陀区金沙江路 1516 弄'
	    }]

    }
  },
  components:{navbar, sidemenu}
}
</script>

<style scoped lang="less">

</style>