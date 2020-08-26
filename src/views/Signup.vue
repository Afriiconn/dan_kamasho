<template>
  <v-container class="mt-12">
    <v-dialog v-model="sentOTP" persistent max-width="300" id="recaptcha-container">
      <v-card>
        <v-card-title>Enter the OTP sent to your phone</v-card-title>
        <v-card-text>
          <v-text-field
            label="OTP Code"
            v-model="OTPCode"
            outlined
            clearable
            type="text"
            clear-icon="mdi-close"
          ></v-text-field>
          <v-alert type="error" dense v-if="verificationCodeError">Incorrect Verification Code</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="sentOTP = !sentOTP">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="verifyOTP">Verify</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          elevation="12"
          class="pa-5"
          :class="{'primary white--text' : isCustomer}"
          @click="toggleCustomer"
        >
          <v-img src="../assets/customer.jpg" alt="Customer-Logo" contain max-height="200"></v-img>
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
          @click="toggleTrucker"
        >
          <v-img src="../assets/trucker.jpg" alt="Trucker-Logo" contain max-height="200"></v-img>
          <v-spacer></v-spacer>
          <h5 class="text-h5 text-center">Trucker</h5>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded class="pa-3" v-show="isCustomer" id="customer-form">
          <v-card-title class="text-center text-h5">Customer Registration</v-card-title>
          <v-card-text>
            <v-form @submit.prevent ref="custForm">
              <p>Please fill in your details:</p>
              <v-text-field
                label="First Name"
                v-model="customerForm.firstName"
                :rules="rules.textRules"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
                required
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="customerForm.lastName"
                :rules="rules.textRules"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
                required
              ></v-text-field>
              <v-text-field
                label="Phone Number"
                placeholder="e.g +2348030000000"
                v-model.trim="customerForm.phone"
                :rules="rules.phoneRules"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
                required
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model.trim="customerForm.password"
                :rules="rules.passwordRules"
                outlined
                clearable
                type="password"
                clear-icon="mdi-close"
                required
              ></v-text-field>
              <v-text-field
                label="Address"
                v-model="customerForm.address"
                :rules="rules.textRules"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-alert v-if="isAlreadyRegistered" type="info">Already Registered! Proceed to Login</v-alert>
          <v-card-actions>
            <v-btn text color="primary" @click="routeToLogin">Existing user? Log in</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" @click="signUpCustomer" large>Signup</v-btn>
          </v-card-actions>
        </v-card>
        <v-card rounded class="pa-4" v-show="!isCustomer" id="trucker-form">
          <v-card-title class="text-center text-h5">Trucker Registration</v-card-title>
          <v-card-text>
            <v-form @submit.prevent ref="truckerForm">
              <p>Please fill in your details:</p>
              <v-text-field
                label="First Name"
                v-model="truckerForm.firstName"
                :rules="rules.textRules"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-text-field
                label="Last Name"
                v-model="truckerForm.lastName"
                :rules="rules.textRules"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-text-field
                label="Phone Number"
                v-model.trim="truckerForm.phone"
                :rules="rules.phoneRules"
                placeholder="e.g +2348030000000"
                outlined
                clearable
                type="text"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model.trim="truckerForm.password"
                :rules="rules.passwordRules"
                outlined
                clearable
                type="password"
                clear-icon="mdi-close"
              ></v-text-field>
              <v-text-field
                label="Address"
                v-model="truckerForm.address"
                :rules="rules.textRules"
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
            <v-btn text color="primary" @click="routeToLogin">Existing user? Log in</v-btn>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" @click="signUpTrucker" large>Signup</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import * as fb from "../firebase";

export default {
  name: "SignUp",
  data() {
    return {
      isCustomer: true,
      sentOTP: false,
      OTPCode: "",
      verificationCodeError: false,
      customerForm: {
        firstName: "",
        lastName: "",
        phone: "",
        password:"",
        address: "",
      },
      truckerForm: {
        firstName: "",
        lastName: "",
        phone: "",
        password:"",
        address: "",
        licenseImageUrl: "",
      },
      licenseImage: null,
      rules: {
        textRules: [(v) => !!v || "Required"],
        phoneRules: [
          (v) => !!v || "Phone number is required",
          (v) => (v && v.length == 14) || "Phone number must be 14 characters",
        ],
        passwordRules:[
          (v) => !!v || "Password is required",
          (v) => (v && v.length >= 8) || "Password must be atleast 8 characters"
        ]
      },
      appVerifier: undefined,
      isAlreadyRegistered: false,
    };
  },
  methods: {
    routeToLogin() {
      this.$router.push("/login");
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
      this.truckerForm.licenseImageUrl = Date.now().toString();
      this.licenseImage = file;
    },
    async signUpCustomer() {
      if (this.$refs.custForm.validate()) {
        const customer = await fb.customersCollection
          .doc(this.customerForm.phone)
          .get();

        if (customer.exists) {
          this.isAlreadyRegistered = true;
        } else {
          this.sendOTP(this.customerForm.phone);
          this.sentOTP = true;
        }
      }
    },
    async signUpTrucker() {
      if (this.$refs.truckerForm.validate()) {
        const trucker = await fb.truckersCollection
          .doc(this.truckerForm.phone)
          .get();

        if (trucker.exists) {
          this.isAlreadyRegistered = true;
        } else {
          this.sendOTP(this.truckerForm.phone);
          this.sentOTP = true;
        }
      }
    },
    sendOTP(number) {
      let appVerifier = this.appVerifier;

      let phoneNum = number;

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNum, appVerifier)
        .then(function (confirmationResult) {
          window.confirmationResult = confirmationResult;
          alert("OTP SMS Sent");
        })
        .catch(function (error) {
          alert("SMS not sent! Try Again");
        });
    },
    verifyOTP() {
      let vm = this;
      window.confirmationResult
        .confirm(this.OTPCode)
        .then(function (result) {
          if (vm.isCustomer) {
            vm.$store.dispatch("signUpCustomer", {
              firstName: vm.customerForm.firstName,
              lastName: vm.customerForm.lastName,
              phoneAccount: vm.customerForm.phone,
              password: vm.customerForm.password,
              address: vm.customerForm.address,
            });
            vm.sentOTP = false;
          } else {
            fb.licenseImagesStorage
              .child(vm.truckerForm.licenseImageUrl)
              .put(vm.licenseImage)
              .then((snapshot) => {
                vm.$store.dispatch("signUpTrucker", {
                  firstName: vm.truckerForm.firstName,
                  lastName: vm.truckerForm.lastName,
                  phoneAccount: vm.truckerForm.phone,
                  password: vm.truckerForm.password,
                  address: vm.truckerForm.address,
                  licenseImage: vm.truckerForm.licenseImageUrl
                });
                vm.sentOTP = false;
              });
          }
        })
        .catch(function (error) {
          vm.verificationCodeError = true;
          console.log(error.message);
        });
    },
    initReCaptcha() {
      setTimeout(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function (response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": function () {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            },
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
  },
  computed: {},
  created() {
    this.initReCaptcha();
  },
};
</script>
<style lang="scss" scoped>
</style>