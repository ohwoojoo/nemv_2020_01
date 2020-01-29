import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/user',
    name: '사용자',
    component: () => import('../views/user.vue')
  },
  {
    path: '/header',
    name: '헤더',
    component: () => import('../views/header.vue')
  },
  {
    path: '/sign',
    name: '로그인',
    component: () => import('../views/sign.vue')
  },
  {
    path: '*',
    name: 'e404',
    component: () => import('../views/e404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
