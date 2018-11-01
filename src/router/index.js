import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import User from '@/views/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:{name: 'Login'}
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
  ]
})
