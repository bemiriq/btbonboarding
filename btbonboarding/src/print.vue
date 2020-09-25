<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <b-modal id="modal-center" centered title="BootstrapVue">
    <p class="my-4">Vertically centered modal!</p>
  </b-modal>

    <div class="bv-example-row" style="width: 80%;margin:auto;">
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item>
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
            <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item>
            <b-list-group-item href="/#/Print" active>Print Scoresheet</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10" style="background-color:#fafafa; font-weight: bold;">
          <b-col>
            <b-form-group id="input-group-3" label-for="input-3">
              <b-form-select v-model="teamSelectedIndex" v-on:change="teamNameSelected(event)">
                  <option v-for="item in teamList" v-bind:key="item.id" :value="item.id">{{item.Team.name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <!-- <p> DISPLAY 1 </p> -->
          <b-col v-if="onselect == '1'">
            <!-- <button @click="printWindow('san')">Print</button> -->
            <b-button variant="success" @click="printWindow('san')">PRINT NOW</b-button>

            <div id="section-to-print">
              <!-- <b-row>

                <b-col class="firstdiv">
                  FIRST
                </b-col>
                
                <b-col class="seconddiv">
                  SECOND
                </b-col>
                
                <b-col class="thirddiv">
                  THIRD
                </b-col>
              
              </b-row> -->

              <div class="container">

                <div class="row">

                  <div class="col-sm-3 firstdiv">
                    <!-- <div class="missiontitle">MISSION 01:</div> -->
                    <div class="missiontitle">{{missionTitle}}:</div>
                    <div class="maingameImage">
                      <img v-bind:src="require('./assets/' + roomname5 +' Logo.png')" class="gameLogo"/>
                    </div>
                    <div class="hrlength">
                    </div>

                    <div class="gametext">GAMES</div>

                    <div class="gamelogo1">
                      <img v-bind:src="require('./assets/' + roomname1 +' Logo.png')" v-bind:class="gamestatus" />
                    </div>

                    <div class="gamelogo2">
                      <img v-bind:src="require('./assets/' + roomname2 +' Logo.png')"  v-bind:class="gamestatus" />
                    </div>

                    <div class="gamelogo3">
                      <img v-bind:src="require('./assets/' + roomname3 +' Logo.png')"  v-bind:class="gamestatus" />
                    </div>

                     <div class="gamelogo4">
                      <img v-bind:src="require('./assets/' + roomname4 +' Logo.png')"  v-bind:class="gamestatus" />
                    </div>


                  </div>

                  <div class="col-sm seconddiv">
                    
                    <div class="btblogo">
                      <img src="./assets/btb.png" class="btblogodetail"/>
                    </div>

                    <div class="performanceText">
                      PERFORMANCE REPORT
                    </div>


                    <div class="playerDiv">
                      <ul class="list-group list-group-horizontal playertext">
                        <!-- <li class="list-group-item playertext" v-for="playername in playerNamesList" v-bind:key="playername.id">{{playername.full_name}}</li> -->
                        <li class="list-group-item playertext" v-for="playername in playerNamesList" v-bind:key="playername.id">{{playername.full_name}}</li>
                      </ul>

                    </div>

                    <!-- <div class="teamnametext"> TEAM </div> -->

                    <div class="teamtext">
                      <!-- TEAM SANDU GANDU MANDU -->
                      {{teamname}}
                    </div>

                    <div class="datetext">
                      {{date}}
                    </div>

                    <div class="timeEarnedColumn">
                      TIME EARNED
                    </div>

                    <div class="timeEarnedRoom1">
                      {{room1}}
                    </div>

                    <div class="timeEarnedRoom2">
                      {{room2}}
                    </div>

                    <div class="timeEarnedRoom3">
                      {{room3}}
                    </div>

                    <div class="timeEarnedRoom4">
                      {{room4}}
                    </div>

                    <div class="percentileColumn">
                      PERCENTILE
                    </div>

                    <div class="percentileRoom1">
                      {{hackAttackPercentage}}%
                    </div>

                    <div class="percentileRoom2">
                      {{laserMazePercentage}}%
                    </div>

                    <div class="percentileRoom3">
                      {{echoChamberPercentage}}%
                    </div>

                    <div class="percentileRoom4">
                      {{floorGridPercentage}}%
                    </div>

                    <div class="timeEarnedBox">
                      
                    </div>

                    <div class="timeEarnedBoxText">
                      TIME EARNED TO DEFEAT <br> <!-- BLOCK MONSTER -->
                      {{missionDetailTitle}}
                    </div>

                    <div class="timeEarnedWhiteBox">

                    </div>

                    <div class="timeEarnedWhiteBoxText">
                      {{bombtime}}
                    </div>

                    <div class="finalResultText">
                      FINAL RESULTS
                    </div>

                    <div class="bombDigitDiv">
            
                    </div>

                    <div class="bombDigitTitle">
                      BOMB DIGITS DECODED
                    </div>

                    <div class="didYouBTBdiv">
                     <!--  BOMB DIGIT DECODED -->
                    </div>

                    <div class="didYouBTBTitle">
                      DID YOU BEAT THE BOMB ?
                    </div>

                    <div class="bombDigitDecoded">
                      {{bombDigitDecoded}}
                    </div>

                    <div class="bombBoolean">
                      <b v-if="bombDigitDecoded > 9">YES</b>
                      <b v-else>NO</b>
                      <!-- <p v-if="bombDigitDecoded > '9'">YES</p>
                      <p v-else>NO</p> -->
                    </div>

                    <div class="totalScoreDiv">

                    </div>

                    <div class="overallRankingDiv">

                    </div>

                    <div class="totalScoreTitle">
                      TOTAL SCORE
                    </div>

                    <div class="overallRankingTitle">
                      OVERALL RANKING
                    </div>

                    <div class="digitsTime">
                      {{totalBombTime}} seconds x {{bombDigitDecoded}} digits
                    </div>

                    <div class="digitsTimeCalculation">
                      {{total_score}}
                    </div>

                    <div class="totalRankings">
                      {{teamRank}}th out of {{totalTeams}} teams
                    </div>

                    <div class="totalRankingsPercantile">
                      56 %
                    </div>

                  </div>

                  <!-- <div class="col-sm thirddiv"> -->

                    <!-- <div class="teamnametext">
                      YO HO HAI TEAM NAME
                    </div> -->

                    <!-- <div> SAN </div> -->

                    <!-- <div class="teamnametext">
                      08-09-2020
                    </div> -->
                  <!-- </div> -->
                </div>

              </div>

              <!-- <div>
                <img v-bind:src="require('./assets/' + roomname5 +'.png')" class="gameLogo"/>
              </div>

              <div>
                <img v-bind:src="require('./assets/' + roomname1 +'.png')" class="gameLogo"/>
              </div>

              <div>
                <img v-bind:src="require('./assets/' + roomname2 +'.png')" class="gameLogo"/>
              </div>

              <div>
                <img v-bind:src="require('./assets/' + roomname3 +'.png')" class="gameLogo"/>
              </div>

              <div>
                <img v-bind:src="require('./assets/' + roomname4 +'.png')" class="gameLogo"/>
              </div>

              <div> TEAM NAME = {{teamname}}</div>

              <br> 
              <div> PLAYER NAME </div>
              <div v-for="list in playerNamesList" v-bind:key="list.id">{{list.full_name}}</div>

              <br>
              <div> DATE = {{teamdate}}</div>
              <div> ROOM 1 SCORE = {{room1}}</div>
              <div> ROOM 2 SCORE = {{room2}}</div>
              <div> ROOM 3 SCORE = {{room3}}</div>
              <div> ROOM 4 SCORE = {{room4}}</div>
              <div> ROOM 5 SCORE = {{room5}}</div>
              <div> BOMB TIME = {{bombtime}}</div>
              <div> TOTAL SCORE = {{total_score}}</div> -->

            </div>
          </b-col>

          <b-col v-else> ELSE </b-col>

        </b-col>

        
      </b-row>
    </div>

  </div>

</template>

<script src="moment.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>

<script>

import moment from 'moment';
import axios from 'axios';

  export default {
    name: 'App',
    components: {
      // HelloWorld
    },

    data(){
      return{
        teamList:[],
        teamClicked: [],
        onselect: '',
        teamSelectedIndex: '',
        // playerNamesList: [
        //   {full_name:'Sandu Sher'},
        //   {full_name:'Alexander Patterson'},
        //   {full_name:'Jesse John'},
        //   {full_name:'Sandesh Phuyal'},
        //   {full_name:'Alexander Patterson'},
        //   {full_name:'Chuck Fletcher'}
        // ],
        playerNamesList: [],

        missionDetailTitle:'',

        teamdate: '08/27/2020',

        bombtime: '',
        total_score: '',
        size: '',
        winners: '',
        teamname: '',

        room1:'',
        room2:'',
        room3:'',
        room4:'',
        room5:'',

        roomname1:'',
        roomname2:'',
        roomname3:'',
        roomname4:'',
        roomname5:'',

        bombDigitDecoded: '',
        date: '',
        totalSeconds: '',
        laserMazePercentage: '',
        echoChamberPercentage: '',
        floorGridPercentage: '',
        bombRoomPercentage: '',
        hackAttackPercentage: '',
        totalBombTime: '',
        teamRank: '',
        totalTeams: ''

      }

    },

    computed:{

        teamNameSelected: function (){

          console.log("INSIDE TEAM NAME FUNCTION");

          this.onselect = '1';

          var event = this.teamSelectedIndex;

          console.log(event);

          axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+event,{
          // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

          })
          .then(response => {
            console.log(response);
            console.log(response.data);
            this.teamClicked = response.data;

            console.log(this.teamClicked);

              var onlyDate = this.teamClicked.updatedAt;
              console.log("ONLY DATE "+onlyDate);

              var filterByDate = moment(onlyDate).format('MM-DD-YYYY');
              this.date = filterByDate;

              console.log(filterByDate);

              console.log("BOMB TIME "+this.teamClicked.bomb_time);

              // this.totalBombTime = this.teamClicked.bomb_time;

              var totalBombTime = this.teamClicked.bomb_time;
              this.bombtime = moment().startOf('day').seconds(totalBombTime).format("mm:ss");

              this.totalBombTime = totalBombTime;
              this.total_score = this.teamClicked.total_score;

              // if(this.teamClicked.total_score > 1500 && this.teamClicked.Session_game_scores[1].game_id < 6){
              //   this.teamRank = '5336';
              // }
              // if(this.teamClicked.total_score > 850 && this.teamClicked.Session_game_scores[1].game_id < 6){
              //   this.teamRank = '8734';
              // }
              // if(this.teamClicked.total_score > 2000 && this.teamClicked.Session_game_scores[1].game_id < 6){
              //   this.teamRank = '2549';
              // }
              // if(this.teamClicked.total_score > 2500 && this.teamClicked.Session_game_scores[1].game_id < 6){
              //   this.teamRank = '1583';
              // }
              // if(this.teamClicked.total_score > 3000 && this.teamClicked.Session_game_scores[1].game_id < 6){
              //   this.teamRank = '986';
              // }
              // if(this.teamClicked.total_score > 3600 && this.teamClicked.Session_game_scores[1].game_id < 6){
              //   this.teamRank = '488';
              // }

              // if(this.teamClicked.total_score > 1300 && this.teamClicked.Session_game_scores[1].game_id > 5){
              //   this.teamRank = '68';
              // }
              // if(this.teamClicked.total_score > 850 && this.teamClicked.Session_game_scores[1].game_id > 5){
              //   this.teamRank = '97';
              // }
              // if(this.teamClicked.total_score > 1700 && this.teamClicked.Session_game_scores[1].game_id > 5){
              //   this.teamRank = '48';
              // }
              // if(this.teamClicked.total_score > 2000 && this.teamClicked.Session_game_scores[1].game_id > 5){
              //   this.teamRank = '17';
              // }
              // if(this.teamClicked.total_score > 2500 && this.teamClicked.Session_game_scores[1].game_id > 5){
              //   this.teamRank = '11';
              // }
              // if(this.teamClicked.total_score > 3600 && this.teamClicked.Session_game_scores[1].game_id > 5){
              //   this.teamRank = '5';
              // }

              /** BEGINING OF MISSION 1 IF **/
              if(this.teamClicked.mission_id == '1'){
                    
                    console.log(" IT WAS MISSION 1");

                    this.total_score = this.teamClicked.total_score;

                    var missionid = this.teamClicked.mission_id;
                    var totalScore = this.teamClicked.total_score;

                    /** THIS WILL PROVIDE US A RANK and RANK % **/
                    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/rank/mission/'+missionid+'/total_score/'+totalScore,{

                    })
                    .then(response => {
                      console.log(response);
                      console.log(response.data.rank);
                      console.log(response.data.total_session_count);
                      this.teamRank = response.data.rank;
                      this.totalTeams = response.data.total_session_count;
                    })

                    .catch(function (error) {
                      console.log(error);
                    });
                    /** END OF RANK AND RANK % **/


                    this.size = this.teamClicked.player_count;
                    this.winners = this.teamClicked.winners;

                    this.teamname = this.teamClicked.Team.name;

                    var teamLength = this.teamClicked.Team_player_sessions.length;
                    console.log(teamLength);

                    var replyDataObj1 = this.playerNamesList;

                    for(let j=0; j < teamLength; j++){

                      if(this.teamClicked.Team_player_sessions[j].player_minor_id == null){

                        var playerLastName = this.teamClicked.Team_player_sessions[j].Player.Person.last_name;
                        var playerFirstName = this.teamClicked.Team_player_sessions[j].Player.Person.first_name;

                        console.log(playerFirstName+' '+playerLastName);

                        replyDataObj1[j]={
                            "first_name": playerFirstName,
                            "last_name": playerLastName,
                            "full_name": playerFirstName+' '+playerLastName
                          }

                      }
                      else{
                        var minorlastname = this.teamClicked.Team_player_sessions[j].Player_minor.last_name;
                        var minorfirstname = this.teamClicked.Team_player_sessions[j].Player_minor.first_name;

                        console.log(minorfirstname+' '+minorlastname);

                        replyDataObj1[j]={
                            "first_name": minorfirstname,
                            "last_name": minorlastname,
                            "full_name": minorfirstname+' '+minorlastname
                          }
                      }
                      
                    }
                      
                      console.log(replyDataObj1);
                      this.playerNamesList = replyDataObj1;

                    /** THIS IS MISSION 1 **/
                    // if(){

                    // }

                    // * THIS IS MISSION 2 *
                    // if(){

                    // }


                    /** THIS IS THE BOMB ROOM **/
                    if(this.teamClicked.Session_game_scores[5].score == undefined){
                      this.room5 = '00:00';
                    }
                    else{
                      var room5Score = this.teamClicked.Session_game_scores[5].score;

                      console.log(room5Score);

                      this.room5 = moment().startOf('day').seconds(room5Score).format("mm:ss");

                      this.bombDigitDecoded = this.teamClicked.Session_game_scores[5].score;
                      this.totalSeconds = this.teamClicked.bomb_time;

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[5].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room5Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        this.bombRoomPercentage = Math.round(filterIntoPercentile);

                        console.log("ABOVE DATA BM");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }
                    /** END OF BOMB ROOM **/

                    /** THIS IS ECHO CHAMBER ROOM **/

                    if(this.teamClicked.Session_game_scores[3].score == undefined){
                      this.room3 = '00:00';
                    }
                    else{
                      var room3Score = this.teamClicked.Session_game_scores[3].score;

                      console.log(room3Score);

                      this.room3 = moment().startOf('day').seconds(room3Score).format("mm:ss");

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[3].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room3Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        this.echoChamberPercentage = Math.round(filterIntoPercentile);

                        console.log("ABOVE DATA EC");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }

                    /** END OF ECHO CHAMBER **/


                    /** THIS IS HACK ATTACK ROOM **/

                    if(this.teamClicked.Session_game_scores[1].score == undefined){
                      this.room1 = '00:00';
                    }
                    else{
                      var room1Score = this.teamClicked.Session_game_scores[1].score;

                      console.log(room1Score);

                      this.room1 = moment().startOf('day').seconds(room1Score).format("mm:ss");

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[1].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room1Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        this.hackAttackPercentage = Math.round(filterIntoPercentile);

                        console.log("ABOVE DATA HA");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }

                    /** END OF HACK ATTACK **/


                    /** THIS IS FLOOR GRID ROOM **/

                    if(this.teamClicked.Session_game_scores[4].score == undefined){
                      this.room4 = '00:00';
                    }
                    else{
                      var room4Score = this.teamClicked.Session_game_scores[4].score;

                      console.log(room4Score);

                      this.room4 = moment().startOf('day').seconds(room4Score).format("mm:ss");

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[4].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room4Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        this.floorGridPercentage = Math.round(filterIntoPercentile);

                        console.log("ABOVE DATA FG");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }

                    /** END OF FLOOR GRID **/

                    /** THIS IS LASER MAZE ROOM **/

                    if(this.teamClicked.Session_game_scores[2].score == undefined){
                      this.room2 = '00:00';
                    }
                    else{
                      var room2Score = this.teamClicked.Session_game_scores[2].score;

                      console.log(room2Score);

                      this.room2 = moment().startOf('day').seconds(room2Score).format("mm:ss");

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[2].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room2Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        var roomPercentage = Math.round(filterIntoPercentile);

                        this.laserMazePercentage = roomPercentage;


                        console.log("ABOVE DATA LM");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }

                    /** END OF LASER MAZE **/


                    // if(this.teamClicked.Session_game_scores[2].score == undefined){
                    //   this.room4 = '00:00';
                    // }
                    // else{
                    //   var room4 = this.teamClicked.Session_game_scores[2].score;
                    //   this.room4 = moment().startOf('day').seconds(room4).format("mm:ss");
                    // }

                    // if(this.teamClicked.Session_game_scores[4].score == undefined){
                    //   this.room3 = '00:00';
                    // }
                    // else{
                    //   var room3 = this.teamClicked.Session_game_scores[4].score;
                    //   this.room3 = moment().startOf('day').seconds(room3).format("mm:ss");
                    // }

                    // if(this.teamClicked.Session_game_scores[4].score == undefined){
                    //   this.room5 = '00:00';
                    // }
                    // else{
                    //   var room5 = this.teamClicked.Session_game_scores[3].score;
                    //   this.totalSeconds = this.teamClicked.Session_game_scores[3].score;

                    //   this.room5 = moment().startOf('day').seconds(room5).format("mm:ss");
                    //   this.bombDigitDecoded = this.teamClicked.Session_game_scores[3].level_achieved;
                    // }

                    /** this will pass all the image name for room 1 to 5 **/
                    // if(this.teamClicked.Session_game_scores[1].game_id < 6){
                      this.roomname1 = 'Hack Attack';
                      this.roomname2 = 'Laser Maze';
                      this.roomname3 = 'Echo Chamber';
                      this.roomname4 = 'Floor Grid';
                      this.roomname5 = 'Cyberbot';
                      this.gamestatus = 'gameLogoChildrenMission1'; /** this calls the css based upon the mission , for GAME LOGO SIZE **/
                      this.missionTitle = 'MISSION 01';
                      this.missionDetailTitle = 'CYBERBOT';
                    /** end of image detail for rooms **/

                    console.log("I WAS OUTSIDE MAN");

              } /** END OF MISSION 1 IF **/


              if(this.teamClicked.mission_id == '2'){ /** BEGINING OF MISSION 2 **/
                    
                    console.log(" IT WAS MISSION 2");

                    this.total_score = this.teamClicked.total_score;
                    this.size = this.teamClicked.player_count;
                    this.winners = this.teamClicked.winners;

                    var missionid = this.teamClicked.mission_id;
                    var totalScore = this.teamClicked.total_score;

                    /** THIS WILL PROVIDE US A RANK and RANK % **/
                    console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/rank/mission/'+missionid+'/total_score/'+totalScore);
                    
                    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/rank/mission/'+missionid+'/total_score/'+totalScore,{

                    })
                    .then(response => {
                      console.log(response);
                      console.log(response.data.rank);
                      console.log(response.data.total_session_count);
                      this.teamRank = response.data.rank;
                      this.totalTeams = response.data.total_session_count;
                    })

                    .catch(function (error) {
                      console.log(error);
                    });
                    /** END OF RANK AND RANK % **/

                    this.teamname = this.teamClicked.Team.name;

                    var teamLength = this.teamClicked.Team_player_sessions.length;
                    console.log(teamLength);

                    var replyDataObj1 = this.playerNamesList;

                    for(let j=0; j < teamLength; j++){

                      if(this.teamClicked.Team_player_sessions[j].player_minor_id == null){

                        var playerLastName = this.teamClicked.Team_player_sessions[j].Player.Person.last_name;
                        var playerFirstName = this.teamClicked.Team_player_sessions[j].Player.Person.first_name;

                        console.log(playerFirstName+' '+playerLastName);

                        replyDataObj1[j]={
                            "first_name": playerFirstName,
                            "last_name": playerLastName,
                            "full_name": playerFirstName+' '+playerLastName
                          }

                      }
                      else{
                        var minorlastname = this.teamClicked.Team_player_sessions[j].Player_minor.last_name;
                        var minorfirstname = this.teamClicked.Team_player_sessions[j].Player_minor.first_name;

                        console.log(minorfirstname+' '+minorlastname);

                        replyDataObj1[j]={
                            "first_name": minorfirstname,
                            "last_name": minorlastname,
                            "full_name": minorfirstname+' '+minorlastname
                          }
                      }
                      
                    }
                      
                      console.log(replyDataObj1);
                      this.playerNamesList = replyDataObj1;

                    /** THIS IS MISSION 1 **/
                    // if(){

                    // }

                    // * THIS IS MISSION 2 *
                    // if(){

                    // }


                    /** THIS IS THE BOMB ROOM **/
                    if(this.teamClicked.Session_game_scores[5].score == undefined){
                      this.room5 = '00:00';
                    }
                    else{
                      var room5Score = this.teamClicked.Session_game_scores[5].score;

                      console.log(room5Score);

                      this.room5 = moment().startOf('day').seconds(room5Score).format("mm:ss");

                      this.bombDigitDecoded = this.teamClicked.Session_game_scores[5].score;
                      this.totalSeconds = this.teamClicked.bomb_time;

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[5].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room5Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        this.bombRoomPercentage = Math.round(filterIntoPercentile);

                        console.log("ABOVE DATA BM");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }
                    /** END OF BOMB ROOM **/

                    /** THIS IS MAD DASH ROOM **/

                    if(this.teamClicked.Session_game_scores[3].score == undefined){
                      this.room3 = '00:00';
                    }
                    else{
                      var room3Score = this.teamClicked.Session_game_scores[3].score;

                      console.log(room3Score);

                      this.room3 = moment().startOf('day').seconds(room3Score).format("mm:ss");

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[3].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room3Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        this.echoChamberPercentage = Math.round(filterIntoPercentile);

                        console.log("ABOVE DATA EC");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }

                    /** END OF MAD DASH **/


                    /** THIS IS SEQUENCER ROOM **/

                    if(this.teamClicked.Session_game_scores[1].score == undefined){
                      this.room1 = '00:00';
                    }
                    else{
                      var room1Score = this.teamClicked.Session_game_scores[1].score;

                      console.log(room1Score);

                      this.room1 = moment().startOf('day').seconds(room1Score).format("mm:ss");

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[1].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room1Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        this.hackAttackPercentage = Math.round(filterIntoPercentile);

                        console.log("ABOVE DATA HA");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }

                    /** END OF SEQUENCER **/


                    /** THIS IS LOW BATTERY ROOM **/

                    if(this.teamClicked.Session_game_scores[4].score == undefined){
                      this.room4 = '00:00';
                    }
                    else{
                      var room4Score = this.teamClicked.Session_game_scores[4].score;

                      console.log(room4Score);

                      this.room4 = moment().startOf('day').seconds(room4Score).format("mm:ss");

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[4].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room4Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        this.floorGridPercentage = Math.round(filterIntoPercentile);

                        console.log("ABOVE DATA FG");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }

                    /** END OF LOW BATTERY **/

                    /** THIS IS CRYPTO LAZERS ROOM **/

                    if(this.teamClicked.Session_game_scores[2].score == undefined){
                      this.room2 = '00:00';
                    }
                    else{
                      var room2Score = this.teamClicked.Session_game_scores[2].score;

                      console.log(room2Score);

                      this.room2 = moment().startOf('day').seconds(room2Score).format("mm:ss");

                      // axios.get(VUE_APP_SESSION_GAME_SCORES)

                      var gameId = this.teamClicked.Session_game_scores[2].game_id;

                      axios.get(process.env.VUE_APP_SESSION_GAME_SCORES+'/rank/game/'+gameId+'/score/'+room2Score,{
                      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

                      })
                      .then(response => {
                        console.log(response);

                        var fetchedRank = response.data.rank;
                        console.log(fetchedRank);

                        var filterByTwoDecimal = fetchedRank.toFixed(2);
                        console.log(filterByTwoDecimal);

                        // var multipleRank = 100*filterByTwoDecimal;

                        var subtractRank = 1-filterByTwoDecimal;
                        console.log("subtractRank "+subtractRank);

                        var filterIntoPercentile = subtractRank*100;
                        console.log(filterIntoPercentile);

                        var roomPercentage = Math.round(filterIntoPercentile);

                        this.laserMazePercentage = roomPercentage;


                        console.log("ABOVE DATA LM");
                        // this.teamList = response.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

                    }

                    /** END OF CRYPTO LAZERS **/


                    // if(this.teamClicked.Session_game_scores[2].score == undefined){
                    //   this.room4 = '00:00';
                    // }
                    // else{
                    //   var room4 = this.teamClicked.Session_game_scores[2].score;
                    //   this.room4 = moment().startOf('day').seconds(room4).format("mm:ss");
                    // }

                    // if(this.teamClicked.Session_game_scores[4].score == undefined){
                    //   this.room3 = '00:00';
                    // }
                    // else{
                    //   var room3 = this.teamClicked.Session_game_scores[4].score;
                    //   this.room3 = moment().startOf('day').seconds(room3).format("mm:ss");
                    // }

                    // if(this.teamClicked.Session_game_scores[4].score == undefined){
                    //   this.room5 = '00:00';
                    // }
                    // else{
                    //   var room5 = this.teamClicked.Session_game_scores[3].score;
                    //   this.totalSeconds = this.teamClicked.Session_game_scores[3].score;

                    //   this.room5 = moment().startOf('day').seconds(room5).format("mm:ss");
                    //   this.bombDigitDecoded = this.teamClicked.Session_game_scores[3].level_achieved;
                    // }

                    /** this will pass all the image name for room 1 to 5 **/
                      this.roomname1 = 'Sequencer';
                      this.roomname2 = 'Crypto Lazer';
                      this.roomname3 = 'Mad Dash';
                      this.roomname4 = 'Low Battery';
                      this.roomname5 = 'Block Monster';
                      this.gamestatus = 'gameLogoChildrenMission2'; /** this calls the css based upon the mission , for GAME LOGO SIZE **/
                      this.missionTitle = 'MISSION 02';
                      this.missionDetailTitle = 'BLOCK MONSTER';
                    /** end of image detail for rooms **/

                    console.log("I WAS OUTSIDE MAN");


                    } /** END OF MISSION 2 IF **/


              }) /** end of axios.get then function **/

          .catch(function (error) {
            console.log(error);
          });
          

        } /** end of teamname function **/

    },

    mounted: function(){
      
      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+40+'/active',{
      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/completed',{
      // axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

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
        printWindow: function () {    
          window.print('section-to-print');
        },

        teamNameSelectedDemo: function(){

          console.log("I WAS INSIDE MAN");

          this.onselect = '1';

          this.teamname = 'SANDU MANDU TEAM';
          this.room1 = '00:00';
          this.room2 = '00:00';
          this.room3 = '00:00';
          this.room4 = '00:00';
          this.room5 = '00:00';

          this.roomname1 = 'Hack Attack';
          this.roomname2 = 'Laser Maze';
          this.roomname3 = 'Echo Chamber';
          this.roomname4 = 'Floor Grid';
          this.roomname5 = 'Cyberbot';

          this.roomname6 = 'Sequencer';
          this.roomname7 = 'Crypto Lazer';
          this.roomname8 = 'Mad Dash';
          this.roomname9 = 'Low Battery';
          this.roomname10 = 'Block Monster';

          this.bombtime = '03:00';
          this.total_score = '1390';

          this.gamestatus = 'gameLogoChildrenMission1';

        },

    } /** methods closing bracket **/

  };

</script>

<style>

@import url(//db.onlinewebfonts.com/c/f6cf6ca17eeb58c1a8ee64d4b3458098?family=Aero+Matics+Stencil);
/*@import url('./assets/fonts/PixelDigivolve.otf');*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.gameLogo{
    width: 10%;
  }

@media print {
  body * {
    visibility: hidden;
    -webkit-print-color-adjust: exact;
    /*margin-left: -5%;*/
    /*width: 90%;*/
  }

   @page {
      size: auto !important;
      margin: 0.01cm;
      margin-left: -3.8cm;
      margin-top: -15.3cm;
    }

   /* @page :left{
      margin-left: 2cm;
    }*/

    .firstdiv{
      background-color: #FF1696; /** pink **/
      margin-left: -5.5cm;
      /*color: black;*/
    }

    .seconddiv{
      background-color: white;
      /*color:black;*/
/*      margin-right: 5cm;*/
    }

    .thirddiv{
      background-color: white;
      /*color: black;*/
      height: 20cm !important;
    }

    .missiontitle{
      color: white !important;
      /*background-color: green;*/
      width: 8cm !important;
      height: 1.5cm !important;
      margin-top: 1.2cm;
      margin-left: 0.1cm;
      font-size: 0.8cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black !important;
    }

    .maingameImage{
      width: 2cm !important;
      height: 3.5cm !important;
      margin-top: 0.7cm;
      margin-left: 1.5cm;
    }
    
    .hrlength{
      width: 9.5cm !important;
      height: 0.25cm !important;
      background-color: black !important;
      margin-top: 4cm;
      margin-left: -0.4cm;
    }

    .gametext{
      width: 3cm !important;
      height: 1cm !important;
      background-color: #FF1696 !important;
      color: black !important;
      font-size: 0.8cm;
      font-family: 'Aero Matics Stencil', regular;
      margin-top: -0.75cm;
      margin-left: 2.55cm;
    }

    .gamelogo1{
      width: 2cm !important;
      height: 3cm !important;
      margin-top: 1.2cm;
      margin-left: 1cm;
    }

    .gamelogo2{
      width: 2cm !important;
      height: 3cm !important;
      margin-top: 1.2cm;
      margin-left: 1cm;
    }

    .gamelogo3{
      width: 2cm !important;
      height: 3cm !important;
      margin-top: 1.2cm;
      margin-left: 1cm;
    }

    .gamelogo4{
      width: 2cm !important;
      height: 3cm !important;
      margin-top: 1.2cm;
      margin-left: 1cm;
    }

    .btblogo{
      width: 9cm !important;
      height: 4cm !important;
      margin-top: 1.1cm;
      margin-left: 1.5cm;
    }

    .performanceText{
      width: 20cm !important;
      height: 2cm !important;
      /*color: black;*/
      font-size: 1.7cm;
      font-family: 'Aero Matics Stencil', regular;
      margin-top: -1.5cm;
      background-color: white !important;
      margin-left: 1.6cm;
      text-align: left;
      /*margin-left: 2.55cm;*/
    }

    .playerDiv{
      width: 25cm !important;
      height: 2cm !important;
      background-color: white !important;
      margin-left: 1.1cm;
      color: white;
    }

    .playertext{
      width: 22cm !important;
      height: 3cm !important;
      background-color: white !important;
      color: black;
      font-size: 0.6cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: left;
      margin-top: 0.2cm;
      border:none; /** hide the list border **/
    }

    .teamtext{
      /*background-color: green !important;*/
      width: 16cm !important;
      height: 1cm !important;
      margin-left: 14cm;
      margin-top: -6.9cm;
      font-size: 1.4cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: right;
      color: black;
    }

    .datetext{
      /*background-color: yellow !important;*/
      width: 5cm !important;
      height: 1cm !important;
      text-align: right;
      margin-left: 25cm;
      /*padding-left: 3.5cm;*/
      margin-top: 1.5cm;
      font-size: 0.85cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .timeEarnedColumn{
      width: 5cm !important;
      height: 1cm !important;
      text-align: left;
      margin-left: 2cm;
      /*padding-left: 3.5cm;*/
      margin-top: 6cm;
      font-size: 0.85cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .timeEarnedRoom1{
      width: 5cm !important;
      height: 1cm !important;
      text-align: center;
      margin-left: 1.65cm;
      /*padding-left: 3.5cm;*/
      margin-top: 1.4cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .timeEarnedRoom2{
      width: 5cm !important;
      height: 1cm !important;
      text-align: center;
      margin-left: 1.65cm;
      /*padding-left: 3.5cm;*/
      margin-top: 3.3cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .timeEarnedRoom3{
      width: 5cm !important;
      height: 1cm !important;
      text-align: center;
      margin-left: 1.65cm;
      /*padding-left: 3.5cm;*/
      margin-top: 3.3cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .timeEarnedRoom4{
      width: 5cm !important;
      height: 1cm !important;
      text-align: center;
      margin-left: 1.65cm;
      /*padding-left: 3.5cm;*/
      margin-top: 3.3cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .percentileColumn{
      width: 5cm !important;
      height: 1cm !important;
      text-align: left;
      margin-left: 8.5cm;
      /*padding-left: 3.5cm;*/
      margin-top: -16.3cm;
      font-size: 0.85cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .percentileRoom1{
      width: 5cm !important;
      height: 1cm !important;
      text-align: center;
      margin-left: 8cm;
      /*padding-left: 3.5cm;*/
      margin-top: 1.35cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .percentileRoom2{
      width: 5cm !important;
      height: 1cm !important;
      text-align: center;
      margin-left: 8cm;
      margin-top: 3.3cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .percentileRoom3{
      width: 5cm !important;
      height: 1cm !important;
      text-align: center;
      margin-left: 8cm;
      margin-top: 3.3cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }
    
    .percentileRoom4{
      width: 5cm !important;
      height: 1cm !important;
      text-align: center;
      margin-left: 8cm;
      margin-top: 3.3cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
    }

    .timeEarnedBox{
      width: 10.5cm !important;
      height: 2.9cm !important;
      text-align: center;
      margin-left: 17cm;
      margin-top: -17.5cm;
      background-color: #FF1696;
    }

    .timeEarnedBoxText{
      width: 11cm !important;
      height: 2.7cm !important;
      text-align: center;
      margin-left: 16.8cm;
      margin-top: -2.5cm;
      font-size: 0.8cm;
      font-family: 'Aero Matics Stencil', regular;
      color: white;
    }

    .timeEarnedWhiteBox{
      width: 10.5cm !important;
      height: 1.8cm !important;
      text-align: center;
      margin-left: 17cm;
      margin-top: -0.18cm;
      font-size: 0.8cm;
      font-family: 'Aero Matics Stencil', regular;
      color: white;
      background-color: black;
    }

    .timeEarnedWhiteBoxText{
      width: 2cm !important;
      height: 1.8cm !important;
      text-align: center;
      margin-left: 20.9cm;
      margin-top: -1.8cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: #FF1696;
    }

    .finalResultText{
      width: 8cm !important;
      height: 1.8cm !important;
      text-align: center;
      margin-left: 18.5cm;
      margin-top: 1.5cm;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      color: black;
      /*background-color: green;*/
    }

    .bombDigitDiv{
      width: 8.5cm !important;
      height: 1cm !important;
      margin-left: 13.5cm;
      margin-top: 1cm;
      background-color: #FF1696;
    }

    .bombDigitTitle{
      width: 8.5cm !important;
      height: 1cm !important;
      margin-left: 14.9cm;
      margin-top: -1cm;
      color: white;
      font-size: 0.7cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: left;
    }

    .didYouBTBdiv{
      margin-left: 22.5cm;
      margin-top: -1cm;
      width: 8.5cm !important;
      height: 1cm !important;
      background-color: #FF1696;
    }

    .didYouBTBTitle{
      margin-left: 22.5cm;
      margin-top: -1cm;
      width: 8.5cm !important;
      height: 1cm !important;
      color: white;
      font-size: 0.7cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

    .bombDigitDecoded{
      margin-left: 13.5cm;
      margin-top: 0.4cm;
      width: 8.5cm !important;
      height: 1cm !important;
      color: black;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

    .bombBoolean{
      margin-left: 22.5cm;
      margin-top: -1.05cm;
      width: 8.5cm !important;
      height: 1cm !important;
      color: black !important;
      font-size: 1.2cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

    .totalScoreDiv{
      background-color: #FF1696;
      margin-left: 13.5cm;
      margin-top: 2cm;
      width: 8.5cm !important;
      height: 1cm !important;
    }

    .overallRankingDiv{
      background-color: #FF1696;
      margin-left: 22.5cm;
      margin-top: -1cm;
      width: 8.5cm !important;
      height: 1cm !important;
    }

    .totalScoreTitle{
      color: white;
      margin-left: 13.5cm;
      margin-top: -1cm;
      width: 8.5cm !important;
      height: 1cm !important;
      font-size: 0.7cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

    .overallRankingTitle{
      color: white;
      margin-left: 22.5cm;
      margin-top: -1cm;
      width: 8.5cm !important;
      height: 1cm !important;
      font-size: 0.7cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

    .digitsTime{
      color: black;
      margin-left: 13.5cm;
      margin-top: 0.6cm;
      width: 8.5cm !important;
      height: 1cm !important;
      font-size: 0.65cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

    .digitsTimeCalculation{
      color: black;
      margin-left: 13.5cm;
      margin-top: 0.1cm;
      width: 8.5cm !important;
      height: 1cm !important;
      font-size: 1.3cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

    .totalRankings{
      color: black;
      margin-left: 22.5cm;
      margin-top: -2.1cm;
      width: 8.5cm !important;
      height: 1cm !important;
      font-size: 0.7cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

    .totalRankingsPercantile{
      color: black;
      margin-left: 22.5cm;
      margin-top: 0.1cm;
      width: 8.5cm !important;
      height: 1cm !important;
      font-size: 1.3cm;
      font-family: 'Aero Matics Stencil', regular;
      text-align: center;
    }

  /*@page {size: A4 landscape;max-height:100%; max-width:100%}*/

/*s*/
  #section-to-print, #section-to-print * {
    visibility: visible;
    /*visibility: hidden;*/
    width: 37cm;
    height: 31.45cm;
  }
  #section-to-print {
    /*background-color: black !important;*/
    color: white !important;
    margin-top: -10px;

  }

  .gameLogo{
    width: 6cm !important;
    height: 6cm !important;
  }

  .gameLogoChildrenMission1{
    width: 6cm !important;
    height: 3cm !important;
    padding-left: 1cm;
  }

  .gameLogoChildrenMission2{
    width: 7cm !important;
    height: 5cm !important;
    margin-top: -1.2cm;
    padding-left: 0.5cm;
  }

  .btblogodetail{
    width: 10cm !important;
    height: 2.5cm !important;
    color: black;
  }

}

</style>