import { showToast } from 'vant'
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory('wai-mai'),
  routes: [
    {
      path: '/',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/order',
      component: () => import('../views/order/index.vue'),
      // meta: {
      //   isAuth: true
      // }
    },
    {
      path: '/cart',
      component: () => import('../views/cart/index.vue'),
      // meta: {
      //   isAuth: true
      // }
    },
    {
      path: '/mine',
      component: () => import('../views/mine/index.vue'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/store',
      component: () => import('../views/store/index.vue')
    },
    {
      path: '/createOrder',
      component: () => import('../views/createOrder/index.vue'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/address',
      component: () => import('../views/address/index.vue'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/addressEdit',
      component: () => import('../views/addressEdit/index.vue'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/userinfoedit',
      component: () => import('../views/userinfoedit/index.vue'),
      meta: {
        isAuth: true
      }
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/register',
      component: () => import('../views/register/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    // if (localStorage.isLogin === 'login') { //本地存储
    if (sessionStorage.isLogin === 'login') { //本地存储
      next()
    } else {
      next('/login')
      showToast('请先登录')
    }
  } else {
    next()
  }
})

export default router
