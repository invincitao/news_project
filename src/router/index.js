import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/user/login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/user/register.vue'),
    }
  ]
})

export default router