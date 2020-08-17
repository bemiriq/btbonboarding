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
                  <b-row>
                    <b-col>
                      <h4 style="font-weight: bold;"> ROOM 1 </h4>
                      <p style="font-weight: bold;"> {{room1game}} </p> <!-- Game Name -->
                      <p style="font-weight: bold;"> {{room1status}} </p> <!-- Room Status Detail -->
                      <p style="font-weight: bold;"> {{room1teamname}} </p> <!-- Team Size -->
                      <p style="font-weight: bold;"> {{room1bombtime}} </p> <!-- Bomb Time -->
                    </b-col>
                    <b-col> 
                      <div v-on:click="room1pauseDiv = !room1pauseDiv ; room1playDiv = !room1playDiv ;">

                        <div v-show="!room1playDiv" @click="timerPause">
                          <img src="./assets/icons/pause1.png"/>
                          <!-- <p>PLAY</p> -->
                        </div>

                        <div v-show="!room1pauseDiv" @click="timerRun">
                          <img src="./assets/icons/play4.png" />
                          <!-- <p>PAUSED</p> -->
                        </div>

                      </div>
                      <!-- <span :class="{red: !alwaysAccordionMode }">Tabs</span>
                      <span :class="{red: alwaysAccordionMode }">Accordion</span> -->
                     </b-col>
                  </b-row>
                  <hr/>
                </div>

                <!-- <div><div id="time" v-html="time"></div>
                  <div class="buttons">
                    <button v-if="!state" @click="resume">Resume</button>
                    <button v-if="state" @click="pause">Pause</button>
                  </div>
                </div> -->

                <div>
                  <!-- <select v-model="selected">
                    <option v-for="option in options" v-bind:value="option.text" v-bind:key="option.text">
                      {{ option.text }}
                    </option>
                  </select> -->
                  <span>Teamname</span>

                  <b-form-group id="input-group-3" label-for="input-3">
                    <b-form-select id="input-3" v-model="options.text" :options="options" required>
                      
                    </b-form-select>
                  </b-form-group>

                </div>
                <br/>
                
                <div>
                  <div id="bombTime">Bomb Time :  <span v-html="time">{{totalTime}}</span>  </div>
                  <!-- <p id="time" v-html="time">{{timerCount}}</p> -->
                </div>

                <br/>

                <div>
                  <p>Game Ops IP = 192.168.1.105</p>
                  <p>Room Ops IP = 192.168.1.116</p>
                </div>

                <br/>


                <div id="add30sec">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="totalTime += 30"> + 30 sec </button></b-col>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="totalTime -= 30"> - 30 sec </button></b-col>
                  </b-row>
                </div>



                <div id="resetStartButton">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-info" @click="timerReset">RESET</button></b-col>
                    <b-col><button type="button" class="btn btn-outline-info" @click="timerRun">START</button></b-col>
                  </b-row>
                </div>

                <br/>

            </b-col>
            <!-- end b-col and div for room 1 and room 6 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room2StatusColor">
                <div>
                  <h4 style="font-weight: bold;"> ROOM 2 </h4>
                  <hr/>

                  <h5 style="font-weight: bold;"> TEAM NAME </h5>
                </div>

                <br/>
                
                <div>
                  <p id="bombTime"> Bomb Time : + 4:50 </p>
                </div>

                <br/>

                <div>
                  <p>Game Ops IP = 192.168.1.106</p>
                  <p>Room Ops IP = 192.168.1.117</p>
                </div>

                <br/>


                <div id="add30sec">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="room1counter += 30"> + 30 sec </button></b-col>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="room1counter -= 30"> - 30 sec </button></b-col>
                  </b-row>
                </div>



                <div id="resetStartButton">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-info">RESET</button></b-col>
                    <b-col><button type="button" class="btn btn-outline-info">START</button></b-col>
                  </b-row>
                </div>

            </b-col>
            <!-- ending div for room 2 and room 7 -->

            <!-- starting b-col and div for room 3 and room 8 -->
            <b-col class="border border-dark" v-bind:class="room3StatusColor">
                <div>
                  <h4 style="font-weight: bold;"> ROOM 3 </h4>
                  <hr/>

                  <h5 style="font-weight: bold;"> TEAM NAME </h5>
                </div>

                <br/>
                
                <div>
                  <p id="bombTime"> Bomb Time : + 3:30 </p>
                </div>

                <br/>

                <div>
                  <p>Game Ops IP = 192.168.1.107</p>
                  <p>Room Ops IP = 192.168.1.118</p>
                </div>

                <br/>


                <div id="add30sec">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="room1counter += 30"> + 30 sec </button></b-col>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="room1counter -= 30"> - 30 sec </button></b-col>
                  </b-row>
                </div>



                <div id="resetStartButton">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-info">RESET</button></b-col>
                    <b-col><button type="button" class="btn btn-outline-info">START</button></b-col>
                  </b-row>
                </div>

            </b-col>
            <!-- ending div for room 3 and room 8 -->

            <!-- starting b-col and div for room 4 and room 9 -->
            <b-col class="border border-dark" v-bind:class="room4StatusColor">
                <div>
                  <h4 style="font-weight: bold;"> ROOM 4 </h4>
                  <hr/>

                  <h5 style="font-weight: bold;"> TEAM NAME </h5>
                </div>

                <br/>
                
                <div>
                  <p id="bombTime"> Bomb Time : + 2:35 </p>
                </div>

                <br/>

                <div>
                  <p>Game Ops IP = 192.168.1.108</p>
                  <p>Room Ops IP = 192.168.1.119</p>
                </div>

                <br/>


                <div id="add30sec">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="room1counter += 30"> + 30 sec </button></b-col>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="room1counter -= 30"> - 30 sec </button></b-col>
                  </b-row>
                </div>



                <div id="resetStartButton">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-info">RESET</button></b-col>
                    <b-col><button type="button" class="btn btn-outline-info">START</button></b-col>
                  </b-row>
                </div>

            </b-col>
            <!-- ending div for room 4 and room 9 -->


            <!-- starting b-col and div for room 5 and room 10 -->
            <b-col class="border border-dark" v-bind:class="room5StatusColor">
                <div>
                  <h4 style="font-weight: bold;"> ROOM 5 </h4>
                  <hr/>

                  <h5 style="font-weight: bold;"> TEAM NAME </h5>
                </div>

                <br/>
                
                <div>
                  <p id="bombTime"> Bomb Time : + 5:25 </p>
                </div>

                <br/>

                <div>
                  <p>Game Ops IP = 192.168.1.109</p>
                  <p>Room Ops IP = 192.168.1.120</p>
                </div>

                <br/>


                <div id="add30sec">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="room1counter += 30"> + 30 sec </button></b-col>
                    <b-col><button type="button" class="btn btn-outline-light" v-on:click="room1counter -= 30"> - 30 sec </button></b-col>
                  </b-row>
                </div>



                <div id="resetStartButton">
                  <b-row>
                    <b-col><button type="button" class="btn btn-outline-info">RESET</button></b-col>
                    <b-col><button type="button" class="btn btn-outline-info">START</button></b-col>
                  </b-row>
                </div>

            </b-col>
            <!-- ending div for room 5 and room 10 -->

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

      room2status: null,
      room2StatusColor: '',

      room3status: null,
      room3StatusColor: '',

      room4status: null,
      room4StatusColor: '',

      room5status: null,
      room5StatusColor: '',


      room1game: '',
      room2game: '',
      room3game: '',
      room4game: '',
      room5game: '',

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


            vm.room1teamname = x.statusResult[0].Session.player_count;
            vm.room2teamname = x.statusResult[1].Session.player_count;
            vm.room3teamname = x.statusResult[2].Session.player_count;
            vm.room4teamname = x.statusResult[3].Session.player_count;
            vm.room5teamname = x.statusResult[4].Session.player_count;

            var convertroom1bombtime = x.statusResult[0].Session.bomb_time;
            console.log(convertroom1bombtime);
            vm.room1bombtime = moment().seconds(convertroom1bombtime).format("mmss");

            vm.room2bombtime = x.statusResult[1].Session.bomb_time;
            vm.room3bombtime = x.statusResult[2].Session.bomb_time;
            vm.room4bombtime = x.statusResult[3].Session.bomb_time;
            vm.room5bombtime = x.statusResult[4].Session.bomb_time;

            /** defines the background color following 2 Instructions, 3 Playing, 4 Waiting, 5 Released, 1 Ready **/
              
              /** ROOM 1 **/
                if(vm.room1status == 'Ready'){
                  // vm.room1StatusColor['background-color'] = '#00ff80';
                  vm.room1StatusColor = 'greenStatus';
                }

                if(vm.room1status == 'Instructions'){
                  vm.room1StatusColor['background-color'] = 'blue';
                }

                if(vm.room1status == 'Playing'){
                  // vm.room1StatusColor['background-color'] = 'blue';
                  vm.room1StatusColor = 'blueStatus';
                }

                if(vm.room1status == 'Waiting'){
                  // vm.room1StatusColor['background-color'] = '#ffff00';
                  vm.room1StatusColor = 'yellowStatus';
                }

                if(vm.room1status == 'Released'){
                  vm.room1StatusColor = 'greenStatus';
                }

                if(vm.room1status == 'Trouble'){
                  // vm.room1StatusColor['background-color'] = '#ff007f';
                  vm.room1StatusColor = 'pinkStatus';
                }
              /** END OF ROOM 1 **/

              /** ROOM 2 **/
                if(vm.room2status == 'Ready'){
                  vm.room2StatusColor = 'greenStatus';
                }

                if(vm.room2status == 'Instructions'){
                  vm.room2StatusColor['background-color'] = 'blue';
                }

                if(vm.room2status == 'Playing'){
                  vm.room2StatusColor = 'blueStatus';
                }

                if(vm.room2status == 'Waiting'){
                  vm.room2StatusColor = 'yellowStatus';
                }

                if(vm.room2status == 'Released'){
                  vm.room2StatusColor = 'greenStatus';
                }

                if(vm.room2status == 'Trouble'){
                  vm.room2StatusColor = 'pinkStatus';
                }
              /** END OF ROOM 2 **/

              /** ROOM 3 **/
                if(vm.room3status == 'Ready'){
                  vm.room3StatusColor = 'greenStatus';
                }

                if(vm.room3status == 'Instructions'){
                  vm.room3StatusColor['background-color'] = 'blue';
                }

                if(vm.room3status == 'Playing'){
                  vm.room3StatusColor = 'blueStatus';
                }

                if(vm.room3status == 'Waiting'){
                  vm.room3StatusColor = 'yellowStatus';
                }

                if(vm.room3status == 'Released'){
                  vm.room3StatusColor = 'greenStatus';
                }

                if(vm.room3status == 'Trouble'){
                  vm.room3StatusColor = 'pinkStatus';
                }
              /** END OF ROOM 3 **/

              /** ROOM 4 **/
                if(vm.room4status == 'Ready'){
                  vm.room4StatusColor = 'greenStatus';
                }

                if(vm.room4status == 'Instructions'){
                  vm.room4StatusColor['background-color'] = 'blue';
                }

                if(vm.room4status == 'Playing'){
                  vm.room4StatusColor = 'blueStatus';
                }

                if(vm.room4status == 'Waiting'){
                  vm.room4StatusColor = 'yellowStatus';
                }

                if(vm.room4status == 'Released'){
                  vm.room4StatusColor = 'greenStatus';
                }

                if(vm.room4status == 'Trouble'){
                  vm.room4StatusColor = 'pinkStatus';
                }
              /** END OF ROOM 4 **/

              /** ROOM 5 **/
                if(vm.room5status == 'Ready'){
                  vm.room5StatusColor = 'greenStatus';
                }

                if(vm.room5status == 'Instructions'){
                  vm.room5StatusColor['background-color'] = 'blue';
                }

                if(vm.room5status == 'Playing'){
                  vm.room5StatusColor = 'blueStatus';
                }

                if(vm.room5status == 'Waiting'){
                  vm.room5StatusColor = 'yellowStatus';
                }

                if(vm.room5status == 'Released'){
                  vm.room5StatusColor = 'greenStatus';
                }

                if(vm.room5status == 'Trouble'){
                  vm.room5StatusColor = 'pinkStatus';
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
  background-color: #ffff00; 
  padding-top: 1%;
}


.playingStatus{
  background-color: #007bff;
  padding-top: 1%;
}

</style>
