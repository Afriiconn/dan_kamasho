import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CustomerDashboard from '../views/CustomerDashboard.vue'
import TruckerDashboard from '../views/TruckerDashboard.vue'
import NotFound from '../views/NotFound.vue'
//import {auth} from '../firebase'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Home
  }
  ,
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  },
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
    path: '/reset-password',
    name: 'Reset Password',
    component: () => import('../views/ForgotPassword.vue')
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
