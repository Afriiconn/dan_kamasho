<template>
  <v-layout align-center justify-center class="mt-5">
    <v-flex xs12 sm8 md4>
      <v-card elevation="4">
        <v-card-title>404 - Page Not Found</v-card-title>
        <v-card-subtitle>Oops! It seemed you requested for a page that doesn't exist</v-card-subtitle>
        <v-card-actions >
          <v-btn dark color="primary" @click="routeHome">
            <v-icon>mdi-back</v-icon>Go Home
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>

export default {
  name: "NotFound",
  data() {
    return {};
  },
  methods: {
    routeHome() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>