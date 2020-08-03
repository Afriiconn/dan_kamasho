<template>
  <v-layout align-center justify-center class="mt-5">
    <v-flex v-if="isLoading" xs12 sm8 md4>
      <v-container class="mx-auto my-auto">
        <v-row justify="center" align-content="center">
          <v-progress-circular color="primary" rotate indeterminate></v-progress-circular>
        </v-row>
      </v-container>
    </v-flex>
    <v-flex v-else xs12 sm8 md4>
      <v-container class="mx-auto pa-5">
        <v-img src="../assets/logo.jpg" alt="Logo-Image" contain></v-img>
      </v-container>
      <v-card-title class="text-h5">Login</v-card-title>
      <v-card-text>
        <v-form @click.prevent>
          <p>Enter your phone number:</p>
          <v-text-field
            label="Phone"
            prepend-icon="mdi-phone"
            v-model="loginForm.phoneNumber"
            outlined
            clearable
            type="phone"
            clear-icon="mdi-close"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="routeToSignup()">New user? Sign up</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="primary" @click="login()" large>Login</v-btn>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>
<script>
import router from "../router/index";

export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      loginForm: {
        phoneNumber: "",
        phoneNumberPrefix: "+234",
      },
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      console.log("Logging in....");
      console.log(
        `${this.loginForm.phoneNumberPrefix}${this.loginForm.phoneNumber}`
      );
      this.$store.dispatch(
        "login",
        `${this.loginForm.phoneNumberPrefix}${this.loginForm.phoneNumber}`
      );
    },
    routeToSignup() {
      router.push("/signup");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>