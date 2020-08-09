<template>
  <div></div>
</template>
<script>
import { mapState } from "vuex";
import AppBarLogged from '../components/AppBarLogged'

export default {
  name: "Customer",
  components:{
    AppBarLogged
  },
  computed: {
    ...mapState(["userProfile", "userType"]),
  },
};
</script>
<style lang="scss" scoped>
</style>