import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'
import createPersistedState from 'vuex-persistedstate'
import states from './states'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    userProfile: {},
    userType: '',
    isLoggedIn: false,
    states: states,
    isLoading: false,
    customersOrders: []
  },
  mutations: {
    SET_USER_PROFILE(state, payload) {
      state.userProfile = payload
    },
    SET_LOGGED_IN(state, payload) {
      state.isLoggedIn = payload
    },
    SET_USER_TYPE(state, payload) {
      state.userType = payload
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload
    },
    SET_CUSTOMERS_ORDERS(state, payload) {
      state.customersOrders = payload
    }
  },
  actions: {
    async login({ commit }, phoneNumber) {
      commit('SET_LOADING', true)

      const customer = await fb.customersCollection.doc(phoneNumber).get()
      const trucker = await fb.truckersCollection.doc(phoneNumber).get()

      if (customer.exists) {
        commit('SET_USER_PROFILE', customer.data())
        commit('SET_USER_TYPE', 'customer')
        commit('SET_LOGGED_IN', true)
        commit('SET_LOADING', false)
        router.replace('/customer')
        return
      }

      if (trucker.exists) {
        commit('SET_USER_PROFILE', trucker.data())
        commit('SET_USER_TYPE', 'trucker')
        commit('SET_LOGGED_IN', true)
        commit('SET_LOADING', false)
        router.replace('/trucker')
        return
      }
      commit('SET_LOADING', false)
    },
    logout({ commit }) {
      commit('SET_USER_PROFILE', {})
      commit('SET_USER_TYPE', '')
      commit('SET_LOGGED_IN', false)
      router.push('/login')
    },
    signUpCustomer(context, customerForm) {
      fb.customersCollection.doc(customerForm.phoneAccount).set(customerForm)
      router.push('/login')
    },
    signUpTrucker(context, truckerForm) {
      fb.truckersCollection.doc(truckerForm.phoneAccount).set(truckerForm)
      router.push('/login')
    },
    async getCustomersOrders({ commit }) {
      const ordersArray = []
      const orders = await fb.ordersCollection.get()
      orders.forEach(order => {
        if(this.state.userProfile.phoneAccount in order.data().customerOrders){
          ordersArray.push(order.data())
          console.log(order.data())
        }
      })
      commit('SET_CUSTOMERS_ORDERS', ordersArray)
    }
  },
  modules: {
  },
})

export default store
