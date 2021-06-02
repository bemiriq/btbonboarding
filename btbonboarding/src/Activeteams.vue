<template>
  <div id="app" style="width: 80%; margin:auto;">

    <br><br>

    <b-modal id="modal-success" centered size="md" v-bind:hide-footer="true">
      Succesfully Updated. It will refresh page in 2 seconds.
    </b-modal>

    <b-modal id="modal-activeTeams" centered size="lg" v-bind:hide-footer="true">
      <table class="table">
        <tr>
          <th>Team Name</th>
          <th>Mission</th>
          <th>Battle Mode</th>
          <!-- <th v-if="battleModeTeamSession > '0' ">Battle Mode</th> -->
          <th>VS Team Name</th>
        </tr>
        <tr>
          <td>{{clickedTeamName}}</td>
          <td>
            <b-form-select v-model="clickedMission" v-on:change="changedMission($event)">
              <option v-for="itemCategory in missions" :value="itemCategory.id" v-bind:key="itemCategory.id">{{itemCategory.name}}</option>
            </b-form-select>
          </td>
          <td v-if="battleModeTeamSession > '0' ">YES</td>
          <td v-else>NO</td>
          <!-- <td v-if="battleModeTeamSession > '0' " style="width:40%;"> -->
          <td style="width:40%;">
            <b-form-select v-model="updatedBattleModeSession" v-on:change="changedBattleModeTeam($event)">
              <option style="font-weight:bold;" value="normalMode">Convert to normal mode team</option>
              <option v-for="item in teamList" :value="item.id" v-bind:key="item.id">{{item.Team.name}}</option>
            </b-form-select>
          </td>
        </tr>
      </table>
    </b-modal>

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
            <b-list-group-item href="/#/Social">Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>
          <!-- end of navigation menu on left side -->
        </b-col>

        <b-col lg="10">
            <p class="teamTitle1">ACTIVE TEAMS</p>

            <table class="table">
              <tr>
                <th>Team Name</th>
                <th> Mission</th>
                <th> Update </th>
              </tr>
              <tr v-for="team in teamList" v-bind:key="team.id">
                <td>
                  <p class="detailsText" style="text-transform:capitalize;">{{team.Team.name}}</p>
                </td>

                <td>
                  <span v-if="team.mission_id == '1' ">Cyberbot</span>
                  <span v-if="team.mission_id == '2'">Block Monster</span>
                  <span v-if="team.team_vs_team_id > '0'" ><br>Battle Mode</span>
                </td>

                <td>
                  <b-button v-on:click="editTeamDetails(team.id)">Edit</b-button>
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
        clickedSessionId:'',
        clickedMission:'',
        clickedTeamName:'',
        clickedTeamName2:'',/**battle mode opponent team name **/
        clickedSessionId2:'',/** battle mode team session id **/
        battleModeTeamSession:'',
        updatedBattleModeSession:'',
        limitTeams:20,
        missions:[]
        // clickedBattleModeTeam:'',
      }
    },

    mounted: function(){

      axios.get(process.env.VUE_APP_DATABASE_MISSION).then(response => (this.missions = response.data ));

      var limit = this.limitTeams;
      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/recent_teams/limit/'+limit,{

      })
      .then(response => {
        // console.log(response);
        this.teamList = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    methods:{

      changedBattleModeTeam(event){
        console.log(event);

        if(event == 'normalMode'){ /** change battle mode into normal mode **/
          this.changedIntoNormalTeam();
        }

        else{ /** convert into battle mode team **/

          console.log('first team sesssion id '+this.clickedSessionId);
          console.log('second team session id '+event);

          axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
            team_vs_team_id : event /** updates second session id on first one **/
          })
          .then(response => {
            console.log(response);

            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+event,{
              team_vs_team_id : this.clickedSessionId /** updates first session id on second one **/
            })
            .then(response => {
              console.log(response);
              this.$bvModal.hide('modal-activeTeams');
              this.$bvModal.show('modal-success');
              
              this.reloadFuntion();

            })

            .catch(function (error) {
              console.log(error);
            });

          })

          .catch(function (error) {
            console.log(error);
          });

        }

      },

      changedIntoNormalTeam(){
          axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
            team_vs_team_id : null /** updates first session id on second one **/
          })
          .then(response => {
            console.log(response);

            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId2,{
              team_vs_team_id : null /** updates first session id on second one **/
            })
            .then(response => {
              console.log(response);
              this.$bvModal.hide('modal-activeTeams');
              this.$bvModal.show('modal-success');
              this.reloadFuntion();
            })
            .catch(function (error) {
              console.log(error);
            });

          })
          .catch(function (error) {
            console.log(error);
          });
      },

      changedMission(event){
        console.log('change mission '+event);

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{

          mission_id: event

        })
        .then(response => {

          console.log(response.data);
          this.$bvModal.hide('modal-activeTeams');
          this.$bvModal.show('modal-success');
          this.reloadFuntion();

        })

        if(this.clickedSessionId2 > '0'){
          axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId2,{

            mission_id: event

          })
          .then(response => {

            console.log(response.data);
            this.$bvModal.hide('modal-activeTeams');
            this.$bvModal.show('modal-success');
            this.reloadFuntion();

          })
        }
      },

      reloadFuntion(){
        setTimeout(function(){
         window.location.reload(true);
        }, 2000);
      },

      editTeamDetails(value){
        console.log(value);
        console.log('inside');
        this.clickedSessionId = value;

        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+value,{

        })
        .then(response => {
          console.log(response);
          // this.teamList = response.data;
          this.clickedTeamName = response.data.Team.name;
          this.clickedMission = response.data.mission_id;
          this.battleModeTeamSession = response.data.team_vs_team_id;
          this.updatedBattleModeSession = response.data.team_vs_team_id;

          if(response.data.team_vs_team_id > '0'){

            this.clickedSessionId2 = response.data.team_vs_team_id;

            axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+response.data.team_vs_team_id,{

            })
            .then(response => {
              console.log(response);
              this.clickedTeamName2 = response.data.Team.name;
              // this.clickedMission2 = response.data.mission_id;
            })
            .catch(function (error) {
              console.log(error);
            });
          }

        })
        .catch(function (error) {
          console.log(error);
        });

        this.$bvModal.show('modal-activeTeams');
      }
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
  text-align: center;
  font-size: 0.4em;
}

.detailsText{
  color: black;
  text-align: center;
  font-size: 17px;
}
</style>
