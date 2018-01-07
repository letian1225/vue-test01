import Vue from 'vue'
import Router from 'vue-router'
//components
import Login from '@/components/login'
//桌面
import Home from '@/views/home/home'

//模块管理
import ModuleList from '@/views/module/list'

//表单管理
import Form from '@/views/forms/form'
import Control from '@/views/forms/control'
import DataSource from '@/views/forms/dataSource'
import FormList from '@/views/forms/list'

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
  ]
})
