<template>
  <v-app>
    <AppBarDef v-if="!isLoggedIn"></AppBarDef>
    <AppBarCustomer v-if="showCustomerNav"></AppBarCustomer>
    <AppBarTrucker v-if="showTruckerNav"></AppBarTrucker>
    <transition>
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar"
import AppBarDef from "@/components/AppBarDef";
import AppBarCustomer from "@/components/AppBarCustomer";
import AppBarTrucker from "@/components/AppBarTrucker";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    AppBarDef,
    AppBarCustomer,
    AppBarTrucker
  },
  data: () => ({}),
  computed: {
    ...mapState(["userProfile", "userType", "isLoggedIn"]),
    showCustomerNav() {
      return this.isLoggedIn && this.userType === "customer";
    },
    showTruckerNav() {
      return this.isLoggedIn && this.userType === "trucker";
    }
  },
};
</script>
