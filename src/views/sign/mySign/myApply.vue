<template>
	
	<div class="sign">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>我的考勤</el-breadcrumb-item>
		  <el-breadcrumb-item>我的申请</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="sign-body">
			<div class="data-top">
				<el-button>刷新</el-button>
			</div>
			<div class="data-layout">
        		<el-table class="diy-el-table-border">
    		      <el-table-column label="状态">
    		      </el-table-column>
    		      <el-table-column label="类型">
    		      </el-table-column>
    		      <el-table-column label="申请内容">
    		      </el-table-column>
    		      <el-table-column label="申请时间">
    		      </el-table-column>
    		      <el-table-column label="操作">
    		      </el-table-column>
    		    </el-table>
			</div>

		</div>

		
	


	</div>
</template>





<script>
export default {
  data () {
    return {

    }
  },
  methods: {
   
  },
  components: {
    
  }
}
</script>

<style lang="less">
	

</style>