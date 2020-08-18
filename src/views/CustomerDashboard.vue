<template>
  <v-container>
    <div class="mt-12" v-if="customersOrders.length != 0">
      <h3 class="ma-3 primary--text">Your History</h3>
      <div v-for="(order,i) in customersOrders" :key="i">
        <StateToState :customerOrder="order"></StateToState>
      </div>
    </div>
    <div class="mt-12" v-else>
      <v-alert>
        <p class="text-center">Your order history will appear here</p>
      </v-alert>
    </div>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import StateToState from "@/components/StateToState";

export default {
  name: "Customer",
  data() {
    return {

    };
  },
  components: {
    StateToState,
  },
  methods: {
    logCustomersOrders() {
      console.log(this.customersOrders);
    },
  },
  computed: {
    ...mapState(["customersOrders"]),
  },
  created() {
    this.$store.dispatch("getCustomersOrders");
  },
};
</script>
<style lang="scss" scoped>
</style>