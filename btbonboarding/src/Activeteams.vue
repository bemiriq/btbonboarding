<template>
  <div id="app" style="width: 80%; margin:auto;">

    <br><br>

    <b-modal id="modal-success" centered size="md" v-bind:hide-footer="true">
      Succesfully Updated. It will refresh page in 2 seconds.
    </b-modal>

    <b-modal id="modal-5sec-success" centered size="md" v-bind:hide-footer="true">
      Succesfully Updated. It will refresh page once data is updated.
    </b-modal>

    <b-modal id="modal-editTeamName" centered size="md" v-bind:hide-footer="true">
      <b-row>
        <b-col><b>Old Team Name</b></b-col>
        <b-col lg="8">{{clickedTeamName}}</b-col>
      </b-row>
      <br>
      <b-row>
        <b-col><b>New Team Name</b></b-col>
        <b-col lg="8"><b-form-input v-model="updateTeamName" placeholder="Please write their new team name"> </b-form-input></b-col>
      </b-row>
      <br>
      <div style="text-align:center;margin-top:2%;">
        <button type="button" class="btn btn-info" v-on:click="submitTeamName()" v-if="updateTeamName.length > '1'">SUBMIT</button>
        <button type="button" class="btn btn-info" v-on:click="submitTeamName()" v-else disabled>SUBMIT</button>

        <button type="button" class="btn btn-danger" v-on:click="cancelTeamName()" style="margin-left:2%;">CANCEL</button>
      </div>
    </b-modal>

    <b-modal id="modal-updateAsTestTeam" centered size="md" v-bind:hide-footer="true">
      <div>
        <p>
          <b>You are going to convert normal team into test team. Are you sure?</b>.
        </p>

        <hr>

        <button type="button" class="btn btn-info" v-on:click="submitTestTeam(1)">YES</button>
        <button type="button" class="btn btn-danger" v-on:click="cancelTestTeam()" style="margin-left:2%;">NO</button>
      </div>
    </b-modal>

    <b-modal id="modal-removeAsTestTeam" centered size="md" v-bind:hide-footer="true">
      <div>
        <p>
          <b>You are going convert test team into normal team. Are you sure?</b>.
        </p>

        <hr>

        <button type="button" class="btn btn-info" v-on:click="submitTestTeam(null)">YES</button>
        <button type="button" class="btn btn-danger" v-on:click="cancelTestTeam()" style="margin-left:2%;">NO</button>
      </div>
    </b-modal>


    <b-modal id="modal-booleanCloneTeams" centered size="md" v-bind:hide-footer="true">
      <!-- You are going to clone {{clonedTPS1[0].team_name}} and team 2. -->

      <div v-if="clonedTPS2.length > '0'">
        <p>
          You are going to clone <b>{{clonedTPS1[0].team_name}}</b> and <b>{{clonedTPS2[0].team_name}}</b>.
        </p>

        <hr>

        <button type="button" class="btn btn-info" v-on:click="clonedTeamSubmitted()">SUBMIT</button>
        <button type="button" class="btn btn-danger" v-on:click="cancelCloning()" style="margin-left:2%;">CANCEL</button>


      </div>


    </b-modal>

    <b-modal id="modal-activeTeams" centered size="xl" v-bind:hide-footer="true">
      <table class="table">
        <tr>
          <th>Team Name</th>
          <th>Mission</th>
          <th>Test Team</th>
          <th>Battle Mode</th>
          <!-- <th v-if="battleModeTeamSession > '0' ">Battle Mode</th> -->
          <th>VS Team Name</th>
        </tr>
        <tr>
          <!-- <td>{{clickedTeamName}}</td> -->
          <td>
            <a href="#/Activeteams" @click="editTeamName(clickedSessionId)" style="text-transform:capitalize;">{{clickedTeamName}}</a>
          </td>
          <td>
            <b-form-select v-model="clickedMission" v-on:change="changedMission($event)">
              <option v-for="itemCategory in missions" :value="itemCategory.id" v-bind:key="itemCategory.id">{{itemCategory.name}}</option>
            </b-form-select>
          </td>

          <!-- this td defines test team or not -->
          <td v-if="testTeamSession > '0' ">
            <a href="#/Activeteams" @click="updateAsTestTeam(clickedSessionId,0)">YES</a>
          </td>
          <td v-else>
            <a href="#/Activeteams" @click="updateAsTestTeam(clickedSessionId,1)">NO</a>
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

    <b-modal id="modal-cloneTeams" centered size="lg" v-bind:hide-footer="true">
      <!-- <p>CLONE IT NOW</p> -->

      <!-- <table class="table">
        <tr>
          <th>Team Name</th>
          <th>Mission</th>
          <th>Battle Mode</th>
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
          <td style="width:40%;">
            <b-form-select v-model="cloneTeamsValue" v-on:change="cloneTeams($event)">
              <option style="font-weight:bold;" value="normalMode">Convert to normal mode team</option>
              <option v-for="item in teamList" :value="item.id" v-bind:key="item.id">{{item.Team.name}}</option>
            </b-form-select>
          </td>
        </tr>
      </table> -->

      <div  v-if="clickedTeamName.length > '0'">
        <p>You are going to clone team <b>{{clickedTeamName}}</b> </p>

        <button type="button" class="btn btn-info" v-on:click="clonedTeamSubmitted()">SUBMIT</button>
        <button type="button" class="btn btn-danger" v-on:click="cancelCloning()" style="margin-left:2%;">CANCEL</button>

      </div>
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
              <tr style="font-size: 1.2em;text-align:left;">
                <th style="text-align:center;">Team Name</th>
                <th> Mission</th>
                <th> Time </th>
                <th> Update </th>
                <th> Clone Team </th>
              </tr>
              <tr v-for="team in teamList" v-bind:key="team.id" style="text-align:left;">
                <td>
                  <p class="detailsText" style="text-transform:capitalize;">{{team.Team.name}}</p>
                  <!-- <a href="#/Activeteams" @click="editTeamName()" style="text-transform:capitalize;">{{team.Team.name}}</a> -->
                </td>

                <td>
                  <span v-if="team.mission_id == '1' ">Cyberbot</span>
                  <span v-if="team.mission_id == '2'">Block Monster</span>
                  <span v-if="team.team_vs_team_id > '0'" ><br>Battle Mode</span>
                </td>

                <td>
                  {{team.session_time | convertTime}}
                </td>
                <td>
                  <button type="button" class="btn btn-info" v-on:click="editTeamDetails(team.id,1)">Edit</button>
                  <!-- <b-button v-on:click="editTeamDetails(team.id)">Edit</b-button> -->
                </td>

                <td>
                  <button type="button" class="btn btn-primary" v-on:click="editTeamDetails(team.id,2)">Clone</button>
                  <!-- <b-button v-on:click="editTeamDetails(team.id)">Edit</b-button> -->
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
        clickedSessionId:'',
        clickedMission:'',
        clickedTeamName:'',
        clickedTeamName2:'',/**battle mode opponent team name **/
        clickedSessionId2:'',/** battle mode team session id **/
        testTeamSession:'',
        battleModeTeamSession:'',
        updatedBattleModeSession:'',
        limitTeams:20,
        missions:[],
        cloneTeamsValue:[],
        clonedTPS1:[],
        clonedTPS2:[],
        clonedTeam1SessionId:'',
        updateTeamName:'',

        /** make test session,reservation,booker,players,people,minors,team player session**/
        sessionMadeTest:'',
        tpsMadeTest:'',
        // clonedTeam2SessionId:''
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

    filters:{
      convertTime(value){
        if(value == null){
          return 'Empty'
        }
        var formattime = moment(value).format('hh:mm A');
        return formattime
      },
    },

    methods:{

      updateAsTestTeam(clickedSessionId,getValue){
        console.log(clickedSessionId);
        console.log(this.battleModeTeamSession);
        
        if(getValue == '1'){
          this.$bvModal.show('modal-updateAsTestTeam');
        }
        else{
          this.$bvModal.show('modal-removeAsTestTeam');
        }

      },

      submitTestTeam(getValue){
        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{

          })
          .then(response => {
            console.log(response.data);

            /** session updated as test **/
            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
              test: getValue
            })
            .then(response => {
              console.log(response);
              this.sessionMadeTest = 1;
              console.log('Succesfully update session as test');
            })
            .catch(function (error) {
              console.log(error);
            });

            /** reservation / booker updated as test following xola_order_id **/
            var reservationId = response.data.reservation_id;

            axios.get(process.env.VUE_APP_RESERVATIONS+reservationId,{

            })
            .then(response => {
              console.log(response);

              axios.put(process.env.VUE_APP_DATABASE_RESERVATIONS+reservationId,{
                test: getValue
              })
              .then(response => {
                console.log(response);
                console.log('Succesfully update reservation as test');
              })
              .catch(function (error) {
                console.log(error);
              });


              /** update booker as test following xola order id from reservation get **/
              var bookerId = response.data.booker_id;
              console.log(bookerId);
              axios.put(process.env.VUE_APP_BOOKERS+bookerId,{
                test: getValue
              })
              .then(response => {
                console.log(response);
                console.log('Succesfully update booker as test');
              })
              .catch(function (error) {
                console.log(error);
              });


            })
            .catch(function (error) {
              console.log(error);
            });
            

            var totalPlayers = response.data.Team_player_sessions.length;

            /** team player session updated as test **/
            for (var i = 0; i < totalPlayers; i++) {
              
              var updateTeamOnTps = response.data.Team_player_sessions[i].id;
              console.log(i+' '+updateTeamOnTps);

              axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateTeamOnTps,{
                test: getValue
              })
              .then(response => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });


              var playerDetail = response.data.Team_player_sessions[i].player_id;
              var minorDetail = response.data.Team_player_sessions[i].player_minor_id;
              var peopleDetail = response.data.Team_player_sessions[i].Player.Person.id;

              if(minorDetail > '0'){
                console.log('Its a minor player');
                /** Update test on PLAYER MINORS TABLE **/
                axios.put(process.env.VUE_APP_PLAYER_MINORS+minorDetail,{
                  test: getValue
                })
                .then(response => {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });

                /** Update test on RESERVATION MINORS TABLE **/
                // axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+minorDetail+'/reservation/'+reservationId,{
                //   test: getValue
                // })
                // .then(response => {
                //   console.log(response);
                // })
                // .catch(function (error) {
                //   console.log(error);
                // });

              }
              else{
                console.log('Its a player');

                /** Update test on PLAYERS TABLE **/
                axios.put(process.env.VUE_APP_DATABASE_PLAYERS+playerDetail,{
                  test: getValue
                })
                .then(response => {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });


                /** Update test on PEOPLE TABLE **/
                axios.put(process.env.VUE_APP_DATABASE_PEOPLE+peopleDetail,{
                  test: getValue
                })
                .then(response => {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });


                /** Update test on RESERVATION PLAYERS TABLE where person is the PEOPLE ID **/
                // axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+peopleDetail+'/reservation/'+reservationId,{
                //   test: getValue
                // })
                // .then(response => {
                //   console.log(response);
                // })
                // .catch(function (error) {
                //   console.log(error);
                // });



              }
              
              if(i+1 == totalPlayers){
                console.log('Succesfully team player session as test');
                this.tpsMadeTest = 1;

                this.$bvModal.show('modal-5sec-success');
                this.reload5secFuntion();

              }

            }

          })
          .catch(function (error) {
            console.log(error);
          });
          // console.log('Update Team Name');
      },

      cancelTestTeam(){
        this.$bvModal.hide('modal-updateAsTestTeam');
        this.$bvModal.hide('modal-removeAsTestTeam');
      },

      submitTeamName(){
        console.log(this.updateTeamName);
        console.log(this.clickedSessionId);
        axios.post(process.env.VUE_APP_DATABASE_TEAMS+'/find_or_create/'+this.updateTeamName,{

        })
        .then(response => {
          console.log(response.data);
          console.log(response.data[0].id);
          var teamId = response.data[0].id;

          axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
            team_id: teamId
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{

          })
          .then(response => {
            console.log(response.data);

            var totalPlayers = response.data.Team_player_sessions.length;

            for (var i = 0; i < totalPlayers; i++) {
              
              var updateTeamOnTps = response.data.Team_player_sessions[i].id;
              console.log(i+' '+updateTeamOnTps);

              axios.put(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+updateTeamOnTps,{
                team_id: teamId
              })
              .then(response => {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

              if(i+1 == totalPlayers){
                console.log('i is equal to '+totalPlayers);
                this.$bvModal.hide('modal-activeTeams');
                this.$bvModal.hide('modal-editTeamName');
                this.$bvModal.show('modal-success');
                this.reloadFuntion();
              }

            }

          })
          .catch(function (error) {
            console.log(error);
          });
          // console.log('Update Team Name');
        })
        .catch(function (error) {
          console.log(error);
        });

      },

      cancelTeamName(){
        this.$bvModal.hide('modal-editTeamName');
      },

      editTeamName(session_id){
        console.log('inside');
        console.log(session_id);
        this.$bvModal.show('modal-editTeamName');
      },

      clonedTeamSubmitted(){

        /** axios.post create two session id and add the value of clonedTPS1/clonedTPS2 once the session is created , as you
        have to use that SESSION ID value on TPS / Team player session *

        /** this will run after the team is cloned successfully **/
        // this.$bvModal.hide('modal-booleanCloneTeams');
        // this.$bvModal.show('modal-success');
        // this.reloadFuntion();

        if(this.clonedTPS1[0].reservation_id > '0' && this.clonedTPS1[0].team_id > '0'){

          axios.post(process.env.VUE_APP_DATABASE_SESSIONS,{
              location_id: 1,
              reservation_id: this.clonedTPS1[0].reservation_id,
              mission_id: this.clickedMission,
              session_time: moment().format('YYYY-MM-DD HH:mm:00'),
              team_id: this.clonedTPS1[0].team_id,
              route_id: 1, /** this is for side A **/
              active: 1,
              player_count: this.clonedTPS1.length
            })
          .then(response => {
            console.log(response.data);
            console.log('Created new session id for first team');

            var team1SessionId = response.data.id;
            this.clonedTeam1SessionId = response.data.id;

            /** this will create the team player session followed by clonedTPS length **/
            for (var i = 0; i < this.clonedTPS1.length; i++) {

              axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
                team_id: this.clonedTPS1[0].team_id,
                player_id: this.clonedTPS1[i].player_id,
                player_minor_id: this.clonedTPS1[i].player_minor_id,
                session_id: team1SessionId,
                rfid_id: this.clonedTPS1[i].rfid_id,
                reservation_id: this.clonedTPS1[i].reservation_id
              })
              .then(response => {
                console.log(response.data);
                console.log('Created tps of team 1 player '+i);
              })
              .catch(function (error) {
                console.log(error);
              });


              if(i+1 == this.clonedTPS1.length){
                /** this will run after the team is cloned successfully **/
                // this.$bvModal.hide('modal-booleanCloneTeams');
                this.$bvModal.hide('modal-cloneTeams');
                this.$bvModal.show('modal-success');
                this.reloadFuntion();
              }

            }/** for loop closed **/

            /** end of team player session post **/
          })
          .catch(function (error) {
            console.log(error);
          });

        }


        /** second team **/

        // if(this.clonedTPS2[0].reservation_id > '0' && this.clonedTPS2[0].team_id > '0'){

        //   axios.post(process.env.VUE_APP_DATABASE_SESSIONS,{
        //       location_id: 1,
        //       reservation_id: this.clonedTPS2[0].reservation_id,
        //       mission_id: this.clickedMission,
        //       session_time: moment().format('YYYY-MM-DD HH:mm:00'),
        //       team_id: this.clonedTPS2[0].team_id,
        //       route_id: 2, /** this is for side A **/
        //       active: 1,
        //       player_count: this.clonedTPS2.length,
        //       team_vs_team_id: this.clickedSessionId
        //     })
        //   .then(response => {
        //     console.log(response.data);
        //     console.log('Created new session id for second team');

        //     var team2SessionId = response.data.id;

        //     /** update battle mode team_vs_team_id value for team 1 **/
        //     axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clonedTeam1SessionId,{
        //       team_vs_team_id: team2SessionId
        //     })
        //     .then(response => {
        //       console.log(response.data);
        //       console.log('Update team 1 team_vs_team_id');
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        //     /** end of team 1 update team_vs_team_id value **/

        //     * this will create the team player session followed by clonedTPS length *
        //     for (var i = 0; i < this.clonedTPS2.length; i++) {

        //       axios.post(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS,{
        //         team_id: this.clonedTPS2[0].team_id,
        //         player_id: this.clonedTPS2[i].player_id,
        //         player_minor_id: this.clonedTPS2[i].player_minor_id,
        //         session_id: team2SessionId,
        //         rfid_id: this.clonedTPS2[i].rfid_id,
        //         reservation_id: this.clonedTPS2[i].reservation_id
        //       })
        //       .then(response => {
        //         console.log(response.data);
        //         console.log('Created tps of team 2 player '+i);
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });

        //       if(i+1 == this.clonedTPS2.length){
        //         /** this will run after the team is cloned successfully **/
        //         this.$bvModal.hide('modal-booleanCloneTeams');
        //         this.$bvModal.show('modal-success');
        //         this.reloadFuntion();
        //       }

        //     }
        //     /** for loop closed **/

        //     /** end of team player session post **/
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        // }

        /** end of second team **/


      },

      cancelCloning(){

        // this.$bvModal.hide('modal-booleanCloneTeams');
        this.$bvModal.hide('modal-cloneTeams');
        // this.$bvModal.hide('modal-booleanCloneTeams');

      },

      cloneTeams(){
        console.log('inside clone');

        this.clonedTPS1 = [];
        // this.clonedTPS2 = [];

        // console.log(this.clickedSessionId);
        // console.log(event);

        // var cloneSessionId1 = this.clickedSessionId;

        // var cloneSessionId2 = event;

        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
            
          })
          .then(response => {
            console.log(response.data);

            var teamPlayerSession1 = response.data.Team_player_sessions;
            for (var i = 0; i < teamPlayerSession1.length; i++) {
              console.log(i);
              console.log(teamPlayerSession1[i]);

              var tpsPlayerId = teamPlayerSession1[i].player_id;
              var tpsMinorId = teamPlayerSession1[i].player_minor_id;
              var tpsReservationId = teamPlayerSession1[i].reservation_id;
              var tpsTeamId = teamPlayerSession1[i].team_id;
              var tpsRfid = teamPlayerSession1[i].rfid_id;
              // var tpsTeamName1 = response.data.Team.name;


              var tpsDetail1 = {
                'player_id' : tpsPlayerId,
                'player_minor_id' : tpsMinorId,
                'reservation_id' : tpsReservationId,
                'team_id' : tpsTeamId,
                'rfid_id' : tpsRfid,
                // 'team_name' : tpsTeamName1
                'team_name' : this.clickedTeamName

              }

              this.clonedTPS1.push(tpsDetail1);

            }
          })
          .catch(function (error) {
            console.log(error);
        });

        // if(cloneSessionId2 > '0'){
        //   axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+cloneSessionId2,{
            
        //   })
        //   .then(response => {
        //     console.log(response.data);

        //     var teamPlayerSession2 = response.data.Team_player_sessions;
        //     for (var i = 0; i < teamPlayerSession2.length; i++) {
        //       console.log(i);
        //       console.log(teamPlayerSession2[i]);

        //       var tpsPlayerId2 = teamPlayerSession2[i].player_id;
        //       var tpsMinorId2 = teamPlayerSession2[i].player_minor_id;
        //       var tpsReservationId2 = teamPlayerSession2[i].reservation_id;
        //       var tpsTeamId2 = teamPlayerSession2[i].team_id;
        //       var tpsRfid2 = teamPlayerSession2[i].rfid_id;
        //       var tpsTeamName2 = response.data.Team.name;

        //       var tpsDetail2 = {
        //         'player_id' : tpsPlayerId2,
        //         'player_minor_id' : tpsMinorId2,
        //         'reservation_id' : tpsReservationId2,
        //         'team_id' : tpsTeamId2,
        //         'rfid_id' : tpsRfid2,
        //         'team_name' : tpsTeamName2
        //       }

        //       this.clonedTPS2.push(tpsDetail2);
        //     }

        //   })
        //   .catch(function (error) {
        //     console.log(error);
        // });
        // }

        this.$bvModal.hide('modal-cloneTeams');
        
        // this.$bvModal.show('modal-booleanCloneTeams');

      },

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
        }, 2500);
      },

      reload5secFuntion(){
        setTimeout(function(){
         window.location.reload(true);
        }, 4000);
      },

      editTeamDetails(value,updateValue){
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
          this.testTeamSession = response.data.test;
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

        if(updateValue == '1'){
          this.$bvModal.show('modal-activeTeams');
        }
        else{
          this.cloneTeams(); /** cloneTeams function will pass TPS value into clonedTPS1 **/
          this.$bvModal.show('modal-cloneTeams');
        }

        
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
