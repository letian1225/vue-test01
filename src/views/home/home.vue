<template>
	
	<div>
		<el-container>
			<el-header>
				<navbar></navbar>
			</el-header>
			<el-container>
				<el-main>
					
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>





<script>
import navbar from '../../components/navbar'
export default {
  name:"Home",
  data () {
    return {}
  },
  components:{navbar}
}
</script>

<style scoped lang="less">
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
	  opacity: 0
	}
</style>