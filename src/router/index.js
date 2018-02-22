import Vue from 'vue'
import Router from 'vue-router'

/*------------------------登录-------------------------*/
import Login from '@/components/login'





/*------------------------我的工作台-------------------------*/
import Home from '@/views/home/home'





/*------------------------自定义表单-------------------------*/
//主页
import custom from '@/views/custom/home'
//模块管理
import customModule from '@/views/custom/module/module'
//表单管理
import customForm from '@/views/custom/form/form'
import customFormEdit from '@/views/custom/form/edit'
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







/*------------------------考勤管理-------------------------*/
//主页
import sign from '@/views/sign/home'
/*我的考勤*/
//考勤打卡
import mySignPunchCard from '@/views/sign/mySign/punchCard'
//我的记录
import mySignMyRecord from '@/views/sign/mySign/myRecord'


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
        }
      ]
    },
  ]
})
