<template>
  <div>
    <el-menu :default-active="$route.path" class="menu" unique-opened router>
      
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-table"></i>
          <span slot="title">我的考勤</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sign/mySign/punchCard">考勤打卡</el-menu-item>
          <el-menu-item index="/sign/mySign/myRecord">我的记录</el-menu-item>
          <el-menu-item index="/sign/mySign/myApply">我的申请</el-menu-item>
          <el-menu-item index="/sign/mySign/myClasses">我的班次</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-table"></i>
          <span slot="title">排班管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sign/scheduleManage/classesSetting">班次设置</el-menu-item>
          <el-menu-item index="/sign/scheduleManage/classesPlan">班次安排</el-menu-item>
          <el-menu-item index="/sign/scheduleManage/classesExport">班次导出</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-table"></i>
          <span slot="title">考勤管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sign/signManage/signRecord">考勤记录</el-menu-item>
          <el-menu-item index="/sign/signManage/applyManage">申请管理</el-menu-item>
          <el-menu-item index="/sign/signManage/signStatistics">考勤统计</el-menu-item>
          <el-menu-item index="/sign/signManage/typeSetting">类型设置</el-menu-item>
          <el-menu-item index="/sign/signManage/signExport">考勤导出</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-table"></i>
          <span slot="title">外勤管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sign/outsideManage/outsideManage">外勤管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu> 
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {}
  },
  methods:{},
  components:{}
}
</script>

<style scoped lang="less">

</style>
