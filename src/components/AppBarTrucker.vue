<template>
  <v-app-bar color="white" fixed elevate-on-scroll>
    <v-btn text>
      <v-img @click="toHome" src="../assets/africon_logo.png" width="120" height="40"></v-img>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn text @click="logOut" color="primary">
      <v-icon>mdi-power-settings</v-icon><span class="d-none d-sm-flex">Logout</span>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "AppBarTrucker",
  methods: {
    logOut(){
      this.$store.dispatch("logout")
    },
    toHome() {
      this.$router.push("/");
    }
  },
};
</script>
<style lang="scss" scoped>
</style>