<template>
  <v-dialog v-model="showOrderInfo">
    <v-snackbar
      v-model="alreadyAccepted"
      color="info"
      dark
    >You have already accepted this order!</v-snackbar>
    <v-snackbar
      v-model="alreadyRejected"
      color="info"
      dark
    >You have already rejected this order!</v-snackbar>
    <v-snackbar v-model="saved">Successful!</v-snackbar>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col offset="4" cols="4">
            <v-img :src="itemPicture" max-width="200" min-height="200" contain></v-img>
            <h3 class="ma-2 text-center">{{order.itemDesc}}</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5" md="5">
            <h3 class="primary--text">{{order.departState}}</h3>
          </v-col>
          <v-col cols="2" md="2">
            <h5 class="primary--text">To</h5>
          </v-col>
          <v-col cols="5" md="5">
            <h3 class="primary--text">{{order.destState}}</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" md="6">Destination Address:</v-col>
          <v-col cols="6" md="6">{{order.destAddress}}</v-col>
        </v-row>
        <v-row>
          <v-col cols="6" md="6">Quantity:</v-col>
          <v-col cols="6" md="6">{{order.quantity}}</v-col>
        </v-row>
        <v-row>
          <v-col cols="6" md="6">Price:</v-col>
          <v-col cols="6" md="6">{{order.price}}</v-col>
        </v-row>
        <v-row v-if="rejected">
          <v-col cols="6" md="8">
            <v-text-field
              outlined
              placeholder="Enter your proposed amount"
              v-model.trim="rejectedAmount"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="4">
            <v-btn color="primary" dark @click="proposeAmount">Propose</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="error" @click="$emit('close')">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn large color="success" @click="acceptOrder">Accept</v-btn>
        <v-btn large color="error" @click="rejectOrder">Reject</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
import * as fb from "../firebase";

export default {
  name: "StateOrderInfo",
  props: ["order"],
  data() {
    return {
      showOrderInfo: true,
      alreadyAccepted: false,
      alreadyRejected: false,
      saved: false,
      rejected: false,
      itemPicture: "",
      rejectedAmount: 0,
    };
  },
  methods: {
    async getItemPicture() {
      const url = await fb.productImagesStorage
        .child(this.order.itemImage)
        .getDownloadURL();
      this.itemPicture = url;
    },
    acceptOrder() {
      if (this.userProfile.phoneAccount in this.order.acceptOrders) {
        this.alreadyAccepted = true;
      } else {
        this.order.acceptOrders[this.userProfile.phoneAccount] = {};
        this.order.acceptOrders[this.userProfile.phoneAccount][
          "trucker"
        ] = this.userProfile;
        this.order.acceptOrders[this.userProfile.phoneAccount][
          "amount"
        ] = this.rejectedAmount;

        fb.ordersCollection
          .doc(this.order.itemImage)
          .set(this.order)
          .then((_) => {
            this.saved = true;
            setTimeout(() => {
              this.$emit("close");
            }, 1000);
          });
      }
    },
    rejectOrder() {
      if (this.userProfile.phoneAccount in this.order.rejectOrders) {
        this.alreadyRejected = true;
      } else {
        this.rejected = true;
      }
    },
    proposeAmount() {
      this.order.rejectOrders[this.userProfile.phoneAccount] = {};
      this.order.rejectOrders[this.userProfile.phoneAccount][
        "trucker"
      ] = this.userProfile;

      fb.ordersCollection
        .doc(this.order.itemImage)
        .set(this.order)
        .then((_) => {
          this.saved = true;
          setTimeout(() => {
            this.$emit("close");
          }, 1000);
        });
    },
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  created() {
    this.getItemPicture();
  },
};
</script>
<style lang="scss" scoped>
</style>