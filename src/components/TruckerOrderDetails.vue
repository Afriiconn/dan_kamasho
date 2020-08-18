<template>
  <v-dialog v-model="showOrderDetails">
    <v-card v-if="Object.keys(order.acceptOrders) > 0">
      <v-card-title class="headline">Order Details</v-card-title>
      <v-card-subtitle>Trucker</v-card-subtitle>
      <v-card-text>
        <h3 class="mb-3">You accepted this order</h3>
        <v-alert color="info" dark rounded>Accepted amount: {{order.price}}</v-alert>
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
  name: "TruckerOrderDetails",
  props: ["order"],
  data() {
    return {
      showOrderDetails: true,
    };
  },
  computed: {
    
  },
};
</script>
<style lang="scss" scoped>
</style>