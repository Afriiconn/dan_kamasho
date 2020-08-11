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
        <v-form @click.prevent ref='signinForm'>
          <p>Enter your phone number:</p>
          <v-text-field
            label="Phone"
            prepend-icon="mdi-phone"
            v-model.trim="loginForm.phoneNumber"
            :rules="phoneRules"
            outlined
            clearable
            type="phone"
            clear-icon="mdi-close"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="routeToSignup">New user? Sign up</v-btn>
        <v-spacer></v-spacer>
        <v-btn dark color="primary" @click="login" large>Login</v-btn>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>
<script>
import {mapState} from "vuex"

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        phoneNumber: "",
        phoneNumberPrefix: "+234",
      },
      phoneRules:[
        v => !!v || "Phone required",
        v => (v && v.length >= 11) || "Phone number must be 11 characters"
      ]
    };
  },
  methods: {
    login() {
      if(this.$refs.signinForm.validate()){
        this.$store.dispatch(
        "login",
        this.formattedphoneNumber
      );
      }
    },
    routeToSignup() {
      this.$router.push("/signup");
    },
  },
  computed:{
    ...mapState(["isLoading"]),
    formattedphoneNumber(){
      return this.loginForm.phoneNumberPrefix + this.loginForm.phoneNumber.slice(1,);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>