<template>
	<div>
		<el-container>
			<el-header>
				<navbar></navbar>
			</el-header>
			<el-container>
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
import sidemenu from '../../components/systemMenu'
export default {
  components:{ navbar,  sidemenu }
}
</script>