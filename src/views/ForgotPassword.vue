<template>
  <v-layout align-center justify-center class="mt-5">
    <v-flex xs12 sm8 md4>
      <v-snackbar v-model="passwordUpdated">Password updated successfully!</v-snackbar>
      <v-card-title class="text-h5 text-center">Password Reset</v-card-title>
      <v-card-subtitle>We'll send you an SMS code to verify your account and then, you can choose a new password</v-card-subtitle>
      <v-card-text>
        <p>Enter your phone number:</p>
        <v-text-field
          label="Phone"
          prepend-icon="mdi-phone"
          v-model.trim="phoneNumber"
          :rules="phoneRules"
          outlined
          clearable
          type="phone"
          clear-icon="mdi-close"
        ></v-text-field>
        <v-alert v-if="notRegistered" type="info">Not a registered user! Proceed to SignUp</v-alert>
        <v-row>
          <v-btn v-if="notRegistered" text color="primary" class @click="routeToSignUp">Sign Up</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark color="primary" class="mr-3" id="send-code" @click="sendCode">Send Code</v-btn>
        </v-row>
        <div v-if="codeSent">
          <p>Enter the code sent to your phone:</p>
          <v-text-field
            label="OTP Code"
            prepend-icon="mdi-lock"
            v-model.trim="OTPCode"
            outlined
            clearable
            type="phone"
            clear-icon="mdi-close"
          ></v-text-field>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" class="mr-3" @click="verifyOTP">Verify</v-btn>
          </v-row>
        </div>
        <div v-if="codeVerified">
          <p>Enter new password:</p>
          <v-text-field
            label="New Password"
            prepend-icon="mdi-lock"
            v-model.trim="newPassword"
            :rules="passwordRules"
            outlined
            clearable
            type="password"
            clear-icon="mdi-close"
          ></v-text-field>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn dark color="primary" class="mr-3" @click="saveNewPassword">Submit</v-btn>
          </v-row>
        </div>
      </v-card-text>
    </v-flex>
  </v-layout>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import * as fb from "../firebase";

export default {
  name: "ForgotPassword",
  data() {
    return {
      phoneNumber: "",
      OTPCode: "",
      newPassword: "",
      phoneNumberPrefix: "+234",
      codeSent: false,
      codeVerified: false,
      notRegistered: false,
      isCustomer: true,
      passwordUpdated: false,
      phoneRules: [
        (v) => !!v || "Phone required",
        (v) => (v && v.length >= 11) || "Phone number must be 11 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password required",
        (v) => (v && v.length >= 6) || "Password must be atleast 6 digits",
      ],
      appVerifier: undefined,
    };
  },
  methods: {
    routeToSignUp() {
      this.$router.replace("/signup");
    },
    async sendCode() {
      let phoneNum = this.formattedphoneNumber;

      const trucker = await fb.truckersCollection.doc(phoneNum).get();
      const customer = await fb.customersCollection.doc(phoneNum).get();

      if (customer.exists) {
        this.isCustomer = true;
        this.sendCodeToNumber(phoneNum);
      } else if (trucker.exists) {
        this.isCustomer = false;
        this.sendCodeToNumber(phoneNum);
      } else {
        this.notRegistered = true;
      }
    },
    sendCodeToNumber(number) {
      this.codeSent = true;
      let appVerifier = this.appVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(number, appVerifier)
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
          vm.codeSent = false;
          vm.codeVerified = true;
        })
        .catch(function (error) {
          vm.verificationCodeError = true;
          console.log(error.message);
        });
    },
    saveNewPassword() {
      if (this.isCustomer) {
        fb.customersCollection
          .doc(this.formattedphoneNumber)
          .update({ password: this.newPassword })
          .then((_) => {
            this.passwordUpdated = true;
            setTimeout(() => {
              this.$router.replace("/login");
            }, 1000);
          })
          .catch((error) => {
            alert("Error updating password! Try again");
          });
      } else {
        fb.truckersCollection
          .doc(this.formattedphoneNumber)
          .update({ password: this.newPassword })
          .then((_) => {
            this.passwordUpdated = true;
            setTimeout(() => {
              this.$router.replace("/login");
            }, 1000);
          })
          .catch((error) => {
            alert("Error updating password! Try again");
          });
      }
    },
    initReCaptcha() {
      //Use invisible recaptcha from firebase documentation
      setTimeout(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "send-code",
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
  computed: {
    formattedphoneNumber() {
      return this.phoneNumberPrefix + this.phoneNumber.slice(1);
    },
  },
  created() {
    this.initReCaptcha();
  },
};
</script>
<style lang="scss" scoped>
</style>