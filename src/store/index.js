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
  },
  mutations: {
    SET_USER_PROFILE(state, payload) {
      state.userProfile = payload
      state.isLoggedIn = true
    },
    SET_USER_TYPE(state, payload) {
      state.userType = payload
    },
  },
  actions: {
    async login({ commit }, phoneNumber) {
      const customer = await fb.customersCollection.doc(phoneNumber).get()
      const trucker = await fb.truckersCollection.doc(phoneNumber).get()

      if (customer.exists) {
        commit('SET_USER_PROFILE', customer.data())
        commit('SET_USER_TYPE', 'customer')
        router.push('/customer')
        return
      }

      if (trucker.exists) {
        commit('SET_USER_PROFILE', trucker.data())
        commit('SET_USER_TYPE', 'trucker')
        router.push('/trucker')
        return
      }

      router.push('/login')

    },
    signUpCustomer({ commit }, customerForm) {
      fb.customersCollection.doc(customerForm.phoneAccount).set(customerForm)
      router.push('/login')
    },
  },
  modules: {
  }
})

export default store
