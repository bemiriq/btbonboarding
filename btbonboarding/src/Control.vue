<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="bv-example-row" style="width: 80%;margin:auto;">
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="http://localhost:8080/#/users">Check-In</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/onsite">Onsite Players</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="http://localhost:8080/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="#">Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10"  style="background-color:#fafafa; font-weight: bold;">

          <b-row class="alert alert-primary" role="alert">
            <b-col class="col-6"><p id="blinking"> ARBITER DISCONNECTED INFORMATION </p></b-col>
            <b-col> PAUSE </b-col>
            <b-col> PLAY </b-col>
            <b-col> ROOM TIME </b-col>
            <b-col> BOMB TIME </b-col>
          </b-row>

          <b-row>

            <!-- starting div for room 1 and room 6 -->
            <b-col class="border border-dark" style="background-color: #00ff80; padding-top: 1%;">
                <div>
                  <h4 style="font-weight: bold;"> ROOM 1 </h4>
                  <hr/>

                  <h5 style="font-weight: bold;"> TEAM NAME </h5>
                </div>

                <br/>
                
                <div>
                  <p id="bombTime"> Bomb Time : {{ room1counter }} </p>
                </div>

                <br/>

                <div>
                  <p>Game Ops IP = 192.168.1.105</p>
                  <p>Room Ops IP = 192.168.1.116</p>
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

                <br/>

            </b-col>
            <!-- end b-col and div for room 1 and room 6 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col style="background-color: #ff007f;padding-top: 1%;">
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
            <b-col style="background-color: #ffff00;padding-top: 1%;">
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
            <b-col style="background-color: #007bff;padding-top: 1%;">
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
            <b-col style="background-color: #00ff80;padding-top: 1%;">
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
        <b-col><a href="http://localhost:8080/#/controlroom">Control Room</a></b-col>
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
    }
    
  }

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

</style>
