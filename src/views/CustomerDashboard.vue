<template>
  <v-container >
    <v-btn @click="showData()">Show Data</v-btn>
  </v-container>
  
</template>
<script>
import {mapState} from 'vuex'

export default {
  name:'Customer',
  data(){
    return{

    }
  },
  methods:{
    showData(){
      console.log(this.userProfile)
      console.log(this.userType)
    }
  },
  computed:{
    ...mapState(['userProfile','userType'])
  }
  
}
</script>
<style lang="scss" scoped>

</style>