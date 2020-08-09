<template>
  <v-form @submit.prevent>
    <v-container class="mt-12">
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
            label="Select State"
            clearable
          ></v-select>
          <v-text-field v-model.trim="form.departAddress" outlined label="Address" clearable></v-text-field>
          <p class="mt-2">To</p>
          <v-select
            v-model.trim="form.destState"
            chips
            prepend-inner-icon="mdi-map"
            :items="states"
            solo
            label="Select State"
            clearable
          ></v-select>
          <v-text-field v-model.trim="form.destAddress" outlined label="Address" clearable></v-text-field>
          <v-text-field v-model.trim="form.itemDesc" outlined label="Item Description" clearable></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <p class="mt-2">Image</p>
          <v-img v-if="pictureRef != ''" :src="pictureRef"></v-img>
          <v-file-input outlined show-size counter label="Driving License Image" @change="addImage"></v-file-input>
          <p class="mt-2">Tonnes</p>
          <v-row>
            <v-col cols="3" md>
              <v-btn @click="form.quantity--">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="6">
              <v-text-field v-model.trim="form.quantity" outlined></v-text-field>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <v-btn @click="form.quantity++">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <p class="mt-2">Price</p>
          <v-row>
            <v-col cols="3" md>
              <v-btn @click="form.price--">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="6">
              <v-text-field v-model.trim="form.price" outlined></v-text-field>
            </v-col>
            <v-spacer />
            <v-col cols="3">
              <v-btn @click="form.price++">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-btn large color="primary">Submit Order</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "CustomerAddOrder",
  data() {
    return {
      form: {
        departState: "",
        departAddress: "",
        destState: "",
        destAddress: "",
        itemDesc: "",
        itemImage: "",
        quantity: 0,
        price: 0,
      },
      pictureRef: "",
      imageData: "",
    };
  },
  methods: {
    showData() {
      console.log(this.userProfile);
      console.log(this.userType);
    },
    addImage(file) {
      this.imageData = file;
      this.itemImage = file.name;
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