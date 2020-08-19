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

          <!-- <b-row class="alert alert-primary" role="alert">
            <b-col class="col-6"><p id="blinking"> ARBITER DISCONNECTED INFORMATION </p></b-col>
            <b-col> PAUSE </b-col>
            <b-col> PLAY </b-col>
            <b-col> ROOM TIME </b-col>
            <b-col> BOMB TIME </b-col>
          </b-row> -->
          <b-row>
            <b-col>CONTROL ROOM SIDE A</b-col>
          </b-row>
          <b-row>

            <!-- starting div for room 1 and room 6 -->
            <!-- <b-col class="border border-dark" v-bind:class="[gameStatusByColor ? 'greenStatus' : 'playingStatus']"> -->
            <b-col class="border border-dark" v-bind:class="room1StatusColor">

                <div>
                  <img v-bind:src="require('./assets/' + room1game +'.png')" class="gameLogo"/>
                </div>

                <br/>

                <div class="blackBackgroundOverText">
                  <b-row>
                    <b-col>
                      <h3 v-bind:class="room1StatusTextColor"> {{room1game}} </h3>
                      <h4 v-bind:class="room1StatusTextColor"> {{room1status}} </h4>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div>
                  <h2 class="bombTimeText"> {{room1currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <p class="teamNameText"> {{room1teamname}} </p>
                </div>

                <br/>
                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room1teamsize}} </p>
                  <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p>
                  <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p>
                </div>

            </b-col>
            <!-- end b-col and div for room 1 and room 6 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room2StatusColor">

                <div>
                  <img v-bind:src="require('./assets/' + room2game +'.png')" class="gameLogo"/>
                </div>

                <br/>

                <div class="blackBackgroundOverText">
                  <b-row>
                    <b-col>
                      <h3 v-bind:class="room2StatusTextColor"> {{room2game}} </h3>
                      <h4 v-bind:class="room2StatusTextColor"> {{room2status}} </h4>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div>
                  <h2 class="bombTimeText"> {{room2currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <p class="teamNameText"> {{room2teamname}} </p>
                </div>

                <br/>
                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room2teamsize}} </p>
                  <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room2timeearned}} </p>
                  <p class="sizeAndTimeDetail"> BOMB TIME  {{room2bombtime}} </p>
                </div>

            </b-col>
            <!-- ending div for room 2 and room 7 -->

            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room3StatusColor">

                <div>
                  <img v-bind:src="require('./assets/' + room3game +'.png')" class="gameLogo"/>
                </div>

                <br/>

                <div class="blackBackgroundOverText">
                  <b-row>
                    <b-col>
                      <h3 v-bind:class="room3StatusTextColor"> {{room3game}} </h3>
                      <h4 v-bind:class="room3StatusTextColor"> {{room3status}} </h4>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div>
                  <h2 class="bombTimeText"> {{room3currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <p class="teamNameText"> {{room3teamname}} </p>
                </div>

                <br/>
                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room3teamsize}} </p>
                  <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room3timeearned}} </p>
                  <p class="sizeAndTimeDetail"> BOMB TIME  {{room3bombtime}} </p>
                </div>

            </b-col>
            <!-- ending div for room 2 and room 7 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room4StatusColor">

                <div>
                  <img v-bind:src="require('./assets/' + room4game +'.png')" class="gameLogo"/>
                </div>

                <br/>

                <div class="blackBackgroundOverText">
                  <b-row>
                    <b-col>
                      <h3 v-bind:class="room4StatusTextColor"> {{room4game}} </h3>
                      <h4 v-bind:class="room4StatusTextColor"> {{room4status}} </h4>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div>
                  <h2 class="bombTimeText"> {{room4currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <p class="teamNameText"> {{room4teamname}} </p>
                </div>

                <br/>
                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room4teamsize}} </p>
                  <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room4timeearned}} </p>
                  <p class="sizeAndTimeDetail"> BOMB TIME  {{room4bombtime}} </p>
                </div>

            </b-col>
            <!-- ending div for room 2 and room 7 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room5StatusColor">

                <div>
                  <img v-bind:src="require('./assets/' + room5game +'.png')" class="gameLogo"/>
                </div>

                <br/>

                <div class="blackBackgroundOverText">
                  <b-row>
                    <b-col>
                      <h3 v-bind:class="room5StatusTextColor"> {{room5game}} </h3>
                      <h4 v-bind:class="room5StatusTextColor"> {{room5status}} </h4>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div>
                  <h2 class="bombTimeText"> {{room5currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <p class="teamNameText"> {{room5teamname}} </p>
                </div>

                <br/>
                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room5teamsize}} </p>
                  <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room5timeearned}} </p>
                  <p class="sizeAndTimeDetail"> BOMB TIME  {{room5bombtime}} </p>
                </div>

            </b-col>
            <!-- ending div for room 2 and room 7 -->

          </b-row>
        </b-col>

      </b-row>
    </div>

    <br/>

<!--     <div class="bv-example-row" style="width:80%;margin:auto; background-color: #fafafa;font-weight:bold;">

      <b-row>
        <b-col>Front Desk</b-col>
        <b-col>On Deck</b-col>
        <b-col>Room Status</b-col>
        <b-col>CCTV</b-col>
        <b-col><a href="/#/controlroom">Control Room</a></b-col>
        <b-col>Photo Bomb</b-col>
        <b-col>Bomb Vision</b-col>
        <b-col>Stats</b-col>
        <b-col>Support</b-col>
        <b-col>EOD</b-col>
        <b-col>Photo Bomb</b-col>
        <b-col> | </b-col>
        <b-col>Homebase</b-col>
        <b-col>Xola</b-col>
        <b-col>Square</b-col>

      </b-row>

    </div> -->

  </div>
</template>

<script src="moment.js"></script>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import VueMqtt from 'vue-mqtt';
// Vue.use(VueMqtt, 'ws://20.17.0.5:1883/', options);

import moment from 'moment';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },

  data(){
    return{
      room1counter: 130,
      room1pauseDiv: true,
      room1playDiv: false,
      // totalTime: (25 * 60),
      totalTime: 180,
      timerRunning: false,
      timerPaused: false,
      interval: null,
      gameStatusByColor: true,

      room1status: null,
      room1StatusColor: '',
      room1StatusTextColor: '',

      room2status: null,
      room2StatusColor: '',
      room2StatusTextColor: '',

      room3status: null,
      room3StatusColor: '',
      room3StatusTextColor: '',

      room4status: null,
      room4StatusColor: '',
      room4StatusTextColor: '',

      room5status: null,
      room5StatusColor: '',
      room5StatusTextColor: '',

      room1game: '',
      room2game: '',
      room3game: '',
      room4game: '',
      room5game: '',

      room1teamsize: '',
      room2teamsize: '',
      room3teamsize: '',
      room4teamsize: '',
      room5teamsize: '',

      room1teamname: '',
      room2teamname: '',
      room3teamname: '',
      room4teamname: '',
      room5teamname: '',

      room1bombtime: '',
      room2bombtime: '',
      room3bombtime: '',
      room4bombtime: '',
      room5bombtime: '',

      room1timeearned: '',
      room2timeearned: '',
      room3timeearned: '',
      room4timeearned: '',
      room5timeearned: '',

      room1currenttime: '',
      room2currenttime: '',
      room3currenttime: '',
      room4currenttime: '',
      room5currenttime: '',

      selected: 'A',
        options: [
          { text: 'Ghostbusters'},
          { text: 'Marshmallows'},
          { text: 'Beat the gun'},
          { text: 'Bunny Rabbit'},
          { text: 'Takecare'},
          { text: 'Gun the bomb'},
          { text: 'Beat the bomb beat the gun'},
        ]
      // styleobj: {
      //   color: '#4CAF50',
      //   marginLeft: '20px',
      //   fontSize: '30px'
      // }
    }
    
  },

  methods: {
    timerRun() {
      this.timerRunning = true;
      this.message = 'Greatness is within sight!!!';
      this.interval = setInterval(this.countdownTimer, 1000);
      this.totalTime = (180); /** each team time value should be defined here as mm * ss or sss  **/
      console.log(this.totalTime);
      this.gameStatusByColor = !this.gameStatusByColor;
    },
    timerPause() {
      this.message = 'Never quit, keep going!!';
      this.timerRunning = false;
      clearInterval(this.interval);
    },
    timerReset() {
      this.message = 'Let the countdown begin!!';
      this.timerRunning = false;
      clearInterval( () => { this.interval; });
      // this.totalTime = (25 * 60);
      this.totalTime = (0 * 0);
      this.gameStatusByColor = !this.gameStatusByColor; /* this will reset the game status color */
    },
    timerCountdown() {
      console.log('Working');
      this.timerRunning = true;
      this.interval = setInterval(this.updateCurrentTime, 1000);
      // Counts down from 60 seconds times 1000.
      setInterval( () => {
        this.timerMinutes--
      }, 60 * 1000)
      
      // Check if seconds at double zero and then make it a 59 to countdown from.
      // need another method of checking the number while in the loop and then adding a zero on the number under 10
      if(this.timerSeconds === '00'){
        this.timerSeconds = 59;
        setInterval( () => {
          this.timerSeconds--
        }, 1000);
      } else {
        setInterval( () => {
          this.timerSeconds--
        }, 1000);
      }
    },
    countdownTimer() {
      if (this.timerRunning == true) {
          this.totalTime--;
      }
    },

    runMqtt() {
      // this.interval = setInterval(this.updateCurrentTime, 1000);
      console.log(" IN SIDE RUN MQTT");

      var mqtt = require('mqtt');
      var client  = mqtt.connect('ws://20.17.0.5:8083/');

      var vm = this; /** vm is now variable as this which will pass on the value **/

      client.on('connect', function () {
        client.subscribe('route_status', function (err) {
          if (!err) {
            client.publish('presence', 'Hello mqtt')
          }
        })
      })

      client.on('message', function (topic, message) {

        var filterData = message;
        var x = JSON.parse(filterData);

        var checkSession = x.statusResult[0];

        if(checkSession.Session != null){
          console.log('MORE');
          console.log(checkSession.id);
          console.log(x);
          console.log(x.statusResult[0].Room_status.name);

          console.log(x.statusResult[0].Game.id);
          

          if(x.statusResult[0].Room_status.id == undefined){
            this.room1status = 0;
          }
          else{
            vm.room1status = x.statusResult[0].Room_status.name;
            vm.room2status = x.statusResult[1].Room_status.name;
            vm.room3status = x.statusResult[2].Room_status.name;
            vm.room4status = x.statusResult[3].Room_status.name;
            vm.room5status = x.statusResult[4].Room_status.name;


            vm.room1game = x.statusResult[0].Game.name;
            vm.room2game = x.statusResult[1].Game.name;
            vm.room3game = x.statusResult[2].Game.name;
            vm.room4game = x.statusResult[3].Game.name;
            vm.room5game = x.statusResult[4].Game.name;


            vm.room1teamsize = x.statusResult[0].Session.player_count;
            vm.room2teamsize = x.statusResult[1].Session.player_count;
            vm.room3teamsize = x.statusResult[2].Session.player_count;
            vm.room4teamsize = x.statusResult[3].Session.player_count;
            vm.room5teamsize = x.statusResult[4].Session.player_count;

            vm.room1teamname = x.statusResult[0].Session.Team.name;
            vm.room2teamname = x.statusResult[1].Session.Team.name;
            vm.room3teamname = x.statusResult[2].Session.Team.name;
            vm.room4teamname = x.statusResult[3].Session.Team.name;
            vm.room5teamname = x.statusResult[4].Session.Team.name;



          /** time earned for each room **/
            var convertroom1timeearned = x.statusResult[0].Session_game_score.score;
            vm.room1timeearned = moment().startOf('day').seconds(convertroom1timeearned).format("mm:ss");

            var convertroom2timeearned = x.statusResult[1].Session_game_score.score;
            vm.room2timeearned = moment().startOf('day').seconds(convertroom2timeearned).format("mm:ss");

            var convertroom3timeearned = x.statusResult[2].Session_game_score.score;
            vm.room3timeearned = moment().startOf('day').seconds(convertroom3timeearned).format("mm:ss");

            var convertroom4timeearned = x.statusResult[3].Session_game_score.score;
            vm.room4timeearned = moment().startOf('day').seconds(convertroom4timeearned).format("mm:ss");

            var convertroom4timeearned = x.statusResult[4].Session_game_score.score;
            vm.room4timeearned = moment().startOf('day').seconds(convertroom4timeearned).format("mm:ss");

          /** END of time earned for each room **/


          /** bomb room time **/
            var convertroom1bombtime = x.statusResult[0].Session.bomb_time;
            vm.room1bombtime = moment().startOf('day').seconds(convertroom1bombtime).format("mm:ss");

            var convertroom2bombtime = x.statusResult[1].Session.bomb_time;
            vm.room2bombtime = moment().startOf('day').seconds(convertroom2bombtime).format("mm:ss");

            var convertroom3bombtime = x.statusResult[2].Session.bomb_time;
            vm.room3bombtime = moment().startOf('day').seconds(convertroom3bombtime).format("mm:ss");

            var convertroom4bombtime = x.statusResult[3].Session.bomb_time;
            vm.room4bombtime = moment().startOf('day').seconds(convertroom4bombtime).format("mm:ss");

            var convertroom5bombtime = x.statusResult[4].Session.bomb_time;
            vm.room5bombtime = moment().startOf('day').seconds(convertroom5bombtime).format("mm:ss");
          /** end of bomb room time **/


          /** current room time **/
            var room1gameendtime = x.statusResult[0].game_end;
            var room1gameendtimeminute = moment(room1gameendtime).format("mm");
            var room1gameendtimesecond = moment(room1gameendtime).format("ss");
            var convertMinute1ToSeconds = room1gameendtimeminute*60;

            var gameendtime1 = room1gameendtimeminute+room1gameendtimesecond;

            var currentMinute = moment().format("mm");
            var currentSeconds = moment().format("ss");
            var currentMinuteToSeconds = Number(currentMinute)*60;

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime1);

            var currentRoom1Time = gameendtime1-currentTimeValue;
            console.log(currentRoom1Time);

            if(vm.room1status == 'Ready'){
              vm.room1currenttime = '00:00';
            }

            if(vm.room1status == 'Instructions'){
              vm.room1currenttime = '10:00';
            }

            if(vm.room1status == 'Waiting'){
              vm.room1currenttime = '00:00';
            }

            if(vm.room1status == 'Playing'){

              if(currentRoom1Time > '0'){
                vm.room1currenttime = moment().startOf('day').seconds(currentRoom1Time).format("mm:ss");
              }
              else{
                vm.room1currenttime = '00:00';
              }

            }

            if(vm.room1status == 'Trouble'){

              if(currentRoom1Time > '0'){
                vm.room1currenttime = moment().startOf('day').seconds(currentRoom1Time).format("mm:ss");
              }
              else{
                vm.room1currenttime = '00:00';
              }

            }


            /** ROOM 2 **/

            var room2gameendtime = x.statusResult[1].game_end;
            var room2gameendtimeminute = moment(room2gameendtime).format("mm");
            var room2gameendtimesecond = moment(room2gameendtime).format("ss");
            var convertMinute2ToSeconds = room2gameendtimeminute*60;

            var gameendtime2 = room2gameendtimeminute+room2gameendtimesecond;

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime2);

            var currentRoom2Time = gameendtime2-currentTimeValue;
            console.log(currentRoom2Time);

            if(vm.room2status == 'Ready'){
              vm.room2currenttime = '00:00';
            }

            if(vm.room2status == 'Instructions'){
              vm.room2currenttime = '10:00';
            }

            if(vm.room2status == 'Waiting'){
              vm.room2currenttime = '00:00';
            }

            if(vm.room2status == 'Trouble'){

              if(currentRoom2Time > '0'){
                vm.room2currenttime = moment().startOf('day').seconds(currentRoom2Time).format("mm:ss");
              }
              else{
                vm.room2currenttime = '00:00';
              }

            }

            if(vm.room2status == 'Playing'){

              if(currentRoom2Time > '0'){
                vm.room2currenttime = moment().startOf('day').seconds(currentRoom2Time).format("mm:ss");
              }
              else{
                vm.room2currenttime = '00:00';
              }

            }
            /** END OF ROOM 2 **/


            /** ROOM 3 **/

            var room3gameendtime = x.statusResult[2].game_end;
            var room3gameendtimeminute = moment(room3gameendtime).format("mm");
            var room3gameendtimesecond = moment(room3gameendtime).format("ss");
            var convertMinute3ToSeconds = room3gameendtimeminute*60;

            var gameendtime3 = room3gameendtimeminute+room3gameendtimesecond;

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime3);

            var currentRoom3Time = gameendtime3-currentTimeValue;
            console.log(currentRoom3Time);

            if(vm.room3status == 'Ready'){
              vm.room3currenttime = '00:00';
            }

            if(vm.room3status == 'Instructions'){
              vm.room3currenttime = '10:00';
            }

            if(vm.room3status == 'Waiting'){
              vm.room3currenttime = '00:00';
            }

            if(vm.room3status == 'Trouble'){

              if(currentRoom3Time > '0'){
                vm.room3currenttime = moment().startOf('day').seconds(currentRoom3Time).format("mm:ss");
              }
              else{
                vm.room3currenttime = '00:00';
              }

            }

            if(vm.room3status == 'Playing'){

              if(currentRoom3Time > '0'){
                vm.room3currenttime = moment().startOf('day').seconds(currentRoom3Time).format("mm:ss");
              }
              else{
                vm.room3currenttime = '00:00';
              }

            }
            /** END OF ROOM 3 **/


            /** ROOM 4 **/

            var room4gameendtime = x.statusResult[3].game_end;
            var room4gameendtimeminute = moment(room4gameendtime).format("mm");
            var room4gameendtimesecond = moment(room4gameendtime).format("ss");
            var convertMinute4ToSeconds = room4gameendtimeminute*60;

            var gameendtime4 = room4gameendtimeminute+room4gameendtimesecond;

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime4);

            var currentRoom4Time = gameendtime4-currentTimeValue;
            console.log(currentRoom4Time);

            if(vm.room4status == 'Ready'){
              vm.room4currenttime = '00:00';
            }

            if(vm.room4status == 'Instructions'){
              vm.room4currenttime = '10:00';
            }

            if(vm.room4status == 'Waiting'){
              vm.room4currenttime = '00:00';
            }

            if(vm.room4status == 'Trouble'){

              if(currentRoom4Time > '0'){
                vm.room4currenttime = moment().startOf('day').seconds(currentRoom4Time).format("mm:ss");
              }
              else{
                vm.room4currenttime = '00:00';
              }

            }

            if(vm.room4status == 'Playing'){

              if(currentRoom4Time > '0'){
                vm.room4currenttime = moment().startOf('day').seconds(currentRoom4Time).format("mm:ss");
              }
              else{
                vm.room4currenttime = '00:00';
              }

            }
            /** END OF ROOM 4 **/


            /** ROOM 5 **/

            var room5gameendtime = x.statusResult[4].game_end;
            var room5gameendtimeminute = moment(room5gameendtime).format("mm");
            var room5gameendtimesecond = moment(room5gameendtime).format("ss");
            var convertMinute5ToSeconds = room5gameendtimeminute*60;

            var gameendtime5 = room5gameendtimeminute+room5gameendtimesecond;

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime5);

            var currentRoom5Time = gameendtime5-currentTimeValue;
            console.log(currentRoom5Time);

            if(vm.room5status == 'Ready'){
              vm.room5currenttime = '00:00';
            }

            if(vm.room5status == 'Instructions'){
              vm.room5currenttime = '10:00';
            }

            if(vm.room5status == 'Waiting'){
              vm.room5currenttime = '00:00';
            }

            if(vm.room5status == 'Trouble'){

              if(currentRoom5Time > '0'){
                vm.room5currenttime = moment().startOf('day').seconds(currentRoom5Time).format("mm:ss");
              }
              else{
                vm.room5currenttime = '00:00';
              }

            }

            if(vm.room5status == 'Playing'){

              if(currentRoom5Time > '0'){
                vm.room5currenttime = moment().startOf('day').seconds(currentRoom5Time).format("mm:ss");
              }
              else{
                vm.room5currenttime = '00:00';
              }

            }
            /** END OF ROOM 5 **/

              
            
            
            // console.log(currentGameTime);
            // vm.room1currenttime = moment().startOf('day').seconds(currentGameTime).format("mm:ss");

            // vm.room1roomtime = moment().startOf('day').seconds(convert1roomtime).format("mm:ss");

            // var convert2roomtime = x.statusResult[1].Session.game_end;
            // vm.room2roomtime = moment().startOf('day').seconds(convert2roomtime).format("mm:ss");

            // var convert3roomtime = x.statusResult[2].Session.game_end;
            // vm.room3roomtime = moment().startOf('day').seconds(convert3roomtime).format("mm:ss");

            // var convert4roomtime = x.statusResult[3].Session.game_end;
            // vm.room4roomtime = moment().startOf('day').seconds(convert4roomtime).format("mm:ss");

            // var convert5roomtime = x.statusResult[4].Session.game_end;
            // vm.room5roomtime = moment().startOf('day').seconds(convert5roomtime).format("mm:ss");
          /** end of current room time **/

            /** defines the background color following 2 Instructions, 3 Playing, 4 Waiting, 5 Released, 1 Ready **/
              
              /** ROOM 1 **/
                if(vm.room1status == 'Ready'){
                  // vm.room1StatusColor['background-color'] = '#00ff80';
                  vm.room1StatusColor = 'greenStatus';
                  vm.room1StatusTextColor = 'greenStatusText';
                }

                if(vm.room1status == 'Instructions'){
                  vm.room1StatusColor = 'blueStatus';
                  vm.room1StatusTextColor = 'blueStatusText';
                }

                if(vm.room1status == 'Playing'){
                  // vm.room1StatusColor['background-color'] = 'blue';
                  vm.room1StatusColor = 'blueStatus';
                  vm.room1StatusTextColor = 'blueStatusText';
                }

                if(vm.room1status == 'Waiting'){
                  // vm.room1StatusColor['background-color'] = '#ffff00';
                  vm.room1StatusColor = 'yellowStatus';
                  vm.room1StatusTextColor = 'yellowStatusText';
                }

                if(vm.room1status == 'Released'){
                  vm.room1StatusColor = 'greenStatus';
                  vm.room1StatusTextColor = 'greenStatusText';
                }

                if(vm.room1status == 'Trouble'){
                  // vm.room1StatusColor['background-color'] = '#ff007f';
                  vm.room1StatusColor = 'pinkStatus';
                  vm.room1StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 1 **/

              /** ROOM 2 **/
                if(vm.room2status == 'Ready'){
                  vm.room2StatusColor = 'greenStatus';
                  vm.room2StatusTextColor = 'greenStatusText';
                }

                if(vm.room2status == 'Instructions'){
                  vm.room2StatusColor['background-color'] = 'blue';
                  vm.room2StatusTextColor = 'blueStatusText';
                }

                if(vm.room2status == 'Playing'){
                  vm.room2StatusColor = 'blueStatus';
                  vm.room2StatusTextColor = 'blueStatusText';
                }

                if(vm.room2status == 'Waiting'){
                  vm.room2StatusColor = 'yellowStatus';
                  vm.room2StatusTextColor = 'yellowStatusText';
                }

                if(vm.room2status == 'Released'){
                  vm.room2StatusColor = 'greenStatus';
                  vm.room2StatusTextColor = 'greenStatusText';
                }

                if(vm.room2status == 'Trouble'){
                  vm.room2StatusColor = 'pinkStatus';
                  vm.room2StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 2 **/

              /** ROOM 3 **/
                if(vm.room3status == 'Ready'){
                  vm.room3StatusColor = 'greenStatus';
                  vm.room3StatusTextColor = 'greenStatusText';
                }

                if(vm.room3status == 'Instructions'){
                  vm.room3StatusColor['background-color'] = 'blue';
                  vm.room3StatusTextColor = 'blueStatusText';
                }

                if(vm.room3status == 'Playing'){
                  vm.room3StatusColor = 'blueStatus';
                  vm.room3StatusTextColor = 'blueStatusText';
                }

                if(vm.room3status == 'Waiting'){
                  vm.room3StatusColor = 'yellowStatus';
                  vm.room3StatusTextColor = 'yellowStatusText';
                }

                if(vm.room3status == 'Released'){
                  vm.room3StatusColor = 'greenStatus';
                  vm.room3StatusTextColor = 'greenStatusText';
                }

                if(vm.room3status == 'Trouble'){
                  vm.room3StatusColor = 'pinkStatus';
                  vm.room3StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 3 **/

              /** ROOM 4 **/
                if(vm.room4status == 'Ready'){
                  vm.room4StatusColor = 'greenStatus';
                  vm.room4StatusTextColor = 'greenStatusText';
                }

                if(vm.room4status == 'Instructions'){
                  vm.room4StatusColor['background-color'] = 'blue';
                  vm.room4StatusTextColor = 'blueStatusText';
                }

                if(vm.room4status == 'Playing'){
                  vm.room4StatusColor = 'blueStatus';
                  vm.room4StatusTextColor = 'blueStatusText';
                }

                if(vm.room4status == 'Waiting'){
                  vm.room4StatusColor = 'yellowStatus';
                  vm.room4StatusTextColor = 'yellowStatusText';
                }

                if(vm.room4status == 'Released'){
                  vm.room4StatusColor = 'greenStatus';
                  vm.room4StatusTextColor = 'greenStatusText';
                }

                if(vm.room4status == 'Trouble'){
                  vm.room4StatusColor = 'pinkStatus';
                  vm.room4StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 4 **/

              /** ROOM 5 **/
                if(vm.room5status == 'Ready'){
                  vm.room5StatusColor = 'greenStatus';
                  vm.room5StatusTextColor = 'greenStatusText';
                }

                if(vm.room5status == 'Instructions'){
                  vm.room5StatusColor['background-color'] = 'blue';
                  vm.room5StatusTextColor = 'blueStatusText';
                }

                if(vm.room5status == 'Playing'){
                  vm.room5StatusColor = 'blueStatus';
                  vm.room5StatusTextColor = 'blueStatusText';
                }

                if(vm.room5status == 'Waiting'){
                  vm.room5StatusColor = 'yellowStatus';
                  vm.room5StatusTextColor = 'yellowStatusText';
                }

                if(vm.room5status == 'Released'){
                  vm.room5StatusColor = 'greenStatus';
                  vm.room5StatusTextColor = 'greenStatusText';
                }

                if(vm.room5status == 'Trouble'){
                  vm.room5StatusColor = 'pinkStatus';
                  vm.room5StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 5 **/

            /** end of background color game states **/


          }

        }
        else{
          // console.log("less");
        }
        // console.log("ROOM STATUS"+room1status);

        // if(room1status > 0){
        //   this.room1status = '1';
        // }

      })
      
      // console.log(client.subscribe('route_status'));
    }

  },


  mounted: function(){
    
    this.runMqtt();

  },

  computed: {
     time: function() {
      return this.minutes + " : " + this.seconds;
    },
    minutes: function() {
      var min = Math.floor(this.totalTime / 60);
      return min >= 10 ? min : '0' + min;
    },
    seconds: function() {
      var sec = this.totalTime - (this.minutes * 60);
      return sec >= 10 ? sec : '0' + sec;
    }
  },

   // watch: {

   //          timerCount: {
   //              handler(value) {

   //                  if (value > 0) {
   //                      setTimeout(() => {
   //                          this.timerCount--;
   //                      }, 1000);
   //                  }

   //              },
   //              immediate: true // This ensures the watcher is triggered upon creation
   //          }

   //      }
  

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


#blinking{
    animation:blinkingText 1.2s infinite;
}
@keyframes blinkingText{
    0%{     color: #000;    }
    49%{    color: #000; }
    60%{    color: transparent; }
    99%{    color:transparent;  }
    100%{   color: #000;    }
}

#add30sec{
  background-color: black;
  padding-top: 7%;
  padding-bottom: 7%;
}

#bombTime{
  padding-top:15%; 
  padding-bottom: 15%; 
  background-color: black; 
  color: #fafafa;
}

#resetStartButton{
  background-color: black;
  padding-top: 5%;
  padding-bottom: 5%;
}

.playImage{
  width: 20px;
}

.blackBackgroundOverText{
  background-color: black;
}

.bombTimeText{
  font-weight: bold;
}

.teamNameText{
  font-weight: bold;
  font-size: 1.1em;
}

.sizeAndTimeDetail{
  font-weight: bold;
  font-size: 1.1em;
}

.greenStatus{
  background-color: #00ff80; 
  padding-top: 1%;
}

.pinkStatus{
  background-color: #ff007f; 
  padding-top: 1%;
}

.yellowStatus{
  background-color: #ffff00; 
  padding-top: 1%;
}

.blueStatus{
  background-color: #0000FF;
  padding-top: 1%;
}

.greenStatusText{
  color: #00ff80;
  font-weight: bold;
}

.pinkStatusText{
  color: #ff007f;
  font-weight: bold;
}

.yellowStatusText{
  color: #ffff00;
  font-weight: bold;
}

.blueStatusText{
  color: #0000FF;
  font-weight: bold;
}


.playingStatus{
  background-color: #007bff;
  padding-top: 1%;
}

.gameLogo{
  width: 95%;
}

</style>
