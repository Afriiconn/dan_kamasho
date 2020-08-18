<template>
  <v-container class="mt-12">
    <v-tabs icons-and-text fixed-tabs>
      <v-tabs-slider></v-tabs-slider>
      <v-tab>
        History
        <v-icon>mdi-clock</v-icon>
      </v-tab>
      <v-tab>
        States
        <v-icon>mdi-map</v-icon>
      </v-tab>
      <v-tab-item>
        <div v-if="truckersAcceptedOrders.length != 0">
          <h3 class="ma-3 primary--text">Your History</h3>
          <div v-for="(order,i) in truckersAcceptedOrders" :key="i">
            <TruckerStateToState :truckerOrder="order"></TruckerStateToState>
          </div>
        </div>
        <div class="mt-12" v-else>
          <v-alert>
            <p class="text-center">Your order history will appear here</p>
          </v-alert>
        </div>
      </v-tab-item>
      <v-tab-item>
        <v-list>
          <v-list-item
            v-for="(state,i) in states"
            :key="i"
            ripple
            @click="routeToState(state)"
          >{{state}}</v-list-item>
        </v-list>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import TruckerStateToState from "@/components/TruckerStateToState";

export default {
  name: "Trucker",
  components: {
    TruckerStateToState,
  },
  data() {
    return {
      showOrderDetails: false,
      selectedOrder: {},
    };
  },
  methods: {
    routeToState(state) {
      this.$router.push(`/trucker-state-order/${state}`);
    },
  },
  computed: {
    ...mapState([
      "userProfile",
      "userType",
      "states",
      "truckersAcceptedOrders",
    ]),
  },
  created() {
    this.$store.dispatch("getTruckersAcceptedOrders");
  },
};
</script>
<style lang="scss" scoped>
</style>