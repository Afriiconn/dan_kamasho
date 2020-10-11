<template>
  <v-row class="order">
    <v-col>
      <p>{{state.departState}}</p>
    </v-col>
    <v-col>
      <p class="text-center">
        <v-icon color="primary">mdi-arrow-right</v-icon>
      </p>
    </v-col>
    <v-col>
      <p class="text-right">{{state.destState}}</p>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "HomeStateOrder",
  props: ["state"],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.order {
  transition: ease 1s;
  animation: fadeIn ease 2s;
}
.order:hover {
  transform: scaleX(1.1) scaleY(1.2);
}

@keyframes fadeIn {
  0%{opacity: 0;}
  100%{opacity: 1;}
}
</style>
