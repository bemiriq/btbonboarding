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
            <b-list-group-item href="/#/Waiting" active>Waiting</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>
          <!-- end of navigation menu on left side -->
        </b-col>

        <b-col lg="10">
            <p class="teamTitle1">TEAMS ON DECK</p>
            <hr>
            <b-container class="bv-example-row">

              <b-row>

                <b-col><p class="teamList"> TEAM NAME </p></b-col>
                <b-col><p class="teamList"> TEAM SIZE </p></b-col>

              </b-row>

              <b-row class="teamName" v-for="team in teamList" v-bind:key="team.id">
                <b-col>
                  <p class="teamList" v-if="team.Session_game_scores == '' ">{{team.Team.name}}</p>
                </b-col>

<!--                 <b-col>
                  <p class="teamList" v-if="team.Session_game_scores == ''">{{team.player_count}}</p>
                </b-col> -->

                <b-col>
                  <p class="teamList" v-if="team.Session_game_scores == '' ">{{team.Team_player_sessions.length}}</p>
                </b-col>

                <!-- <b-col>
                  <div v-if="team.Session_game_scores == '' ">
                    <p class="teamList" v-if="team.Team_player_sessions.length == team.player_count" style='color:green;'>&#9989;</p>
                    <p v-else>&#10060;</p>
                  </div>
                </b-col> -->

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
      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+100+'/active',{

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
