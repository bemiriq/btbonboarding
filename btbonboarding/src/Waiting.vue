<template>
  <div id="app" style="width: 80%; margin:auto;">

    <br><br>

    <b-modal id="modal-success" centered size="md" v-bind:hide-footer="true" title="Message">
      Updating data and reloading the page.
    </b-modal>

    <b-modal id="modal-teamList" centered size="md" v-bind:hide-footer="true" title="Activate / De-activate Teams">

      <b-row>
        <b-col><b>Team Name</b></b-col>
        <b-col><b>Date</b></b-col>
        <b-col><b>Status</b></b-col>
      </b-row>
      <br>
      <b-row v-for="fetchTeam in allTeamList" v-bind:key="fetchTeam.id" style="text-transform:capitalize; margin-bottom: 1.5%;">
        <b-col>{{fetchTeam.Team.name}}</b-col>
        <b-col>{{fetchTeam.session_time | convertTime}}</b-col>
        <b-col>
          <input type="checkbox" checked v-if="fetchTeam.active > '0'" @click="changeTeamStatus(fetchTeam.id,1)"/>
          <input type="checkbox" v-else @click="changeTeamStatus(fetchTeam.id,2)"/>
        </b-col>
      </b-row>

      <br><br>
      <b-row>
        <b-col lg="2">
          <button type="button" class="btn btn-primary" v-on:click="hideTeamListModal()">Done</button>
        </b-col>

      </b-row>
    </b-modal>

    <b-modal id="modal-teamStatus" centered size="md" v-bind:hide-footer="true" title="Message">

      You are deactivating a team. It will remove the team name from Teams On Deck. Are you sure you want to remove it?

      <br><br>
      <b-row>
        <b-col lg="2">

          <button type="button" class="btn btn-primary" v-on:click="deactivateTeam()">Yes</button>
        </b-col>
        <b-col>
          <button type="button" class="btn btn-info" v-on:click="cancelTeamName()">No</button>
        </b-col>
      </b-row>
    </b-modal>

    <div>
      <b-row>
        <b-col lg="2">
          <!-- start of the left div which has navigation menu -->
          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting" active>Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Activeteams">Active Teams</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="/#/Social">Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>
          <!-- end of navigation menu on left side -->
        </b-col>

        <b-col lg="10">

          <b-row>
            <b-col>
              <p class="teamTitle1" style="text-align:right; font-size: 2.5em;">TEAMS ON DECK</p>
            </b-col>
            <b-col>
              <b>Teams : </b><b-button class="btn btn-info" @click="teamListModal()">Active / Deactive</b-button>
            </b-col>
          </b-row>

          <hr>

          <b-container class="bv-example-row">

              <b-row>

                <b-col><p class="teamTitle1" style="text-align:left;"> TEAM NAME </p></b-col>
                <b-col><p class="teamTitle1"  style="text-align:left;"> TEAM SIZE </p></b-col>

              </b-row>

              <b-row class="teamName" v-for="team in teamList" v-bind:key="team.id">
                <b-col>
                  <p class="teamList" v-if="team.Session_game_scores == '' " style="text-align:left;">{{team.Team.name}}
                    <span v-if="team.team_vs_team_id > '0'" style="font-weight: lighter;text-align:left;"> vs {{team.Team_vs_team.Team.name}} </span>
                  </p>
                </b-col>

                <b-col>
                  <p class="teamList" v-if="team.Session_game_scores == '' " style="text-align:left;padding-left:15%;">{{team.Team_player_sessions.length}}</p>
                </b-col>

              </b-row>

            </b-container>
          
          </b-col>
        </b-row>
      </div>


      <br/>
      <br/>

      <div class="bv-example-row" style="width:auto;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

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

  <script>

  import axios from 'axios';
  import moment from 'moment';

  export default {
    name: 'App',
    components: {
      // HelloWorld
    },

    data(){
      return{
        teamname: [],
        teamList: [],
        allTeamList: [],
        clickedSessionId: '',
        teamClicked:'',
      }
    },

    mounted: function(){

      // var startDate = moment().format('YYYY-MM-DD');
      // var endDate = moment().add(1,'days').format('YYYY-MM-DD');

      // this.startDate = startDate;
      // this.endDate = endDate;

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

      })
      .then(response => {
        console.log(response);
        this.teamList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    },

    filters:{
      convertTime(value){
        if(value == null){
          return 'Empty'
        }
        var formattime = moment(value).format('MM/DD/YYYY');
        return formattime
      },
    },

    methods:{

      teamListModal(){

        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/recent_teams/limit/20',{

        })
        .then(response => {
          console.log(response);
          this.allTeamList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        this.$bvModal.show('modal-teamList');


      },

      hideTeamListModal(){
        this.$bvModal.hide('modal-teamList');
        this.$bvModal.show('modal-success');
        this.reloadFuntion();
      },

      changeTeamStatus(sessionId,value){
        console.log(sessionId);
        console.log(value);

        if(value== '1'){
          console.log('de activate');

          axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
            active: null
          })  
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        }

        if(value == '2'){
          console.log('activate');

          axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+sessionId,{
            active: 1
          })  
          .then(response => {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        }

        // this.$bvModal.show('modal-teamStatus');

      },
      deactivateTeam(){
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
          active: null
        })
        .then(response => {
          // this.teamClicked = response.data;
          console.log(response.data);
          this.$bvModal.hide('modal-teamStatus');
          this.$bvModal.show('modal-success');
          this.reloadFuntion();

        })
        .catch(function (error) {
          console.log(error);
        });
      },

      cancelTeamName(){
        this.$bvModal.hide('modal-teamStatus');
      },

      reloadFuntion(){
        setTimeout(function(){
         window.location.reload(true);
       }, 2500);
      },

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
    text-align: center;
    font-size: 1em;
  }

  .teamList{
    color: black;
    font-family: 'Pixel Digivolve Cyrillic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 0.4em;
  }
  </style>
