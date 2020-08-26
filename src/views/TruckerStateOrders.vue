<template>
  <v-container class="mt-12">
    <div class="mt-12" v-if="stateOrders.length != 0">
      <h3 class="ma-3 primary--text">Orders from {{this.$route.params.state}} State</h3>
      <div v-for="(order,i) in stateOrders" :key="i">
        <StatesOrder :order="order"></StatesOrder>
      </div>
    </div>
    <div class="mt-12" v-else>
      <v-alert>
        <p class="text-center">Orders from {{this.$route.params.state}} will appear here</p>
      </v-alert>
    </div>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import StatesOrder from "@/components/StatesOrder";

export default {
  name: "StateOrders",
  components: {
    StatesOrder,
  },
  data() {
    return {};
  },
  methods: {
   
  },
  computed: {
    ...mapState(["stateOrders"]),
  },
  created() {
    this.$store.dispatch("getStateOrders", `${this.$route.params.state}`);
  },
};
</script>
<style lang="scss" scoped>
</style>