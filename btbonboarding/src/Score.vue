<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <b-container class="bv-example-row" style="width: 80%; margin:auto;">
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item>
            <b-list-group-item href="#">Onboarding</b-list-group-item>
            <b-list-group-item href="#foobar">Waiting</b-list-group-item>
            <b-list-group-item href="#">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
            <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10" style="background-color:#fafafa;">
          <h3> UPDATE SCORE </h3>
          <hr/>
          <div style="margin-left: 20%;">
            
            <!-- <hr/> -->

             <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Team Name:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input id="input-small" size="sm" placeholder="Team Name" v-model="name"></b-form-input>
              </b-col>
            </b-row>

            <br/>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Room 1:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input id="input-small" size="sm" placeholder="Room 1 score" v-model="room1score"></b-form-input>
              </b-col>
            </b-row>
            <br/>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Room 2:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input id="input-small" size="sm" placeholder="Room 2 score" v-model="room2score"></b-form-input>
              </b-col>
            </b-row>
            <br/>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Room 3:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input id="input-small" size="sm" placeholder="Room 3 score" v-model="room3score"></b-form-input>
              </b-col>
            </b-row>
            <br/>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Room 4:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input id="input-small" size="sm" placeholder="Room 4 score" v-model="room4score"></b-form-input>
              </b-col>
            </b-row>
            <br/>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Bomb Room:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input id="input-small" size="sm" placeholder="Bomb Room score" v-model="brscore"></b-form-input>
              </b-col>
            </b-row>
            <br/>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-small">Total Score:</label>
              </b-col>
              <b-col sm="3">
                <b-form-input id="input-small" size="sm" placeholder="Total Score" v-model="totalscore"></b-form-input>
              </b-col>
            </b-row>
            <br/>
            <b-row class="my-1">
              <!-- <b-button variant="primary">Primary</b-button> -->
              <b-button variant="primary" @click="submitName()">UPDATE</b-button>
            </b-row>
          </div>
        </b-col>

      </b-row>
    </b-container>

    <div>
            <ul>
              <li v-for="getname of names" :key="getname['.key']">{{getname.names}}</li>
            </ul>
          </div>

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { namesRef } from './firebase';
// var firebase = require('firebase');
// var app = firebase.initializeApp({ ... });

export default {
  name: 'App',
  components: {
    // HelloWorld
  },

   data(){
    return{
      name: '',
      room1score: '',
      room2score: '',
      room3score: '',
      room4score: '',
      brscore: '',
      totalscore: ''
      // room1score: ''
    }
   },

   firebase: {
     names: namesRef
   },

   methods:{
    submitName(){
      namesRef.push({ name: this.name, room1score: this.room1score, room2score: this.room2score, room3score: this.room3score, room4score: this.room4score, brscore: this.brscore,totalscore: this.totalscore, edit: false})
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
  margin-top: 60px;
}
</style>
