import Vue from 'vue'
import Router from 'vue-router'
//components
import Login from '@/components/login'
//views
import Home from '@/views/home/home'
import Form from '@/views/forms/form'

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
  ]
})
