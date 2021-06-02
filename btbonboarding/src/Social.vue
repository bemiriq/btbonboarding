<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

  <b-modal id="modal-teamMedia" centered size="xl" v-bind:hide-footer="true">
    <br>
    <h5 align="center" style="text-transform: capitalize;">{{team_name}} {{teamMissionClicked}} {{teamPlayedDateTime}} </h5>
    <table class="table" style="text-transform:capitalize;">
      <tr style="font-weight:bold;">
        <td>Name</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Instagram</td>
        <td>Detail</td>
        <td>Date of birth</td>
        <td>Play Count</td>
        <!-- <td>Played Date</td> -->
        <!-- <td>Played Time</td> -->

      </tr>
      <tr v-for="item in clickedPeopleDetail" v-bind:key="item.id">
        <td>{{item.fullName}}</td>
        <td>{{item.email}}</td>
        <td>{{item.phone}}</td>
        <td>{{item.instagram}}</td>
        <td>{{item.minor}}</td>
        <td>{{item.date_of_birth}}</td>
        <td>
          <span v-if="item.play_count > '1'">R{{fetchlist1.player_repeaters}}</span>
          <span v-if="item.bomb_beater > '0'">&nbsp; &#128163;</span>
        </td>
        <!-- <td>{{item.date_played}}</td> -->
        <!-- <td>{{item.time_played_at}}</td> -->
      </tr>
    </table>
    <br>
    <h5 align="center" style="text-transform: capitalize;" v-if="teamMedia10.length > '0'">
      <a :href="(teamMedia10)" target="_blank">
        Photobomb Photos/Videos
      </a>
    </h5>
    <h5 align="center" style="text-transform: capitalize;" v-else>
        Photobomb Photos/Videos
    </h5>
    <table class="table">
      <!-- <tr>
        <td style="width:10%;">{{teamMedia0}}</td>
        <figure class="media"><iframe v-bind:src="(teamMedia0)"></iframe></figure>
      </tr> -->
      <tr>
        <td>
          <figure class="container media">
            <img v-bind:src="(teamMedia8)" style="height:100%;width:100%;">
          </figure>

          <!-- <button v-on:click="clickedDownload(teamMedia8)">Download Image</button> -->
        </td>

        <td>
          <figure class="container media">
            <img v-bind:src="(teamMedia3)" style="height:100%;width:100%;">
          </figure>

        </td>

        <td>
          <figure class="container media">
            <img v-bind:src="(teamMedia4)" style="height:100%;width:100%;">
          </figure>
        </td>
      </tr>

      <tr>
        <td>
          <figure class="container media">
            <img v-bind:src="(teamMedia5)" style="height:100%;width:100%;">
          </figure>
        </td>

        <td>
          <figure class="container media">
            <img v-bind:src="(teamMedia6)" style="height:100%;width:100%;">
          </figure>
        </td>

        <td>
          <figure class="container media">
            <img v-bind:src="(teamMedia7)" style="height:100%;width:100%;">
          </figure>
        </td>
      </tr>

      <tr>
        
        <td>
          <figure class="container media">
            <video style="height:100%;width:100%;" controls>
            <source :src="(teamMedia1)" type="video/mp4">
          </video>
          </figure>
        </td>

        <td>
          <figure class="container media">
            <video style="height:100%;width:100%;" controls>
            <source :src="(teamMedia9)" type="video/mp4">
          </video>
          </figure>
        </td>

        <td>
          <figure class="container media">
            <img v-bind:src="(teamMedia2)" style="height:100%;width:100%;">
          </figure>
        </td>
      </tr>

      <tr>
        <h5>
          <a :href="(teamMedia0)" target="_blank">Download Scoresheet</a>
        </h5>
      </tr>

     <!--  <tr>
        <td style="width:10%;">{{teamMedia4}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia5}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia6}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia7}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia8}}</td>
      </tr>
      <tr>
        <td style="width:10%;">{{teamMedia9}}</td>
      </tr> -->
    </table>
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
            <b-list-group-item href="/#/Social" active>Social Tagging</b-list-group-item>
            <!-- <b-list-group-item href="/#/Onboardingtest">Onboarding Test</b-list-group-item> -->
            <!-- <b-list-group-item href="/#/Print">Print Scoresheet</b-list-group-item> -->
          </b-list-group>

        </b-col>
        <!-- end of navigation menu on left side -->


        <!-- SIDE A status screen -->
        <!-- start of right div which consists of table with all details -->
        <!-- <b-col lg="10" style="background-color:#fafafa; font-weight: bold;" v-show="sideAdiv"> -->
          <b-col lg="10">
          <b-row>
            <b-col>
              <p class="teamTitle1">TEAM DETAILS</p>
          
          <!-- <button v-on:click="clickedDownload()">
            Download photo
          </button>

            <a href="https://homepages.cae.wisc.edu/~ece533/images/airplane.png" target="_blank" download> DOWNLOAD </a> -->

            </b-col>

          </b-row>
          <br>
          <b-row>
            <!-- <b-col lg="3">
              <b-input-group class="mb-1">
                <b-form-input id="example-input" v-model="dateClicked" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
                <b-input-group-append>
                  <b-form-datepicker v-model="dateClicked" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
                </b-input-group-append>
              </b-input-group>
            </b-col>

            <b-col lg="3">
              <b-input-group class="mb-1">
                <b-form-input id="example-input" v-model="dateClickedEndDate" type="text" placeholder="YYYY-MM-DD" autocomplete="off"></b-form-input>
                <b-input-group-append>
                  <b-form-datepicker v-model="dateClickedEndDate" button-only right locale="en-US" aria-controls="example-input" @context="onContext"></b-form-datepicker>
                </b-input-group-append>
              </b-input-group>
            </b-col> -->

            
          <b-col lg="3">
            <b-input-group size="md">
            <b-form-input id="input-large" size="md" placeholder="Search for team name ... " v-on:change="searchTeam($event)" v-model="searchedText"></b-form-input>

            </b-input-group>
          </b-col>

            <b-col lg="3">
              <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
            </b-col>
          </b-row>


          <b-col>
              <!-- opended pagination div -->
              <div class="overflow-auto">
                <b-table id="my-table" :items="searchTeamName" :per-page="perPage" :current-page="currentPage" medium :fields="fields" style="text-align:left;">
                  
                  <template #cell(team_name)="data">
                    <a href="#" @click="teamNameClicked(data.item.session_id)" style="text-transform:capitalize;">{{data.item.team_name}}</a>
                  </template>
                  
                  
                </b-table>
              </div>
              <!-- end of pagination div -->
            </b-col>

          <!-- try pagination -->

        </b-col>
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

import axios from 'axios';
// import { mdbDatatable } from 'mdbvue';

var moment = require('moment');
export default {
  name: 'App',
  components: {
    // HelloWorld
},

  data(){
    return{
      searchedText: '',
      searchTeamName:[],
      perPage: 20,
      currentPage: 1,
      fields:['team_name','mission','date_played','time_played'],
      teamMissionClicked:'',
      teamPlayedDateTime:'',
      team_name:'',
      teamMedia:[],
      teamMedia0:'',
      teamMedia1:'',
      teamMedia2:'',
      teamMedia3:'',
      teamMedia4:'',
      teamMedia5:'',
      teamMedia6:'',
      teamMedia7:'',
      teamMedia8:'',
      teamMedia9:'',
      teamMedia10:'', /** gets pthobomb url from session_media_assets 14 **/
      clickedPeopleDetail:[], /** gathers up all the player name detail from the session id clicked **/
    }
  },

  methods: {

    clickedDownload(value){
      console.log('clicked Download');
      // console.log(fileName);

      // const fileName='https://homepages.cae.wisc.edu/~ece533/images/airplane.png';

      var fileName = value;

      // const link = document.createElement('a');
      // link.href = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
      // link.setAttribute('download', 'file.png'); //or any other extension
      // document.body.appendChild(link);
      // link.click();

      // try {
      //   const response = fetch(fileName);
      //   const blob = response.blob();
      //   const url = URL.createObjectURL(blob);

      //   const a = document.createElement("a");
      //   a.href = url;
      //   a.download = "myImage.png";
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      // } catch(err) {
      //   console.log({ err })
      // }

      // var last3character = fileName[fileName.length -3];
      // console.log(last3character);

      // if(last3character == 'g'){
      //   charName = 'gif;'
      //   console.log('gif file');
      // }
      // if(last3character == 'm'){
      //   charName = 'mp4;'
      //   console.log('mp4 file');
      // }
      // if(last3character == 'p'){
      //   console.log('pdf file');
      //   charName = 'pdf;'
      // }
      // if(last3character == 'j'){
      //   console.log('jpg file');
      //   var charName = 'jpg;'
      // }

      // var a = document.createElement('a');
      // a.href = fileName;
      // a.download = fileName;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);

      axios({
                    url: fileName,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                     var fileLink = document.createElement('a');

                     fileLink.href = fileURL;
                     fileLink.setAttribute('download', 'media.jpg');
                     document.body.appendChild(fileLink);

                     fileLink.click();
                });
    },

    searchTeam(event){
      console.log('team was searched');
      // console.log(this.searchedText);
      // console.log(event);

      this.searchTeamName = [];

      var teamName = event;

      console.log(axios.get(process.env.VUE_APP_DATABASE_TEAMS+'/searchText/'+teamName));

      axios.get(process.env.VUE_APP_DATABASE_TEAMS+'/searchText/'+teamName,{

      })
      .then(response => 
        {
          console.log(response);

          var teamId = response.data[0].id;

          console.log(teamId);


          axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/search_team_id/'+teamId,{

          })
          .then(response => 
            {
              if(response.data.length > '0'){
                
                console.log('total team with that id are '+response.data.length);
                console.log(response.data);

                var totalTeamId = response.data.length;

                for (var i = 0; i < totalTeamId; i++) {

                  var sessionId = response.data[i].id;
                  var missionId = response.data[i].mission_id;

                  if(missionId == '1'){
                    var missionName = 'Cyberbot';
                  }
                  if(missionId == '2'){
                    var missionName = 'Block Monster';
                  }
                  if(missionId == '3'){
                    var missionName = 'Cyberbot Pro';
                  }
                  if(missionId == '4'){
                    var missionName = 'Cyberbot Halloween';
                  }

                  var playedDate = moment(response.data[i].session_time).format('MM-DD-YYYY');
                  var playedTime = moment(response.data[i].session_time).format('hh:mm A');

                  var teamDetail = {
                    "team_name":teamName,
                    "session_id":sessionId,
                    "mission":missionName,
                    "date_played":playedDate,
                    "time_played": playedTime
                  }

                  this.searchTeamName.push(teamDetail);

                  // if(i+1 == totalSearchedText){
                  //   var v = this;
                  //   console.log(this.searchedPeopleId);
                  //   setTimeout(function(){
                  //     console.log(v.searchedPeopleId);
                  //     console.log(v.getPersonDetail());
                  //     console.log('yes yes'); }, 1000);
                  // }

                }


              }
              else{
                console.log('Team Name not found');
              }

          })
          .catch(function (error) {
            console.log(error);
          });


        })
      .catch(function (error) {
        console.log(error);
      });
    },

    teamNameClicked(clickedSessionId){
      console.log('team name was clicked');

      this.teamMedia = []; /** empty the previous array on click **/

      this.clickedPeopleDetail = []; /** empty the previous array player details **/

      this.teamMedia0 = [];
      this.teamMedia1 = [];
      this.teamMedia2 = [];
      this.teamMedia3 = [];
      this.teamMedia4 = [];
      this.teamMedia5 = [];
      this.teamMedia6 = [];
      this.teamMedia7 = [];
      this.teamMedia8 = [];
      this.teamMedia9 = [];
      this.teamMedia10 = []; /** gets pthobomb url from session_media_assets 14 **/

      this.team_name = this.searchedText;

      this.teamPlayedDateTime = '';
      this.teamMissionClicked = '';

      console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/'+clickedSessionId);

      axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/'+clickedSessionId,{

          })
          .then(response => 
          {
            // console.log(response);

            if(response.data.mission_id == '1'){
              var missionName = 'Cyberbot';
            }
            if(response.data.mission_id == '2'){
              missionName = 'Block Monster';
            }
            if(response.data.mission_id == '3'){
              missionName = 'Cyberbot Pro';
            }
            if(response.data.mission_id == '4'){
              missionName = 'Cyberbot Halloween';
            }

            this.teamMissionClicked = missionName;
            this.teamPlayedDateTime = moment(response.data.updatedAt).format('MM-DD-YYYY H:mm A');

          })
          .catch(function (error) {
            console.log(error);
          });

      axios.get(process.env.VUE_APP_SESSION_MEDIA_ASSETS+'/session/'+clickedSessionId,{

          })
          .then(response => 
          {
            console.log(response);
            console.log(response.data.length);

            var clickedSessionIdLength = response.data.length;

            for (var i = 0; i < clickedSessionIdLength; i++) {
              
              // valueName[i] == response.data[i].s3_url;

              this['teamMedia'+i] = response.data[i].s3_url;

              if(response.data[i].session_media_item_id == '14'){
                this.teamMedia10 = response.data[i].s3_url;
              }

            }

            if(clickedSessionIdLength < '1'){ /** this part should display photo bomb not found message **/
              console.log('Contents not found');
            }

            /** grabs all the team player session under that session id **/ 
                axios.get(process.env.VUE_APP_DATABASE_TEAMPLAYERSESSIONS+'/session/'+clickedSessionId,{

                })
                .then(response => 
                {
                  console.log(response.data);
                  console.log(response.data.length);

                  for (var i = 0; i < response.data.length; i++) {

                    var totalPeopleInTeam = response.data.length;

                    console.log(response.data[i].Player.person_id);

                    var bomb_beater = response.data[i].Player.bomb_beater;
                    var last_played_date = moment(response.data[i].Player.updatedAt).format('MM-DD-YYYY');
                    var last_played_time = moment(response.data[i].Player.updatedAt).format('H:mm A');
                    var person_id = response.data[i].Player.person_id;
                    var play_count = response.data[i].Player.play_count;

                    console.log('bomb beater '+bomb_beater);
                    // console.log('last played '+last_played);
                    console.log('person id '+person_id);
                    console.log('play count '+play_count);

                    /**check minor or not **/
                    var getMinorId = response.data[i].player_minor_id;

                    if(getMinorId == null){
                      axios.get(process.env.VUE_APP_DATABASE_PEOPLE+person_id,{

                      })
                      .then(response => 
                      {
                        console.log(response.data);
                        var player_first_name = response.data.first_name;
                        var player_last_name = response.data.last_name;
                        var player_email = response.data.email;
                        var player_phone = response.data.phone;
                        var player_date_of_birth = response.data.date_of_birth;
                        var player_instagram = response.data.instagram;
                        var player_play_count = response.data.play_count;


                        var playerDetail = {
                          "fullName" : player_first_name+' '+player_last_name,
                          "date_of_birth" : player_date_of_birth,
                          "play_count" : player_play_count,
                          "date_played" : last_played_date,
                          "time_played_at" : last_played_time,
                          "instagram" : player_instagram,
                          "phone" : player_phone,
                          "email" : player_email,
                          "minor" : 'Adult'
                        }

                        this.clickedPeopleDetail.push(playerDetail);

                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                    }
                    else{
                      console.log('it was minor');

                      var minor_first_name = response.data[i].Player_minor.first_name;
                      var minor_last_name = response.data[i].Player_minor.last_name;
                      var minor_date_of_birth = response.data[i].Player_minor.date_of_birth;
                      var minor_play_count = response.data[i].Player_minor.play_count;
                      var minor_last_played_date = moment(response.data[i].Player_minor.updatedAt).format('MM-DD-YYYY');
                      var minor_last_played_time = moment(response.data[i].Player_minor.updatedAt).format('H:mm A');

                      var minorDetail = {
                        "fullName" : minor_first_name+' '+minor_last_name,
                        "date_of_birth" : minor_date_of_birth,
                        "play_count" : minor_play_count,
                        "date_played" : minor_last_played_date,
                        "time_played_at" : minor_last_played_time,
                        "instagram" : ' ',
                        "phone" : ' ',
                        "email" : ' ',
                        "minor" : 'Minor'
                      }

                        this.clickedPeopleDetail.push(minorDetail);

                    } 
                    
                    if(i == totalPeopleInTeam-1){
                      // console.log('open the modal');
                      this.$bvModal.show('modal-teamMedia'); /** this will open the modal **/
            
                    }

                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
                /** end of Team Player Session Detail **/

          })
          .catch(function (error) {
            console.log(error);
          });
    }
  },


  mounted: function(){

    console.log('load the most recent teams');

    var startDate = moment().subtract(1,'days').format('YYYY-MM-DD');
    var endDate = moment().add(1,'days').format('YYYY-MM-DD');
    var limit = '20';

    console.log(process.env.VUE_APP_DATABASE_SESSIONS+'/completed_recent_team/start/'+startDate+'/end/'+endDate+'/limit/'+limit);

    axios.get(process.env.VUE_APP_DATABASE_SESSIONS+'/completed_recent_team/start/'+startDate+'/end/'+endDate+'/limit/'+limit,{

          })
          .then(response => 
            {
              if(response.data.length > '0'){
                
                console.log('total team with that id are '+response.data.length);
                console.log(response.data);

                var totalTeamId = response.data.length;

                for (var i = 0; i < totalTeamId; i++) {

                  var sessionId = response.data[i].id;
                  var missionId = response.data[i].mission_id;

                  if(missionId == '1'){
                    var missionName = 'Cyberbot';
                  }
                  if(missionId == '2'){
                    var missionName = 'Block Monster';
                  }
                  if(missionId == '3'){
                    var missionName = 'Cyberbot Pro';
                  }
                  if(missionId == '4'){
                    var missionName = 'Cyberbot Halloween';
                  }

                  var teamName = response.data[i].Team.name;
                  var playedDate = moment(response.data[i].session_time).format('MM-DD-YYYY');
                  var playedTime = moment(response.data[i].session_time).format('hh:mm A');

                  var teamDetail = {
                    "team_name":teamName,
                    "session_id":sessionId,
                    "mission":missionName,
                    "date_played":playedDate,
                    "time_played": playedTime
                  }

                  this.searchTeamName.push(teamDetail);

                  // if(i+1 == totalSearchedText){
                  //   var v = this;
                  //   console.log(this.searchedPeopleId);
                  //   setTimeout(function(){
                  //     console.log(v.searchedPeopleId);
                  //     console.log(v.getPersonDetail());
                  //     console.log('yes yes'); }, 1000);
                  // }

                }


              }
              else{
                console.log('Team Name not found');
              }

          })
          .catch(function (error) {
            console.log(error);
          });

  },

  computed: {
    rows() {
       return this.searchTeamName.length
    },
  },  

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

.teamMedia2 {
  position: absolute;
  width: auto;
  left:0;
  top: 180px;
  text-align: center;
  opacity: 0;
  transition: opacity .35s ease;
}

.teamMedia2 a {
  width: auto;
  margin: 50px 10px 10px 50px;
  text-align: center;
  color: white;
  border: solid 2px white;
  z-index: 1;
}

.container:hover .overlay {
  display: block;
  background: rgba(0, 0, 0, .3);
}

.container:hover .teamMedia2 {
  opacity: 1;
}

</style>
