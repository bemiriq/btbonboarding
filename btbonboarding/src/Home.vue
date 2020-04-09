<template>
  <div id="app">
    <a href='/'> <img alt="BTB  Logo" src="./assets/btb.png"> </a>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    
    <br/><br/><br/>

    <b-container>
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
          Time: {{ currenttime }}
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
      currenttime: moment().format('h:mm A')
    }
  },


  methods:{

    showAllTime: function (){

      var arrivalDate = moment().format('YYYY-MM-DD');
      console.log(arrivalDate);

      axios.get("https://sandbox.xola.com/api/orders?seller=5e1f43c0c697353cf12979e7&items.arrival="+arrivalDate)
      .then(response => (this.posts = response.data.data));

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
