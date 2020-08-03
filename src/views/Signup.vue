<template>
  <v-container class="mt-12">
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          elevation="12"
          class="pa-5"
          :class="{'primary white--text' : isCustomer}"
          @click="toggleCustomer()"
        >
          <v-img
            src="../assets/customer.jpg"
            alt="Customer-Logo"
            contain
            max-height="200"
          ></v-img>
          <v-spacer></v-spacer>
          <h5 class="text-h5 text-center">Customer</h5>
        </v-card>
        <v-container>
          <v-spacer></v-spacer>
        </v-container>
        <v-card
          elevation="12"
          class="pa-5"
          :class="{'primary white--text' : !isCustomer}"
          @click="toggleTrucker()"
        >
          <v-img
            src="../assets/trucker.jpg"
            alt="Trucker-Logo"
            contain
            max-height="200"
          ></v-img>
          <v-spacer></v-spacer>
          <h5 class="text-h5 text-center">Trucker</h5>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded class="pa-3" v-show="isCustomer" id="customer-form">
          <v-card-title class="text-center text-h5">Customer Registration</v-card-title>
          <v-card-text>
            <v-form @submit.prevent>
              <p>Please fill in your details:</p>
              <v-text-field
                label="First Name"
                v-model="customerForm.firstName"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="customerForm.lastName"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-text-field
                label="Address"
                v-model="customerForm.address"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="routeToLogin()">Existing user? Log in</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" @click="loginUser()" large>Signup</v-btn>
          </v-card-actions>
        </v-card>
        <v-card rounded class="pa-4" v-show="!isCustomer" id="trucker-form">
          <v-card-title class="text-center text-h5">Trucker Registration</v-card-title>
          <v-card-text>
            <v-form @submit.prevent>
              <p>Please fill in your details:</p>
              <v-text-field
                label="First Name"
                v-model="truckerForm.firstName"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="truckerForm.lastName"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-text-field
                label="Address"
                v-model="truckerForm.address"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-img :src="truckerForm.licenseImageUrl" alt="Uploaded License Image"></v-img>
              <v-file-input
                outlined
                show-size
                counter
                label="Driving License Image"
                @change="addImage"
              ></v-file-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="routeToLogin()">Existing user? Log in</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" @click="loginUser()" large>Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import router from "../router/index";

export default {
  name: "SignUp",
  data() {
    return {
      isCustomer: true,
      customerForm: {
        firstName: "",
        lastName: "",
        address: "",
      },
      truckerForm: {
        firstName: "",
        lastName: "",
        address: "",
        licenseImageUrl: "",
      },
    };
  },
  methods: {
    routeToLogin() {
      router.push("/login");
    },
    toggleCustomer() {
      this.isCustomer = true;
      this.$vuetify.goTo("#customer-form");
    },
    toggleTrucker() {
      this.isCustomer = false;
      this.$vuetify.goTo("#trucker-form");
    },
    addImage(file) {
      console.log(file);
      //this.licenseImageUrl = file.name
    },
  },
};
</script>
<style lang="scss" scoped>
</style>