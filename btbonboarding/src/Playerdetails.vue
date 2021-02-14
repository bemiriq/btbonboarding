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
            <b-list-group-item href="/#/Waiting" active>Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>
          <!-- end of navigation menu on left side -->
        </b-col>

        <b-col lg="10">
            <p class="teamTitle1">PLAYERS DETAIL</p>
            <!-- <hr> -->
            <!-- <b-container class="bv-example-row">

              <b-row>

                <b-col><p class="teamTitle1"> First Name </p></b-col>
                <b-col><p class="teamTitle1"> Last Name </p></b-col>

              </b-row>

              <b-row class="teamName" v-for="team in teamList" v-bind:key="team.id">
                <b-col>
                  <p class="teamList" v-if="team.Session_game_scores == '' ">{{team.Team.name}}</p>
                </b-col>

                <b-col>
                  <p class="teamList" v-if="team.Session_game_scores == '' ">{{team.Team_player_sessions.length}}</p>
                </b-col>

              </b-row>

            </b-container> -->
<table class="table">
  <thead>
    <tr>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Minor/Adult</th>
      <th scope="col">Handle</th>
      <th scope="col">Team Name</th>
      <th scope="col">Date of Birth</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody v-for="item in teamList" v-bind:key="item.id">
    <tr v-for="detail in item.Team_player_sessions" v-bind:key="detail.id">
      <!-- <th scope="row">1</th> -->
      <td style="text-transform:capitalize;">
      <p v-if="!detail.player_minor_id > 0">{{detail.Player.Person.first_name}}</p>
      <p v-else>{{detail.Player_minor.first_name}}</p>
      </td>
      <td style="text-transform:capitalize;">
      <p v-if="!detail.player_minor_id > 0">{{detail.Player.Person.last_name}}</p>
      <p v-else>{{detail.Player_minor.last_name}}</p>
      </td>
      <td style="text-transform:capitalize;">
      <p v-if="!detail.player_minor_id > 0">Adult</p>
      <p v-else>Minor</p>
      </td>
      <td>
      <p v-if="!detail.player_minor_id > 0">{{detail.Player.Person.instagram}}</p>
      <p v-else></p></td>
      <td style="text-transform:capitalize;">{{item.Team.name}}</td>
      <td>
      <p v-if="!detail.player_minor_id > 0" style="
  display:inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 11ch;">{{detail.Player.Person.date_of_birth}}</p>
      <p v-else>{{detail.Player_minor.date_of_birth}}</p>
      </td>
      <td>{{detail.Player.Person.email}}</td>
    </tr>
  </tbody>
</table>
            
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
  var moment = require('moment');

  export default {
    name: 'App',
    components: {
      // HelloWorld
    },

    data(){
      return{
        teamname: [],
        teamList: []
      }
    },

    mounted: function(){

    console.log(moment().format('YYYY-MM-DD'));

    var startDate = moment().subtract('days',7).format('YYYY-MM-DD');
    var endDate = moment().add('days',6).format('YYYY-MM-DD');

    // var startDate = moment().format('YYYY-MM-DD');
    // var endDate = moment().add('days',1).format('YYYY-MM-DD');

    console.log(axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_onboarded_team/start/'+startDate+'/end/'+endDate+'/limit/100'));

    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/most_recent_onboarded_team/start/'+startDate+'/end/'+endDate+'/limit/400',{
      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

      })
      .then(response => {
        console.log(response);
        this.teamList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
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
  font-size: 2em;
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
