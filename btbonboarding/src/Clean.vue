<template>
  <div id="app" style="width: 80%; margin:auto;">

    <br><br>

    <div>
      <b-row>
        <b-col lg="2">
          <!-- start of the left div which has navigation menu -->
          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Activeteams" active>Active Teams</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="/#/Social">Team Summary</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>
          <!-- end of navigation menu on left side -->
        </b-col>

        <b-col lg="10">

          <b-row>
            <b-col lg="6"><p class="teamTitle1">EMPTY PAGE</p></b-col>
          </b-row>

        </b-col>
      </b-row>
    </div>


    <br/>
    <br/>

    <div class="bv-example-row" style="width:auto;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

      <b-row>
        <b-col><a href="/#/Onboardingtest">Onboarding Test</a></b-col>
        <b-col><a href="/#/Dashboard">Dashboard</a></b-col>
        <b-col><a href="/#/Teamwaiting">Waitlist</a></b-col>
        <b-col><a href="/#/controlroom">Control Room</a></b-col>
        <b-col><a href="/#/Rfid">Check Rfid</a></b-col>
        <b-col><a href="/#/Scanmedia">Photobomb Rfid</a></b-col>
        <b-col>Photo Bomb</b-col>
        <b-col><a href="/#/Customers">Update Profile</a></b-col>
        <b-col>Bomb Vision</b-col>
        <b-col>Support</b-col>
        <b-col><a href="https://docs.google.com/document/u/3/?tgif=c" target="_blank">EOD</a></b-col>
        <!-- <b-col> | </b-col> -->
        <b-col><a href="https://joinhomebase.com/" target="_blank">Homebase</a></b-col>
        <b-col><a href="https://xola.com/_public/login.html" target="_blank">Xola</a></b-col>
        <b-col><a href="https://squareup.com/login" target="_blank">Square</a></b-col>

      </b-row>

    </div>

    <br/>


  </div>
</template>

<script>

// import axios from 'axios';
// import moment from 'moment';

export default {
  name: 'App',
  components: {
      // HelloWorld
    },

    data(){
      return{
        teamname: [],
      }
    },

    mounted: function(){

    }

  };

  </script>

  <style>

  @import url(//db.onlinewebfonts.com/c/4f0c82bb2e8fb2d03bd14a1137235ef3?family=Pixel+Digivolve+Cyrillic);

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .teamTitle1{
    color: black;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: right;
    font-size: 2em;
  }

  .teamList{
    color: black;
    text-align: center;
    font-size: 0.4em;
  }

  .detailsText{
    color: black;
    font-size: 17px;
    padding-left: 20%;
    text-transform:uppercase;
    text-align:left;
  }

  .borderless tr td {
    border: none !important;
    padding: 0px !important;
  }

  </style>
