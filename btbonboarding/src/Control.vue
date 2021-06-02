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
            <!-- <b-list-group-item href="/#/onsite">Onsite Players</b-list-group-item> -->
            <b-list-group-item href="/#/Onboarding">Onboarding</b-list-group-item>
            <b-list-group-item href="/#/Waiting">Teams On Deck</b-list-group-item>
            <b-list-group-item href="/#/Activeteams">Active Teams</b-list-group-item>
            <b-list-group-item href="/#/Playing">Status Screen</b-list-group-item>
            <b-list-group-item href="/#/Playerdetails">Player Details</b-list-group-item>
            <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item>
            <b-list-group-item href="/#/Social">Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->

        <b-modal id="modal-startTeam" centered v-bind:hide-footer="true">
          <p class="warning"><b> TEAM LIST</b></p>
        
            <b-form-select v-model="teamSessionId" class="mb-3">
              <option v-for="item in teamList" v-bind:key="item.id" v-bind:value="item.id">{{item.Team.name}}</option>
            </b-form-select>

            <b-button @click="clickedTeamName()">START NOW</b-button>
        </b-modal>

        <b-modal id="modal-resetTeam" centered v-bind:hide-footer="true">
          <p class="warning"><b> You are going to reset {{resetRoomName}} ?</b></p>
          <b-row>
            <b-col>
              <b-button @click="confirmedResetTeam()" variant="danger">OK</b-button>
            </b-col>
            <b-col>
              <b-button @click="hideResetModal()" variant="primary">CANCEL</b-button>
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>
        </b-modal>

        <b-modal id="modal-startConfirmation" centered v-bind:hide-footer="true">
          <p class="warning"><b> Start TEAM NAME on ROOM 1</b></p>
        </b-modal>

        <!-- SIDE A status screen -->
        <!-- start of right div which consists of table with all details -->
        <b-col lg="10" style="background-color:#fafafa; font-weight: bold;" v-show="sideAdiv">
          <b-row>
           
            <b-col>
              <b-button :pressed="true" variant="info" v-on:click="sideAdiv = !sideAdiv; sideBdiv = !sideBdiv;" size="lg">SIDE A</b-button>
            </b-col>
             <b-col><p class="sideHeading">SIDE A</p></b-col>
            <b-col>
              <b-button variant="outline-info" v-on:click="sideAdiv = !sideAdiv; sideBdiv = !sideBdiv;" size="lg">SIDE B</b-button>
            </b-col>
          </b-row>

          <b-row>
            <!-- starting div for room 1 and room 6 -->
            <!-- <b-col class="border border-dark" v-bind:class="[gameStatusByColor ? 'greenStatus' : 'playingStatus']"> -->
            <b-col class="border border-dark" v-bind:class="room1StatusColor">

                <div style="background-color: room1StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room1game}} </p>
                      <p class="teamNameText"> {{room1status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room1currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room1teamname}} </p> -->
                  <p class="teamNameText" v-if="room1teamname.length > 15" style="font-size: 1.1em;"> {{room1teamname}}</p>
                  <p v-else class="teamNameText"> {{room1teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room1teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room1timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room1bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room1SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,1), teamRoomNumber = 1">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,1), teamRoomNumber = 1">RESET</b-button>
                </div>

                <div v-if="skipValue1 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,1,a)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,1,a,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,1,a,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,1,a,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,1,a,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,1,a,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,1,a,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,1,a,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,1,a,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>
            <!-- end b-col and div for room 1 and room 6 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room2StatusColor">

                <div style="background-color: room2StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room2game}} </p>
                      <p class="teamNameText"> {{room2status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room2currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room2teamname}} </p> -->
                  <p class="teamNameText" v-if="room2teamname.length > 15" style="font-size: 1.1em;"> {{room2teamname}}</p>
                  <p v-else class="teamNameText"> {{room2teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room2teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room2timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room2bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room2SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,2), teamRoomNumber = 2">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,2), teamRoomNumber = 2">RESET</b-button>
                </div>

                <div v-if="skipValue2 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,2,a)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,2,a,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,2,a,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,2,a,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,2,a,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,2,a,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,2,a,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,2,a,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,2,a,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>
            <!-- ending div for room 2 and room 7 -->

            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room3StatusColor">

                <div style="background-color: room3StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room3game}} </p>
                      <p class="teamNameText"> {{room3status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room3currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room3teamname}} </p> -->
                  <p class="teamNameText" v-if="room3teamname.length > 15" style="font-size: 1.1em;"> {{room3teamname}}</p>
                  <p v-else class="teamNameText"> {{room3teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room3teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room3timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room3bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room3SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,3), teamRoomNumber = 3">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,3), teamRoomNumber = 3">RESET</b-button>
                </div>

                <div v-if="skipValue3 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,3,a)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,3,a,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,3,a,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,3,a,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,3,a,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,3,a,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,3,a,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,3,a,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,3,a,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>
            <!-- ending div for room 2 and room 7 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room4StatusColor">

                 <div style="background-color: room4StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room4game}} </p>
                      <p class="teamNameText"> {{room4status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room4currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room4teamname}} </p> -->
                  <p class="teamNameText" v-if="room4teamname.length > 15" style="font-size: 1.1em;"> {{room4teamname}}</p>
                  <p v-else class="teamNameText"> {{room4teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room4teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room4timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room4bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room4SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,4), teamRoomNumber = 4">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,4), teamRoomNumber = 4">RESET</b-button>
                </div>

                <div v-if="skipValue4 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,4,a)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,4,a,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,4,a,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,4,a,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,4,a,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,4,a,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,4,a,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,4,a,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,4,a,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>
            <!-- ending div for room 2 and room 7 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room5StatusColor">

                <div style="background-color: room5StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room5game}} </p>
                      <p class="teamNameText" v-if=" room5status == 'Photobomb Running'"> PB Running </p>
                      <p class="teamNameText" v-else> {{room5status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room5currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room5teamname}} </p> -->
                  <p class="teamNameText" v-if="room5teamname.length > 15" style="font-size: 1.1em;"> {{room5teamname}}</p>
                  <p v-else class="teamNameText"> {{room5teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room5teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room5timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room5bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room5SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,5), teamRoomNumber = 5">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,5), teamRoomNumber = 5">RESET</b-button>
                </div>

                <div v-if="skipValue5 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,5,a)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,5,a,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,5,a,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,5,a,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,5,a,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,5,a,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,5,a,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,5,a,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,5,a,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>


          </b-row>


        </b-col>

        <!-- END of SIDE A status screen -->



        <!-- SIDE B -->

        <b-col lg="10" style="background-color:#fafafa; font-weight: bold;" id="sideBdiv" v-show="!sideBdiv">
          <b-row>
            <!-- <b-col><p class="sideHeading">SIDE A</p></b-col> -->
            <b-col>
              <b-button variant="outline-info" v-on:click="sideAdiv = !sideAdiv; sideBdiv = !sideBdiv;" size="lg">SIDE A</b-button>
            </b-col>
            <b-col><p class="sideHeading">SIDE B</p></b-col>
            <b-col>
              <b-button :pressed="true" variant="info" v-on:click="sideAdiv = !sideAdiv; sideBdiv = !sideBdiv;" size="lg">SIDE B</b-button>
            </b-col>
          </b-row>


          <b-row>

            <!-- starting div for room 1 and room 6 -->
            <!-- <b-col class="border border-dark" v-bind:class="[gameStatusByColor ? 'greenStatus' : 'playingStatus']"> -->
            <b-col class="border border-dark" v-bind:class="room6StatusColor">

                <div style="background-color: room6StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room6game}} </p>
                      <p class="teamNameText"> {{room6status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room6currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room6teamname}} </p> -->
                  <p class="teamNameText" v-if="room6teamname.length > 15" style="font-size: 1.1em;"> {{room6teamname}}</p>
                  <p v-else class="teamNameText"> {{room6teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room6teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room6timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room6bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room6SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,6), teamRoomNumber = 6">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,6), teamRoomNumber = 6">RESET</b-button>
                </div>

                <div v-if="skipValue6 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,6,b)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,6,b,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,6,b,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,6,b,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,6,b,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,6,b,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,6,b,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,6,b,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,6,b,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>
            <!-- end b-col and div for room 1 and room 6 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room7StatusColor">

                <div style="background-color: room7StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room7game}} </p>
                      <p class="teamNameText"> {{room7status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room7currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room7teamname}} </p> -->
                  <p class="teamNameText" v-if="room7teamname.length > 15" style="font-size: 1.1em;"> {{room7teamname}}</p>
                  <p v-else class="teamNameText"> {{room7teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room7teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room7timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room7bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room7SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,7), teamRoomNumber = 7">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,7), teamRoomNumber = 7">RESET</b-button>
                </div>

                <div v-if="skipValue7 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,7,b)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,7,b,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,7,b,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,7,b,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,7,b,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,7,b,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,7,b,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,7,b,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,7,b,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>
            <!-- ending div for room 2 and room 7 -->

            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room8StatusColor">

                <div style="background-color: room8StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room8game}} </p>
                      <p class="teamNameText"> {{room8status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room8currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room8teamname}} </p> -->
                  <p class="teamNameText" v-if="room8teamname.length > 15" style="font-size: 1.1em;"> {{room8teamname}}</p>
                  <p v-else class="teamNameText"> {{room8teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room8teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room8timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room8bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room8SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,8), teamRoomNumber = 8">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,8), teamRoomNumber = 8">RESET</b-button>
                </div>

                <div v-if="skipValue8 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,8,b)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,8,b,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,8,b,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,8,b,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,8,b,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,8,b,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,8,b,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,8,b,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,8,b,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>
            <!-- ending div for room 2 and room 7 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room9StatusColor">

                <div style="background-color: room9StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room9game}} </p>
                      <p class="teamNameText"> {{room9status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room9currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room9teamname}} </p> -->
                  <p class="teamNameText" v-if="room9teamname.length > 15" style="font-size: 1.1em;"> {{room9teamname}}</p>
                  <p v-else class="teamNameText"> {{room9teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room9teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room9timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room9bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room9SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,9), teamRoomNumber = 9">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,9), teamRoomNumber = 9">RESET</b-button>
                </div>

                <div v-if="skipValue9 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,9,b)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,9,b,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,9,b,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,9,b,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,9,b,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,9,b,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,9,b,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,9,b,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,9,b,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>
            <!-- ending div for room 2 and room 7 -->


            <!-- starting b-col and div for room 2 and room 7 -->
            <b-col class="border border-dark" v-bind:class="room10StatusColor">

                <div style="background-color: room10StatusTextColor;">
                  <b-row>
                    <b-col>
                      <p class="roomNameTop"> {{room10game}} </p>
                      <p class="teamNameText"> {{room10status}} </p>
                    </b-col>
                  </b-row>
                </div>

                <br/>

                <div style="background-color: black; height: 7%;">
                  <h2 class="bombTimeText"> {{room10currenttime}} </h2>
                </div>

                <br/>

                <div>
                  <!-- <p class="teamNameText"> {{room10teamname}} </p> -->
                  <p class="teamNameText" v-if="room10teamname.length > 15" style="font-size: 1.1em;"> {{room10teamname}}</p>
                  <p v-else class="teamNameText"> {{room10teamname}}</p>
                </div>

                <div>
                  <p class="sizeAndTimeDetail"> TEAM SIZE : {{room10teamsize}} </p>
                  <p class="sizeAndTimeDetail"> ROOM SCORE : {{room10timeearned}} </p>
                  <p class="sizeAndTimeDetail"> TOTAL SCORE : {{room10bombtime}} </p>
                  <!-- <p class="sizeAndTimeDetail"> TIME FROM ROOM  {{room1timeearned}} </p> -->
                  <!-- <p class="sizeAndTimeDetail"> BOMB TIME  {{room1bombtime}} </p> -->
                  <p class="sizeAndTimeDetail"> SESSION ID : {{room10SessionId}} </p>
                  <!-- <p class="sizeAndTimeDetail"> RFID TAG : {{room1SessionId}} </p> -->
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="primary" @click="startTeam(event,10), teamRoomNumber = 10">START</b-button>
                </div>

                <div v-if="startReset == '1'">
                  <b-button block variant="danger" class="resetButton" @click="resetTeam(event,10), teamRoomNumber = 10">RESET</b-button>
                </div>

                <div v-if="skipValue10 == '1'">
                  <b-button block variant="warning" class="resetButton" @click="skipInstruction($event,10,b)">Skip</b-button>
                </div>

                <b-row v-if="editTime == '1'">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,10,b,-60)">-01:00</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,10,b,-30)">-00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,10,b,30)">+00:30</b-button></b-col>
                </b-row>
                <b-row v-if="editTime == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editTimeForTeam($event,10,b,60)">+01:00</b-button></b-col>
                </b-row>

                <br>

                <b-row v-if="editScore == '1'">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,10,b,-10)">-10</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,10,b,-1)">-1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,10,b,1)">+1</b-button></b-col>
                </b-row>

                <b-row v-if="editScore == '1'" class="editTimeMargin">
                  <b-col><b-button block variant="primary" @click="editScoreForTeam($event,10,b,10)">+10</b-button></b-col>
                </b-row>

                <br/>

            </b-col>



          </b-row>
        </b-col>



        <!-- END OF SIDE B -->

      </b-row>
        <br/>
        <b-row v-if="backButton == 0">
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col><b-button block variant="info" @click="backButton = 1, editTime = 1 ,startReset = 0">Room Time</b-button></b-col>
            <b-col><b-button block variant="info" @click="backButton = 1, editScore = 1, startReset = 0">Edit Score</b-button></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>

          <b-row v-else>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col><b-button block variant="info" @click="backButton = 0, editTime = 0, editScore = 0, startReset = 1">Back</b-button></b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col></b-col>
          </b-row>

    </div>

    

    <br/>
    <br/>

        <div class="bv-example-row" style="width:80%;margin:auto; background-color: #fafafa;font-weight:bold; font-size: 0.94em;">

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

<script src="moment.js"></script>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import VueMqtt from 'vue-mqtt';
// Vue.use(VueMqtt, 'ws://20.17.0.5:1883/', options);
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },

  data(){
    return{

      backButton: 0,
      editTime: 0, /** this will define div to display and hide for editTime **/
      editScore: 0,

      skipValue1: 0,
      skipValue2: 0,
      skipValue3: 0,
      skipValue4: 0,
      skipValue5: 0,
      skipValue6: 0,
      skipValue7: 0,
      skipValue8: 0,
      skipValue9: 0,
      skipValue10: 0,

      startReset: 1,

      resetRoomName: '', /** this will display room name while resetting **/

      rfidTagForTeam: 0,
      teamSessionId: 0,
      teamRoomNumber: 0,
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

      room6status: null,
      room6StatusColor: '',
      room6StatusTextColor: '',

      room7status: null,
      room7StatusColor: '',
      room7StatusTextColor: '',

      room8status: null,
      room8StatusColor: '',
      room8StatusTextColor: '',

      room9status: null,
      room9StatusColor: '',
      room9StatusTextColor: '',

      room10status: null,
      room10StatusColor: '',
      room10StatusTextColor: '',

      room1game: '',
      room2game: '',
      room3game: '',
      room4game: '',
      room5game: '',
      room6game: '',
      room7game: '',
      room8game: '',
      room9game: '',
      room10game: '',

      room1teamsize: '',
      room2teamsize: '',
      room3teamsize: '',
      room4teamsize: '',
      room5teamsize: '',
      room6teamsize: '',
      room7teamsize: '',
      room8teamsize: '',
      room9teamsize: '',
      room10teamsize: '',

      room1SessionId:'',
      room2SessionId:'',
      room3SessionId:'',
      room4SessionId:'',
      room5SessionId:'',
      room6SessionId:'',
      room7SessionId:'',
      room8SessionId:'',
      room9SessionId:'',
      room10SessionId:'',

      room1GameId:'',
      room2GameId:'',
      room3GameId:'',
      room4GameId:'',
      room5GameId:'',
      room6GameId:'',
      room7GameId:'',
      room8GameId:'',
      room9GameId:'',
      room10GameId:'',

      room1teamname: '',
      room2teamname: '',
      room3teamname: '',
      room4teamname: '',
      room5teamname: '',
      room6teamname: '',
      room7teamname: '',
      room8teamname: '',
      room9teamname: '',
      room10teamname: '',

      room1bombtime: 0,
      room2bombtime: 0,
      room3bombtime: 0,
      room4bombtime: 0,
      room5bombtime: 0,
      room6bombtime: 0,
      room7bombtime: 0,
      room8bombtime: 0,
      room9bombtime: 0,
      room10bombtime: 0,

      room1timeearned: '',
      room2timeearned: '',
      room3timeearned: '',
      room4timeearned: '',
      room5timeearned: '',
      room6timeearned: '',
      room7timeearned: '',
      room8timeearned: '',
      room9timeearned: '',
      room10timeearned: '',

      room1currenttime: '',
      room2currenttime: '',
      room3currenttime: '',
      room4currenttime: '',
      room5currenttime: '',
      room6currenttime: '',
      room7currenttime: '',
      room8currenttime: '',
      room9currenttime: '',
      room10currenttime: '',


      sideAdiv: true,
      sideBdiv:true,

      teamList: [],

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

    startTeam(event,room){

      console.log('team start on room '+ room);

      this.$root.$emit('bv::show::modal', 'modal-startTeam', '#btnShow');

    },

    resetTeam(event, room){
      console.log(this['room'+room+'game']);
      this.resetRoomName = this['room'+room+'game'];
      this.$root.$emit('bv::show::modal', 'modal-resetTeam', '#btnShow');
    },

    confirmedResetTeam(){

      console.log('room number '+this.teamRoomNumber);
      var roomId = this.teamRoomNumber;
      var mqtt = require('mqtt');
      var client  = mqtt.connect('ws://20.17.0.5:8083/');
      console.log(client);
      var vm = this;
      client.publish('server/commands', '{"command":"reset", "route_status_id":"'+roomId+'"}');

      this['skipValue'+roomId] = 0; /** hides the skip button **/

      this.$root.$emit('bv::hide::modal', 'modal-resetTeam', '#btnShow');
    },

    hideResetModal(){
      this.$root.$emit('bv::hide::modal', 'modal-resetTeam', '#btnShow');
    },

    clickedTeamName(){
      console.log("room number "+this.teamRoomNumber);
      console.log("session id of team "+this.teamSessionId);

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+this.teamSessionId,{

      })
      .then(response => 
      {
        console.log(response);
        console.log(response.data);

        this.rfidTagForTeam = response.data.Team_player_sessions[0].Rfid.tag;
        var rfidTagUsed =response.data.Team_player_sessions[0].Rfid.tag;
        var roomId = this.teamRoomNumber;

        var mqtt = require('mqtt');
        var client  = mqtt.connect('ws://20.17.0.5:8083/');
        console.log(client);
        var vm = this;
        client.publish('server/commands', '{"command":"tap", "route":"a", "route_status_id":"'+roomId+'", "rfid_tag": "'+rfidTagUsed+'"}'); /** route_status_id is room number **/

        // this.skipValue = 1; /** 1 will make the SKIP BUTTON to be displayed **/

        this['skipValue'+roomId] = 1;

        this.$root.$emit('bv::hide::modal', 'modal-startTeam', '#btnShow');

      })
      .catch(function (error){
        console.log(error);
      });
    },

    editTimeForTeam(event,roomId,side,timeValue){
      console.log(event);
      console.log('room number '+roomId);
      console.log('side '+side);
      console.log('time value '+timeValue);
      console.log(this['room'+roomId+'SessionId']);

      var teamSessionId = this['room'+roomId+'SessionId'];
      var mqtt = require('mqtt');
      var client  = mqtt.connect('ws://20.17.0.5:8083/');
      console.log(client);
      var vm = this;
      client.publish('server/commands', '{"command":"change_room_time",  "route_status_id":"'+roomId+'", "route":"'+side+'", "room":"'+roomId+'", "seconds": "'+timeValue+'"}');

    },

    editScoreForTeam(event,roomId,side,scoreValue){
      console.log(event);
      console.log('room number '+roomId);
      console.log('side '+side);
      console.log('score value '+scoreValue);
      console.log(this['room'+roomId+'SessionId']);

      var teamGameId = this['room'+roomId+'GameId'];
      var teamSessionId = this['room'+roomId+'SessionId'];
      var mqtt = require('mqtt');
      var client  = mqtt.connect('ws://20.17.0.5:8083/');
      console.log(client);
      var vm = this;
      client.publish('server/commands', '{"command":"add_score", "route_status_id":"'+roomId+'", "game_id":"'+teamGameId+'", "session_id":"'+teamSessionId+'","route":"'+side+'", "room":"'+roomId+'", "score": "'+scoreValue+'"}');

    },

    skipInstruction($event,roomId,side){
      var teamSessionId = this['room'+roomId+'SessionId'];
      var mqtt = require('mqtt');
      var client  = mqtt.connect('ws://20.17.0.5:8083/');
      console.log(client);
      var vm = this;
      client.publish('server/commands', '{"command":"skip_instructions",  "route_status_id":"'+roomId+'", "route":"'+side+'", "room":"'+roomId+'"}');
      this['skipValue'+roomId] = 0;
    },

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

      console.log(client);

      var vm = this; /** vm is now variable as this which will pass on the value **/
      // var pl = playSound;

      client.on('connect', function () {

        client.subscribe('route_status', function (err) {

          console.log('san1');

          if (!err) {
            client.publish('presence', 'Message from Sandesh Vue App')
          }
        })
      })

      client.on('message', function (topic, message) {

        console.log('san3');

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
            vm.room6status = x.statusResult[5].Room_status.name;
            vm.room7status = x.statusResult[6].Room_status.name;
            vm.room8status = x.statusResult[7].Room_status.name;
            vm.room9status = x.statusResult[8].Room_status.name;
            vm.room10status = x.statusResult[9].Room_status.name;


            vm.room1game = x.statusResult[0].Game.name;
            vm.room2game = x.statusResult[1].Game.name;
            vm.room3game = x.statusResult[2].Game.name;
            vm.room4game = x.statusResult[3].Game.name;
            vm.room5game = x.statusResult[4].Game.name;
            vm.room6game = x.statusResult[5].Game.name;
            vm.room7game = x.statusResult[6].Game.name;
            vm.room8game = x.statusResult[7].Game.name;
            vm.room9game = x.statusResult[8].Game.name;
            vm.room10game = x.statusResult[9].Game.name;


            vm.room1teamsize = x.statusResult[0].Session.player_count;
            vm.room2teamsize = x.statusResult[1].Session.player_count;
            vm.room3teamsize = x.statusResult[2].Session.player_count;
            vm.room4teamsize = x.statusResult[3].Session.player_count;
            vm.room5teamsize = x.statusResult[4].Session.player_count;
            vm.room6teamsize = x.statusResult[5].Session.player_count;
            vm.room7teamsize = x.statusResult[6].Session.player_count;
            vm.room8teamsize = x.statusResult[7].Session.player_count;
            vm.room9teamsize = x.statusResult[8].Session.player_count;
            vm.room10teamsize = x.statusResult[9].Session.player_count;

            vm.room1SessionId = x.statusResult[0].Session.id;
            vm.room2SessionId = x.statusResult[1].Session.id;
            vm.room3SessionId = x.statusResult[2].Session.id;
            vm.room4SessionId = x.statusResult[3].Session.id;
            vm.room5SessionId = x.statusResult[4].Session.id;
            vm.room6SessionId = x.statusResult[5].Session.id;
            vm.room7SessionId = x.statusResult[6].Session.id;
            vm.room8SessionId = x.statusResult[7].Session.id;
            vm.room9SessionId = x.statusResult[8].Session.id;
            vm.room10SessionId = x.statusResult[9].Session.id;

            vm.room1GameId = x.statusResult[0].Game.id;
            vm.room2GameId = x.statusResult[1].Game.id;
            vm.room3GameId = x.statusResult[2].Game.id;
            vm.room4GameId = x.statusResult[3].Game.id;
            vm.room5GameId = x.statusResult[4].Game.id;
            vm.room6GameId = x.statusResult[5].Game.id;
            vm.room7GameId = x.statusResult[6].Game.id;
            vm.room8GameId = x.statusResult[7].Game.id;
            vm.room9GameId = x.statusResult[8].Game.id;
            vm.room10GameId = x.statusResult[9].Game.id;

            vm.room1teamname = x.statusResult[0].Session.Team.name;
            vm.room2teamname = x.statusResult[1].Session.Team.name;
            vm.room3teamname = x.statusResult[2].Session.Team.name;
            vm.room4teamname = x.statusResult[3].Session.Team.name;
            vm.room5teamname = x.statusResult[4].Session.Team.name;
            vm.room6teamname = x.statusResult[5].Session.Team.name;
            vm.room7teamname = x.statusResult[6].Session.Team.name;
            vm.room8teamname = x.statusResult[7].Session.Team.name;
            vm.room9teamname = x.statusResult[8].Session.Team.name;
            vm.room10teamname = x.statusResult[9].Session.Team.name;



          /** time earned for each room **/
            var convertroom1timeearned = x.statusResult[0].Session_game_score.score;
            vm.room1timeearned = moment().startOf('day').seconds(convertroom1timeearned).format("mm:ss");

            var convertroom2timeearned = x.statusResult[1].Session_game_score.score;
            vm.room2timeearned = moment().startOf('day').seconds(convertroom2timeearned).format("mm:ss");

            var convertroom3timeearned = x.statusResult[2].Session_game_score.score;
            vm.room3timeearned = moment().startOf('day').seconds(convertroom3timeearned).format("mm:ss");

            var convertroom4timeearned = x.statusResult[3].Session_game_score.score;
            vm.room4timeearned = moment().startOf('day').seconds(convertroom4timeearned).format("mm:ss");

            var convertroom5timeearned = x.statusResult[4].Session_game_score.score;
            vm.room5timeearned = moment().startOf('day').seconds(convertroom5timeearned).format("mm:ss");

            var convertroom6timeearned = x.statusResult[5].Session_game_score.score;
            vm.room6timeearned = moment().startOf('day').seconds(convertroom6timeearned).format("mm:ss");

            var convertroom7timeearned = x.statusResult[6].Session_game_score.score;
            vm.room7timeearned = moment().startOf('day').seconds(convertroom7timeearned).format("mm:ss");

            var convertroom8timeearned = x.statusResult[7].Session_game_score.score;
            vm.room8timeearned = moment().startOf('day').seconds(convertroom8timeearned).format("mm:ss");

            var convertroom9timeearned = x.statusResult[8].Session_game_score.score;
            vm.room9timeearned = moment().startOf('day').seconds(convertroom9timeearned).format("mm:ss");

            var convertroom10timeearned = x.statusResult[9].Session_game_score.score;
            vm.room10timeearned = moment().startOf('day').seconds(convertroom10timeearned).format("mm:ss");

          /** END of time earned for each room **/


          /** bomb room time **/
            var convertroom1bombtime = x.statusResult[0].Session.bomb_time;
            // vm.room1bombtime = moment().startOf('day').seconds(convertroom1bombtime).format("mm:ss"); 
            /** this is the line that throws an error and make the white background for CONTROL PANEL **/

            if(convertroom1bombtime > 0){
              vm.room1bombtime = moment().startOf('day').seconds(convertroom1bombtime).format("mm:ss");
            }
            else{
              vm.room1bombtime = 0;
            }

            var convertroom2bombtime = x.statusResult[1].Session.bomb_time;
            vm.room2bombtime = moment().startOf('day').seconds(convertroom2bombtime).format("mm:ss");

            var convertroom3bombtime = x.statusResult[2].Session.bomb_time;
            vm.room3bombtime = moment().startOf('day').seconds(convertroom3bombtime).format("mm:ss");

            var convertroom4bombtime = x.statusResult[3].Session.bomb_time;
            vm.room4bombtime = moment().startOf('day').seconds(convertroom4bombtime).format("mm:ss");

            var convertroom5bombtime = x.statusResult[4].Session.bomb_time;
            vm.room5bombtime = moment().startOf('day').seconds(convertroom5bombtime).format("mm:ss");


            var convertroom6bombtime = x.statusResult[5].Session.bomb_time;
            vm.room6bombtime = moment().startOf('day').seconds(convertroom6bombtime).format("mm:ss");

            var convertroom7bombtime = x.statusResult[6].Session.bomb_time;
            vm.room7bombtime = moment().startOf('day').seconds(convertroom7bombtime).format("mm:ss");

            var convertroom8bombtime = x.statusResult[7].Session.bomb_time;
            vm.room8bombtime = moment().startOf('day').seconds(convertroom8bombtime).format("mm:ss");

            var convertroom9bombtime = x.statusResult[8].Session.bomb_time;
            vm.room9bombtime = moment().startOf('day').seconds(convertroom9bombtime).format("mm:ss");

            var convertroom10bombtime = x.statusResult[9].Session.bomb_time;
            vm.room10bombtime = moment().startOf('day').seconds(convertroom10bombtime).format("mm:ss");

          /** end of bomb room time **/


          /** current room time **/
            var room1gameendtime = x.statusResult[0].game_end;
            var room1gameendtimeminute = moment(room1gameendtime).format("mm");
            var room1gameendtimesecond = moment(room1gameendtime).format("ss");
            var convertMinute1ToSeconds = room1gameendtimeminute*60;

            console.log(room1gameendtimeminute);
            console.log(room1gameendtimesecond);
            console.log(convertMinute1ToSeconds);

            var gameendtime1 = Number(convertMinute1ToSeconds)+Number(room1gameendtimesecond);

            console.log(gameendtime1);

            var currentMinute = moment().format("mm");
            console.log(currentMinute);
            var currentSeconds = moment().format("ss");
            console.log(currentSeconds);
            var currentMinuteToSeconds = Number(currentMinute)*60;
            console.log(currentMinuteToSeconds);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);

            var currentRoom1Time = gameendtime1-currentTimeValue;
            console.log(currentRoom1Time);

            if(vm.room1status == 'Ready'){
              vm.room1currenttime = '00:00';
            }

            if(vm.room1status == 'Released'){
              vm.room1currenttime = '00:00';
            }

            if(vm.room1status == 'Instructions Playing'){
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

            var gameendtime2 = Number(convertMinute2ToSeconds)+Number(room2gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime2);

            var currentRoom2Time = gameendtime2-currentTimeValue;
            console.log(currentRoom2Time);

            if(vm.room2status == 'Ready'){
              vm.room2currenttime = '00:00';
              console.log('ROOM 2 READY');
            }

            if(vm.room2status == 'Released'){
              vm.room2currenttime = '00:00';
              console.log('ROOM 2 Released');
            }

            if(vm.room2status == 'Instructions Playing'){
              vm.room2currenttime = '10:00';
              console.log('ROOM 2 Instructions Playing');
            }

            if(vm.room2status == 'Waiting'){
              vm.room2currenttime = '00:00';
              console.log('ROOM 2 Waiting');
            }

            if(vm.room2status == 'Trouble'){
              console.log('ROOM 2 Triuble');
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

                console.log("INSIDE ROOM 2");
                console.log('ROOM 2 Playing 2');

              }
              else{
                console.log('ROOM 2 Playing 3');
                vm.room2currenttime = '00:00';
              }

            }
            /** END OF ROOM 2 **/


            /** ROOM 3 **/

            var room3gameendtime = x.statusResult[2].game_end;
            var room3gameendtimeminute = moment(room3gameendtime).format("mm");
            var room3gameendtimesecond = moment(room3gameendtime).format("ss");
            var convertMinute3ToSeconds = room3gameendtimeminute*60;

            var gameendtime3 = Number(convertMinute3ToSeconds)+Number(room3gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime3);

            var currentRoom3Time = gameendtime3-currentTimeValue;
            console.log(currentRoom3Time);

            if(vm.room3status == 'Ready'){
              vm.room3currenttime = '00:00';
            }

            if(vm.room3status == 'Released'){
              vm.room3currenttime = '00:00';
            }

            if(vm.room3status == 'Instructions Playing'){
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

            var gameendtime4 = Number(convertMinute4ToSeconds)+Number(room4gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime4);

            var currentRoom4Time = gameendtime4-currentTimeValue;
            console.log(currentRoom4Time);

            if(vm.room4status == 'Ready'){
              vm.room4currenttime = '00:00';
            }

            if(vm.room4status == 'Released'){
              vm.room4currenttime = '00:00';
            }

            if(vm.room4status == 'Instructions Playing'){
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

            var gameendtime5 = Number(convertMinute5ToSeconds)+Number(room5gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime5);

            var currentRoom5Time = gameendtime5-currentTimeValue;
            console.log(currentRoom5Time);

            if(vm.room5status == 'Ready'){
              vm.room5currenttime = '00:00';
            }

            if(vm.room5status == 'Released'){
              vm.room5currenttime = '00:00';
            }

            if(vm.room5status == 'Instructions Playing'){
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


            /** ROOM 6 **/

            var room6gameendtime = x.statusResult[5].game_end;
            var room6gameendtimeminute = moment(room6gameendtime).format("mm");
            var room6gameendtimesecond = moment(room6gameendtime).format("ss");
            var convertMinute6ToSeconds = room6gameendtimeminute*60;

            var gameendtime6 = Number(convertMinute6ToSeconds)+Number(room6gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime6);

            var currentRoom6Time = gameendtime6-currentTimeValue;
            console.log(currentRoom6Time);
            console.log("SIDE B ROOM 1 time above");

            if(vm.room6status == 'Ready'){
              vm.room6currenttime = '00:00';
            }

            if(vm.room6status == 'Released'){
              vm.room6currenttime = '00:00';
            }

            if(vm.room6status == 'Instructions Playing'){
              vm.room6currenttime = '10:00';
            }

            if(vm.room6status == 'Waiting'){
              vm.room6currenttime = '00:00';
            }

            if(vm.room6status == 'Trouble'){

              if(currentRoom6Time > '0'){
                vm.room6currenttime = moment().startOf('day').seconds(currentRoom6Time).format("mm:ss");
              }
              else{
                vm.room6currenttime = '00:00';
              }

            }

            if(vm.room6status == 'Playing'){

              if(currentRoom6Time > '0'){
                vm.room6currenttime = moment().startOf('day').seconds(currentRoom6Time).format("mm:ss");
              }
              else{
                vm.room6currenttime = '00:00';
              }

            }
            /** END OF ROOM 6 **/


            /** ROOM 7 **/

            var room7gameendtime = x.statusResult[6].game_end;
            var room7gameendtimeminute = moment(room7gameendtime).format("mm");
            var room7gameendtimesecond = moment(room7gameendtime).format("ss");
            var convertMinute7ToSeconds = room7gameendtimeminute*60;

            var gameendtime7 = Number(convertMinute7ToSeconds)+Number(room7gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime7);

            var currentRoom7Time = gameendtime7-currentTimeValue;
            console.log(currentRoom7Time);

            if(vm.room7status == 'Ready'){
              vm.room7currenttime = '00:00';
            }

            if(vm.room7status == 'Released'){
              vm.room7currenttime = '00:00';
            }

            if(vm.room7status == 'Instructions Playing'){
              vm.room7currenttime = '10:00';
            }

            if(vm.room7status == 'Waiting'){
              vm.room7currenttime = '00:00';
            }

            if(vm.room7status == 'Trouble'){

              if(currentRoom7Time > '0'){
                vm.room7currenttime = moment().startOf('day').seconds(currentRoom7Time).format("mm:ss");
              }
              else{
                vm.room7currenttime = '00:00';
              }

            }

            if(vm.room7status == 'Playing'){

              // console.log('ROOM 3 Playing 1');
              // var playSound = 'http://soundbible.com/mp3/Air%20Plane%20Ding-SoundBible.com-496729130.mp3';
              // console.log(playSound);
              // pl.play();

              if(currentRoom7Time > '0'){
                vm.room7currenttime = moment().startOf('day').seconds(currentRoom7Time).format("mm:ss");

              }
              else{
                vm.room7currenttime = '00:00';
              }

            }
            /** END OF ROOM 7 **/


            /** ROOM 8 **/

            var room8gameendtime = x.statusResult[7].game_end;
            var room8gameendtimeminute = moment(room8gameendtime).format("mm");
            var room8gameendtimesecond = moment(room8gameendtime).format("ss");
            var convertMinute8ToSeconds = room8gameendtimeminute*60;

            var gameendtime8 = Number(convertMinute8ToSeconds)+Number(room8gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime8);

            var currentRoom8Time = gameendtime8-currentTimeValue;
            console.log(currentRoom8Time);

            if(vm.room8status == 'Ready'){
              vm.room8currenttime = '00:00';
            }

            if(vm.room8status == 'Released'){
              vm.room8currenttime = '00:00';
            }

            if(vm.room8status == 'Instructions Playing'){
              vm.room8currenttime = '10:00';
            }

            if(vm.room8status == 'Waiting'){
              vm.room8currenttime = '00:00';
            }

            if(vm.room8status == 'Trouble'){

              if(currentRoom8Time > '0'){
                vm.room8currenttime = moment().startOf('day').seconds(currentRoom8Time).format("mm:ss");
              }
              else{
                vm.room8currenttime = '00:00';
              }

            }

            if(vm.room8status == 'Playing'){

              if(currentRoom8Time > '0'){
                vm.room8currenttime = moment().startOf('day').seconds(currentRoom8Time).format("mm:ss");
              }
              else{
                vm.room8currenttime = '00:00';
              }

            }
            /** END OF ROOM 8 **/

            /** ROOM 9 **/

            var room9gameendtime = x.statusResult[8].game_end;
            var room9gameendtimeminute = moment(room9gameendtime).format("mm");
            var room9gameendtimesecond = moment(room9gameendtime).format("ss");
            var convertMinute9ToSeconds = room9gameendtimeminute*60;

            var gameendtime9 = Number(convertMinute9ToSeconds)+Number(room9gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime9);

            var currentRoom9Time = gameendtime9-currentTimeValue;
            console.log(currentRoom9Time);

            if(vm.room9status == 'Ready'){
              vm.room9currenttime = '00:00';
            }

            if(vm.room9status == 'Released'){
              vm.room9currenttime = '00:00';
            }

            if(vm.room9status == 'Instructions Playing'){
              vm.room9currenttime = '10:00';
            }

            if(vm.room9status == 'Waiting'){
              vm.room9currenttime = '00:00';
            }

            if(vm.room9status == 'Trouble'){

              if(currentRoom9Time > '0'){
                vm.room9currenttime = moment().startOf('day').seconds(currentRoom9Time).format("mm:ss");
              }
              else{
                vm.room9currenttime = '00:00';
              }

            }

            if(vm.room9status == 'Playing'){

              if(currentRoom9Time > '0'){
                vm.room9currenttime = moment().startOf('day').seconds(currentRoom9Time).format("mm:ss");
              }
              else{
                vm.room9currenttime = '00:00';
              }

            }
            /** END OF ROOM 9 **/
              
            
            /** ROOM 10 **/

            var room10gameendtime = x.statusResult[9].game_end;
            var room10gameendtimeminute = moment(room10gameendtime).format("mm");
            var room10gameendtimesecond = moment(room10gameendtime).format("ss");
            var convertMinute10ToSeconds = room10gameendtimeminute*60;

            var gameendtime10 = Number(convertMinute10ToSeconds)+Number(room10gameendtimesecond);

            var currentTimeValue = Number(currentMinuteToSeconds)+Number(currentSeconds);
            
            console.log(currentTimeValue);
            console.log(gameendtime10);

            var currentRoom10Time = gameendtime10-currentTimeValue;
            console.log(currentRoom10Time);

            if(vm.room10status == 'Ready'){
              vm.room10currenttime = '00:00';
            }

            if(vm.room10status == 'Released'){
              vm.room10currenttime = '00:00';
            }

            if(vm.room10status == 'Instructions Playing'){
              vm.room10currenttime = '10:00';
            }

            if(vm.room10status == 'Waiting'){
              vm.room10currenttime = '00:00';
            }

            if(vm.room10status == 'Trouble'){

              if(currentRoom10Time > '0'){
                vm.room10currenttime = moment().startOf('day').seconds(currentRoom10Time).format("mm:ss");
              }
              else{
                vm.room10currenttime = '00:00';
              }

            }

            if(vm.room10status == 'Playing'){

              if(currentRoom10Time > '0'){
                vm.room10currenttime = moment().startOf('day').seconds(currentRoom10Time).format("mm:ss");
              }
              else{
                vm.room10currenttime = '00:00';
              }

            }
            /** END OF ROOM 10 **/
            
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
                  vm.room1StatusColor = 'greenStatus';
                  vm.room1StatusTextColor = 'greenStatusText';
                }

                if(vm.room1status == 'Instructions Playing'){
                  vm.room1StatusColor = 'playingStatus';
                  vm.room1StatusTextColor = 'blueStatusText';
                }

                if(vm.room1status == 'Playing'){
                  vm.room1StatusColor = 'playingStatus';
                  vm.room1StatusTextColor = 'blueStatusText';
                }

                if(vm.room1status == 'Waiting'){
                  vm.room1StatusColor = 'yellowStatus';
                  vm.room1StatusTextColor = 'yellowStatusText';
                }

                if(vm.room1status == 'Released'){
                  vm.room1StatusColor = 'greenStatus';
                  vm.room1StatusTextColor = 'greenStatusText';
                }

                if(vm.room1status == 'Trouble'){
                  vm.room1StatusColor = 'pinkStatus';
                  vm.room1StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 1 **/

              /** ROOM 2 **/
                if(vm.room2status == 'Ready'){
                  vm.room2StatusColor = 'greenStatus';
                  vm.room2StatusTextColor = 'greenStatusText';
                }

                if(vm.room2status == 'Instructions Playing'){
                  vm.room2StatusColor = 'playingStatus';
                  vm.room2StatusTextColor = 'blueStatusText';
                }

                if(vm.room2status == 'Playing'){
                  vm.room2StatusColor = 'playingStatus';
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

                if(vm.room3status == 'Instructions Playing'){
                  vm.room3StatusColor = 'playingStatus';
                  vm.room3StatusTextColor = 'blueStatusText';
                }

                if(vm.room3status == 'Playing'){
                  vm.room3StatusColor = 'playingStatus';
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

                if(vm.room4status == 'Instructions Playing'){
                  vm.room4StatusColor = 'playingStatus';
                  vm.room4StatusTextColor = 'blueStatusText';
                }

                if(vm.room4status == 'Playing'){
                  vm.room4StatusColor = 'playingStatus';
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

                if(vm.room5status == 'Instructions Playing'){
                  vm.room5StatusColor = 'playingStatus';
                  vm.room5StatusTextColor = 'blueStatusText';
                }

                if(vm.room5status == 'Playing'){
                  vm.room5StatusColor = 'playingStatus';
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

              /** ROOM 6 **/
                if(vm.room6status == 'Ready'){
                  vm.room6StatusColor = 'greenStatus';
                  vm.room6StatusTextColor = 'greenStatusText';
                }

                if(vm.room6status == 'Instructions Playing'){
                  vm.room6StatusColor = 'playingStatus';
                  vm.room6StatusTextColor = 'blueStatusText';
                }

                if(vm.room6status == 'Playing'){
                  vm.room6StatusColor = 'playingStatus';
                  vm.room6StatusTextColor = 'blueStatusText';
                }

                if(vm.room6status == 'Waiting'){
                  vm.room6StatusColor = 'yellowStatus';
                  vm.room6StatusTextColor = 'yellowStatusText';
                }

                if(vm.room6status == 'Released'){
                  vm.room6StatusColor = 'greenStatus';
                  vm.room6StatusTextColor = 'greenStatusText';
                }

                if(vm.room6status == 'Trouble'){
                  vm.room6StatusColor = 'pinkStatus';
                  vm.room6StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 6 **/

              /** ROOM 7 **/
                if(vm.room7status == 'Ready'){
                  vm.room7StatusColor = 'greenStatus';
                  vm.room7StatusTextColor = 'greenStatusText';
                }

                if(vm.room7status == 'Instructions Playing'){
                  vm.room7StatusColor = 'playingStatus';
                  vm.room7StatusTextColor = 'blueStatusText';
                }

                if(vm.room7status == 'Playing'){
                  vm.room7StatusColor = 'playingStatus';
                  vm.room7StatusTextColor = 'blueStatusText';
                }

                if(vm.room7status == 'Waiting'){
                  vm.room7StatusColor = 'yellowStatus';
                  vm.room7StatusTextColor = 'yellowStatusText';
                }

                if(vm.room7status == 'Released'){
                  vm.room7StatusColor = 'greenStatus';
                  vm.room7StatusTextColor = 'greenStatusText';
                }

                if(vm.room7status == 'Trouble'){
                  vm.room7StatusColor = 'pinkStatus';
                  vm.room7StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 7 **/

              /** ROOM 8 **/
                if(vm.room8status == 'Ready'){
                  vm.room8StatusColor = 'greenStatus';
                  vm.room8StatusTextColor = 'greenStatusText';
                }

                if(vm.room8status == 'Instructions Playing'){
                  vm.room8StatusColor = 'playingStatus';
                  vm.room8StatusTextColor = 'blueStatusText';
                }

                if(vm.room8status == 'Playing'){
                  vm.room8StatusColor = 'playingStatus';
                  vm.room8StatusTextColor = 'blueStatusText';
                }

                if(vm.room8status == 'Waiting'){
                  vm.room8StatusColor = 'yellowStatus';
                  vm.room8StatusTextColor = 'yellowStatusText';
                }

                if(vm.room8status == 'Released'){
                  vm.room8StatusColor = 'greenStatus';
                  vm.room8StatusTextColor = 'greenStatusText';
                }

                if(vm.room8status == 'Trouble'){
                  vm.room8StatusColor = 'pinkStatus';
                  vm.room8StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 8 **/

              /** ROOM 9 **/
                if(vm.room9status == 'Ready'){
                  vm.room9StatusColor = 'greenStatus';
                  vm.room9StatusTextColor = 'greenStatusText';
                }

                if(vm.room9status == 'Instructions Playing'){
                  vm.room9StatusColor = 'playingStatus';
                  vm.room9StatusTextColor = 'blueStatusText';
                }

                if(vm.room9status == 'Playing'){
                  vm.room9StatusColor = 'playingStatus';
                  vm.room9StatusTextColor = 'blueStatusText';
                }

                if(vm.room9status == 'Waiting'){
                  vm.room9StatusColor = 'yellowStatus';
                  vm.room9StatusTextColor = 'yellowStatusText';
                }

                if(vm.room9status == 'Released'){
                  vm.room9StatusColor = 'greenStatus';
                  vm.room9StatusTextColor = 'greenStatusText';
                }

                if(vm.room9status == 'Trouble'){
                  vm.room9StatusColor = 'pinkStatus';
                  vm.room9StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 9 **/

              /** ROOM 10 **/
                if(vm.room10status == 'Ready'){
                  vm.room10StatusColor = 'greenStatus';
                  vm.room10StatusTextColor = 'greenStatusText';
                }

                if(vm.room10status == 'Instructions Playing'){
                  vm.room10StatusColor = 'playingStatus';
                  vm.room10StatusTextColor = 'blueStatusText';
                }

                if(vm.room10status == 'Playing'){
                  vm.room10StatusColor = 'playingStatus';
                  vm.room10StatusTextColor = 'blueStatusText';
                }

                if(vm.room10status == 'Waiting'){
                  vm.room10StatusColor = 'yellowStatus';
                  vm.room10StatusTextColor = 'yellowStatusText';
                }

                if(vm.room10status == 'Released'){
                  vm.room10StatusColor = 'greenStatus';
                  vm.room10StatusTextColor = 'greenStatusText';
                }

                if(vm.room10status == 'Trouble'){
                  vm.room10StatusColor = 'pinkStatus';
                  vm.room10StatusTextColor = 'pinkStatusText';
                }
              /** END OF ROOM 10 **/

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
    

    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/limit/20',{

      })
      .then(response => 
      {
        console.log(response);
        console.log(response.data);

        this.teamList = response.data;
      })
      .catch(function (error){
        console.log(error);
      });

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
  font-family: 'Pixel Digivolve Cyrillic', sans-serif;
}

.roomNameGame{
  font-size: 1.5em;
}

.roomGameStatus{
  font-size: 1em;
}

.sideHeading{
  font-weight: bold;
  font-size: 2em;
  font-family: 'Pixel Digivolve Cyrillic', sans-serif;
}

.bombTimeText{
  font-size: 2em;
  font-weight: bold;
  color: white;
  font-family: 'Pixel Digivolve Cyrillic', sans-serif;
}

.teamNameText{
  font-weight: bold;
  font-size: 1.5em;
  color: black;
  font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  text-align: left;
}

.roomNameTop{
  font-weight: bold;
  font-size: 1.4em;
  color: black;
  font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  text-align: left;
}

.sizeAndTimeDetail{
  font-weight: bold;
  font-size: 1.1em;
  color: black;
  font-family: 'Pixel Digivolve Cyrillic', sans-serif;
  text-align: left;
}

.greenStatus{
  background-color: #00ff89; 
  padding-top: 1%;
}

.pinkStatus{
  background-color: #FF1696; 
  padding-top: 1%;
}

.yellowStatus{
  background-color: #ffff00; 
  padding-top: 1%;
}

/** this is the BLUE STATUS background csss **/
.playingStatus{
  background-color: #0000FF;
  padding-top: 1%;
}
/** END of BLUE background css **/

.greenStatusText{
  color: #00ff89;
  font-weight: bold;
}

.pinkStatusText{
  color: #FF1696;
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

.gameLogo{
  width: 95%;
}

.sideBbutton{
  margin-left: 1%;
}

.resetButton{
  margin-top: 5%;
}

.editTimeMargin{
  margin-top: 2%;
}

</style>
