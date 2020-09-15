<template>
<div>
  <div class="bg">
    <v-container>
      <img src="../assets/bg2.jpg">
      <v-row style="margin-top: 160px;">
        <v-col cols="12" md="6">
          <p class="text-h5 text-md-h3 font-weight-bold white--text">Africas No. 1 logistics market place. Bridging the gap between transporters and customers</p>
          <p class="white--text">Afriiconn Logistics makes your life easier by creating a robust network of logistics. Customers get their goods delivered. Truckers get a job. It's that simple.</p>
          <v-row>
            <v-col cols="5" md="3">
              <v-btn outlined rounded color="white">
                Read More
              </v-btn>
            </v-col>
            <v-col cols="5" md="3">
              <v-btn rounded color="primary">
                Get Started
              </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
  .bg{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);

    img{
      top:0;
      left: 0;
      width: 100%;
      height: 100vh;
      position: absolute;
      z-index:0;
    }
    
    p{
      position: relative;
      z-index: 2;
    }
  }

</style>