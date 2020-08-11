<template>
  <v-container>
    <div class="mt-12" v-if="customersOrders">
      <h3 class="ma-3 primary--text" @click="logCustomersOrders">Your History</h3>
      <div v-for="(order,i) in customersOrders" :key="i">
        <StateToState :customerOrder="order" @click="toggleOrderDetails(order)"></StateToState>
      </div>
    </div>
    <div class="mt-12" v-else>
     <h2 class="text-center font-weight-regular">Your order history will appear here</h2>
    </div>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import AppBarLogged from "@/components/AppBarLogged";
import StateToState from "@/components/StateToState";

export default {
  name: "Customer",
  data(){
    return{
      showOrderDetails:false,
      selectedOrder:{},
    }
  },
  components: {
    StateToState,
  },
  methods:{
    logCustomersOrders(){
      console.log(this.customersOrders)
    },
    toggleOrderDetails(order){
      this.showOrderDetails = !this.showOrderDetails;

      //if opening modal set selectedOrder, else clear
      if (this.showOrderDetails) {
        this.selectedOrder = order;
      } else {
        this.selectedOrder = {};
      }
    }
  },
  computed: {
    ...mapState(["userProfile", "userType", "states","customersOrders"]),
  },
  created(){
    this.$store.dispatch('getCustomersOrders')
  }
};
</script>
<style lang="scss" scoped>
</style>