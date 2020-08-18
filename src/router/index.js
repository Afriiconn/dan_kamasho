import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerDashboard from '../views/CustomerDashboard.vue'
import TruckerDashboard from '../views/TruckerDashboard.vue'
//import {auth} from '../firebase'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    beforeEnter: (to, from, next) => {
      const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
      
      if (requiresAuth && !store.state.isLoggedIn) {
        next('/login')
      } else {
        if (store.state.userType === 'customer') {
          next('/customer')
        } else {
          next('/trucker')
        }
      }
    }
  }
  ,
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/customer',
    name: 'Customer Dashboard',
    component: CustomerDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/trucker',
    name: 'Trucker Dashboard',
    component: TruckerDashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/trucker-state-order/:state',
    name: 'State Order',
    component: () => import('../views/TruckerStateOrders.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/customer-add-order',
    name: 'New Order',
    component: () => import('../views/CustomerAddOrder.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !store.state.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
