import Vue from 'vue'
import Router from 'vue-router'

/*------------------------登录-------------------------*/
import Login from '@/components/login'





/*------------------------我的工作台-------------------------*/
import Home from '@/views/home/home'





/*------------------------自定义表单-------------------------*/
//主页
import custom from '@/views/custom/home'
//选择公司
import customCompany from '@/views/custom/company/company'
//模块管理
import customModule from '@/views/custom/module/module'
//表单管理
import customForm from '@/views/custom/form/form'
import customFormEdit from '@/views/custom/form/edit'
import customFormShare from '@/views/custom/form/share'

//数据源管理
import customSource from '@/views/custom/source/source'
//控件管理
import customControl from '@/views/custom/control/control'
//列表管理
import customList from '@/views/custom/list/list'
import customListEdit from '@/views/custom/list/edit'
//统计管理
import customStatistics from '@/views/custom/statistics/statistics'
import customStatisticsEdit from '@/views/custom/statistics/edit'
//工作流
import customWorkflow from '@/views/custom/workflow/workflow'
//筛选
import customSearch from '@/views/custom/search/search'



/*------------------------系统设置-------------------------*/

//主页
import system from '@/views/system/home'
import systemProxy from '@/views/system/proxy/proxy'
import systemAdminPassword from '@/views/system/admin/password'
/*------------------------考勤管理-------------------------*/

//主页
import sign from '@/views/sign/home'

/*我的考勤*/

//考勤打卡
import mySignPunchCard from '@/views/sign/mySign/punchCard'
//我的记录
import mySignMyRecord from '@/views/sign/mySign/myRecord'
//我的申请
import mySignMyApply from '@/views/sign/mySign/myApply'
//我的班次
import mySignMyClasses from '@/views/sign/mySign/myClasses'

/*排班管理*/

//班次设置
import scheduleManageClassesSetting from '@/views/sign/scheduleManage/classesSetting'
//班次安排
import scheduleManageClassesPlan from '@/views/sign/scheduleManage/classesPlan'
//班次导出
import scheduleManageClassesExport from '@/views/sign/scheduleManage/classesExport'

/*考勤管理*/

//考勤记录
import signManageSignRecord from '@/views/sign/signManage/signRecord'
//申请管理
import signManageApplyManage from '@/views/sign/signManage/applyManage'
//考勤统计
import signManageSignStatistics from '@/views/sign/signManage/signStatistics'
//类型设置
import signManageTypeSetting from '@/views/sign/signManage/typeSetting'
//考勤导出
import signManageSignExport from '@/views/sign/signManage/signExport'

/*外勤管理*/

//外勤管理
import outsideManageOutsideManage from '@/views/sign/outsideManage/outsideManage'






Vue.use(Router)
export default new Router({
  routes: [
    /*
      登录
    */
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/custom/home',
      component: custom,
      children: [
        {
          path: '/custom/company/company',
          component: customCompany,
        },
        {
          path: '/custom/module/module',
          component: customModule,
        },
        {
          path: '/custom/form/form',
          component: customForm,
        },
        {
          path: '/custom/form/edit',
          component: customFormEdit,
        },
        {
          path: '/custom/form/share',
          component: customFormShare,
        },
        {
          path: '/custom/source/source',
          component: customSource,
        },
        {
          path: '/custom/control/control',
          component: customControl,
        },
        {
          path: '/custom/list/list',
          component: customList,
        },
        {
          path: '/custom/list/edit',
          component: customListEdit,
        },
        {
          path: '/custom/statistics/statistics',
          component: customStatistics,
        },
        {
          path: '/custom/statistics/edit',
          component: customStatisticsEdit,
        },
        {
          path: '/custom/workflow/workflow',
          component: customWorkflow,
        },
        {
          path: '/custom/search/search',
          component: customSearch,
        },
      ]
    },
    {
      path: '/sign/home',
      component: sign,
      children: [
        {
          path: '/sign/mySign/punchCard',
          component: mySignPunchCard,
        },
        {
          path: '/sign/mySign/myRecord',
          component: mySignMyRecord,
        },
        {
          path: '/sign/mySign/myApply',
          component: mySignMyApply,
        },
        {
          path: '/sign/mySign/myClasses',
          component: mySignMyClasses,
        },
        {
          path: '/sign/scheduleManage/classesSetting',
          component: scheduleManageClassesSetting,
        },
        {
          path: '/sign/scheduleManage/classesPlan',
          component: scheduleManageClassesPlan,
        },
        {
          path: '/sign/scheduleManage/classesExport',
          component: scheduleManageClassesExport,
        },
        {
          path: '/sign/signManage/signRecord',
          component: signManageSignRecord,
        },
        {
          path: '/sign/signManage/applyManage',
          component: signManageApplyManage,
        },
        {
          path: '/sign/signManage/signStatistics',
          component: signManageSignStatistics,
        },
        {
          path: '/sign/signManage/typeSetting',
          component: signManageTypeSetting,
        },
        {
          path: '/sign/signManage/signExport',
          component: signManageSignExport,
        },
        {
          path: '/sign/outsideManage/outsideManage',
          component: outsideManageOutsideManage,
        },
      ]
    },
    {
      path: '/system/home',
      component: system,
      children: [
        {
          path: '/system/proxy/proxy',
          component: systemProxy,
        },
        {
          path: '/system/admin/password',
          component: systemAdminPassword,
        },
        
      ]
    },
  ]
})
