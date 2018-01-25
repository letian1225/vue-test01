import Vue from 'vue'
import Router from 'vue-router'
//components
import Login from '@/components/login'
//桌面
import Home from '@/views/home/home'

//模块
import ModuleList from '@/views/module/list'

//表单
import Form from '@/views/forms/form'
import Control from '@/views/forms/control'
import DataSource from '@/views/forms/dataSource'
import FormList from '@/views/forms/list'

//统计
import Statistics from '@/views/statistics/list'
import StatisticsEdit from '@/views/statistics/edit'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/module/list',
      name: 'ModuleList',
      component: ModuleList
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/forms/control',
      name: 'Control',
      component: Control
    },
    {
      path: '/forms/dataSource',
      name: 'DataSource',
      component: DataSource
    },
    {
      path: '/forms/list',
      name: 'FormList',
      component: FormList
    },
    {
      path: '/statistics/list',
      name: 'Statistics',
      component: Statistics
    },
    {
      path: '/statistics/edit',
      name: 'StatisticsEdit',
      component: StatisticsEdit
    },
  ]
})
