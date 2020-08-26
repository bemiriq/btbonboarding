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
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10" style="background-color:#fafafa; font-weight: bold;">
          <b-col>
            <b-form-group id="input-group-3" label-for="input-3">
              <b-form-select v-model="teamSelectedIndex" v-on:change="teamNameSelected">
                  <option v-for="(item, index) in teamList" v-bind:key="index.id" :value="index">{{item.Team.name}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <b-col v-if="onselect == '1'">
            <button @click="printWindow('san')">Print</button>
            <div id="section-to-print">

              <div>
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

              <div> ROOM 1 SCORE = {{room1}}</div>
              <div> ROOM 2 SCORE = {{room2}}</div>
              <div> ROOM 3 SCORE = {{room3}}</div>
              <div> ROOM 4 SCORE = {{room4}}</div>
              <div> ROOM 5 SCORE = {{room5}}</div>
              <div> BOMB TIME = </div>
              <div> TOTAL SCORE = </div>

            </div>
          </b-col>

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
        onselect: '',
        teamSelectedIndex: '',
        playerNamesList: [],

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

      }

    },

    mounted: function(){
    
      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/'+10,{

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

        teamNameSelected: function (){

          this.onselect = '1';

          var index = this.teamSelectedIndex;

          console.log(index);

          console.log(this.teamList[index]);

          this.bombtime = this.teamList[index].bomb_time;
          this.total_score = this.teamList[index].total_score;
          this.size = this.teamList[index].player_count;
          this.winners = this.teamList[index].winners;

          this.teamname = this.teamList[index].Team.name;

          var teamLength = this.teamList[index].Team_player_sessions.length;
          console.log(teamLength);

          var replyDataObj1 = this.playerNamesList;

          for(let j=0; j < teamLength; j++){

            var playerLastName = this.teamList[index].Team_player_sessions[j].Player.Person.last_name;
            var playerFirstName = this.teamList[index].Team_player_sessions[j].Player.Person.first_name;

            console.log(playerFirstName+' '+playerLastName);

            replyDataObj1[j]={
                "first_name": playerFirstName,
                "last_name": playerLastName,
                "full_name": playerFirstName+' '+playerLastName
              }
            }
            
            console.log(replyDataObj1);
            this.playerNamesList = replyDataObj1;


          if(this.teamList[index].Session_game_scores[0].score == undefined){
            this.room1 = '00:00';
          }
          else{
            var room1 = this.teamList[index].Session_game_scores[0].score;
            this.room1 = moment().startOf('day').seconds(room1).format("mm:ss");
          }

          if(this.teamList[index].Session_game_scores[1].score == undefined){
            this.room2 = '00:00';
          }
          else{
            var room2 = this.teamList[index].Session_game_scores[1].score;
            this.room2 = moment().startOf('day').seconds(room2).format("mm:ss");
          }

          if(this.teamList[index].Session_game_scores[2].score == undefined){
            this.room3 = '00:00';
          }
          else{
            var room3 = this.teamList[index].Session_game_scores[2].score;
            this.room3 = moment().startOf('day').seconds(room3).format("mm:ss");
          }

          if(this.teamList[index].Session_game_scores[3].score == undefined){
            this.room4 = '00:00';
          }
          else{
            var room4 = this.teamList[index].Session_game_scores[3].score;
            this.room4 = moment().startOf('day').seconds(room4).format("mm:ss");
          }

          if(this.teamList[index].Session_game_scores[4].score == undefined){
            this.room5 = '00:00';
          }
          else{
            var room5 = this.teamList[index].Session_game_scores[4].score;
            this.room5 = moment().startOf('day').seconds(room5).format("mm:ss");
          }

          /** this will pass all the image name for room 1 to 5 **/
          if(this.teamList[index].Session_game_scores[0].game_id < 6){
            this.roomname1 = 'Hack Attack';
            this.roomname2 = 'Laser Maze';
            this.roomname3 = 'Echo Chamber';
            this.roomname4 = 'Floor Grid';
            this.roomname5 = 'Cyberbot';
          }
          if(this.teamList[index].Session_game_scores[0].game_id > 5 && this.teamList[index].Session_game_scores[0].game_id < 11){
            this.roomname1 = 'Sequencer';
            this.roomname2 = 'Crypto Lazer';
            this.roomname3 = 'Mad Dash';
            this.roomname4 = 'Low Battery';
            this.roomname5 = 'Block Monster';
          }
          /** end of image detail for rooms **/

        } /** end of teamname function **/

    } /** methods closing bracket **/

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

@media print {
  body * {
    visibility: hidden;
  }
  #section-to-print, #section-to-print * {
    visibility: visible;
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}

</style>