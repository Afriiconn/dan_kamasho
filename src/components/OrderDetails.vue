<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title class="headline">Order Details</v-card-title>
      <v-card-text>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "OrderDetails",
  props: ["order"],
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>