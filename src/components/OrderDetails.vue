<template>
  <v-dialog v-model="show">
    <v-card>
      <v-card-title class="headline">Use Google's location service?</v-card-title>

      <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

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