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
import sidemenu from '../../components/signMenu'
export default {
  name:"Home",
  data () {
    return {}
  },
  components:{navbar,sidemenu}
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