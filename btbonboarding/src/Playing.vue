<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <div class="bv-example-row" id="mainContainer">
      <b-row>
        <!-- start of the left div which has navigation menu -->
        <b-col lg="2">

          <b-list-group class="leftMenuDiv">
            <b-list-group-item href="/#/users">Check-In</b-list-group-item>
            <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item>
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Waiting</b-list-group-item>
            <b-list-group-item href="/#/Playing" active>Playing</b-list-group-item>
            <b-list-group-item href="#">Wrapping up</b-list-group-item>
            <b-list-group-item href="#foobar">Social Tagging</b-list-group-item>
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->



        <!-- start of right div which consists of table with all details -->
        <b-col lg="10"  style="background-color:#fafafa;">
          
          <b-col>
            <h2 style="color: #007BFF;">PLAYING </h2>
            <hr/>
          </b-col>

          <b-row v-show="sideAdisplay">
            <b-col class="border border-dark" id="statusScreenDiv">
              <div class="gamesLogoDiv">
                <img src="./assets/HA.png" class="gamesLogoImage" />
              </div>

              <div class="gamesTitleDiv">
                <p style="font-size: 1.3em;">HACKATTACK</p> <!-- this name should be fetched from database -->
                <p class="gamesTextStatus">READY</p>
              </div>

              <div class="gamesThirdDiv">

                <p class="gameTime">0:00</p>
                <p class="teamNameText">TEAM NAME</p>
                <p class="thirdDivText">TEAM SIZE : 5 </p>
                <p class="thirdDivText">+2:05 FOR HACKATTACK</p>
                <p class="thirdDivText">BOMBTIME: 2:05</p>

              </div>
            </b-col>

            <b-col class="border border-dark" id="statusScreenDivReleased">
              <div class="gamesLogoDiv">
                <img src="./assets/LM.png" class="gamesLogoImage" />
              </div>

              <div class="gamesTitleDiv">
                <p style="font-size: 1.3em;">LASERMAZE</p> <!-- this name should be fetched from database -->
                <p class="gamesTextStatus">RELEASED</p>
              </div>

              <div class="gamesThirdDiv">

                <p class="gameTime">0:00</p>
                <p class="teamNameText">GHOSTBUSTERS</p>
                <p class="thirdDivText">TEAM SIZE : 5 </p>
                <p class="thirdDivText">+1:45 FOR LASERMAZE</p>
                <p class="thirdDivText">BOMBTIME: 1:45</p>

              </div>
            </b-col>


            <b-col class="border border-dark" id="statusScreenDivNotEarned">
              <div class="gamesLogoDiv">
                <img src="./assets/EC.png" class="gamesLogoImage" />
              </div>

              <div class="gamesTitleDiv">
                <p style="font-size: 1.3em;">ECHOCHAMBER</p> <!-- this name should be fetched from database -->
                <p class="gamesTextStatus">GAME DISCONNECTED</p>
              </div>

              <div class="gamesThirdDiv">

                <p class="gameTime">0:00</p>
                <p class="teamNameText">GHOSTBUSTERS</p>
                <p class="thirdDivText">TEAM SIZE : 5 </p>
                <p class="thirdDivText">+1:45 FOR ECHOCHAMBER</p>
                <p class="thirdDivText">BOMBTIME: 1:45</p>

              </div>
            </b-col>


            <b-col class="border border-dark" id="statusScreenDivPlaying">
              <div class="gamesLogoDiv">
                <img src="./assets/FG.png" class="gamesLogoImage" />
              </div>

              <div class="gamesTitleDiv">
                <p style="font-size: 1.3em;">FLOORGRID</p> <!-- this name should be fetched from database -->
                <p class="gamesTextStatus">PLAYING</p>
              </div>

              <div class="gamesThirdDiv">

                <p class="gameTime">0:00</p>
                <p class="teamNameText">MARSHMALLOWS</p>
                <p class="thirdDivText">TEAM SIZE : 5 </p>
                <p class="thirdDivText">+1:45 FOR FLOORGRID</p>
                <p class="thirdDivText">BOMBTIME: 1:45</p>

              </div>
            </b-col>

            <b-col class="border border-dark" id="statusScreenDiv">
              <div class="gamesLogoDiv">
                <img src="./assets/CB.png" class="gamesLogoImage" />
              </div>

              <div class="gamesTitleDiv">
                <p style="font-size: 1.3em;">CYBERBOT</p> <!-- this name should be fetched from database -->
                <p class="gamesTextStatus">READY</p>
              </div>

              <div class="gamesThirdDiv">

                <p class="gameTime">0:00</p>
                <p class="teamNameText">GHOSTBUSTERS</p>
                <p class="thirdDivText">TEAM SIZE : 5 </p>
                <p class="thirdDivText">+1:45 FOR CYBERBOT</p>
                <p class="thirdDivText">BOMBTIME: 1:45</p>

              </div>
            </b-col>

          </b-row>

          <b-row v-show="sideBdisplay">
            <p> CONTENTS FOR SIDE B </p>
          </b-row>

          <br/>

          <b-row>
            <b-col>
              <b-button v-b-modal.modal-xl variant="info" v-on:click="sideBdisplay = !sideBdisplay ; sideAdisplay = !sideAdisplay ;">SIDE A</b-button> &nbsp;
              <b-button v-b-modal.modal-xl variant="outline-info"  v-on:click="sideAdisplay = !sideAdisplay ; sideBdisplay = !sideBdisplay ;">SIDE B</b-button>
            </b-col>
          </b-row>

          <br/>

        </b-col>

      </b-row>
    </div>

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
      sideAdisplay: true,
      sideBdisplay: false
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

#mainContainer{
  /*background-color: green;*/
  width: 90%;
  margin:auto;
}

#statusScreenDiv{
  background-color: #00FF80;
}

#statusScreenDivReleased{
  background-color: yellow;
}

#statusScreenDivNotEarned{
  background-color: #FF007f;
  color: pink;
}

#statusScreenDivPlaying{
  background-color: #007bff;
}

.gamesLogoDiv{
  /*background-color: #00FF80;*/
}

.gamesLogoImage{
  width: 70%;
  padding-top: 5%;
  padding-bottom: 5%;
}

.gamesTitleDiv{
  background-color: black;
  color:#00FF80;
  padding-top: 1%;
  height: 55px;
  width: 100%;
  font-weight:bold;
  /*padding-bottom: 2%;*/
}

.gamesTextStatus{
  color: #00ff80;
  margin-top: -9%;
}

.gamesThirdDiv{
  /*background-color: #00FF80;*/
  padding-top: 4%;
  padding-bottom: 5%;
}

.gameTime{
  font-size: 1.2em;
  font-weight:bold;
  color:black;
}

.teamNameText{
  font-size: 1.3em;
  font-weight:bold;
  color:black;
}

.thirdDivText{
  font-weight: bold;
  color:black;
}

</style>
