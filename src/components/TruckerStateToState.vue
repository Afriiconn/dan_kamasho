<template>
  <v-container>
    <TruckerOrderDetails v-if="showOrderDetails" :order="selectedOrder" @close="toggleOrderDetails"></TruckerOrderDetails>
    <v-card rounded class="mb-2" @click="toggleOrderDetails(truckerOrder)">
      <v-card-text>
        <v-row>
          <v-col>
            <div>
              <h3>
                <v-avatar color="primary">
                  <v-icon dark>mdi-arrow-down</v-icon>
                </v-avatar>
                {{truckerOrder.departState}}
              </h3>
            </div>
            <div>
              <h5>
                <v-icon>mdi-clock</v-icon>
                {{truckerOrder.timeStamp | formatDate}}
              </h5>
            </div>
          </v-col>
          <v-col>
            <div>
              <h3>
                <v-avatar color="primary">
                  <v-icon dark>mdi-arrow-up</v-icon>
                </v-avatar>
                {{truckerOrder.destState}}
              </h3>
            </div>
            <div>
              <h5>
                <!--<v-icon>mdi-clock</v-icon> Time-->
              </h5>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import TruckerOrderDetails from "@/components/TruckerOrderDetails";

export default {
  name: "TruckerStateToState",
  props:["truckerOrder"],
  data() {
    return {
      showOrderDetails: false,
      selectedOrder: {},
    };
  },
  components: {
    TruckerOrderDetails,
  },
  methods: {
    toggleOrderDetails(order) {
      this.showOrderDetails = !this.showOrderDetails;

      //if opening modal set selectedOrder, else clear
      if (this.showOrderDetails) {
        this.selectedOrder = order;
      } else {
        this.selectedOrder = {};
      }
    },
  },
  filters: {
    formatDate(val) {
      if (!val || val == undefined) {
        return "";
      }
      return val.toDate().toGMTString();
    },
  },
};
</script>
<style lang="scss" scoped>
</style>