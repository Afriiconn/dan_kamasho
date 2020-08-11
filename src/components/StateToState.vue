<template>
  <v-card rounded class="mb-3" @click="selectCurrent">
    <v-card-text>
      <v-row>
        <v-col>
          <div>
            <h3>
              <v-avatar color="primary">
                <v-icon dark>mdi-arrow-down</v-icon>
              </v-avatar> {{customerOrder.departState}}
            </h3>
          </div>
          <div>
            <h5>
              <v-icon>mdi-clock</v-icon> {{customerOrder.timeStamp | formatDate}}
            </h5>
          </div>
        </v-col>
        <v-col>
          <div>
            <h3>
              <v-avatar color="primary">
                <v-icon dark>mdi-arrow-up</v-icon>
              </v-avatar> {{customerOrder.destState}}
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
</template>
<script>
export default {
  name:'StateToState',
  props:['customerOrder'],
  data(){
    return{
      
    }
  },
  filters:{
    formatDate(val){
      if(!val || val == undefined){
        return ''
      }
      return val.toDate().toGMTString()
    }
  }
};
</script>
<style lang="scss" scoped>
</style>