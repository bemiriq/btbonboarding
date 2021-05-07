<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <b-modal id="modal-teamMedia" centered size="xl" title="Profile" v-bind:hide-footer="true">
    <h4>Team {{team_name}}</h4>
    <table class="table">
      <tr>
        <td style="width:10%;">{{teamMedia0}}</td>
        <!-- <img v-bind:src="teamMedia0" /> -->
        <img v-bind:src="(teamMedia4)" />
        <figure class="media"><iframe v-bind:src="(teamMedia0)"></iframe></figure>
        <figure class="media"><iframe v-bind:src="(teamMedia4)"></iframe></figure>
        <figure class="media"><iframe v-bind:src="(teamMedia1)"></iframe></figure>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia1}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia2}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia3}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia4}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia5}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia6}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia7}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia8}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia9}}</td>
      </tr>
    </table>
  </b-modal>

    <div class="bv-example-row" style="width: 80%;margin:auto;">
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="/#/Social" active>Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->


        <!-- SIDE A status screen -->
        <!-- start of right div which consists of table with all details -->
        <!-- <b-col lg="10" style="background-color:#fafafa; font-weight: bold;" v-show="sideAdiv"> -->
          <b-col lg="10">
          <b-row>
            <b-col>
              <p class="teamTitle1">TEAM DETAILS</p>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <!-- <b-col lg="3">
              <b-input-group class="mb-1">
                <b-form-input id="example-input" v-model="dateClicked" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
                <b-input-group-append>
                  <b-form-datepicker v-model="dateClicked" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
                </b-input-group-append>
              </b-input-group>
            </b-col>

            <b-col lg="3">
              <b-input-group class="mb-1">
                <b-form-input id="example-input" v-model="dateClickedEndDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
                <b-input-group-append>
                  <b-form-datepicker v-model="dateClickedEndDate" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
                </b-input-group-append>
              </b-input-group>
            </b-col> -->

            
          <b-col lg="3">
            <b-input-group size="md">
            <b-form-input id="input-large" size="md" placeholder="Search here ... " v-on:change="searchTeam($event)" v-model="searchedText"></b-form-input>

            </b-input-group>
          </b-col>

            <b-col lg="3">
              <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
            </b-col>
          </b-row>


          <b-col>
              <!-- opended pagination div -->
              <div class="overflow-auto">
                <b-table id="my-table" :items="searchTeamName" :per-page="perPage" :current-page="currentPage" medium :fields="fields" style="text-align:left;">
                  
                  <template #cell(team_name)="data">
                    <a href="#" @click="teamNameClicked(data.item.session_id)" style="text-transform:capitalize;">{{data.item.team_name}}</a>
                  </template>
                  
                  
                </b-table>
              </div>
              <!-- end of pagination div -->
            </b-col>

          <!-- try pagination -->

        </b-col>
      </b-row>
    </div>

    

    <br/>
    <br/>

        <div class="bv-example-row" style="width:80%;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

          <b-row>
            <b-col><a href="/#/Onboardingtest">Onboarding Test</a></b-col>
            <!-- <b-col><a href="/#/Print">Print Score</a></b-col> -->
            <b-col>On Deck</b-col>
            <!-- <b-col>Room Status</b-col> -->
            <b-col>CCTV</b-col>
            <b-col><a href="/#/controlroom">Control Room</a></b-col>
            <b-col>Photo Bomb</b-col>
            <b-col>Bomb Vision</b-col>
            <b-col>Stats</b-col>
            <b-col>Support</b-col>
            <b-col><a href="https://docs.google.com/document/u/3/?tgif=c" target="_blank">EOD</a></b-col>
            <b-col>Photo Bomb</b-col>
            <!-- <b-col> | </b-col> -->
            <b-col><a href="https://joinhomebase.com/" target="_blank">Homebase</a></b-col>
            <b-col><a href="https://xola.com/_public/login.html" target="_blank">Xola</a></b-col>
            <b-col><a href="https://squareup.com/login" target="_blank">Square</a></b-col>

          </b-row>

        </div>

    <br/>

  </div>
</template>

<script src="moment.js"></script>

<script>

import axios from 'axios';
// import { mdbDatatable } from 'mdbvue';

var moment = require('moment');
export default {
  name: 'App',
  components: {
    // HelloWorld
},

  data(){
    return{
      searchedText: '',
      searchTeamName:[],
      perPage: 20,
      currentPage: 1,
      fields:['team_name','mission','date_played','time_played'],
      team_name:'',
      teamMedia:[],
      teamMedia0:'',
      teamMedia1:'',
      teamMedia2:'',
      teamMedia3:'',
      teamMedia4:'',
      teamMedia5:'',
      teamMedia6:'',
      teamMedia7:'',
      teamMedia8:'',
      teamMedia9:'',
    }
  },

  methods: {

    searchTeam(event){
      console.log('team was searched');
      // console.log(this.searchedText);
      // console.log(event);

      var teamName = event;

      console.log(axios.get(process.env.VUE_APP_DATABASE_TEAMS+'/searchText/'+teamName));

      axios.get(process.env.VUE_APP_DATABASE_TEAMS+'/searchText/'+teamName,{

      })
      .then(response => 
        {
          console.log(response);

          var teamId = response.data[0].id;

          console.log(teamId);


          axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/search_team_id/'+teamId,{

          })
          .then(response => 
            {
              if(response.data.length > '0'){
                
                console.log('total team with that id are '+response.data.length);
                console.log(response.data);

                var totalTeamId = response.data.length;

                for (var i = 0; i < totalTeamId; i++) {

                  var sessionId = response.data[i].id;
                  var missionId = response.data[i].mission_id;

                  if(missionId == '1'){
                    var missionName = 'Cyberbot';
                  }
                  if(missionId == '2'){
                    var missionName = 'Block Monster';
                  }
                  if(missionId == '3'){
                    var missionName = 'Cyberbot Pro';
                  }
                  if(missionId == '4'){
                    var missionName = 'Cyberbot Halloween';
                  }

                  var playedDate = moment(response.data[i].session_time).format('MM-DD-YYYY');
                  var playedTime = moment(response.data[i].session_time).format('hh:mm A');

                  var teamDetail = {
                    "team_name":teamName,
                    "session_id":sessionId,
                    "mission":missionName,
                    "date_played":playedDate,
                    "time_played": playedTime
                  }

                  this.searchTeamName.push(teamDetail);

                  // if(i+1 == totalSearchedText){
                  //   var v = this;
                  //   console.log(this.searchedPeopleId);
                  //   setTimeout(function(){
                  //     console.log(v.searchedPeopleId);
                  //     console.log(v.getPersonDetail());
                  //     console.log('yes yes'); }, 1000);
                  // }

                }


              }
              else{
                console.log('Team Name not found');
              }

          })
          .catch(function (error) {
            console.log(error);
          });


        })
      .catch(function (error) {
        console.log(error);
      });
    },

    teamNameClicked(clickedSessionId){
      console.log('team name was clicked');

      this.teamMedia = []; /** empty the previous array on click **/

      this.team_name = this.searchedText;

      axios.get(process.env.VUE_APP_SESSION_MEDIA_ASSETS+'/session/'+clickedSessionId,{

          })
          .then(response => 
          {
            console.log(response);
            console.log(response.data.length);

            for (var i = 0; i < response.data.length; i++) {
              
              // valueName[i] == response.data[i].s3_url;

              this['teamMedia'+i] = response.data[i].s3_url;

              if(i == response.data.length-1){
                // console.log(valueName);
                this.$bvModal.show('modal-teamMedia');
              }
            }

            if(response.data.length < '1'){ /** this part should display photo bomb not found message **/
              console.log('Contents not found');
            }

          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },


  mounted: function(){
    
    // this.runMqtt();

  },

  computed: {
    rows() {
       return this.searchTeamName.length
    },
  },  

};
</script>

<style>

@import url(//db.onlinewebfonts.com/c/4f0c82bb2e8fb2d03bd14a1137235ef3?family=Pixel+Digivolve+Cyrillic);
/*@import url('./assets/fonts/PixelDigivolve.otf');*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
