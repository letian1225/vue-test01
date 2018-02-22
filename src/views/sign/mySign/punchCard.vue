<template>
	
	<div class="sign">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item>我的考勤</el-breadcrumb-item>
		  <el-breadcrumb-item>考勤打卡</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="sign-body">
			<div class="data-layout">
				<h1>2018-01-24 星期三</h1>
				<el-alert title="您被安排在班组“班组名称”中，使用手机打卡可以随时上报位置" type="success"></el-alert>
				<table class="data-table-layout">
					<tr>
						<td><span>上班</span><span>8:30</span></td>
						<td><strong>12:59</strong><small>电脑255.255.255.255</small></td>
						<td><span class="red">正常</span></td>
						<td><el-button size="mini">重新签退</el-button></td>
					</tr>
				</table>
				<div class="data-form-layout">
					<el-form label-width="80px">
						<el-form-item label="备注">
							<el-input type="textarea"></el-input>
						</el-form-item>
						<el-form-item style="text-align:right;">
						    <el-button size="mini">取消</el-button>
						    <el-button type="primary" size="mini">确认</el-button>
						</el-form-item>
					</el-form>
					
				</div>
			</div>
		</div>
	</div>
</template>





<script>
export default {
  data () {
    return {}
  },
  components:{}
}
</script>

<style lang="less">
	

</style>