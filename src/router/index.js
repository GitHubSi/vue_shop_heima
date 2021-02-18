import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
// Home页面的子组件，欢迎页面
import Welcome from '@/components/Welcome.vue'

import Users from '@/components/users/Users.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login', component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: 'Welcome',
      children: [
        {
          path: '/welcome', component: Welcome,

        },
        {
          path: '/users', component: Users
        }

      ]
    },
    {
      path: '/', redirect: '/login'
    },

  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要去的路径

  //from 代表从哪个路径来

  // next是一个函数，表示放行

  // next() 放行， next('/login')强制跳转页面

  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()

})

export default router
