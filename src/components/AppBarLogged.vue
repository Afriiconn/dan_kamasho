<template>
  <v-app-bar color="white" fixed elevate-on-scroll>
    <v-toolbar-title>Afriiconn</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="toAddOrder" color="primary">
      <v-icon>mdi-plus</v-icon><span class="d-none d-sm-flex">Add Order</span>
    </v-btn>
    <v-btn text @click="logOut" color="primary">
      <v-icon>mdi-power-settings</v-icon><span class="d-none d-sm-flex">Logout</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "AppBarLogged",
  methods: {
    toAddOrder() {
      this.$router.push("/customer-add-order");
    },
    logOut(){
      this.$store.dispatch("logout")
    }
  },
};
</script>
<style lang="scss" scoped>
</style>