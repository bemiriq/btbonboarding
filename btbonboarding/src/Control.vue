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
            <b-list-group-item href="#">Playing</b-list-group-item>
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
            <b-col class="border border-dark" v-bind:class="[gameStatusByColor ? 'greenStatus' : 'playingStatus']">
                <div>
                  <b-row>
                    <b-col>
                      <h4 style="font-weight: bold;"> ROOM 1 </h4>
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
            <b-col class="border border-dark" style="background-color: #ff007f;padding-top: 1%;">
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
            <b-col class="border border-dark" style="background-color: #ffff00;padding-top: 1%;">
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
            <b-col class="border border-dark" style="background-color: #00ff80;padding-top: 1%;">
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
            <b-col class="border border-dark" style="background-color: #00ff80;padding-top: 1%;">
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

<script>
// import HelloWorld from './components/HelloWorld.vue'

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
    }
  },


  mounted: function(){
    // this.interval = setInterval(this.updateCurrentTime, 1000);
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

.playingStatus{
  background-color: #007bff;
  padding-top: 1%;
}

</style>
