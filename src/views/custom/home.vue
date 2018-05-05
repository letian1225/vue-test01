<template>
	<div>
		<el-container>
			<el-header>
				<navbar></navbar>
			</el-header>
			<el-container :class="this.LEVEL() == 2 ? 'max' : 'min'">
				<sidemenu></sidemenu>
				<el-main> 
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>

		
	</div>
</template>

<script>
import navbar from '../../components/navbar'
import sidemenu from '../../components/customMenu'
export default {
  components:{ navbar,  sidemenu }
}
</script>
<style>
.min.el-container .el-menu{display: none;}
.min.el-container .el-main{margin: 0;}
</style>