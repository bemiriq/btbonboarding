<template>
  <div id="app" style="width: 80%; margin:auto;">

    <br><br>
    <b-modal id="modal-printScoresheetMessage" centered size="md" v-bind:hide-footer="true" title="Printing Out">
      If it does not print please try to manually print out any document from that computer and check if the printer is working or not.
    </b-modal>


    <b-modal id="modal-removedPlayer" centered size="md" v-bind:hide-footer="true" title="Player Removed Message">
      Removed a player from {{clickedTeamName}}. Updating data and reloading the page.
    </b-modal>

    <b-modal id="modal-twoPlayerMessage" centered size="md" v-bind:hide-footer="true" title="Unable to remove player">
      There should at least be two players to play at Beat The Bomb. You cannot remove player from team <span style="text-transform:capitalize;"><b>{{clickedTeamName}}</b></span> as it consists of only two players.
      <br><br>
      <button type="button" class="btn btn-info" v-on:click="hideTwoPlayerMessage()">Cancel</button>
    </b-modal>

    <b-modal id="modal-removePlayerMessage" centered size="md" v-bind:hide-footer="true" title="Remove Player Confirmation">
      <div>
        <p>
          <!-- <b>You are going to convert normal team into test team. Are you sure?</b>. -->
          You are about to remove player 
          <span style="text-transform:capitalize;"><b>{{removingPlayerName}}</b></span>
           from team 
           <span style="text-transform:capitalize;"><b>{{clickedTeamName}}</b></span>.
          Once you click on YES, you will not be able to add this player to the team. Are you sure?
        </p>

        <hr>

        <button type="button" class="btn btn-primary" v-on:click="removePlayer()">YES</button>
        <button type="button" class="btn btn-info" v-on:click="hideRemovePlayerModal()" style="margin-left:2%;">NO</button>
      </div>
    </b-modal>

    <b-modal id="modal-removePlayerClicked" centered size="md" v-bind:hide-footer="true" title="Remove Player">
      <table class="table">
          <tr>
            <th>Player Name</th>
            <th>Adult/Minor</th>
            <th>Rfid Id</th>
            <th>Remove Player From <br> {{teamNameDisplay}} </th>
          </tr>
          <tr v-for="(playerkey,index) in editTeamPlayers.Team_player_sessions" v-bind:key="playerkey.id" style="text-align:left;">
            <td>
              <span v-if="playerkey.player_minor_id < '1' || playerkey.player_minor_id == null" style="text-transform:capitalize;">{{playerkey.Player.Person.first_name}} {{playerkey.Player.Person.last_name}}</span>
              <span v-else style="text-transform:capitalize;"> {{playerkey.Player_minor.first_name}} {{playerkey.Player_minor.last_name}} </span>
            </td>
            <td>
              <span v-if="playerkey.player_minor_id < '1' || playerkey.player_minor_id == null" style="text-transform:capitalize;">Adult</span>
              <span v-else>Minor</span>
            </td>
            <td>
              {{playerkey.rfid_id}}
            </td>
            <td>
              <button type="button" class="btn btn-primary" v-on:click="removePlayerMessageFunction(index)">Remove</button>
            </td>
          </tr>
        </table>

        <button type="button" class="btn btn-info" v-on:click="hideRemovePlayerClicked()">Cancel</button>
    </b-modal>


    <b-modal id="modal-printScoresheet" centered size="md" v-bind:hide-footer="true" title="Print Scoresheet">
      If you trying to print the scoresheet for <span style="text-transform:capitalize;"><b>{{clickedTeamName}}</b></span>, if the scores were wrong. Then please update their score and try to print it out. If not then you may click on the Print button to print the scoresheet.
      <br><br>
      <b-row>
        <b-col cols="2"><button type="button" class="btn btn-primary" v-on:click="printScoreSheetConfirm()">Print</button></b-col>
        <b-col><button type="button" class="btn btn-info" v-on:click="cancelPrintScoreSheet()">Cancel</button></b-col>
      </b-row>
    </b-modal>

    <b-modal id="modal-success" centered size="md" v-bind:hide-footer="true" title="Message">
      Updating data and reloading the page.
    </b-modal>

    <b-modal id="modal-5sec-success" centered size="md" v-bind:hide-footer="true" title="Message">
      Updating data and reloading the page.
    </b-modal>

    <b-modal id="modal-editTeamName" centered size="md" v-bind:hide-footer="true" title="Edit Team Name">
      <b-row>
        <b-col><b>Old Team Name</b></b-col>
        <b-col lg="8">{{teamNameDisplay}}</b-col>
      </b-row>
      <br>
      <b-row>
        <b-col><b>New Team Name</b></b-col>
        <b-col lg="8"><b-form-input v-model="updateTeamName" placeholder="Please write their new team name"> </b-form-input></b-col>
      </b-row>
      <br>
      <div style="text-align:center;margin-top:2%;">
        <button type="button" class="btn btn-primary" v-on:click="submitTeamName()" v-if="updateTeamName.length > '1'">SUBMIT</button>
        <button type="button" class="btn btn-primary" v-on:click="submitTeamName()" v-else disabled>SUBMIT</button>

        <button type="button" class="btn btn-info" v-on:click="cancelTeamName()" style="margin-left:2%;">CANCEL</button>
      </div>
    </b-modal>

    <b-modal id="modal-teamScore" centered size="md" v-bind:hide-footer="true" :title="checkTitle">

      <div class="table-responsive-sm">
        <table class="table table-borderless">
          <tr>
            <td>{{room1Name}}</td>
            <td>
              <b-form-input type="text" v-model="room1Score" @input="updateTeamScore()">{{room1Score}}</b-form-input>
            </td>
          </tr>

          <tr>
            <td>{{room2Name}}</td>
            <td>
              <b-form-input type="text" v-model="room2Score" @input="updateTeamScore()">{{room2Score}}</b-form-input>
            </td>
          </tr>

          <tr>
            <td>{{room3Name}}</td>
            <td>
              <b-form-input type="text" v-model="room3Score" @input="updateTeamScore()">{{room3Score}}</b-form-input>
            </td>
          </tr>

          <tr>
            <td>{{room4Name}}</td>
            <td>
              <b-form-input type="text" v-model="room4Score" @input="updateTeamScore()">{{room4Score}}</b-form-input>
            </td>
          </tr>

          <tr>
            <td>{{room5Name}}</td>
            <td>
              <b-form-input type="text" v-model="room5Score" @input="updateTeamScore()">{{room5Score}}</b-form-input>
            </td>
          </tr>

          <tr>
            <td><b>Total Score</b></td>
            <td>
              <b-form-input type="text" v-model="totalScore" disabled>{{totalScore}}</b-form-input>
            </td>
          </tr>

        </table>
        <br>
        <b-row>
          <b-col cols="2"><button type="button" class="btn btn-primary" v-on:click="submitTeamScore()">Submit</button></b-col>
          <b-col><button type="button" class="btn btn-info" v-on:click="hideTeamScore()">Cancel</button></b-col>
        </b-row>

      </div>


    </b-modal>

    <b-modal id="modal-updateAsTestTeam" centered size="md" v-bind:hide-footer="true" :title="teamToTestTeam">
      <div>
        <p>
          <!-- <b>You are going to convert normal team into test team. Are you sure?</b>. -->
          This will hide team's information from reporting. If this team is currently playing, there WILL be problems. Are you sure?

        </p>

        <hr>

        <button type="button" class="btn btn-primary" v-on:click="submitTestTeam(1)">YES</button>
        <button type="button" class="btn btn-info" v-on:click="cancelTestTeam()" style="margin-left:2%;">NO</button>
      </div>
    </b-modal>

    <b-modal id="modal-removeAsTestTeam" centered size="md" v-bind:hide-footer="true" :title="testToNormalTeam">
      <div>
        <p>
          This will change test team into normal team. Are you sure?
        </p>

        <hr>

        <button type="button" class="btn btn-primary" v-on:click="submitTestTeam(null)">YES</button>
        <button type="button" class="btn btn-info" v-on:click="cancelTestTeam()" style="margin-left:2%;">NO</button>
      </div>
    </b-modal>


    <b-modal id="modal-booleanCloneTeams" centered size="md" v-bind:hide-footer="true">
      <!-- You are going to clone {{clonedTPS1[0].team_name}} and team 2. -->

      <div v-if="clonedTPS2.length > '0'">
        <p>
          You are going to clone <b>{{clonedTPS1[0].team_name}}</b> and <b>{{clonedTPS2[0].team_name}}</b>.
        </p>

        <hr>

        <button type="button" class="btn btn-primary" v-on:click="clonedTeamSubmitted()">SUBMIT</button>
        <button type="button" class="btn btn-info" v-on:click="cancelCloning()" style="margin-left:2%;">CANCEL</button>


      </div>


    </b-modal>

    <b-modal id="modal-activeTeams" centered size="xl" v-bind:hide-footer="true" :title="teamNameDisplay">
      <table class="table">
        <tr>
          <th>Team</th>
          <th>Mission</th>
          <th>Player Count</th>
          <th>Test Team</th>
          <th>Battle Mode</th>
          <!-- <th v-if="battleModeTeamSession > '0' ">Battle Mode</th> -->
          <th>Battle Mode Opponent</th>
          <th>Score</th>
          <th>Team Name</th>
          <th>Player</th>
        </tr>
        <tr>
          <!-- <td>{{clickedTeamName}}</td> -->
          <td>
            <!-- <a href="#/Activeteams" @click="editTeamName(clickedSessionId)" style="text-transform:capitalize;">{{teamNameDisplay}}</a> -->
            <p style="text-transform:capitalize;">{{teamNameDisplay}}</p>
          </td>
          <td>
            <b-form-select v-model="clickedMission" v-on:change="changedMission($event)">
              <option v-for="itemCategory in missions" :value="itemCategory.id" v-bind:key="itemCategory.id">{{itemCategory.name}}</option>
            </b-form-select>
          </td>

          <td>
            {{teamPlayersLength}}
          </td>

          <!-- this td defines test team or not -->
          <td v-if="testTeamSession > '0' ">
            <a href="#/Activeteams" @click="updateAsTestTeam(clickedSessionId,0)">YES</a>
          </td>
          <td v-else>
            <a href="#/Activeteams" @click="updateAsTestTeam(clickedSessionId,1)">NO</a>
          </td>

          <td v-if="battleModeTeamSession > '0' ">
            YES <br> <span v-if="clickedTeamRouteId == '1'">Side A</span>
            <span v-if="clickedTeamRouteId == '2' ">Side B</span>
          </td>
          <td v-else>NO</td>
          <!-- <td v-if="battleModeTeamSession > '0' " style="width:40%;"> -->
            <td style="width:25%;">
              <b-form-select v-model="updatedBattleModeSession" v-on:change="changedBattleModeTeam($event)">
                <option style="font-weight:bold;" :value="null"> -- None -- </option>
                <option v-for="item in teamList" :value="item.id" v-bind:key="item.id" style="text-transform:capitalize;">{{item.Team.name}}</option>
              </b-form-select>
            </td>

            <td style="width=20%;">
              <button type="button" class="btn btn-outline-primary" v-on:click="updateScoreModal()">
                Update<!-- <img src="./assets/edit.png" style="width:10%;height:10%;color:white;"/> -->
              </button>
            </td>

            <td>
              <button type="button" class="btn btn-outline-primary" v-on:click="editTeamName(clickedSessionId)">
                Update<!-- <img src="./assets/edit.png" style="width:10%;height:10%;color:white;"/> -->
              </button>
              <!-- <a href="#/Activeteams" @click="editTeamName(clickedSessionId)" style="text-transform:capitalize;">{{teamNameDisplay}}</a> -->
            </td>

            <td>
              <button type="button" class="btn btn-outline-primary" v-on:click="removePlayerClicked()">
                Remove Player<!-- <img src="./assets/edit.png" style="width:10%;height:10%;color:white;"/> -->
              </button>
            </td>

          </tr>
        </table>

        <br>
        <div>
          <button type="button" class="btn btn-primary" v-on:click="printScoresheet()" style="margin-left:1%;">PRINT SCORESHEET</button>
          <button type="button" class="btn btn-info" v-on:click="hideModalActive()" style="margin-left:1%;">DONE</button>
        </div>
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
              <option style="font-weight:bold;" value="normalMode">-- None --</option>
              <option v-for="item in teamList" :value="item.id" v-bind:key="item.id">{{item.Team.name}}</option>
            </b-form-select>
          </td>
        </tr>
      </table> -->

      <div  v-if="clickedTeamName.length > '0'">
        <p>You are going to clone team <b>{{clickedTeamName}}</b> </p>

        <button type="button" class="btn btn-primary" v-on:click="clonedTeamSubmitted()">SUBMIT</button>
        <button type="button" class="btn btn-info" v-on:click="cancelCloning()" style="margin-left:2%;">CANCEL</button>

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
            <b-list-group-item href="/#/Social">Team Summary</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>
          <!-- end of navigation menu on left side -->
        </b-col>

        <b-col lg="10">

          <b-row>
            <b-col lg="6"><p class="teamTitle1">ACTIVE TEAMS</p></b-col>
            <b-col lg="1"></b-col>
            <b-col lg="4">
              <b-row>
                <b-col><p style="padding-top:3%;" class="h5">Select team list:</p></b-col>
                <b-col>
                  <b-form-select v-model="limitTeams" class="mb-3" v-on:change="limitTeam();" title="Select teams">
                    <!-- <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option> -->

                    <b-form-select-option value="10">10</b-form-select-option>
                    <b-form-select-option value="20">20</b-form-select-option>
                    <b-form-select-option value="30">30</b-form-select-option>
                    <b-form-select-option value="40">40</b-form-select-option>
                    <b-form-select-option value="60">60</b-form-select-option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
          </b-row>

          <table class="table">
            <tr style="font-size: 1.05em;text-align:left;">
              <th style="text-align:center;padding-right:10%;width:17%;">Team Name</th>
              <th>Reservation Name</th>
              <th>Reservation Time</th>
              <!-- <th>Reservation Date</th> -->
              <th>Onboarded Time</th>
              <!-- <th style="width:10%;">Onboarded Date </th> -->
              <th>Mission</th>
              <th>Last Room</th>
              <th>Update</th>
              <th>Clone</th>
            </tr>
            <tr v-for="team in teamList" v-bind:key="team.id" style="text-align:left;">
              <td>
                <p class="detailsText">{{team.Team.name}} 
                  <span v-if="team.test > '0' "><b> / T</b></span>
                </p>
                <!-- <a href="#/Activeteams" @click="editTeamName()" style="text-transform:capitalize;">{{team.Team.name}}</a> -->
              </td>

              <td style="padding-left:1.5%;">
                <p v-if="team.reservation_id == 'null' || !team.reservation_id > '0' ">N/A</p>
                <!-- <p v-else>Booker</p> -->
                <p v-else style="text-transform: capitalize;">{{team.Reservation.Booker.Person.first_name}} {{team.Reservation.Booker.Person.last_name}}</p>
              </td>
              <td style="padding-left:1.5%;">
                <p v-if="team.reservation_id == 'null' || !team.reservation_id > '0' ">N/A</p>
                <p v-else>{{team.Reservation.reservation_for | convertTime}} <br> {{team.Reservation.reservation_for | convertDate}}</p>
              </td>

              <!-- <td style="padding-left:1.5%;">
                <p v-if="team.reservation_id == 'null' || !team.reservation_id > '0' ">N/A</p>
                <p v-else>{{team.Reservation.reservation_for | convertDate}}</p>
              </td> -->

              <td style="padding-left:1.5%;">
                {{team.session_time | convertTime}} <br>
                {{team.session_time | convertDate}}
              </td>

              <td>
                <span v-if="team.mission_id == '1'">Cyberbot</span>
                <span v-if="team.mission_id == '2'">Block Monster</span>
                <span v-if="team.mission_id == '3'">Cyberbot Pro</span>
                <span v-if="team.mission_id == '4'">Cyberbot Halloween</span>
                <span v-if="team.mission_id == '5'">Game Bay Mini Mission</span>
                <span v-if="team.mission_id == '6'">Game Bay Floor grid bonanza</span>
                <span v-if="team.mission_id == '7'">Game Bay No RFID games</span>
                <span v-if="team.mission_id == '8'">Block Monster 5min Qualifier</span>
                <span v-if="team.mission_id == '9'">Block Monster 5min Semi Final</span>
                <span v-if="team.mission_id == '10'">Block Monster 10min Final</span>

                <!-- <p>{{team.mission_id | convertMissionId}}</p> -->
                <span v-if="team.team_vs_team_id > '0'" ><br>Battle Mode</span>
              </td>

              <td>
                <!-- Last Room -->
                <p v-if="team.Session_game_scores.length > '0'">{{team.Session_game_scores | currentRoomStatus}}</p>
                <p v-else>N/A</p>
              </td>

              <td style="padding-left:1.5%;">
                <button type="button" class="btn btn-info" v-on:click="editTeamDetails(team.id,1)">Edit</button>
                <!-- <b-button v-on:click="editTeamDetails(team.id)">Edit</b-button> -->
              </td>

              <td style="padding-left:2.5%;">
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
        updatedBattleModeSession:null,
        limitTeams:20,
        missions:[],
        cloneTeamsValue:[],
        clonedTPS1:[],
        clonedTPS2:[],
        clonedTeam1SessionId:'',
        updateTeamName:'',
        clickedTeamRouteId:'',
        convertClickedTeamName:'',
        // limitTeamList:'',

        /** make test session,reservation,booker,players,people,minors,team player session**/
        sessionMadeTest:'',
        tpsMadeTest:'',
        // clonedTeam2SessionId:''
        // clickedBattleModeTeam:'',

        room1Score:'',
        room2Score:'',
        room3Score:'',
        room4Score:'',
        room5Score:'',
        totalScore:'',

        room1Name:'',
        room2Name:'',
        room3Name:'',
        room4Name:'',
        room5Name:'',

        gameId1:'',
        gameId2:'',
        gameId3:'',
        gameId4:'',
        gameId5:'',

        editTeamPlayers:[],
        teamPlayersLength: '',
        removePlayerIndex:'',
        removingPlayerName:'',

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
        return formattime;
      },

      convertDate(value){
        if(value == null){
          return 'Empty'
        }
        var formatDate = moment(value).format('MM-DD-YYYY');
        return formatDate;
      },

      currentRoomStatus(value){
        // console.log(value);
        if(value == null){
          return 'Empty'
        }
        else{
          var getRoomName = value[value.length - 1];
          // console.log(getRoomName);
          var gameIdFetched = getRoomName.game_id;
          

          if(gameIdFetched == '1'){
            return 'Hack Attack';
          }
          if(gameIdFetched == '2'){
            return 'Laser Maze';
          }
          if(gameIdFetched == '3'){
            return 'Echo Chamber';
          }
          if(gameIdFetched == '4'){
            return 'Floor Grid';
          }
          if(gameIdFetched == '5'){
            return 'Cyberbot';
          }


          if(gameIdFetched == '6'){
            return 'Halloween Hack Attack';
          }
          if(gameIdFetched == '7'){
            return 'Halloween Laser Maze';
          }
          if(gameIdFetched == '8'){
            return 'Halloween Echo Chamber';
          }
          if(gameIdFetched == '9'){
            return 'Halloween Floor Grid';
          }
          if(gameIdFetched == '10'){
            return 'Halloween Cyberbot';
          }


          if(gameIdFetched == '11'){
            return 'Seqeuncer';
          }
          if(gameIdFetched == '12'){
            return 'Crypto Lazer';
          }
          if(gameIdFetched == '13'){
            return 'Mad Dash';
          }
          if(gameIdFetched == '14'){
            return 'Low Battery';
          }
          if(gameIdFetched == '15'){
            return 'Block Monster';
          }


          if(gameIdFetched == '16'){
            return 'Hack Attack Pro';
          }
          if(gameIdFetched == '17'){
            return 'Lazer Maze Pro';
          }
          if(gameIdFetched == '18'){
            return 'Echo Chamber Pro';
          }
          if(gameIdFetched == '19'){
            return 'Floor Grid Pro';
          }
          if(gameIdFetched == '20'){
            return 'Cyberbot Pro';
          }

          if(gameIdFetched == '100'){
            return 'Ready Room';
          }

          if(gameIdFetched < '1' || gameIdFetched > '20' && gameIdFetched != '100'){
            return 'N/A';
          }

        }
        return 'value';
      },
      // convertMissionId(data){
      //   console.log(data);
      //   console.log('convert mission name');

      //   axios.get(process.env.VUE_APP_DATABASE_MISSION+data,{
      //     // score: this.room2Score
      //   })
      //   .then(response => {
      //     console.log(response.data.name);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      //   return 1;
      // },

    },

    computed:{
      checkTitle(){
        return this.convertClickedTeamName+' Update Score';
      },

      updateTeamNameTitle(){
        return 'Edit '+this.convertClickedTeamName;
      },

      teamNameDisplay(){
        return this.convertClickedTeamName;
      },

      teamToTestTeam(){
        // const lower = this.clickedTeamName.toLowerCase();
        // return this.clickedTeamName.charAt(0).toUpperCase() + lower.slice(1);
        return this.convertClickedTeamName+' - Convert to Test Team'
      },

      testToNormalTeam(){
        // const lower = this.clickedTeamName.toLowerCase();
        // return this.clickedTeamName.charAt(0).toUpperCase() + lower.slice(1);
        return this.convertClickedTeamName+' - Convert to Normal Team'
      }

    },

    methods:{

      removePlayerClicked(){
        this.$bvModal.show('modal-removePlayerClicked');
      },

      removePlayerMessageFunction(index){

        if(this.editTeamPlayers.Team_player_sessions.length > '2'){
          this.removePlayerIndex = index;

          /** looks for minor players **/
          if(this.editTeamPlayers.Team_player_sessions[index].player_minor_id > '0'){ 
            this.removingPlayerName = this.editTeamPlayers.Team_player_sessions[index].Player_minor.first_name+' '+this.editTeamPlayers.Team_player_sessions[index].Player_minor.last_name;
          }
          /** looks for adult players **/
          else{
            this.removingPlayerName = this.editTeamPlayers.Team_player_sessions[index].Player.Person.first_name+' '+this.editTeamPlayers.Team_player_sessions[index].Player.Person.last_name;
          }
          this.$bvModal.show('modal-removePlayerMessage');
        }
        else{
          this.$bvModal.show('modal-twoPlayerMessage');
        }
        

      },

      hideRemovePlayerClicked(){
        this.$bvModal.hide('modal-removePlayerClicked');
      },

      hideRemovePlayerModal(){
        this.$bvModal.hide('modal-removePlayerMessage');
      },

      hideTwoPlayerMessage(){
        this.$bvModal.hide('modal-twoPlayerMessage');
      },

      removePlayer(){
        console.log('clicked on remove player');
        console.log(this.clickedSessionId);
        var index = this.removePlayerIndex;
        console.log('index was '+index);
        console.log(this.editTeamPlayers.Team_player_sessions[index]);

        /** remove minor **/

        if(this.editTeamPlayers.Team_player_sessions[index].player_minor_id > '0'){
          console.log('remove minor from a team');

          var tpsPlayerMinorId =  this.editTeamPlayers.Team_player_sessions[index].id;
          var personId = this.editTeamPlayers.Team_player_sessions[index].player_minor_id;
          var reservationId = this.editTeamPlayers.Team_player_sessions[index].reservation_id;

          console.log('person id was '+personId);
          console.log('reservation id was '+reservationId);

          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+tpsPlayerMinorId,{
            // test: 1
          })
          .then(response => {

            console.log('deleted player from tps');

            axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{

            })
            .then(response => {
              console.log(response.data);
              var tpsTotalPlayers = response.data.Team_player_sessions.length;
              console.log('total players in tps is '+tpsTotalPlayers);

              axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
                player_count:tpsTotalPlayers
              })
              .then(response => {
                console.log(response);
                console.log('updated player count in session');


                /** update on reservation_minor table **/

                axios.put(process.env.VUE_APP_RESERVATION_MINORS+'/player_minor/'+personId+'/reservation/'+reservationId,{
                  session_id: null /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {
                  console.log('updated reservation minor table as null');
                  console.log(response);

                  this.$bvModal.show('modal-removedPlayer');

                  this.reloadFuntion();

                })
                .catch(function (error) {
                  console.log(error);
                });

                /** end of update on reservation_people player table **/

              })
              .catch(function (error) {
                console.log(error);
              });
            })
            .catch(function (error) {
              console.log(error);
            });

          })
          .catch(function (error) {
            console.log(error);
          });


        }

        /** remove adult **/

        else{
          console.log('remove player from a team');

          var tpsPlayerId =  this.editTeamPlayers.Team_player_sessions[index].id;
          var personId = this.editTeamPlayers.Team_player_sessions[index].player_id;
          var reservationId = this.editTeamPlayers.Team_player_sessions[index].reservation_id;

          console.log('person id was '+personId);
          console.log('reservation id was '+reservationId);

          axios.delete(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/'+tpsPlayerId,{
            // test: 1
          })
          .then(response => {

            console.log('deleted player from tps');

            axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{

            })
            .then(response => {
              console.log(response.data);
              var tpsTotalPlayers = response.data.Team_player_sessions.length;
              console.log('total players in tps is '+tpsTotalPlayers);

              axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
                player_count:tpsTotalPlayers
              })
              .then(response => {
                console.log(response);
                console.log('updated player count in session');


                /** update on reservation_people table **/

                axios.put(process.env.VUE_APP_RESERVATION_PEOPLE+'/person/'+personId+'/reservation/'+reservationId,{
                  session_id: null /** countondrop1 is length of an array so if its 0 by adding it 1 it will be 1 **/
                })
                .then(response => {
                  console.log('updated reservation people table as null');
                  console.log(response);

                  this.$bvModal.show('modal-removedPlayer');

                  this.reloadFuntion();

                })
                .catch(function (error) {
                  console.log(error);
                });

                /** end of update on reservation_people player table **/

              })
              .catch(function (error) {
                console.log(error);
              });
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

      cancelPrintScoreSheet(){
        this.$bvModal.hide('modal-printScoresheet');
      },

      printScoreSheetConfirm(){

        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
          stats_printed: null
        })
        .then(response => {
          // this.totalScore = response.data.total_score;
          console.log(response);
          console.log('updated printed value in session table');
          
          this.$bvModal.show('modal-printScoresheetMessage');

          this.reloadFuntion();

        })
        .catch(function (error) {
          console.log(error);
        });

      },

      printScoresheet(){
        console.log('printScoresheet');
        console.log(this.clickedSessionId);

        this.$bvModal.show('modal-printScoresheet');
      },

      updateTeamScore(){
        console.log('update score here');

        if(this.room5Score == '0'){
          this.room5Score = 1;
        }

        this.totalScore = (parseInt(this.room1Score)+parseInt(this.room2Score)+parseInt(this.room3Score)+parseInt(this.room4Score))*parseInt(this.room5Score);

      },

      submitTeamScore(){

        /** update score **/
        
        /** Room 1 update score **/
        axios.put(process.env.VUE_APP_SESSION_GAME_SCORES+'/game/'+this.gameId1+'/session/'+this.clickedSessionId,{
          score: this.room1Score
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** Room 2 update score **/
        axios.put(process.env.VUE_APP_SESSION_GAME_SCORES+'/game/'+this.gameId2+'/session/'+this.clickedSessionId,{
          score: this.room2Score
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** Room 3 update score **/
        axios.put(process.env.VUE_APP_SESSION_GAME_SCORES+'/game/'+this.gameId3+'/session/'+this.clickedSessionId,{
          score: this.room3Score
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** Room 4 update score **/
        axios.put(process.env.VUE_APP_SESSION_GAME_SCORES+'/game/'+this.gameId4+'/session/'+this.clickedSessionId,{
          score: this.room4Score
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** Room 5 Update Score **/
        axios.put(process.env.VUE_APP_SESSION_GAME_SCORES+'/game/'+this.gameId5+'/session/'+this.clickedSessionId,{
          score: this.room5Score
        })
        .then(response => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        /** Total Score update on session table **/
        axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
          total_score: this.totalScore
        })
        .then(response => {
          this.totalScore = response.data.total_score;
        })
        .catch(function (error) {
          console.log(error);
        });


        /** end of update score **/

        this.$bvModal.hide('modal-teamScore');
      },

      hideTeamScore(){
        this.$bvModal.hide('modal-teamScore');
      },

      updateScoreModal(){
        this.$bvModal.show('modal-teamScore');

        console.log(this.clickedSessionId);
        console.log(this.clickedTeamName);
        console.log(this.clickedMission);

        if(this.clickedMission == '1'){
          var gameIdRoom1 = '1';
          var gameIdRoom2 = '2';
          var gameIdRoom3 = '3';
          var gameIdRoom4 = '4';
          var gameIdRoom5 = '5';

          this.gameId1 = gameIdRoom1;
          this.gameId2 = gameIdRoom2;
          this.gameId3 = gameIdRoom3;
          this.gameId4 = gameIdRoom4;
          this.gameId5 = gameIdRoom5;

          this.room1Name = 'Hack Attack';
          this.room2Name = 'Laser Maze';
          this.room3Name = 'Echo Chamber';
          this.room4Name = 'Floor Grid';
          this.room5Name = 'Cyberbot';

        }

        if(this.clickedMission == '2'){
          gameIdRoom1 = '11';
          gameIdRoom2 = '12';
          gameIdRoom3 = '13';
          gameIdRoom4 = '14';
          gameIdRoom5 = '15';

          this.gameId1 = gameIdRoom1;
          this.gameId2 = gameIdRoom2;
          this.gameId3 = gameIdRoom3;
          this.gameId4 = gameIdRoom4;
          this.gameId5 = gameIdRoom5;

          this.room1Name = 'Sequencer';
          this.room2Name = 'Cryto Laser';
          this.room3Name = 'Mad Dash';
          this.room4Name = 'Low Battery';
          this.room5Name = 'Block Monster';
        }

        if(this.clickedMission == '8'){
          gameIdRoom1 = '11';
          gameIdRoom2 = '12';
          gameIdRoom3 = '13';
          gameIdRoom4 = '14';
          gameIdRoom5 = '15';

          this.gameId1 = gameIdRoom1;
          this.gameId2 = gameIdRoom2;
          this.gameId3 = gameIdRoom3;
          this.gameId4 = gameIdRoom4;
          this.gameId5 = gameIdRoom5;

          this.room1Name = 'Sequencer';
          this.room2Name = 'Cryto Laser';
          this.room3Name = 'Mad Dash';
          this.room4Name = 'Low Battery';
          this.room5Name = 'Block Monster';
        }

        if(this.clickedMission == '9'){
          gameIdRoom1 = '11';
          gameIdRoom2 = '12';
          gameIdRoom3 = '13';
          gameIdRoom4 = '14';
          gameIdRoom5 = '15';

          this.gameId1 = gameIdRoom1;
          this.gameId2 = gameIdRoom2;
          this.gameId3 = gameIdRoom3;
          this.gameId4 = gameIdRoom4;
          this.gameId5 = gameIdRoom5;

          this.room1Name = 'Sequencer';
          this.room2Name = 'Cryto Laser';
          this.room3Name = 'Mad Dash';
          this.room4Name = 'Low Battery';
          this.room5Name = 'Block Monster';
        }

        if(this.clickedMission == '10'){
          gameIdRoom1 = '11';
          gameIdRoom2 = '12';
          gameIdRoom3 = '13';
          gameIdRoom4 = '14';
          gameIdRoom5 = '15';

          this.gameId1 = gameIdRoom1;
          this.gameId2 = gameIdRoom2;
          this.gameId3 = gameIdRoom3;
          this.gameId4 = gameIdRoom4;
          this.gameId5 = gameIdRoom5;

          this.room1Name = 'Sequencer';
          this.room2Name = 'Cryto Laser';
          this.room3Name = 'Mad Dash';
          this.room4Name = 'Low Battery';
          this.room5Name = 'Block Monster';
        }

        axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/session/'+this.clickedSessionId+'/game/'+gameIdRoom1,{

        })
        .then(response => {
          console.log(response);
          this.room1Score = response.data.score;
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/session/'+this.clickedSessionId+'/game/'+gameIdRoom2,{

        })
        .then(response => {
          console.log(response);
          this.room2Score = response.data.score;
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/session/'+this.clickedSessionId+'/game/'+gameIdRoom3,{

        })
        .then(response => {
          console.log(response);
          this.room3Score = response.data.score;
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/session/'+this.clickedSessionId+'/game/'+gameIdRoom4,{

        })
        .then(response => {
          console.log(response);
          this.room4Score = response.data.score;
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/session/'+this.clickedSessionId+'/game/'+gameIdRoom5,{

        })
        .then(response => {
          console.log(response);
          this.room5Score = response.data.score;
        })
        .catch(function (error) {
          console.log(error);
        });

        /** end point below will check on total score **/
        axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{

        })
        .then(response => {
          this.totalScore = response.data.total_score;
        })
        .catch(function (error) {
          console.log(error);
        });

        /** end of total score endpoint **/

      },

      limitTeam(){
        console.log('select '+this.limitTeams+' list to display.');
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

        hideModalActive(){
          this.$bvModal.hide('modal-activeTeams');
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

        var testValue = this.clonedTPS1[0].test;

        // if(this.clonedTPS1[0].reservation_id > '0' && this.clonedTPS1[0].team_id > '0'){
          if(this.clonedTPS1[0].team_id > '0'){

            axios.post(process.env.VUE_APP_DATABASE_SESSIONS,{
              location_id: 1,
              reservation_id: this.clonedTPS1[0].reservation_id,
              mission_id: this.clickedMission,
              session_time: moment().format('YYYY-MM-DD HH:mm:00'),
              team_id: this.clonedTPS1[0].team_id,
              route_id: 1, /** this is for side A **/
              active: 1,
              player_count: this.clonedTPS1.length,
              test: testValue
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
                  reservation_id: this.clonedTPS1[i].reservation_id,
                  test: testValue
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
          // var testvalue = response.data.test;

          for (var i = 0; i < teamPlayerSession1.length; i++) {
            console.log(i);
            console.log(teamPlayerSession1[i]);

            var tpsPlayerId = teamPlayerSession1[i].player_id;
            var tpsMinorId = teamPlayerSession1[i].player_minor_id;
            var tpsReservationId = teamPlayerSession1[i].reservation_id;
            var tpsTeamId = teamPlayerSession1[i].team_id;
            var tpsRfid = teamPlayerSession1[i].rfid_id;
            var tpsTestValue = teamPlayerSession1[i].test;
              // var tpsTeamName1 = response.data.Team.name;


              var tpsDetail1 = {
                'player_id' : tpsPlayerId,
                'player_minor_id' : tpsMinorId,
                'reservation_id' : tpsReservationId,
                'team_id' : tpsTeamId,
                'rfid_id' : tpsRfid,
                // 'team_name' : tpsTeamName1
                'team_name' : this.clickedTeamName,
                'test' : tpsTestValue
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

        if(event == null){ /** change battle mode into normal mode **/
          console.log('its a normal team');
          this.changedIntoNormalTeam();
        }

        else{ /** convert into battle mode team **/

          console.log('first team sesssion id '+this.clickedSessionId);
          console.log('second team session id '+event);

          axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.clickedSessionId,{
            team_vs_team_id : event, /** updates second session id on first one **/
            route_id : 1
          })
          .then(response => {
            console.log(response);

            axios.put(process.env.VUE_APP_DATABASE_SESSIONS+'/'+event,{
              team_vs_team_id : this.clickedSessionId, /** updates first session id on second one **/
              route_id : 2
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

          this.editTeamPlayers = response.data;

          this.teamPlayersLength = response.data.Team_player_sessions.length;

          // this.teamList = response.data;
          this.clickedTeamName = response.data.Team.name;

          this.convertClickedTeamName = this.clickedTeamName.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });

          this.clickedMission = response.data.mission_id;
          this.testTeamSession = response.data.test;
          this.battleModeTeamSession = response.data.team_vs_team_id;
          this.updatedBattleModeSession = response.data.team_vs_team_id;
          this.clickedTeamRouteId = response.data.route_id;

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
