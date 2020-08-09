<template>
  <v-app-bar color="white" fixed elevate-on-scroll>
    <v-toolbar-title>Afriiconn</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text @click="toAddOrder" color="primary">
      <v-icon>mdi-plus</v-icon><span class="d-none d-sm-flex">Add Order</span>
    </v-btn>
    <v-btn text color="primary">
      <v-icon>mdi-power-settings</v-icon><span class="d-none d-sm-flex">Logout</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapState } from "vuex";
import router from "../router/index";

export default {
  name: "AppBarLogged",
  methods: {
    toAddOrder() {
      router.push("/customer-add-order");
    },
  },
  computed: {
    ...mapState(["userProfile", "userType"]),
    userName() {
      return `${this.userProfile.firstName} ${this.userProfile.lastName}`;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>