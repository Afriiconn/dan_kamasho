import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userProfile:{},
    userType:'',
    isLoggedIn: false
  },
  mutations: {
    SET_USER_PROFILE(state,payload){
      state.userProfile = payload
      state.isLoggedIn = true
    },
    SET_USER_TYPE(state,payload){
      state.userType = payload
    }
  },
  actions: {
    async login({commit},phoneNumber){
      const customer = await fb.customersCollection.doc(phoneNumber).get()
      const trucker = await fb.truckersCollection.doc(phoneNumber).get()

      if(customer.exists){
        commit('SET_USER_PROFILE',customer.data())
        commit('SET_USER_TYPE','customer')
        router.push('/customer')
        return
      }

      if(trucker.exists){
        commit('SET_USER_PROFILE',trucker.data())
        commit('SET_USER_TYPE','trucker')
        router.push('/trucker')
        return
      }

      router.push('/login')

    }
  },
  modules: {
  }
})

export default store
