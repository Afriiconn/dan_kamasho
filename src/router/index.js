import Vue from 'vue'
import VueRouter from 'vue-router'
import CustomerDashboard from '../views/CustomerDashboard.vue'
import TruckerDashboard from '../views/TruckerDashboard.vue'
//import {auth} from '../firebase'

Vue.use(VueRouter)

const routes = [
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
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/trucker',
    name: 'Trucker Dashboard',
    component: TruckerDashboard,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/trucker-state-order',
    name: 'State Order',
    component: () => import('../views/TruckerStateOrders.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/user-add-order',
    name: 'New Order',
    component: () => import('../views/UserAddOrder.vue'),
    meta:{
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if(requiresAuth && !auth.currentUser){
    next('/login')
  } else {
    next()
  }
})*/

export default router
