import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Letter from '@/views/Letter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/letter',
    children: [
      {
      path: '/letter',
      component: Letter
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//  利用路由守卫判断登录权限
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') return next()

//   //  获取token
//   const tokenStr = sessionStorage.getItem('token')
//   //  如果tokenStr为空 跳转至/login页面 不为空 则放行
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
