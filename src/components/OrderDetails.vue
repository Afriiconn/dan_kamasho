<template>
  <v-dialog v-model="showOrderDetails">
    <v-card v-if="Object.keys(order.acceptOrders) > 0">
      <v-card-title class="headline">Order Details</v-card-title>
      <v-card-subtitle>Trucker</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <h3>First Name</h3>
            <p>{{order.acceptOrders[acceptTruckersPhoneNumber].trucker.firstName}}</p>
          </v-col>
          <v-col cols="12" md="4">
            <h3>Last Name</h3>
            <p>{{order.acceptOrders[acceptTruckersPhoneNumber].trucker.lastName}}</p>
          </v-col>
          <v-col cols="12" md="4">
            <h3>Accepted Order</h3>
            <p>
              <v-icon color="success">mdi-check</v-icon>
            </p>
          </v-col>
        </v-row>
        <v-alert color="info" dark rounded>Accepted amount: {{order.price}}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else-if="Object.keys(order.rejectOrders) > 0">
      <v-card-title class="headline">Order Details</v-card-title>
      <v-card-subtitle>Trucker</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <h3>First Name</h3>
            <p>{{order.rejectOrders[rejectTruckersPhoneNumber].trucker.firstName}}</p>
          </v-col>
          <v-col cols="12" md="4">
            <h3>Last Name</h3>
            <p>{{order.rejectOrders[rejectTruckersPhoneNumber].trucker.lastName}}</p>
          </v-col>
          <v-col cols="12" md="4">
            <h3>Accepted Order</h3>
            <p>
              <v-icon color="error">mdi-cancel</v-icon>
            </p>
          </v-col>
        </v-row>
        <v-alert color="info" dark rounded>Proposed amount: {{order.rejectOrders[rejectTruckersPhoneNumber].amount}}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title class="headline">Order Details</v-card-title>
      <v-card-subtitle>Trucker</v-card-subtitle>
      <v-card-text>
        <v-alert color="info" dark rounded>No Trucker has accepted your order yet</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="error" @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "OrderDetails",
  props: ["order"],
  data() {
    return {
      showOrderDetails: true,
    };
  },
  computed: {
    acceptTruckersPhoneNumber() {
      return Object.keys(this.order.acceptOrders)[0];
    },
    rejectTruckersPhoneNumber() {
      return Object.keys(this.order.rejectOrders)[0];
    },
  },
};
</script>
<style lang="scss" scoped>
</style>