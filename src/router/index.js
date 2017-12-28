import Vue from 'vue'
import Router from 'vue-router'
//components
import Login from '@/components/login'
//views
import Home from '@/views/home/home'
import Form from '@/views/forms/form'
import Control from '@/views/forms/control'
import DataSource from '@/views/forms/dataSource'
import List from '@/views/forms/list'

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
      name: 'List',
      component: List
    },
  ]
})
