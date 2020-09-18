<template>
  <v-app-bar color="white" fixed elevate-on-scroll>
    <router-link to="/">
      <v-img src="../assets/africon_logo.png" width="120" height="40"></v-img>
    </router-link>
    <v-spacer></v-spacer>
    <router-link to="/#home" class="d-none d-sm-flex text-decoration-none">
      <v-btn text color="grey-darken-4">
        <span>Home</span>
      </v-btn>
    </router-link>
    <router-link to="/#services" class="d-none d-sm-flex text-decoration-none">
      <v-btn text color="grey-darken-4">
        <span>Services</span>
      </v-btn>
    </router-link>
    <router-link to="/login" class="d-none d-sm-flex">
      <v-btn dark color="primary">
        <span>Get Started</span>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>
<script>
export default {
  name:"AppBarDef"
  
}
</script>
<style lang="scss" scoped>

</style>