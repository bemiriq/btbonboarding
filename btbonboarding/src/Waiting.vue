<template>
  <div id="app" style="width: 80%; margin:auto;">

    <br><br>

    <b-modal id="modal-success" centered size="md" v-bind:hide-footer="true" title="Message">
      Updating data and reloading the page.
    </b-modal>

    <b-modal id="modal-teamStatus" centered size="md" v-bind:hide-footer="true" title="Message">
      
      You are deactivating team. Are you sure?

      <br><br>
      <b-row>
      <b-col>

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
            <p class="teamTitle1" style="text-align:center;">TEAMS ON DECK</p>

            <table class="table">
              <tr>
                <th> Team Name </th>
                <th> Team Size </th>
                <th> Active/Deactivate </th>
              </tr>

              <tr v-for="team in teamList" v-bind:key="team.id">
                <td>
                  <p v-if="team.Session_game_scores == '' " style="text-transform:capitalize;">{{team.Team.name}}
                    <span v-if="team.team_vs_team_id > '0'" style="font-weight: lighter;"> vs {{team.Team_vs_team.Team.name}} </span>
                  </p>
                </td>
                <td>
                  <p v-if="team.Session_game_scores == '' ">{{team.Team_player_sessions.length}}</p>
                </td>
                <td>
                  <b-button class="btn btn-info" v-if="team.active == '1' " @click="changeTeamStatus(team.id)">De-activate</b-button>
                  <!-- <b-button v-if="team.active == '2' ">Deactive</b-button> -->
                </td>
              </tr>

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

  export default {
    name: 'App',
    components: {
      // HelloWorld
    },

    data(){
      return{
        teamname: [],
        teamList: [],
        clickedSessionId: '',
        teamClicked:'',
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
    },

    methods:{
      changeTeamStatus(data){
        console.log(data);

        this.clickedSessionId = data;

        console.log('clicked status');

        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+data,{

        })
        .then(response => {
          this.teamClicked = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        this.$bvModal.show('modal-teamStatus');

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
