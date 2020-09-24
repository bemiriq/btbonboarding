<template>
  <div id="app">
    <a href='/users' v-if="$route.path!=='/bigscreen'"> <img alt="BTB  Logo" src="./assets/btb.png"> </a>
    
    <br/><br/><br/>

    <b-container v-if="$route.path!=='/bigscreen'">
      <b-row id="dateTimeDiv">

        <b-col lg="5">
          Beat The Bomb Site Operations (BTB Site Ops)
        </b-col>

        <b-col lg="3">
          Location: BROOKLYN
        </b-col>

        <b-col lg="2">
          Date: {{ todaydate }}
        </b-col>

        <b-col lg="2">
          <div id="time" v-html="time"></div>
        </b-col>

      </b-row>
    </b-container>

<!--       <div v-for="post in posts" :key="post.customerName">
                  <b-button block pill variant="outline-info" id="fetchButtonGap">
                    {{post.customerName}}
                  </b-button>
                </div> -->


    <!-- end of serch div -->
    <router-view></router-view>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
  import axios from 'axios';
  // import VueSignature from "vue-signature-pad";
  // import App from "./App";
  // import Vue from 'vue';
  import moment from 'moment';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },

  data(){
    return{
      posts: [],
      todaydate: moment().format('YYYY-MM-DD'),
      currenttime: moment().format('h:mm A'),
      state: true,
      AMPM : '',
      realTimeDisplay: Date.now(),
      interval: null
    }
  },


  methods:{

    showAllTime: function (){

      var arrivalDate = moment().format('YYYY-MM-DD');
      console.log(arrivalDate);

      axios.get("https://sandbox.xola.com/api/orders?seller=5e1f43c0c697353cf12979e7&items.arrival="+arrivalDate)
      .then(response => (this.posts = response.data.data));

    },

    /* the below function is for new time update */
    reset: function() {
      this.state = true;
      this.realTimeDisplay = Date.now();
    },
    pause: function() {
      this.state = false;
    },
    resume: function() {
      this.state = true;
    },
    updaterealTimeDisplay: function() {
      if (this.state == true) {
          this.realTimeDisplay = Date.now();
      }
    }
    /* end of time update */
  },

  mounted: function(){
    this.interval = setInterval(this.updaterealTimeDisplay, 1000);
  },

  computed: {

    time: function() {
      return this.hours + ":" + this.minutes + ":" + this.seconds +' '+this.ampm;
    },
    milliseconds: function() {
      return this.realTimeDisplay;
    },
    hours: function() {
      // var milli = this.milliseconds;
      // Doing the math
      // var hrs = Math.floor((milli / 3600000) % 24);
      // Using getHours()
      var hrs = new Date().getHours();

      if (hrs >= 13) { hrs = hrs - 12 }
      return hrs >= 10 ? hrs : '0' + hrs;

    },
    minutes: function() {
      var milli = this.milliseconds;
      var min = Math.floor((milli / 60000) % 60);
      return min >= 10 ? min : '0' + min;
    },
    seconds: function() {
      var milli = this.milliseconds;
      var sec = Math.ceil((milli % 60000) / 1000).toFixed(0);
      if (sec == 60) { sec = '0' }
      return sec >= 10 ? sec : '0' + sec;
    },

    ampm: function(){
      
      var hrs = new Date().getHours();

      if(hrs >= 12){
        return 'PM';
      }
      else{
        return 'AM';
      }
    }

  }

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
</style>
