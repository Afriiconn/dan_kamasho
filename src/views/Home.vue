<template>
  <div>
    <div class="bg" id="home">
      <v-container>
        <v-row style="margin-top: 160px;">
          <v-col cols="12" md="6">
            <p
              class="text-h5 text-md-h3 font-weight-bold white--text"
            >Africas No. 1 logistics market place. Bridging the gap between transporters and customers</p>
            <p
              class="white--text"
            >Afriiconn Logistics makes your life easier by creating a robust network of logistics. Customers get their goods delivered. Truckers get a job. It's that simple.</p>
            <v-row>
              <v-col cols="5" md="3">
                <v-btn outlined rounded color="white" @click="toServices">Read More</v-btn>
              </v-col>
              <v-col cols="5" md="3">
                <router-link to="/login" class="text-decoration-none">
                  <v-btn rounded color="primary">Get Started</v-btn>
                </router-link>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <main id="services">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="8" class="mx-auto text-center">
            <h2
              class="primary--text font-weight-medium"
            >Africas No. 1 logistics market place. Bridging the gap between transporters and customers</h2>
            <p
              class
            >Afriiconn Logistics makes your life easier by creating a robust network of logistics. Customers get their goods delivered. Truckers get a job. It's that simple.</p>
          </v-col>
        </v-row>
        <h3 class="primary--text text-h4 text-center font-weight-bold pb-5">Benefits</h3>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="4" class="text-center">
            <p>
              <v-icon color="primary" size="48">mdi-gesture-tap</v-icon>
            </p>
            <p class="font-weight-medium">Easy Operation</p>
            <p>Our strategic and seamless system makes delivery easier and simpler</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="4" class="text-center">
            <p>
              <v-icon color="primary" size="48">mdi-hand-okay</v-icon>
            </p>
            <p class="font-weight-medium">Best Prices</p>
            <p>Get the best affordable prices for your goods being transported by several excellent transporters</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="4" class="text-center">
            <p>
              <v-icon color="primary" size="48">mdi-cash-multiple</v-icon>
            </p>
            <p class="font-weight-medium">Increased Income</p>
            <p>More money in your pockets. Bid and win by giving the best rate. Keep your trucks busy</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="4" class="text-center">
            <p>
              <v-icon color="primary" size="48">mdi-radar</v-icon>
            </p>
            <p class="font-weight-medium">Real Time Tracking</p>
            <p>Track your goods via GIS. Know where the truck and hence, your goods are</p>
          </v-col>

          <v-col cols="12" md="4" class="text-center">
            <p>
              <v-icon color="primary" size="48">mdi-thumb-up</v-icon>
            </p>
            <p class="font-weight-medium">Good In Transit Insurance</p>
            <p>Therefore, your goods are safe with us</p>
          </v-col>
        </v-row>
        <h3 class="primary--text text-h4 text-center font-weight-bold py-5">How It Works</h3>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="3" class="text-center">
            <p>
              <v-icon color="primary" size="32">mdi-numeric-1-circle</v-icon>
            </p>
            <p>Truckers - register your trucks and earn a living with ease and comfort</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" class="text-center">
            <p>
              <v-icon color="primary" size="32">mdi-numeric-2-circle</v-icon>
            </p>
            <p>Customers - register your goods and get them transported in ease</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" class="text-center">
            <p>
              <v-icon color="primary" size="32">mdi-numeric-3-circle</v-icon>
            </p>
            <p>Get a transporter to move your goods to your desired location in no time</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" class="text-center">
            <p>
              <v-icon color="primary" size="32">mdi-numeric-4-circle</v-icon>
            </p>
            <p>Cut out the hassle/ inconvenience of middle men</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" class="text-center">
            <p>
              <v-icon color="primary" size="32">mdi-numeric-5-circle</v-icon>
            </p>
            <p>Get in touch with transporters and customers directly at all times</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" md="3" class="text-center">
            <p>
              <v-icon color="primary" size="32">mdi-numeric-6-circle</v-icon>
            </p>
            <p>Search for already available jobs from your location</p>
          </v-col>
        </v-row>
        <h3 class="primary--text text-h4 text-center font-weight-bold py-5">Available Orders</h3>
        <v-divider></v-divider>
        <v-row v-for="(state,i) in homeOrders" :key="i" @click="toLogin" style="cursor:pointer" class="order">
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
        <p class="text-center my-6 ">
          <router-link to="/login">
            <v-btn outlined color="primary" class="last-button">Get Started</v-btn>
          </router-link>
        </p>
        <v-divider></v-divider>
      </v-container>
    </main>
    <v-footer color="grey-lighten-500" class="footer">
      <v-row>
        <v-col cols="12" md="3">
          <p></p>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="3" class="text-center">
          <a :href="instagram_link">
            <v-icon>mdi-instagram</v-icon>
          </a>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" md="3" class="text-right">
          <p>Contact Address:</p>
          <p>81 Sen Isa Kachako Street, Farm Centre,</p>
          <p>Kano, Kano State</p>
          <p>+234-902-897-9534</p>
          <p>
            <a href="mailto:afriicon@gmail.com">afriicon@gmail.com</a>
          </p>
          <p>&copy;2020 Afriiconn Logistics</p>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>
<script>
import { mapState } from "vuex";
document.title = "Afriiconn - Africa's No. 1 Logistics Company";
export default {
  name: "Home",
  data() {
    return {
      instagram_link: "https://instagram.com/afriiconnlogistics",
    };
  },
  methods: {
    toServices() {
      this.$vuetify.goTo("#services");
      console.log(this.homeOrders);
    },
    toHome() {
      this.$vuetify.goTo("#home");
    },
    toLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState(["homeOrders"]),
  },
  created() {
    this.$store.dispatch("getOrders");
  },
};
</script>
<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(../assets/bg2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.order, .last-button{
  transition: ease 1s
}
.order:hover{
  transform: scaleX(1.1) scaleY(1.2)
}

.last-button:hover{
  transform: scale(1.2)
}
main {
  p {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
  a{
    text-decoration: none;
  }
}

.footer {
  p {
    font-size: 0.7rem;
  }
  a {
    text-decoration: none;
  }
}
</style>