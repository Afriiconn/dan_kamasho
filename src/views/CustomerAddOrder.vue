<template>
  <v-container class="mt-12 mx-5">
    <v-snackbar v-model="saved" top>Order successfully saved!</v-snackbar>
    <v-snackbar v-model="error" top multi-line>Oops! Something went wrong. Try again.</v-snackbar>
    <v-layout v-if="isLoading" justify-center align-center>
      <v-flex v-if="isLoading" xs12 sm8 md4>
        <v-container class="mx-auto my-auto">
          <v-row justify="center" align-content="center">
            <v-progress-circular color="primary" rotate indeterminate></v-progress-circular>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
    <v-form @submit.prevent v-else>
      <v-row>
        <v-col cols="12" md="6">
          <h2>Add a new order</h2>
          <p class="mt-2">From</p>
          <v-select
            v-model.trim="form.departState"
            chips
            prepend-inner-icon="mdi-map"
            :items="states"
            solo
            :rules="rules.textRules"
            label="Select State"
            clearable
          ></v-select>
          <v-text-field
            v-model.trim="form.departAddress"
            :rules="rules.textRules"
            outlined
            label="Address"
            clearable
          ></v-text-field>
          <p class="mt-2">To</p>
          <v-select
            v-model.trim="form.destState"
            chips
            prepend-inner-icon="mdi-map"
            :items="states"
            :rules="rules.textRules"
            solo
            label="Select State"
            clearable
          ></v-select>
          <v-text-field
            v-model.trim="form.destAddress"
            :rules="rules.textRules"
            outlined
            label="Address"
            clearable
          ></v-text-field>
          <v-text-field
            v-model.trim="form.itemDesc"
            :rules="rules.textRules"
            outlined
            label="Item Description"
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <p class="mt-2">Image</p>
          <v-img v-if="pictureRef != ''" :src="pictureRef" width="200" height="200" contain></v-img>
          <v-file-input
            outlined
            show-size
            counter
            label="Image of Goods"
            @change="addImage"
          ></v-file-input>
          <p class="mt-2">Tonnes</p>
          <v-row>
            <v-col cols="3" md>
              <v-btn @click="decrementQuantity">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="6">
              <v-text-field :rules="rules.textRules" v-model.trim="form.quantity" outlined></v-text-field>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <v-btn @click="incrementQuantity">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <p class="mt-2">Price</p>
          <v-row>
            <v-col cols="3" md>
              <v-btn @click="decrementPrice">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="6">
              <v-text-field :rules="rules.textRules" v-model.trim="form.price" outlined></v-text-field>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <v-btn @click="incrementPrice">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn @click="submitOrder" large color="primary">Submit Order</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import * as fb from "../firebase";
import firebase from 'firebase/app'
import OrderDetailsVue from '../components/OrderDetails.vue';

export default {
  name: "CustomerAddOrder",
  data() {
    return {
      isLoading: false,
      saved: false,
      error: false,
      form: {
        departState: "",
        departAddress: "",
        destState: "",
        destAddress: "",
        itemDesc: "",
        itemImage: "",
        quantity: 1,
        price: 1,
      },
      pictureRef: "",
      imageData: "",
      rules: {
        textRules: [(v) => !!v || "Required"],
      },
    };
  },
  methods: {
    async addImage(file) {
      this.imageData = file;
      this.form.itemImage = Date.now().toString();
      const storageRef = await fb.productImagesStorage
        .child(this.form.itemImage)
        .put(this.imageData);
      const downloadURL = await storageRef.ref.getDownloadURL();
      this.pictureRef = downloadURL;
    },
    async submitOrder() {
      this.isLoading = true;
      const userPhone = this.userProfile.phoneAccount;
      const orderDocument = {
        acceptOrders: {},
        rejectOrders: {},
        customerOrders: {},
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        departAddress: this.form.departAddress,
        departState: this.form.departState,
        destAddress: this.form.destAddress,
        destState: this.form.destState,
        itemDesc: this.form.itemDesc,
        itemImage: this.form.itemImage,
        price: parseFloat(this.form.price),
        quantity: parseFloat(this.form.quantity),
        timeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      orderDocument.customerOrders[userPhone] = {};
      orderDocument.customerOrders[userPhone]['customer'] = this.userProfile

      fb.ordersCollection
        .doc(this.form.itemImage)
        .set(orderDocument)
        .then((_) => {
          this.saved = true;
          setTimeout(() => {
            this.isLoading = false;
            this.$router.push("/customer");
          }, 1000);
        })
        .catch((error) => {
          this.error = true;
          setTimeout(() => {
            this.isLoading = false;
            this.$router.push("/customer-add-order");
          }, 1000);
        });
    },
    incrementQuantity() {
      this.form.quantity++;
    },
    decrementQuantity() {
      this.form.quantity == 1 ? this.form.quantity : this.form.quantity--;
    },
    incrementPrice() {
      this.form.price++;
    },
    decrementPrice() {
      this.form.price == 1 ? this.form.price : this.form.price--;
    },
  },
  computed: {
    ...mapState(["userProfile", "userType", "states"]),
    userName() {
      return `${this.userProfile.firstName} ${this.userProfile.lastName}`;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>