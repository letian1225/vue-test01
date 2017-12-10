import Vue from 'vue'
import Router from 'vue-router'
//components
import Login from '@/components/login'
//views
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
      path: '/form',
      name: 'Form',
      component: Form
    }
  ]
})
