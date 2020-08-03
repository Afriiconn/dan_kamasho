<template>
  <v-app>
    <AppBarDef v-if="!isLoggedIn"></AppBarDef>
    <AppBarLogged v-if="showCustomerNav"></AppBarLogged>
    <router-view />
  </v-app>
</template>

<script>
import AppBarDef from '@/components/AppBarDef';
import AppBarLogged from '@/components/AppBarLogged'
import {mapState} from 'vuex'

export default {
  name: 'App',
  components:{
    AppBarDef,
    AppBarLogged
  },
  data: () => ({
    
  }),
  computed:{
    ...mapState(['userProfile','userType','isLoggedIn']),
    showCustomerNav(){
      return (this.isLoggedIn) && (this.userType === 'customer')
    }
  }
};
</script>
